# DIRECTION SHEET — The name as a monument
seed 916537595 · drawn 2026-10-21 · sector agency · tone luxury
Brief: Asia Pacific business and first class air ticket agency; visitor sends a quote request through a booking form, a personal advisor replies with written options; light, calm, luxury

| | |
| --- | --- |
| Direction | The name as a monument |
| Hero | Square over a moving line |
| Type | Bodoni Moda / Jost |
| Colour | kept from the brand |
| Sections | how-it-works (Lines that step across) → about (Side facts, wide paragraph) → faq (Wide heading, indented questions) → contact (The email as display type) → footer (Columns above, wordmark below) |
| Motion | Edge-to-edge marquee |
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
The name is the headline. Set it so large that it becomes architecture: as wide as the viewport, cropped by an edge, or stacked to fill the screen. Nothing else on the first screen competes; the description of what this is drops to a single small sentence. The idea comes from treating the name's letters as material. Ask what the subject can do to its own name: a photograph of the work sits inside a counter or replaces a letter, the name repeats down the page like a reel, the letters are split to opposite corners and the page happens between them. In the study this was the single most common device among sites scoring 7.5 or more.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
First screen: the wordmark spans 88–100% of the viewport width (font-size 16–24vw, set with a clamp so it never wraps), anchored either to the bottom edge with its descenders nearly touching it, or dead centre with everything else pushed to the corners. One line of supporting text at 16–20px sits in a corner on a shared margin; navigation is three or four words in the opposite corner. After the hero the page is deliberately small and calm: a narrow text column or a simple two-column grid, so the contrast with the monument holds. The name returns once more at full width as the footer, in the inverse colours. Margins are tight (20–32px) so the type reaches the edges. Two type sizes do nearly all the work: the monument and a small text size, with one mid size for section headings.

## 3. Type — Bodoni Moda / Jost
A true didone with hairline serifs and vertical stress over a light geometric sans, the classic fashion-magazine pairing. Suits luxury property, jewellery, fragrance and fashion.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;1,500&family=Jost:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Bodoni Moda** — weight 500 with optical sizing on · tracking -0.02em · leading 0.95 · uppercase or sentence case; italic for a whole line, never for one word
- Text: **Jost** — 400 for body, 500 for emphasis · leading 1.6 · tracking 0.01em
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One family. The display cut must survive enormous sizes: tight tracking (-0.04 to -0.07em), leading 0.8–0.9, optical kerning on. Section headings are modest (28–40px) on purpose.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. Two values carry the page (ground and ink). The accent, if used at all, appears on one thing only: the single action or the inset image frame. The footer inverts ground and ink.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "booking form"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Few images, used as inserts in the typography rather than as illustrations beside it: one photograph inside or behind the name (a 4:5 or 1:1 frame replacing a letter, or tucked between two words), then a short run of large full-width or half-width photographs further down. Square corners. No collage of small thumbnails.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Coast" set (sea, shoreline, cliffs, piers and beaches)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/626/1600/1000` — Red and white lighthouse in turquoise sea below a chalk cliff · light tone · turquoise, white, grass green · calm area: left · native landscape · photo: Nick Diamantidis
- `https://picsum.photos/id/606/1600/1000` — Wooden boardwalk winding through grassy dunes toward the sea · light tone · pale grey, sage green, sand · calm area: top · native landscape · photo: Aleksandra Boguslawska
- `https://picsum.photos/id/641/1600/1000` — Empty lifeguard chair on a beach at pastel dusk · mid tone · peach, slate blue, dusty teal · calm area: right · native landscape · photo: Fré Sonneveld
- `https://picsum.photos/id/77/1600/1000` — Wooden jetty leading to a small pavilion over calm sea · mid tone · warm tan, pale teal, soft grey · calm area: top · native landscape · photo: May Pamintuan
- `https://picsum.photos/id/640/1600/1000` — Aerial view of turquoise surf breaking onto golden sand · mid tone · sand, turquoise, white · calm area: bottom · native landscape · photo: Sarah Bürvenich
- `https://picsum.photos/id/853/1600/1000` — Lone rock in a calm blue sea beneath a pastel sky · mid tone · sea blue, peach, pale pink · calm area: top · native landscape · photo: Stephen Radford
- `https://picsum.photos/id/1052/1600/1000` — Black sea stacks off a dark beach with white surf under a pale sky · light tone · black, white, pale grey · calm area: top · native landscape · photo: Annie Spratt
- `https://picsum.photos/id/1049/1600/1000` — Rock island reflected on a wet beach under a pale sky · light tone · pale grey, soft white, dark green · calm area: top · native landscape · photo: Rosan Harmens
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, people, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Square over a moving line
A white or pale flat ground. One line of display type at clamp(150px, 15vw, 230px), weight 500, tracking -0.02em, runs edge to edge with its cap band centred 360px from the top, moving left at a slow, constant 40px a second: the name, or a claim of two or three words, repeated with a solid round dot one third of the cap height between copies and duplicated for a seamless loop. One square photograph 272px across (19vw), square corners, `object-fit: cover`, sits exactly on the band's centre behind the type, so the words slide across it; the moving line is set twice, the second copy in the paper colour and clipped to the square with `clip-path`, so the letters turn light as they cross the photograph and every word reads whole. It shows the subject's best detail. In the study the photograph sits on top of the words; here nothing lies on top of a headline. 150px under the photograph, centred: one supporting sentence at 22px on two lines, max 36ch, and 24px below it the key fact (a price, a date, an address) at 17px. Top row on 32px margins: one text link on the left, the wordmark centred, one text link on the right. Bottom row on the same margins, 40px above the edge: a location line at 16px on the left and the single action as a solid rectangle on the right. The `h1` holds the moving words once as plain text and the moving copies are `aria-hidden`. Under reduced motion the line stops with one copy centred and both ends cropped.

