# DIRECTION SHEET — The sentence is the layout
seed 291075446 · drawn 2026-10-21 · sector agency · tone luxury
Brief: Asia Pacific business and first class air ticket agency; visitor sends a quote request through a booking form, a personal advisor replies with written options; light, calm, luxury

| | |
| --- | --- |
| Direction | The sentence is the layout |
| Hero | Title in the sky, line on the horizon |
| Type | Anton / Work Sans |
| Colour | kept from the brand |
| Sections | how-it-works (Lines that step across) → about (Portrait as drop cap) → faq (Large questions, answers beside) → contact (Sentence, portrait, two links) → footer (Contact as the headline) |
| Motion | Shutter image |
| Photographs | the "Coast" set, as atmosphere |

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
One short sentence, set at poster scale, is the composition. The trick that makes it an idea rather than a big headline: something from the subject sits inside the sentence where a word would be. A strip of photograph fills the gap between two words; a small live fragment of the product replaces the noun; the object the sentence names is pictured at the size of a letter. Write the sentence first, find the word that can be shown instead of said, and put the showing in its place. The reader completes the sentence with their eyes.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
The sentence is four to seven words and runs as one or two full-width lines at 9–13vw. Inline with the type, on the baseline, sits one media slot: a rounded-rectangle or square frame exactly one line-height tall and two to three ems wide, holding a photograph or a looping crop. Above and below the sentence the screen is empty except for a small navigation line and one supporting sentence set small, both on the same left margin. Later sections repeat the grammar at smaller scale: each is a short statement on the left six columns with its proof (image, figure, list) on the right, so the page reads as a series of sentences with evidence. Generous vertical space (160px or more) between sections.

## 3. Type — Anton / Work Sans
Compressed heavy capitals stacked tight, with a neutral grotesque kept small beneath. Suits fashion drops, sport, nightlife and any page built as a poster.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton:wght@400&family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
```
- Display: **Anton** — weight 400 (single heavy cut) · tracking -0.01em · leading 0.86 · uppercase
- Text: **Work Sans** — 400 for body, 600 for links and short emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2.5rem, 1.2rem + 5vw, 5.5rem);
}
```
Display weight with real presence (medium to bold), tracking -0.03 to -0.05em, leading 0.95–1.0 so two lines sit close. The inline frame aligns to cap height and baseline exactly; set it with em units so it scales with the type.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. A calm ground with ink at full contrast. The only colour comes from the photograph inside the sentence; if the palette has an accent, use it once, on the action.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "booking form"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

One strong, simple photograph that reads at small size (a face, an object, a texture, a horizon), cropped to a wide strip inside the sentence. The same image may open to full width in the next section, so the small slot feels like a window onto something larger.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Coast" set (sea, shoreline, cliffs, piers and beaches)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/626/1600/1000` — Red and white lighthouse in turquoise sea below a chalk cliff · light tone · turquoise, white, grass green · calm area: left · native landscape · photo: Nick Diamantidis
- `https://picsum.photos/id/606/1600/1000` — Wooden boardwalk winding through grassy dunes toward the sea · light tone · pale grey, sage green, sand · calm area: top · native landscape · photo: Aleksandra Boguslawska
- `https://picsum.photos/id/853/1600/1000` — Lone rock in a calm blue sea beneath a pastel sky · mid tone · sea blue, peach, pale pink · calm area: top · native landscape · photo: Stephen Radford
- `https://picsum.photos/id/77/1600/1000` — Wooden jetty leading to a small pavilion over calm sea · mid tone · warm tan, pale teal, soft grey · calm area: top · native landscape · photo: May Pamintuan
- `https://picsum.photos/id/1049/1600/1000` — Rock island reflected on a wet beach under a pale sky · light tone · pale grey, soft white, dark green · calm area: top · native landscape · photo: Rosan Harmens
- `https://picsum.photos/id/641/1600/1000` — Empty lifeguard chair on a beach at pastel dusk · mid tone · peach, slate blue, dusty teal · calm area: right · native landscape · photo: Fré Sonneveld
- `https://picsum.photos/id/640/1600/1000` — Aerial view of turquoise surf breaking onto golden sand · mid tone · sand, turquoise, white · calm area: bottom · native landscape · photo: Sarah Bürvenich
- `https://picsum.photos/id/1052/1600/1000` — Black sea stacks off a dark beach with white surf under a pale sky · light tone · black, white, pale grey · calm area: top · native landscape · photo: Annie Spratt
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, people, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Title in the sky, line on the horizon
One wide photograph or render fills the viewport, chosen with the subject in the lower 55% and open sky, fog or a plain wall above it. The headline is centred in that empty upper zone: two lines at clamp(72px, 7.2vw, 112px), leading 0.9, its cap line 72px from the top, the first line short and the second longer so the block widens towards the subject. On the horizon, with its baseline at 52% of the height, one supporting sentence is split into two halves at 22px: the first half right-aligned to end at column 5, the second left-aligned from column 8, so the subject shows through the 260px gap between them. Wordmark top-left on a 32px margin; up to three text links from column 9; the single action top-right as a solid rectangle in the paper colour. All type is in one ink chosen against the sky; on a pale sky use the photograph's darkest tone rather than black. Nothing else crosses the lower half.

