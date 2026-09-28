import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-2.5 py-0.5 text-[0.65rem] whitespace-nowrap font-code font-medium uppercase tracking-[0.15em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20",
        secondary:
          "border-primary/30 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-destructive/60 bg-destructive/15 text-destructive hover:bg-destructive/25",
        outline:
          "border-redline/60 bg-redline/10 text-redline hover:bg-redline/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
