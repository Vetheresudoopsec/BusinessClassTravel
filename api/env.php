<?php
/* Reads settings from a .env file (KEY=value lines). Real server environment variables win.
 * Looked for first in html_private/ inside the site folder (the live site keeps it there; the
 * folder is closed to the web by .htaccess), then one level above the site folder, then in the
 * site folder itself (also protected by .htaccess). */
function env($key, $default = '') {
  static $vars = null;
  if ($vars === null) {
    $vars = [];
    foreach ([dirname(__DIR__) . '/html_private/.env', dirname(__DIR__, 2) . '/.env', dirname(__DIR__) . '/.env'] as $file) {
      if (!is_readable($file)) continue;
      foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = array_map('trim', explode('=', $line, 2));
        $vars[$k] = trim($v, "\"'");
      }
      break;
    }
  }
  $real = getenv($key);
  return $real !== false && $real !== '' ? $real : ($vars[$key] ?? $default);
}

function json_out($data, $status = 200, $cacheSeconds = 0) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  header($cacheSeconds ? "Cache-Control: public, max-age=$cacheSeconds" : 'Cache-Control: no-store');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function http_get_json($url, $headers = []) {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 6,
    CURLOPT_CONNECTTIMEOUT => 4,
    CURLOPT_ENCODING => '',
    CURLOPT_USERAGENT => 'BusinessClassTravel/1.0',
    CURLOPT_HTTPHEADER => array_merge(['Accept: application/json'], $headers),
  ]);
  $body = curl_exec($ch);
  $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  return [$status, $body === false ? null : json_decode($body, true)];
}
