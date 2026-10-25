# Notes — BusinessClassTravel (board redesign, 2026-10-21)

Previous page and notes are kept in .taste-skill/backup-prev/.

## Brief, as read
Airfare consolidator: unpublished business/first fares, priced by a human advisor on request, for travellers
across Asia Pacific, quoted in USD. One action: send the quote form. Inspiration: TravelBusinessClass.com
(published fare vs agency fare per route, search form on the first screen). User overrides: no Inter/Roboto/system
sans, no purple, no split-screen hero, gradients or geometric patterns allowed on purpose, staggered load choreography.

## Inventory
- Name: BusinessClassTravel; the cabin's booking code is J (also C, D, I, Z).
- Constraint: agency (consolidator) fares are kept out of public search; only an advisor can price them.
- Numbers: USD per person, taxes in; ±3 days; reply "within the hour"; +1 (888) 555-0199.
- Base: Asia Pacific; fallback origin HKG; hubs HKG, SIN, SYD, HND.
- Printed things: the departures board (split-flap), fare quote, e-ticket, boarding pass, seat map.
- Object: the 1-2-1 reverse-herringbone business cabin — angled pods, a strong diagonal pattern.
- Light: dusk at cruising altitude, wing against an amber horizon; harbour cities at night.
- Colour of its world: board black, flap white, FIDS amber.

## Argument
1. Hero — Business class, for less. Proof: the quote form, right there; the wing at dusk.
2. Fares — Agency fares are a third or more below published. Proof: example routes from the visitor's hub.
3. Why — Airlines release part of the cabin to agencies at net rates; same seat, same ticket. Proof: seat map + photo.
4. How — Four steps; never pay before choosing. Proof: the steps.
5. Advisor — A person answers. Proof: call-back bar, phone.
6. FAQ — Real objections answered.
7. CTA + footer — Ask for your fare today; the name on flaps.

## Direction
dense-tiles "The well-kept board", seed 1075229197. Redraw: section:about → about-photo-tile-facts (no team photos exist).
Palette: dealt proportions kept (soot ground, white ink, one accent), lime swapped for departures-board amber — the subject's own colour.
Gradients: allowed by the user's request — used twice on purpose: the night-sky name tile and the dawn tile in the close.

## Idea
On this page, the airport departures board — where the airline's published fare flips over to the agency fare — becomes the board of tiles the page is built from.
Live thing: the fare board opens on departures from the visitor's own hub (from their time zone), switches hub by tab with the rows flipping in, and tapping a route fills the quote form.
Signature: the board "refreshes" on load — tiles flip down in a diagonal stagger (animation-delay), the wing photo opens as a shutter.

## Copy deck
Bar: J mark · Fares · Why it costs less · How it works · Questions · Call +1 (888) 555-0199
H1: Business class, / for less
Lead: We find the business and first class fares airlines release only to agencies. An advisor sends you a real price.
Form h2: Ask for a fare · button "Get my fare"
Dark tile: Same airline, same seat, same ticket. Only the price changes.
Amber tile: Most quotes arrive within the hour, by email or message.
Fares h2: Departures from {city} · button "Ask for your fare"
Why h2: Why it costs less
How h2: How booking works
Advisor h2: Talk to an advisor · Call me back
FAQ h2: Questions, answered
CTA h2: Ask for your fare today · button "Start my quote"

## Sample content to confirm
All example fares (published and agency), durations and carriers; "within the hour"; "24 hours a day"; phone and email; miles answer; change rules answer.
