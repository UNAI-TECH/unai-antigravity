import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import {
    Check, ArrowRight, Brain, Zap,
    PlayCircle, Monitor, BarChart3, Quote
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
    {
        icon: Brain,
        title: "AI-Powered Adaptive Learning",
        description: "Our platform dynamically adjusts content difficulty based on real-time user engagement and performance metrics. Students receive a personalized journey that perfectly balances challenge with achievement.",
        color: "blue"
    },
    {
        icon: PlayCircle,
        title: "Immersive Narrative Experiences",
        description: "We leverage cinematic storytelling to anchor complex educational concepts in memorable, emotionally resonant video narratives. Educators can now deliver curriculum-aligned content that students actually want to watch.",
        color: "indigo"
    },
    {
        icon: Monitor,
        title: "Seamless Multi-Platform Integration",
        description: "Vidyo AI operates across all devices, providing a consistent and high-performance learning environment from mobile to desktop. Institutions can scale their educational reach without compromising on quality or accessibility.",
        color: "purple"
    },
    {
        icon: BarChart3,
        title: "Advanced Performance Analytics",
        description: "Deep-dive into granular data to understand learning patterns, retention rates, and engagement levels across your entire student body. Make data-driven decisions that optimize both pedagogical strategy and student outcomes.",
        color: "blue"
    }
];

// ─── Scroll Section Component ──────────────────────────────────────────────────
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

const VidyoAI = () => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLElement>(null);

    // Parallax effects
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Ensure scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            <SEO
                title="Vidyo AI | Immersive Edutainment Platform"
                description="Education reimagined through the power of immersive entertainment. Vidyo AI delivers education through cinematic video experiences and adaptive AI learning."
            />

            <main className="overflow-x-hidden">

                {/* HERO SECTION */}
                <section
                    ref={heroRef}
                    className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-slate-50"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_100%,transparent_100%)] opacity-30" />

                        {/* Animated Orbs */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 50, 0],
                                y: [0, 30, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                x: [0, -40, 0],
                                y: [0, 50, 0]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-[120px]"
                        />
                    </div>

                    <div className="container relative z-10 max-w-6xl mx-auto">
                        <motion.div
                            style={{ y: yText, opacity: opacityHero }}
                            className="text-center"
                        >
                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8 leading-[0.95]"
                            >
                                Education Reimagined <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                                    Through Entertainment
                                </span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
                            >
                                Vidyo AI transforms passive watching into active learning by blending high-production entertainment with intelligent educational modules. We bridge the gap between engagement and impact.
                            </motion.p>

                            {/* Tagline */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                <p className="text-lg font-semibold text-blue-600 tracking-wide uppercase">
                                    Intelligent, Immersive, and Entertaining Education.
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-200 flex items-center gap-2"
                                    >
                                        Partner With Us
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById('about-vidyo');
                                            el?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <ScrollSection className="bg-white">
                    <div className="container max-w-7xl mx-auto px-4">
                        <div className="text-center mb-20">
                            <h2 className="text-base font-bold text-blue-600 uppercase tracking-widest mb-4">Core Capabilities</h2>
                            <p className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                                Engineered for Engagement, <br />Designed for Impact.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="group relative p-8 md:p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100/50 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl mb-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        feature.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                                            'bg-purple-100 text-purple-600'
                                        }`}>
                                        <feature.icon size={32} />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>

                                </motion.div>
                            ))}
                        </div>
                    </div>
                </ScrollSection>

                {/* ABOUT & VISION SECTION */}
                <ScrollSection id="about-vidyo" className="bg-slate-900 text-white selection:bg-white/10 selection:text-white">
                    <div className="container max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-indigo-400 font-bold uppercase tracking-[0.2em] mb-6">Our Philosophy</h2>
                                    <p className="text-3xl md:text-5xl font-bold mb-10 leading-tight">
                                        Dismantling the boundary <br />
                                        <span className="italic text-white/60">between learning and play.</span>
                                    </p>

                                    <div className="space-y-8 text-xl text-slate-300 leading-relaxed font-medium">
                                        <p>
                                            At UNAI TECH, we believe that the greatest barrier to education is not access to information, but access to sustained engagement. We are dedicated to creating a world where curiosity is fueled by the same high-production immersion typically reserved for entertainment.
                                        </p>
                                        <p>
                                            Our vision for Vidyo AI is to empower human potential through intelligent, human-centered technology that respects the learner's time and attention. By weaving intelligence into the fabric of entertainment, we are not just teaching new skills—we are cultivating a lifelong passion for discovery.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="relative">
                                {/* Founder Quote Card */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="relative p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl overflow-hidden"
                                >
                                    <Quote size={80} className="text-white/10 absolute -top-4 -left-4" />

                                    <blockquote className="relative z-10">
                                        <p className="text-2xl md:text-3xl font-bold mb-10 leading-snug">
                                            "Education is not the filling of a pail, but the lighting of a fire; we are simply providing the most powerful spark in history."
                                        </p>
                                        <footer className="flex items-center gap-4">
                                            <div className="w-12 h-1 px-4 bg-white/30 rounded-full" />
                                            <span className="text-lg font-bold tracking-widest uppercase text-white/80">UNAI TECH Founders</span>
                                        </footer>
                                    </blockquote>

                                    {/* Aesthetic glow */}
                                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                                </motion.div>

                                {/* Closing Line */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="mt-12 text-center"
                                >
                                    <p className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
                                        Vidyo AI: The Future of Education Starts Here.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </ScrollSection>

                {/* FINAL CTA */}
                <section className="py-24 px-4 bg-white">
                    <PremiumCTA
                        title={<>Ready to Transform <br />Learning Experiences?</>}
                        description="Speak with our strategic engineers about integrating Vidyo AI into your institution or content ecosystem."
                        primaryButton={{
                            label: "Contact Strategic Team",
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
