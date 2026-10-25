<?php
/* Business Class Travel — request handler for HostGator (PHP 7.4+).
 *
 * Handles the three forms on the home page: the booking card (type "booking"),
 * the corporate account form ("corporate") and the enquiry form ("enquiry").
 *
 * DISABLED until a recipient is set. To go live:
 *   1. Put the address that should receive leads in $RECIPIENT below.
 *   2. In app.js set CONFIG.leadEndpoint = 'quote.php'.
 *   3. In cPanel, make sure the "From" domain below has a mailbox or SPF record so mail is delivered.
 * Accepts the JSON the page sends, and a plain form post when JavaScript is off.
 */

$RECIPIENT = '';                                   // e.g. 'quotes@businessclasstravel.com'
$FROM      = 'no-reply@businessclasstravel.com';
$PHONE     = '[PHONE]';

$isJson = stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false;
$data   = $isJson ? (json_decode(file_get_contents('php://input'), true) ?: []) : $_POST;

function reply($ok, $message, $isJson) {
  http_response_code($ok ? 200 : 400);
  if ($isJson) { header('Content-Type: application/json'); echo json_encode(['ok' => $ok, 'message' => $message]); exit; }
  header('Content-Type: text/html; charset=utf-8');
  $msg = htmlspecialchars($message, ENT_QUOTES);
  echo "<!doctype html><meta name=viewport content='width=device-width,initial-scale=1'><title>Business Class Travel</title>"
     . "<body style='font:18px/1.5 system-ui,sans-serif;background:#f3f6fc;color:#14202f;max-width:36rem;margin:10vh auto;padding:0 1rem'>"
     . "<h1 style='font-weight:600'>" . ($ok ? 'Thank you. Your request is with us.' : 'Some details are missing') . "</h1><p>$msg</p><p><a style='color:#0f2a78' href='./'>Back to Business Class Travel</a></p>";
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(false, 'Please send the form on our home page.', $isJson);
if (!empty($data['company_website'])) reply(true, 'Thank you.', $isJson);   // honeypot: quietly accept bots
if ($RECIPIENT === '') reply(false, "Online requests are not switched on yet. Please call us on $PHONE.", $isJson);

$clean = function ($v) { return trim(preg_replace('/[\r\n]+/', ' ', strip_tags((string)$v))); };
$type  = $clean($data['type'] ?? 'booking');
$email = $clean($data['email'] ?? '');
$validEmail = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';

if ($type === 'corporate') {
  $company = $clean($data['company'] ?? '');
  if ($company === '' || $validEmail === '') reply(false, 'Please give your company name and a work email address.', $isJson);
  $subject = "Corporate account: $company";
  $lines = [
    'New corporate account request', '',
    'Company:     ' . $company,
    'Email:       ' . $validEmail,
    'Travellers:  ' . $clean($data['travellers'] ?? '—'),
  ];
  $replyTo = $validEmail;
} elseif ($type === 'enquiry') {
  $name    = $clean($data['name'] ?? '');
  $contact = $clean($data['contact'] ?? '');
  if ($name === '' || $contact === '') reply(false, 'Please give your name and an email address or phone number.', $isJson);
  $subject = "Enquiry: $name";
  $lines = [
    'New enquiry', '',
    'Name:        ' . $name,
    'Contact:     ' . $contact,
    'Itinerary:   ' . $clean($data['itinerary'] ?? '—'),
  ];
  $replyTo = filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : $FROM;
} else {
  $from  = $clean($data['from'] ?? $data['from_code'] ?? '');
  $to    = $clean($data['to'] ?? $data['to_code'] ?? '');
  $name  = $clean($data['name'] ?? '');
  $phone = $clean($data['phone'] ?? '');
  if ($from === '' || $to === '' || $name === '' || $validEmail === '') {
    reply(false, 'Please give your route, your name and your email address.', $isJson);
  }
  $subject = "Quote: $from to $to — $name";
  $lines = [
    'New quote request', '',
    'Name:        ' . $name,
    'Email:       ' . $validEmail,
    'Phone:       ' . ($phone !== '' ? $phone : '—'),
    'Trip:        ' . $clean($data['trip'] ?? 'round'),
    'From:        ' . $from,
    'To:          ' . $to,
    'Depart:      ' . $clean($data['depart'] ?? $data['depart_date'] ?? 'to agree'),
    'Return:      ' . $clean($data['return'] ?? $data['return_date'] ?? '—'),
    'Other legs:  ' . ($clean($data['legs'] ?? '') ?: '—'),
    'Passengers:  ' . $clean($data['passengers'] ?? '1'),
    'Cabin:       ' . $clean($data['cabin'] ?? 'business'),
    'Flexible:    ' . (!empty($data['flexible']) ? 'yes' : 'no'),
  ];
  $replyTo = $validEmail;
}

$lines[] = '';
$lines[] = 'Sent ' . gmdate('Y-m-d H:i') . ' UTC';

$headers = "From: Business Class Travel <$FROM>\r\nReply-To: $replyTo\r\nContent-Type: text/plain; charset=utf-8";
$ok = mail($RECIPIENT, $subject, implode("\n", $lines), $headers);

reply($ok, $ok ? 'A consultant will be in touch shortly.' : "Your request could not be sent. Please call us on $PHONE.", $isJson);
