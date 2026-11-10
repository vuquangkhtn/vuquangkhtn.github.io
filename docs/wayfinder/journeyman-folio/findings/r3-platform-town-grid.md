# Findings · 072 lumen-town-grid (Claude Fable 5.2) → The Platform act

Ticket: `../t/r3-platform-town-grid.md` · Source: https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/072-lumen-town-grid.html (83 KB, single file, ~210 lines CSS / ~525 lines JS, zero webfonts, zero frameworks). Distillation frame: `~/.agents/skills/rea-miaai-hub/references/design-language.md`.

## Staging

**One sentence:** a fictional municipality's power board — "Lumen — Municipal Power Board, Pop. 2,140" — where the page IS the control room and the centrepiece is an isometric model-railway layout of the town whose every building is a live, clickable electric meter.

**Framing archetype:** hybrid of two frame idioms — the **framed artifact on a workbench** (the town sits on a plinth with a painted edge inscription, caption tiles pinned to its corners, a switchboard strip with corner screws below) inside an **institutional dashboard** (municipal annual-report header, quick-stats, footer colophon). The register is *civic instrument*, not toy: "The board's log", "Carbon-free streak", "Mainland account · today". This is exactly the annual-report voice the Platform act wants — the joke is that a dashboard has been made physical.

## Palette (light grammar)

Material-named vars, `:root` line 8:

| Var | Hex | Role |
|---|---|---|
| `--paper` | `#F6F1EA` | warm cream page + board ground |
| `--card` | `#FDFBF7` | panel/card off-white (also the ground plate fill) |
| `--ink` | `#2B2D42` | navy-as-ink: all text, all 1.5px strokes |
| `--sun` | `#FFD166` | THE single saturated accent: energy, active states, focus ring, flow |
| `--aqua` | `#A8DADC` | water material: hydro, river, panel shadow |
| `--steel` | `#457B9D` | wind/mains blue; board's drop shadow |
| `--pink` | `#F9C5D1` | battery/rose accent; card shadow; alert chips |
| `--main` | `#B4B0BA` | mainland (third-party) grey in charts/ring |

Derived ramps computed in JS (line 315) — the isometric per-face trick: `BLUE=mix(C.steel,C.white,.45)`, `CREAM=mix(C.sun,C.paper,.62)`, `ROSE=mix(C.pink,C.steel,.22)`, `SLATE=mix(C.steel,C.white,.12)`, `WHITE='#FBF8F3'`. Every box gets `shade(hue)=>[mix(h,C.white,.5), h, mix(h,C.ink,.2)]` — top / left / right faces (line 316). Building walls cycle a 7-stop street rhythm: `HUES=[pink,CREAM,aqua,BLUE,pink,CREAM,aqua]` (line 406).

**Day/night ramp** (line 745) — sky keyed to time-of-day, interpolated per call:
`NK=[[0,'#A9A8D9'],[5.7,'#A9A8D9'],[6.6,'#F6CFCB'],[7.6,'#FFF0D2'],[10.5,'#FFFFFF'],[15.2,'#FFFFFF'],[17,'#FDEEE2'],[17.8,'#F9C5D1'],[18.9,'#B9AEDB'],[19.8,'#A9A8D9'],[24,'#A9A8D9']]`, storm override `mix(c,'#97A3C2',.55)`.

