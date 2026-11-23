# DIRECTION SHEET — The name as a monument
seed 1586121654 · drawn 2026-11-23 · sector hospitality · tone luxury
Brief: Thank-you page after a Business and First Class fare quote request: what happens next, your request, and the cabin, amenities and service ahead

| | |
| --- | --- |
| Direction | The name as a monument |
| Hero | Name under a photograph |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | how-it-works (Accordion of tinted panels) → contact (The email as display type) → showcase (Square plate, spare text) → footer (Columns above, wordmark below) |
| Motion | Scaling wordmark |
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
The name is the headline. Set it so large that it becomes architecture: as wide as the viewport, cropped by an edge, or stacked to fill the screen. Nothing else on the first screen competes; the description of what this is drops to a single small sentence. The idea comes from treating the name's letters as material. Ask what the subject can do to its own name: a photograph of the work sits inside a counter or replaces a letter, the name repeats down the page like a reel, the letters are split to opposite corners and the page happens between them. In the study this was the single most common device among sites scoring 7.5 or more.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
First screen: the wordmark spans 88–100% of the viewport width (font-size 16–24vw, set with a clamp so it never wraps), anchored either to the bottom edge with its descenders nearly touching it, or dead centre with everything else pushed to the corners. One line of supporting text at 16–20px sits in a corner on a shared margin; navigation is three or four words in the opposite corner. After the hero the page is deliberately small and calm: a narrow text column or a simple two-column grid, so the contrast with the monument holds. The name returns once more at full width as the footer, in the inverse colours. Margins are tight (20–32px) so the type reaches the edges. Two type sizes do nearly all the work: the monument and a small text size, with one mid size for section headings.

## 3. Type
Kept from the brand. One family. The display cut must survive enormous sizes: tight tracking (-0.04 to -0.07em), leading 0.8–0.9, optical kerning on. Section headings are modest (28–40px) on purpose.

## 4. Colour
Kept from the brand. Two values carry the page (ground and ink). The accent, if used at all, appears on one thing only: the single action or the inset image frame. The footer inverts ground and ink.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node /Users/mainprofile/.agents/skills/design-taste-frontend/scripts/assets.mjs "hospitality"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Few images, used as inserts in the typography rather than as illustrations beside it: one photograph inside or behind the name (a 4:5 or 1:1 frame replacing a letter, or tucked between two words), then a short run of large full-width or half-width photographs further down. Square corners. No collage of small thumbnails.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Forest" set (woodland, paths between trees, moss and filtered light)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/229/1600/1000` — Path through tall pine trees fading into blue-grey fog · dark tone · blue grey, dark green · native landscape · photo: Orlova Maria
- `https://picsum.photos/id/216/1600/1000` — Narrow dirt trail through mossy green woodland · mid tone · moss green, brown · native landscape · photo: Paul Jarvis
- `https://picsum.photos/id/476/1600/1000` — Sunlight bursting between tall redwood trunks in a shaded forest · dark tone · dark brown, deep green, gold · native landscape · photo: Mr. Marco
- `https://picsum.photos/id/878/1600/1000` — Bare gnarled trees in fog, black and white · dark tone · black, grey, white · black-and-white · native landscape · photo: Richard Loader
- `https://picsum.photos/id/423/1600/1000` — Snow-laden fir trees fading into pale winter fog · light tone · white, pale blue, grey green · calm area: centre · native landscape · photo: Gabriel Santiago
- `https://picsum.photos/id/190/1600/1000` — Path winding between rows of tall pine trunks · dark tone · dark brown, moss green · native landscape · photo: James Forbes
- `https://picsum.photos/id/877/1600/1000` — Tall tree trunks in a misty forest with blue-grey light · mid tone · slate blue, dark brown, mist grey · native landscape · photo: Sebastian Unrau
- `https://picsum.photos/id/559/1600/1000` — Snow-covered lane lined with bare frosted trees · light tone · white, grey brown · calm area: bottom · native landscape · photo: Ali Inay
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: coast, fog-and-quiet, mountain, water — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Name under a photograph
A full-bleed photograph fills the top 58% of the 1440×900 viewport, touching the top, left and right edges, `object-fit: cover`, with its focal point in the upper two-thirds. The lower 42% is a flat ground colour that butts against the photograph with no gap. The name runs across this band on one line, spanning all 12 columns between 24px margins, at clamp(120px, 19vw, 300px), tracking -0.05em, line-height 0.85, its baseline 28px above the bottom edge so descenders nearly touch it. Fit the size to the length of the name so it never wraps. In the strip of ground between photograph and name, 24px under the photograph's edge, sits one row at 17px: the supporting sentence on columns 1–5 at the left margin, and the single action as a small solid rectangular button flush to the right margin. Navigation is four text links at 15px laid over the photograph's top-right corner, 24px in, with a neutral scrim behind that row only if the image is light there. No logo is repeated: the name is the logo. Nothing else is on the screen.

