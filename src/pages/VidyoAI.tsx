import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowRight, Brain, Zap, PlayCircle,
    Route, Sparkles, BarChart3, Target,
    BookOpen, Cpu, Rocket, Quote, Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";


// ─── Features Data ─────────────────────────────────────────────────────────────

const features = [
    {
        id: 1,
        icon: Route,
        title: "Personalized Learning Paths",
        content: "AI maps your goals, gaps, and pace to craft a dynamic curriculum that evolves as you grow — no two paths are alike.",
        date: "Phase 1",
        category: "Learning",
        relatedIds: [2, 3],
        status: "completed" as const,
        energy: 95
    },
    {
        id: 2,
        icon: PlayCircle,
        title: "AI Content Generation",
        content: "Subject matter transformed into short-form videos, interactive explainers, and narrative-driven lessons.",
        date: "Phase 2",
        category: "Content",
        relatedIds: [1, 3],
        status: "completed" as const,
        energy: 85
    },
    {
        id: 3,
        icon: Brain,
        title: "Agentic Study Agents",
        content: "Autonomous AI agents that proactively schedule sessions, retrieve resources, and adjust your plan.",
        date: "Phase 3",
        category: "Agents",
        relatedIds: [1, 2, 4],
        status: "in-progress" as const,
        energy: 70
    },
    {
        id: 4,
        icon: Rocket,
        title: "Real-Time Tech Updates",
        content: "Curated feeds of emerging technology breakthroughs delivered in digestible, structured formats.",
        date: "Continuous",
        category: "Updates",
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 60
    },
    {
        id: 5,
        icon: Target,
        title: "Adaptive Assessment Engine",
        content: "Smart evaluations that measure deep understanding and feed results back into your learning loop.",
        date: "Beta",
        category: "Assessment",
        relatedIds: [4, 6],
        status: "pending" as const,
        energy: 40
    },
    {
        id: 6,
        icon: BarChart3,
        title: "Progress Intelligence",
        content: "A live dashboard that tracks mastery, flags blind spots, and projects your learning trajectory.",
        date: "Coming Soon",
        category: "Analytics",
        relatedIds: [5],
        status: "pending" as const,
        energy: 20
    }
];

// ─── Vision Pillars ────────────────────────────────────────────────────────────

const pillars = [
    {
        icon: BookOpen,
        title: "Education via Entertainment",
        description: "AI-generated content that teaches through stories, visuals, and immersive formats students actually enjoy."
    },
    {
        icon: Cpu,
        title: "Agentic Learning Systems",
        description: "Autonomous AI agents that plan, adapt, and orchestrate your unique learning journey in real time."
    },
    {
        icon: Sparkles,
        title: "Emerging Tech Advancement",
        description: "Continuously updated with the latest breakthroughs — keeping students ahead of every curve."
    }
];

// ─── Hero Stats ────────────────────────────────────────────────────────────────

const stats = [
    { value: "3.0", label: "Education generation" },
    { value: "AI-First", label: "Fully agentic platform" },
    { value: "∞", label: "Personalized learning paths" }
];

// ─── Scroll Section ────────────────────────────────────────────────────────────

