# DIRECTION SHEET — Dressed as something else
seed 96265555 · drawn 2026-10-21 · sector agency · tone luxury
Brief: Asia Pacific business and first class air ticket agency; visitor sends a quote request through a booking form, a personal advisor replies with written options; light, calm, luxury

| | |
| --- | --- |
| Direction | Dressed as something else |
| Hero | Flush-left shout, seam photograph |
| Type | Unbounded / Onest |
| Colour | kept from the brand |
| Sections | how-it-works (Many into one) → about (Two columns, highlighted words) → faq (A band per question) → contact (Address in display rows) → footer (The back of the card) |
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
Art-direct the subject as if it belonged to a different, more vivid category. A money app is sold like a streetwear drop. An industrial roaster is presented like a design object. Drilling hardware gets the calm of a watch brand. A parcel-locker service becomes a fairground of stickers. Choose the borrowed category by asking what feeling the audience is missing from this kind of product (swagger, calm, glamour, play) and which category owns that feeling. Then take its manners completely: its type, its pacing, its way of photographing things. The contrast between dull subject and vivid dress is what people remember.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Depends on the borrowed category, so decide it explicitly and write it in your notes. Fashion drop: one shouted condensed headline across the full width, a single cropped image under it, then product facts as a blunt list. Watch or perfume: a centred object on a dark field, a small serif name, very few words, long vertical pauses. Poster or zine: flat colour blocks, heavy type, tilted cut-out images. Museum: one item per screen on a plinth-like band of colour with a short label beside it. Whichever you choose, the page structure stays simple (four to six sections) and every section uses the borrowed manners, including pricing and the footer.

## 3. Type — Unbounded / Onest
A wide display sans built from rounded squares, heavy and a little architectural, beside a clean text grotesk. Suits architecture indexes, watches, mobility and events that want a title with a constructed feel.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@800&family=Onest:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Unbounded** — weight 800 · tracking -0.03em · leading 1.0 · uppercase
- Text: **Onest** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
The borrowed category's type, fully committed: condensed and loud, or refined and small. No halfway.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour
Kept from the brand. The borrowed category's palette, which will be unlike the subject's sector norm. That mismatch is intended.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "booking form"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Photograph the subject the way the borrowed category would be photographed. With the dealt set, choose images for attitude, not literal relevance, and crop them hard.

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
- `https://picsum.photos/id/1049/1600/1000` — Rock island reflected on a wet beach under a pale sky · light tone · pale grey, soft white, dark green · calm area: top · native landscape · photo: Rosan Harmens
- `https://picsum.photos/id/640/1600/1000` — Aerial view of turquoise surf breaking onto golden sand · mid tone · sand, turquoise, white · calm area: bottom · native landscape · photo: Sarah Bürvenich
- `https://picsum.photos/id/1052/1600/1000` — Black sea stacks off a dark beach with white surf under a pale sky · light tone · black, white, pale grey · calm area: top · native landscape · photo: Annie Spratt
- `https://picsum.photos/id/853/1600/1000` — Lone rock in a calm blue sea beneath a pastel sky · mid tone · sea blue, peach, pale pink · calm area: top · native landscape · photo: Stephen Radford
- `https://picsum.photos/id/77/1600/1000` — Wooden jetty leading to a small pavilion over calm sea · mid tone · warm tan, pale teal, soft grey · calm area: top · native landscape · photo: May Pamintuan
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, people, forest — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Flush-left shout, seam photograph
Borrowed from a street poster or zine. A saturated flat field covers the top 82% of the viewport; a second flat colour forms a band across the bottom 18%. The headline is two lines in an ultra-heavy face at clamp(80px, 12vw, 190px), flush left on a 20px margin, leading 0.84, reaching about 62% across the width; its first line starts 16% below the top. Right of centre one photograph is stuck on like a poster scrap: a 3:4 portrait 30% of the viewport wide (columns 8-11), clipped to an arch with clip-path or a large top border-radius, rotated 5 degrees, its top edge leaving the viewport and its lower edge straddling the seam so it sits on both colours. The photograph overlaps the last letters of the first line by about 4vw and lies above the type in the stacking order. On the bottom band, on one baseline: one supporting sentence at 20px on the left (max 40ch) and the single action, a chunky rectangle in the upper field's colour, at the right. The wordmark sits top-left at 20px; three text links top-right.

