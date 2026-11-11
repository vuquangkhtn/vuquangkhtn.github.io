# Study 016 — vector-lunar-descent: distillation for The Home Machine act

Source: https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/016-vector-lunar-descent.html
("Descent — A Vector Lander", single-file HTML, 56 KB / 1031 lines, zero webfonts, zero frameworks, zero images except one SVG data-URI grain tile.)
Frame reference: `~/.agents/skills/rea-miaai-hub/references/design-language.md`.
All quotes below are verbatim from the study's CSS/JS. Secondary toy-era contrast: study 041 jelly-alphabet (palette quoted at the end of Palette).

## Staging

**Concept:** a lunar-lander game rendered as a real vector monitor would draw it — everything on screen is one moving electron beam — housed in a physical cabinet: **one instrument in a dark hall**, the frame's CRT-terminal archetype. The page never says "web page": it says *machine*.

The stack, outside-in:

- **The hall** (`body`): a green-tinted near-black room with a faint central glow — `radial-gradient(120% 90% at 50% 38%, #08110d 0%, #040806 46%, var(--black) 100%)`.
- **The cabinet** (`.cab`): fixed, full-viewport, flex-centered column with `gap:10px`, padded by `env(safe-area-inset-*)` — centers tube + maker's plate.
- **The bezel** (`.bezel`): `padding:7px; border-radius:clamp(28px,5.6vmin,72px)` plastic case, `background:linear-gradient(160deg,var(--case-hi) 0%,var(--case) 42%,#030605 100%)`, with the signature shadow stack — a 1px edge ring, a drop into the hall, and **green ambient light leaking from the tube into the room**:

  ```css
  box-shadow:
    0 0 0 1px var(--edge),
    0 0 0 3px #030504,
    0 30px 80px -20px rgba(0,0,0,.9),
    0 0 120px -30px rgba(92,255,176,.16);
  ```

- **The tube** (`.tube`): `width:min(92vw,128vh); height:min(78vh,70vw); border-radius:clamp(22px,5vmin,64px); background:var(--black); overflow:hidden; cursor:crosshair; isolation:isolate` — sized by JS to keep aspect 1.28–1.56 landscape (2.15 portrait) inside margins of 7px (small screens) / 22px, minus a plate allowance.
- **Inside the tube**, four layers stacked: `#scr` (vector canvas) → `#bloom` (the bloom canvas) → `.grain` (phosphor noise tile) → `.glass` (vignette + reflection overlay). All `pointer-events:none` except the canvas-layer buttons.
- **The maker's plate** below the bezel (`.plate`): a dark engraved strip reading `Vectron 21 · X-Y Display` flanked by two *rendered screws* (7px radial-gradient heads, the second `transform:rotate(70deg)` — different slot angles, a real-object tell) and one glowing mint LED.

Power-on choreography: the bezel fades up from `opacity:0;transform:scale(.985)` (`animation:warm 1.4s cubic-bezier(.16,.84,.24,1) .1s forwards`), the plate follows at `.5s` — the machine *warms up*, it doesn't load.

## Palette

`:root` verbatim:

```css
--black:#020403;
--mint:#B8FFD9;
--green:#5CFFB0;
--case:#070c0a;
--case-hi:#0e1813;
--edge:#16271f;
--engrave:#4f7c66;
```

Roles:

| Hex | Role |
|---|---|
| `#020403` `--black` | unlit phosphor; tube interior; also the additive "black" fill in the render loop |
| `#B8FFD9` `--mint` | the **ink**: final crisp 1.2px line pass + all DOM text (`body{color:var(--mint)}`) |
| `#5CFFB0` `--green` | the **glow**: every wide/soft pass, bloom strokes, glass sheen, LED, focus ring |
| `#070c0a`/`#0e1813`/`#16271f` | case plastic ramp (shadow → face → highlight edge) |
| `#4f7c66` `--engrave` | engraved plate lettering, with `text-shadow:0 1px 0 rgba(184,255,217,.07), 0 -1px 0 #000` |
| `#08110d`,`#040806`,`#030605`,`#0b1510` | hall gradient stops, case depth, tube inner ring |

**The palette move: brightness replaces hue.** There is exactly one phosphor color; intensity is a 5-step beam-brightness ramp, not more colors:

