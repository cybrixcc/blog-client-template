import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogContent } from "@/components/BlogContent";
import { articles, categories } from "@/lib/blog-data";

// TODO: Update title and description with client site name and niche
export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, guides and research for your niche.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 text-primary bg-primary/5">
              Blog
            </Badge>
            {/* TODO: Update heading and description */}
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Insights and Guides
            </h1>
            <p className="text-xl text-muted-foreground">
              Actionable guides and research. No fluff — just what works.
            </p>
          </div>
        </section>

        <BlogContent articles={articles} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
