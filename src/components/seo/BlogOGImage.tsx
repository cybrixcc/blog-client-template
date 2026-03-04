// TODO: Implement OG image component for blog articles
// Used in src/app/blog/<slug>/opengraph-image.tsx
//
// This component renders a 1200x630 image via @vercel/og (ImageResponse)
// The engine generates opengraph-image.tsx files that call:
//   BlogOGImage({ title, category })
//
// Requirements:
//   - Use ImageResponse from "next/og"
//   - Size: 1200x630
//   - Show article title and category badge
//   - Use brand colors and logo
//
// Example implementation:
//
// import { ImageResponse } from "next/og";
//
// interface BlogOGImageProps {
//   title: string;
//   category: string;
// }
//
// export function BlogOGImage({ title, category }: BlogOGImageProps) {
//   return new ImageResponse(
//     (
//       <div style={{ ... }}>
//         <span>{category}</span>
//         <h1>{title}</h1>
//       </div>
//     ),
//     { width: 1200, height: 630 }
//   );
// }

interface BlogOGImageProps {
  title: string;
  category: string;
}

// Placeholder — replace with real ImageResponse implementation
export function BlogOGImage({ title, category }: BlogOGImageProps) {
  void title;
  void category;
  return null;
}
