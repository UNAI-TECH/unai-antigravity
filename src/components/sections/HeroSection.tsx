import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/effects/ParticleField";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ArrowRight, Play } from "lucide-react";
import heroSphere from "@/assets/hero-sphere.jpg";

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Background Effects */}
      <GlowOrb size="xl" color="blue" className="-top-64 -right-64" />
      <GlowOrb size="lg" color="purple" className="bottom-0 -left-32" />
      <ParticleField count={40} />
      
      {/* Hero Image - Floating Sphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 w-[300px] md:w-[450px] lg:w-[550px] pointer-events-none"
      >
        <motion.img
          src={heroSphere}
          alt="Futuristic metallic sphere"
          className="w-full h-auto float-slow"
          style={{ filter: "drop-shadow(0 0 60px hsl(220 85% 55% / 0.3))" }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="max-w-3xl">
          {/* Pre-headline */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textRevealVariants}
            className="mb-6"
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
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
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
            className="text-xl text-muted-foreground mb-10 max-w-xl"
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
            className="flex flex-wrap gap-4"
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
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-heading font-bold text-gradient-energy mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-metal-blue-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
