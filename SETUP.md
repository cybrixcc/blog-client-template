# Setup Guide

Step-by-step setup for a new blog client repo.

---

## Step 1 — Edit config.yml

Open `config.yml` and fill in your details:

```yaml
site_name: "VAMI Blog"
site_url: "https://blog.vami.agency"
cta_url: "https://vami.agency/#contact"
niche: "AI recruitment"
```

Also fill in the `citation_research` section with your brand name, competitors, and queries.

---

## Step 2 — Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret | Where to get it |
|--------|----------------|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `OPENAI_API_KEY` | platform.openai.com/api-keys |
| `GEMINI_API_KEY` | aistudio.google.com/app/apikey |
| `GSC_CREDENTIALS_JSON` | Google Cloud Console — Service Account JSON key |
| `GH_TOKEN` | GitHub Settings → Developer settings → Personal access tokens (needs `repo` scope) |
| `TELEGRAM_BOT_TOKEN` | @BotFather on Telegram (optional) |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID (optional) |

---

## Step 3 — Add Your First Topic

Edit `CONTENT_PLAN.md` — replace the placeholder row with your topic:

```markdown
| 1  | Best AI tools for recruiting in 2026 | ready     | P1       |
```

Change status to `ready` only after you've written the brief (Step 4).

---

## Step 4 — Write a Brief

Create a file `docs/briefs/01-your-topic-slug.md` using the template in that folder.

The filename must start with the topic number (e.g. `01-`, `02-`).

---

## Step 5 — Generate Your First Article

Go to **Actions → Generate Blog Article → Run workflow**.

The engine will:
1. Pick topic #1 from CONTENT_PLAN.md
2. Read the brief
3. Generate the article with Claude
4. Open a Pull Request for you to review

---

## Step 6 — Connect Your Next.js Site

The engine writes articles to `src/app/blog/<slug>/page.tsx`.

Make sure your Next.js project uses App Router and has:
- `src/lib/blog-data.ts` — article index (already included)
- `src/app/blog/[slug]/page.tsx` — dynamic blog page (you build this)
- `public/llms.txt` — already included

---

## Help

- Engine docs: https://github.com/cybrixcc/leadhunter-engine
- Config reference: https://github.com/cybrixcc/leadhunter-engine/blob/master/config.schema.yml
