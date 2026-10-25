# DIRECTION SHEET — Type and nothing else
seed 1322490324 · drawn 2026-10-21 · sector agency · tone luxury
Brief: Asia Pacific business and first class air ticket agency; visitor sends a quote request through a booking form, a personal advisor replies with written options; light, calm, luxury

| | |
| --- | --- |
| Direction | Type and nothing else |
| Hero | Headline across two fields |
| Type | Archivo |
| Colour | kept from the brand |
| Sections | how-it-works (Lines that step across) → about (Side facts, wide paragraph) → faq (Answers as reading text) → contact (Address in display rows) → footer (Contact as the headline) |
| Motion | Colour by chapter |
| Photographs | the "Architecture" set, as atmosphere |

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
The first screen is made only of words, colour and space, good enough that nobody misses a picture there. Pictures arrive later, large and few, as relief from the type. This is the honest answer when a subject has nothing worth photographing: instead of inventing illustrations, set what you have to say as well as it can be set. The typography carries a point of view through scale (one enormous statement, everything else small), through measure (a narrow, bookish column or a full-width line), and through one committed colour.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
First screen: the statement, two lines at most, set at 9–14vw and occupying the full width with tight leading, positioned in the upper two-thirds. One supporting sentence at 20–24px sits bottom-left on the same margin and the single action sits bottom-right on the same baseline. No navigation bar; two or three links in a top corner. Sections that follow are typographic set pieces, each different: a list of five to eight capabilities set at 4–6vw one per line; a paragraph at 28–36px in a 28ch column pushed to the right half; a pair of large numerals with a sentence each; a single quotation filling a colour field. Each section uses a different horizontal position (left, right, full) so the page has movement without imagery.

## 3. Type — Archivo
One variable family pushed to its narrowest, heaviest setting for headlines and relaxed to normal width for text, so display and body share a skeleton. Suits sportswear, campaigns and fintech pages that speak in capitals.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap" rel="stylesheet">
```
- Display: **Archivo** — weight 800 at font-stretch 62% (load the wdth axis and use its narrowest setting) · tracking -0.01em · leading 0.86 · uppercase
- Text: **Archivo** — normal width · 400 for body, 500 for buttons and emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2.5rem, 1.2rem + 5vw, 5.5rem);
}
```
This direction lives or dies on the face and its settings. Display at tight tracking and leading; text sizes few and far apart (for example 15, 22, 34 and the display size). Use real typographic detail: proper quotes, balanced line breaks, hung punctuation where it helps.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. Either one saturated ground for the whole page with a single ink, or paper and ink with one section inverted and one in the accent as a full field. Colour does the job images would have done.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "booking form"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

The first screen has no picture. Further down, real pictures of the subject's world (found with scripts/assets.mjs) arrive large and few: a full-bleed photograph between two type sections, a looping clip in one band, an archival image beside a list. Do not add icons, shapes, patterns or abstract graphics to compensate for anything.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Architecture" set (structure, lines, bridges, facades and building interiors)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/546/1600/1000` — Vaulted stone cloister corridor lit by warm light through arches · dark tone · burnt orange, dark brown, amber · native landscape · photo: Hartmut Tobies
- `https://picsum.photos/id/870/1600/1000` — White lighthouse with its lamp lit against a deep blue starry sky · mid tone · deep blue, white, warm orange · calm area: right · native portrait · photo: Joshua Hibbert
- `https://picsum.photos/id/623/1600/1000` — Underside of a red suspension bridge reaching toward hills in pastel light · light tone · pale pink, rust red, soft blue · calm area: right · native landscape · photo: Michael Hirsch
- `https://picsum.photos/id/949/1600/1000` — White spiral atrium with a glass dome skylight, seen from below · light tone · white, pale grey · native portrait · photo: Drew Patrick Miller
- `https://picsum.photos/id/744/1600/1000` — Suspension bridge rising above a thick blanket of fog in blue light · mid tone · sky blue, white, rust red · calm area: right · native landscape · photo: Modestas Urbonas
- `https://picsum.photos/id/315/1600/1000` — View straight up a dark building lightwell to bright sky · dark tone · dark brown, white, olive · native landscape · photo: Liam Andrew
- `https://picsum.photos/id/1081/1600/1000` — Stepped white modern building corner rising into a pale blue sky · light tone · white, pale blue, soft grey · calm area: top · native landscape · photo: Julien Moreau
- `https://picsum.photos/id/620/1600/1000` — White arched bridge spanning grey water under a pale sky · light tone · white, pale grey, charcoal · black-and-white · calm area: bottom · native landscape · photo: Matthew Wiebe
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, people, coast, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Headline across two fields
The viewport is two flat fields meeting at exactly half height: paper above, one saturated colour below, with a hard edge and nothing drawn on it. A two-line headline in black-weight capitals at clamp(96px, 9.5vw, 150px), line-height 0.86, is centred across the seam and spans about 70% of the width, so line one stands on the upper field and line two is cut through its upper third by the seam. The type changes ink where it crosses: above the seam it takes the accent ink, below it a deep ink two steps darker than the lower field, as if submerged. Build it as two stacked copies of the same headline, one per ink, the first clipped with `clip-path: inset(0 0 50% 0)` and the second with `inset(50% 0 0 0)`. Wordmark top-left at 28px; up to four text links and the single action, a solid rectangular button, top-right. One supporting sentence at 20px in the paper colour is centred on the lower field, 56px above the bottom edge. The lower field continues for 30svh past the fold before the next colour begins.