```js
const D0 = 0, D1 = 1, D2 = 2, D3 = 3, HOT = 4;   // brightness buckets
const LV = [0.2, 0.42, 0.7, 1, 1];               // far ridge/stars → HUD → ship → white-hot
```

"Alarm" is **HOT + blink**, never a red. **No CGA accents exist in this study** — it is a mono-phosphor P1 tube, and that restraint is why it reads 1980, not 1990. (For contrast, the toy-era study 041 jelly-alphabet is full candy-CGA: `--pink:#FF2E7E; --lemon:#FFE14D; --grape:#2B1055; --lime:#7CFF6B; --blue:#3DA5FF; --orange:#FF8A1F` with an Arial Rounded stack — that palette belongs to the *toy* slide, not the home-computer slide.)

## Typography

Zero webfonts. Two type systems:

**1. DOM voice** — the cabinet's label type: `font-family:"Gill Sans","Gill Sans MT",Futura,"Century Gothic","Trebuchet MS",sans-serif` — the space-age instrument voice. The plate sets it `font-size:10.5px; letter-spacing:.34em; text-transform:uppercase` (micro-label per the frame).

**2. The beam's own stroke font** — all in-game text is drawn by the electron beam as line segments, in the same brightness buckets as the geometry. A 4×6-unit grid font, glyphs encoded as digit-pair polylines split by spaces:

```js
/* ---------- stroke font: 4 x 6 grid, pairs of digits, polylines split by spaces ---------- */
A:'0602204246 0444', E:'40000646 0333', L:'000646', M:'0600234046', S:'413010010213334445361605',
0:'100105163645413010 1531', 2:'01103041420646', '.':'2626', '-':'1333', '·':'2323', '×':'0145 4105',
'→':'0343 214325', '↑':'2620 022042'
```

Advance = `(6 + tracking) * unit`; `text(str, x, y, u, b, al, tr)` with alignment `al` 0/1/2 (left/center/right) and tracking `tr` in grid units. It covers A–Z, 0–9, punctuation, `= + / ! ? × ·` and **directional arrows** — the arrows live inside the readouts ("HORIZONTAL SPEED 012 →"). Numbers are zero-padded by construction: `z6 = n => String(Math.max(0,Math.round(n))).padStart(6,'0')` — SCORE is always `000000`-wide.

The title "DESCENT" gets a **stroke italic**: a per-row shear baked into the segment list, `const sh = y => (6 - y) * .17` — the top of each glyph slides right, an entirely vector "slant".

## CRT fx

The core of the study — five techniques, all cheap:

**a) Beam list with pincushion + wobble.** All geometry funnels through one function per frame:

```js
const KW = 0.02;
function L(x1, y1, x2, y2, b) {
  ...
  let nx = (x1 - hx) / hx, ny = (y1 - hy) / hy, f = 1 - KW * (nx * nx + ny * ny);   // pincushion deflection
  const ax = hx + (x1 - hx) * f + jx + (R() - .5) * js, ...                          // + beam jitter
}
```

Endpoints are pulled toward center by 2% of squared normalized radius (CRT deflection distortion), plus per-frame endpoint noise `js = .32` and whole-frame drift `jx,jy = ±.25` — the drawing hand is never still. Lines are culled at a `-40px` margin.

**b) Phosphor persistence, quantized.** An offscreen canvas holds the afterglow; decay runs in ~20 Hz steps so 8-bit rounding can't leave burned-in residue (their comment, verbatim):

```js
/* phosphor decay is applied in ~20 Hz steps so that 8-bit rounding cannot leave a burned-in residue */
const step = fadeAcc >= .046, fade = step ? 1 - Math.exp(-fadeAcc / (reduced ? .04 : .125)) : 0;
tctx.fillStyle = 'rgba(0,0,0,' + fade.toFixed(4) + ')'; tctx.fillRect(...);        // exp fade τ=125ms
tctx.globalCompositeOperation = 'color-burn'; tctx.fillStyle = '#fcfcfc'; ...      // push remainder to true black
```

New segments are stroked into the persistence layer with `globalCompositeOperation='lighter'` — two widths: core `lineWidth = 3.3 * kW` and halo `11 * kW` at `.34` alpha.

