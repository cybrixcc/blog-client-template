// Related articles grid — shown at the bottom of every generated article.
// Engine passes: articles (array of related articles chosen per-article).
// Each article has: title, slug, description.

import Link from "next/link";

export interface RelatedArticle {
  title: string;
  slug: string;
  description: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t border-border pt-12 mt-16 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
              <span className="inline-block mt-4 text-sm text-primary">Read more</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