On a phone: The same two fields with the seam at 46svh. The headline stays on two lines at 15vw, centred, still cut by the seam and still changing ink. Wordmark top-left and the action button top-right; the links drop into one menu word beside it. The supporting sentence sits on the lower field at 16px, centred, max 28ch, with 40px beneath it.
Headline: A statement of two to four words on two lines, up to about 10 characters per line, whose meaning the rising field acts out.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Archivo, text Archivo) and their settings; capitals only where the type system sets them.
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Lines that step across (statement)
The sequence is written, not counted. Four lines of display type, one stage per line, each a complete short clause that begins with its order word: 'First you send it.' 'Then we take it apart.' 'You choose one.' 'It ships on Friday.' Set at clamp(36px, 4.6vw, 76px), leading 1.0, one line each. The first line starts on column 1 and each following line starts two columns further right (grid-column-start 1, 3, 5, 7), so the block descends as a staircase and the eye follows the diagonal. Under each line, on that line's own left edge and 12px below, a sentence of up to 34ch at 17px in the soft ink. 56px between stages. The last line may take the accent colour as the single emphasis. The first line serves as the heading; there is no title above. Leave the columns to the left of the final stage empty.
On a phone: Lines drop to 8.4vw and may wrap onto a second line. The staircase becomes a smaller indent of 6vw per stage, so the fourth line starts 18vw in. Each sentence sits under its line at 16px on the same indent. 40px between stages.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 2. about — Side facts, wide paragraph (table)
Two rows share one vertical line at 34% of the viewport width. Row one: in a 160px column at the left margin, three label and value pairs stack with 20px between them, each a label in the soft ink with its value beneath in full ink, all at 13px (founded, based in, team size). From the 34% line a five-line paragraph at clamp(20px, 1.7vw, 26px), leading 1.35, runs to 90% of the width. Row two starts 120px lower and repeats the logic for the record of the practice: one plain word at 13px at the far left (awards, press, clients), then from the 34% line two list columns, each 260px wide with a 64px gutter, at 13px with 10px between lines: name at the left, year at the right in the soft ink. No heading; the paragraph opens the section. Each list comfortably holds 6–12 lines. No photographs are needed.
On a phone: Everything aligns to the left margin. The paragraph comes first at 19px. The three label and value pairs follow as a two-column grid at 14px. The two record lists stack with 40px between them, each opened by its plain word in full ink.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 3. faq — Answers as reading text (grid)
The questions and answers are set as continuous reading text, like the notes at the back of a programme. A heading of two or three words at 28–32px sits in columns 1–3, top-aligned. Columns 5–12 hold the text in two columns (`columns: 2; column-gap: 56px`), each about 36ch wide, at 16–17px with leading 1.55. Each item is one paragraph: the question is the opening run-in, set in the medium weight in the full ink and ending with its question mark, and the answer continues on the same line in the regular weight. Paragraphs are separated by 20px and carry `break-inside: avoid` so none splits across columns. No toggles, no icons, no boxes. Eight to fourteen items fit on one screen, which is the point: everything is answered at a glance. Where the page's reading column is narrow, use one column.
On a phone: One column at 16px with 20px margins. The heading leads at 24px. Each paragraph keeps its run-in question in the medium weight, with 18px between paragraphs. The section may run to two screens; do not collapse it into an accordion.

