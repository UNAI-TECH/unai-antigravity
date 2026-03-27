import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import {
    ArrowRight, Brain, Zap, PlayCircle,
    Route, Sparkles, BarChart3, Target,
    BookOpen, Cpu, Rocket, Quote, Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";

// ─── Features Data ─────────────────────────────────────────────────────────────

const features = [
    {
        icon: Route,
        title: "Personalized Learning Paths",
        description: "AI maps your goals, gaps, and pace to craft a dynamic curriculum that evolves as you grow — no two paths are alike.",
        color: "blue"
    },
    {
        icon: PlayCircle,
        title: "AI Content Generation",
        description: "Subject matter transformed into short-form videos, interactive explainers, and narrative-driven lessons — powered by cutting-edge AI models.",
        color: "indigo"
    },
    {
        icon: Brain,
        title: "Agentic Study Agents",
        description: "Autonomous AI agents that proactively schedule sessions, retrieve resources, quiz you, and adjust your plan — all without being asked.",
        color: "purple"
    },
    {
        icon: Rocket,
        title: "Real-Time Tech Updates",
        description: "Curated feeds of emerging technology breakthroughs — from AI research to industry innovations — delivered in digestible, structured formats.",
        color: "blue"
    },
    {
        icon: Target,
        title: "Adaptive Assessment Engine",
        description: "Smart evaluations that measure deep understanding — not memorization — and feed results directly back into your personalized learning loop.",
        color: "indigo"
    },
    {
        icon: BarChart3,
        title: "Progress Intelligence",
        description: "A live dashboard that tracks mastery, flags blind spots, and projects your learning trajectory — transparent, data-driven, and actionable.",
        color: "purple"
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

    return (
        <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
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
                    className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-slate-50"
                >
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
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
                        <motion.div style={{ y: yText, opacity: opacityHero }} className="text-center">

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[0.95]"
                            >
                                Where Education Meets <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                    Intelligent Entertainment.
                                </span>
                            </motion.h1>

                            {/* Sub-headline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-6 leading-relaxed font-medium"
                            >
                                Vidyo AI is redefining how college students learn — merging AI-driven content, agentic learning systems, and immersive entertainment to deliver Education 3.0.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-lg sm:text-xl md:text-2xl text-slate-900 max-w-2xl mx-auto mb-10 leading-relaxed font-bold"
                            >
                                Stop studying harder. Start learning smarter.
                            </motion.p>

                            {/* CTA Buttons */}
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
            ABOUT / VISION
        ═══════════════════════════════════════════ */}
                <ScrollSection id="about-vidyo" className="bg-slate-900 text-white selection:bg-white/10 selection:text-white">
                    <div className="container max-w-7xl mx-auto px-4">

                        {/* Section Tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="block h-px w-10 bg-indigo-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">Our Vision</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 leading-tight"
                        >
                            Built for the Next Generation <br />
                            <span className="italic text-white/60">of Learners.</span>
                        </motion.h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                            {/* Body Copy */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8"
                            >
                                <div className="space-y-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-medium">
                                    <p>
                                        At UNAI Tech, we believe education should never feel like a burden. Vidyo AI was born from a simple conviction: <strong className="text-white">when learning is engaging, it becomes unstoppable.</strong>
                                    </p>
                                    <p>
                                        We combine cutting-edge agentic AI systems with entertainment-first content design — creating an adaptive learning environment that understands each student, evolves with them, and delivers knowledge in the format they naturally consume.
                                    </p>
                                    <p className="text-2xl font-bold text-white border-l-4 border-indigo-500 pl-6">
                                        This is not a productivity tool. This is a paradigm shift.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Core Pillars */}
                            <div className="space-y-6">
                                {pillars.map((pillar, idx) => (
                                    <motion.div
                                        key={pillar.title}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className="group p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                                                <pillar.icon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{pillar.title}</h3>
                                                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{pillar.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollSection>

                {/* ═══════════════════════════════════════════
            FEATURES
        ═══════════════════════════════════════════ */}
                <ScrollSection className="bg-white">
                    <div className="container max-w-7xl mx-auto px-4">

                        {/* Header */}
                        <div className="text-center mb-16 sm:mb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-3 mb-5"
                            >
                                <span className="block h-px w-8 bg-blue-400" />
                                <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Education 3.0</span>
                                <span className="block h-px w-8 bg-blue-400" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight"
                            >
                                Revolutionary Features, <br />Designed for You
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-medium"
                            >
                                Every feature in Vidyo AI is engineered to eliminate friction between a student and their full potential.
                            </motion.p>
                        </div>

                        {/* Feature Grid — 3 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                                    className="group relative p-8 sm:p-10 rounded-[2rem] bg-slate-50 border border-slate-100/50 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        feature.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                                            'bg-purple-100 text-purple-600'
                                        }`}>
                                        <feature.icon size={28} />
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-base text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
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
