"use client"

import { m } from "motion/react"

import { ChartRoot } from "@/components/charts/ChartRoot"
import type { Sentiment } from "@/content/sample-data"
import { fadeIn } from "@/lib/motion"
import { sentimentGlyph, sentimentLabel, sentimentText } from "@/lib/sentiment"
import { cn } from "@/lib/utils"

export type Tag = { term: string; /** Font size in px (12–30). */ weight: number; sentiment: Sentiment }

type TagCloudProps = {
  data: readonly Tag[]
  ariaLabel: string
  align?: "start" | "center"
  className?: string
}

/** Weight is the font size in px from the reference; it snaps to the nearest literal size step. */
const STEPS = [
  { px: 12, size: "text-xs" },
  { px: 14, size: "text-sm" },
  { px: 16, size: "text-base" },
  { px: 18, size: "text-lg" },
  { px: 20, size: "text-xl" },
  { px: 24, size: "text-2xl" },
  { px: 30, size: "text-3xl" },
] as const
const stepFor = (px: number) => STEPS.reduce((best, s) => (Math.abs(s.px - px) < Math.abs(best.px - px) ? s : best))

/**
 * Word cloud: size encodes volume, glyph + colour encode mood. Text, not SVG, so it wraps
 * naturally; every term also carries a screen-reader mood label.
 */
export function TagCloud({ data, ariaLabel, align = "start", className }: TagCloudProps) {
  return (
    <ChartRoot className={className}>
      <ul aria-label={ariaLabel} className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", align === "center" && "justify-center")}>
        {data.map((t) => {
          const step = stepFor(t.weight)
          return (
            <m.li
              key={t.term}
              data-motion=""
              variants={fadeIn}
              className={cn(
                "leading-tight",
                step.size,
                t.weight > 20 ? "font-extrabold" : t.weight >= 15 ? "font-semibold" : "font-medium",
                sentimentText[t.sentiment],
              )}
            >
              <span aria-hidden="true">{sentimentGlyph[t.sentiment]} </span>
              {t.term}
              <span className="sr-only">, {sentimentLabel[t.sentiment].toLowerCase()}</span>
            </m.li>
          )
        })}
      </ul>
    </ChartRoot>
  )
}
