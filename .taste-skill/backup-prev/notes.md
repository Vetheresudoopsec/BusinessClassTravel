# Notes — BusinessClassTravel

## Inventory
- Name: BusinessClassTravel, which names the cabin itself (fare codes J/C/D, lie-flat seats).
- Product: unpublished/consolidator business fares, priced by a person on request. No checkout.
- Constraint: consolidator fares can't be shown publicly, so a quote request is the only way in.
- Numbers: USD, taxes included, ±3-day windows, reply "within the hour" (to confirm).
- Printed things of its world: fare quote, e-ticket, itinerary.
- Places: the routes themselves (JFK–LHR, LAX–HND, MIA–DXB …), seen from the window above the clouds.

## Direction
split-stage, seed 963085052. Redraws: type (Rokkitt slab, uppercase and industrial, clashed with "sleek modern, not stylised"), now Clash Grotesk.
Photos: the dealt mountain set was not used; found travel photos instead.

## Idea
On this page, the quote request (the one thing a visitor came to do) becomes the half of the screen that never moves.
Live thing: choosing From/To fills the panel's fare line (published vs. indicative consolidator fare in USD), and the sticky photo turns to the destination.

## Adjustments to sheet
- The hero blueprint's crossing wordmark and dark field were dropped (too stylised for this brief). The name returns at full width in the footer, which carries the scaling-wordmark move.
- The slip has no zigzag edge or leaders, and the list sheet has no scallops, because the client asked for a calm, non-stylised look.

## Copy deck
H1: Business class, for less
Lead: We search the unpublished business-class fares airlines release only to agencies, and send you a real price, usually within the hour.
Promises: Free quote / Prices in USD, taxes in / Ticketed by the airline
Panel h2: Get your fare · button "Get my fare"
Showcase h2: Routes from {city}
List h2: Example fares from {city}
How h2: How booking works
Why h2: Why it costs less
Advisor h2: Talk to an advisor
FAQ h2: Questions, answered
CTA h2: Ask for your fare today
Footer: name at full width.

## Sample content to confirm
Phone +1 (888) 555-0199 · quotes@businessclasstravel.com · "within the hour" · 24/7 advisors · fare formula (indicative) · example carriers · FAQ policy answers (payment, changes, miles).

## Critique

ROUND 1 (first full render)
Seen in one second: a quote form on a sunset wing photo, with a large headline on the right.
Problems: the "Request received" block rendered invisibly ([hidden] overridden by display:grid); the shutter photos never revealed (IntersectionObserver ignores a clip-path'd target); on the phone the panel started about 600px down.

ROUND 2
Fixed the above. Problems: the footer MIAT seat was cluttered (bag, red belt); the calendar overflowed the panel (December cut off); the tablet footer split was cramped.

ROUND 3 (final)
Seen in one second: "Business class, for less", and a form you can fill in right now.
Idea (one sentence): the quote request is the half of the screen that never moves.
Live thing: choosing a route fills the fare line (published vs. indicative USD) and turns the stage photo to the destination; tapping any route on the page fills the panel.
Layout words by section: hero=split stage / routes=square plate + tabs / fares=printed sheet / how=slip / why=green field + wide photo / advisor=big number + 2-col list / faq=run-in paragraphs / cta=full-bleed photo / footer=photo half + menu half + full-width name
Scores: design 7.5 · usability 8.5 · creativity 7 · content 7 → overall 7.65
Caps applied: creativity ≤7 (a pinned quote form would also work for a competitor).
Top three remaining:
1. desktop-fold: a band of about 200px of empty ground between the lead and the promises on the right; acceptable as the page's one rest.
2. desktop-page-02: the green "Why it costs less" block is text plus one strip photo; a real comparison of fares would make it stronger (needs real data from the client).
3. The sticky stage photo stays the wing until a destination is chosen; per-section crossfades were not built, to keep the page calm and light.
Defended WARNs: off-centre (the left text edge is the panel's; the stage photo itself reaches the 23px margin); no-footage (first-load speed was the priority for lead capture, and the page is about 95 KB).