interface SectionProps { id?: string; children: React.ReactNode; className?: string }
const ScrollSection = ({ id, children, className = "" }: SectionProps) => (
    <motion.section
        id={id}
        className={`relative py-20 lg:py-32 overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.section>
);

// ─── Component ─────────────────────────────────────────────────────────────────
const VidyoAI = () => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activePillar, setActivePillar] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActivePillar((prev) => (prev + 1) % pillars.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
            <SEO
                title="Vidyo AI | Education Through Entertainment"
                description="Vidyo AI is redefining how college students learn — merging AI-driven content, agentic learning systems, and immersive entertainment to deliver Education 3.0."
            />

            <main className="overflow-x-hidden">

                {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-white"
                >
                    {/* Background */}
                    <div className="absolute inset-0 z-0 text-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_100%,transparent_100%)] opacity-30" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 50, 0] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px]"
                        />
                    </div>

                    <div className="container relative z-10 max-w-6xl mx-auto">
                        <motion.div style={{ y: yText, opacity: opacityHero }} className="text-center relative">
                            {/* Background Design Blobs (Figma Inspired) */}
                            <div className="absolute inset-0 -z-10 pointer-events-none overflow-visible">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                        x: [-20, 20, -20],
                                        y: [-10, 10, -10],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -left-20 top-0 w-96 h-96 bg-blue-400/20 blur-[100px] rounded-full"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.2, 0.4, 0.2],
                                        x: [20, -20, 20],
                                        y: [10, -10, 10],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute -right-20 top-20 w-[500px] h-[500px] bg-indigo-400/20 blur-[120px] rounded-full"
                                />
                            </div>

                            {/* Large Headline: Education 3.0 with Typing Effect */}
                            <motion.h1
                                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 mb-4 leading-[0.85]"
                            >
                                {"Education 3.0".split("").map((char, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.1,
                                            delay: index * 0.1,
                                            ease: "easeIn"
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            {/* Smaller Sub-title: Education meets Entertainment */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.4 }}
                                className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-10 tracking-tight"
                            >
                                Education meets Entertainment.
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.8 }}
                                className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-6 leading-relaxed font-medium"
                            >
                                Vidyo AI is redefining how college students learn — merging AI-driven content, agentic learning systems, and immersive entertainment.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 2.0 }}
                                className="text-lg sm:text-xl md:text-2xl text-slate-900 max-w-2xl mx-auto mb-10 leading-relaxed font-bold text-center"
                            >
                                Stop studying harder. Start learning smarter.
                            </motion.p>

                            {/* Coming Soon Animated Effect */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="mt-12 flex flex-col items-center"
                            >
                                <div className="relative group">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full"
                                    />

                                    <div className="relative flex flex-col items-center gap-4">
                                        <motion.div
                                            className="text-4xl md:text-5xl font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                                            animate={{
                                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                            }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{ backgroundSize: "200% auto" }}
                                        >
                                            Coming soon...
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1, duration: 1 }}
                                            className="text-slate-400 font-medium tracking-widest uppercase text-xs mt-4"
                                        >
                                            Something revolutionary is in the works
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
            ABOUT / VISION (Glassmorphic Side-by-Side)
        ═══════════════════════════════════════════ */}
                <ScrollSection id="about-vidyo" className="relative z-10 selection:bg-indigo-500/30 selection:text-white py-20 lg:py-32">
                    <div className="container max-w-[1600px] mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden rounded-[3.5rem] p-8 md:p-16 lg:p-20 bg-slate-950 border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
                        >
                            {/* Decorative Background for Card */}
                            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[120px] rounded-full opacity-50" />
                                <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full opacity-30" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                                {/* Left Side: Text Content */}
                                <div className="text-left space-y-8">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-4"
                                    >
                                        <span className="text-sm font-black tracking-[0.5em] uppercase text-indigo-400">Our Vision</span>
                                        <span className="block h-px w-16 bg-gradient-to-r from-indigo-500/50 to-transparent" />
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white mb-6"
                                    >
                                        {"Built for the Next Generation".split(" ").map((word, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
                                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                                className="inline-block mr-3"
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                        <br />
                                        <span className="text-indigo-400 italic font-medium mt-2 block">of Learners.</span>
                                    </motion.h2>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="space-y-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-medium max-w-xl"
                                    >
                                        <p>
                                            At UNAI Tech, we believe education should never feel like a burden. Vidyo AI was born from a simple conviction: <strong className="text-white">when learning is engaging, it becomes unstoppable.</strong>
                                        </p>
                                        <p>
                                            We combine cutting-edge agentic AI systems with entertainment-first content design — creating an adaptive learning environment that understands each student.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Right Side: Auto-Carousel */}
                                <div className="relative w-full h-[400px] flex items-center justify-center lg:justify-end">
                                    <div className="relative w-full max-w-[450px]">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activePillar}
                                                initial={{ opacity: 0, scale: 0.9, x: 50, filter: "blur(10px)" }}
                                                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                                                exit={{ opacity: 0, scale: 0.9, x: -50, filter: "blur(10px)" }}
                                                transition={{ duration: 0.8, ease: "circOut" }}
                                                className="group relative w-full aspect-square sm:aspect-auto sm:h-[380px] p-10 rounded-[3rem] bg-indigo-500/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all duration-500 flex flex-col items-center justify-center text-center backdrop-blur-md shadow-2xl"
                                            >
                                                {/* Floating Icon */}
                                                <motion.div
                                                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-600/20 to-purple-600/20 flex items-center justify-center text-indigo-400 mb-8 border border-white/5 shadow-xl"
                                                >
                                                    {(() => {
                                                        const Icon = pillars[activePillar].icon;
                                                        return <Icon size={40} />;
                                                    })()}
                                                </motion.div>

                                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">{pillars[activePillar].title}</h3>
                                                <p className="text-slate-400 leading-relaxed text-base sm:text-lg">{pillars[activePillar].description}</p>

                                                {/* Nav Dots */}
                                                <div className="absolute bottom-10 flex gap-3">
                                                    {pillars.map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1.5 transition-all duration-500 rounded-full ${i === activePillar ? 'w-10 bg-indigo-500' : 'w-2 bg-white/10'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Background Glow for Carousel */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.3, 0.6, 0.3],
                                            }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/20 blur-[100px] rounded-full"
                                        />

                                        {/* Floating Animated Icons */}
                                        {[Brain, PlayCircle, Rocket, Sparkles, Target, Cpu].map((Icon, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    y: [0, Math.sin(i) * 30, 0],
                                                    x: [0, Math.cos(i) * 30, 0],
                                                    opacity: [0.2, 0.5, 0.2],
                                                    rotate: [0, 10, 0]
                                                }}
                                                transition={{
                                                    duration: 5 + i,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: i * 0.5
                                                }}
                                                className="absolute text-indigo-400/30 pointer-events-none hidden lg:block"
                                                style={{
                                                    top: `${20 + (i * 15)}%`,
                                                    left: i % 2 === 0 ? '-10%' : '105%',
                                                }}
                                            >
                                                <Icon size={32 + (i * 4)} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </ScrollSection>

                {/* ═══════════════════════════════════════════
            FEATURES (Interactive Orbital Timeline)
        ═══════════════════════════════════════════ */}
                <ScrollSection className="bg-white py-24 lg:py-32 overflow-visible border-y border-slate-100">
                    <div className="container max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                            {/* Interactive Orbital Timeline (Left) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative order-2 lg:order-1 h-[500px] sm:h-[600px] flex items-center justify-center -mx-4 sm:mx-0"
                            >
                                <div className="absolute inset-0 bg-blue-50/50 rounded-[4rem] -z-10 blur-3xl opacity-50" />
                                <RadialOrbitalTimeline timelineData={features} />
                            </motion.div>

                            {/* Header & Description (Right) */}
                            <div className="order-1 lg:order-2 text-left relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-3 mb-6"
                                >
                                    <span className="block h-px w-8 bg-blue-600" />
                                    <span className="text-xs font-bold tracking-widest uppercase text-blue-600">The Ecosystem</span>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight"
                                >
                                    The Future of Learning, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                        Is Interactive.
                                    </span>
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-6 text-lg sm:text-xl text-slate-600 font-medium max-w-xl"
                                >
                                    <p>
                                        Vidyo AI isn't just a platform; it's a living ecosystem where every component works in perfect harmony to accelerate your growth.
                                    </p>
                                    <div className="pt-4 flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            Real-time Sync
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                            Adaptive Core
                                        </div>
                                    </div>
                                    <p className="text-base text-slate-500 font-normal">
                                        Explore the nodes on the left to discover how our agentic AI integrates into your daily study habit.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </ScrollSection>

                {/* ═══════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════ */}
                <section className="py-24 px-4 bg-slate-50">
                    <PremiumCTA
                        title={<>Ready to Experience <br /><span className="text-blue-300">Education 3.0</span>?</>}
                        description="Join the next generation of learners. Get early access to Vidyo AI and start learning smarter."
                        primaryButton={{
                            label: "Get Early Access",
                            onClick: () => navigate('/contact')
                        }}
                    />
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default VidyoAI;
