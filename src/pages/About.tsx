import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import {
  Check, ArrowRight, Layers,
  Infinity as InfinityIcon, Workflow,
  Brain, Shield, Zap, RefreshCw, Handshake,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import { FoundersNote } from "@/components/sections/FoundersNote";
import { TeamSection } from "@/components/sections/TeamSection";
import SEO from "@/components/SEO";

// ─── Data ─────────────────────────────────────────────────────────────────────

const values = [
  { icon: Brain, title: "Intelligence-First Thinking", description: "Every system decision flows from a fundamental question: How does this enable more sophisticated intelligence?" },
  { icon: Zap, title: "Innovation Through Rigor", description: "Experimentation disciplined by engineering excellence. We explore frontier techniques while maintaining production-grade reliability." },
  { icon: Layers, title: "Architectural Integrity", description: "Professional code, elegant systems, scalable design. We believe how you build matters as much as what you build." },
  { icon: RefreshCw, title: "Continuous Evolution", description: "Stagnation is obsolescence. Our team maintains active engagement with AI research, emerging paradigms, and next-gen architectures." },
  { icon: Shield, title: "Responsible AI", description: "Power without wisdom is dangerous. We embed ethical reasoning, transparency, and human oversight into every intelligent system." },
  { icon: Handshake, title: "Partnership Over Transactions", description: "We don't deliver projects and disappear. We build long-term relationships where your success validates our engineering." },
];

const approach = [
  { n: "01", title: "Intelligence as Infrastructure", desc: "We treat AI like electricity — a foundational utility that powers everything else. Systems should be AI-native by default." },
  { n: "02", title: "Context Over Configuration", desc: "Systems should understand their environment and adapt. Less manual setup. More autonomous intelligence." },
  { n: "03", title: "Evolution Over Implementation", desc: "We don't build static solutions. We engineer platforms that improve through use, incorporating new capabilities without architectural overhauls." },
  { n: "04", title: "Simplicity Through Sophistication", desc: "The most advanced systems feel effortless. We handle complexity internally so users experience clarity." },
];

const visionPoints = [
  "AI is infrastructure, not a project",
  "Systems evolve autonomously without constant reconfiguration",
  "Intelligence amplifies human capability rather than replacing it",
  "Organizations operate at levels of sophistication currently unimaginable",
];

// ─── Scroll Section ────────────────────────────────────────────────────────────
interface SectionProps { id?: string; children: React.ReactNode; className?: string }
const ScrollSection = ({ id, children, className = "" }: SectionProps) => (
  <motion.section
    id={id}
    className={`relative py-16 sm:py-20 lg:py-28 overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.section>
);

// ─── Component ─────────────────────────────────────────────────────────────────
const About = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yCards = useTransform(scrollYProgress, [0, 1], ["0%", "36%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.lenis?.scrollTo(el.offsetTop, {
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Us"
        description="Learn about UNAI TECH's mission to engineer intelligence at scale and our intelligence-first principles."
      />

      <main>

        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section
          id="hero-section"
          ref={heroRef}
          className="
            relative flex items-center
            w-full
            min-h-[100svh]
            bg-[#f8faff] border-b border-slate-100
            shadow-[0_2px_40px_rgba(0,0,0,0.04)]
            overflow-hidden
          "
        >
          {/* Background parallax layer */}
          <motion.div
            style={{ y: yBg }}
            className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#f8faff]"
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_100%,transparent_100%)] opacity-40 animate-[grid-move_20s_linear_infinite]" />
            <style>{`
              @keyframes grid-move {
                0% { background-position: 0 0; }
                100% { background-position: 4rem 4rem; }
              }
            `}</style>

            {/* Animated Orbs */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/4 -translate-x-1/2 -mt-32 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/4 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-300/20 rounded-full blur-[120px]"
            />
          </motion.div>



          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10 w-full pt-28 sm:pt-32 pb-10 flex items-center min-h-[inherit]">
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-14">

              {/* Text */}
              <motion.div
                style={{ y: yText, opacity: heroOpacity }}
                className="relative w-full max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100/80 mb-6 sm:mb-7 justify-center lg:justify-start shadow-sm"
                >
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  <span className="text-[10px] sm:text-xs font-bold text-blue-800 tracking-widest uppercase">
                    Inside UNAI TECH
                  </span>
                </motion.div>

                {/* Headline */}
                <div className="relative mb-6 sm:mb-7 py-2 px-2 sm:px-0 rounded-3xl">
                  {/* Subtle glass effect behind text on mobile for readability */}
                  <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] rounded-3xl sm:hidden -z-10" />

                  <div className="font-heading font-bold leading-[1.05] tracking-tight flex flex-col text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.6rem] relative z-10">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                      className="text-slate-900"
                    >
                      We architect
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-500 bg-clip-text text-transparent relative pb-1 drop-shadow-sm"
                    >
                      AI‑native systems
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                      className="text-slate-500 font-medium mt-1 text-[1.4rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.2rem]"
                    >
                      that scale with intelligence.
                    </motion.span>
                  </div>
                </div>

                {/* Body */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-7 sm:mb-8 font-medium"
                >
                  UNAI TECH is a systems engineering studio built around one principle:
                  intelligence is infrastructure. We turn frontier AI into durable,
                  production‑grade capabilities embedded across your organization.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col xs:flex-row flex-wrap items-center lg:items-start justify-center lg:justify-start gap-4 mt-1"
                >
                  <button
                    onClick={() => scrollTo("vision-section")}
                    className="group relative w-full xs:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-slate-900 text-white rounded-full font-semibold text-sm tracking-wide flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(30,58,138,0.35)] hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/40 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10">How We Think</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="group relative w-full xs:w-auto px-7 sm:px-8 py-3.5 sm:py-4 text-slate-700 rounded-full font-semibold text-sm tracking-wide bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700 transition-all duration-300 text-center"
                  >
                    Talk To Our Team
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 group-hover:ring-blue-500/10 pointer-events-none" />
                  </button>
                </motion.div>
              </motion.div>

              {/* Right: visual card */}
              <motion.div
                style={{ y: yCards, opacity: heroOpacity }}
                className="w-full max-w-xl lg:max-w-lg xl:max-w-xl mt-6 lg:mt-0"
              >
                <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_22px_60px_rgba(15,23,42,0.18)] overflow-hidden">
                  {/* Accent line */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400" />

                  <div className="p-6 sm:p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div>
                        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mb-1">
                          Intelligence‑First Practice
                        </p>
                        <p className="text-sm sm:text-base font-medium text-slate-800">
                          From research prototypes to resilient systems.
                        </p>
                      </div>
                      <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-700">
                        <InfinityIcon className="w-5 h-5" strokeWidth={1.8} />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
                        <p className="text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1">
                          Systems Deployed
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-slate-900">10+</p>
                        <p className="text-[0.7rem] sm:text-xs text-slate-500 mt-0.5">
                          AI‑native platforms in production.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
                        <p className="text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-slate-400 mb-1">
                          Reliability
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-slate-900">99.9%</p>
                        <p className="text-[0.7rem] sm:text-xs text-slate-500 mt-0.5">
                          Designed for production‑grade uptime.
                        </p>
                      </div>
                    </div>

                    {/* Mini roadmap */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <Brain className="w-3.5 h-3.5" strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900">
                            Strategy & Architecture
                          </p>
                          <p className="text-[0.7rem] sm:text-xs text-slate-500">
                            We re‑frame your problem space through an intelligence‑first lens.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                          <Workflow className="w-3.5 h-3.5" strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900">
                            Build & Integration
                          </p>
                          <p className="text-[0.7rem] sm:text-xs text-slate-500">
                            We engineer end‑to‑end systems that meet real operational constraints.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            MISSION & VISION
        ═══════════════════════════════════════════ */}
        <ScrollSection id="vision-section" className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-10 sm:mb-14"
            >
              <span className="block h-px w-8 sm:w-10 bg-blue-400" />
              <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-blue-600">Our Purpose</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Mission + Vision */}
              <div className="space-y-10 sm:space-y-12">
                {[
                  {
                    label: "Mission",
                    color: "from-blue-700 to-indigo-600",
                    text: "To architect intelligent digital ecosystems where AI becomes foundational infrastructure — enabling organizations to operate with cognitive capabilities that were previously impossible.",
                  },
                  {
                    label: "Vision",
                    color: "from-indigo-700 to-blue-500",
                    text: "To establish UNAI TECH as the global reference point for AI-native systems engineering — recognized for transforming complexity into scalable intelligence across industries.",
                  },
                ].map(({ label, color, text }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-5 leading-tight">
                      Our{" "}
                      <span className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{label}</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Vision checklist */}
              <div>
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.5 }}
                  className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-400 mb-6 sm:mb-8"
                >
                  We Envision a World Where
                </motion.p>
                <div className="space-y-3 sm:space-y-4">
                  {visionPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 22 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-slate-50 hover:bg-blue-50/60 border border-transparent hover:border-blue-100 rounded-xl sm:rounded-2xl transition-all duration-300"
                    >
                      <div className="mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 font-medium leading-snug">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </ScrollSection>

        {/* ═══════════════════════════════════════════
            CORE VALUES
        ═══════════════════════════════════════════ */}
        <ScrollSection className="bg-[#f8faff]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-3 mb-4 sm:mb-5">
                <span className="block h-px w-6 sm:w-8 bg-blue-400" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-blue-600">What Drives Us</span>
                <span className="block h-px w-6 sm:w-8 bg-blue-400" />
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                Our Core{" "}
                <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Values</span>
              </h2>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {values.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, boxShadow: "0 18px 36px rgba(30,58,138,0.08)" }}
                  className="group bg-white border border-slate-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 hover:border-blue-100 transition-colors duration-300 cursor-default"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 mb-4 sm:mb-5 transition-colors">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">{title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* ═══════════════════════════════════════════
            HOW WE BUILD
        ═══════════════════════════════════════════ */}
        <ScrollSection className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="mb-10 sm:mb-14 lg:mb-16"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="block h-px w-8 sm:w-10 bg-blue-400" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-blue-600">Our Principles</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                How We Think<br className="hidden sm:block" /> About Building
              </h2>
            </motion.div>

            {/* 2×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100">
              {approach.map(({ n, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white p-6 sm:p-8 lg:p-10 hover:bg-blue-50/40 transition-colors duration-300"
                >
                  <span className="block text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-blue-100 leading-none mb-4 sm:mb-6 transition-colors select-none">
                    {n}
                  </span>
                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-2 sm:mb-3">{title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Founder's Note */}
        <div className="bg-[#f8faff]">
          <FoundersNote />
        </div>

        {/* Team Section */}
        <TeamSection />

        {/* Closing CTA */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <PremiumCTA
            title={<>Understand What{" "}<span className="text-blue-200">Intelligence-First</span>{" "}Engineering Means</>}
            description="UNAI TECH offers strategic consultations to help you assess AI readiness, identify high-impact opportunities, and design roadmaps for intelligent transformation."
            primaryButton={{
              label: "Schedule Strategic Session",
              onClick: () => navigate("/contact"),
            }}
          />
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
