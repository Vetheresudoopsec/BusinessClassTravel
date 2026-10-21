<?php
/* BusinessClassTravel — quote request handler for HostGator (PHP 7.4+).
 *
 * DISABLED until a recipient is set. To go live:
 *   1. Put the address that should receive leads in $RECIPIENT below.
 *   2. In app.js set CONFIG.leadEndpoint = 'quote.php'.
 *   3. In cPanel, make sure the "From" domain below has a mailbox or SPF record so mail is delivered.
 * Accepts the JSON the page sends, and a plain form post when JavaScript is off.
 */

$RECIPIENT = '';                                   // e.g. 'quotes@businessclasstravel.com'
$FROM      = 'no-reply@businessclasstravel.com';

$isJson = stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false;
$data   = $isJson ? (json_decode(file_get_contents('php://input'), true) ?: []) : $_POST;

function reply($ok, $message, $isJson) {
  http_response_code($ok ? 200 : 400);
  if ($isJson) { header('Content-Type: application/json'); echo json_encode(['ok' => $ok, 'message' => $message]); exit; }
  header('Content-Type: text/html; charset=utf-8');
  $msg = htmlspecialchars($message, ENT_QUOTES);
  echo "<!doctype html><meta name=viewport content='width=device-width,initial-scale=1'><title>BusinessClassTravel</title>"
     . "<body style='font:18px/1.5 system-ui,sans-serif;background:#e5e1d8;color:#2a1d17;max-width:36rem;margin:10vh auto;padding:0 1rem'>"
     . "<h1 style='font-weight:500'>" . ($ok ? 'Request received' : 'Something is missing') . "</h1><p>$msg</p><p><a href='./'>Back to BusinessClassTravel</a></p>";
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(false, 'Please send the form on our home page.', $isJson);
if (!empty($data['company_website'])) reply(true, 'Thank you.', $isJson);   // honeypot: quietly accept bots
if ($RECIPIENT === '') reply(false, 'Online requests are not switched on yet. Please call +1 (888) 555-0199.', $isJson);

$clean = function ($v) { return trim(preg_replace('/[\r\n]+/', ' ', strip_tags((string)$v))); };
$from    = $clean($data['from'] ?? $data['from_code'] ?? '');
$to      = $clean($data['to'] ?? $data['to_code'] ?? '');
$name    = $clean($data['name'] ?? '');
$contact = $clean($data['contact'] ?? '');

if ($from === '' || $to === '' || $name === '' || $contact === '') {
  reply(false, 'Please give your route, your name and an email or phone number.', $isJson);
}

$lines = [
  'New quote request',
  '',
  'Name:        ' . $name,
  'Contact:     ' . $contact,
  'Trip:        ' . $clean($data['trip'] ?? 'round'),
  'From:        ' . $from,
  'To:          ' . $to,
  'Depart:      ' . $clean($data['depart'] ?? $data['depart_date'] ?? 'to agree'),
  'Return:      ' . $clean($data['return'] ?? $data['return_date'] ?? '—'),
  'Passengers:  ' . $clean($data['passengers'] ?? '1'),
  'Cabin:       ' . $clean($data['cabin'] ?? 'business'),
  'Flexible:    ' . (!empty($data['flexible']) ? 'yes, ±3 days' : 'no'),
];
if (!empty($data['legs']) && is_array($data['legs'])) {
  foreach ($data['legs'] as $i => $leg) {
    $lines[] = 'Flight ' . ($i + 2) . ':    ' . $clean($leg['from'] ?? '') . ' to ' . $clean($leg['to'] ?? '') . ' on ' . $clean($leg['date'] ?? '?');
  }
}
$lines[] = '';
$lines[] = 'Sent ' . gmdate('Y-m-d H:i') . ' UTC from ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$replyTo = filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : $FROM;
$headers = "From: BusinessClassTravel <$FROM>\r\nReply-To: $replyTo\r\nContent-Type: text/plain; charset=utf-8";
$ok = mail($RECIPIENT, "Quote: $from to $to — $name", implode("\n", $lines), $headers);

reply($ok, $ok ? 'An advisor will be in touch shortly, usually within the hour.' : 'That did not go through. Please call +1 (888) 555-0199.', $isJson);
