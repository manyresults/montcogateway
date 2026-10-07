# Montco Gateway Growth Plan — Deploy Guide

A single-page, static web app for the October 20, 2026 meeting with Jude Martin-Cianfano (Montco Gateway Chamber of Commerce). No build step, no framework, no database.

## What's in this folder

| File | Purpose |
|---|---|
| `index.html` | The whole app: three tabs (What we found, What we would do, Your plan). All styles and scripts are inside this file. |
| `vercel.json` | Clean URLs plus headers that tell search engines not to index the site. |
| `robots.txt` | Second layer of "don't index this." |
| `README.md` | This guide. |

The only outside dependency is Google Fonts. If fonts fail to load, the page falls back to system fonts and still works.

---

## Before you publish: public-facing checklist

This page will be reachable by anyone with the link. Read it once as if you were Jude, a board member, or a council firm.

- [ ] **No financials.** Nothing from the 990 or payroll appears. Keep it that way.
- [ ] **Rebrand language.** Findings say "where the rollout can go further," never "broken." Leza Raffel's firm led the rebrand.
- [ ] **Council firms.** All seven are named in the "Your plan" lane dropdowns with suggested lanes. Confirm each firm's specialty first, or change the defaults to "Open: recruit a member" (edit the `LANES` list in `index.html`).
- [ ] **Sample numbers.** "Try sample numbers" loads clearly labeled demo values. Fine for the meeting; remove the button if you'd rather not.
- [ ] **Data privacy.** Anything typed into the worksheet stays in that person's browser only (localStorage). Nothing is sent anywhere, and you won't see what Jude types on her device.
- [ ] **No prices.** MANY services appear by name and description only.
- [ ] **Hide from search.** Already handled by `noindex` in three places. The link is still public, so share it only with people you mean to.

---

## Option A: GitHub website + Vercel (no command line)

### 1. Create the repository
1. Sign in at [github.com](https://github.com).
2. Click **New repository** (the **+** menu, top right).
3. Name: `montco-gateway-plan` (or match your convention).
4. Visibility: **Private.** Vercel can deploy private repos, and the code doesn't need to be public for the site to be.
5. Leave "Add a README" unchecked. Click **Create repository**.

### 2. Upload the files
1. On the new repo page, click **uploading an existing file**.
2. Drag in `index.html`, `vercel.json`, `robots.txt` and `README.md`.
3. Commit message: `Initial version for Oct 20 meeting`. Click **Commit changes**.

### 3. Deploy on Vercel
1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New → Project**.
3. Find `montco-gateway-plan` and click **Import**. If it isn't listed, click **Adjust GitHub App Permissions** and grant access to the repo.
4. Settings:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** leave empty (override to empty if it's prefilled)
   - **Output Directory:** leave empty, or `.`
5. Click **Deploy**. In about 30 seconds you'll get a URL like `montco-gateway-plan.vercel.app`.

### 4. Check it
Open the URL on your laptop and your phone. Click through all three tabs, load sample numbers, change a lane, copy the summary.

---

## Option B: Command line (git + Vercel CLI)

```bash
cd montco-gateway-site
git init
git add .
git commit -m "Initial version for Oct 20 meeting"
gh repo create montco-gateway-plan --private --source=. --push   # or create on github.com and: git remote add origin … && git push -u origin main

npm i -g vercel
vercel            # first run links the project; accept defaults, no build command
vercel --prod     # production deploy
```

After linking the repo in the Vercel dashboard, every `git push` to `main` redeploys automatically.

---

## Custom domain (recommended)

A MANY-branded link reads far better than `*.vercel.app` in front of a client.

**Option 1: a dedicated subdomain**, e.g. `montco.manyresults.com`
1. Vercel → project → **Settings → Domains** → add `montco.manyresults.com`.
2. At your DNS provider for `manyresults.com`, add the record Vercel shows (usually a **CNAME** from `montco` to `cname.vercel-dns.com`).
3. Wait for the green check in Vercel. HTTPS is automatic.

**Option 2: your existing proposal site**, e.g. `proposal.manyresults.com/montco-gateway`
If `proposal.manyresults.com` already runs on Vercel from a repo, don't create a new project. Instead:
1. In that repo, create a folder `montco-gateway/`.
2. Put this `index.html` inside it (skip `vercel.json` and `robots.txt`; that project's own settings apply).
3. Commit and push. The page appears at `/montco-gateway`.
4. The file already includes `<meta name="robots" content="noindex, nofollow">`, so the page stays out of search even if the rest of the proposal site is indexed.

---

## Making changes later

- **GitHub website:** open `index.html` in the repo → pencil icon → edit → **Commit changes**. Vercel redeploys in under a minute.
- **Command line:** edit, then `git commit -am "…" && git push`.
- **Preview before it goes live:** edit on a new branch. Vercel creates a separate preview URL for every branch, so you can check changes without touching the link Jude has.

Common edits, all inside `index.html`:

| To change | Search for |
|---|---|
| Benchmark targets in the math (86%, 82%, etc.) | `const BENCH` |
| The five moves on "What we would do" | `const MOVES` |
| Council lanes and default firms | `const LANES` and `const FIRMS` |
| Demo values | `const SAMPLE` |
| Findings text | `<!-- ===== 1. FINDINGS ===== -->` |
| Services overview | `How MANY works` |

---

## Optional: restrict access

The link is public. If you want a gate:
- **Simplest:** keep the `*.vercel.app` or subdomain URL unlisted and share it only with Jude.
- **Vercel Password Protection** is a paid add-on. Turn it on under **Settings → Deployment Protection** if your plan includes it.
- Avoid **Vercel Authentication** for this. It requires viewers to log into Vercel, which Jude won't have.

---

## Day-of checklist

- [ ] Click **Clear** on the plan tab on the device you'll present from, so you start with blanks
- [ ] Open the link on your phone as a backup
- [ ] Bookmark `/#findings`, `/#approach` and `/#planTab` to jump straight to a tab
- [ ] After the meeting, use **Copy plan summary** and paste it into your follow-up email