**c) Three passes per brightness bucket onto the visible canvas** — halo, core, and the **vertex pass** (the "vertices" in the ticket): every polyline endpoint is re-stroked as a bright dot, mimicking beam dwell where direction changes:

```js
dctx.globalCompositeOperation = 'lighter'; dctx.strokeStyle = GREEN;
dctx.globalAlpha = .2 * lv;               dctx.lineWidth = 3 * kW;   dctx.stroke(paths[b]);  // green halo
dctx.globalCompositeOperation = 'source-over'; dctx.strokeStyle = MINT;
dctx.globalAlpha = lv;                    dctx.lineWidth = 1.2 * kW; dctx.stroke(paths[b]);  // mint core
dctx.globalAlpha = Math.min(1, lv * 1.25); dctx.lineWidth = (b >= D2 ? 2.05 : 1.6) * kW; dctx.stroke(dots[b]); // vertices
```

Plus frame flicker: `flick = R() < .012 ? .72 : .95 + R() * .05` — a 1.2% chance of a 28% dropout frame, otherwise 95–100% shimmer.

**d) Bloom for 1/16 the pixels.** A second canvas at quarter resolution, upscaled by CSS with a cheap blur and screened over the sharp layer:

```css
#bloom{width:25%;height:25%;transform:scale(4);transform-origin:0 0;filter:blur(3.3px);mix-blend-mode:screen;opacity:.5;pointer-events:none}
```

Each frame it just gets a downscaled `drawImage` copy of the main canvas.

**e) Glass, vignette, grain, room-light.** The `.glass` overlay supplies CRT curvature darkness — `radial-gradient(118% 118% at 50% 50%, transparent 56%, rgba(0,0,0,.34) 82%, rgba(0,0,0,.72) 100%)` — a diagonal sheen `linear-gradient(118deg, rgba(92,255,176,.045) 0%, rgba(92,255,176,.012) 22%, transparent 36%)`, and inset shadows `inset 0 0 70px 6px rgba(0,0,0,.85)` plus mint rim glints. `.glass::before` fakes a window reflection on the tube: hard-stop cross gradients + `linear-gradient(140deg,#5CFFB0,#1f6b4a)` under `transform:perspective(600px) rotateY(24deg) rotateX(-8deg) skewY(-5deg); filter:blur(9px); opacity:.05`. `.grain` is a 180×180 SVG `feTurbulence fractalNoise baseFrequency='1.1' numOctaves='2'` data-URI tinted green via `feColorMatrix`, at `opacity:.06`. Finally the tube **lights the room**: a CSS var `--lit:0` (driven by JS, thrust-near-ground, attack 9/s decay 2.2/s, quantized to 1/40) sets `.glass::after` — `background:radial-gradient(70% 70% at 50% 56%, rgba(92,255,176,.11), transparent 72%); opacity:var(--lit)`.

## Chrome idioms

- **HUD readouts, beam-set:** corner-anchored (`px = Math.max(20, cw * .036)`), label dim (D1) + value bright (D3): `SCORE 000000 · SITE 02 · ALTITUDE 0000 · HORIZONTAL SPEED 012 → · VERTICAL SPEED 003 ↓ · CROSSWIND 04 →`. Lives are drawn as **three miniature vector ships** (the ship polyline re-stroked at `.36` scale), not icons.
- **Segmented fuel bar:** 20 vector cells, each a tiny rectangle with a center tick — `L(x,y,x+w,y); L(x+w,y,x+w,y+6u); ... L(x+w/2,y+1.2u,x+w/2,y+4.8u)` — empty cells keep only their baseline. Low fuel blinks the whole bar HOT and prints `TANKS DRY`.
- **The vector UI kit** (how boxes exist without fills): `frameBox` = an 8-segment rounded rect with chamfered corners; `brackets` = four free corner brackets; `hatch` = diagonal line fill for active states; `arcArrow` = a stroked arc with chevron head. Buttons, touch pads and the start plate are all built from these.
- **Typewriter telemetry with a beam cursor:** messages reveal at 46 chars/sec and the write-head is a live 4×6-unit open rectangle stroked HOT at the typing position. Wrapped at ≤46 chars/line.
- **Game-manual speak** — the copy voice, deadpan flight-operations prose, ALL CAPS: `CONTACT LIGHT. ENGINE STOP. THE EAGLE-EYED AMONG YOU MAY EXHALE.` · `YOU HAVE CREATED A NEW CRATER 2 KM WIDE.` · `THAT WAS LITHOBRAKING. WE DO NOT TEACH LITHOBRAKING.` · `THE MANUAL WAS SPECIFIC ABOUT WHICH END GOES DOWN.` · `THE BACK ROOM OWES THE FRONT ROOM FIVE DOLLARS.` Site notices: `CROSSWIND REPORTED. YES, ON THE MOON. A MEMO HAS BEEN SENT.` Place-names invented like lunar-map Latin: `KESSLER FLATS · MARE PATIENTIA · RIMA OBLIGATA · LACUS ADEQUATUS · DORSA NERVOSA · BASIN OF SECOND THOUGHTS`.
- **UI reserves blank phosphor:** in attract mode a `keep` rectangle around the start button is excluded — world geometry segments inside it are simply not drawn, exactly how vector games kept title text readable.
- **Maker's plate** as colophon: model + type, screws, one LED (`animation:led 5.2s steps(1) infinite` — solid with a 3% dip at 94–97%, i.e. an almost-steady pilot light that occasionally stutters).

