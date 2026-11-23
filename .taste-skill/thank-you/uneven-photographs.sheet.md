# DIRECTION SHEET — Photographs at uneven sizes
seed 419154379 · drawn 2026-11-23 · redraws: 1 · sector hospitality · tone luxury
Brief: Thank-you page after a Business and First Class fare quote request: what happens next, your request, and the cabin, amenities and service ahead

| | |
| --- | --- |
| Direction | Photographs at uneven sizes |
| Hero | Two prints in darkness |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | how-it-works (Itinerary on a slip) → contact (Sentence, portrait, two links) → showcase (Frame run, one lifted) → footer (Name across the last photograph) |
| Motion | Slow crossfade |
| Photographs | the "Forest" set, as atmosphere |

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
A calm page where the pictures are placed like prints on a gallery wall: each at its own size and position, with text set small and light between them. Nothing lines up in the obvious way, yet everything sits on a grid you can feel. The unevenness is what makes it read as art-directed by a person: a small portrait far left, a wide landscape running off the right edge, a square that overlaps the next section. It lets photographs lead without ever becoming a slideshow.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A 12-column grid with wide margins (5–7vw). The hero is a single line of large light type (6–9vw) across the top third, and below it one photograph placed off-centre (columns 6–12, 16:10), its top edge overlapping the baseline zone of the headline by a few pixels of deliberate tension. Each following section places two or three photographs with different spans and vertical offsets: for example a 3:4 portrait in columns 2–5 starting 120px lower than a 16:10 landscape in columns 7–12; then a single small 1:1 in columns 9–11 beside a paragraph in columns 2–6. Paragraphs are short (max 40ch) and sit in the gaps. No two consecutive sections use the same arrangement. Vertical spacing is large and irregular on purpose (120–260px).

## 3. Type
Kept from the brand. A light or regular weight at large size for the few headings; small, quiet text. Serif or a slender sans. Everything left-aligned to grid lines.

## 4. Colour
Kept from the brand. A pale neutral ground with one deep ink taken from the photographs. No accent beyond a quiet link colour.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "hospitality"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Six to nine photographs from one set, in a deliberate mix of ratios (3:4, 4:5, 1:1, 16:10, 21:9). Square corners. Captions, if any, are one short line under an image in the soft ink.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Forest" set (woodland, paths between trees, moss and filtered light)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/229/1600/1000` — Path through tall pine trees fading into blue-grey fog · dark tone · blue grey, dark green · native landscape · photo: Orlova Maria
- `https://picsum.photos/id/919/1600/1000` — Tall straight pine trunks above a bright green forest floor · mid tone · fresh green, red brown, dark brown · native landscape · photo: Jon Ottosson
- `https://picsum.photos/id/932/1600/1000` — Low clouds drifting over an autumn conifer forest · mid tone · dark green, rust orange, mist white · native landscape · photo: Vadim Sherbakov
- `https://picsum.photos/id/878/1600/1000` — Bare gnarled trees in fog, black and white · dark tone · black, grey, white · black-and-white · native landscape · photo: Richard Loader
- `https://picsum.photos/id/216/1600/1000` — Narrow dirt trail through mossy green woodland · mid tone · moss green, brown · native landscape · photo: Paul Jarvis
- `https://picsum.photos/id/476/1600/1000` — Sunlight bursting between tall redwood trunks in a shaded forest · dark tone · dark brown, deep green, gold · native landscape · photo: Mr. Marco
- `https://picsum.photos/id/730/1600/1000` — Snow-dusted conifer forest fading into pale winter fog · light tone · frost white, pale grey, slate green · calm area: top · native landscape · photo: Ryan Pohanic
- `https://picsum.photos/id/879/1600/1000` — Aerial view of a narrow path cutting through dense dark forest · dark tone · deep green, dark teal, grey · native landscape · photo: Nick Scheerbart
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: coast, fog-and-quiet, mountain, water — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Two prints in darkness
One near-black field with a slight colour tint, about 75% of it left empty. Navigation is split between the top corners at 15px on 30px margins: the wordmark and three text links top-left, the single action top-right as the page's one solid light rectangle. Two low-key photographs sit in the dark like lit exhibits, both with square corners and no frame. The larger, a 4:5 portrait about 34% of the viewport wide (columns 6-9), has its top at 14% of the height, so it sits a little above the midline. The smaller, a 1:1 about 12% of the viewport wide (columns 2-3), sits far from it with its top at 52% of the height, dimmed with filter: brightness(0.7) so the large one stays the brightest thing on screen. The headline is modest: two lines at clamp(28px, 2.5vw, 40px) in a regular weight, flush to the bottom-left corner on the 30px margin. Columns 10-12 hold one sentence at 16px in the dimmer ink, bottom-aligned to the headline's last baseline, max 24ch. Nothing else is on screen.

On a phone: The large photograph takes 78% of the width, pushed to the right margin, its top at 12% of the height. The small square sits at 30% of the width on the left margin, overlapping the large one's lower-left corner by 24px. The headline sets at 6.4vw on two lines bottom-left with the sentence beneath at 15px. The action is a small solid rectangle top-right; links fold behind a menu word.
Headline: A quiet statement of 4-7 words at 28-40px, at most 44 characters on two lines.

