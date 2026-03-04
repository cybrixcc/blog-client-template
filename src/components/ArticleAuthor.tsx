// Article author byline — shown at the top of every generated article.
//
// Engine passes: date (publish date string) and optional updated (last updated string).
// TODO: Replace "Editorial Team" and the avatar initials with the real author name/brand.

interface ArticleAuthorProps {
  date: string;
  updated?: string;
}

export function ArticleAuthor({ date, updated }: ArticleAuthorProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          {/* TODO: Replace "MB" with your brand initials */}
          <span className="text-primary text-xs font-bold">MB</span>
        </div>
        {/* TODO: Replace with your author/brand name */}
        <span>Editorial Team</span>
      </div>
      <span className="text-border">·</span>
      <span>{date}</span>
      {updated && updated !== date && (
        <>
          <span className="text-border">·</span>
          <span>Updated {updated}</span>
        </>
      )}
    </div>
  );
}
