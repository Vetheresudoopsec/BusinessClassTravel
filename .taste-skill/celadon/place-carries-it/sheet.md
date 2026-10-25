# DIRECTION SHEET — The place carries it
seed 1599758002 · drawn 2026-10-21 · sector hospitality · tone luxury
Brief: Asia Pacific business and first class air ticket agency; visitor sends a quote request through a booking form, a personal advisor replies with written options; light, calm, luxury

| | |
| --- | --- |
| Direction | The place carries it |
| Hero | Small name, open sky |
| Type | Boska |
| Colour | kept from the brand |
| Sections | how-it-works (Drag row of moments) → about (Wide photo, colour tile, facts) → faq (Questions beside a tall photograph) → contact (Visit card on a photograph) → footer (Columns above, wordmark below) |
| Motion | Slow crossfade |
| Photographs | the "Fog and quiet" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
For a place, the photograph is the argument. One full-bleed image of where you would be standing fills the first screen, and the design steps back: the name sits along the bottom edge like a film title, or small in a corner, and nothing else interrupts the view. The page that follows keeps that restraint: few words, large pictures, long pauses. The designer's work here is editing: choosing the one frame that makes someone want to be there, and then not covering it.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
First screen: a single photograph at 100vw by 100svh, focal point kept clear of text. The name is set either very large (14–20vw) hugging the bottom edge with 16–24px of margin, or small (20–28px) top-left with a one-line description bottom-left. Navigation is two to four words in the top corners in the same small size. If text sits on the image, a soft neutral scrim under the text area only. Below, sections alternate between a short centred or left-set paragraph in a narrow column (max 52ch) with wide empty margins, and photographs shown large: one full-bleed, then a pair at different sizes, then one portrait offset to the right. Practical information (hours, address, rates, booking) is gathered once near the end in a plain two-column block.

## 3. Type — Boska
A high-contrast serif with pointed serifs and a lively italic, used roman and italic together at one size. Suits perfume, jewellery, lodges, weddings and other occasions for ceremony.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=boska@400,500&display=swap" rel="stylesheet">
```
- Display: **Boska** — weight 400 · tracking -0.02em · leading 0.95 · roman capitals for the main words with lowercase italic for the connecting words at the same size, or sentence case throughout; centred lines work
- Text: **Boska** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0.005em
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A face with some grace for the name; small, calm, well-spaced text everywhere else. Sentence case. Body 17–19px with leading around 1.55.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. Neutral paper or deep neutral ground chosen to flatter the photographs; text ink drawn from the darkest tone in the imagery. Colour lives in the pictures.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "booking form"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

The dealt set is the palette. Choose four to six photographs with the same light. The hero image must have a calm area for the name. Full-bleed or large with square corners; never thumbnails, never a carousel of ten.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: Leave photographs ungraded. If text overlays one, darken only the area behind the text with a neutral scrim.
- `https://picsum.photos/id/11/1600/1000` — Misty river winding through a grassy valley between forested slopes · mid tone · pale green, grey green, dark green · calm area: top · native landscape · photo: Paul Jarvis
- `https://picsum.photos/id/813/1600/1000` — Still blue lake with a faint distant shoreline in haze · mid tone · slate blue, powder blue · calm area: all · native landscape · photo: Roger Burkhard
- `https://picsum.photos/id/269/1600/1000` — Gulls perched on a concrete wall beside a pale still sea · light tone · white, pale blue, grey · calm area: left · native landscape · photo: Jill Heyer
- `https://picsum.photos/id/172/1600/1000` — Stone jetty stretching into still water and dense grey fog · mid tone · grey, warm grey · calm area: top · native landscape · photo: Aleksi Tappura
- `https://picsum.photos/id/926/1600/1000` — Lone figure standing on a hilltop in thick beige fog · light tone · warm beige, olive grey · calm area: top · native landscape · photo: Harman Abiwardani
- `https://picsum.photos/id/353/1600/1000` — Low cloud drifting over dark green forested hills · dark tone · deep green, grey · calm area: top · native landscape · photo: Forrest Cavale
- `https://picsum.photos/id/228/1600/1000` — Single round hay bale in a field under dense fog · mid tone · grey green, golden tan · calm area: top · native landscape · photo: Michal Kubicek
- `https://picsum.photos/id/941/1600/1000` — Small island on a pale, glassy sea beneath soft clouds · light tone · pale blue, soft white, grey · calm area: bottom · native landscape · photo: Ivan Slade
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: coast, forest, desert-and-road, architecture — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Small name, open sky
A single photograph fills the viewport edge to edge with no frame: choose one whose upper 45% is sky, wall or water with nothing in it and whose subject sits low and off-centre. All type is white and stays out of that empty zone. Top-left at a 24px margin, the name is stacked on two or three lines at 14px, like a letterhead. Top-right, three or four text links run in one line at 14px separated by commas, the current one marked by a 2px underline. Bottom-left, 32px from the left and bottom edges, the name repeats as the only larger type: two tight lines at clamp(44px, 4.2vw, 64px), line-height 1.0, regular weight, on columns 1–5. On the same baseline at the bottom-right margin sits the single action as an underlined text link with an arrow, and above it one supporting sentence at 15px, right-aligned, max 32ch. If a lower corner is too bright for white type, darken that corner alone with a neutral scrim. The page below opens on plain paper with one narrow paragraph and wide empty margins.

