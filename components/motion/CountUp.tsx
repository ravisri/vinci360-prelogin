"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { easeOutExpo, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

type CountUpProps = {
  value: number
  format?: Intl.NumberFormatOptions
  locale?: string
  duration?: number
  className?: string
}

/** KPI number that counts up when in view; server HTML and screen readers get the final value. */
export function CountUp({ value, format, locale = "en-GB", duration = 1.2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, viewport)
  const reduced = useReducedMotion()
  // Integers stay whole while counting (no "48,151.258" mid-animation).
  const fmt = new Intl.NumberFormat(locale, format ?? (Number.isInteger(value) ? { maximumFractionDigits: 0 } : undefined))
  const final = fmt.format(value)

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return
    if (!inView) {
      node.textContent = fmt.format(0)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => (node.textContent = fmt.format(v)),
    })
    return () => controls.stop()
    // fmt is derived from locale/format; re-running on its identity would restart the count.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration])

  return (
    <span className={cn("tabular", className)}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  )
}