On a phone: The line drops to 34vw with its band at 26% of the height and keeps moving; the photograph shrinks to a 46vw square and stays centred on it. The sentence sits centred at 18px about 64px below the photograph, then the fact at 16px. The action becomes a full-width button 20px above the bottom edge. The wordmark stays centred at the top and the two links fold into a menu word on the right.
Headline: The name or a 2–3 word claim of at most 14 characters, set once in the `h1` and repeated in the moving line.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It crops letters along their top: the inspector fails that (jurors read it as broken). Crop at the bottom edge or a side instead.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Lines that step across (statement)
The sequence is written, not counted. Four lines of display type, one stage per line, each a complete short clause that begins with its order word: 'First you send it.' 'Then we take it apart.' 'You choose one.' 'It ships on Friday.' Set at clamp(36px, 4.6vw, 76px), leading 1.0, one line each. The first line starts on column 1 and each following line starts two columns further right (grid-column-start 1, 3, 5, 7), so the block descends as a staircase and the eye follows the diagonal. Under each line, on that line's own left edge and 12px below, a sentence of up to 34ch at 17px in the soft ink. 56px between stages. The last line may take the accent colour as the single emphasis. The first line serves as the heading; there is no title above. Leave the columns to the left of the final stage empty.
On a phone: Lines drop to 8.4vw and may wrap onto a second line. The staircase becomes a smaller indent of 6vw per stage, so the fourth line starts 18vw in. Each sentence sits under its line at 16px on the same indent. 40px between stages.

### 2. about — Side facts, wide paragraph (table)
Two rows share one vertical line at 34% of the viewport width. Row one: in a 160px column at the left margin, three label and value pairs stack with 20px between them, each a label in the soft ink with its value beneath in full ink, all at 13px (founded, based in, team size). From the 34% line a five-line paragraph at clamp(20px, 1.7vw, 26px), leading 1.35, runs to 90% of the width. Row two starts 120px lower and repeats the logic for the record of the practice: one plain word at 13px at the far left (awards, press, clients), then from the 34% line two list columns, each 260px wide with a 64px gutter, at 13px with 10px between lines: name at the left, year at the right in the soft ink. No heading; the paragraph opens the section. Each list comfortably holds 6–12 lines. No photographs are needed.
On a phone: Everything aligns to the left margin. The paragraph comes first at 19px. The three label and value pairs follow as a two-column grid at 14px. The two record lists stack with 40px between them, each opened by its plain word in full ink.

### 3. faq — Wide heading, indented questions (list)
A heading of three to five words at about 5.5vw runs from the left margin on one or two lines and is the only large thing in the section. 80px beneath it the questions begin, indented to start at column 5 and running to column 12, so the left third under the heading stays empty. Each question is a row at 22–24px in the regular weight with a chevron of two 2px strokes at the far right; rows are separated by 36px of space and no rules. Opening a row lays a tile of the one-step tone behind that row and its answer (24px padding, extending 24px beyond the text on both sides) and shows the answer at 17px with a 48ch measure. Six questions. Nothing else shares the screen; the indent against the wide heading is the composition. Build with `<details>`.
On a phone: The heading sits at 10vw on two lines. Questions lose the indent and run full width at 19px with 28px between rows; the open row keeps its tone tile, now bleeding to both screen edges, with the answer at 16px inside it.

### 4. contact — The email as display type (statement)
The section is 100svh in the inverse of the page's colours. A single email address is set as one line of display type spanning the content width: the font-size is fitted so the address runs from margin to margin (about 7–9vw for 20 characters; break after the @ onto two lines if it is longer than 26), light or regular weight, tight tracking, sitting on a baseline 12vh above the bottom edge. It is a `mailto:` link; on hover the whole line takes the accent ink. In the top-left corner, a sentence of up to 12 words at 20–22px says what to write about. In the two bottom corners at 14px: phone and city at the left, two or three social links at the right. No heading and no form. For a pinned ending, make the section `position: sticky; bottom: 0` beneath the page so the previous section lifts off it.
On a phone: The address breaks after the @ onto two lines at 11.5vw, left-aligned, sitting at 55% of an 86svh screen. The sentence sits at the top-left at 18px. Phone, city and social links stack at the bottom-left at 15px with 12px between them.

