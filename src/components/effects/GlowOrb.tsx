import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "blue" | "purple" | "plasma";
  className?: string;
  animate?: boolean;
}

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[600px] h-[600px]",
};

const colorMap = {
  blue: "bg-metal-blue-500/30",
  purple: "bg-metal-purple-500/30",
  plasma: "bg-gradient-radial from-metal-blue-500/30 via-metal-purple-500/20 to-transparent",
};

export const GlowOrb = ({
  size = "md",
  color = "blue",
  className,
  animate = true,
}: GlowOrbProps) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-[80px] pointer-events-none",
        sizeMap[size],
        colorMap[color],
        className
      )}
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }
          : undefined
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default GlowOrb;
