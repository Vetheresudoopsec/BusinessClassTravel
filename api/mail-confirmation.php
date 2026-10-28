<?php
/* The confirmation email a customer receives after requesting a quote (design B, "Boarding Pass").
 * quote_confirmation($q) returns [subject, text, html]. $q holds the cleaned request:
 *   fromCode, fromCity, toCode, toCity, depart, return (YYYY-MM-DD or ''), trip (round|oneway|multi),
 *   cabin ('Business Class'|'First Class'), adults, children, flexible (bool)
 * Built from tables and inline styles, the only layout every email app understands. */

function quote_confirmation(array $q) {
  $site  = 'https://business-class-travel.com';
  $sales = 'sales@business-class-travel.com';
  $phone = '305-244-6463';
  $h = function ($v) { return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8'); };
  $short = function ($v) {
    $d = $v ? DateTime::createFromFormat('!Y-m-d', $v) : false;
    return $d ? $d->format('j M Y') : '';
  };

  $fromCity = $q['fromCity'] ?: $q['fromCode'];
  $toCity   = $q['toCity'] ?: $q['toCode'];
  $trips    = ['round' => 'Round trip', 'oneway' => 'One way', 'multi' => 'Multi-city'];
  $fields = [
    'Depart'     => $short($q['depart']) ?: ($q['flexible'] ? 'Flexible' : 'To confirm'),
    'Return'     => $q['trip'] === 'round' ? ($short($q['return']) ?: ($q['flexible'] ? 'Flexible' : 'To confirm')) : '—',
    'Cabin'      => preg_replace('/ Class$/', '', $q['cabin']),
    'Passengers' => $q['adults'] . ' adult' . ($q['adults'] === 1 ? '' : 's')
                  . ($q['children'] ? ', ' . $q['children'] . ' child' . ($q['children'] === 1 ? '' : 'ren') : ''),
    'Dates'      => $q['flexible'] ? '± 3 days' : 'Fixed',
    'Trip'       => $trips[$q['trip']] ?? 'Round trip',
  ];
  $about = 'Your quote is free, carries no obligation and includes every tax and fee for every passenger, with no booking fees added. '
         . 'Once sent, it remains valid for 14 days, subject to seat availability. Nothing is booked until you confirm.';

  $subject = "Your quote request: $fromCity to $toCity";

  // Plain-text version, for mail apps that don't show HTML.
  $text = "THANK YOU FOR YOUR REQUEST\n"
        . "Your consultant will send your fares within 24 hours.\n\n"
        . "{$q['fromCode']} {$fromCity}  →  {$q['toCode']} {$toCity}\n";
  foreach ($fields as $k => $v) $text .= str_pad("$k:", 13) . "$v\n";
  $text .= "\nBEFORE YOU HEAR FROM US\n$about\n\n"
         . "Add travel details: reply to this email, or write to $sales\n"
         . "Call us: $phone\n\n"
         . "Business Class Travel · $sales · Terms of Service: $site/terms.html\n"
         . "You are receiving this email because you requested a quote at business-class-travel.com. Fares are subject to availability until ticketed.\n";

  // Six details in a grid of three columns.
  $cell = function ($label, $value) use ($h) {
    return '<td width="33%" valign="top" style="padding:0 8px 20px 0;font-family:-apple-system,\'Segoe UI\',Helvetica,Arial,sans-serif">'
         . '<div style="font-size:11px;font-weight:600;letter-spacing:1.1px;text-transform:uppercase;color:#5B6577">' . $h($label) . '</div>'
         . '<div style="margin-top:4px;font-size:15px;font-weight:600;color:#14202F">' . $h($value) . '</div></td>';
  };
  $keys = array_keys($fields);
  $grid = '';
  foreach ([array_slice($keys, 0, 3), array_slice($keys, 3, 3)] as $row) {
    $grid .= '<tr>';
    foreach ($row as $k) $grid .= $cell($k, $fields[$k]);
    $grid .= '</tr>';
  }

  $font = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
  $mailto = 'mailto:' . $sales . '?subject=' . rawurlencode("Travel details: {$q['fromCode']} to {$q['toCode']}");
  $code = function ($label, $codeText, $city, $align) use ($h, $font) {
    return '<td valign="top" align="' . $align . '" style="font-family:' . $font . '">'
         . '<div style="font-size:12px;color:#5B6577">' . $label . '</div>'
         . '<div style="margin-top:2px;font-size:44px;line-height:44px;font-weight:600;letter-spacing:-1px;color:#0F2A78">' . $h($codeText) . '</div>'
         . '<div style="margin-top:6px;font-size:14px;color:#3A4556">' . $h($city) . '</div></td>';
  };

  $html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    . '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>' . $h($subject) . '</title>'
    // Phones: narrower margins and stacked buttons. Apps that ignore this still get the desktop layout.
    . '<style>@media (max-width:620px){.px{padding-left:24px!important;padding-right:24px!important}'
    . '.btn{display:block!important;width:100%!important;box-sizing:border-box;text-align:center}.btn a{display:block!important}'
    . '.gap{display:block!important;height:12px!important;width:auto!important}.btns{width:100%!important}}</style></head>'
    . '<body style="margin:0;padding:0;background:#EEF2F9">'
    // Preview line shown beside the subject in the inbox.
    . '<div style="display:none;max-height:0;overflow:hidden;opacity:0">Your consultant will send your fares within 24 hours.</div>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EEF2F9"><tr><td align="center" style="padding:32px 12px">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF">'

    // Blue band: logo, eyebrow, heading
    . '<tr><td class="px" style="padding:36px 40px 40px;background:#0F2A78;font-family:' . $font . ';color:#FFFFFF">'
    . '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
    . '<td valign="middle" style="padding-right:10px"><img src="' . $site . '/img/email-logo.png" width="22" height="28" alt="" style="display:block;border:0"></td>'
    . '<td valign="middle" style="font-family:' . $font . ';font-size:18px;color:#FFFFFF"><b>BusinessClass</b> Travel</td>'
    . '</tr></table>'
    . '<div style="margin-top:36px;font-size:12px;font-weight:600;letter-spacing:1.7px;text-transform:uppercase;color:#B9C8EC">Quote request confirmed</div>'
    . '<h1 style="margin:10px 0 12px;font-size:30px;line-height:36px;font-weight:600;color:#FFFFFF">Thank You for Your Request</h1>'
    . '<div style="font-size:16px;line-height:26px;color:#DCE4F5">Your consultant will send your fares within 24 hours.</div>'
    . '</td></tr>'

    // Route box
    . '<tr><td class="px" style="padding:32px 40px 0">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #DCE2EE">'
    . '<tr><td style="padding:28px 32px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
    . $code('From', $q['fromCode'], $fromCity, 'left')
    . '<td valign="middle" align="center" style="font-family:' . $font . ';font-size:28px;color:#8FA8E0">&rarr;</td>'
    . $code('To', $q['toCode'], $toCity, 'right')
    . '</tr></table></td></tr>'
    . '<tr><td style="border-top:1px solid #E3E8F2;padding:24px 32px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
    . $grid . '</table></td></tr>'
    . '</table></td></tr>'

    // What to expect
    . '<tr><td class="px" style="padding:40px 40px 8px;font-family:' . $font . '">'
    . '<h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#14202F">Before You Hear From Us</h2>'
    . '<p style="margin:0;font-size:15px;line-height:26px;color:#3A4556">' . $h($about) . '</p>'
    . '</td></tr>'

    // Buttons
    . '<tr><td class="px" style="padding:28px 40px 40px"><table role="presentation" class="btns" cellpadding="0" cellspacing="0" border="0"><tr>'
    . '<td class="btn" style="background:#0F2A78;border-radius:2px"><a href="' . $h($mailto) . '" style="display:inline-block;padding:13px 22px;font-family:' . $font . ';font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none">Add travel details</a></td>'
    . '<td class="gap" width="12"></td>'
    . '<td class="btn" style="border:1px solid #0F2A78;border-radius:2px"><a href="tel:+13052446463" style="display:inline-block;padding:12px 21px;font-family:' . $font . ';font-size:15px;font-weight:600;color:#0F2A78;text-decoration:none">Call ' . $phone . '</a></td>'
    . '</tr></table></td></tr>'

    // Footer
    . '<tr><td class="px" style="padding:24px 40px 32px;border-top:1px solid #E3E8F2;font-family:' . $font . '">'
    . '<p style="margin:0 0 16px;font-size:13px;line-height:21px;color:#5B6577">Business Class Travel &middot; '
    . '<a href="mailto:' . $sales . '" style="color:#5B6577">' . $sales . '</a> &middot; '
    . '<a href="' . $site . '/terms.html" style="color:#5B6577">Terms of Service</a></p>'
    . '<p style="margin:0;font-size:12px;line-height:19px;color:#5B6577">You are receiving this email because you requested a quote at business-class-travel.com. Fares are subject to availability until ticketed.</p>'
    . '</td></tr>'

    . '</table></td></tr></table></body></html>';

  return [$subject, $text, $html];
}
