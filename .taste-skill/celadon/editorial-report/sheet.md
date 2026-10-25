# DIRECTION SHEET — The printed annual
seed 377511223 · drawn 2026-10-21 · sector agency · tone luxury
Brief: Asia Pacific business and first class air ticket agency; visitor sends a quote request through a booking form, a personal advisor replies with written options; light, calm, luxury

| | |
| --- | --- |
| Direction | The printed annual |
| Hero | Two-by-two board |
| Type | Schibsted Grotesk |
| Colour | kept from the brand |
| Sections | how-it-works (Many into one) → about (Side facts, wide paragraph) → faq (Answers as reading text) → contact (Sentence, portrait, two links) → footer (Name first, places under it) |
| Motion | Shutter image |
| Photographs | the "People" set, as atmosphere |

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
Lay the page out like a well-designed printed report or magazine feature: a masthead image, a tight oversized title, text held to a strict column line, and colour used in solid blocks the way a two-colour print job would. It gives weight and authority to subjects that are really about content: findings, a manifesto, a programme, a serious product. The reader should feel that someone edited this.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A fixed vertical axis at about 42% of the viewport width organises everything: headings begin on it, body columns hang from it, and the 0–42% zone holds small side notes, figures or stays empty. Masthead: a wide image band (photographic mosaic or a single crop) across the top 45% of the first screen; below it the title at 7–9vw starting on the axis, with a two-sentence standfirst at 20–24px. Sections alternate between text pages (title on the axis, body in one or two columns of 34–40ch to its right) and full-bleed colour pages carrying one large figure, quotation or image mosaic. Mosaics are gutterless: photographs and flat colour tiles butted together in a 4- or 6-cell grid. Page numbers, running heads and other print furniture are left out.

## 3. Type — Schibsted Grotesk
A compact, warm grotesk set heavy with letters almost touching; small text stays in the same family at semibold. Suits music, events and culture pages where the type is the image.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;600;800&display=swap" rel="stylesheet">
```
- Display: **Schibsted Grotesk** — weight 800 · tracking -0.05em · leading 0.88 · sentence case or all lowercase
- Text: **Schibsted Grotesk** — 400 for paragraphs, 600 for navigation and other functional text · leading 1.4 · tracking -0.01em
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A tight heavy grotesk or a sharp serif for titles; an excellent text face for reading at 18–20px with leading near 1.5. Headings in sentence case, tracked tight.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. Paper, ink and two or three solid block colours. A colour page is a whole section in one flat colour.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "booking form"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Photographs used as blocks in mosaics alongside flat colour tiles; mixed subjects are fine if cropped tight and converted to one treatment.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "People" set (figures, silhouettes and portraits, mostly unposed)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: Give all photographs in a mosaic one treatment: greyscale via `filter: grayscale(1) contrast(1.05)`, or all full colour. Do not mix.
- `https://picsum.photos/id/832/1600/1000` — Woman in a pale blue shirt reading a book in soft window light · dark tone · dark olive, pale blue, warm skin · calm area: left · native landscape · photo: hieu le
- `https://picsum.photos/id/669/1600/1000` — Person in a mustard jacket and grey beanie seen from behind in fog · light tone · mustard, pale grey, white · calm area: left · native landscape · photo: Luke Pamer
- `https://picsum.photos/id/338/1600/1000` — Person in a hooded coat seen from behind facing a misty sea · mid tone · slate blue, grey, charcoal · calm area: left · native landscape · photo: Patryk Sobczak
- `https://picsum.photos/id/685/1600/1000` — Man sitting on a rock looking over a sea of clouds · mid tone · pale gold, grey, dark brown · calm area: right · native landscape · photo: Joshua Earle
- `https://picsum.photos/id/177/1600/1000` — Hiker with a backpack looking over a hazy mountain valley · mid tone · warm tan, hazy gold, olive · calm area: left · native landscape · photo: Danka & Peter
- `https://picsum.photos/id/1014/1600/1000` — Woman seen from behind facing a misty sea, a ribbon across her head · light tone · pale teal, soft grey, black · calm area: left · native landscape · photo: Oscar Keys
- `https://picsum.photos/id/22/1600/1000` — Man in a dark suit walking across painted road markings · mid tone · warm grey, charcoal · calm area: left · native landscape · photo: Alejandro Escamilla
- `https://picsum.photos/id/447/1600/1000` — Man standing on a wall facing a blue lake and distant mountains · mid tone · blue, slate, white · calm area: left · native landscape · photo: Joshua Earle
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, coast, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Two-by-two board
A board with 8px outer margins and 8px gaps throughout; every tile is a filled rectangle with one shared radius (0 or 8px). A 60px top row is itself made of tiles: a square ink tile with the logo mark, a wide ground-tone tile holding four text links that begin at the centre line, and an ink tile at the right end holding the single action. Below it the rest of the viewport is a two-by-two grid. Top-left: a paper tile with the name, or its first word, at clamp(96px, 12.5vw, 190px), medium weight, tracking -0.05em, sitting bottom-left on 24px padding. Top-right and bottom-left: photographs covering their tiles (object-fit: cover), both greyscale so they read as one picture continued across the board. Bottom-right is divided into two tiles side by side: a dark tile with one sentence at 24px, top-left aligned, and a tile in the accent colour with a second short statement at 24px, also top-left. Text never centres inside a tile. No tile is empty and none is outlined.

