import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqPage, JsonLd } from "@/lib/seo"
import { cn } from "@/lib/utils"

export type Faq = { question: string; answer: string }

type FaqAccordionProps = {
  title: string
  items: readonly Faq[]
  /** Emit FAQPage JSON-LD (only where the FAQ is visible). */
  jsonLd?: boolean
  className?: string
}

/**
 * Heading left, questions right. First answer open; answers are force-mounted so every word is in
 * the server HTML (closed ones are `hidden`, not removed).
 */
export function FaqAccordion({ title, items, jsonLd = true, className }: FaqAccordionProps) {
  return (
    <section className={cn("container-site section-y grid items-start gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-14", className)}>
      <h2 className="text-h3 md:text-h2">{title}</h2>
      <Accordion type="single" collapsible defaultValue="faq-0" className="gap-2.5">
        {items.map((item, i) => (
          <AccordionItem key={item.question} value={`faq-${i}`} className="rounded-lg border border-border bg-card not-last:border-b">
            <AccordionTrigger className="min-h-14 items-center gap-3 rounded-lg px-4.5 py-3 font-heading text-[1.0625rem] font-bold hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent forceMount className="px-4.5 pb-4.5 text-[0.96875rem] text-neutral-text in-data-[state=closed]:hidden">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {jsonLd && <JsonLd data={faqPage(items.map(({ question, answer }) => ({ question, answer })))} />}
    </section>
  )
}
