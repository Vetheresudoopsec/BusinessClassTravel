<?php
/* Downloads Duffel's airport list into data/airports-duffel.json, which the booking card searches
 * in the browser. Visitors' searches never go to Duffel; only this script talks to it.
 *
 * Only airports that suit Business and First Class travel are kept. Duffel doesn't say which those
 * are, so each airport is checked against OurAirports (public-domain data, ourairports.com):
 *   - kept: large airports with scheduled flights, and medium airports with scheduled flights and a
 *     paved runway of at least 7,000 ft (long enough for the jets that carry premium cabins);
 *   - dropped: military bases, small airfields, heliports, seaplane bases, closed airports, and
 *     anything OurAirports doesn't know.
 *
 *   php tools/sync-airports.php
 *
 * Needs DUFFEL_ACCESS_TOKEN in .env. Run it once now, then monthly (a HostGator cron job:
 *   0 3 1 * * php /home/<user>/public_html/tools/sync-airports.php
 * ). If it fails, the existing file is left as it was. */
if (PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require dirname(__DIR__) . '/api/env.php';

$token = env('DUFFEL_ACCESS_TOKEN');
if ($token === '') { fwrite(STDERR, "Set DUFFEL_ACCESS_TOKEN in .env first.\n"); exit(1); }

const MIN_RUNWAY_FT = 7000;
// Hand-picked exceptions to the rules below, by IATA code. Edit these, then run the script again.
const ALWAYS_KEEP = ['LCY'];   // London City: short runway, but a Business Class airport (BA CityFlyer)
const ALWAYS_DROP = [];
const MILITARY = '/\\b(air force|air base|airbase|afb|royal air force|raf|naval|navy|nas|army|military|marine corps|mcas|air national guard|ang base|joint base|air station|base a[eé]rea|luftwaffe|fliegerhorst)\\b/iu';

// Streams a CSV from OurAirports and calls $row for each line as an associative array.
function each_csv($url, $row) {
  $tmp = tempnam(sys_get_temp_dir(), 'bct');
  $fh = fopen($tmp, 'w');
  $ch = curl_init($url);
  curl_setopt_array($ch, [CURLOPT_FILE => $fh, CURLOPT_TIMEOUT => 120, CURLOPT_FOLLOWLOCATION => true, CURLOPT_USERAGENT => 'BusinessClassTravel/1.0']);
  $ok = curl_exec($ch) && curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
  fclose($fh);
  if (!$ok) { unlink($tmp); fwrite(STDERR, "Could not download $url. Nothing was changed.\n"); exit(1); }
  $in = fopen($tmp, 'r');
  $head = fgetcsv($in, 0, ',', '"', '');
  while (($line = fgetcsv($in, 0, ',', '"', '')) !== false) {
    if (count($line) === count($head)) $row(array_combine($head, $line));
  }
  fclose($in);
  unlink($tmp);
}

// Longest open, paved runway per airport.
$runway = [];
each_csv('https://davidmegginson.github.io/ourairports-data/runways.csv', function ($r) use (&$runway) {
  if ($r['closed'] === '1' || !preg_match('/ASP|CON|PEM|BIT|TAR|PAV|MAC|BLACK/i', $r['surface'])) return;
  $len = (int)$r['length_ft'];
  if ($len > ($runway[$r['airport_ident']] ?? 0)) $runway[$r['airport_ident']] = $len;
});

// The IATA codes that pass the test above.
$allowed = [];
each_csv('https://davidmegginson.github.io/ourairports-data/airports.csv', function ($a) use (&$allowed, $runway) {
  $iata = strtoupper(trim($a['iata_code']));
  if ($iata === '' || $a['scheduled_service'] !== 'yes') return;
  $large = $a['type'] === 'large_airport';
  // A military name only rules out smaller fields: a large airport with airline schedules is civil, even
  // where it shares runways with an air base (Puerto Princesa).
  if (!$large && preg_match(MILITARY, $a['name'])) return;
  $medium = $a['type'] === 'medium_airport' && ($runway[$a['ident']] ?? 0) >= MIN_RUNWAY_FT;
  if ($large || $medium) $allowed[$iata] = true;
});
foreach (ALWAYS_KEEP as $c) $allowed[$c] = true;
foreach (ALWAYS_DROP as $c) unset($allowed[$c]);
if (count($allowed) < 300) { fwrite(STDERR, 'Only ' . count($allowed) . " airports passed the OurAirports check. Nothing was changed.\n"); exit(1); }
$skipped = 0;

$airports = [];
$after = null;
$page = 0;
$retries = 0;
do {
  $query = ['limit' => 200] + ($after ? ['after' => $after] : []);
  [$status, $res] = http_get_json(
    'https://api.duffel.com/air/airports?' . http_build_query($query),
    ['Duffel-Version: v2', 'Authorization: Bearer ' . $token]
  );
  if ($status === 429 && ++$retries <= 5) { sleep(5); continue; }   // rate limited: wait, then retry the same page
  $retries = 0;
  if ($status !== 200 || !is_array($res)) { fwrite(STDERR, "Duffel answered $status on page $page. Nothing was changed.\n"); exit(1); }
  foreach ($res['data'] ?? [] as $a) {
    if (empty($a['iata_code'])) continue;
    if (!isset($allowed[$a['iata_code']]) || preg_match(MILITARY, $a['name'] ?? '')) { $skipped++; continue; }
    $airports[] = [
      $a['iata_code'],
      $a['name'] ?? '',
      $a['city_name'] ?? ($a['city']['name'] ?? ''),
      $a['iata_country_code'] ?? '',
      isset($a['latitude']) ? round((float)$a['latitude'], 3) : null,
      isset($a['longitude']) ? round((float)$a['longitude'], 3) : null,
    ];
  }
  $after = $res['meta']['after'] ?? null;
  $page++;
  usleep(250000); // stay well inside Duffel's rate limit
} while ($after);

if (count($airports) < 300) { fwrite(STDERR, 'Only ' . count($airports) . " airports came back. Nothing was changed.\n"); exit(1); }
usort($airports, fn($x, $y) => strcmp($x[0], $y[0]));

$file = dirname(__DIR__) . '/data/airports-duffel.json';
$json = json_encode(['updated' => gmdate('c'), 'fields' => ['iata', 'name', 'city', 'country', 'lat', 'lon'], 'airports' => $airports], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
file_put_contents($file . '.tmp', $json);
rename($file . '.tmp', $file);   // swap in whole, so the site never reads a half-written file
echo 'Saved ' . count($airports) . " airports to data/airports-duffel.json ($skipped left out as military, too small or without scheduled flights)\n";
