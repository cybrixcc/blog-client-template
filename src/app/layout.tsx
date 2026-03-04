import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap", // Prevents FOIT — text visible immediately
});

// TODO: Replace with real site name, description, URL, and keywords
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description: "TODO: Add your site description here.",
  keywords: [
    // TODO: Add your primary keywords
  ],
  authors: [{ name: "My Blog" }],
  openGraph: {
    title: "My Blog",
    description: "TODO: Add your OpenGraph description.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "My Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog",
    description: "TODO: Add your Twitter card description.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// TODO: Choose your theme:
//   theme-dark         — dark charcoal (default)
//   theme-dark-purple  — dark violet for AI / tech / SaaS
//   theme-light        — clean white for professional / B2B
//   theme-light-warm   — warm cream for editorial / content-heavy

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="theme-dark">
      <head>
        {/* DNS prefetch for analytics */}
        {/* TODO: Add your analytics DNS prefetch links here */}
        {/* <link rel="dns-prefetch" href="https://cloud.umami.is" /> */}

        {/* Site-wide structured data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />

        {/*
          TODO: Add your analytics scripts here.
          Pattern from leadhunter-website — staggered loading to reduce network congestion:

          <script dangerouslySetInnerHTML={{ __html: `
            window.addEventListener('load', function() {
              // Umami Analytics (1s delay — privacy-friendly, no cookies)
              setTimeout(function() {
                var u = document.createElement('script');
                u.defer = true;
                u.src = 'https://cloud.umami.is/script.js';
                u.setAttribute('data-website-id', 'YOUR_UMAMI_ID');
                document.head.appendChild(u);
              }, 1000);

              // Google Tag Manager (1.5s delay)
              setTimeout(function() {
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXXX');
              }, 1500);
            });
          ` }} />
        */}
      </head>
      <body className={`${geistSans.variable} antialiased min-h-screen`}>
        {/*
          TODO: Add GTM noscript if using Google Tag Manager:
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
              height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        */}

        {/* Skip to main content — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  );
}
