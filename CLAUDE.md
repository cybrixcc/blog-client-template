# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## How to Start — Read This First

When you open this repo for the first time, read files in this order:

1. **This file (CLAUDE.md)** — architecture, rules, conventions
2. **GETTING_STARTED.md** — step-by-step task list for initial setup (delete it after completing all steps)
3. **config.yml** — client site config (fill in all placeholders)
4. **CONTENT_PLAN.md** — topic backlog
5. **docs/briefs/** — per-topic brief files

Do not start writing code until you have read all five.

---

## Recommended Models

Use these models for different tasks:

| Task | Model |
|------|-------|
| Initial setup, research, planning | `claude-sonnet-4-6` |
| Writing components, pages, complex code | `claude-sonnet-4-6` |
| Quick edits, small fixes | `claude-haiku-4-5-20251001` |
| Article generation (engine) | `claude-haiku-4-5-20251001` |
| JSX repair, build fixes | `claude-sonnet-4-6` |

Default to `claude-sonnet-4-6` when unsure.

---

## Language

**Everything must be in English — no exceptions:**
- All code, variable names, comments inside code
- Commit messages
- PR titles and descriptions
- GitHub issue titles and bodies
- Any text written to files in this repo

---

## Code Style Rules

**No emojis — anywhere:**
- Not in commit messages
- Not in PR titles or descriptions
- Not in UI text, headings, or button labels
- Not in code comments

**Icons — use Lucide React only:**
- Import from `lucide-react`
- Never use emoji as a substitute for icons
- Never use other icon libraries
- Example: use `<CheckIcon />` not ✓, use `<ArrowRightIcon />` not →

**Commits:**
- Plain English, no emoji, imperative mood
- Good: `feat: add article navigation component`
- Bad: `✨ Added article navigation 🎉`

**Components:**
- Always use `cn()` from `@/lib/utils` for conditional classes
- Always use shadcn/ui components (`Badge`, `Button`, `Card`) — do not build primitives from scratch
- Keep components focused — one responsibility per file

---

## What This Repo Is

A client blog powered by [leadhunter-engine](https://github.com/cybrixcc/leadhunter-engine).

- **This repo** = Next.js site (UI, components, content) + config for the engine
- **Engine repo** = all automation scripts (article generation, GSC, GEO, citations)
- Articles are generated automatically via GitHub Actions and committed as PRs to this repo

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, `output: "export"` — static) |
| Language | TypeScript 5.9 strict mode |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Badge, Button, Card, Accordion, Separator) |
| UI primitives | Radix UI (`@radix-ui/react-*`) |
| Variants | class-variance-authority |
| Icons | lucide-react only — no emoji substitutes |
| Utilities | clsx, tailwind-merge, `cn()` from `@/lib/utils` |
| Fonts | Geist (next/font/google) |
| Hosting | Cloudflare Pages (security headers in `public/_headers`) |
| Runtime | Node.js 22 |
| Package manager | npm |

---

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

**To customize:** only override `--primary` and `--accent` under the chosen theme class in `globals.css` to match the client's brand colors. The rest will follow automatically.

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (turbopack)
npm run build        # production build — must pass before any PR
npm run lint         # eslint
```

Always run `npm run build` before committing UI changes.

---

## Repository Structure

```
config.yml                          ← engine config (site_name, site_url, niche, etc.)
CONTENT_PLAN.md                     ← topic backlog, auto-updated by engine
docs/briefs/NN-slug.md              ← per-topic briefs, read by engine
src/
  app/
    layout.tsx                      ← root layout, theme class goes here
    page.tsx                        ← homepage
    globals.css                     ← Tailwind base + 4 themes
    blog/
      page.tsx                      ← blog index (/blog)
      [slug]/page.tsx               ← dynamic fallback route
      <slug>/page.tsx               ← generated articles (written by engine)
      <slug>/opengraph-image.tsx    ← OG images (written by engine)
      feed.xml/route.ts             ← RSS feed (updated by engine)
  components/
    Header.tsx                      ← site header
    Footer.tsx                      ← site footer
    ArticleAuthor.tsx               ← author block in articles
    ArticleNavigation.tsx           ← table of contents
    RelatedArticles.tsx             ← related articles block
    seo/
      JsonLd.tsx                    ← ArticleJsonLd + FAQJsonLd (ready to use)
      BlogOGImage.tsx               ← OG image component
    ui/
      badge.tsx                     ← shadcn/ui Badge
      button.tsx                    ← shadcn/ui Button
      card.tsx                      ← shadcn/ui Card
      accordion.tsx                 ← shadcn/ui Accordion
      separator.tsx                 ← shadcn/ui Separator
  lib/
    utils.ts                        ← cn() helper
    blog-data.ts                    ← article index, auto-updated by engine
public/
  llms.txt                          ← LLM context file, auto-updated by engine
  _headers                          ← Cloudflare Pages security headers
```

---

## Components

All components in `src/components/` have stub implementations. Replace them with real ones matching the client's brand and design.

### Priority order:
1. `Header.tsx` — navigation, logo, CTA button (use `Button` from `@/components/ui/button`)
2. `Footer.tsx` — links, copyright, socials
3. `BlogOGImage.tsx` — OG image (use `ImageResponse` from `next/og`, 1200×630)
4. `ArticleAuthor.tsx` — author avatar, name, bio
5. `RelatedArticles.tsx` — already functional, add styling
6. `ArticleNavigation.tsx` — table of contents, add styling

### Contracts — do not change these:

Generated articles import these exact named exports:
```tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/ArticleNavigation";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ArticleAuthor } from "@/components/ArticleAuthor";
```

Do not rename these exports. Do not move these files.

`BlogOGImage` contract:
```tsx
// Called from: src/app/blog/<slug>/opengraph-image.tsx
import { BlogOGImage } from "@/components/seo/BlogOGImage";
export default async function Image() {
  return BlogOGImage({ title: "...", category: "Guide" });
}
// Must return ImageResponse (1200x630)
```

---

## Engine Integration

### How article generation works:
1. Engine reads `CONTENT_PLAN.md` → finds next topic with status `ready`
2. Reads `docs/briefs/NN-slug.md`
3. Generates `src/app/blog/<slug>/page.tsx` and `opengraph-image.tsx`
4. Updates `src/lib/blog-data.ts`, `feed.xml/route.ts`, `public/llms.txt`, `CONTENT_PLAN.md`
5. Runs `npm run build` to verify
6. Opens a Pull Request

### CONTENT_PLAN.md format (engine parses this exactly — do not break):
```markdown
### Article Index (N topics)

| #  | Title          | Status    | Priority |
|----|----------------|-----------|----------|
| 1  | Article title  | ready     | P1       |
```
Status values: `idea` → `ready` → `published`. Engine only picks `ready` topics.

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

---

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

---

## Required GitHub Secrets

| Secret | Used by |
|--------|---------|
| `ANTHROPIC_API_KEY` | Article generation, AI review |
| `OPENAI_API_KEY` | Citation research |
| `GEMINI_API_KEY` | Citation research |
| `GSC_CREDENTIALS_JSON` | GSC index check + keyword performance |
| `GH_TOKEN` | PR creation (needs `repo` scope) |
| `TELEGRAM_BOT_TOKEN` | Notifications (optional) |
| `TELEGRAM_CHAT_ID` | Notifications (optional) |
