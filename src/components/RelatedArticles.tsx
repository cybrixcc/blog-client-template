// TODO: Implement related articles block
// Shown at the bottom of each blog article
//
// Should include:
//   - 2-3 article cards with title, description, badge
//   - Links to /blog/<slug>
//   - "Related articles" heading
//
// Props:
//   currentSlug: string — exclude current article from suggestions
//
// Data source: import { articles } from "@/lib/blog-data"

import { articles } from "@/lib/blog-data";

interface RelatedArticlesProps {
  currentSlug: string;
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  const related = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section>
      <h2>Related articles</h2>
      <ul>
        {related.map((article) => (
          <li key={article.slug}>
            <a href={`/blog/${article.slug}`}>{article.title}</a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