### 4. contact — Address in display rows (list)
The contact block is a stack of five full-width rows, every one set at the same size, clamp(44px, 6vw, 88px), regular weight, left-aligned with a 20px inset and leading 1.0: the building or venue name, the street, the city with postcode, the opening hours as one compact line, the phone number. Each row is about 150px tall with the text sitting in its lower third; rows are told apart by alternating two flat tones of the section colour as full-width bands, or by 28px of space alone. A sixth row holds a one-word greeting at the same size followed, 24px to its right and centred on the x-height, by a solid round button 0.9em across with an arrow, which opens the email or booking link. Street and phone rows are links (map, call). No heading and no form. Optionally, one small round photograph sits at the right end of the first row.
On a phone: Rows at 9.6vw with 16px insets, about 84px tall; the hours break onto two rows (days, then times). The greeting row becomes a full-width band in the accent colour with the round arrow button at its right end, 56px across.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 5. footer — Contact as the headline (statement)
A full-bleed field in one saturated palette colour, at least 90svh tall. Top row, 40px from the edge: two or three short notes at 15px in columns 1–7 (address, hours, a one-line description) and a back-to-top text link at the right margin. Then a tall empty gap. In the lower half, the way to get in touch is the display line: the telephone number or the email address itself, set at 8–9vw, flush left, hard against the margin, as one link. An email address may break once, before the @, giving two lines. Size it with `clamp()` so the longest line fills at least 80% of the width. Under it, one row of small text at 14px spread across three positions: links at the left, credits in the centre, city and year at the right. The wordmark appears only small, in the top row.
On a phone: Notes stack at the top at 15px. The contact line sits in the lower half at 12vw; a telephone number stays on one line, an email breaks before the @ and is sized so each half fits the width. The meta row becomes three stacked lines at 13px.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

## 8. Motion — Colour by chapter
Each chapter is its own full-bleed field of one palette colour, so the ground changes exactly at section edges as you scroll, never as a global recolouring of the screen. The only movement: the fixed header (or the one pinned element) takes the ink of the chapter beneath it, switching with a 300ms colour transition as each edge passes under it. Do not drive the page background from an observer: in blind tests a page recoloured mid-section, with a paragraph sitting on two colours, read as broken twice.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Scale contrast and colour mass. A capability list set at 5vw is an image in its own right.

## 11. How this direction goes wrong
Without pictures, weak copy has nowhere to hide: write real sentences. Vary the set pieces; four sections of big-heading-plus-paragraph is a text document, not a design. Keep all headings within two lines.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Spatial** (One Page Love, studied score 7.7) `opl-spatial`
  Idea: Typography behaves like sound in a room: plain black statements swell, stretch and bend through an empty white viewport as you scroll.
  Hero: A white viewport holding only the festival dates: two centred lines in Neue Haas Grotesk Roman at roughly 6.7vw, black, tight leading, sitting at the exact vertical middle and spanning about half the width. Large empty fields above and below; no image, no button, no supporting copy. The header is the only other element: a light uppercase wordmark with tight tracking flush to the top-left corner at a 20px inset, and nine small bold uppercase links in a row across the top right. Mobile is the same poster at 40px with a two-line hamburger.
  Worth taking: Open with a single factual line (the dates) centred on an otherwise empty white screen instead of a branded hero.
- **bleibtgleich’26** (Awwwards Site of the Day, studied score 7.5) `aww-bleibtgleich26`
  Idea: One thin vertical rule runs down the page and a tight bold grotesk sentence wraps around it, words stepping from one side of the line to the other.
  Hero: White page, black type. Content sits in a narrow band between 26% and 68% of the width. A 1px vertical rule drops from the top edge at 37% for two-thirds of the height. Left of it: a black blob avatar at the top, a tiny role caption at its foot. Right of it: a tiny location note at the top, the name in two lines of 90px medium grotesk at the bottom. The tagline continues below at the same size, flush to the band's left edge, running past the fold. The upper half is otherwise blank. The handle is split into two pale-grey words fixed in the bottom corners; a black menu pill sits top-right.
  Worth taking: Draw one 1px vertical rule and typeset a large sentence around it, alternating words to either side so the line becomes the text's spine.
- **Produx Design** (Awwwards Site of the Day, studied score 7.4) `aww-produx-design`
  Idea: The wordmark is the hero, and the showreel image assembles itself from scattered square fragments as you scroll.
  Hero: Near-black field with 80px side margins. The wordmark, in a wide, light-weight uppercase sans with a slashed O, runs margin to margin (about 89% of the width) with a cap height near 20% of the viewport, starting 9% from the top. A large empty gap follows. In the lower half a two-line statement at 5.1vw sits flush left; opposite it, bottom-aligned to the statement and flush to the right margin, is a three-line paragraph in small monospace about a quarter of the width. No nav bar, button or image in the first viewport; the bottom quarter is empty.
  Worth taking: Run the wordmark margin to margin in a light weight rather than a heavy one; thin strokes at huge size read as assured instead of loud.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/celadon/type-only-statement/direction.json · reprint with `node draw.mjs --show`
