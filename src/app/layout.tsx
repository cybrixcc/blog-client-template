import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans-family",
  subsets: ["latin"],
  display: "swap",
});

// TODO: Replace with your actual site name, description, and URL
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description: "My blog description",
};

// TODO: Choose your theme by changing the className on <html>:
//   theme-dark         — dark charcoal (default)
//   theme-dark-purple  — dark violet, great for AI/tech/SaaS
//   theme-light        — clean white, professional
//   theme-light-warm   — warm cream, content-heavy blogs

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="theme-dark">
      <body className={geistSans.variable}>{children}</body>
    </html>
  );
}