Adjusted for this page:
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Itinerary on a slip (table)
The process is printed as an itinerary or receipt. One paper-coloured slip 420–480px wide stands on a contrasting flat ground at columns 7–11; its bottom edge is a zigzag cut with clip-path and its top edge is straight. The heading, two to four words at clamp(40px, 4.4vw, 68px), sits in columns 1–5 with a 30ch paragraph, top-aligned with the slip. On the slip, in the text face at 16px with tabular figures: stages grouped under time headings that carry the order ('Monday', 'Midweek', 'Friday'), each heading in bold with 28px above it. Under a heading, two to four rows; each row has what happens on the left, a duration or time on the right, and a leader of round 4px dots between. The final row is inverted, paper-coloured text on a full-width ink bar 44px tall, and states the result: what the reader holds at the end and the total time.
On a phone: The heading and paragraph come first. The slip follows at full width minus 16px margins, keeping its zigzag bottom edge. Rows keep left text, dots and right value on one line; long descriptions wrap under the left text. The inverted final row stays full width.

### 2. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 3. showcase — Frame run, one lifted (strip)
Columns 1–3 are a nearly empty column: the heading (two to four words at 24–28px) at the top, a link under it, and one or two short notes at 15px much further down, each level with the frame it describes. Columns 4–12 hold a run of six to eight frames of the same subject at one fixed height of 30vh, with natural widths and 6px gaps: the whole view, a tight crop of the same thing, a detail, the reverse side. The run is allowed to leave the right edge. One frame is lifted out of the row: shown at 2.2 times the row height with its bottom aligned to the row's bottom (flex row, align-items: end), so it stands above the others. Under each frame, at 15px: a name on the left and a single fact on the right. Square corners, no captions on the images.
On a phone: The heading and link sit on top. The lifted frame comes first at full width. The rest of the run scrolls sideways beneath it at a fixed height of 34vw with 4px gaps and scroll-snap, bleeding off the right edge. Notes are listed under the run at 15px.

### 4. footer — Name across the last photograph (full-bleed)
The footer is the page's last photograph, full-bleed at 100vw by 100svh, darkened evenly with `filter: brightness(0.62)` so paper-coloured type reads everywhere on it. Three layers of text sit on the image. Top row, 32px from the edge: a short link list at 16px at the left margin and contact details at the right margin, each no wider than three columns. Mid-height is left to the photograph. Along the bottom, the wordmark runs the full width in the paper colour, letters about 12–20vw tall depending on the name's length, baseline 56px above the edge; under it one line of legal text at 13px. Choose an image whose interest is in its middle band, since the top and bottom carry text. No panel, no box and no colour block separates the footer from the image: the photograph is the footer.
On a phone: The photograph is 100vw by 88svh, cropped to its strongest vertical slice. Links stack at the top-left at 16px, contact beneath them. The wordmark is fitted to the width along the bottom, with the legal line under it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Placement. The differing sizes and offsets create movement on a still page.

## 11. How this direction goes wrong
Uneven is not random: every image edge lands on a column line, and offsets come from a small set of values. On a phone, keep the unevenness with alternating widths (100%, 72% left, 60% right) rather than stacking everything full width.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Tengile Malamala Collection** (Awwwards Site of the Day, studied score 7.6) `aww-tengile-malamala-collection`
  Idea: Let the land and animals carry everything: one staggered hairline-serif headline over aerial footage, then cream pages of olive-green serif text with photographs placed at uneven sizes.
  Hero: Aerial river footage fills the viewport, slightly darkened. Three small white caps items sit on the top edge: an enquiry link hard left, a stacked three-line wordmark centred, 'menu' hard right. The headline is two words on two lines in thin serif capitals about 8.3vw tall: the first line starts 10% from the left, the second is indented to 40% and ends near 90%, so the pair steps diagonally across the middle third. Below, starting at the 50% line, a three-line serif sentence at about 20px and a small white square-cornered button with a separate arrow square beside it. The lower third is left to the water.
  Worth taking: Stagger a two-line headline: first line from the left margin, second indented by 30% so the pair steps diagonally across the image.
- **Zara Webb** (One Page Love, studied score 8) `opl-zara-webb`
  Idea: A one-woman newborn-care practice presented like a hand-made keepsake: a mascot rabbit, scalloped and flower-shaped cut-outs, candid film photographs.
  Hero: Split exactly in half. Left, on cream: two-line mono caps nav stacks sit at the column's top-left and top-right with a handwritten script logo centred between them. Centred below, a five-line headline in a condensed serif, each line broken to one to three words so the block forms a ragged lozenge; then a three-line 16px sans paragraph and an outlined pill button in mono caps. A line-drawn rabbit on a skateboard rides a hairline at the column's bottom-right. Right: a candid flash photograph bleeds off the top and right edges and stops at 92% height; a lilac pill button and a round chat icon overlay its top-right corner.
  Worth taking: Mask photographs into soft custom shapes (a four-petal flower, a scalloped egg) and let their container crop them.
- **Eagle’s Nest** (One Page Love, studied score 7.5) `opl-eagles-nest`
  Idea: Let the lake view do the selling: full-bleed footage of the volcano horizon with the name set as a monumental cream serif along the bottom edge.
  Hero: Full-bleed video of a silhouetted figure meditating before a lake and volcanoes, with no scrim. The name is set in a high-contrast cream serif, uppercase, about 15vw, spanning the full width between 34px margins and sitting on the bottom edge so it covers the lower fifth of the frame. Directly above its left and right ends sit two pairs of small white labels (what it is, where it is). Top row: a round emblem far left, eight plain text links grouped right of centre and an outlined pill button far right. A small black vertical awards tab hangs on the right edge.
  Worth taking: Anchor the name at full width on the bottom edge of a full-bleed video and tuck two tiny descriptor pairs above its left and right ends.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/thank-you/uneven-photographs/direction.json · reprint with `node draw.mjs --show`