On a phone: The field takes the top 78% and the band the rest. The headline sets at 19vw on two lines flush to 16px margins, starting at 12% of the height. The arch photograph moves under the type: 58% of the width, pushed against the right edge and cropped by it, still tilted 5 degrees and straddling the seam. The sentence and the full-width action stack on the band.
Headline: A 2-4 word shout, at most 16 characters, lowercase or capitals throughout, one or two words per line.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Unbounded, text Onest) and their settings; capitals only where the type system sets them.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Many into one (band)
A diagram drawn with one repeated shape instead of arrows. The heading (two to four words on two lines at clamp(36px, 4vw, 60px)) and a short paragraph at 17px sit in columns 1–4. Beneath, a wide inline SVG spans columns 1–12 at about 4.5:1. It is built from 120–160 small filled squares (or the page's own motif), each 10–14px. In the left third they are scattered loosely in two pale tones. In the middle third they are pulled into a tight horizontal ribbon three squares high. In the right third they fan out again into neat, evenly spaced rows in the accent colour. The eye reads disorder, compression, order, from left to right. Under the diagram, three text columns aligned to its thirds: a bold one-word name at 20px and two lines at 16px each; the words carry the sequence ('Gather', 'Reduce', 'Release'). No connecting marks.
On a phone: The diagram turns to run top to bottom: a 3:4 SVG with the scatter at the top, the ribbon as a vertical band in the middle and the ordered rows at the bottom. The three names and their text sit to its right in a 38vw column, each level with its zone.

### 2. about — Two columns, highlighted words (statement)
The story is set as text far larger than anything else on the page: 110–160 words at clamp(22px, 2.1vw, 32px), tight leading 1.18, in the soft ink, flowing through two columns that fill the full width between 24px margins (`columns: 2; column-gap: 32px`, justified, with hyphenation on). No heading. The name at the start is in full ink. Six or seven single words or short phrases carry a flat highlighter background in three or four palette colours, built with an inline `background-color`, `box-decoration-break: clone` and 0.1em of horizontal padding; they mark the facts a scanning reader wants (a place, a year, a client, a skill). The final short sentence is highlighted entire in the strongest colour and is the link to contact. Padding 120px top and bottom. No image and no portrait.
On a phone: One column at 20px, left-aligned and unjustified, leading 1.25, with 18px margins. Keep four or five highlights so no line carries two. The final highlighted sentence sits on its own line with 24px above it and works as a full-width tap target.

### 3. faq — A band per question (band)
Each question owns a full-bleed band, and the bands alternate between two flat tones (ground and one step away, or two palette colours with their assigned inks) and butt together with no gap. Inside every band the same grid applies: the question in columns 1–5 at 28–32px bold, top-aligned with 56px of padding above; the answer in columns 7–12 at 18px with leading 1.5, the same padding, and 56px below. Bands are as tall as their content, so their heights differ, which gives the stack its rhythm. Four to seven bands. The heading is the first band: two to four words at about 7vw on the accent colour, flush left, taller than the rest at about 40svh with the words anchored to its bottom-left. All answers are visible; there are no toggles.
On a phone: Bands stay full-bleed and alternate. Inside each, the question at 22px then the answer at 17px, with 32px padding top and bottom and 20px at the sides. The heading band is 30svh tall with its words at 13vw at the bottom-left.

### 4. contact — Address in display rows (list)
The contact block is a stack of five full-width rows, every one set at the same size, clamp(44px, 6vw, 88px), regular weight, left-aligned with a 20px inset and leading 1.0: the building or venue name, the street, the city with postcode, the opening hours as one compact line, the phone number. Each row is about 150px tall with the text sitting in its lower third; rows are told apart by alternating two flat tones of the section colour as full-width bands, or by 28px of space alone. A sixth row holds a one-word greeting at the same size followed, 24px to its right and centred on the x-height, by a solid round button 0.9em across with an arrow, which opens the email or booking link. Street and phone rows are links (map, call). No heading and no form. Optionally, one small round photograph sits at the right end of the first row.
On a phone: Rows at 9.6vw with 16px insets, about 84px tall; the hours break onto two rows (days, then times). The greeting row becomes a full-width band in the accent colour with the round arrow button at its right end, 56px across.

### 5. footer — The back of the card (stack)
The footer is the reverse side of the page's artefact, laid out as the back of a postcard. A paper-coloured panel spans columns 2–11 on the contrasting ground, about 420px tall, its top edge cut into a row of twelve semicircular scallops (an inline SVG path or `clip-path`, each scallop about 100px wide). The panel is divided by space into two halves. Left half: a short sign-off of two to four words at 32px, then two or three lines at 16px, written like a message. Right half: the address block, four left-aligned lines at 18px with 12px between them, each line a link (email, telephone, street, social); above it in the top-right corner, a stamp: one small photograph, 3:4 and 88px wide, with a 6px paper-coloured margin. Along the panel's bottom edge, a single centred line at 12px gives the copyright like a printer's imprint.
On a phone: The panel runs full width with six scallops across its top edge. The stamp sits top-right at 64px wide; the sign-off and message come first, then the address lines at 17px beneath them, then the imprint line centred at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Attitude. The page has a recognisable voice from another world, applied to a subject nobody expected it for.

## 11. How this direction goes wrong
Name the borrowed category in one word before you start, or the result is merely loud. The content must still be clear: what it is, what it costs, how to get it. Avoid borrowing from 'tech startup', which is the default you are escaping.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **UGLYCASH** (One Page Love, studied score 7.4) `opl-uglycash`
  Idea: A money app sold like streetwear: one shouted condensed headline over the phone, then sticker-covered 3D props where feature icons would normally go.
  Hero: Near-white page. A floating light-grey nav bar only 35% of the viewport wide sits centred 20px from the top: condensed wordmark left, two social icons in the middle, an app button with a glowing magenta outline right. Directly beneath, a two-line uppercase headline in bold condensed grotesque at 11.4vw, centred, leading under 0.9, about 60% of the width, with a faint cyan and magenta fringe on the letter edges; it fills the band from 12% to 43% of the height. A single phone mockup 27% of the viewport wide rises immediately under the headline, centred, cut off by the bottom edge. Its magenta screen glow is the only colour.
  Worth taking: Make the nav a short floating bar a third of the viewport wide so the headline can start almost at the top edge.
- **CoffeeTech®** (Awwwards Site of the Day, studied score 7.1) `aww-coffeetech-r`
  Idea: Present an industrial roaster maker like a design brand: one enormous three-word statement on black, with the machine withheld until the first scroll, where it emerges from the dark.
  Hero: Near-black viewport with nothing but type. A centred three-line headline, one word per line, in Inter Medium at about 15vw with tight tracking; the first line starts a third of the way down and the last runs to within 35px of the bottom edge, its widest word spanning roughly 70% of the width. Cream letters; no subhead, no media, no hero button. Navigation is one quiet row: logo with a terracotta mark at left, four text links centred, then a filled terracotta 'Products' button with a grid icon, an outlined contact button and a language dropdown at right. The top third stays empty.
  Worth taking: Let a three-word headline at about 15vw be the entire first viewport and withhold the product until the first scroll.
- **L.I.S.A.** (Awwwards Site of the Day, studied score 7.4) `aww-l-i-s-a`
  Idea: The agency site is replaced by a conversation with a TV-headed 3D character whose CRT face draws expressions while she types to you.
  Hero: A grey studio backdrop with a soft radial light fills the viewport; the whole site is this one screen. Right of centre, a 3D bust in a lilac turtleneck wears a boxy CRT television for a head, cables looping around the neck; the figure is about 83% of viewport height, cropped at the chest by the bottom edge. The TV screen shows a changing glowing shape. At left mid-height, three lines of 26px regular grotesk in black are the only copy. Top-left: wordmark and a small star-like glyph; top-right: one text link. Bottom-right: a black capsule with two sound toggles. A thin progress bar sits on the bottom edge.
  Worth taking: Demote earlier lines of a conversation by fading and blurring them in place instead of scrolling them away, keeping one type size throughout.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. The frame: one h1 on the first screen that says what this is, equal outer margins, no
section huddled on one side with the other half empty, no blank stretch over half a screen, a heading on every section.
`inspect.mjs` measures all of it.

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/celadon/borrowed-category/direction.json · reprint with `node draw.mjs --show`
