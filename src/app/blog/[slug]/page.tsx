// TODO: This is the dynamic blog article route.
// Each generated article gets its own folder at src/app/blog/<slug>/page.tsx
// This [slug] catchall is a fallback — you can keep it or delete it.
//
// Generated article pages look like this:
//
// import { Badge } from "@/components/ui/badge";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { FAQJsonLd, ArticleJsonLd } from "@/components/seo/JsonLd";
// import { ArticleNavigation } from "@/components/ArticleNavigation";
// import { RelatedArticles } from "@/components/RelatedArticles";
// import { ArticleAuthor } from "@/components/ArticleAuthor";
// import type { Metadata } from "next";
//
// export const metadata: Metadata = { title: "...", description: "..." };
//
// export default function ArticlePage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <article>...</article>
//         <ArticleAuthor />
//         <RelatedArticles currentSlug="slug" />
//       </main>
//       <Footer />
//     </>
//   );
// }

import { articles } from "@/lib/blog-data";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  // Once articles are generated they get their own page.tsx — this route is a fallback
  return (
    <main>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
    </main>
  );
}
