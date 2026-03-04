// TODO: Implement article table of contents / navigation
// Shown on the side or top of blog articles
//
// Should include:
//   - Anchor links to H2/H3 headings in the article
//   - Sticky positioning on desktop
//   - "In this article" label
//
// Props:
//   headings: Array<{ id: string; text: string; level: number }>

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ArticleNavigationProps {
  headings?: Heading[];
}

export function ArticleNavigation({ headings = [] }: ArticleNavigationProps) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p>In this article</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12}px` }}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
