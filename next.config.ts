import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages deployment
  output: "export",

  images: {
    unoptimized: true, // Required for static export
  },

  // NOTE: Security headers are in public/_headers (Cloudflare Pages)
  // next.js headers() does not work with output: "export"
};

export default nextConfig;
