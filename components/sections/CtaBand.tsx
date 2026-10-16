import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type CtaBandProps = {
  title: string
  lead: string
  /** Field label, e.g. "Work email". */
  label: string
  placeholder: string
  buttonLabel: string
  /** Where the email is handed off (GET ?email=), so the form works without JS. */
  action: string
  id?: string
  className?: string
}

/** Navy closing band: H2, lead, work-email field and the filled CTA. */
export function CtaBand({ title, lead, label, placeholder, buttonLabel, action, id = "cta-email", className }: CtaBandProps) {
  return (
    <section className={cn("on-dark relative overflow-hidden bg-background section-y", className)}>
      <span aria-hidden="true" className="dot-grid-dark absolute bottom-0 left-0 h-60 w-90" />
      <div className="relative container-site">
        <div className="mx-auto flex max-w-205 flex-col items-center gap-5 text-center">
          <h2 className="text-h3 md:text-display">{title}</h2>
          <p className="text-base text-muted-foreground md:text-lg">{lead}</p>
          <form action={action} method="get" className="mt-2 flex w-full max-w-140 flex-col gap-3 text-left sm:flex-row sm:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Label htmlFor={id} className="text-sm font-medium text-on-dark-strong">
                {label}
              </Label>
              <Input
                id={id}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={placeholder}
                className="h-13 rounded-sm border-dark-border bg-secondary px-4 text-base text-secondary-foreground placeholder:text-neutral-text md:text-base"
              />
            </div>
            <Button type="submit" variant="cta" size="lg">
              {buttonLabel}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
