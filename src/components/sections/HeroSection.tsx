import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import GradientBlinds from "@/components/effects/GradientBlinds";
import { useData } from "@/context/DataContext";
import { ArrowRight, Calendar } from "lucide-react";

// --- Main Hero Section ---
export const HeroSection = () => {
  const { events } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Filter upcoming events
  const upcomingEvents = events.filter(e => e.status === "upcoming");

  // Define slides
  const defaultSlide = {
    id: "default",
    type: "default",
    titleLines: ["Learn AI.", "Do Nothing.", "Empower Everything."],
    description: "At UNAI TECH, we are shaping the future by making AI accessible to everyone. Transforming education with innovative AI courses, practical skills, and cutting-edge research.",
    cta: { text: "Start Learning AI", link: "/services" }
  };

  const eventSlides = upcomingEvents.map(event => ({
    id: event.id,
    type: "event",
    titleLines: [event.title],
    description: `${event.description} • ${event.date}`,
    cta: { text: "Register Now", link: "/events" },
    meta: { date: event.date, location: event.location }
  }));

  const slides = [defaultSlide, ...eventSlides];

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentSlideIndex];

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

      <div className="container relative z-10 mx-auto section-padding pt-28 md:pt-32 max-w-7xl h-full flex flex-col justify-center">
        {/* Centered Content - Responsive */}
        <div className="flex flex-col items-center justify-center text-center w-full min-h-[50vh]">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center max-w-5xl"
            >
              {/* Event Badge */}
              {currentSlide.type === "event" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-metal-purple-500/20 border border-metal-purple-500/30 text-metal-purple-300 backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Upcoming Event</span>
                </motion.div>
              )}

              {/* Headline Group */}
              <div className="relative mb-6 md:mb-8 lg:mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight font-sans text-white">
                  {currentSlide.titleLines.map((line, index) => (
                    <span
                      key={index}
                      className={`block ${index === 1 && currentSlide.type === 'default' ? 'text-[#E2E8F0]' :
                          index === 2 && currentSlide.type === 'default' ? 'text-[#CBD5E1]' :
                            currentSlide.type === 'event' ? 'text-gradient-metal' : 'text-white'
                        }`}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Supporting Paragraph */}
              <p className="text-responsive-lg text-gray-400 max-w-3xl mb-8 md:mb-10 lg:mb-12 leading-relaxed font-light px-4 md:px-0">
                {currentSlide.description}
              </p>

              {/* CTA Button */}
              <Link to={currentSlide.cta.link}>
                <button className="group relative tap-target px-6 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 gpu-accelerated">
                  <span className="relative z-10 flex items-center gap-2">
                    {currentSlide.cta.text}
                    {currentSlide.type === 'event' && <ArrowRight className="w-5 h-5" />}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlideIndex
                      ? "bg-white w-8"
                      : "bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
