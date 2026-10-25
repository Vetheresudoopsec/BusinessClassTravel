<?php
/* A landscape photograph of a city from Unsplash, for fare offer cards with no photo of our own.
 *   GET api/photo.php?q=Bangkok  ->  {"url":"…","alt":"…","credit":"Jane Doe","profile":"…","page":"…"}
 * Needs UNSPLASH_ACCESS_KEY in .env; without it (or on any error) it returns {"url":null} and the page
 * shows a Picsum photo instead. Results are kept for a week in cache/photos.json, so each city costs one
 * request to Unsplash a week (the free plan allows 50 an hour). */
require __DIR__ . '/env.php';

$q = trim(preg_replace('/[^\p{L}\p{N} .\'-]/u', '', $_GET['q'] ?? ''));
if ($q === '' || mb_strlen($q) > 60) json_out(['url' => null], 400);
$key = env('UNSPLASH_ACCESS_KEY');
if ($key === '') json_out(['url' => null], 200);

$dir   = dirname(__DIR__) . '/cache';
$file  = "$dir/photos.json";
$cache = is_readable($file) ? (json_decode(file_get_contents($file), true) ?: []) : [];
$id    = mb_strtolower($q);
$week  = 7 * 86400;
if (isset($cache[$id]) && time() - $cache[$id]['at'] < $week) json_out($cache[$id]['photo'], 200, 86400);

[$status, $res] = http_get_json('https://api.unsplash.com/search/photos?' . http_build_query([
  'query' => "$q city skyline", 'orientation' => 'landscape', 'per_page' => 1, 'content_filter' => 'high',
]), ["Authorization: Client-ID $key", 'Accept-Version: v1']);
$p = $res['results'][0] ?? null;
if ($status !== 200 || !$p) json_out(['url' => null], 200);

// Unsplash asks that photos are linked from their own servers, credited, and that each use is counted.
$utm = '?utm_source=business_class_travel&utm_medium=referral';
$photo = [
  'url'     => $p['urls']['raw'] . '&w=800&h=450&fit=crop&auto=format&q=70',
  'alt'     => $p['alt_description'] ? ucfirst($p['alt_description']) : $q,
  'credit'  => $p['user']['name'] ?? 'Unsplash',
  'profile' => ($p['user']['links']['html'] ?? 'https://unsplash.com') . $utm,
  'page'    => 'https://unsplash.com/' . $utm,
];
if (!empty($p['links']['download_location'])) http_get_json($p['links']['download_location'], ["Authorization: Client-ID $key"]);

if (is_dir($dir) || @mkdir($dir, 0755)) {
  $cache[$id] = ['at' => time(), 'photo' => $photo];
  @file_put_contents($file, json_encode($cache, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), LOCK_EX);
}
json_out($photo, 200, 86400);