On a phone: The photograph takes the top 50svh at full width, re-cropped around its focal point. The name sits under it at 23vw on one line; a name longer than seven characters breaks onto two lines at 21vw, line-height 0.85, and fills the band down to a 16px bottom margin. The supporting sentence at 16px and the action button stack above the name on the left margin. The links collapse to one 'Menu' word over the photograph, top-right.
Headline: The name itself on one line, up to about 12 characters at 19vw (drop towards 13vw for longer names), and at most two lines on a phone.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. how-it-works — Accordion of tinted panels (strip)
A two-column introduction, then one horizontal accordion. Introduction: the heading, two to four words at clamp(36px, 4vw, 60px), in columns 1–5; one paragraph at 18px in columns 7–11. 64px below, a flex row across columns 1–12, 520px tall, of four to six panels with no gaps. The open stage is a panel taking about 58% of the width; the rest are vertical slivers sharing what remains. Order is carried by colour: the first stage is the darkest tone of one hue and each later stage is a lighter flat tint of it, so the row reads dark to light from left to right. A sliver shows only its stage name, rotated 90 degrees and reading upward, at 20px bold, anchored to its bottom-left. The open panel shows the name at 40px top-left, a 36ch paragraph at 18px bottom-left and, optionally, one photograph in its right half. Clicking a sliver opens it (flex-basis transition, 450ms).
On a phone: The accordion turns vertical: stages stack at full width as bars 64px tall in the same dark-to-light order, names set horizontally at 18px. The open stage expands to its content height with the paragraph at 17px. The first stage is open by default.

### 2. contact — The email as display type (statement)
The section is 100svh in the inverse of the page's colours. A single email address is set as one line of display type spanning the content width: the font-size is fitted so the address runs from margin to margin (about 7–9vw for 20 characters; break after the @ onto two lines if it is longer than 26), light or regular weight, tight tracking, sitting on a baseline 12vh above the bottom edge. It is a `mailto:` link; on hover the whole line takes the accent ink. In the top-left corner, a sentence of up to 12 words at 20–22px says what to write about. In the two bottom corners at 14px: phone and city at the left, two or three social links at the right. No heading and no form. For a pinned ending, make the section `position: sticky; bottom: 0` beneath the page so the previous section lifts off it.
On a phone: The address breaks after the @ onto two lines at 11.5vw, left-aligned, sitting at 55% of an 86svh screen. The sentence sits at the top-left at 18px. Phone, city and social links stack at the bottom-left at 15px with 12px between them.