On a phone: The picture is re-cropped to portrait with the subject in the lower 45%. The headline sits centred in the sky at 11vw on two lines, 96px down, and the two halves of the sentence become two centred lines at 17px directly under it. The action is a full-width button 24px above the bottom edge on a neutral scrim band 96px tall. Wordmark top-left and a menu word top-right.
Headline: Two lines, the second the longer, at most about 14 characters per line: the name of the place, or a 3–5 word claim about it.

Adjusted for this page:
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

### 2. about — Portrait as drop cap (statement)
No heading. One biography paragraph of 50–80 words is set large at clamp(24px, 2.5vw, 38px), regular weight, leading 1.2, across columns 3–12 of the grid. A square portrait is floated at the paragraph's start with `float: left`: its side equals three lines of text (3.6em), with 0.5em of space to its right, so the first three lines wrap beside it and the fourth returns to the paragraph's left edge, like a drop capital. Square corners. The person's name, the first words of the paragraph, is in full ink; the rest may be in a softer ink with linked names in full ink and underlined. A second paragraph follows after one blank line in the soft ink at the same size. Columns 1–2 hold three short facts (place, since when, how to reach) at 14px, top-aligned with the portrait. Section padding 140px.
On a phone: Text at 22px with leading 1.25, full width. The portrait keeps its float but grows to four lines tall, about 110px square. The three facts move below the second paragraph as a single row of three small blocks at 13px.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 3. faq — Large questions, answers beside (table)
Every answer is open; nothing collapses. Each question-and-answer pair is a row on the 12-column grid: the question in columns 1–6 at clamp(26px, 2.6vw, 40px), medium weight, leading 1.1, no more than two lines; its answer in columns 8–12 at 17–18px with leading 1.55 and a measure near 40ch, its first baseline level with the question's first baseline. Rows are separated by 72–88px of empty space and nothing else. Five to seven rows. The section heading, two or three words, is set at the same size as the questions but in the softer ink and sits as the first row's left cell with an empty right cell, so it reads as the top of the same table rather than a title above it. Because questions are large and answers small, the left column works as a scannable index.
On a phone: Each pair stacks: question at 24px, answer 12px beneath at 17px, then 56px of space before the next. The heading leads at the same 24px in the softer ink. Answers stay open; there is no accordion on the phone either.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 4. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

