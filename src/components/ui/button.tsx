import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-blue hover:shadow-glow-blue-strong",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-metal-blue-500/30 bg-transparent hover:bg-metal-blue-500/10 hover:border-metal-blue-500/50 text-foreground hover:shadow-glow-blue",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-glow-purple hover:shadow-glow-purple-strong",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-metal-blue-400 underline-offset-4 hover:underline",
        // MCP HERO VARIANTS
        hero: "relative overflow-hidden bg-gradient-metal text-white font-semibold px-8 py-4 rounded-xl shadow-glow-blue hover:shadow-glow-plasma transition-all duration-500 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        "hero-outline": "relative border-2 border-metal-blue-400/50 bg-transparent text-foreground font-semibold px-8 py-4 rounded-xl hover:border-metal-blue-400 hover:bg-metal-blue-500/10 hover:shadow-glow-blue transition-all duration-500 hover:scale-[1.02]",
        // GLASS VARIANT
        glass: "glass-metal rounded-xl text-foreground hover:shadow-glow-blue transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
