# Terminal era: distill CRT terminal study (039)

Label: `wayfinder:research` (AFK) · Status: resolved · Assignee: research-subagent-039 · Blocked by: none

## Question

What is the distilled visual language of Claude Fable study **039 mars-greenhouse-console** (amber/green CRT terminal, character-cell UI), and which elements should **The Terminal era slide** borrow for a green-phosphor CRT aesthetic (scanlines, phosphor glow, character cells, command-line artifact text)? Secondary references if useful: 060 ascii-tide (tractor-feed), 055 seismograph-drum. Findings to `../findings/r5-terminal-crt.md`; resolve here without editing `../MAP.md`.

## Resolution

039 stages one amber CRT as four nested shells (hall → bezel → well → tube) with everything on screen drawn as characters in a probe-measured 80×39 cell grid (fs=cw/ratio, lh=1.2fs); its language is a warm near-black base, one phosphor accent `#FFB000` + one alarm `#FF6A00`, a 3-stop text-shadow bloom, and four pointer-events:none fx overlays (scan / roll / glass / beam) plus stepped `steps(1,end)` flicker. Top borrows for the green-phosphor slide: (1) the fx stack full-viewport in the same z-order, recolored for green; (2) phosphor bloom + inverse-video chips with a 5-style green/dim/hot discipline; (3) the boot choreography (beam flash → typed ROM banner → `▒`→`█` block wordmark → resting `> ` prompt with 620ms-on block cursor) as the slide's one-time entrance. Leave the simulation, clickable zones, ghost persistence, and chassis hardware; 039's reduced-motion block kills roll/flicker/beam/ghost and pins blinks steady — quote it verbatim.

Findings: `../findings/r5-terminal-crt.md`
