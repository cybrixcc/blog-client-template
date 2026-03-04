// Blog index content — article list with optional category filtering.
// Used in src/app/blog/page.tsx.
//
// TODO: Style the article cards to match the client's brand.

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogArticle } from "@/lib/blog-data";

interface BlogContentProps {
  articles: BlogArticle[];
  categories?: string[];
}

export function BlogContent({ articles, categories }: BlogContentProps) {
  void categories; // TODO: implement category filtering if needed

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-muted-foreground">No articles published yet.</p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="mb-3">
              <Badge variant="secondary">{article.badge}</Badge>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {article.description}
            </p>
            <span className="inline-block mt-4 text-sm text-primary">Read more</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
