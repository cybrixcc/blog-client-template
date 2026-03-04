// Auto-updated by article generator — do not edit manually

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Blog';

const articles = [
  // Articles will be added here automatically by the generator
];

export async function GET() {
  const items = articles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/blog/${article.slug}</link>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <guid>${SITE_URL}/blog/${article.slug}</guid>
    </item>`
    )
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_NAME} — latest articles</description>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
