import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border-3 border-toon-dark bg-white px-3 py-1.5 text-base font-nunito-sans shadow-toon-sm transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-toon-dark placeholder:text-muted-foreground focus-visible:bg-toon-soft focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Input }
