# Blog Client Template

> This is a GitHub Template Repository. To create a new client blog, click **"Use this template"** above.

A self-publishing SEO blog powered by [leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine).

Once set up, the blog generates articles automatically via GitHub Actions — no ongoing manual work required.

---

## How it works

1. An AI agent customizes this repo for your brand (colors, components, content topics)
2. GitHub Actions call [leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine) to generate articles, monitor GSC, and track citations
3. Each article is opened as a Pull Request — review and merge to publish
4. Cloudflare Pages deploys automatically on merge

All automation logic lives in the engine repo. This repo holds only your site code and config.

---

## Stack

Next.js 16 (static export) + TypeScript + Tailwind CSS v4 + shadcn/ui, deployed to Cloudflare Pages.

---

## Local development

```bash
npm install
npm run dev       # dev server at localhost:3000
npm run build     # production build (must pass before any commit)
npm run lint      # eslint
```

---

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

---

## Trigger an article

Go to **Actions** → **Generate Blog Article** → **Run workflow**.

The engine will open a Pull Request with a fully written article in ~5 minutes.

---

## Required GitHub Secrets

| Secret | Where to get it |
|--------|----------------|
| `ANTHROPIC_API_KEY` | console.anthropic.com |
| `OPENAI_API_KEY` | platform.openai.com/api-keys |
| `GEMINI_API_KEY` | aistudio.google.com/app/apikey |
| `GSC_CREDENTIALS_JSON` | Google Cloud Console → Service Account → JSON key |
| `GH_TOKEN` | GitHub Settings → Developer settings → Personal access tokens (`repo` scope) |
| `TELEGRAM_BOT_TOKEN` | @BotFather on Telegram (optional) |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID (optional) |

---

## First-time setup

See [GETTING_STARTED.md](./GETTING_STARTED.md) for the full setup guide.
