# Study 039 — mars-greenhouse-console: distillation for The Terminal era slide

Source: https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/039-mars-greenhouse-console.html
("ARES-HORT Console — Greenhouse B", single-file HTML, 70 KB / 715 lines, zero webfonts, zero frameworks.)
Frame reference: `~/.agents/skills/rea-miaai-hub/references/design-language.md`.
All quotes below are verbatim from the study's CSS/JS. Secondary reads: 060 ascii-tide (light tractor-feed printout), 055 seismograph-drum (paper engraving) — one idiom each, noted where relevant.

## Staging

**Concept:** the only operator's amber CRT terminal ("HST-9") inside a Mars greenhouse, one instrument owning a dark hall — announced in a stage-direction comment before any style: `/* the terminal */`. Around it, `/* the wall: 412 sols, counted by hand */` — two SVG tally-mark sheets (`stroke:#5A3A00; stroke-opacity:.62`) fade in beside the monitor only on wide viewports (`.room.wide .wall{opacity:.8}`, gated by `(vw-mw)/2>280&&vh>520`).

**Archetype:** *one instrument in a dark hall*, built as four nested shells:

```
.room (dark hall, radial floor-light) → .monitor (plastic bezel) → .well (recessed black collar)
→ .tube (the screen: raster + fx overlays) → .raster (flicker group) → .txt (80-col character grid)
```

The hall is light, not color: `background:radial-gradient(ellipse 58% 62% at 50% 47%,#2a1700 0%,#140b00 34%,#0A0600 62%,#040200 100%)` — a warm pool under the machine. The bezel is a 4-stop plastic ramp (`linear-gradient(176deg,#2a1d10 0%,#1b1209 16%,#130c05 58%,#0b0703 100%)`) with mold-line inset shadows and one ambient spill `0 0 160px rgba(255,150,0,.11)`. Everything on screen — status bar, panels, plant ASCII art, prompt — is drawn as characters in one 80×39 cell buffer; the only DOM is one div per row plus absolutely-positioned transparent `<button>` "zones" snapped to cell coordinates.

## Palette

`:root` (verbatim):

```css
--bg:#0A0600; --amber:#FFB000; --hot:#FF6A00; --dim:#5A3A00;
```

| Hex | Role |
|---|---|
| `#040200` | page base (html/body) — warm near-black, one step darker than `--bg` |
| `#0A0600` | `--bg`: tube interior / screen floor; darkest stop of hall radial |
| `#FFB000` | `--amber`: P3 phosphor — *all* primary text (boot even names it: `PHOSPHOR P3 AMBER  WARM`) |
| `#FF6A00` | `--hot`: alarm text, blinking states, cursor block, storm values — used sparingly |
| `#5A3A00` | `--dim`: de-emphasized chrome — box-drawing lines, unit labels, empty bar tracks |
| `#2a1d10→#0b0703` | bezel plastic ramp |
| `#1c1000→#0A0600` | tube interior radial (`ellipse 75% 70% at 50% 46%`) — screen is *brighter center, dark edges* |

Exactly the frame's dark-register grammar: warm-tinted near-black base, one phosphor accent, one semantic alarm accent. **Seven character styles, not more** — the whole UI is these, applied per cell via a style bit-buffer:

```css
.c1{color:rgba(255,176,0,.62);text-shadow:0 0 5px rgba(255,150,0,.34)}      /* dimmed amber */
.c2{color:var(--dim);text-shadow:0 0 5px rgba(255,140,0,.16)}               /* chrome/labels */
.c3{color:var(--hot);text-shadow:0 0 2px rgba(255,106,0,.9),0 0 10px rgba(255,106,0,.7),0 0 22px rgba(255,80,0,.35)} /* alarm, hotter bloom */
.c4{background:var(--amber);color:var(--bg);text-shadow:none;box-shadow:0 0 9px rgba(255,176,0,.55)}  /* inverse chip */
.c5{background:rgba(255,176,0,.62);color:var(--bg);text-shadow:none;box-shadow:0 0 7px rgba(255,176,0,.3)} /* ghost-inverse */
.c6{background:var(--dim);color:var(--amber);text-shadow:none}              /* dead-key chip */
.c7{background:var(--hot);color:var(--bg);text-shadow:none;box-shadow:0 0 12px rgba(255,106,0,.75)}   /* alarm-inverse */
```

