// TODO: Implement the blog index page (/blog)
// Lists all published articles from blog-data.ts
//
// Should include:
//   - Article cards with title, description, badge
//   - Links to /blog/<slug>
//   - Pagination (optional)

import { articles } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <a href={`/blog/${article.slug}`}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
