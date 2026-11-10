# Content fact-sheet — sole source of truth for the build

Reconciled 2026-11-10 from five sources: `index.html` (live page), `README.md`, `resumes/SinglePage_resume.md`, `resumes/Detail_resume.md`, `questions.md`.
Arbitration rule (from ticket t1): **`resumes/Detail_resume.md` is primary** unless a contradiction is explicitly noted below; `README.md` outranks the live page for dates and metrics (the live page compresses its timeline dates).
Standing policy: **the phone number (+84 38 770 8009) stays off the public page** — listed here only so it is consciously excluded, never rendered.

## Identity

| Field | Value | Sources |
|---|---|---|
| Name | Quang Vu Nguyen | all |
| Title | **Senior Software Engineer** | Detail, SinglePage (live page and README say "Software Engineer" — see contradictions log C1) |
| Location | Ho Chi Minh City, Vietnam | all resumes, README (live page says just "Vietnam") |
| Email | vuquangkhtn@gmail.com | all |
| GitHub | https://github.com/vuquangkhtn/ | all |
| LinkedIn | https://www.linkedin.com/in/ngvuquang | all |
| Portfolio | vuquangkhtn.github.io | README, resumes |
| Favicon | `icon.svg` | repo |

## Education

| Field | Value | Sources |
|---|---|---|
| Degree | Bachelor of Science (Computer Science focus: algorithms, data structures) | Detail, README |
| Institution | HCM University of Science (HCMUS — Vietnam National University) | all |
| Dates | July 2014 – October 2018 (graduated 2018) | Detail, README |
| GPA | 8.3/10 | all |
| Scholarships | Study Promotion Scholarships, received yearly for academic excellence | Detail, SinglePage |
| Link | https://hcmus.edu.vn/ | live page |

## Career stops (in order)

### 1 · VNG Education (subsidiary of VNG Corporation) — Software Engineer — October 2017 – July 2018 — HCMC

Projects:
- **Company Media** — social networking application built with React Native. (live page, README, Detail)
- **TalkTV** — live streaming application with advanced donating and chatting features. (live page, README, Detail)

Learned: React component lifecycle, mobile development fundamentals. (live page, README)
Employer lore published on the live card: VNG is "Vietnam's First Unicorn". (see Company garnish)
Link: https://vng.com.vn/

### 2 · KMS Technology — Front-End Software Engineer — October 2018 – August 2019 — HCMC

Projects:
- **Ticket E-commerce** — event ticket exchange platform with React and Redux; stateless + stateful UI components; cross-platform architecture (mobile app and web app in the same repository). (live page, README, Detail)
- **ERTPM Tool** (Enterprise Resource & Project Management) — agile process management website with micro-frontend architecture; React and Angular components; common styles/components shared between packages and teams; used across multiple departments. (live page, README, Detail)

Learned: Redux middlewares, shared state management between platforms. (live page, README)
Link: https://kms-technology.com/

### 3 · Codelink — Front-End Software Engineer — August 2019 – August 2022 — HCMC

Projects:
- **Media Management** — enterprise platform with ReactJS, ElasticSearch, and Nuxeo. Memoization, list virtualization, lazy loading. Weekly feature demos to clients. Direct communication with international clients in English; collaboration with foreign tech leads. (live page, README, Detail)
- **Medical Service Web App** — healthcare platform with **90%+ test coverage**. React Testing Library integration tests; **ES6 → TypeScript migration**; TDD via pair programming; CircleCI configuration work; user-flow documentation. (live page, README, Detail)
- **Stock Exchange** — cryptocurrency trading platform built from scratch (architecture and file structure established independently); **ReactJS → NextJS migration**; Socket.io real-time trading and live data; Presentational/Container pattern and modern React Hooks. (live page, README, Detail)

Link: https://www.codelink.io/

### 4 · NAB Innovation Centre (National Australia Bank) — Senior Software Engineer — August 2022 – present — HCMC

The platform context (voice seed, also matches published work): Core Platform is the shared SDK and runtime monorepo behind NAB Platform, supporting a micro-frontend architecture — miniapps (features: payments, accounts, cards) embedded into multiple shells; the platform loads miniapps safely and provides authentication, inter-feature communication, and NAB systems integration; benefits are reuse, less duplicated work, consistency across web and mobile. (questions.md, live page, Detail)

Achievements (each sourced; ★ = appears only in README, not in resumes):
- Optimized Innersource libraries and bundling strategies (Webpack), achieving a **90% bundle-size reduction across 150+ miniapps**. (README, Detail; SinglePage says 80% — overruled, see C3)
- Improved load times by **3×** as part of the same optimization. ★ (README only)
- Built an automated **miniapp generator** with standardized templates, cutting development setup time from **7 days to 30 minutes**. (README, Detail, SinglePage)
- Built and maintained **common/shared libraries for 150+ miniapps**; enhanced the micro-frontend ecosystem for reuse and consistent feature implementation. (README, Detail, live page)
- **Led React 18/19 migration** across the platform with **95% test coverage**, zero-downtime deployment; transitioned Enzyme → React Testing Library; enhanced Jest configuration across multiple projects. (README, Detail)
- Configured automated deployment tasks, reducing deployment time by **60%**. ★ (README only)
- Integrated monitoring: AppDynamics, Splunk — tracking daily transactions across miniapps. ★ (README only)
- Integrated feature flagging (LaunchDarkly) for A/B testing and rollouts. ★ (README only)
- Security posture: SAST + SCA implementations using Snyk and SonarQube; proactively identified and remediated vulnerabilities. (README, Detail)
- Mentored cross-functional teams on architecture best practices; architectural solutions and technical consultation with cross-functional teams; monorepo collaboration. (Detail, SinglePage, live page)