Key rule: **inverse video kills the text-shadow and moves the glow to a box-shadow** — phosphor burns the background cell, not the glyph.

## Typography

One stack, no webfonts: `font-family:Menlo,Consolas,"DejaVu Sans Mono","Liberation Mono","Courier New",monospace`. (Chin plate is the sole non-mono voice: `font:600 9.5px/1 "Gill Sans",...;letter-spacing:.34em;text-transform:uppercase` — the engraved-maker-plate convention, with emboss `text-shadow:0 1px 0 rgba(255,220,170,.13),0 -1px 0 rgba(0,0,0,.95)`.)

**Character-cell construction** (the frame's "cell-derived" scale, executed exactly):

- Grid vars: `--cw:9px;--rh:18px;--fs:15px;--cols:80` — cell 9px wide, row 18px tall, font 15px → line-height 1.2 (`LHT=1.2` in JS).
- The grid: `.txt{width:calc(var(--cw)*var(--cols));font-size:var(--fs);line-height:var(--rh);white-space:pre;font-variant-ligatures:none;font-kerning:none;-webkit-user-select:none;cursor:default}` and `.txt div{height:var(--rh)}` — one div per row, height locked to the row metric.
- Non-ASCII glyphs (box drawing, blocks) get fixed-width cells: `.txt i{display:inline-block;width:var(--cw);font-style:normal;text-align:center;white-space:pre}` — the renderer wraps any codepoint ≥127 in `<i>`.
- **Probe-measured fit:** a hidden `<span id="probe">` of 40 `M`s at `font-size:100px` measures the real advance: `ratio=pr.getBoundingClientRect().width/4000||.6`. Then `fit()` derives cell size from the viewport — `c=Math.floor(availW/cols)`, desktop additionally height-capped `cH=Math.floor((ah-rows*.5)/(rows*LHT)*ratio); c=max(6,min(c,cH,13))` — and back-solves the font: `fs=c/ratio; rh=round(fs*1.2)`. 80 cols desktop, 40 under 700px. Nothing is rem-based; the grid *is* the layout.
- Phosphor bloom is a 3-stop text-shadow on the base text: `text-shadow:0 0 1px rgba(255,176,0,.85),0 0 6px rgba(255,160,0,.55),0 0 17px rgba(255,106,0,.24)` — tight core, mid halo, wide wash (17px) at a quarter opacity.

**Glyph vocabulary** (all rendered as text in cells): blocks `█ ▓ ▒ ░` (logo letters are hand-drawn 5×6 `█` bitmaps; density = `░▒▓`); bar ramps `SP='▁▂▃▄▅▆▇█'` for sparklines with `▖` as the half-cell tip and `▁` as the empty track; box-drawing `┌ ─ ┐ │ └ ┘` for panels; partial blocks `▏▎▍▌▋▊▉`. Sparklines sit inline in the status bar (10 chars wide) — data as text, no canvas.

## CRT fx stack

Four `position:absolute;inset:0;pointer-events:none` layers inside the tube, stacked beam → roll → scan → glass above the raster, plus raster-wide flicker and per-character ghosting:

**1. Scanlines** — 3px-period repeating gradient, transparent 1.6px / black 1.4px at one-third opacity:

```css
.scan{background:repeating-linear-gradient(to bottom,
  rgba(0,0,0,0) 0,rgba(0,0,0,0) 1.6px,rgba(0,0,0,.34) 1.6px,rgba(0,0,0,.34) 3px)}
```

**2. Roll bar** — a soft bright band drifting down the tube every 8.5s, 24% of tube height, pure transform (compositor-only):

```css
.roll{inset:auto 0 auto 0;top:0;height:24%;
  background:linear-gradient(to bottom,transparent 0%,rgba(255,176,0,.035) 40%,
    rgba(255,190,60,.085) 50%,rgba(255,176,0,.02) 62%,transparent 100%);
  animation:roll 8.5s linear infinite;will-change:transform}
@keyframes roll{0%{transform:translateY(-110%)}100%{transform:translateY(520%)}}
```

**3. Glass** — corner glare + vignette in one overlay (light from upper-left, `120% 90% at 22% 4%`), plus a deep inset shadow pair that curves the screen edges:

```css
.glass{border-radius:inherit;
  background:radial-gradient(ellipse 120% 90% at 22% 4%,rgba(255,236,200,.075) 0%,rgba(255,236,200,.02) 26%,transparent 46%),
    radial-gradient(ellipse 78% 76% at 50% 50%,transparent 58%,rgba(0,0,0,.34) 86%,rgba(0,0,0,.74) 100%);
  box-shadow:inset 0 0 60px 14px rgba(0,0,0,.72),inset 0 0 6px 2px #000}
```

**4. Beam (turn-on flash)** — a horizontal phosphor line snaps across, then expands to fill and fades, 0.62s, run once on load:

```css
.beam{background:linear-gradient(to bottom,#FFB000,#FFE1A0 50%,#FFB000);
  box-shadow:0 0 40px 10px rgba(255,176,0,.8);opacity:0;transform:scale(0,.004)}
.beam.on{animation:warm .62s cubic-bezier(.22,.9,.24,1) both}
@keyframes warm{0%{transform:scale(0,.004);opacity:1}26%{transform:scale(1,.004);opacity:1}
  34%{transform:scale(1,.004);opacity:1}82%{transform:scale(1,1);opacity:.2}100%{transform:scale(1,1);opacity:0}}
```

**5. Flicker** — whole-raster opacity stepped (not tweened) between 1 and ~.955 on a 6.1s loop; storm mode shortens the same keyframes to 1.7s:

```css
.raster.live{animation:flick 6.1s steps(1,end) infinite}
@keyframes flick{0%{opacity:1}7%{opacity:.965}8%{opacity:1}31%{opacity:.985}33%{opacity:1}
  58%{opacity:.955}59%{opacity:.99}60%{opacity:1}83%{opacity:.975}85%{opacity:1}}
.tube.storm .raster.live{animation-duration:1.7s}
```

**6. Ghosting (phosphor persistence)** — when a row's text is overwritten, the old glyphs are re-absolute-positioned as blurred spans that fade out in 0.75s (capped at 36 live ghosts, self-removing on `animationend`):

```css
.gh span{position:absolute;white-space:pre;color:var(--amber);filter:blur(.7px);
  text-shadow:0 0 8px rgba(255,150,0,.8);animation:ghost .75s cubic-bezier(.2,.6,.3,1) forwards}
@keyframes ghost{0%{opacity:.62}40%{opacity:.26}100%{opacity:0}}
```

**7. Grain** — two inline-SVG `feTurbulence fractalNoise` data-URI tiles at `mix-blend-mode:overlay`: room 180×180 `baseFrequency='.9'` at `opacity:.5`; bezel 120×120 `baseFrequency='1.4'` at `opacity:.55` (colored warm via feColorMatrix). Plastic and air both read as material, not paint.

**8. Tube shape** — the screen is *not* a rounded rectangle: `.well{border-radius:34px/38px}` and `.tube{border-radius:30px/34px}` use **elliptical corner radii**, with `.well` sinking into the bezel via `box-shadow:inset 0 4px 10px #000,inset 0 0 0 1px #000,0 1px 0 rgba(255,214,150,.10),0 -1px 0 rgba(0,0,0,.7)`.

State-grade fx: power-save dims the tube via filter, not color changes — `.tube.save{filter:brightness(.78) saturate(.94)}` on `transition:filter 1.4s cubic-bezier(.3,.1,.2,1)`. During storms, JS glitch-shifts one random row by ±1 cell for 70–150ms.

## Chrome idioms

- **Boot sequence** (2.8s, any key skips): beam flash → ROM banner `HST-9 ROM 2.11` + `(C) 2079 ARES COLONIAL SUPPLY CO.` → `MEMORY TEST  0000K` counting in 16K steps to `0640K  OK` → `PHOSPHOR P3 AMBER  WARM` / `KEYBOARD  1 OPERATOR DETECTED` → block-█ logo (ARES-HORT) revealing **one row per 50ms**, with the in-progress row drawn as `▒` before it solidifies to `█` → centered system lines → `RESTORING BEDS ...` animated dots → live UI. The panel boxes then draw their perimeters clockwise character-by-character (`box()` walks `┌─┐│└┘` with a `█` head at the drawing front).
- **Prompt:** `> ` followed by the typed value; cursor is a full block `█` in `--hot`, duty cycle `now%1060<620` (620ms on / 440ms off); when empty, right-aligned dim hint `TYPE A COMMAND · HELP LISTS THEM`. Typing is captured by a real `<input>` overlaid at the prompt row, fully transparent (`opacity:0;caret-color:transparent`) — the grid *renders* the command line; the input *is* it.
- **Status bar (row 0):** inverse chip ` ARES-HORT v4.2 ` + `GREENHOUSE B` + dim labels `LMST`/`DUST IDX` with tabular live values + a 10-char `▁▂▃▄▅▆▇█` sparkline, all in one 80-col row. Alarm state replaces a body row with a centered full-width inverse-hot blinking bar (`now%720<430`), tappable to acknowledge.
- **Command echo:** every executed command is reprinted as `> LINE` in dim amber before its output; output types on at ~150 chars/s, log lines at 120 chars/s (one line revealed at a time — a queue, not a burst).
- **F-key ribbon (bottom row):** `F1` + inverse-chip label (` HELP `) for nine actions — keyboard affordance rendered as cells.
- **Chin hardware:** below the tube, a maker plate ("Horticultural Systems Terminal HST-9"), a repeating-gradient vent strip, and a PWR LED (`radial-gradient(circle at 38% 34%,#FFE2A0 0%,#FFB000 45%,#8a5a00 100%); box-shadow:0 0 0 2px #050301,0 0 9px 3px rgba(255,176,0,.6)`) that turns hot and pulses in power-save.
- **Clickage:** every interactive cell zone is a transparent `<button>` absolutely positioned to cell coordinates (`el.style.left=z.x*cw+'px'`…), hover `rgba(255,176,0,.06)` / active `.17`, focus-visible `outline:1px solid var(--hot)`. Hit areas are honest: character-accurate, with an expanded `::after{inset:-3px 0}` on touch.

## Motion grammar

| Motion | Timing | Easing |
|---|---|---|
| Beam turn-on | .62s once | `cubic-bezier(.22,.9,.24,1)` |
| Ghost persistence fade | .75s forwards | `cubic-bezier(.2,.6,.3,1)` |
| Flicker loop | 6.1s (storm 1.7s) | `steps(1,end)` — discrete, never tweened |
| Roll bar drift | 8.5s infinite | `linear` |
| Tube dim (power-save) | 1.4s | `cubic-bezier(.3,.1,.2,1)` |
| Zone hover/active tint | .18s | `cubic-bezier(.2,.7,.2,1)` |
| Wall fade-in | 2.4s, delay 1.2s | `ease` |
| Typing | 150 cps output / 120 cps log / 640 cps popup | per-frame char budget |
| Boot logo reveal | 1 row / 50ms (25ms narrow) | stepped by row |
| Cursor blink | 1060ms cycle, 620 on | hard toggle |
| Alarm blink | 720ms cycle, 430 on | hard toggle |
| Pop-window box draw | perimeter in .2s, then 640 cps text | linear char walk |

Eases match the frame's settle family (`.2,.7,.2,1` / `.3,.1,.2,1`); the two CRT-native tempos — `steps(1,end)` flicker and `linear` roll — are deliberately *not* eased. Blink is never `animation:blink` CSS: it's a time-sliced conditional in the draw loop so reduced-motion can pin it steady.

## Accessibility & perf

Reduced-motion contract (verbatim — this is the reference pattern for CRT fx):

```css
@media (prefers-reduced-motion:reduce){
  .roll{display:none}.raster.live{animation:none}.beam.on{animation:none}.gh span{animation:none;opacity:0}
  .led.save{animation:none}.tube,.wall{transition:none}}
```

Plus JS: a `reduced` flag (live-updated via `matchMedia` change) makes all typed text instant (`n=1e9`), boot completes immediately, cursor/alarm blinks pinned on, plant sway/harvest cascade/glitch disabled. The slide never *owes* motion to be legible.

Perf discipline:

- rAF fully cancelled on `visibilitychange` hidden; simulation decoupled at fixed 10 Hz accumulator (max 3 catch-up steps/frame).
- Rendering is row-diffed: `if(h!==prevHTML[y])` — only changed rows get `innerHTML`; styles are run-length `<span class="cN">` groups, not per-char.
- Ghosts capped (36) and self-remove; roll/flicker animate only `transform`/`opacity` (compositor); all fx overlays are static backgrounds on 4 divs.
- Screen-reader path: the character grid is `aria-hidden`; a `.sr` live region (`aria-live="polite"`) carries every spoken line; each zone button carries a plain-language `aria-label` ("Bed 3, LETTUCE, named OUTREDGEOUS. Activate to select."); the hidden input has `aria-label="Command line. Type HELP for commands."`.
- 060 ascii-tide contributes the same contract in the light register: `@media (prefers-reduced-motion:reduce){#sheet{animation:none}...}` plus its tractor-feed entrance is `animation:feed 1.05s steps(14,end) both` — stepped, not eased, same principle.

## Borrow / Leave for The Terminal era slide

The slide is ONE full-viewport green-phosphor CRT in a nine-slide deck — a staged artifact, not an app. Translation: **the slide IS the tube.** Drop the desk/room/bezel shells; keep the hall's darkness as the slide's own background (`#040200`-family, green-tinted) so the screen area reads as *lit from within*.

**Borrow — the top three:**

1. **The four-layer fx stack, full-viewport, in this z-order:** raster (your text) → beam → roll → scan → glass. Quote the CSS above nearly verbatim, recolored for P1 green: scanlines stay black (`.34` over 3px period — scale period to `max(3px, rh/6)` if the cell grid is large), roll band stops become `rgba(51,255,102,.035)/.085/.02`, glass glare `rgba(230,255,235,.075)`, vignette unchanged (black is phosphor-agnostic). Border-radius: keep elliptical corners on the screen area (`24px/28px`-ish) so it reads CRT without eating slide content.
2. **Green phosphor bloom + the 7-style discipline.** Base text shadow triple `0 0 1px rgba(phos,.85), 0 0 6px rgba(phos,.55), 0 0 17px rgba(phos,.24)`; inverse chips = green bg / black text / `text-shadow:none` / small box-shadow glow. Palette: `--phos:#33FF66` (or classic `#00FF41`), `--dim:#0F3D1F`, alarm `--hot:#FFB000` (039's phosphor demoted to alarm — a nice deck-level rhyme), base `#020A04`. Style the era's artifact text — banner, prompt, stats — with exactly: phosphor / dimmed phosphor / dim / inverse / hot. Five styles is plenty for a slide.
3. **The boot choreography as the slide-entrance.** On slide-enter (once): beam turn-on (.62s), then 3–4 typed lines at ~150 cps — ROM banner, a `(C) 19xx` lore line, memory-count gag, `PHOSPHOR P1 GREEN  WARM` — a block-█ wordmark revealing one row per 50ms with the `▒`→`█` solidify trick, ending on a resting prompt `> ` with the 620ms-on `█` cursor and a right-aligned dim hint. That final prompt is the slide's living idle; no further interaction needed.

**Borrow — secondary:** the probe-measured cell grid (`fs=cw/ratio, lh=1.2·fs`, `white-space:pre`, `font-variant-ligatures:none;font-kerning:none`, non-ASCII in fixed-width `<i>` cells); `▁▂▃▄▅▆▇█` sparklines and `░▒▓` density in the status row; the status-bar idiom (inverse name chip + dim labels + tabular values, one row); inverse chips for emphasis (title, key stat); 039's reduced-motion block verbatim with the JS pin-steady blink; row-diffed rendering if any live text beyond the cursor; 060's `steps(14,end)` tractor-feed entrance if the deck wants a paper-feed gag on a sibling slide.

**Leave:** the simulation and state machine (beds, power, storms, alarms) — the slide has no app beneath it; the hidden command input and clickable zones (real interactivity is out of scope for one slide; render a static `> ` prompt + blinking cursor instead); ghost persistence (DOM churn for a one-shot entrance — at most reuse it for the boot logo's `▒` trail); storm glitch/flicker-acceleration; the chin hardware plate, vents, and PWR LED (belongs to the object-as-furniture archetype; a full-viewport slide has no chassis — or keep only a 1-line status strip along the slide's bottom edge if the deck needs a consistent footer register); the tally walls and `.room.wide` reveal; the 40-column narrow layout with tabs; sound. Continuous roll + flicker are optional for a deck — if in doubt keep flicker (it is what makes phosphor read as *on*) at a gentler 6.1s loop and keep the roll; both die under `prefers-reduced-motion` anyway.
