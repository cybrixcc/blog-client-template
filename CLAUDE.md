# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

**Everything must be in English** — code, comments, commit messages, PR titles and descriptions, GitHub issue text.

## What This Repo Is

A client blog powered by [leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine).

- **This repo** = Next.js site (UI, components, content) + config for the engine
- **Engine repo** = all automation scripts (article generation, GSC, GEO, citations)
- Articles are generated automatically via GitHub Actions and committed as PRs to this repo

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, `output: "export"` — static) |
| Language | TypeScript 5.9 strict mode |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Badge, Button, Card, Accordion, Separator) |
| UI primitives | Radix UI (`@radix-ui/react-*`) |
| Variants | class-variance-authority |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge, `cn()` from `@/lib/utils` |
| Fonts | Geist (next/font/google) |
| Hosting | Cloudflare Pages (security headers in `public/_headers`) |
| Runtime | Node.js 22 |
| Package manager | npm |

## Themes

4 built-in themes in `src/app/globals.css`. Apply via class on `<html>`:

| Class | Description |
|-------|-------------|
| `theme-dark` | Dark charcoal — default, universal |
| `theme-dark-purple` | Dark violet — AI / tech / premium SaaS |
| `theme-light` | Clean white — professional / B2B |
| `theme-light-warm` | Warm cream — content-heavy / editorial |

**To pick a theme:** edit `src/app/layout.tsx` → change `className` on `<html>`.

Each theme defines the same CSS variables (`--primary`, `--background`, `--card`, etc.) so all shadcn/ui components automatically adapt.

**To customize a theme:** override the variables in `globals.css` under the relevant class. Only change `--primary` and `--accent` to match client brand colors — the rest will follow.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (turbopack)
npm run build        # production build
npm run lint         # eslint
```

## Repository Structure

```
config.yml                          ← engine config (site_name, site_url, niche, etc.)
CONTENT_PLAN.md                     ← topic backlog, auto-updated by engine
docs/briefs/NN-slug.md              ← per-topic briefs, read by engine
src/
  app/
    layout.tsx                      ← root layout
    page.tsx                        ← homepage
    globals.css                     ← Tailwind base styles
    blog/
      page.tsx                      ← blog index (/blog)
      [slug]/page.tsx               ← dynamic fallback route
      <slug>/page.tsx               ← generated articles (written by engine)
      <slug>/opengraph-image.tsx    ← OG images (written by engine)
      feed.xml/route.ts             ← RSS feed (updated by engine)
  components/
    Header.tsx                      ← site header (TODO: implement)
    Footer.tsx                      ← site footer (TODO: implement)
    ArticleAuthor.tsx               ← author block in articles (TODO: implement)
    ArticleNavigation.tsx           ← table of contents (TODO: implement)
    RelatedArticles.tsx             ← related articles block (TODO: implement)
    seo/
      JsonLd.tsx                    ← ArticleJsonLd + FAQJsonLd (implemented)
      BlogOGImage.tsx               ← OG image component (TODO: implement)
    ui/
      badge.tsx                     ← shadcn/ui Badge
      button.tsx                    ← shadcn/ui Button
      card.tsx                      ← shadcn/ui Card
      accordion.tsx                 ← shadcn/ui Accordion (for FAQ sections)
      separator.tsx                 ← shadcn/ui Separator
  lib/
    utils.ts                        ← cn() helper (clsx + tailwind-merge)
    blog-data.ts                    ← article index, auto-updated by engine
public/
  llms.txt                         ← LLM context file, auto-updated by engine
```

## Your First Task as an Agent

When you open this repo for the first time, do this in order:

1. **Fill in `config.yml`** — set `site_name`, `site_url`, `cta_url`, `niche`, and the `citation_research` section based on the client's website
2. **Implement the components** — see the TODO list below
3. **Add GitHub Secrets** — see SETUP.md for the full list
4. **Add topics to `CONTENT_PLAN.md`** and write briefs in `docs/briefs/`
5. **Trigger article generation** via Actions → Generate Blog Article → Run workflow

## Components TODO

All components in `src/components/` have stub implementations. Replace them with real ones matching the client's brand and design.

### Priority order:
1. `Header.tsx` — navigation, logo, CTA button
2. `Footer.tsx` — links, copyright, socials
3. `BlogOGImage.tsx` — OG image for articles (use `ImageResponse` from `next/og`)
4. `ArticleAuthor.tsx` — author block shown at bottom of articles
5. `RelatedArticles.tsx` — already functional, style it
6. `ArticleNavigation.tsx` — table of contents, style it

### What generated articles import:
Every article generated by the engine uses these exact imports:
```tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/ArticleNavigation";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ArticleAuthor } from "@/components/ArticleAuthor";
```
These must exist and export named exports — do not rename them.

### BlogOGImage contract:
```tsx
// src/app/blog/<slug>/opengraph-image.tsx (generated by engine)
import { BlogOGImage } from "@/components/seo/BlogOGImage";
export default async function Image() {
  return BlogOGImage({ title: "...", category: "Guide" });
}
```
`BlogOGImage` must return an `ImageResponse` (1200×630).

## Engine Integration

### How article generation works:
1. Engine reads `CONTENT_PLAN.md` → finds next topic with status `ready`
2. Reads `docs/briefs/NN-slug.md`
3. Generates `src/app/blog/<slug>/page.tsx` and `opengraph-image.tsx`
4. Updates `src/lib/blog-data.ts`, `feed.xml/route.ts`, `public/llms.txt`, `CONTENT_PLAN.md`
5. Runs `npm run build` to verify
6. Opens a Pull Request

### CONTENT_PLAN.md format (do not break this):
```markdown
### Article Index (N topics)

| #  | Title          | Status    | Priority |
|----|----------------|-----------|----------|
| 1  | Article title  | ready     | P1       |
```
Status: `idea` → `ready` → `published`. Engine only picks `ready` topics.

### Brief format (`docs/briefs/NN-slug.md`):
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

## Why It Matters
Context for the audience.

## Brand Angle
How the product connects to this topic.

## Internal Links
- /blog/slug — anchor text

## Sources
- https://source.com
```

## config.yml Reference

Full schema: [config.schema.yml](https://github.com/cybrixcc/leadhunter-engine/blob/master/config.schema.yml)

Key fields:
```yaml
site_name: "Client Blog"
site_url: "https://blog.client.com"
cta_url: "https://client.com/#contact"
niche: "your niche"
git_user_name: "Blog Bot"
git_user_email: "bot@client.com"
```

## Secrets Required

| Secret | Used by |
|--------|---------|
| `ANTHROPIC_API_KEY` | Article generation, AI review |
| `OPENAI_API_KEY` | Citation research |
| `GEMINI_API_KEY` | Citation research |
| `GSC_CREDENTIALS_JSON` | GSC index check + keyword performance |
| `GH_TOKEN` | PR creation (needs `repo` scope) |
| `TELEGRAM_BOT_TOKEN` | Notifications (optional) |
| `TELEGRAM_CHAT_ID` | Notifications (optional) |
