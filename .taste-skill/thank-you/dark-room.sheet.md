# DIRECTION SHEET — The dark room
seed 90259000 · drawn 2026-11-23 · sector hospitality · tone luxury
Brief: Thank-you page after a Business and First Class fare quote request: what happens next, your request, and the cabin, amenities and service ahead

| | |
| --- | --- |
| Direction | The dark room |
| Hero | Two doors on a dark wall |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | how-it-works (Photographs down a diagonal) → contact (Visit card on a photograph) → showcase (Band of unequal panels) → footer (Columns above, wordmark below) |
| Motion | Stillness |
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
One dark field from top to bottom, and in it, lit things. Photographs and objects appear like exhibits in a dim gallery: each with space around it, each the brightest thing on its screen. Type is light, small and sparse. The darkness is not a theme switch; it is a room, and the page is a slow walk through it. It suits subjects sold on atmosphere and material: an evening restaurant, a metal card, a record, a house at dusk.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A single near-black or deep-toned ground runs the full page with no section bands. First screen: either the name at full width in a light weight along the bottom edge with one dim photograph above it, or one object or photograph centred at 40–50% of the viewport with a line of text beneath at 16–18px. Each later screen holds one or two lit items at a generous size (the main one 40–60% of the screen width) with its text set beside it at full reading size; the darkness frames the items, it does not replace content. Images vary in size but all share the same darkness at their edges so they sit in the ground without frames. Practical details come last in a simple two-column text block. The only solid light element on the page is the single primary action.

## 3. Type
Kept from the brand. Light or regular weights; they glow on dark. Avoid heavy bold, which looks cheap on black. Headings 4–7vw at most; text 16–18px with leading 1.6 and a slightly lifted ink (not pure white).

## 4. Colour
Kept from the brand. A dark ground with a tint (blue-black, green-black, brown-black), a soft light ink, a dimmer ink for secondary text, and one warm or bright accent used once per screen at most.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "hospitality"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Low-key photographs: dark backgrounds, one light source, subjects emerging from shadow. Their dark edges should blend into the page ground.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Coast" set (sea, shoreline, cliffs, piers and beaches)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: If a photograph's background is lighter than the page, darken the image slightly (`filter: brightness(0.85) contrast(1.05)`) rather than adding a frame.
- `https://picsum.photos/id/640/1600/1000` — Aerial view of turquoise surf breaking onto golden sand · mid tone · sand, turquoise, white · calm area: bottom · native landscape · photo: Sarah Bürvenich
- `https://picsum.photos/id/641/1600/1000` — Empty lifeguard chair on a beach at pastel dusk · mid tone · peach, slate blue, dusty teal · calm area: right · native landscape · photo: Fré Sonneveld
- `https://picsum.photos/id/77/1600/1000` — Wooden jetty leading to a small pavilion over calm sea · mid tone · warm tan, pale teal, soft grey · calm area: top · native landscape · photo: May Pamintuan
- `https://picsum.photos/id/853/1600/1000` — Lone rock in a calm blue sea beneath a pastel sky · mid tone · sea blue, peach, pale pink · calm area: top · native landscape · photo: Stephen Radford
- `https://picsum.photos/id/144/1600/1000` — Pavilion at the end of a pier over waves, monochrome · mid tone · grey, black, white · black-and-white · calm area: top · native landscape · photo: Mouly Kumar
- `https://picsum.photos/id/574/1600/1000` — Grassy cliff and black sand beach with sea stacks offshore · mid tone · green, charcoal, pale blue · calm area: right · native landscape · photo: Julien Lavallée
- `https://picsum.photos/id/14/1600/1000` — Rocky shoreline meeting a calm pale sea under hazy sky · mid tone · pale blue, warm brown · calm area: top · native landscape · photo: Paul Jarvis
- `https://picsum.photos/id/614/1600/1000` — Aerial view of white surf washing over a dark rocky shore · dark tone · charcoal, white, dark brown · native landscape · photo: Josefa Holland-Merten
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: forest, plants-and-flowers, water, fog-and-quiet — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Two doors on a dark wall
For a subject with two halves a visitor must choose between: two exhibitions, two audiences, two places, two collections. One near-black flat field. Two portrait photographs at 3:4, each 280×373px, stand side by side 80px apart, so the pair spans x 400–1040 (44% of the width) with their tops at 300px; square corners, no frame, the pictures supplying every colour on the screen. Each photograph is the link to its half, and directly beneath it, left-aligned to the frame, sit its name at 22px in the light ink and one line at 16px in the soft ink. The headline is centred above the pair: two lines at clamp(36px, 3.4vw, 52px), leading 1.05, its first line 104px from the top, at most 26 characters per line. Wordmark top-left and one text link top-right at 15px on 32px margins. About 150px of dark ground stays below the pair and 400px either side of it, closed by the two doors at the centre. Pointing at or focusing one door keeps it at full strength and dims the other to 50%. The page continues below with the two halves in order, so each door is also an anchor to its half.

