import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { ParticleField } from "@/components/effects/ParticleField";
import { ChevronDown } from "lucide-react";
import "@/utils/removeSplineLogo";

const timelineItems = [
  {
    year: "2018",
    title: "The Genesis",
    description: "UNAI TECH was founded with a singular vision: to create technology that transcends conventional boundaries. Starting with just 5 engineers, we set out to revolutionize the industry.",
  },
  {
    year: "2019",
    title: "First Major Breakthrough",
    description: "Launched our flagship AI platform, securing partnerships with Fortune 500 companies. Expanded team to 25 members.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Opened offices in London, Singapore, and Toronto. Team grew to 80+ engineers, designers, and strategists.",
  },
  {
    year: "2021",
    title: "Innovation Award",
    description: "Recognized as one of the top 10 innovative tech companies globally. Launched our cloud infrastructure division.",
  },
  {
    year: "2022",
    title: "Series B Funding",
    description: "Secured $50M in Series B funding. Expanded into cybersecurity and automation solutions.",
  },
  {
    year: "2024",
    title: "The Future Unfolds",
    description: "150+ team members across 12 countries. Pioneering next-gen AI and quantum computing solutions.",
  },
];

const values = [
  {
    title: "Innovation First",
    description: "We push boundaries and challenge conventions. Every solution we create is a step into the future.",
  },
  {
    title: "Excellence in Craft",
    description: "Quality is non-negotiable. Every line of code, every design decision is made with precision.",
  },
  {
    title: "Human-Centered",
    description: "Technology should serve humanity. We build solutions that enhance human potential.",
  },
  {
    title: "Radical Transparency",
    description: "Open communication and honesty drive our relationships with clients and within our team.",
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
    // Optimized scroll with requestAnimationFrame
    requestAnimationFrame(() => {
      setTimeout(() => {
        const visionSection = document.getElementById('vision-section');
        if (visionSection) {
          visionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
  };

  const handleShowLessClick = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      setShowContent(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />

      <main>
        {/* Hero Section */}
        <section id="hero-section" className="relative overflow-hidden min-h-screen flex items-center">
          <GlowOrb size="xl" color="plasma" className="top-0 left-1/2 -translate-x-1/2" />
          <ParticleField count={10} />

          <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* LEFT: 3D Spline Globe */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Spline Viewer */}
                <spline-viewer
                  url="https://prod.spline.design/zLgk1xhTqGvkI1z1/scene.splinecode"
                  className="w-full h-full"
                />
              </motion.div>

              {/* RIGHT: Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="relative group rounded-3xl p-8 lg:p-12 overflow-hidden"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Premium Glassmorphism Container Background */}
                <div className="absolute inset-0 bg-[#0B1221]/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:bg-[#0B1221]/60 group-hover:border-white/20 group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]" />

                {/* Animated Shine Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
                </div>

                {/* Lavender Glow Gradients */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col justify-center h-full">
                  <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-blue-300 mb-6 w-fit border border-white/5 shadow-sm backdrop-blur-md">
                    Our Journey
                  </span>

                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                    <span className="text-foreground">Shaping the Future of</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x bg-[length:200%_auto]">
                      AI Education
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground/90 max-w-xl mb-10 leading-relaxed font-light">
                    UNAI TECH is not just an EdTech startup; we are a movement. Our mission is to democratize AI literacy,
                    ensuring that students and freshers alike are well-equipped to harness the power of AI in their academic and professional journeys.
                  </p>

                  {/* Explore Now / Show Less Button */}
                  <div className="relative">
                    {!showContent ? (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        onClick={handleExploreClick}
                        className="group/btn relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95 inline-flex items-center gap-2 w-fit overflow-hidden"
                        style={{ willChange: "transform" }}
                      >
                        <span className="relative z-10">Explore Now</span>
                        <ChevronDown className="relative z-10 w-5 h-5 group-hover/btn:translate-y-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      </motion.button>
                    ) : (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleShowLessClick}
                        className="group/btn relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 inline-flex items-center gap-2 w-fit"
                        style={{ willChange: "transform" }}
                      >
                        <span className="relative z-10">Show Less</span>
                        <ChevronDown className="relative z-10 w-5 h-5 rotate-180 group-hover/btn:-translate-y-1 transition-transform" />
                      </motion.button>
                    )}
                  </div>
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

              {/* Vision Section */}
              <motion.section
                id="vision-section"
                className="relative py-32 overflow-hidden"
                {...fadeInUp}
                transition={{ duration: 0.5 }}
              >
                {/* Black Hole Video Background - Lazy loaded */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full max-w-[1000px] h-[800px] pointer-events-none z-0 opacity-100">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain mix-blend-screen"
                  >
                    <source src="/blackhole.webm" type="video/webm" />
                  </video>
                </div>

                <div className="container mx-auto px-6 relative z-10 pt-20">
                  {/* Glass Morphism Container */}
                  <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="glass-metal rounded-3xl p-8 md:p-12 border-t border-white/20 shadow-[0_0_50px_-10px_rgba(120,50,255,0.2)] bg-black/40 backdrop-blur-xl relative overflow-hidden"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Top Reflection/Glow Effect */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      <div>
                        <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
                          Our Vision
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6">
                          At UNAI TECH, we are shaping the future by making AI accessible to everyone.
                          Through our innovative courses, hands-on workshops, and cutting-edge research initiatives,
                          we are revolutionizing how AI is taught and applied in real-world scenarios.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          We focus exclusively on AI education, offering tailored courses and workshops that are
                          directly applicable to the industrial field, ensuring you gain skills that are in high demand.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                            className="glass-metal rounded-xl p-6 text-center hover:shadow-glow-blue transition-all duration-300 bg-black/20"
                            style={{ willChange: "transform" }}
                          >
                            <div className="text-3xl font-heading font-bold text-gradient-energy mb-2">
                              {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                className="relative py-24 overflow-hidden"
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

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="glass-metal rounded-xl p-6 hover:shadow-glow-purple transition-all duration-300 hover:-translate-y-2"
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default About;
