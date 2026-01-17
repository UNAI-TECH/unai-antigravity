import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "plasma";
  hover?: boolean;
}

export const GlassCard = ({
  children,
  className,
  glowColor = "blue",
  hover = true,
  ...props
}: GlassCardProps) => {
  const glowStyles = {
    blue: "hover:shadow-glow-blue",
    purple: "hover:shadow-glow-purple",
    plasma: "hover:shadow-glow-plasma",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass-metal rounded-2xl p-6 glow-border transition-all duration-500",
        hover && glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