On a phone: The pair stays side by side: each photograph 168px wide at 3:4 with a 14px gap, centred at 46% of the height, its name at 17px and its line at 16px beneath it. The headline sits above at 8vw on two lines, centred, 64px down. The wordmark and the link stay in the top corners.
Headline: A 4–8 word sentence on two lines that names the choice, at most 26 characters per line.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It numbers things 01, 02: drop the numbers unless they are real data (a price, a date, a count).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Photographs down a diagonal (stack)
Three stages, three photographs of different sizes placed along a falling diagonal on the 12-column grid. Stage one: a 3:4 portrait in columns 1–4. Stage two: a 1:1 square in columns 6–8, its top edge 220px lower than the first photograph's top. Stage three: a 16:10 landscape in columns 8–12, starting 180px below the bottom of the second. Each stage's text sits in the gap the stagger leaves: a paragraph of up to 36ch at 17px, top-aligned with its photograph and placed in the columns to its right (to its left for the third). Each paragraph opens with a bold run-in phrase that carries the order: 'On the first day', 'A week later', 'By the end'. Square corners; no arrows or connecting marks. The heading, two to four words at clamp(36px, 4vw, 64px) in a light weight, sits alone in columns 7–12 at the very top, level with the first photograph's top edge.
On a phone: The diagonal becomes alternating widths: the first photograph at 100%, the second at 62% flush right, the third at 78% flush left. Each paragraph follows its photograph on that photograph's left edge at 16px. 56px between stages. The heading sits above at 30px.

### 2. contact — Visit card on a photograph (full-bleed)
A full-bleed photograph of the place, 100vw by 100svh, carries one solid card and nothing else. The card is a filled panel in the paper colour, fully opaque, 380px wide with 8px corners and 32px padding, placed in the upper-right corner 60px from the top and right edges (or the upper-left: pick the corner where the photograph is calmest). It holds, top to bottom: a two- or three-word title at 28px in a light weight; the address on two lines at 16px; the opening hours as three rows with days at the left and times right-aligned in tabular figures; the phone number; then, flush with the card's bottom edge and spanning its width, a solid booking button 52px tall. The card may be `position: sticky; top: 60px` inside a taller section so it holds while the photograph scrolls beneath it. The photograph's focal point must stay clear of the card. No heading outside the card.
On a phone: The photograph is 100vw by 70svh. The card leaves the corner: it spans the width with 16px margins and overlaps the photograph's bottom edge by 80px, so image and card interlock. The booking button is full width, 56px tall, at the card's bottom.

### 3. showcase — Band of unequal panels (strip)
A modest heading, then one wide band of pictures. The heading, two to four words at 36–44px, starts at column 3, left of centre, with 64px beneath it. The band spans the full viewport width edge to edge and is 68svh tall: four photographs standing side by side with no gaps and deliberately unequal widths, a flex row with flex-grow values of 5, 2, 3 and 2. Each panel is cropped with object-fit: cover to a tall slice, so the band reads as one folded view. The first panel carries a two-line title at 28px in paper colour at its top-left, 24px in, over a neutral scrim that covers only that corner. Hovering a panel raises its flex-grow to 6 over 500ms while the others give way; without hover the widths simply stay. One caption line at 16px sits under the band at the left margin.
On a phone: The heading sits on the margin at 28px. The band becomes a two-by-two block with no gaps, 84svh tall in total: the first row split 64/36 and the second 36/64, so the slices stay unequal. The title stays on the first panel. No hover behaviour.

