import { NextResponse } from 'next/server';
import { articles } from '@/lib/blog-data';

// force-static is required for output: "export" (static export) to work with route handlers
export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Blog';

function generateRSS() {
  const buildDate = new Date().toUTCString();

  const rssItems = articles
    .map((article) => {
      const link = `${SITE_URL}/blog/${article.slug}`;
      const pubDate = new Date(article.date || new Date()).toUTCString();

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}/blog</link>
    <description>${SITE_NAME} — latest articles</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} ${SITE_NAME}</copyright>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;
}

export async function GET() {
  const rss = generateRSS();

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
