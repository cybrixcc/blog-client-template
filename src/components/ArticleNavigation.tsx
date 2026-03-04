// Prev / Next article navigation — shown at the bottom of every generated article.
// Engine passes: currentSlug (the slug of the current article).
// Navigates through the articles array from blog-data.ts by index.

import Link from "next/link";
import { articles } from "@/lib/blog-data";

interface ArticleNavigationProps {
  currentSlug: string;
}

export function ArticleNavigation({ currentSlug }: ArticleNavigationProps) {
  const currentIndex = articles.findIndex((a) => a.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const next = currentIndex > 0 ? articles[currentIndex - 1] : null;

  if (!prev && !next) return null;

  return (
    <nav aria-label="Article navigation" className="border-t border-border pt-12 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
            >
              <span className="text-sm text-muted-foreground mb-2 block">Previous</span>
              <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group text-right"
            >
              <span className="text-sm text-muted-foreground mb-2 block">Next</span>
              <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </nav>
  );
}