On a phone: The board becomes one column of tiles with 6px gaps: a top row with the logo tile and a menu tile; the name tile at 30% of the screen height with the name at 22vw bottom-left; one photograph tile at 4:3; then the dark tile and the accent tile side by side as two squares. The second photograph moves below the first screen.
Headline: The name, or its first word, up to 8 characters at 12.5vw; the two 24px statements are one sentence each.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Many into one (band)
A diagram drawn with one repeated shape instead of arrows. The heading (two to four words on two lines at clamp(36px, 4vw, 60px)) and a short paragraph at 17px sit in columns 1–4. Beneath, a wide inline SVG spans columns 1–12 at about 4.5:1. It is built from 120–160 small filled squares (or the page's own motif), each 10–14px. In the left third they are scattered loosely in two pale tones. In the middle third they are pulled into a tight horizontal ribbon three squares high. In the right third they fan out again into neat, evenly spaced rows in the accent colour. The eye reads disorder, compression, order, from left to right. Under the diagram, three text columns aligned to its thirds: a bold one-word name at 20px and two lines at 16px each; the words carry the sequence ('Gather', 'Reduce', 'Release'). No connecting marks.
On a phone: The diagram turns to run top to bottom: a 3:4 SVG with the scatter at the top, the ribbon as a vertical band in the middle and the ordered rows at the bottom. The three names and their text sit to its right in a 38vw column, each level with its zone.

### 2. about — Side facts, wide paragraph (table)
Two rows share one vertical line at 34% of the viewport width. Row one: in a 160px column at the left margin, three label and value pairs stack with 20px between them, each a label in the soft ink with its value beneath in full ink, all at 13px (founded, based in, team size). From the 34% line a five-line paragraph at clamp(20px, 1.7vw, 26px), leading 1.35, runs to 90% of the width. Row two starts 120px lower and repeats the logic for the record of the practice: one plain word at 13px at the far left (awards, press, clients), then from the 34% line two list columns, each 260px wide with a 64px gutter, at 13px with 10px between lines: name at the left, year at the right in the soft ink. No heading; the paragraph opens the section. Each list comfortably holds 6–12 lines. No photographs are needed.
On a phone: Everything aligns to the left margin. The paragraph comes first at 19px. The three label and value pairs follow as a two-column grid at 14px. The two record lists stack with 40px between them, each opened by its plain word in full ink.

### 3. faq — Answers as reading text (grid)
The questions and answers are set as continuous reading text, like the notes at the back of a programme. A heading of two or three words at 28–32px sits in columns 1–3, top-aligned. Columns 5–12 hold the text in two columns (`columns: 2; column-gap: 56px`), each about 36ch wide, at 16–17px with leading 1.55. Each item is one paragraph: the question is the opening run-in, set in the medium weight in the full ink and ending with its question mark, and the answer continues on the same line in the regular weight. Paragraphs are separated by 20px and carry `break-inside: avoid` so none splits across columns. No toggles, no icons, no boxes. Eight to fourteen items fit on one screen, which is the point: everything is answered at a glance. Where the page's reading column is narrow, use one column.
On a phone: One column at 16px with 20px margins. The heading leads at 24px. Each paragraph keeps its run-in question in the medium weight, with 18px between paragraphs. The section may run to two screens; do not collapse it into an accordion.

### 4. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 5. footer — Name first, places under it (list)
The wordmark opens the footer instead of closing it. On a full-bleed field in the page's inverse or final chapter colour, the name spans the full content width as the first thing, its cap line pushed 8% above the footer's top edge so the tops of the letters are sliced off by the section (`overflow: hidden` and a negative top margin in `em`). 72px beneath, a two-part row: columns 1–5 list the places or ways to reach the studio (cities, or email and telephone), one per line at 32–36px in the accent ink, each a link; columns 7–12 hold three columns of small links at 15px, top-aligned with the first place. A final row 96px lower carries the legal line at the left and a back-to-top text link at the right, both 13px. The field is about 90svh tall, and nothing sits between the wordmark and the row but space.
On a phone: The sliced wordmark stays at the top, fitted to the width. Places follow as a list at 26px, then the link columns two across at 15px. Legal line and back-to-top link share the last row at 12px, at opposite margins.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It crops letters along their top: the inspector fails that (jurors read it as broken). Crop at the bottom edge or a side instead.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The column line, the mosaics and whole pages of colour give structure and variety without ornaments.

## 11. How this direction goes wrong
The axis must be exact and reused everywhere or it reads as random indentation. Keep paragraphs to a real reading measure. On a phone the axis collapses to the left margin and side notes move inline above their paragraph.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **The Queue** (One Page Love, studied score 8.1) `opl-the-queue`
  Idea: An essay on queueing where the queue is the ornament: a line of drawn figures stands along the bottom of the hero and returns between chapters in changing period dress.
  Hero: Pinkish warm-grey page. A 12px mono breadcrumb sits top-left; there is no other navigation. The two-word title is set in a light serif at 200px (14vw), centred, its middle slightly above the viewport centre, spanning about 60% of the width with tight tracking. One centred line of grey 20px serif sits 40px beneath. The lower third stays empty until a single row of about 25 small greyscale drawn figures, each around 110px tall, stands on a hairline rule 20px above the bottom edge and runs the full width like a frieze.
  Worth taking: Turn the subject into the section divider: a frieze of small figures on a hairline, redrawn for each chapter, in place of rules or spacers.
- **Applied Imagination** (One Page Love, studied score 8.3) `opl-applied-imagination`
  Idea: An essay conceived on a flight is read as a descent: an altimeter ticks from 30,000 ft to zero while you scroll down through halftone clouds to mountains at ground level.
  Hero: A pale blue sky fading to warm cream fills the viewport, with white clouds shaded in halftone dots. A tiny serif logotype sits top-centre; no nav. The title, two centred lines of black wedge-serif at 8.9vw, occupies the middle half of the screen and about 73% of its width; a cloud layer passes in front of the second line's baseline so the feet of the letters dissolve into dots. A two-line centred deck at 24px sits beneath. A mono byline strip is centred on the bottom edge with a scroll cue bottom-right. On the left edge at mid-height, a short vertical rule carries a two-line mono altitude readout.
  Worth taking: Tie a persistent numeric readout to scroll position (altitude falling to zero) so the reader's progress becomes part of the story.
- **OhhMyDesign** (One Page Love, studied score 7.2) `opl-ohhmydesign`
  Idea: The whole page pretends to be an open design-tool canvas floating in a blue sky: a pixel ruler across the top, selection handles on elements and a labelled multiplayer cursor.
  Hero: Full-bleed blue sky with blurred clouds. A 30px ruler strip spans the top with ticks every 100px, logo at left, a scroll-percentage chip and live clock at right. Beneath it float three white pills: availability at left, a centred nav with a dark active item, an email at right. Centre stack: a translucent proof badge with selection handles on its corners; a two-line headline in ultra-condensed heavy capitals about 150px tall and 50% of viewport width, filled with a vibrating orange-and-navy dot pattern; a mono orange label; two lines of grey 19px text in a dashed selection box; an orange and an outlined button. Mono captions occupy both bottom corners.
  Worth taking: Borrow design-tool chrome as decoration: a ruler strip with a live scroll percentage, corner handles on one element, a labelled cursor.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/celadon/editorial-report/direction.json · reprint with `node draw.mjs --show`