## Motion grammar

- **Warm-up (enter):** `cubic-bezier(.16,.84,.24,1)` — the frame's settle — 1.4s on the bezel (delay .1s, `scale(.985)→1`), 1.2s on the plate (delay .5s).
- **Camera dampers (no beziers, exponential):** `cam.z += (zT - cam.z) * Math.min(1, dt * 2.2)` (zoom), `dt * 5` (y), `dt * 7` (x, inside a dead-zone of `viewW/(2z) * (0.56 - 0.46f)`); zoom target from `smooth(175, 46, alt)` — a smoothstep keyed to one physical number (altitude).
- **Thrust ramp:** attack `h * 8`, release `h * 13` (`s.thr += (s.thrT - s.thr) * Math.min(1, h * (s.thrT > s.thr ? 8 : 13))`) — cuts die faster than fires.
- **Title trace-on:** easeInOutQuad (`p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2`) over 2.5s, segments revealed along cumulative beam length, with HOT spark dots at the live tip; then a **retrace sweep every 8s** (`const c = (t - 4) % 8; if (c > 0 && c < 1.5)`) that re-brightens the letters in beam order, plus a constant offset ghost line (`+off, +off*.55` at D2) giving the title a drop-beam shadow.
- **Blink taxonomy (all `Math.sin(time * k) > threshold`):** status blink k=11 (~1.75 Hz), start-button pulse k=3.2, info line k=6, attract tag k=2.4, ×5 pad k=5. LED uses `steps(1)` instead — hard swaps, no fades.
- **Shockwave rings:** `easeOut = t => 1 - Math.pow(1 - t, 3)` radius growth, dashed by skipping every third segment with the gap rotating (`(i + (r.age * 30 | 0)) % 3 === 0`).
- **Sim/render split:** physics fixed-step 120 Hz accumulator, render on rAF, `dt` clamped `.001–.05`; everything halts on `visibilitychange`.

## Accessibility & perf

- `.sr` h1 + full keyboard instructions; every message mirrored to `#live aria-live="polite"` via `say()`; `aria-pressed` on sound/pause; `:focus-visible{outline:2px dashed var(--green);outline-offset:4px}` — the focus ring is part of the phosphor language.
- Touch pads use pointer capture + keydown/keyup fallbacks; `contextmenu` suppressed; game auto-pauses and audio suspends on tab hide; rAF fully halted.
- **Reduced motion is a first-class render mode**, not an afterthought — CSS collapses the warm-ups to `.01s` and stops the LED; JS `reduced` flag: title traces instantly, typing instant, jitter `jx=jy=js=0`, `flick=1`, phosphor τ drops to 40ms (afterglow nearly gone), flame length halved, sparks and retrace suppressed. The medium (flicker/glow) politely turns itself down without losing information.
- Perf economy: bloom at 1/16 pixels; decay at 20 Hz not per-frame; one `Path2D` per brightness bucket per frame (5 strokes × 3 passes, not thousands); off-screen culling; `devicePixelRatio` capped at 2; stars/terrain from seeded PRNG (`rng(seed)`, mulberry-style).

