import type { Trend } from "@/content/sample-data"
import { trendGlyph, trendText, trendWord } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

/** "▲ 18.4% vs prev." — glyph + text + colour, with the direction spelled out for screen readers. */
export function Delta({ trend, children, className }: { trend: Trend; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-semibold tabular", trendText[trend], className)}>
      <span aria-hidden="true">{trendGlyph[trend]} </span>
      <span className="sr-only">{trendWord[trend]} </span>
      {children}
    </span>
  )
}
