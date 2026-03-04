// Auto-updated by article generator — do not edit manually

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  date?: string;
}

export const articles: BlogArticle[] = [
  // Articles will be added here automatically by the generator
];

export const categories: string[] = [
  // Categories will be derived from article badges
  ...new Set(articles.map((a) => a.badge)),
];
