/**
 * JSON-LD structured data components for SEO.
 *
 * TODO: Fill in OrganizationJsonLd and WebSiteJsonLd with real client data.
 * ArticleJsonLd and FAQJsonLd are called by engine-generated articles — do not change their props.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "My Blog";

// ─── Site-wide schemas (used in layout.tsx) ───────────────────────────────────

/**
 * TODO: Fill in with real client data.
 * Add to <head> in src/app/layout.tsx.
 */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    // TODO: Add logo URL once you have it
    // logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: "512", height: "512" },
    description: "TODO: Add organization description",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: SITE_URL,
      availableLanguage: ["en"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * TODO: Fill in with real site data.
 * Add to <head> in src/app/layout.tsx.
 */
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "TODO: Add site description",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Article schemas (called by engine-generated articles) ───────────────────

interface FAQItem {
  question: string;
  answer: string;
}

/** Used in every generated article that has a FAQ section. Do not rename. */
export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Used in every generated article. Do not rename or change props. */
export function ArticleJsonLd({
  headline,
  datePublished,
  dateModified,
  url,
  image,
  description,
  authorName,
}: {
  headline: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
  description: string;
  authorName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    datePublished,
    dateModified,
    url,
    image: image || `${SITE_URL}/og-image.png`,
    description,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
          url: SITE_URL,
          affiliation: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
          },
        }
      : {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Navigation schemas ───────────────────────────────────────────────────────

/** Used in Breadcrumbs component. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Optional schemas (add to pages as needed) ───────────────────────────────

/** HowTo schema — for tutorial/guide articles. */
export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
