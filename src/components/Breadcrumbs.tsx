// Breadcrumb navigation with BreadcrumbList JSON-LD.
// Used in article pages and other deep pages.
//
// Usage:
//   <Breadcrumbs items={[
//     { name: "Home", href: "/" },
//     { name: "Blog", href: "/blog" },
//     { name: "Article Title", href: "/blog/article-slug" },
//   ]} />

import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const jsonLdItems = items.map((item) => ({
    name: item.name,
    url: `${siteUrl}${item.href}`,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="text-border">/</span>}
              {index === items.length - 1 ? (
                <span className="text-foreground">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
