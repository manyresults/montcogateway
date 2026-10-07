# Montco Gateway Growth Plan

A single-page app for the October 20, 2026 meeting with Jude Martin-Cianfano (Montco Gateway Chamber of Commerce). Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) v4 and deployed to Vercel as a static site. No database, no server.

Three tabs: **What we found**, **What we would do**, **Your plan** (a fill-in worksheet that drives a live plan).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build
```

Requires Node 22.12+.

---

## Where to edit

| To change | Open |
|---|---|
| Benchmark targets in the math (86%, 82%, …) | `src/data/content.ts` → `BENCH` |
| The five moves on "What we would do" | `src/data/content.ts` → `MOVES` |
| Council lanes and default firms | `src/data/content.ts` → `LANES`, `FIRMS` |
| Demo values for "Try sample numbers" | `src/data/content.ts` → `SAMPLE` |
| Findings, benchmarks table, services copy | `src/data/content.ts` → `STATS`, `STRENGTHS`, `FINDINGS_ROWS`, `BENCHMARKS`, `SERVICES` |
| Tasks-vs-results table, success markers, diagnostic card | `src/data/content.ts` → `TASKS_VS_RESULTS`, `SUCCESS`, `DIAGNOSTIC` |
| The printable `/evaluate` checklist (questions, process, scorecard weights) | `src/data/content.ts` → `EVAL_QUESTIONS`, `EVAL_PROCESS`, `EVAL_SCORE`; page in `src/pages/evaluate.astro` |
| Agency-churn data and the marketing collective (roles, commitments) | `src/data/content.ts` → `CHURN_ROWS`, `CHURN_STATS`, `COLLECTIVE_ROLES`, `COMMITMENTS` |
| Worksheet fields | `src/components/PlanPanel.astro` (and `FIELDS`/`LABELS` in `content.ts`) |
| Plan math and the live plan's wording | `src/scripts/plan.ts` |
| Brand colors, fonts, dark mode | `src/styles/global.css` (`:root` variables and `@theme`) |
| Shared Tailwind class strings | `src/lib/ui.ts` |
| Logos / favicon | `public/assets/`, `public/favicon.png` |

Brand orange is `#F24F02` (`--accent`). Text and buttons use a slightly darker orange (`--brand`) so they stay readable on white. The header swaps between the black-text and white-text logo automatically in dark mode.

```
public/            logos, favicon, robots.txt
src/
  data/content.ts  all editable copy and numbers
  lib/ui.ts        shared Tailwind classes
  scripts/plan.ts  worksheet → live plan, tabs, copy summary
  components/      Header, Tabs, Card, Field, and the three panels
  layouts/         BaseLayout (head, fonts, noindex)
  pages/index.astro
  styles/global.css
vercel.json        clean URLs + noindex headers
```

---

## Before you share the link: public-facing checklist

The page is reachable by anyone with the link. Read it once as if you were Jude, a board member, or a council firm.

- [ ] **No financials.** Nothing from the 990 or payroll appears. Keep it that way.
- [ ] **Rebrand language.** Findings say "where the rollout can go further," never "broken." Leza Raffel's firm led the rebrand.
- [ ] **Council firms.** All seven are named in the "Your plan" lane dropdowns with suggested lanes. Confirm each firm's specialty first, or change the defaults to "Open: recruit a member" (`LANES` in `content.ts`).
- [ ] **Marketing collective.** The "member marketing collective" card names MANY as operator and promises founding partners. Confirm the founding partners and the commitments (one-year term, chamber owns everything) are what you intend before sharing. The churn figures are vendor data and labeled directional.
- [ ] **/evaluate checklist.** It is intentionally unbranded so the chamber can hand it to any candidate. Share the link only if you mean to; it's noindex like the rest. The scorecard weights are suggestions.
- [x] **Experience card.** Naming Investor Schooling, Legacy Builder Coaching and MANY Hands United for Impact is cleared. Specifics are limited, so the card carries names and general descriptions only. If you later share a result, add it under `PROOF` in `content.ts` (the `result` line renders only when filled in).
- [ ] **Sample numbers.** "Try sample numbers" loads clearly labeled demo values. Remove the button in `PlanPanel.astro` if you'd rather not.
- [ ] **Data privacy.** Anything typed into the worksheet stays in that person's browser only (localStorage). Nothing is sent anywhere, and you won't see what Jude types on her device.
- [ ] **No prices.** MANY services appear by name and description only.
- [ ] **Hide from search.** `noindex` is set in three places (meta tag, `X-Robots-Tag` header, `robots.txt`). The link is still public, so share it only with people you mean to.

---

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New → Project**, import this repo. If it isn't listed, use **Adjust GitHub App Permissions**.
3. Framework Preset: **Astro** (auto-detected). Leave build settings at their defaults (`npm run build`, output `dist`).
4. Set the **Production Branch** (Settings → Git) to the branch you merge to.
5. **Deploy.** Every push to the production branch redeploys; every other branch gets its own preview URL, which is the safe way to try edits without touching the link Jude has.

### Custom domain

A MANY-branded link reads better than `*.vercel.app`. Vercel → project → **Settings → Domains** → add `montco.manyresults.com`, then add the CNAME Vercel shows (usually `montco` → `cname.vercel-dns.com`) at your DNS provider. HTTPS is automatic.

### Optional: restrict access

- **Simplest:** keep the URL unlisted and share it only with Jude.
- **Vercel Password Protection** is a paid add-on (Settings → Deployment Protection).
- Avoid **Vercel Authentication**: it makes viewers log into Vercel.

---

## Day-of checklist

- [ ] Click **Clear** on the plan tab on the device you'll present from, so you start with blanks
- [ ] Open the link on your phone as a backup
- [ ] Bookmark `/#findings`, `/#approach` and `/#planTab` to jump straight to a tab
- [ ] After the meeting, use **Copy plan summary** and paste it into your follow-up email
