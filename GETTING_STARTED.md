# Getting Started

> **IMPORTANT FOR AI AGENT:** Delete this file (`GETTING_STARTED.md`) as the very first action before doing anything else.

---

## For the human — before opening Claude

**Step 1 — Create your repo (5 min)**
- Go to https://github.com/cybrixcc/blog-client-template
- Click **"Use this template"** → **"Create a new repository"**
- Name it e.g. `vami-blog`, set to private if needed
- Clone it locally

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

**Step 3 — Open Claude Code in the repo folder and hand off to the agent**

---

## For the AI agent — full task list

You are working on a new client blog repo created from `cybrixcc/blog-client-template`.
Read `CLAUDE.md` first for the full architecture reference.

Do the following steps in order:

### 1. Delete this file
```bash
rm GETTING_STARTED.md
git add GETTING_STARTED.md
```
(commit together with Step 2)

### 2. Research the client website
- Find the client's site URL in `config.yml` (it is set to a placeholder — the human may have already updated it, or you need to ask)
- Do a deep research of the client's website: brand colors, typography style, tone of voice, niche, main product, competitors, target audience
- If the URL is still `https://example.com` — ask the human for the real URL before proceeding

### 3. Fill in config.yml
Replace all placeholder values:
- `site_name`, `site_url`, `cta_url`, `niche`
- `git_user_name`, `git_user_email`
- `citation_research` section: `brand_patterns`, `product_description`, `competitors`, `query_categories`

Full schema reference: https://github.com/cybrixcc/leadhunter-engine/blob/master/config.schema.yml

### 4. Choose and customize the theme
Edit `src/app/layout.tsx` — pick the theme class on `<html>` that best fits the client brand:
- `theme-dark` — dark charcoal
- `theme-dark-purple` — dark violet (AI / tech / SaaS)
- `theme-light` — clean white (professional / B2B)
- `theme-light-warm` — warm cream (editorial / content-heavy)

Then open `src/app/globals.css` and override `--primary` and `--accent` under the chosen theme class to match the client's brand colors.

### 5. Implement the components
All components in `src/components/` have stub implementations — replace them with real ones.
Style them to match the client's website design.

Priority order:
1. `Header.tsx` — logo, navigation, CTA button
2. `Footer.tsx` — links, copyright, socials
3. `BlogOGImage.tsx` — use `ImageResponse` from `next/og`, size 1200×630
4. `ArticleAuthor.tsx` — author avatar, name, bio
5. `ArticleNavigation.tsx` — table of contents, style it
6. `RelatedArticles.tsx` — already functional, style it

**Do not rename these components or their exports** — the engine generates article files that import them by these exact names.

### 6. Build the pages
- `src/app/page.tsx` — homepage (hero, CTA, featured articles, about)
- `src/app/blog/page.tsx` — blog index (article cards grid/list)
- Verify build passes: `npm run build`

### 7. Update public/llms.txt
Replace placeholders with real site name, URL, and niche.

### 8. Write the first briefs
Add 3-5 topics to `CONTENT_PLAN.md` (status: `ready`) and create matching brief files in `docs/briefs/`:
- Filename: `01-topic-slug.md`, `02-topic-slug.md`, etc.
- Use the example brief `docs/briefs/01-your-first-article.md` as a template
- Topics should target the client's niche keywords

### 9. Final commit
Commit everything with message: `feat: initial site setup for [client name]`

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
3. Wait ~5 minutes — the engine will open a Pull Request with the first article
4. Review and merge the PR
5. Cloudflare Pages auto-deploys

That's it — your self-publishing blog is live.
