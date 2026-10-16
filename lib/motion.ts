import type { TargetAndTransition, Transition, Variants } from "motion/react"

/** Matches --ease-out-expo in globals.css. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const transition: Transition = { duration: 0.5, ease: easeOutExpo }

/** Scroll reveals fire once, when 30% of the element is visible. */
export const viewport = { once: true, amount: 0.3 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition },
}

/** Container variant that staggers its children (0.06–0.08s per CLAUDE.md). */
export const stagger = (delay = 0.07): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
})

/* ---- Chart presets (SVG). Children of a `stagger` container inherit hidden/show. ---- */

/** Vertical bar growing from its baseline. Origin lives here: Motion writes transform-origin inline on SVG. */
export const growY: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  show: { scaleY: 1, originY: 1, transition },
}

/** Horizontal bar growing from its start. */
export const growX: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, originX: 0, transition },
}

/** Line drawing time; `fadeInLate` waits for it so areas appear after their line. */
export const drawDuration = 1.2

export const drawLine: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { ...transition, duration: drawDuration } },
}

export const fadeInLate: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ...transition, delay: drawDuration * 0.75 } },
}

/** Faster stagger for many small marks (bars, tags). */
export const staggerFast = stagger(0.06)

/** Floating cards drift in after the hero visual has started (0.4s). */
export const floatIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { ...transition, delay: 0.4 } },
}

/** Tab panel swap: the incoming panel fades up 8px (0.35s), as in the Features tab strip. */
export const panelIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { ...transition, duration: 0.35 } },
}

/** Tour step swap: the outgoing mock fades out while the incoming one fades in, stacked in one cell. */
export const crossFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { ...transition, duration: 0.35 } },
  exit: { opacity: 0, transition: { ...transition, duration: 0.25 } },
}

/** "Click here" nudge over a hotspot: a small bob (static with reduced motion). */
export const nudgeBob: { animate: TargetAndTransition; transition: Transition } = {
  animate: { y: [0, -5, 0] },
  transition: { duration: 1.2, ease: "easeInOut", repeat: Infinity },
}

/** One pulse when a shared filter changes: every widget dips and returns together (opacity + scale only). */
export const widgetPulse = {
  opacity: [1, 0.45, 1],
  scale: [1, 0.985, 1],
  transition: { duration: 0.6, ease: easeOutExpo },
}

export const presets = { fadeUp, fadeIn, scaleIn, floatIn } as const
export type Preset = keyof typeof presets
