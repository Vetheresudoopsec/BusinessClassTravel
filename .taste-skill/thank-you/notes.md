# Thank-you page — 3 mockups (2026-11-23)

Photos: the six the client ticked on screening.html (U30, U9, U43, U49, U52, U330), all Unsplash, hotlinked
from images.unsplash.com and credited in each footer. Cabin seats, dining, amenities and crew were all left
unticked, so those topics are carried in words. The clouds clip is the site's own img/clouds.webm.
Brand kept (--keep palette,type): blue #0f2a78, white, ink #14202f, system font stack.
Sample request seeded by mock.js (Jordan Ellis, JFK to LHR, 12–26 Mar 2027, 2 adults); the real page reads the visitor's own.

| | Direction (seed) | Idea | Live thing |
|---|---|---|---|
| A a.html | The dark room (90259000) | The warm light through the cabin window becomes the lit exhibit in a dark navy room. | Two "doors" (Your request / The journey ahead) dim each other on hover; the request card sits on the clouds clip. |
| B b.html | Photographs at uneven sizes; how-it-works redrawn to "Itinerary on a slip" so A and B differ | The steps are printed as the visitor's own itinerary slip (JFK to LHR), ending "Your Business Class seat · Booked". | Hero print crossfades between window, lounge and cabin every 6 s. |
| C c.html | The name as a monument | "Thank you" set as the monument across the brand-blue band; the phone number returns as display type. | Accordion of tinted blue stages (clouds clip in the last); Seat / Lounge / Service tabs swap the plate. |

Inspector: 0 FAIL on all three at 1440, 768, 390. Standing WARNs, defended: font-not-dealt (brand font kept on
purpose); A ragged edges (the diagonal is the layout); B/C no-footage (B has no clip; C's clip sits in a closed
accordion pane); B lopsided @768 (closing row is short by design).

Critique, last round (rough, out of 10): A 7.0, B 7.3, C 7.5.
Headings now use text-wrap: balance (fixes A's "…Request, / Jordan" orphan and C's call heading in Chrome/Safari).
Top remaining issues: B's footer photo shows the TWA
sign; C needs thank-you.js changed if chosen (it writes #thanks-title, which C keeps as a hidden placeholder).

Sample claims to confirm before launch: "dining at your seat", "lounge access with most Business Class fares",
"replies within 24 hours" (already on the site), and the amenity lines in each "journey ahead" section.

## D d.html (client feedback: "like C, not the big Thank you; like the last page of A")
C's structure (lounge photo over the blue band, request two-column, accordion steps) with the monument removed:
the h1 is the normal "Thank You for Your Request, {name}" (keeps thank-you.js working unchanged). C's tab plate is
replaced by A's band of unequal panels with captions, C's giant phone number by a quiet blue close, and the footer is
A's light one. Inspector 0 FAIL; WARNs: font-not-dealt (brand font), no-footage (clip is in a closed accordion pane),
off-centre at 768/390 (not located; nothing visibly off in the renders).

### D, round 2 (client: "the last page of A" = the request card over the clouds; drop the amenities; hover credits)
Request section is now A's card over the clouds clip (brand-blue card). "The journey ahead" band removed, and its
nav link. Footer credits column removed; each photo carries "Photo by {name} on Unsplash" as small white links that
show on hover (hero: top-right under the nav; accordion photos: bottom-right). The third accordion stage now shows
the window photo (Fabio Sasso) since the clip moved to the request section.
Inspector: 2 FAIL left, both from the client's own requests: few-pictures (3 on screen) and reduced-hidden (credits
invisible until hover). On touch screens the credits appear only where the browser turns a tap into hover.

### D, round 3 (client: less blue and dark; white header logo; hover accordion; plain credit links)
Blue now only on buttons, the phone number, link hovers and the footer wordmark. Hero band and request card are
white; clouds brightened; accordion and the call section use neutral greys (#f2f2f2/#e6e6e6/#d9d9d9, #efefef).
A warm sand and then a stone grey were tried first and failed the house rule against cream grounds.
Header logo and links are white over a neutral top scrim on the lounge photo. Accordion opens on hover (desktop,
pointer devices) and on click/tap. Credits are one plain white link each (no background), with a ↗ on hover.
Inspector: 1 FAIL left, few-pictures (3 photos), from the client's removal of the amenities section.
