import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ColumnGridBackground = () => {
  // 12 columns total
  // Edge columns (0, 11) are tallest
  // Center columns (5, 6) are shortest
  const getColHeight = (index: number) => {
    const centerDist = Math.abs(index - 5.5);
    // distance from center (0.5 to 5.5)
    // Map centerDist to height percentage
    // 5.5 -> 75%, 4.5 -> 65%, 3.5 -> 55%, 2.5 -> 45%, 1.5 -> 35%, 0.5 -> 25%
    return 15 + (centerDist * 12);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-white pointer-events-none">
      {/* The Framing Grid */}
      <div className="flex items-end w-full h-full px-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: `${getColHeight(i)}%` }}
            transition={{
              duration: 1.2,
              delay: i * 0.08,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="relative flex-1"
            style={{
              background: `linear-gradient(to top, 
                rgba(13, 40, 114, 0.95) 0%, 
                rgba(56, 112, 177, 0.8) 40%,
                rgba(255, 255, 255, 0) 100%
              )`
            }}
          />
        ))}
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent h-1/2" />
    </div>
  );
};

export default ColumnGridBackground;