On a phone: The photograph is cropped to portrait around its subject and fills 100svh, its upper half still empty. The small stacked name stays top-left at 13px and the links collapse to one word top-right. The larger name sits bottom-left at 9.5vw on two lines, 20px in. The supporting sentence and the underlined action stack beneath it at 15px, left-aligned, 24px above the bottom edge.
Headline: The name set small on two lines of up to about 16 characters each at 4.2vw; the photograph does the work of a headline.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.
- Its action is a text link: the primary action on the first screen is a real button (filled or solid-bordered, 44px or taller), placed where the blueprint puts the link. A second action may stay a link.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Drag row of moments (carousel)
A story told left to right. Top row: the heading, two to four words at 28–36px, at the left margin; at the right margin two solid square buttons, 48px each, for back and forward. Directly beneath, a solid bar 6px tall spans the full width in a soft tone, with a full-ink segment showing how far the row has been scrolled. Then the row itself: six to nine columns, each 280px wide with 32px gaps, in a horizontally scrolling flex container with scroll-snap that bleeds off both viewport edges. Every column reads top to bottom: a one-line caption at 18px bold that carries the order in words ('We met', 'Two winters on', 'The move'), three lines at 15px in the soft ink, then 80–140px of empty space that varies per column, then a 4:5 portrait photograph. Because the spaces vary, the photographs' top edges rise and fall along the row.
On a phone: Columns are 72vw wide with 16px gaps, so the next one always shows at the right edge. The buttons are dropped; the 6px progress bar stays under the heading. The empty space inside columns shrinks to 32–64px but still varies from column to column.

### 2. about — Wide photo, colour tile, facts (mosaic)
Top: a heading of two to four words at clamp(40px, 4vw, 60px) on the left margin, then 24px below it a three-line lead paragraph at 21–22px across columns 1–6. 72px lower, two tiles sit side by side with a 16px gap. The left tile spans columns 1–8: a landscape photograph at 16:10 with one radius (0 or 10px). A short paragraph of up to 35 words at 16px is set in a solid paper-colour block 320px wide with 20px padding, placed over the photograph's top-right corner and flush with both edges. The right tile spans columns 9–12 and is a flat palette colour, 60% of the photograph's height: it holds a simple inline SVG outline of the region or the floor plan as one filled shape, with one solid dot marking the location. Under the colour tile, four label and value pairs at 14px in a two-by-two grid: altitude, distance, season, local time.
On a phone: Heading at 9vw, lead at 18px. The photograph goes full width at 4:3 and its overlaid paragraph moves beneath it as ordinary text. The colour tile follows at full width and 3:2, and the four label and value pairs sit under it in two columns.

Adjusted for this page:
- It sets text at 10px: use your small step (13px or more) instead.

### 3. faq — Questions beside a tall photograph (split)
One field in a deep or pale flat tone, split 5 to 7. Left, columns 1–5: a heading of two to four words at 36–44px; under it the three or four practical facts people ask first (address, times, how to arrive) as plain lines at 18px; then five or six questions as an accordion with no lines between rows, only 28px of space. Each question is a `<summary>` at 20px with a small chevron drawn from two 2px strokes at its right; the open answer sits beneath at 17px in the softer ink, on the same left edge. One filled button and one text link close the column. Right, columns 7–12: a tall photograph (3:4) that bleeds off the top edge of the section and stops 80px short of the bottom, with a second, square photograph a third of its width overlapping its lower-left corner by 40px.
On a phone: The tall photograph leads at full width, 4:5, with the square one overlapping its bottom-right corner at 38% width. Heading at 30px, facts at 17px, then the accordion at full width with 24px between questions and 44px touch targets. Button full width at the end.