### 5. footer — Contact as the headline (statement)
A full-bleed field in one saturated palette colour, at least 90svh tall. Top row, 40px from the edge: two or three short notes at 15px in columns 1–7 (address, hours, a one-line description) and a back-to-top text link at the right margin. Then a tall empty gap. In the lower half, the way to get in touch is the display line: the telephone number or the email address itself, set at 8–9vw, flush left, hard against the margin, as one link. An email address may break once, before the @, giving two lines. Size it with `clamp()` so the longest line fills at least 80% of the width. Under it, one row of small text at 14px spread across three positions: links at the left, credits in the centre, city and year at the right. The wordmark appears only small, in the top row.
On a phone: Notes stack at the top at 15px. The contact line sits in the lower half at 12vw; a telephone number stays on one line, an email breaks before the @ and is sized so each half fits the width. The meta row becomes three stacked lines at 13px.

Adjusted for this page:
- Its vw sizes assume a face of normal width: with this condensed display face, size the words to fill the measure the blueprint gives them instead of copying the vw value.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
The collision of big type and one live image inside it. Because there is only one image on the first screen, choose it with care and give it perfect alignment to the letters.

## 11. How this direction goes wrong
The sentence must be short enough for two lines on a phone, where the inline frame drops to its own line between the two halves. Do not style one word differently to fake the device. Do not use more than one slot per sentence.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **bleibtgleich’26** (Awwwards Site of the Day, studied score 7.5) `aww-bleibtgleich26`
  Idea: One thin vertical rule runs down the page and a tight bold grotesk sentence wraps around it, words stepping from one side of the line to the other.
  Hero: White page, black type. Content sits in a narrow band between 26% and 68% of the width. A 1px vertical rule drops from the top edge at 37% for two-thirds of the height. Left of it: a black blob avatar at the top, a tiny role caption at its foot. Right of it: a tiny location note at the top, the name in two lines of 90px medium grotesk at the bottom. The tagline continues below at the same size, flush to the band's left edge, running past the fold. The upper half is otherwise blank. The handle is split into two pale-grey words fixed in the bottom corners; a black menu pill sits top-right.
  Worth taking: Draw one 1px vertical rule and typeset a large sentence around it, alternating words to either side so the line becomes the text's spine.
- **Midnight** (One Page Love, studied score 7.1) `opl-midnight-2`
  Idea: The headline's circles are literally pictured: one blurred dark ring, sliced into horizontal bands, becomes the hero, the demo panel, the session cards and the footer.
  Hero: No navigation at all. A canvas fills the full width and the top 90% of the viewport: a huge out-of-focus dark navy ring on drifting taupe, sage and terracotta, cut into horizontal bands about 78px tall that are slightly offset like blinds. On the vertical centre line, starting 58px from the left, sit a small rounded-square line icon and a one-line headline at 48px in cream. On the same baseline, starting 59% across, a two-line 17px statement whose first sentence is white and bold while the rest drops to half opacity. The cream page background shows as a 90px strip at the bottom. No button.
  Worth taking: Slice a soft blurred gradient into horizontal bands with small offsets so a familiar glow becomes a recognisable, ownable texture.
- **Glitch&Grit** (Awwwards Site of the Day, studied score 7.5) `aww-glitch-grit`
  Idea: Every screen is one project: two half-width footage columns with the project name stacked dead centre across their seam in a single flat pastel that changes per project.
  Hero: Black viewport split down its vertical centre. The left half holds a huge flat grey flower silhouette bleeding off the left and bottom edges; the right half is black with a few tiny video thumbnails drifting through. Dead centre, straddling the split, sits a two-line uppercase title in mint green, about 11vw per line, lines almost touching, spanning roughly 70% of the width. Two tiny category lines sit directly above it and a tiny 'view full project' link directly below, all in the same green. Navigation is six small bold white words pinned to the frame: three links across the top edge, the three-part studio name across the bottom edge.
  Worth taking: Break the studio name into three words pinned bottom-left, bottom-centre and bottom-right, mirroring three nav links across the top, so the viewport frame itself is the logo.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/celadon/sentence-as-layout/direction.json · reprint with `node draw.mjs --show`
