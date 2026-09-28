import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-code font-medium uppercase tracking-[0.15em] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative border border-primary/70 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[4px_4px_0_0_hsl(var(--redline))]",
        destructive:
          "relative border border-destructive/70 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground",
        outline:
          "relative border border-primary/40 bg-transparent text-foreground hover:border-accent/70 hover:bg-accent/10 hover:text-accent hover:shadow-[4px_4px_0_0_hsl(var(--accent)/0.35)]",
        secondary:
          "relative border border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
        link:
          "text-accent underline-offset-4 hover:underline tracking-normal",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
