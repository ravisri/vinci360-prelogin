import type { Benefit } from "@/components/sections/BenefitList"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { accents, type Accent } from "@/lib/accents"
import { cn } from "@/lib/utils"

type WhoOpensThisPageProps = {
  title: string
  items: readonly Benefit[]
  accent: Accent
  columns?: 3 | 4
  className?: string
}

/** "Who opens this page": pill cards with an accent icon, a role and one line on why. */
export function WhoOpensThisPage({ title, items, accent, columns = 4, className }: WhoOpensThisPageProps) {
  const a = accents[accent]
  return (
    <section className={cn("container-site flex flex-col gap-4 pb-6", className)}>
      <SectionHeader title={title} size="small" />
      <ul className={cn("grid gap-3 md:grid-cols-2 md:gap-4", columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
        {items.map(({ icon: Icon, title: role, text }) => (
          <li key={role} className="flex items-start gap-3 rounded-full border border-border bg-card px-5 py-3.5">
            <Icon aria-hidden="true" strokeWidth={2} className={cn("mt-px size-5.5 flex-none", a.text)} />
            <span>
              <strong className="block text-[0.9375rem]">{role}</strong>
              <span className="block text-[0.84375rem] text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