### 4. contact — Visit card on a photograph (full-bleed)
A full-bleed photograph of the place, 100vw by 100svh, carries one solid card and nothing else. The card is a filled panel in the paper colour, fully opaque, 380px wide with 8px corners and 32px padding, placed in the upper-right corner 60px from the top and right edges (or the upper-left: pick the corner where the photograph is calmest). It holds, top to bottom: a two- or three-word title at 28px in a light weight; the address on two lines at 16px; the opening hours as three rows with days at the left and times right-aligned in tabular figures; the phone number; then, flush with the card's bottom edge and spanning its width, a solid booking button 52px tall. The card may be `position: sticky; top: 60px` inside a taller section so it holds while the photograph scrolls beneath it. The photograph's focal point must stay clear of the card. No heading outside the card.
On a phone: The photograph is 100vw by 70svh. The card leaves the corner: it spans the width with 16px margins and overlaps the photograph's bottom edge by 80px, so image and card interlock. The booking button is full width, 56px tall, at the card's bottom.

### 5. footer — Columns above, wordmark below (stack)
The footer inverts ground and ink and fills a whole viewport (min-height 100svh), arranged as three rows in a grid (auto 1fr auto). Top row, 40px from the edge: four small columns on the 12-column grid (address, navigation, social, hours or contact), each a plain list at 15–16px with its first line in the full ink and the rest in the softer ink. Middle row: empty. Bottom row: the wordmark alone, sized to run from the left margin to the right margin on one line. Set it as inline SVG text with a `viewBox` fitted to the word and `width: 100%`, or tune `font-size` in `vw` to the letter count, so it never wraps; its baseline sits 20px above a single line of legal text at 13px. With `position: sticky; bottom: 0` and a lower `z-index` than the page, the last section slides away to uncover it.
On a phone: Columns become two by two at 15px with 32px between rows, at the top. A gap of about 20svh follows. The wordmark spans the full width at the bottom; a name longer than ten letters stacks on two lines, each fitted to the width. Legal line beneath at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The photographs, at full size, uninterrupted. Empty paper around short text makes the next image land harder.

## 11. How this direction goes wrong
A weak hero photograph cannot be fixed by typography; pick again. Do not stack a headline, a paragraph and two buttons on the image. Do not use a booking bar that covers the bottom of the view; one small action is enough.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Eagle’s Nest** (One Page Love, studied score 7.5) `opl-eagles-nest`
  Idea: Let the lake view do the selling: full-bleed footage of the volcano horizon with the name set as a monumental cream serif along the bottom edge.
  Hero: Full-bleed video of a silhouetted figure meditating before a lake and volcanoes, with no scrim. The name is set in a high-contrast cream serif, uppercase, about 15vw, spanning the full width between 34px margins and sitting on the bottom edge so it covers the lower fifth of the frame. Directly above its left and right ends sit two pairs of small white labels (what it is, where it is). Top row: a round emblem far left, eight plain text links grouped right of centre and an outlined pill button far right. A small black vertical awards tab hangs on the right edge.
  Worth taking: Anchor the name at full width on the bottom edge of a full-bleed video and tuck two tiny descriptor pairs above its left and right ends.
- **IZANAMI** (Awwwards Site of the Day, studied score 7) `aww-izanami`
  Idea: Silence as design: one small sentence in fog, then a slow descent from mist into a dark glass pavilion.
  Hero: After a warm-black loader showing only one 18px serif sentence and a small counter, the hero is a full-bleed, desaturated grey-green image of pine forest dissolving into fog. The same sentence stays at 18px in white, left-aligned on a line about 17% from the left edge and exactly at vertical centre; it is the only text in the picture area. A small white seal-style logo sits top-left; a language switch and menu label in tiny tracked capitals sit top-right, each with a dot above. Along the bottom edge: copyright, two live city clocks, and a scroll cue at far right, all near 10px.
  Worth taking: Place a single 18px sentence at vertical centre on an offset left line over full-bleed fog, and let the absence of a headline be the statement.
- **Kereliott** (One Page Love, studied score 7.3) `opl-kereliott`
  Idea: A quiet house gets a quiet page: one dark field, one typeface, the name set as wide as the screen and photographs left to drift in generous darkness.
  Hero: Very dark green-black field with cream type. A two-line introductory sentence at about 30px sits top-left inside 30px margins; a small cream rectangular button sits top-right. The upper half is otherwise empty. The house name fills the full content width in a flared humanist sans, mixed case, with capitals about 19vw tall, its baseline at roughly 87% of the viewport height. Immediately beneath, separated by a gap of a few pixels, the top sliver of a full-width landscape photograph enters from the bottom edge.
  Worth taking: Size the wordmark to fill the content width exactly and let the first photograph tuck directly under its baseline.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/celadon/place-carries-it/direction.json · reprint with `node draw.mjs --show`
