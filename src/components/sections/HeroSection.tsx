import React from "react";
import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import GradientBlinds from "@/components/effects/GradientBlinds";

// --- Main Hero Section ---
export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-black text-white flex items-center justify-center">
      {/* 1. Background System - GradientBlinds */}
      <div className="absolute inset-0 z-0 gpu-accelerated">
        <GradientBlinds
          gradientColors={['#1a1a2e', '#0f3460', '#16213e', '#000000']}
          angle={0}
          noise={0.1}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.8}
          spotlightSoftness={2}
          spotlightOpacity={0.4}
          mouseDampening={0.35}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="normal"
        />

        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Navbar */}
      <FloatingNavbar />

      <div className="container relative z-10 mx-auto section-padding max-w-7xl h-full flex flex-col justify-center">
        {/* Centered Content - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center w-full animate-optimized"
        >
          {/* Headline Group - Responsive Typography */}
          <div className="relative mb-6 md:mb-8 lg:mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight font-sans text-white">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Learn AI.
              </motion.span>
              <motion.span
                className="block text-[#E2E8F0]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                Do Nothing.
              </motion.span>
              <motion.span
                className="block text-[#CBD5E1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Empower Everything.
              </motion.span>
            </h1>
          </div>

          {/* Supporting Paragraph - Responsive */}
          <motion.p
            className="text-responsive-lg text-gray-400 max-w-3xl mb-8 md:mb-10 lg:mb-12 leading-relaxed font-light px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            At UNAI TECH, we are shaping the future by making AI accessible to everyone.
            Transforming education with innovative AI courses, practical skills, and cutting-edge research.
          </motion.p>

          {/* Primary CTA Button - Responsive & Touch-Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="will-change-transform"
          >
            <button className="group relative tap-target px-6 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 gpu-accelerated">
              <span className="relative z-10">Start Learning AI</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
