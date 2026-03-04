#!/usr/bin/env node

/**
 * Static Sitemap Generator
 *
 * Scans src/app for page.tsx files and generates public/sitemap.xml.
 * Runs automatically before build via the "prebuild" npm script.
 *
 * Usage:
 *   node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// Handle shallow git clones (Cloudflare Pages uses shallow by default)
function ensureFullGitHistory() {
  try {
    const isShallow = execSync('git rev-parse --is-shallow-repository', { encoding: 'utf8' }).trim();
    if (isShallow === 'true') {
      console.log('Shallow clone detected, fetching full history for lastmod dates...');
      execSync('git fetch --unshallow', { stdio: 'inherit' });
    }
  } catch {
    // Not a git repo or git not available — continue without lastmod
  }
}

function getGitLastModified(filePath) {
  try {
    const date = execSync(
      `git log -1 --format="%aI" -- "${filePath}"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
    return date || null;
  } catch {
    return null;
  }
}

// Priority rules based on URL pattern
const PRIORITY_RULES = [
  { pattern: /^\/$/, priority: 1.0, changefreq: 'weekly' },
  { pattern: /^\/blog$/, priority: 0.8, changefreq: 'weekly' },
  { pattern: /^\/blog\//, priority: 0.7, changefreq: 'monthly' },
  { pattern: /^\/(privacy|terms|refund)$/, priority: 0.3, changefreq: 'yearly' },
];

const EXCLUDE_PATTERNS = [
  /\[.*\]/,        // Dynamic routes — excluded, each article has its own static page
  /^\/not-found$/, // Error pages
];

function getRouteConfig(urlPath) {
  for (const rule of PRIORITY_RULES) {
    if (rule.pattern.test(urlPath)) {
      return { priority: rule.priority, changefreq: rule.changefreq };
    }
  }
  return { priority: 0.6, changefreq: 'monthly' };
}

function shouldExclude(urlPath) {
  return EXCLUDE_PATTERNS.some((p) => p.test(urlPath));
}

async function generateSitemap() {
  ensureFullGitHistory();

  // Dynamically import glob (ESM)
  const { glob } = await import('glob');

  const appDir = path.join(process.cwd(), 'src/app');
  const pageFiles = await glob('**/page.tsx', { cwd: appDir });

  const urls = [];

  for (const file of pageFiles) {
    let urlPath = '/' + path.dirname(file);
    if (urlPath === '/.') urlPath = '/';

    if (shouldExclude(urlPath)) continue;

    const config = getRouteConfig(urlPath);
    const filePath = path.join(appDir, file);
    const lastmod = getGitLastModified(filePath) || new Date().toISOString();

    urls.push({
      loc: `${SITE_URL}${urlPath}`,
      lastmod,
      changefreq: config.changefreq,
      priority: config.priority,
    });
  }

  // Sort by priority descending, then alphabetically
  urls.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.loc.localeCompare(b.loc);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const outputPath = path.join(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap().catch(console.error);
