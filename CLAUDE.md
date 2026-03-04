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
- Not in commit messages, PR titles, PR descriptions
- Not in UI text, headings, button labels
- Not in code comments

**Icons — use Lucide React only:**
- Import from `lucide-react`
- Never use emoji as icon substitutes
- Never use other icon libraries

**Commits — plain English, imperative mood:**
- Good: `feat: add article navigation component`
- Bad: `✨ Added article navigation 🎉`

**Components:**
- Always use `cn()` from `@/lib/utils` for conditional classes
- Always use shadcn/ui primitives (`Badge`, `Button`, `Card`) — do not reinvent them
- One responsibility per file

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

4 built-in themes in `src/app/globals.css`. Apply via class on `<html>` in `layout.tsx`:

| Class | Description |
|-------|-------------|
| `theme-dark` | Dark charcoal — default, universal |
| `theme-dark-purple` | Dark violet — AI / tech / premium SaaS |
| `theme-light` | Clean white — professional / B2B |
| `theme-light-warm` | Warm cream — content-heavy / editorial |

To customize: override only `--primary` and `--accent` under the chosen theme class in `globals.css`. All shadcn/ui components adapt automatically.

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
config.yml                           ← engine config (fill in all values)
CONTENT_PLAN.md                      ← topic backlog, auto-updated by engine
docs/briefs/NN-slug.md               ← per-topic briefs, read by engine
scripts/generate-sitemap.js          ← runs before build, generates public/sitemap.xml
src/
  app/
    layout.tsx                       ← root layout — theme, metadata, analytics TODO
    page.tsx                         ← homepage (TODO: implement)
    globals.css                      ← Tailwind base + 4 themes
    robots.ts                        ← robots.txt (auto-generated)
    blog/
      page.tsx                       ← blog index (/blog)
      feed.xml/route.ts              ← RSS feed (auto-updated by engine)
      <slug>/page.tsx                ← generated articles (written by engine)
      <slug>/opengraph-image.tsx     ← OG images (written by engine)
  components/
    Header.tsx                       ← site header (TODO: implement)
    Footer.tsx                       ← site footer (TODO: implement)
    Breadcrumbs.tsx                  ← breadcrumb nav + JSON-LD (ready to use)
    ArticleAuthor.tsx                ← author byline — fill in name/initials
    ArticleNavigation.tsx            ← prev/next article links (ready to use)
    RelatedArticles.tsx              ← related articles grid (ready to use)
    BlogContent.tsx                  ← article cards for blog index (ready to use)
    seo/
      JsonLd.tsx                     ← all JSON-LD schemas (ready to use)
      BlogOGImage.tsx                ← OG image 1200x630 — fill in brand TODO markers
    ui/
      badge.tsx, button.tsx, card.tsx, accordion.tsx, separator.tsx  ← shadcn/ui
  lib/
    utils.ts                         ← cn() helper
    blog-data.ts                     ← article index, auto-updated by engine
public/
  llms.txt                           ← LLM context file, auto-updated by engine
  _headers                           ← Cloudflare Pages security headers (CSP)
  sitemap.xml                        ← auto-generated before every build
```

---

## What Needs TODO vs What Is Ready

### Ready to use (no changes needed):
- All shadcn/ui components (`ui/`)
- `Breadcrumbs.tsx` — just use it in pages
- `ArticleNavigation.tsx` — pass `currentSlug`
- `RelatedArticles.tsx` — pass `articles[]`
- `BlogContent.tsx` — pass `articles` and `categories`
- `JsonLd.tsx` — all schemas, uses `NEXT_PUBLIC_SITE_URL` env var
- `feed.xml/route.ts` — RSS works out of the box
- `robots.ts` — works out of the box
- `sitemap.xml` — generated automatically before every build

### Needs brand customization (fill in TODO markers):
- `config.yml` — all fields are placeholders
- `src/app/layout.tsx` — site name, description, keywords, analytics
- `src/components/seo/BlogOGImage.tsx` — brand colors, initials, name, URL
- `public/llms.txt` — site name, URL, niche
- `src/app/blog/page.tsx` — hero heading and description

### Needs full implementation (stubs only):
- `Header.tsx` — build from scratch matching client brand
- `Footer.tsx` — build from scratch matching client brand
- `src/app/page.tsx` — homepage hero, CTA, featured articles

---

## Component Contracts

Generated articles use these exact imports — do not rename, do not move:

```tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/ArticleNavigation";
import { RelatedArticles } from "@/components/RelatedArticles";
import { ArticleAuthor } from "@/components/ArticleAuthor";
import { Badge } from "@/components/ui/badge";
```

Exact prop signatures:

```tsx
// Author byline — date is human-readable string, updated is optional
<ArticleAuthor date="January 15, 2026" updated="February 1, 2026" />

// Prev/next navigation — reads from blog-data.ts by index
<ArticleNavigation currentSlug="my-article-slug" />

// Related articles — passed explicitly per article, not auto-selected
<RelatedArticles articles={[
  { title: "...", slug: "...", description: "..." },
]} />

// OG image — called from opengraph-image.tsx, subtitle is optional
BlogOGImage({ title: "...", category: "Guide", subtitle: "optional hook" })
// Must return ImageResponse (1200x630)
```

---

## Engine Integration

### How article generation works:
1. Engine reads `CONTENT_PLAN.md` → finds next topic with status `ready`
2. Reads `docs/briefs/NN-slug.md`
3. Generates `src/app/blog/<slug>/page.tsx` and `opengraph-image.tsx`
4. Updates `src/lib/blog-data.ts`, `feed.xml/route.ts`, `public/llms.txt`, `CONTENT_PLAN.md`
5. Runs `npm run build` to verify — auto-fixes JSX errors with Claude Sonnet
6. Opens a Pull Request

### CONTENT_PLAN.md format — do not break this structure:
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

---

## SEO / GEO Architecture

This template implements the same SEO/GEO stack as leadhunter-website (production reference):

| Feature | Implementation |
|---------|---------------|
| Structured data | `JsonLd.tsx` — Article, FAQ, Organization, WebSite, Breadcrumb, HowTo schemas |
| OG images | `BlogOGImage.tsx` — dynamic 1200×630 via `next/og` `ImageResponse` |
| Sitemap | Auto-generated before every build from `page.tsx` files with git lastmod dates |
| robots.txt | `src/app/robots.ts` — auto-generated, points to sitemap |
| RSS feed | `feed.xml/route.ts` — full RSS 2.0 with atom namespace |
| LLM context | `public/llms.txt` — updated by engine after each article |
| Security headers | `public/_headers` — full CSP for Cloudflare Pages |
| Analytics | Staggered loading pattern in `layout.tsx` (TODO: fill in IDs) |
| Accessibility | Skip-to-content link in `layout.tsx` |
| Breadcrumbs | `Breadcrumbs.tsx` component with JSON-LD |

---

## config.yml Reference

Full schema: [config.schema.yml](https://github.com/cybrixcc/leadhunter-engine/blob/master/config.schema.yml)

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

---

## Cloudflare Pages Deploy Settings

- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