### 3. showcase — Square plate, spare text (split)
One flat field split 50/50, at least 88svh tall. Left half: a single square photograph filling the half's width minus 40px margins, vertically centred, square corners. A large simple shape may be laid over it to turn the photograph into the object it stands for: a ring 86% of its width with a 6px stroke and a small solid dot at the centre makes a record; a notch cut by clip-path makes a ticket stub. Right half, a flex column with space-between: at the top a row of three plain text tabs at 18px (editions, years, variants), the active one in full ink and the others at 40%; in the middle the title, two to four words at 32–40px bold, with a 34ch description 48px below; along the bottom two filled rectangular cells side by side, each half the column wide and 72px tall, acting as the two actions, one in ink and one a tone off the field.
On a phone: The square photograph comes first at full width with 16px margins. The tabs sit under it as one row at 17px. Then the title at 28px, the description, and the two action cells stacked, each full width and 60px tall.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 4. footer — Columns above, wordmark below (stack)
The footer inverts ground and ink and fills a whole viewport (min-height 100svh), arranged as three rows in a grid (auto 1fr auto). Top row, 40px from the edge: four small columns on the 12-column grid (address, navigation, social, hours or contact), each a plain list at 15–16px with its first line in the full ink and the rest in the softer ink. Middle row: empty. Bottom row: the wordmark alone, sized to run from the left margin to the right margin on one line. Set it as inline SVG text with a `viewBox` fitted to the word and `width: 100%`, or tune `font-size` in `vw` to the letter count, so it never wraps; its baseline sits 20px above a single line of legal text at 13px. With `position: sticky; bottom: 0` and a lower `z-index` than the page, the last section slides away to uncover it.
On a phone: Columns become two by two at 15px with 32px between rows, at the top. A gap of about 20svh follows. The wordmark spans the full width at the bottom; a name longer than ten letters stacks on two lines, each fitted to the width. Legal line beneath at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Scaling wordmark
The giant name responds to the scroll: as the first screen leaves, the wordmark scales down a few percent (or grows from 0.94 to 1 as the footer arrives) on a scroll-linked timeline, so the monument feels heavy. Travel stays under 8%. Static fallback where scroll timelines are unsupported. Recipe: 'Scroll-linked progress' in references/motion.md, animating `scale`.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 10. Where the richness comes from
Scale. The size of the name against the smallness of everything else is the entire visual event, so protect both ends: do not shrink the name to make room, and do not let body text creep above 20px.

## 11. How this direction goes wrong
A long name set small is just a logo. If the name has more than about 12 characters, stack it on two lines or crop it with the viewport edge; never drop below 12vw. Do not add a second big headline under the name. Do not decorate the letters.

## 12. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Paul Kalkbrenner** (Awwwards Site of the Day, studied score 8.1) `aww-paul-kalkbrenner`
  Idea: Swiss poster typography for a techno artist: the name as one black line with a photo set inside it like a glyph, then every chapter gets its own flat colour and visible grid.
  Hero: Pure white viewport. The artist's name sits on one line at exact vertical centre in bold black neo-grotesk, about 10.4vw, spanning roughly 78% of the width with equal side margins. The space between first and last name is replaced by a small landscape black-and-white photo, x-height tall and resting on the baseline. Top-left is a tiny circular monogram; eight nav links in 13px bold are spread at even intervals across the right half of the top edge. Bottom edge: equaliser bars with a grey label over a track title at left, a three-line bold blurb starting just left of centre, a sound toggle hard right. About 85% is empty.
  Worth taking: Replace the space between the two words of a giant name with a small photo cropped to x-height.
- **NOTHIN’** (Awwwards Site of the Day, studied score 7.4) `aww-nothin`
  Idea: The studio's name set as a wordmark so large it is the whole hero, repeated in inverted colours as the footer, so 'nothing' is literally the only content on screen.
  Hero: The captured hero frame is a black preloader wipe; this describes the loaded state. White field. A custom heavy geometric wordmark in black spans the full width between 1% margins, vertically centred, about 30% of the viewport tall, its apostrophe hanging at the top-right. Top-left: a two-line statement at about 1.6vw with a small black pill button under it. Top-right: a tiny menu label with a four-dot icon. Along the bottom edge: a one-line studio descriptor at left, two social links and a language chip at right. Everything else is empty white, with no image and no colour.
  Worth taking: Make the hero nothing but the name: a wordmark scaled to the full viewport width on a blank field, with only a two-line statement and one small button in a corner.
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

Saved to /Users/mainprofile/Business-Class-Travel/.taste-skill/thank-you/name-as-monument/direction.json · reprint with `node draw.mjs --show`
