import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/effects/ParticleField";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ArrowRight, Play } from "lucide-react";

const textRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Helper overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20" />
      </div>

      {/* Background Effects */}
      <ParticleField count={30} />

      {/* Content - Aligned to Right */}
      <div className="container mx-auto px-6 pt-20 pb-16 relative z-10 flex justify-end items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl glass-metal rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl bg-black/40 border-l border-t border-white/20 shadow-2xl"
        >
          {/* Flowing Light Effect (Left to Right) */}
          <motion.div
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            initial={{ left: "-50%" }}
            animate={{ left: "150%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />

          {/* Pre-headline */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="mb-6 relative z-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300">
              <span className="w-2 h-2 rounded-full bg-metal-blue-400 animate-pulse" />
              Next-Gen Technology Solutions
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight relative z-10"
          >
            <span className="text-foreground">Building the</span>
            <br />
            <span className="text-gradient-metal">Future of Tech</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl relative z-10"
          >
            We forge innovative solutions that transcend boundaries.
            Experience technology that feels weightless, yet carries immense power.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="flex flex-wrap gap-4 relative z-10"
          >
            <Button variant="hero" size="xl" className="group">
              Start Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero-outline" size="xl" className="group">
              <Play size={18} className="mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="mt-12 grid grid-cols-3 gap-6 relative z-10"
          >
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-heading font-bold text-gradient-energy mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