**Night tint trick (the study's best move):** the entire board is retinted by ONE overlay — `night=rect fill:#FFFFFF style:'mix-blend-mode:multiply'` whose fill is animated through `nightCol(t)` (lines 327, 752). No per-element recoloring; darkness falls on the whole scene with one attribute change, then `.dark` lamps/stars fade in at 1.2s.

## Typography

Zero webfonts. One stack (line 10):
```css
--sans:"Avenir Next",Futura,"Century Gothic","Trebuchet MS",system-ui,sans-serif
```
Geometric-sans municipal-modern voice (Futura = 1930s civic signage). `font-variant-numeric:tabular-nums` on `body` — every counter locks.

Treatments:
- Micro-labels: `.lab{font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(43,45,66,.72)}` — every panel is titled this way: "Day dial · drag the sun", "Battery barn · 1,000 kWh", "Occasions".
- Display: `h1` 40px / lh .9 / weight 800 / `letter-spacing:-.02em`; clock 44px weight 800 lh .95; big figures `.fig` 40px weight 800 with `<small>` units at 14px weight 700 (margin-left 4px).
- Painted-on-board lettering `.itx`: SVG text, `font-weight:800;letter-spacing:.14em` — street names ("OLD TOWN", "MILLSIDE"), the cinema marquee "BIJOU", plinth inscriptions — all projected through the isometric matrix.
- Chart axis `.ax`: 10px weight 700 `letter-spacing:.08em`.
- Narrative captions: `font-style:italic` 13.5px in meter-card notes (`.cardbox .note`), separated by a dashed rule `border-top:1.5px dashed rgba(43,45,66,.4)`.

## Chrome idioms (quotes from source)

- **Plinth inscriptions** (isometric text on the board's front edge, lines 385–386): `'LUMEN MUNICIPAL POWER BOARD  ·  EST. 1926'` and on the right face `'600 kW WIND · 420 kW SUN · 170 kW WATER'` — maker lore + spec plate fused into the artifact itself.
- **Brand lockup:** SVG shield crest + `Lumen` + kicker `Municipal Power Board · Pop. 2,140`.
- **District names painted on the ground:** `gtext('OLD TOWN',…)`, `'THE WORKS'`, `'SUN FIELD'`, `'RIVER AMP'`, `'THE RIDGE'`, `'RIVERSIDE'`, `'HILLTOP'`, `'MILLSIDE'` (line 382–383).
- **Caption tiles:** meter card `.cardbox` pinned top-left of the board (`box-shadow:4px 4px 0 var(--sun)`, pink round close button); ticker `.tape` bottom-right — an ink pill with a sun dot, live voice: "The board is warming up."; stat caption bottom-left: "Sold to the mainland £0.00".
- **Corner screws on the switchboard** (lines 260, 132): `.screw` = paper circle + one ink line `transform:rotate(35deg)` — pure physical chrome.
- **Named building lore:** 'Turbine No. 1, "Gusty"' / "Mabel was the first chair of the Board, 1926."; 'Crumb & Current, bakers'; 'Ohm & Daughters, enamelware'; 'The Filament Arms'; 'The Wringer, steam laundry'. Every building has TWO notes (idle/active) picked by load: 'Ovens cold. The sourdough is thinking.' ↔ 'Deck ovens at 230 degrees. First loaves at five.'
- **Log/wit lines:** "Good afternoon from the Board. All feeders closed, all three turbines turning."; "Half-time. Two thousand kettles go on at once."; "School's out. Demand on Hilltop drops like a satchel."; "Load shed, step 1: The Bijou goes dark so the ovens stay hot."
- **Colophon footer** (line 295): "Lumen Municipal Power Board · 1 Substation Lane · Open to visitors on the first Saturday of the month." / "Every figure on this board is simulated. The town, regrettably, is fictional."

## Layout grammar

- Container: `.wrap{max-width:1400px;margin:0 auto;padding:18px 22px 40px}`.
- Main grid: `grid-template-columns:minmax(0,1fr) 340px` — wide board + instrument sidebar; `.full` spans both; a `1fr 1fr 2fr` stat row. Panels: `border:1.5px solid var(--ink);border-radius:14px;padding:14px 16px`.
- **Hard offset shadows, color-keyed per panel** (line 33): `box-shadow:5px 5px 0 var(--pink)` (`.sh-p`), aqua, sun, steel — no blur, the "toy brick / riso sticker" material. Switchboard gets `5px 5px 0 var(--ink)`.
- Breakpoints: **1080px** (sidebar becomes a 3-across row, switchboard stacks) and **760px** (single column; board overlays — card/tape/mainland captions — become `position:relative` in-flow; clockbox restacks via `order`).
- **The board is NOT CSS `rotateX/rotateZ`** — it is SVG isometric via matrix. Unit cell `U=16`, iso cos `CX=.866`; projection `P=(x,y,z=0)=>[(x-y)*CX*U,(x+y)*.5*U-z*U]` (line 304); ground plane transformed by `const MAT=\`matrix(${CX*U},${.5*U},${-CX*U},${.5*U},0,0)\`` (line 323). Buildings are polygons in screen space via helpers `box()` / `gable()` (lines 331–343). Painter's-order solved by depth sort: `sorted.sort((a,b)=>a.d-b.d)` where `depth=x+w/2+y+d/2` (lines 400, 528). Text is painted onto faces with `matrix(.866,.5,0,1,…)` (left face) and `.866,-.5` (right face) (line 350).
- Board edge/plinth: two polygons tinted `mix(C.steel,C.white,.3)` and `C.steel` (lines 356–357) give the layout board 0.9-unit thickness; ground plate `#FDFBF7` with 1.2px ink stroke; roads are white rects with dashed centerlines; the river is an aqua band with three animated dash "ripples".
- Elevated terrain: an `elev(x,y)` height function (line 353) raises Hilltop +0.8 and The Ridge +1.2 so the board has genuine topography.

## Motion grammar

Two ease vars (line 9) — exactly the frame's settle + spring pair:
```css
--spring:cubic-bezier(.3,1.6,.5,1);   /* overshoot: pop-in, lift, blade flip, card swap */
--out:cubic-bezier(.2,.8,.2,1);       /* settle: opacities, wire string, tape swap */
```

- **Entrance choreography (staged, ~2.7s):** an `.intro` class on the SVG arms everything, removed after 2700ms. Buildings pop bottom-up: `@keyframes pop{from{transform:translateY(10px) scale(.55,0);opacity:0}25%{opacity:1}to{transform:none}}` at `.66s var(--spring) backwards; animation-delay:var(--d)` where `--d = 150+nB*26ms + districtOffset{old:0,mill:140,hill:280,river:420,works:560,gen:640}ms` (line 398) — the town assembles district by district. Trees stagger `500+i*45ms`. Wires "string" last: dash-draw `stroke-dasharray:var(--l);stroke-dashoffset:var(--l);animation:string 1s var(--out)` with `--d:1500+n*70ms` (line 62), poles fading in `.6s .2s`.
- **Selection:** building lifts `translateY(-6px)` (spring) + a sun-colored footprint ring `.fp` fades in; the connected wire + service stub highlight (`.hlp.hl{opacity:.95}` sun, 6px).
- **Ambient life:** chimney smoke `@keyframes puff{0%{…translate(0,0) scale(.5)}20%{opacity:.95}100%{…translate(7px,-17px) scale(1.5)}}` 2.6s loop, 3 puffs staggered `.9s/1.7s` — gated ON only when actual load is high (bakery >12 kW). Trunk wires pulse `stroke-width 1.6→2.6` at 1.7s. River ripples, rain dashes (`rain .5s linear infinite`), lightning flicker (`flash .7s`: .75 → .1 → 0), alert bubbles bob 1s, cloud + its ground shadow drift the whole map in real time (`cx=-8+((T/2.2)%1)*40`).
- **Throughput-as-motion (the signature):** energy flow is 3 dash layers on each wire (ink under, sun over, e.g. `'7 28 1 0'/'6 30'`), and their speed is physics: `w.off -= Math.sign(kw)*(9+62*Math.sqrt(min(1,kw/cap)))*dr` (line 801) — heavily loaded lines visibly race, idle lines are still. Layer opacities gate at load >3 kW, >22% cap, >55% cap.
- **Clocks everywhere:** the town clock tower's hands move with sim time; the day dial hand + sun/moon knob rotate; the frequency gauge is a real damped spring in JS: `fvel+=(-(fdev-tgt)*26-fvel*3.4)*dr` (line 805) so the needle wobbles when a big load lands.
- **Render split:** `fast(dr)` every frame (flow dashes, turbine blades, gauge spring); `renderSlow()` throttled to 5 Hz (`slowAcc>.2`) for DOM/SVG attribute writes. Turbine spin speed tracks wind: `spin=40+S.w*330`.

## Texture & materials

- **No CSS gradients at all.** All "light" is material logic: per-face `mix()` ramps on polygons + the single multiply-blend night rect. Same philosophy as the frame ("gradients are light") taken further — light is a *blend layer*, not a gradient.
- **Hard offset solid shadows** (`5px 5px 0 accent`) as the panel material; `4px 4px 0 var(--sun)` on the caption card.
- **Dashes as texture:** road centerlines (`'3 4'` @ .35 opacity), allotment hatch strokes, river ripples (`'0.5 .9'` marching 3.2s), underground cables (`'2.5 2.5'`), stubs (`'1.6 1.8'` @ .55), rain (`'7 13'`), tripped interconnector (`'4 5'`).
- **White banding details:** awning stripes as alternating polygons ('#fff' / pink, line 431), solar panels tilt via a two-polygon ramp (steel top, paper side).
- Scrollbar as chrome: `scrollbar-color:var(--ink) transparent; scrollbar-width:thin`.
- Custom range slider is drawn as a physical thumb with a hard shadow: `box-shadow:-7px 3px 0 -3px #fff,-7px 3px 0 -1.5px var(--ink)` (line 155).

## Accessibility & perf

- Focus: `:focus-visible{outline:3px solid var(--sun);outline-offset:2px;box-shadow:0 0 0 2px var(--ink)}` — double ring, accent+ink.
- The SVG board: `role="group" aria-label="Isometric model town. Use arrow keys to move between buildings, Enter to read a meter."` — instructions live in the accessible name. Buildings are `role="button"` with **roving tabindex**: only the first has `tabIndex=0`, arrows cycle the focus list, Enter/Space select, Escape closes (lines 739–742).
- Sliders: day dial & wind knob are `role="slider"` with `aria-valuemin/max/now` **and `aria-valuetext`** ("16:30"); keyboard arrows + PageUp/PageDown on the dial. Speed control is `role="radiogroup"` with arrow-key navigation; feeder switches are `role="switch"` whose `aria-checked` **drives the CSS** — `.knife[aria-checked=false] .blade{transform:rotate(52deg)}` — state is one attribute, no class bookkeeping.
- `aria-live="polite"` on the meter card; the chatty log is deliberately `aria-live="off"`.
- **Reduced motion, CSS:** `@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.arr{display:block}.fl{display:none}}` — animated flow dashes are REPLACED by static directional arrowheads placed along each path.
- **Reduced motion, JS:** `RM` gates the intro (`2700→0ms`), sim warmup (`2300→0`), switches the rAF loop to 1.5s batched ticks, and swaps dash-flow for those static arrows (placed via `getPointAtLength`, flipped 180° for reverse flow, hidden under 0.5 kW) — motion is replaced with equivalent *information*, not deleted.
- Perf: rAF with `dr=Math.min(.06,(ts-last)/1000)` clamp; slow path at 5 Hz; `visibilitychange` cancels rAF when hidden and resumes cleanly; boot pre-simulates 144 half-hour steps with logging suppressed (`S.quiet`) to fill the 24h chart before first paint.

## Borrow / Leave for The Platform act

The engineer's voice seed — *miniapps are shops, shells are shopping centres, the platform is the grid that powers them* — is a **direct structural match**. This study already speaks that sentence: buildings draw load from wires that trace back to one substation. Map: **building = miniapp/shop** (named, with idle/active meter notes), **substation = platform core**, **wires + flow dashes = traffic/requests, speed ∝ load**, **feeder knife switches = platform capabilities you can flip to show cost/impact** (flip "generator" → miniapps go dark, log explains), **mainland interconnector = third-party/legacy dependencies** (buy at 21p / sell at 4.5p — perfect for "cost of legacy" jokes), **battery barn = caching/queueing**, **storm islanding = outage/incident story**, **carbon-free streak = uptime streak**, **"Sold to the mainland £x.xx" = platform value extracted/saved**, **Pop. 2,140 = 150+ miniapps**.

**Borrow (concrete):**
1. **The isometric SVG-matrix construction** — `P(x,y,z)=[(x-y)*.866*U,(x+y)*.5*U-z*U]`, `MAT=matrix(.866U,.5U,-.866U,.5U,0,0)`, `box()/gable()` with `shade(hue)` per-face ramps, depth sort by `x+y`. Build the platform as a small town: 6–10 shop-buildings (miniapps: "Checkout", "Loyalty", "Search"…) wired to one substation labelled **PLATFORM · EST. 2022 · 150 MINIAPPS POWERED** in the plinth-inscription idiom. Paint district names as platform domains ("SHELLS", "SHOPS", "THE GRID").
2. **The chrome kit** — `.lab` kickers (10.5px / 700 / .16em / uppercase, " · " separators), hard `5px 5px 0 accent` panel shadows color-keyed per case-study, corner `.screw`s on the switchboard strip, caption meter-card + ink `.tape` ticker ("Good afternoon from the Board…" → "Good afternoon from the platform. All 150 miniapps healthy."), colophon footer with a dry disclaimer line. Full palette as-is: paper `#F6F1EA`, card `#FDFBF7`, ink `#2B2D42`, **sun `#FFD166` as the sole energy accent**, aqua `#A8DADC` / steel `#457B9D` / pink `#F9C5D1` as material roles (e.g. data / infra / experiments), `#B4B0BA` for third parties. Annual-report register: "Mainland account · today" → "Platform account · this quarter".
3. **Throughput-as-motion + its a11y fallback** — dash-flow speed ∝ miniapp traffic on each wire; two-state building notes picked by load ('Quiet. The shutter is half down.' ↔ 'Friday rush. Every till is ringing.'); `--spring:cubic-bezier(.3,1.6,.5,1)` pop-in entrance staggered by district; and copy the RM pattern exactly: kill animations, **substitute static arrowheads** for flow, batch ticks.
4. **The single-overlay tint trick** (`mix-blend-mode:multiply` rect cycling a ramp) — stage the act's "day in the life of the platform" (traffic dawn→peak→dusk) without touching any element's color; lamps = deploys lighting up windows at dusk.

**Leave (noise for this act):**
- **The full simulation** — wind/solar/battery physics, load-shedding ladder, football surge, frequency spring, tram, 24h stacked chart. The Platform act is a portfolio narrative, not a game; keep ONE legible loop (buildings → wires → substation → a couple of toggles).
- Flavor sprawl: 14 lamps, 26 stars, allotment marrows, sheep, the tram's dwell physics, 20-house street name tables. Pick 6–10 buildings with two notes each, one mover max.
- The town-clock/frequency gauges unless a metric story is actually told — a dead instrument panel reads as decoration. Instruments must be wired to real numbers (the engineer's: bundle sizes, build times, 150+ miniapp count, React 18/19 migration dates).
- Municipal fiction beyond the analogy: keep the *voice* ("The town, regrettably, is fictional" → "The platform, regrettably, is real.") but every figure shown must be the engineer's true ones.
- Note for the builder: if a CSS-3D board is preferred over SVG, `rotateX(55deg) rotateZ(45deg)` (frame §5) can substitute — but this study's SVG matrix is easier to depth-sort, hit-test, and caption; recommend keeping it.
