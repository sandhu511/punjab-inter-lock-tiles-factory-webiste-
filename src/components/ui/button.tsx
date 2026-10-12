import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold cursor-pointer overflow-hidden transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed select-none will-change-transform group/btn [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/95 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:shadow-sm btn-shine",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/95 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-destructive/30 active:shadow-sm",
        outline:
          "border-2 border-foreground/80 bg-transparent text-foreground hover:bg-foreground hover:text-background hover:-translate-y-0.5 hover:shadow-md active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md active:shadow-xs",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-0",
        link:
          "text-primary underline-offset-4 hover:underline active:translate-y-0",
        ink:
          "bg-ink text-ink-foreground shadow-sm hover:bg-ink/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/40 active:shadow-sm btn-shine",
        glow:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/35 hover:bg-primary/95 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/45 active:shadow-sm btn-pulse btn-shine",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-11 rounded-sm px-7 text-sm uppercase tracking-wider",
        xl: "h-14 rounded-sm px-8 text-base uppercase tracking-wider font-bold",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
