# PROJECT.md — vuquangkhtn.github.io

Quang Vu Nguyen's personal portfolio site: a single-page timeline résumé, plain HTML/JS/CSS,
built with esbuild and deployed to GitHub Pages from `main` (`.github/workflows/deploy.yml`).

## What it is

- `index.html` — the entire page: timeline sections, animations, responsive layout
- `build.js` — bundles/minifies `assets/js` + `assets/css` into `dist/`
- `server.js` — tiny static server for local serving (`npm run serve`)
- `resumes/` — markdown résumé sources (`Detail_resume.md`, `SinglePage_resume.md`)
- `assets/` → source css/js · `dist/` → built output (gitignored)

## Commands

| Do | Run |
|---|---|
| Build | `npm run build` |
| Watch | `npm run dev` |
| Serve locally | `npm run serve` |
| Verify a branch | `npm ci --silent && node build.js` |

## Deploy model

`main` is production: every merge to `main` publishes to https://vuquangkhtn.github.io
immediately. There is no staging branch. UI changes must be verified before merge
(`/super-qa`, live URL allowed: the board config carries the site URL).

## Constraints the robot must respect

- Personal data on the page is intentionally public; NEVER add secrets, keys, or
  private info (emails/phones beyond what the page already shows).
- NEVER break the single-page layout: one `index.html`, edits are surgical.
- No test suite exists — verification is the build passing plus `/super-qa` on the
  rendered page.
