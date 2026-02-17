import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { useData } from "@/context/DataContext";
import { ArrowRight, Calendar } from "lucide-react";
import { NetworkAnimation } from "@/components/effects/NetworkAnimation";

// --- Main Hero Section ---
export const HeroSection = () => {
  const { events } = useData();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { scrollY } = useScroll();
  const [showHeroLogo, setShowHeroLogo] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 120) {
        setShowHeroLogo(false);
      } else {
        setShowHeroLogo(true);
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Filter upcoming events
  const upcomingEvents = events.filter(e => e.status === "upcoming");

  // Define slides
  const defaultSlide = {
    id: "default",
    type: "default",
    titleLines: ["Architecting Intelligence", "for Tomorrow's", "Digital Ecosystem"],
    description: "Where artificial intelligence meets precision engineering — building adaptive systems that don't just process data, but understand context, anticipate needs, and evolve with purpose.",
    cta: { text: "Explore Our Ecosystem", link: "/services" }
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
    <section className="relative mx-4 my-4 rounded-[2.5rem] md:rounded-[4rem] min-h-[calc(100dvh-2rem)] overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 text-foreground flex items-center justify-center shadow-2xl border border-white/10">

      {/* Navbar */}
      <FloatingNavbar />

      <div className="container relative z-10 mx-auto section-padding pt-32 sm:pt-28 md:pt-32 max-w-7xl h-full flex flex-col justify-center">
        {/* Centered Content - Responsive */}
        <div className="flex flex-col items-center justify-center text-center w-full min-h-[50vh]">

          {/* Centered Hero Logo (Flying to Navbar) */}
          <div className="h-20 mb-4 flex items-center justify-center">
            <AnimatePresence>
              {showHeroLogo && (
                <motion.img
                  layoutId="unai-logo"
                  src="/unai-logo.png"
                  alt="UNAI TECH"
                  className="h-10 md:h-12 w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    opacity: { duration: 0.2 }
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center max-w-5xl will-change-transform"
            >
              {/* Event Badge */}
              {currentSlide.type === "event" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Upcoming Event</span>
                </motion.div>
              )}

              {/* Headline Group */}
              <div className="relative mb-6 md:mb-8 lg:mb-12">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] sm:leading-[1.2] tracking-tight font-heading">
                  {currentSlide.titleLines.map((line, index) => (
                    <span
                      key={index}
                      className={`block py-1 ${currentSlide.type === 'event'
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent'
                        : index === 0
                          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent'
                          : 'bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 bg-clip-text text-transparent'
                        }`}
                    >
                      {line}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Supporting Paragraph */}
              <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-3xl mb-6 md:mb-10 lg:mb-12 leading-relaxed font-medium px-4 md:px-0 tracking-tight">
                {currentSlide.description}
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 sm:px-0">
                <Link to={currentSlide.cta.link} className="w-full sm:w-auto">
                  <button className="w-full group relative tap-target px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(73,84,250,0.4)] active:scale-95 gpu-accelerated">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {currentSlide.cta.text}
                      {currentSlide.type === 'event' && <ArrowRight className="w-5 h-5" />}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </Link>

                {currentSlide.type === 'default' && (
                  <Link to="/contact" className="w-full sm:w-auto">
                    <button className="w-full group relative tap-target px-6 py-4 md:px-10 md:py-5 bg-white/40 backdrop-blur-md border border-purple-200 text-purple-900 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/60 active:scale-95 gpu-accelerated">
                      <span className="relative z-10">Schedule Intelligence Consultation</span>
                    </button>
                  </Link>
                )}
              </div>
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
                    ? "bg-purple-500 w-8"
                    : "bg-purple-300 hover:bg-purple-400"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Background Image at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none">
        <img
          src="/webbg.png"
          alt="Background"
          className="w-full h-auto object-cover opacity-80"
        />
      </div>
    </section>
  );
};
export default HeroSection;