# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

**Everything must be in English** — code, comments, commit messages, PR titles and descriptions, GitHub issue text.

## What This Repo Is

A client blog powered by [leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine).

- All automation scripts live in the **engine repo** — this repo only holds config and content
- Articles are generated automatically via GitHub Actions workflows
- The engine checks out this repo + itself, runs scripts, then commits/pushes/creates a PR back here

## Setup Checklist (do this first)

1. **Edit `config.yml`** — fill in `site_name`, `site_url`, `cta_url`, `niche`, and the `citation_research` section
2. **Add GitHub Secrets** — see README.md for the full list
3. **Add topics to `CONTENT_PLAN.md`** — change status from `idea` to `ready` once a brief exists
4. **Write a brief** in `docs/briefs/` — filename must match `NN-topic-slug.md` (e.g. `01-best-tools.md`)
5. **Trigger article generation** — Actions → Generate Blog Article → Run workflow

## File Structure That Matters to the Engine

```
config.yml                        ← site config (read by engine)
CONTENT_PLAN.md                   ← topic list with statuses (read + updated by engine)
docs/briefs/01-topic-slug.md      ← per-topic briefs (read by engine)
src/lib/blog-data.ts              ← article index (updated by engine)
src/app/blog/<slug>/page.tsx      ← generated article files (written by engine)
src/app/blog/feed.xml/route.ts    ← RSS feed (updated by engine)
public/llms.txt                   ← LLM context file (updated by engine)
```

## CONTENT_PLAN.md Format

The Article Index table must follow this exact format:

```markdown
### Article Index (N topics)

| #  | Title              | Status    | Priority |
|----|--------------------|-----------|----------|
| 1  | Article title here | ready     | P1       |
```

Status values: `idea` → `ready` → `published`
Priority: `P0` (urgent), `P1` (normal), `P2` (low)

## Brief Format (`docs/briefs/NN-slug.md`)

```markdown
# Brief: Article Title

## Title
Full article title

## Target Keywords
- primary keyword
- secondary keyword

## Search Intent
informational / commercial / navigational

## Main Thesis
One sentence summary.

## Key Points
- Point 1
- Point 2

## Why It Matters
Why this matters to the audience.

## Brand Angle
How the product connects to this topic.

## Internal Links
- /blog/slug — anchor text

## Sources
- https://source.com
```

## Workflows

All workflows delegate to `cybrixcc/leadhunter-engine`. Trigger manually via Actions tab:

| Workflow | What it does |
|----------|-------------|
| Generate Blog Article | Picks next `ready` topic, generates article, opens PR |
| GSC Index Check | Submits unindexed pages to Google Search Console |
| GSC Keyword Performance | Weekly keyword report → GitHub issue |
| GEO Health Check | Scores articles for AI-search readiness → GitHub issue |
| AI Article Review | Auto-triggered on PRs touching `src/app/blog/` |
| AI Citation Research | Checks if your brand is cited by ChatGPT/Claude/Gemini |

## Engine Reference

Full schema for `config.yml`: [config.schema.yml](https://github.com/cybrixcc/leadhunter-engine/blob/master/config.schema.yml)

Engine source: [cybrixcc/leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine)
