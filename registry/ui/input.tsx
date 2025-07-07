import * as React from "react"

import { Input as InputPrimitive } from '@base-ui-components/react/input';
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/64 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)] text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
        "focus-visible:border-ring/80",
        "aria-invalid:border-destructive/50 focus-visible:aria-invalid:border-destructive/80",
        className
      )}
      {...props}
    />
  )
}

export { Input }