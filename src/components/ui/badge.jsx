import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-toon-dark px-2.5 py-0.5 text-xs font-extrabold font-nunito whitespace-nowrap shadow-toon-sm transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-toon-lavender text-toon-dark [a]:hover:bg-toon-lavender/80",
        secondary:
          "bg-toon-yellow text-toon-dark [a]:hover:bg-toon-yellow/80",
        destructive:
          "bg-toon-red/20 text-destructive [a]:hover:bg-toon-red/30",
        outline:
          "bg-white text-toon-dark [a]:hover:bg-toon-soft",
        ghost:
          "hover:bg-toon-soft hover:text-toon-dark border-transparent shadow-none",
        link: "text-toon-purple underline-offset-4 hover:underline border-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
