<?php
/* The visitor's approximate location from their IP address, used only to pre-fill the departure
 * airport and the phone country code. Nothing is stored.
 *   GET api/geo.php  ->  {"country":"AU","city":"Sydney","lat":-33.87,"lon":151.21}
 * Uses ipapi.co (free for about 1,000 lookups a day; set IPAPI_KEY in .env for more). */
require __DIR__ . '/env.php';

$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$public = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
// On a local machine the address is private, so look up the connection's own public address instead.
$url = 'https://ipapi.co/' . ($public ? rawurlencode($ip) . '/' : '') . 'json/';
$key = env('IPAPI_KEY');
if ($key !== '') $url .= '?key=' . rawurlencode($key);

[$status, $res] = http_get_json($url);
if ($status !== 200 || !is_array($res) || !empty($res['error']) || empty($res['country_code'])) {
  json_out(['country' => null], 200);
}
json_out([
  'country' => strtoupper($res['country_code']),
  'city'    => $res['city'] ?? null,
  'lat'     => isset($res['latitude']) ? round((float)$res['latitude'], 2) : null,
  'lon'     => isset($res['longitude']) ? round((float)$res['longitude'], 2) : null,
]);
