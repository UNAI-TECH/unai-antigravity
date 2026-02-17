import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";
import { ChevronDown, Check, ArrowRight, Cpu, Zap, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import { FoundersNote } from "@/components/sections/FoundersNote";
import { CognitiveForge } from "@/components/effects/CognitiveForge";


const timelineItems = [
  {
    year: "Philosophy",
    title: "From Curiosity to Cognitive Systems",
    description: "UNAI TECH was born from deep fascination with how intelligence emerges. We bridge the gap between AI research and practical business implementation.",
  },
  {
    year: "Breakthrough",
    title: "The Turning Point",
    description: "We stopped asking 'What can AI do?' and started asking 'What would systems look like if intelligence was the default state?' That reframe changed everything.",
  },
  {
    year: "Default State",
    title: "Intelligence-First Principles",
    description: "Instead of adding AI features to existing software, we began architecting entire systems around intelligence-first principles.",
  },
];

const values = [
  {
    title: "Innovation Through Rigor",
    description: "Experimentation disciplined by engineering excellence. We explore frontier techniques while maintaining production-grade reliability.",
  },
  {
    title: "Intelligence-First Thinking",
    description: "Every system decision flows from a fundamental question: How does this enable more sophisticated intelligence?",
  },
  {
    title: "Architectural Integrity",
    description: "Professional code, elegant systems, scalable design. We believe how you build matters as much as what you build.",
  },
  {
    title: "Continuous Evolution",
    description: "Stagnation is obsolescence. Our team maintains active engagement with AI research, emerging paradigms, and next-gen architectures.",
  },
  {
    title: "Responsible AI",
    description: "Power without wisdom is dangerous. We embed ethical reasoning, transparency, and human oversight into every intelligent system.",
  },
  {
    title: "Partnership Over Transactions",
    description: "We don't deliver projects and disappear. We build long-term relationships where your success validates our engineering.",
  },
];

// Optimized animation variants for better performance
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const About = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  // Memoize stats data to prevent re-renders
  const stats = useMemo(() => [
    { value: "380+", label: "Students Reached" },
    { value: "100+", label: "College Students Trained" },
    { value: "15+", label: "Real-world Projects" },
    { value: "20+", label: "Workshops Conducted" },
  ], []);

  const handleExploreClick = () => {
    setShowContent(true);
    // Use Lenis for smooth scroll
    setTimeout(() => {
      const visionSection = document.getElementById('vision-section');
      if (visionSection) {
        const targetPosition = visionSection.offsetTop;
        window.lenis?.scrollTo(targetPosition, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }, 100);
  };

  const handleShowLessClick = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      const targetPosition = heroSection.offsetTop;
      window.lenis?.scrollTo(targetPosition, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
    setTimeout(() => {
      setShowContent(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />

      <main>
        {/* Hero Section */}
        <section id="hero-section" className="relative mx-4 my-4 rounded-[2.5rem] md:rounded-[4rem] h-[calc(100dvh-2rem)] min-h-[650px] overflow-hidden flex items-center shadow-2xl border border-white/10">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/about-hero-bg.jpg"
              alt="About Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <GlowOrb size="xl" color="plasma" className="top-0 left-1/2 -translate-x-1/2" />
          <ParticleField count={10} />

          {/* Content Container - Two Column Layout */}
          <div className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-8 sm:pb-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10"
              >


                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight leading-[1.2]" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.4), 0 2px 15px rgba(0,0,0,0.2)' }}>
                  <span className="text-white block py-1">Engineering</span>
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent block py-1">
                    Intelligence at Scale
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-8 sm:mb-10 leading-relaxed font-medium drop-shadow-md tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                  UNAI TECH is an AI-native technology company operating at the intersection of artificial intelligence research, systems engineering, and intelligent automation.
                  What began as experimental work in machine learning and adaptive systems has evolved into a comprehensive technology practice delivering production-grade AI solutions.
                </p>

                {/* Explore Now / Show Less Button */}
                <div className="relative">
                  {!showContent ? (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      onClick={handleExploreClick}
                      className="group/btn relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 text-white rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(73,84,250,0.5)] active:scale-95 flex items-center justify-center gap-2 w-full sm:w-fit overflow-hidden"
                      style={{ willChange: "transform" }}
                    >
                      <span className="relative z-10">Explore Now</span>
                      <ChevronDown className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-y-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    </motion.button>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleShowLessClick}
                      className="group/btn relative px-6 sm:px-8 py-3 sm:py-4 bg-white border border-gray-300 text-gray-700 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50 hover:shadow-sm active:scale-95 flex items-center justify-center gap-2 w-full sm:w-fit"
                      style={{ willChange: "transform" }}
                    >
                      <span className="relative z-10">Show Less</span>
                      <ChevronDown className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 rotate-180 group-hover/btn:-translate-y-1 transition-transform" />
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Right: Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center"
              >
                <div className="w-full h-full relative flex items-center justify-center">
                  <CognitiveForge />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Conditionally Rendered Content with Smooth Animations */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key="content"
              {...fadeIn}
              transition={{ duration: 0.4 }}
            >
              <div className="energy-line" />

              <motion.section
                id="vision-section"
                className="relative py-14 lg:py-24 overflow-hidden"
                {...fadeInUp}
                transition={{ duration: 0.5 }}
              >
                <div className="container mx-auto px-6 relative z-10">
                  {/* Simple White Container */}
                  <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="glass-premium glass-premium-hover glass-shine rounded-3xl p-8 md:p-12 relative overflow-hidden"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      <div>
                        <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
                          Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                          To architect intelligent digital ecosystems where AI becomes foundational infrastructure — enabling organizations to operate with cognitive capabilities that were previously impossible.
                        </p>

                        <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
                          Our Vision
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          To establish UNAI TECH as the global reference point for AI-native systems engineering — recognized for transforming complexity into scalable intelligence across industries.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">We envision a world where:</h3>
                        {[
                          "AI is infrastructure, not a project",
                          "Systems evolve autonomously without constant reconfiguration",
                          "Intelligence amplifies human capability rather than replacing it",
                          "Organizations operate at levels of sophistication currently unimaginable"
                        ].map((point, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 glass-premium rounded-xl"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Check className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-700 font-medium">{point}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              <div className="energy-line" />

              {/* Values Section */}
              <motion.section
                className="relative py-14 lg:py-24 overflow-hidden"
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <GlowOrb size="md" color="blue" className="bottom-20 right-0" />

                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-16"
                  >
                    <h2 className="font-heading text-4xl font-bold mb-6">
                      <span className="text-foreground">Our </span>
                      <span className="text-gradient-metal">Core Values</span>
                    </h2>
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="glass-premium glass-premium-hover glass-shine rounded-xl p-6 transition-all duration-300 hover:-translate-y-2"
                        style={{ willChange: "transform" }}
                      >
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <div className="energy-line" />

              {/* Approach Section */}
              <motion.section
                className="relative py-14 lg:py-24 overflow-hidden"
                {...fadeInUp}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="container mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
                      How We Think About Building
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                      { title: "Intelligence as Infrastructure", desc: "We treat AI like electricity — a foundational utility that powers everything else. Systems should be AI-native by default." },
                      { title: "Context Over Configuration", desc: "Systems should understand their environment and adapt. Less manual setup. More autonomous intelligence." },
                      { title: "Evolution Over Implementation", desc: "We don't build static solutions. We engineer platforms that improve through use, incorporating new capabilities without architectural overhauls." },
                      { title: "Simplicity Through Sophistication", desc: "The most advanced systems feel effortless. We handle complexity internally so users experience clarity." }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-8 glass-premium rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
                      >
                        <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">0{index + 1} — {item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <div className="energy-line" />

              {/* Founder's Note Section */}
              <FoundersNote />

              {/* Closing CTA */}
              <section className="py-24 px-4 sm:px-6">
                <PremiumCTA
                  title={<>Understand What <span className="text-blue-400">Intelligence-First</span> Engineering Means</>}
                  description="UNAI TECH offers strategic consultations to help you assess AI readiness, identify high-impact opportunities, and design roadmaps for intelligent transformation."
                  primaryButton={{
                    label: "Schedule Strategic Session",
                    onClick: () => navigate('/contact')
                  }}
                />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default About;
