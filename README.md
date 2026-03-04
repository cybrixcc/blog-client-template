# Blog Client Template

A GitHub Template Repository for spinning up a new SEO blog powered by [leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine).

## Quick Start

1. Click **"Use this template"** → **"Create a new repository"**
2. Clone your new repo
3. Edit `config.yml` — fill in your site details, niche, brand patterns, competitors
4. Add the required GitHub Secrets (see below)
5. The scheduled workflows will run automatically; trigger them manually anytime via **Actions → Run workflow**

## Repository Structure

```
config.yml                  ← your site config (edit this)
CONTENT_PLAN.md             ← topic backlog (one topic per line)
briefs/                     ← per-topic brief files (optional)
.github/
  workflows/
    generate-article.yml    ← article generation (manual / scheduled)
    gsc-index-check.yml     ← Google Search Console index monitoring
    gsc-keyword-performance.yml
    geo-health-check.yml    ← GEO/AI-search readiness scoring
    ai-article-review.yml   ← AI review on blog PRs
    ai-citation-research.yml ← weekly citation monitoring
```

## Required GitHub Secrets

| Secret | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key |
| `OPENAI_API_KEY` | OpenAI API key (citation research) |
| `GEMINI_API_KEY` | Gemini API key (citation research) |
| `GSC_CLIENT_EMAIL` | Google service account email |
| `GSC_PRIVATE_KEY` | Google service account private key |
| `GH_TOKEN` | GitHub token with `contents:write` and `pull-requests:write` |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token (optional, for notifications) |
| `TELEGRAM_CHAT_ID` | Telegram chat ID (optional) |

## config.yml

See [config.schema.yml](https://github.com/cybrixcc/leadhunter-engine/blob/main/config.schema.yml) in the engine repo for the full parameter reference.

## Engine

All scripts and logic live in [cybrixcc/leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine). This repo only holds your config and workflow triggers — update the engine to get improvements automatically.
