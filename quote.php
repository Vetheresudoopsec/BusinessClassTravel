<?php
/* Business Class Travel — request handler for HostGator (PHP 7.4+).
 *
 * Handles the three forms on the home page: the booking card (type "booking"),
 * the corporate account form ("corporate") and the enquiry form ("enquiry"),
 * and emails every detail the visitor chose to the sales inbox. A quote request also
 * sends the customer a confirmation email (api/mail-confirmation.php).
 *
 * Mail goes out through PHP's mail(), which HostGator delivers. For it to land in the inbox,
 * the domain in $FROM needs a mailbox or an SPF record in cPanel (Email Deliverability).
 * Set MAIL_TEST=1 in .env on a development machine: messages are then saved to cache/mail/
 * instead of being sent.
 * Accepts the JSON the page sends, and a plain form post when JavaScript is off.
 */
require __DIR__ . '/api/env.php';
require __DIR__ . '/api/mail-confirmation.php';

$RECIPIENT = 'sales@business-class-travel.com';
$FROM      = 'no-reply@business-class-travel.com';
$PHONE     = '305-244-6463';
$RATE      = [6, 600];                             // at most 6 requests from one address in 10 minutes

$isJson = stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false;
$data   = $isJson ? (json_decode(file_get_contents('php://input'), true) ?: []) : $_POST;

function reply($ok, $message, $isJson) {
  http_response_code($ok ? 200 : 400);
  if ($isJson) { header('Content-Type: application/json'); echo json_encode(['ok' => $ok, 'message' => $message]); exit; }
  header('Content-Type: text/html; charset=utf-8');
  $msg = htmlspecialchars($message, ENT_QUOTES);
  echo "<!doctype html><meta name=viewport content='width=device-width,initial-scale=1'><title>Business Class Travel</title>"
     . "<body style='font:18px/1.5 system-ui,sans-serif;background:#f3f6fc;color:#14202f;max-width:36rem;margin:10vh auto;padding:0 1rem'>"
     . "<h1 style='font-weight:600'>" . ($ok ? 'Thank You. Your Request Is with Us.' : 'Some Details Are Missing') . "</h1><p>$msg</p><p><a style='color:#0f2a78' href='./'>Back to Business Class Travel</a></p>";
  exit;
}

// Keeps a burst of automated posts out of the sales inbox. Counts are kept per address for 10 minutes.
function too_many($limit, $window) {
  $dir = __DIR__ . '/cache';
  if (!is_dir($dir) && !@mkdir($dir, 0755)) return false;
  $fh = @fopen("$dir/rate.json", 'c+');
  if (!$fh) return false;
  flock($fh, LOCK_EX);
  $hits = json_decode(stream_get_contents($fh), true) ?: [];
  $now = time();
  foreach ($hits as $ip => $times) {
    $hits[$ip] = array_values(array_filter($times, function ($t) use ($now, $window) { return $now - $t < $window; }));
    if (!$hits[$ip]) unset($hits[$ip]);
  }
  $ip = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '');
  $blocked = count($hits[$ip] ?? []) >= $limit;
  if (!$blocked) $hits[$ip][] = $now;
  ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($hits));
  flock($fh, LOCK_UN); fclose($fh);
  return $blocked;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(false, 'Please send the form on our home page.', $isJson);
if (!empty($data['company_website'])) reply(true, 'Thank you.', $isJson);   // honeypot: quietly accept bots
if (too_many(...$RATE)) reply(false, "We have received several requests from you already. Please call us on $PHONE.", $isJson);

$clean = function ($v) { return trim(preg_replace('/[\r\n]+/', ' ', strip_tags((string)$v))); };
$type  = $clean($data['type'] ?? 'booking');
$email = $clean($data['email'] ?? '');
$validEmail = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';

// A date from the form (YYYY-MM-DD) as "Friday 13 November 2026".
$day = function ($v) use ($clean) {
  $v = $clean($v);
  $d = DateTime::createFromFormat('!Y-m-d', $v);
  return $d ? $d->format('l j F Y') : $v;
};

