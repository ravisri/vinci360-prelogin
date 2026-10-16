"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/** "MSRcosmos" placeholder link: focusable with a tooltip, no navigation until the URL is confirmed. */
export function MsrcosmosLink() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          role="link"
          tabIndex={0}
          aria-disabled="true"
          className="cursor-help rounded-xs font-bold text-foreground underline decoration-dotted underline-offset-3"
        >
          MSRcosmos
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        Opens msrcosmos.com in a new tab
      </TooltipContent>
    </Tooltip>
  )
}
