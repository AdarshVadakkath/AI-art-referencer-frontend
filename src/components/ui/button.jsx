import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border-3 border-toon-dark bg-clip-padding text-sm font-extrabold whitespace-nowrap transition-all outline-none select-none rounded-xl shadow-toon-sm font-nunito active:not-aria-[haspopup]:translate-x-[2px] active:not-aria-[haspopup]:translate-y-[2px] active:not-aria-[haspopup]:shadow-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-toon-red text-white hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1A1A2E]",
        outline:
          "bg-white text-toon-dark hover:bg-toon-soft hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1A1A2E]",
        secondary:
          "bg-toon-yellow text-toon-dark hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1A1A2E]",
        ghost:
          "bg-white text-toon-dark hover:bg-toon-soft hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1A1A2E]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-toon-purple underline-offset-4 hover:underline border-0 shadow-none",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 py-2 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-lg px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-lg px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 px-5 py-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-lg",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
