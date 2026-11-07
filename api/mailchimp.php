<?php
/* Adds a newsletter subscriber to the Mailchimp audience (Marketing API 3.0).
 * Needs MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID in .env. Without them it returns false
 * and quote.php emails the sign-up to the sales inbox instead, so no address is lost.
 * Someone who unsubscribed earlier is never subscribed again from here: Mailchimp only
 * applies the status to new contacts. */

function mailchimp_subscribe($email, $firstName = '', $lastName = '', $tag = '') {
  $key  = env('MAILCHIMP_API_KEY');
  $list = env('MAILCHIMP_AUDIENCE_ID');
  if ($key === '' || $list === '' || !strpos($key, '-')) return false;
  $dc   = substr($key, strrpos($key, '-') + 1);            // "…-us21" → us21
  $base = "https://$dc.api.mailchimp.com/3.0/lists/" . rawurlencode($list) . '/members/' . md5(strtolower($email));

  $merge = array_filter(['FNAME' => $firstName, 'LNAME' => $lastName], 'strlen');
  [$status, $body] = mailchimp_call('PUT', $base, [
    'email_address' => $email,
    // 1 = Mailchimp emails a confirmation link first (double opt-in).
    'status_if_new' => env('MAILCHIMP_DOUBLE_OPTIN') === '1' ? 'pending' : 'subscribed',
    'merge_fields'  => $merge ?: new stdClass(),
  ], $key);
  // A contact Mailchimp will not take again (earlier unsubscribe or deletion) still counts as handled.
  $ok = $status === 200 || in_array($body['title'] ?? '', ['Member In Compliance State', 'Forgotten Email Not Subscribed'], true);
  if ($ok && $status === 200 && $tag !== '') {
    mailchimp_call('POST', "$base/tags", ['tags' => [['name' => $tag, 'status' => 'active']]], $key);
  }
  return $ok;
}

function mailchimp_call($method, $url, $payload, $key) {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 6,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_USERPWD        => "bct:$key",
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'Accept: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($payload),
  ]);
  $body = curl_exec($ch);
  $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  return [$status, $body === false ? null : json_decode($body, true)];
}
