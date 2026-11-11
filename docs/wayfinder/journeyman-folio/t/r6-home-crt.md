# Home Machine era: distill vector-CRT study (016)

Label: `wayfinder:research` (AFK) · Status: resolved · Assignee: research-subagent-016 · Blocked by: none

## Question

What is the distilled visual language of Claude Fable study **016 vector-lunar-descent** (CRT vector graphics, mint beam, bloom, vertices), and which elements should **The Home Machine era slide** borrow for a 1980s home-computer aesthetic (vector/CRT glow, chunky pixels, CGA-style palette, manual-speak artifact text)? Secondary toy-era reference: 041 jelly-alphabet. Findings to `../findings/r6-home-crt.md`; resolve here without editing `../MAP.md`.

## Resolution

016 is a strict mono-phosphor language: one mint ink `#B8FFD9` + one green glow `#5CFFB0` on `#020403`, with hierarchy from a 5-step beam-brightness ramp (LV `[.2, .42, .7, 1, 1]`) instead of extra hues — no CGA accents at all; "alarm" is brighter mint + blink. All screen type is a beam-drawn 4×6 stroke font; CRT feel comes from pincushion/jitter on every line, 20 Hz quantized exponential phosphor decay, a green-halo-under-mint-core double stroke with a bright vertex pass, a quarter-res blurred bloom canvas, glass vignette + grain, and `--lit` room-glow feedback. Copy is deadpan manual-speak with zero-padded readouts and a vector UI kit (frameBox/brackets/hatch).

For the Home Machine slide: make the full viewport the tube (vignette + grain + radial room), port the two-pass phosphor type to text-shadow/canvas, and give the headline the stroke-font trace-on + 8 s retrace sweep as the slide's only idle motion — leave the game loop, the 5-bucket pipeline, and all CGA candy (that's 041's toy-era palette, not this era's).

Findings with verbatim CSS/JS: `../findings/r6-home-crt.md`.
