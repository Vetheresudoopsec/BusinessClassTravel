<?php
/* The visitor's approximate location from their IP address, used to pre-fill the departure airport,
 * the phone country code and the fare offers. Results are kept for a day per address (hashed).
 *   GET api/geo.php  ->  {"country":"AU","city":"Sydney","lat":-33.87,"lon":151.21}
 *
 * Behind Cloudflare the server sees Cloudflare's address, so the visitor's own comes from the
 * CF-Connecting-IP header. Sources, first answer wins:
 *   1. Cloudflare's visitor location headers (Rules > Managed Transforms > Add visitor location headers)
 *   2. ipapi.co (IPAPI_KEY in .env lifts the free limit), then ipinfo.io (IPINFO_TOKEN optional),
 *      then geojs.io; free plans run out, so one refusing doesn't stop the lookup
 *   3. Cloudflare's country header alone, which the page turns into that country's main airport */
require __DIR__ . '/env.php';

$h = function ($name) { return trim($_SERVER['HTTP_' . $name] ?? ''); };
$ip = filter_var($h('CF_CONNECTING_IP'), FILTER_VALIDATE_IP) ?: ($_SERVER['REMOTE_ADDR'] ?? '');
$public = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE);
$cfCountry = preg_match('/^[A-Z]{2}$/', $h('CF_IPCOUNTRY')) && !in_array($h('CF_IPCOUNTRY'), ['XX', 'T1'], true) ? $h('CF_IPCOUNTRY') : null;

$place = function ($country, $city, $lat, $lon) {
  return [
    'country' => strtoupper($country),
    'city'    => $city ?: null,
    'lat'     => is_numeric($lat) ? round((float)$lat, 2) : null,
    'lon'     => is_numeric($lon) ? round((float)$lon, 2) : null,
  ];
};

// 1. Cloudflare already knows: no outside request needed.
if ($cfCountry && is_numeric($h('CF_IPLATITUDE')) && is_numeric($h('CF_IPLONGITUDE'))) {
  json_out($place($cfCountry, $h('CF_IPCITY'), $h('CF_IPLATITUDE'), $h('CF_IPLONGITUDE')));
}

// A day's cache per address, so repeat visits don't use up the free lookups.
$cacheFile = dirname(__DIR__) . '/cache/geo.json';
$id = hash('sha256', $ip);
$read = function () use ($cacheFile) { return is_readable($cacheFile) ? (json_decode(file_get_contents($cacheFile), true) ?: []) : []; };
$cached = $read()[$id] ?? null;
if ($cached && time() - $cached['at'] < 86400) json_out($cached['place']);

// 2. Outside services, in turn. On a local machine the address is private, so each looks up the
//    connection's own public address instead.
$ipPart = $public ? rawurlencode($ip) . '/' : '';
$sources = [
  function () use ($ipPart, $place) {
    $key = env('IPAPI_KEY');
    [$s, $r] = http_get_json("https://ipapi.co/{$ipPart}json/" . ($key !== '' ? '?key=' . rawurlencode($key) : ''));
    if ($s !== 200 || !empty($r['error']) || empty($r['country_code'])) return null;
    return $place($r['country_code'], $r['city'] ?? null, $r['latitude'] ?? null, $r['longitude'] ?? null);
  },
  function () use ($ip, $public, $place) {
    $token = env('IPINFO_TOKEN');
    [$s, $r] = http_get_json('https://ipinfo.io/' . ($public ? rawurlencode($ip) . '/' : '') . 'json' . ($token !== '' ? '?token=' . rawurlencode($token) : ''));
    if ($s !== 200 || empty($r['country']) || !empty($r['bogon'])) return null;
    [$lat, $lon] = array_pad(explode(',', $r['loc'] ?? ''), 2, null);
    return $place($r['country'], $r['city'] ?? null, $lat, $lon);
  },
  function () use ($ip, $public, $place) {
    [$s, $r] = http_get_json('https://get.geojs.io/v1/ip/geo' . ($public ? '/' . rawurlencode($ip) : '') . '.json');
    if ($s !== 200 || empty($r['country_code'])) return null;
    return $place($r['country_code'], $r['city'] ?? null, $r['latitude'] ?? null, $r['longitude'] ?? null);
  },
];
foreach ($sources as $lookup) {
  $found = $lookup();
  if (!$found) continue;
  $dir = dirname($cacheFile);
  if ((is_dir($dir) || @mkdir($dir, 0755)) && ($fh = @fopen($cacheFile, 'c+'))) {
    flock($fh, LOCK_EX);
    $all = json_decode(stream_get_contents($fh), true) ?: [];
    $all = array_filter($all, function ($e) { return time() - $e['at'] < 86400; });
    $all[$id] = ['at' => time(), 'place' => $found];
    ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($all));
    flock($fh, LOCK_UN); fclose($fh);
  }
  json_out($found);
}

// 3. Every service refused: the country is still worth having.
json_out($cfCountry ? $place($cfCountry, null, null, null) : ['country' => null]);