### 4. footer — Columns above, wordmark below (stack)
The footer inverts ground and ink and fills a whole viewport (min-height 100svh), arranged as three rows in a grid (auto 1fr auto). Top row, 40px from the edge: four small columns on the 12-column grid (address, navigation, social, hours or contact), each a plain list at 15–16px with its first line in the full ink and the rest in the softer ink. Middle row: empty. Bottom row: the wordmark alone, sized to run from the left margin to the right margin on one line. Set it as inline SVG text with a `viewBox` fitted to the word and `width: 100%`, or tune `font-size` in `vw` to the letter count, so it never wraps; its baseline sits 20px above a single line of legal text at 13px. With `position: sticky; bottom: 0` and a lower `z-index` than the page, the last section slides away to uncover it.
On a phone: Columns become two by two at 15px with 32px between rows, at the top. A gap of about 20svh follows. The wordmark spans the full width at the bottom; a name longer than ten letters stacks on two lines, each fitted to the width. Legal line beneath at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Stillness
No showpiece. The page is simply there, instantly, and the discipline is the statement. Motion is limited to exact feedback: a 140ms press on the button, a 180ms colour change on links, focus rings that appear without delay. Do not add a load animation or scroll reveals to this direction.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Light against dark, and the slow pacing.

## 11. How this direction goes wrong
Grey text on black fails contrast quickly: check it. No glow effects, no neon accent, no coloured light blobs. A dark page with a bright busy photograph is not this direction; choose low-key images. Dark does not mean empty: every screen still carries its content at a readable size, and running text is a light ink at 7:1 or more, not a dim grey.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Kereliott** (One Page Love, studied score 7.3) `opl-kereliott`
  Idea: A quiet house gets a quiet page: one dark field, one typeface, the name set as wide as the screen and photographs left to drift in generous darkness.
  Hero: Very dark green-black field with cream type. A two-line introductory sentence at about 30px sits top-left inside 30px margins; a small cream rectangular button sits top-right. The upper half is otherwise empty. The house name fills the full content width in a flared humanist sans, mixed case, with capitals about 19vw tall, its baseline at roughly 87% of the viewport height. Immediately beneath, separated by a gap of a few pixels, the top sliver of a full-width landscape photograph enters from the bottom edge.
  Worth taking: Size the wordmark to fill the content width exactly and let the first photograph tuck directly under its baseline.
- **Deeo Studio** (One Page Love, studied score 7) `opl-deeo-studio-2`
  Idea: The studio's four letters as huge extruded iridescent 3D blocks tumbling across a black stage, with a quiet ultralight serif statement underneath.
  Hero: Near-black viewport. Four extruded 3D letters, each roughly 45-60% of the viewport tall, are scattered at different depths and tilts across the top 80% of the screen: one cropped by the top-left corner, one lower and left of centre, a larger one upper-right, the last cropped by the right edge. Faces are dark glass; edges catch lilac, orange and holographic rainbow light. Over them runs a slim nav: bold caps wordmark top-left at a 60px margin, three small caps links (one with a tiny yellow tag) and an outlined rounded button top-right. Bottom-left, a light serif headline at about 72px begins and is cut by the fold after two lines.
  Worth taking: Render the studio name as separate 3D letters at different depths and tilts, cropped by the viewport edges, instead of a flat wordmark.
- **Tengile Malamala Collection** (Awwwards Site of the Day, studied score 7.6) `aww-tengile-malamala-collection`
  Idea: Let the land and animals carry everything: one staggered hairline-serif headline over aerial footage, then cream pages of olive-green serif text with photographs placed at uneven sizes.
  Hero: Aerial river footage fills the viewport, slightly darkened. Three small white caps items sit on the top edge: an enquiry link hard left, a stacked three-line wordmark centred, 'menu' hard right. The headline is two words on two lines in thin serif capitals about 8.3vw tall: the first line starts 10% from the left, the second is indented to 40% and ends near 90%, so the pair steps diagonally across the middle third. Below, starting at the 50% line, a three-line serif sentence at about 20px and a small white square-cornered button with a separate arrow square beside it. The lower third is left to the water.
  Worth taking: Stagger a two-line headline: first line from the left margin, second indented by 30% so the pair steps diagonally across the image.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/thank-you/dark-room/direction.json · reprint with `node draw.mjs --show`
