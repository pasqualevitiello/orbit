import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex border items-center justify-center gap-2 whitespace-nowrap rounded-md text-base/6 sm:text-sm/5 font-medium transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-primary/90 border-transparent text-primary-foreground hover:bg-primary",
        destructive:
          "bg-destructive/90 border-transparent text-white hover:bg-destructive",
        outline:
          "bg-background hover:bg-accent",
        secondary:
          "border-transparent text-secondary-foreground bg-secondary/50 hover:bg-secondary",
        ghost:
          "border-transparent hover:bg-accent dark:hover:bg-accent/50",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)]",
        sm: "gap-1.5 py-[calc(--spacing(1.5)-1px)] px-[calc(--spacing(2.5)-1px)]",
        lg: "px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)]",
        icon: "size-10 sm:size-9",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
