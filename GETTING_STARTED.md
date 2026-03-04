# Getting Started

> **FOR THE AI AGENT:** This file is your starting point. Read it fully, then follow the steps below in order. Delete this file as your very last action (after the final commit).

---

## For the human — before opening Claude Code

**Step 1 — Create your repo (2 min)**
- Go to https://github.com/cybrixcc/blog-client-template
- Click **"Use this template"** → **"Create a new repository"**
- Name it (e.g. `vami-blog`), set visibility as needed
- Clone it locally: `git clone https://github.com/YOUR_ORG/YOUR_REPO.git`

**Step 2 — Add GitHub Secrets (10 min)**

Go to repo **Settings → Secrets and variables → Actions** and add:

| Secret | Where to get it |
|--------|----------------|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `OPENAI_API_KEY` | platform.openai.com/api-keys |
| `GEMINI_API_KEY` | aistudio.google.com/app/apikey |
| `GSC_CREDENTIALS_JSON` | Google Cloud Console → Service Account → JSON key |
| `GH_TOKEN` | GitHub Settings → Developer settings → Personal access tokens (needs `repo` scope) |
| `TELEGRAM_BOT_TOKEN` | @BotFather on Telegram (optional) |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID (optional) |

**Step 3 — Open Claude Code in the repo folder and paste this prompt:**

```
Read GETTING_STARTED.md and follow all steps in order.
Ask me for any information you need before proceeding with each step.
```

---

## For the AI agent — full task list

You are setting up a new client blog. This repo was created from `cybrixcc/blog-client-template`.

**Read `CLAUDE.md` first** — it is the permanent architecture reference for this repo. It stays in the repo forever and is the source of truth for any future agent working on this project. This file (`GETTING_STARTED.md`) is a one-time setup guide and will be deleted at the end.

Work through the steps below in order. **Ask the human before proceeding with each step that requires client-specific information** — do not guess or use placeholders.

---

### Step 1 — Gather client information

Ask the human:

1. What is the client's main website URL?
2. What is the blog URL (subdomain or subfolder)? e.g. `blog.vami.app` or `vami.app/blog`
3. What is the niche / topic of the blog? What problem does the product solve?
4. What is the CTA URL where blog readers should be sent? e.g. `https://vami.app/#get-started`
5. What is the git bot name and email to use for automated commits? e.g. `Vami Bot`, `bot@vami.app`

Do not proceed until you have real answers to all five questions.

---

### Step 2 — Research the client website

Using the URL from Step 1:
- Analyze the client's brand: colors, typography style, tone of voice
- Identify the main product, key features, target audience, competitors
- Note the visual style (dark/light, minimal/rich, corporate/casual)

This research will inform theme selection and component design in later steps.

---

### Step 3 — Fill in config.yml

Replace all placeholder values using the information from Steps 1 and 2:
- `site_name`, `site_url`, `cta_url`, `niche`
- `git_user_name`, `git_user_email`
- `citation_research` section: `brand_patterns`, `product_description`, `competitors`, `query_categories`

Full schema reference: https://github.com/cybrixcc/leadhunter-engine/blob/master/config.schema.yml

---

### Step 4 — Choose and apply the theme

Pick the theme class that best matches the client brand and apply it to `<html>` in `src/app/layout.tsx`:

| Class | Best for |
|-------|----------|
| `theme-dark` | Universal dark — default |
| `theme-dark-purple` | AI / tech / premium SaaS |
| `theme-light` | Professional / B2B |
| `theme-light-warm` | Editorial / content-heavy |

Then open `src/app/globals.css` and override `--primary` and `--accent` under the chosen theme class to match the client's brand colors exactly.

---

### Step 5 — Fill in layout.tsx metadata

In `src/app/layout.tsx`, replace all TODO markers:
- `title.default` and `template` — site name
- `description` — one sentence about the blog
- `keywords` — 5-10 primary keywords for the niche
- `authors` — brand name
- `openGraph` and `twitter` fields

---

### Step 6 — Implement Header and Footer

Build `src/components/Header.tsx` and `src/components/Footer.tsx` from scratch to match the client's website design.

- Header: logo (text or SVG), navigation links, CTA button
- Footer: links, copyright, social handles if applicable
- Use only Lucide React for icons — no emoji substitutes
- Use `cn()` from `@/lib/utils` for conditional classes
- Use shadcn/ui primitives (`Button`, `Badge`) where appropriate

**Do not rename the exports** — the engine imports `Header` and `Footer` by these exact names.

---

### Step 7 — Fill in brand markers in BlogOGImage.tsx

Open `src/components/seo/BlogOGImage.tsx` and replace the TODO brand variables at the top of the file:
- `brandPrimary` — primary brand color (hex)
- `brandBackground` — background color (hex)
- `brandSecondary` — secondary/accent color (hex)
- `brandInitials` — 2-letter initials for the logo mark
- `brandName` — full brand name
- `brandUrl` — domain without https://

---

### Step 8 — Build the pages

Implement the two stub pages to match the client brand:

- `src/app/page.tsx` — homepage: hero section, CTA, featured articles section, brief about section
- `src/app/blog/page.tsx` — blog index: heading, description, article grid using `BlogContent` component

Verify the build passes:
```bash
npm run build
```

Fix any errors before proceeding.

---

### Step 9 — Update public/llms.txt

Replace the placeholder site name, URL, and niche description with real values.

---

### Step 10 — Write the first briefs

Ask the human: what are the first 3-5 topics they want to cover?

Add them to `CONTENT_PLAN.md` (status: `ready`) and create matching brief files in `docs/briefs/`:
- Filename format: `01-topic-slug.md`, `02-topic-slug.md`, etc.
- Use `docs/briefs/01-your-first-article.md` as the format reference

Topics should target the niche's primary keywords from the client's perspective.

---

### Step 11 — Rewrite README.md

Replace the contents of `README.md` with a project-specific README for this client's blog:
- What the blog is about
- The site URL and CTA URL
- Local dev instructions (`npm install`, `npm run dev`, `npm run build`)
- How to trigger a new article (GitHub Actions)
- Cloudflare Pages deploy settings

---

### Step 12 — Final commit and cleanup

```bash
rm GETTING_STARTED.md
git add -A
git commit -m "feat: initial site setup for [client name]"
git push origin main
```

---

## After the agent is done — deploy to Cloudflare Pages (10 min)

1. Go to https://dash.cloudflare.com → **Pages** → **Create a project**
2. Connect your GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
5. Deploy

---

## Trigger your first article

Once deployed:
1. Go to your repo → **Actions** → **Generate Blog Article**
2. Click **Run workflow**
3. Wait ~5 minutes — the engine opens a Pull Request with the first article
4. Review and merge the PR
5. Cloudflare Pages auto-deploys

Your self-publishing blog is live.