if ($type === 'corporate') {
  $company = $clean($data['company'] ?? '');
  if ($company === '' || $validEmail === '') reply(false, 'Please give your company name and a work email address.', $isJson);
  $subject = "Corporate account: $company";
  $title   = 'New Corporate Account Request';
  $rows = [
    'Company'           => $company,
    'Email'             => $validEmail,
    'Travellers a year' => $clean($data['travellers'] ?? '') ?: 'Not given',
  ];
  $replyTo = $validEmail;
} elseif ($type === 'details') {
  // Extra details sent from the thank-you panel, after a quote request.
  $name    = $clean($data['name'] ?? '');
  $details = trim(mb_substr(preg_replace("/\r\n?/", "\n", strip_tags((string)($data['details'] ?? ''))), 0, 2000));
  if ($details === '' || $validEmail === '') reply(false, 'Please add your details.', $isJson);
  $route   = $clean($data['route'] ?? '');
  $subject = 'More details: ' . ($route ? "$route — " : '') . ($name ?: $validEmail);
  $title   = 'More Details for a Quote Request';
  $rows = [
    'Name'    => $name ?: 'Not given',
    'Email'   => $validEmail,
    'Route'   => $route ?: 'Not given',
    'Details' => $details,
  ];
  $replyTo = $validEmail;
} elseif ($type === 'enquiry') {
  $name    = $clean($data['name'] ?? '');
  $contact = $clean($data['contact'] ?? '');
  if ($name === '' || $contact === '') reply(false, 'Please give your name and an email address or phone number.', $isJson);
  $subject = "Enquiry: $name";
  $title   = 'New Enquiry';
  $rows = [
    'Name'      => $name,
    'Contact'   => $contact,
    'Itinerary' => $clean($data['itinerary'] ?? '') ?: 'Not given',
  ];
  $replyTo = filter_var($contact, FILTER_VALIDATE_EMAIL) ? $contact : $FROM;
} else {
  $from  = $clean($data['from'] ?? $data['from_code'] ?? '');
  $to    = $clean($data['to'] ?? $data['to_code'] ?? '');
  // First and last name arrive separately; the page also joins them into "name".
  $name  = $clean($data['name'] ?? '') ?: trim($clean($data['firstName'] ?? $data['first_name'] ?? '') . ' ' . $clean($data['lastName'] ?? $data['last_name'] ?? ''));
  $phone = $clean($data['phone'] ?? '');
  if ($phone === '' && !empty($data['phone_e164'])) $phone = $clean($data['phone_e164']);
  $adults   = max(1, (int)($data['adults'] ?? $data['passengers'] ?? 1));
  $children = max(0, (int)($data['children'] ?? 0));
  if ($from === '' || $to === '' || $name === '' || $validEmail === '' || $phone === '') {
    reply(false, 'Please give your route, your name, your email address and your phone number.', $isJson);
  }
  $trip   = $clean($data['trip'] ?? 'round');
  $trips  = ['round' => 'Round trip', 'oneway' => 'One way', 'multi' => 'Multi-city'];
  $cabin  = $clean($data['cabin'] ?? 'business') === 'first' ? 'First Class' : 'Business Class';
  $flex   = !empty($data['flexible']);
  $depart = $data['depart'] ?? $data['depart_date'] ?? '';
  $return = $data['return'] ?? $data['return_date'] ?? '';
  $subject = "Quote: $from to $to, $cabin — $name";
  $title   = 'New Quote Request';
  $rows = [
    'Name'       => $name,
    'Email'      => $validEmail,
    'Phone'      => $phone . (($c = $clean($data['phoneCountry'] ?? $data['phone_country'] ?? '')) ? " ($c)" : ''),
    'Trip'       => $trips[$trip] ?? $trip,
    'From'       => $clean($data['fromLabel'] ?? '') ?: $from,
    'To'         => $clean($data['toLabel'] ?? '') ?: $to,
    'Departure'  => $depart ? $day($depart) : ($flex ? 'Flexible' : 'Not given'),
    'Return'     => $trip !== 'round' ? 'None' : ($return ? $day($return) : ($flex ? 'Flexible' : 'Not given')),
    'Other legs' => $trip === 'multi' ? ($clean($data['legs'] ?? '') ?: 'Not given') : null,
    'Flexible'   => $flex ? 'Yes, up to 3 days either way' : 'No, these dates only',
    'Cabin'      => $cabin,
    'Passengers' => $adults . ' adult' . ($adults === 1 ? '' : 's') . ($children ? ", $children child" . ($children === 1 ? '' : 'ren') : ''),
  ];
  $replyTo = $validEmail;
  $confirm = [
    'fromCode' => $from, 'fromCity' => $clean($data['fromCity'] ?? ''),
    'toCode'   => $to,   'toCity'   => $clean($data['toCity'] ?? ''),
    'depart'   => $clean($depart), 'return' => $clean($return), 'trip' => $trip,
    'cabin'    => $cabin, 'adults' => $adults, 'children' => $children, 'flexible' => $flex,
  ];
}