## Borrow / Leave — The Home Machine era slide

Target: one full-viewport slide in the nine-slide deck, a 1980s home-computer room, not a playable game.

### Borrow

1. **The slide IS the tube.** Skip the bezel-in-a-hall framing; make the full viewport the phosphor. Direct ports: body `radial-gradient(120% 90% at 50% 38%, #08110d 0%, #040806 46%, #020403 100%)`; a `.glass` overlay with the 56%/82%/100% vignette, `inset 0 0 70px 6px rgba(0,0,0,.85)` and the mint rim glints; the `.grain` feTurbulence tile at `opacity:.06`. The rounded-corner mask (`border-radius:clamp(22px,5vmin,64px)` + `overflow:hidden` on a slide container, or a full-bleed vignette) sells "monitor" in one move.
2. **Two-pass phosphor type.** Every glowing element = green halo under mint core. CSS port for headline text: `color:#B8FFD9; text-shadow:0 0 6px rgba(92,255,176,.8), 0 0 18px rgba(92,255,176,.35)` — or on canvas, the exact double-stroke (`#5CFFB0` at `.2` alpha, 3px, `lighter`; `#B8FFD9` at 1.0, 1.2px). Brightness hierarchy via the LV ladder `[.2, .42, .7, 1, 1]` as opacities — dim far text, bright foreground, HOT for the one live element.
3. **Stroke-font headline with trace-on enter + idle retrace.** Port the `GL` digit-pair table (or trace a real font's segments once): reveal over ~2.5s easeInOutQuad in beam order with HOT spark at the tip, then every 8s a 1.5s retrace sweep re-brightens letters in order. That is the slide's idle life — no interaction needed. Keep the `sh = y => (6-y)*.17` italic shear for the title.
4. **Manual-speak copy + zero-padded readouts.** Slide body text in the deadpan ops voice ("THE MANUAL WAS SPECIFIC ABOUT WHICH END GOES DOWN." register, invented for the folio); corner readouts as `LABEL 0000` pairs, dim label / bright value; a typewriter reveal at 46 chars/sec with the 4×6 HOT cursor for the slide's caption line.
5. **Chrome from the vector UI kit:** content held in `brackets` corner-brackets or an 8-segment `frameBox`, active state = `hatch` diagonal fill; a maker's plate as the slide colophon — `Vectron 21 · X-Y Display` → e.g. `HOME MACHINE 64 · TAPE & KEYBOARD · N° 06/09` — with the two radial-gradient screws (second rotated 70°) and the `steps(1)` LED.
6. **Warm-up choreography on slide enter:** settle `cubic-bezier(.16,.84,.24,1)`, `scale(.985)→1` over 1.4s, plate following at .5s; camera-style exponential dampers (`dt*2.2`–`dt*7`) for any parallax drift, never CSS transitions.
7. **Afterglow on state change** (canvas slides): the 20 Hz quantized `1 - Math.exp(-dt/0.125)` fade + `color-burn` cleanup, so text a visitor has "drawn" lingers and decays like real phosphor.

### Leave

- **The game.** No sim loop, lives, fuel logic, inputs, autopilot, sound engine — the slide borrows the *display*, not the play.
- **The 5-bucket pipeline.** Two or three brightness tiers are plenty at slide scale; five exists to juggle a live game's depth cues.
- **CGA candy.** 016 has none, and it's stronger for it — mono mint phosphor reads "home computer 1984"; 041's `#FF2E7E/#FFE14D/#7CFF6B` set is the *toy-era* slide's birthright. If an alarm accent is ever needed, do it 016-style: same hue, HOT tier + `Math.sin(time*11)` blink, not a new color.
- **The bezel furniture at full scale** — room + case + plate framing costs ~40% of the viewport; a full-bleed tube with vignette + one plate line delivers the era in 10%.
- **Per-frame flicker as ambient** — keep the 1.2% dropout flicker only inside the retrace/HOT moments; constant shimmer across a whole static slide reads as noise, and reduced-motion must kill it (016 shows exactly how: `flick=1`, `js=0`, τ→40ms).
