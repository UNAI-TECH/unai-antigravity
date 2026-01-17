import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: "blue" | "purple";
  delay: number;
  duration: number;
}

export const ParticleField = ({ count = 30 }: { count?: number }) => {
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    particles.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: Math.random() > 0.5 ? "blue" : "purple",
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background:
              particle.color === "blue"
                ? "radial-gradient(circle, hsl(220 85% 55% / 0.6), transparent)"
                : "radial-gradient(circle, hsl(265 75% 55% / 0.6), transparent)",
            boxShadow:
              particle.color === "blue"
                ? "0 0 10px hsl(220 85% 55% / 0.4)"
                : "0 0 10px hsl(265 75% 55% / 0.4)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