$rows = array_filter($rows, function ($v) { return $v !== null; });
$sent = gmdate('j M Y, H:i') . ' UTC';
$page = filter_var($data['page'] ?? '', FILTER_VALIDATE_URL) ?: '';

// Plain text and HTML versions of the same list, so it reads well in any mail client.
$w = max(array_map('strlen', array_keys($rows))) + 2;
$text = "$title\n\n";
foreach ($rows as $k => $v) $text .= str_pad("$k:", $w) . str_replace("\n", "\n" . str_repeat(' ', $w), $v) . "\n";
$text .= "\nSent $sent" . ($page ? "\nFrom $page" : '') . "\nReply to this email to answer the customer directly.\n";

$h = function ($v) { return htmlspecialchars($v, ENT_QUOTES, 'UTF-8'); };
$html = "<!doctype html><html><body style=\"margin:0;padding:24px;background:#f3f6fc;font:15px/1.5 -apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#14202f\">"
      . "<table role=\"presentation\" width=\"100%\" style=\"max-width:560px;margin:0 auto;background:#fff;border-collapse:collapse;border-top:4px solid #0f2a78\">"
      . "<tr><td colspan=\"2\" style=\"padding:20px 24px 8px;font-size:20px;font-weight:600;color:#0f2a78\">{$h($title)}</td></tr>";
foreach ($rows as $k => $v) {
  $cell = $k === 'Email' ? "<a href=\"mailto:{$h($v)}\" style=\"color:#0f2a78\">{$h($v)}</a>"
        : ($k === 'Phone' ? "<a href=\"tel:{$h(preg_replace('/[^\d+]/', '', $v))}\" style=\"color:#0f2a78\">{$h($v)}</a>" : nl2br($h($v)));
  $html .= "<tr><td style=\"padding:8px 24px;border-top:1px solid #e3e8f2;color:#5b6577;width:34%;vertical-align:top\">{$h($k)}</td>"
         . "<td style=\"padding:8px 24px 8px 0;border-top:1px solid #e3e8f2;font-weight:600\">$cell</td></tr>";
}
$html .= "<tr><td colspan=\"2\" style=\"padding:16px 24px 20px;border-top:1px solid #e3e8f2;font-size:13px;color:#5b6577\">Sent {$h($sent)}"
       . ($page ? " from <a href=\"{$h($page)}\" style=\"color:#5b6577\">{$h($page)}</a>" : '')
       . ". Reply to this email to answer the customer directly.</td></tr></table></body></html>";

// Sends one email as plain text plus HTML. With MAIL_TEST=1 in .env it is saved to cache/mail/ instead.
function deliver($to, $subject, $text, $html, $replyTo, $tag) {
  global $FROM;
  $boundary = 'bct-' . bin2hex(random_bytes(8));
  $body = "--$boundary\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n$text\r\n"
        . "--$boundary\r\nContent-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n$html\r\n--$boundary--\r\n";
  $headers = "From: Business Class Travel <$FROM>\r\nReply-To: $replyTo\r\nMIME-Version: 1.0\r\n"
           . "Content-Type: multipart/alternative; boundary=\"$boundary\"";
  $encSubject = mb_encode_mimeheader($subject, 'UTF-8', 'Q');
  if (env('MAIL_TEST') === '1') {
    $dir = __DIR__ . '/cache/mail';
    return (is_dir($dir) || @mkdir($dir, 0755, true))
        && file_put_contents("$dir/" . gmdate('Ymd-His') . "-$tag.eml", "To: $to\r\nSubject: $encSubject\r\n$headers\r\n\r\n$body") !== false;
  }
  return mail($to, $encSubject, $body, $headers, "-f$FROM");
}

$ok = deliver($RECIPIENT, $subject, $text, $html, $replyTo, $type);

// The customer's confirmation. Replies go to the sales inbox. If it fails, the request still stands.
if ($ok && isset($confirm)) {
  [$cSubject, $cText, $cHtml] = quote_confirmation($confirm);
  deliver($validEmail, $cSubject, $cText, $cHtml, $RECIPIENT, 'confirmation');
}

reply($ok, $ok ? 'A consultant will be in touch shortly.' : "Your request could not be sent. Please call us on $PHONE.", $isJson);