Link: https://www.nab.com.au/about-us/global-innovation-centre-careers

### Featured project · AI Code Review Assistant (VS Code Extension) — 2024

- VS Code extension generating structured prompts for AI-powered code review: smart prompt generation, structured results display, multiple review types. (README, live page, Detail)
- **Provider-agnostic architecture** supporting any AI service without API-key requirements. (README)
- Prompt engineering learned by experimenting with templates and model fine-tuning. (Detail)
- Technologies: TypeScript, VS Code API, AI prompt engineering. (Detail, SinglePage)
- Live demo: https://vuquangkhtn.github.io/ai-code-review-assistant/ (link target itself is out of scope — separate sub-site)

## Skills inventory (union of all sources, grouped)

- **Languages:** JavaScript (ES6+), TypeScript, HTML5, CSS3
- **Frontend frameworks:** React.js, Next.js, React Native, Angular
- **State & patterns:** Redux (incl. middlewares), Presentational/Container pattern, modern React Hooks
- **Build:** Webpack, Babel
- **Testing:** Jest, React Testing Library, TDD, integration testing, Enzyme (legacy — migrated away), CircleCI config
- **Backend:** Node.js, Express.js, PostgreSQL, Prisma, GraphQL
- **Realtime & search:** Socket.io, ElasticSearch, Nuxeo
- **DevOps:** Git, Docker, Jenkins, Harness
- **Monitoring / flags / security:** AppDynamics, Splunk, LaunchDarkly, Snyk, SonarQube
- **Collaboration:** Jira, Confluence, Agile methodologies
- **Architecture:** micro-frontend, monorepo, Innersource, component design systems, performance optimization (memoization, virtualization, lazy loading)

## Company garnish — marketing claims published on the live page, NOT in any resume

Presentational flavor from the timeline cards. Recorded so nothing is lost; whether to reuse is a copy-drafting decision. All are third-party/employer claims, not the engineer's achievements.

- HCMUS: Top University badge · Top 3 Vietnam ranking · 50K+ students
- VNG: Vietnam's First Unicorn · $1B+ valuation · 100M+ Zalo users
- KMS: Sao Khue Award Winner · Fortune 1000 clients · 15+ years experience
- Codelink: Agile Development Studio · 70+ global clients · 95% client retention
- NAB: Big Four Bank · $900B+ assets · 9M+ customers

## Voice seeds from questions.md — interview material, NOT currently public facts

These are the engineer's own analogies and stories from interview prep. They are gold for narrative voice; they are not published career facts, so each is a candidate for inclusion, decided at copy drafting.

1. **Old car / new car** (Webpack → Vite migration): explaining a toolchain migration to non-technical audiences — "maintaining Webpack was like maintaining an old car with spare parts no longer available; Vite is like driving a newer car with better performance and supported replacement parts." Includes real migration steps, automation prompts/commands, timelines. If included, it is a story about communication, not a listed project.
2. **Release Hub automation**: created release dashboards; used Cursor commands to automate generating announcements and release emails; gathered requirements with the team; ongoing support. Candidate content.
3. **Shopping centre / Core Platform** (the strongest seed): miniapps are shops (payments, accounts, cards), shells are shopping centres hosting them, Core Platform is the shared foundation that loads and runs them safely — authentication, inter-feature communication, NAB systems integration; teams build once and reuse across hosts; consistency across web and mobile. Matches the published NAB work, so it is both fact-compatible and the voice seed for The Platform act.

## Current-site content pending a decision

- **Role cycler**: hero line alternates "Software Engineer" ↔ "Web Developer" every 2s (assets/js/role-toggle.js). Survival/death/transformation is a prototype-ticket decision; recorded here as content fact.
- **Hero tagline & section prose** ("This timeline showcases…" etc.): copy, deliberately not carried over — all prose is rewritten in the narrative voices.

## Contradictions log

| # | Fact | Sources in conflict | Resolution |
|---|---|---|---|
| C1 | NAB title | "Software Engineer" (live page, README) vs "Senior Software Engineer" (Detail, SinglePage) | **Senior Software Engineer** — Detail primary |
| C2 | Codelink start | Oct 2019 (README) vs Aug 2019 (Detail, SinglePage) | **August 2019** — Detail primary |
| C3 | Innersource bundle reduction | 90% (README, Detail) vs 80% (SinglePage) | **90%** — Detail primary |
| C4 | VNG start | Jul 2017 (README) vs Oct 2017 (Detail, combined VNG&KMS heading) | **October 2017** — Detail primary; VNG end Jul 2018 from README (uncontested) |
| C5 | Timeline dates on live page | live page shows VNG as "2018", KMS as "2019", Codelink as "2022" | Live page compresses/approximates — resume dates win throughout |
| C6 | Location | "Vietnam" (live page) vs "Ho Chi Minh City, Vietnam" (resumes) | **Ho Chi Minh City, Vietnam** |
| C7 | 95% vs 90%+ test coverage at NAB | Detail lists both | Not a conflict: **95%** belongs to the React 18/19 migration; **90%+** coverage claims belong to Codelink's Medical Service Web App |

## Deliberately excluded

- Phone number +84 38 770 8009 — policy: never rendered on the public page.