### 5. footer — Columns above, wordmark below (stack)
The footer inverts ground and ink and fills a whole viewport (min-height 100svh), arranged as three rows in a grid (auto 1fr auto). Top row, 40px from the edge: four small columns on the 12-column grid (address, navigation, social, hours or contact), each a plain list at 15–16px with its first line in the full ink and the rest in the softer ink. Middle row: empty. Bottom row: the wordmark alone, sized to run from the left margin to the right margin on one line. Set it as inline SVG text with a `viewBox` fitted to the word and `width: 100%`, or tune `font-size` in `vw` to the letter count, so it never wraps; its baseline sits 20px above a single line of legal text at 13px. With `position: sticky; bottom: 0` and a lower `z-index` than the page, the last section slides away to uncover it.
On a phone: Columns become two by two at 15px with 32px between rows, at the top. A gap of about 20svh follows. The wordmark spans the full width at the bottom; a name longer than ten letters stacks on two lines, each fitted to the width. Legal line beneath at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Edge-to-edge marquee
One line of very large type travels sideways across the full width at a slow constant speed, as a band between two sections or as the closing statement. Linear timing, duplicated content for a seamless loop, paused on hover and under reduced motion. One marquee per page, carrying real words (the name, the claim), never a list of buzzwords.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Scale. The size of the name against the smallness of everything else is the entire visual event, so protect both ends: do not shrink the name to make room, and do not let body text creep above 20px.

## 11. How this direction goes wrong
A long name set small is just a logo. If the name has more than about 12 characters, stack it on two lines or crop it with the viewport edge; never drop below 12vw. Do not add a second big headline under the name. Do not decorate the letters.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Kereliott** (One Page Love, studied score 7.3) `opl-kereliott`
  Idea: A quiet house gets a quiet page: one dark field, one typeface, the name set as wide as the screen and photographs left to drift in generous darkness.
  Hero: Very dark green-black field with cream type. A two-line introductory sentence at about 30px sits top-left inside 30px margins; a small cream rectangular button sits top-right. The upper half is otherwise empty. The house name fills the full content width in a flared humanist sans, mixed case, with capitals about 19vw tall, its baseline at roughly 87% of the viewport height. Immediately beneath, separated by a gap of a few pixels, the top sliver of a full-width landscape photograph enters from the bottom edge.
  Worth taking: Size the wordmark to fill the content width exactly and let the first photograph tuck directly under its baseline.
- **House of Honey** (Awwwards Site of the Day, studied score 8.4) `aww-house-of-honey-1`
  Idea: A block-heavy wordmark pierced by a hairline script: the bold-against-delicate contrast is repeated at every scale, with giant pink script behind quiet serif statements.
  Hero: Top 42% is a flat blush-pink band; the bottom 58% is a full-bleed photograph of a bright living room, arched window on the centre axis, butting against the band with no margin. A tiny nav row sits at the very top with 8px side margins: block logo glyph and five links left, contact link with a small square arrow box far right. The wordmark fills the width edge to edge: two words in ultra-black extended caps, about 120px cap height, dark aubergine, with a hairline script 'of' 230px tall between them, overshooting above and below. Directly beneath, two two-line serif uppercase taglines at 31px, one flush left, one flush right.
  Worth taking: Set a wordmark edge to edge in ultra-heavy extended caps and thread a hairline script connecting word through it that overshoots the cap height both ways.
- **Pensatori Irrazionali** (Awwwards Site of the Day, studied score 7.6) `aww-pensatori-irrazionali`
  Idea: The client roster becomes the hero object, a 3D sheaf of logo-printed fabric ribbons, and classical Italian ornament (copperplate script, engravings, tricolour) is collided with plain Helvetica.
  Hero: Flat pale-grey field (#f5f5f5). A 3D-rendered bundle of woven fabric ribbons, each a different saturated colour and printed with a client logo, streams diagonally from beyond the top-right corner down to about centre-left, covering roughly the right two-thirds and bleeding off the top and right edges. Top-left: a small engraved lion crest with serif wordmark and a green-white-red bar. Top-right: two dark square icon buttons with chamfered corners. Bottom-left, in the lowest fifth: a tiny '+ (Atelier)' label above a three-line grey intro paragraph at about 36px, half the viewport wide. No headline and no call to action; the left third is empty.
  Worth taking: Turn the client-logo list into one physical object (logos printed on a rendered bundle of ribbons) so proof becomes the hero image instead of a logo strip.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/celadon/name-as-monument/direction.json · reprint with `node draw.mjs --show`
