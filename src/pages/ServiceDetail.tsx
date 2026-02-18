import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lenisScrollTo } from "@/hooks/useSmoothScroll";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Cpu, Globe, Rocket, Code, ArrowRight, Sparkles, Box, Layout, Database, Image as ImageIcon, Zap, Shield, Brain, Server, Lock } from "lucide-react";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";

// Detailed data for each service - Synchronized with Services.tsx
const serviceDetails: Record<string, any> = {
    "cognitive-ai": {
        title: "Cognitive AI Systems",
        icon: Cpu,
        color: "blue",
        subtitle: "Intelligence That Understands Context",
        description: "We architect cognitive systems that move beyond simple pattern matching. Our NLU-driven platforms integrate contextual reasoning and autonomous decision-making to transform how your organization interacts with data.",
        highlights: [
            "Process Contextualization",
            "Autonomous Decision Frameworks",
            "Predictive Cognitive Analytics",
            "Custom Neural Architectures"
        ],
        heroImage: "/6246137-removebg-preview.png",
        bentoFeatures: [
            {
                title: "Advanced NLP",
                desc: "Language processing that understands nuance, intent, and domain-specific terminology.",
                icon: Sparkles
            },
            {
                title: "Reasoning Engines",
                desc: "Logic-based systems that simulate human expert decision-making processes.",
                icon: Brain
            },
            {
                title: "Adaptive Learning",
                desc: "Models that evolve in real-time as they ingest new organizational datasets.",
                icon: Rocket
            },
            {
                title: "Multimodal Synthesis",
                desc: "Seamlessly finding patterns across text, image, and structured data streams.",
                icon: ImageIcon
            }
        ]
    },
    "intelligent-software": {
        title: "Intelligent Software Architecture",
        icon: Code,
        color: "purple",
        subtitle: "Evolving Digital Ecosystems",
        description: "Building applications that aren't just tools, but intelligent partners. We create custom platforms where AI is the core foundation, enabling systems that learn, adapt, and scale inherently.",
        highlights: [
            "AI-First Architecture Design",
            "Adaptive Microservices",
            "Intelligent Data Orbits",
            "Institutional Memory Integration"
        ],
        heroImage: "/corporate-meeting-employees-cartoon-characters-discussing-business-strategy-planning-further-actions-brainstorming-formal-communication-seminar-concept-illustration.png",
        bentoFeatures: [
            {
                title: "Smart Backends",
                desc: "API-first systems with built-in intelligence layers for predictive routing.",
                icon: Database
            },
            {
                title: "Dynamic UIs",
                desc: "User interfaces that adapt their layout and content based on user behavior.",
                icon: Layout
            },
            {
                title: "Scalable Core",
                desc: "Cloud-native architectures ready for the next decade of AI advancements.",
                icon: Box
            },
            {
                title: "Real-Time Sync",
                desc: "Instant state propagation across all connected clients and services.",
                icon: Zap
            }
        ]
    },
    "autonomous-ops": {
        title: "Autonomous Operations Engineering",
        icon: Zap,
        color: "blue",
        subtitle: "Self-Optimizing Ecosystems",
        description: "Where complexity manages itself. We engineer operational frameworks where AI handles routine orchestration, allowing your human talent to focus on high-level strategy and innovation.",
        highlights: [
            "Hyper-Automated Workflows",
            "AI-Powered RPA 2.0",
            "Operational Self-Healing",
            "Autonomous Agent Swarms"
        ],
        heroImage: "/generation-x-abstract-concept-vector-illustration-middle-age-parents-work-life-balance-strong-professional-cold-war-personal-computing-pay-off-debt-stable-saving-plan-abstract-metaphor.png",
        bentoFeatures: [
            {
                title: "Workflow Orchestration",
                desc: "Intelligent management of complex multi-system operational paths.",
                icon: Rocket
            },
            {
                title: "Predictive Ops",
                desc: "Identify and resolve system bottlenecks before they impact performance.",
                icon: Sparkles
            },
            {
                title: "Agentic Frameworks",
                desc: "Deploy autonomous agents that perform complex tasks across your stack.",
                icon: Cpu
            },
            {
                title: "Resilient Healing",
                desc: "Automated recovery protocols that resolve incidents without human intervention.",
                icon: Shield
            }
        ]
    },
    "next-gen-infra": {
        title: "Next-Generation IT Infrastructure",
        icon: Globe,
        color: "purple",
        subtitle: "Foundations for the Intelligence Age",
        description: "The next era of technology requires a different foundation. We architect cloud-native, AI-ready environments designed for continuous integration of emerging technologies.",
        highlights: [
            "AI-Ready Cloud Platforms",
            "Intelligent Security Layers",
            "Liquid Computing Models",
            "Global Resiliency Design"
        ],
        heroImage: "/5384286-removebg-preview.png",
        bentoFeatures: [
            {
                title: "Elastic Foundations",
                desc: "Infrastructure that scales horizontally and vertically with millisecond latency.",
                icon: Box
            },
            {
                title: "Secure Mesh",
                desc: "Zero-trust security integrated into the very fabric of your network.",
                icon: Shield
            },
            {
                title: "Digital Twin Infra",
                desc: "Simulate infrastructure changes in virtual environments before live deployment.",
                icon: Globe
            },
            {
                title: "Hybrid Edge",
                desc: "Distributed processing power that brings intelligence closer to the data source.",
                icon: Cpu
            }
        ]
    },
    "cloud-infrastructure": {
        title: "Cloud Infrastructure",
        icon: Server,
        color: "blue",
        subtitle: "Engineered for Continuous Innovation",
        description: "Cloud is not storage. It is strategic capability. We architect cloud ecosystems that are secure, elastic, high-performance, and optimized for AI-driven workloads.",
        highlights: [
            "Scalable Cloud Architecture",
            "Infrastructure as Code (IaC)",
            "Automated Environment Provisioning",
            "GPU-Enabled Cloud Config"
        ],
        heroImage: "/illustration2.png",
        bentoFeatures: [
            {
                title: "Cloud Architecture",
                desc: "Public, private, and hybrid cloud architecture design with multi-region strategies.",
                icon: Globe
            },
            {
                title: "Containerization",
                desc: "Docker and Kubernetes orchestration for resilient microservices deployment.",
                icon: Box
            },
            {
                title: "DevOps Automation",
                desc: "CI/CD integration, infrastructure automation, and automated performance monitoring.",
                icon: Zap
            },
            {
                title: "AI Enablement",
                desc: "Data lake deployment and AI workload performance tuning at the infrastructure level.",
                icon: Brain
            }
        ]
    },
    "cybersecurity": {
        title: "Cybersecurity Engineering",
        icon: Lock,
        color: "purple",
        subtitle: "Security by Architecture",
        description: "In the age of AI and automation, cybersecurity must be intelligent, proactive, and adaptive. We design multi-layered security ecosystems that protect data and identity.",
        highlights: [
            "Zero-Trust Security Models",
            "AI-Driven Threat Monitoring",
            "Secure System Hardening",
            "Real-Time Anomaly Detection"
        ],
        heroImage: "/6246137-removebg-preview.png",
        bentoFeatures: [
            {
                title: "Security Architecture",
                desc: "Threat modeling, risk analysis, and secure system design from the ground up.",
                icon: Shield
            },
            {
                title: "Network Security",
                desc: "Zero-trust network implementation and automated vulnerability management.",
                icon: Globe
            },
            {
                title: "App Security",
                desc: "API security, gateway protection, and secure SDLC implementation across your stack.",
                icon: Code
            },
            {
                title: "Threat Intelligence",
                desc: "Behavioral analysis and automated incident response powered by AI.",
                icon: Zap
            }
        ]
    }
};

// No extra imports needed here

// Component for highlighting image locations
const ImagePlaceholder = ({ label, className = "", aspect = "aspect-video" }: { label: string, className?: string, aspect?: string }) => (
    <div className={`relative group overflow-hidden rounded-3xl border-2 border-dashed border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-all duration-500 ${aspect} flex flex-col items-center justify-center p-8 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-8 h-8 text-blue-400" />
        </div>
        <p className="text-blue-400 font-bold text-lg mb-2">IMAGE LOCATION: {label}</p>
        <p className="text-blue-400/60 text-sm max-w-[250px]">
            Place your premium {label.toLowerCase()} visual here to enhance the section's impact.
        </p>
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-500/40 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-500/40 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500/40 rounded-br-lg" />
    </div>
);

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = id ? serviceDetails[id] : null;

    useEffect(() => {
        lenisScrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <GlowOrb size="xl" color="blue" className="opacity-20" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl font-heading font-bold mb-6 text-slate-900">Service Not Found</h2>
                    <p className="text-slate-500 mb-10 max-w-md mx-auto">The service you're looking for might have moved or been updated. Let's get you back on track.</p>
                    <Button size="xl" className="rounded-2xl bg-blue-600 shadow-xl shadow-blue-500/20" onClick={() => navigate("/services")}>
                        <ArrowLeft className="mr-2 w-5 h-5" /> Back to Services
                    </Button>
                </motion.div>
            </div>
        );
    }

    const Icon = service.icon;
    const isBlue = service.color === "blue";

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <SEO
                title={service.title}
                description={service.description}
            />


            <main className="pt-0">
                {/* Premium Glassmorphic Hero */}
                <section className="relative pt-32 sm:pt-48 pb-20 sm:pb-32 overflow-hidden px-4 sm:px-6">
                    <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate("/services")}
                            className="flex items-center gap-2 mb-12 text-slate-500 hover:text-blue-600 transition-colors group font-bold"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:-translate-x-1 transition-transform border border-slate-100">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            Back to Services
                        </motion.button>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <span className={`inline-block px-4 py-2 rounded-full border ${isBlue ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-purple-50 border-purple-100 text-purple-600'} text-sm font-bold tracking-tight`}>
                                        {service.subtitle}
                                    </span>
                                </div>

                                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold mb-8 text-slate-900 leading-[1.1] tracking-tight">
                                    {service.title}
                                </h1>

                                <p className="text-xl text-slate-500 max-w-xl mb-12 leading-relaxed font-light">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Button
                                        size="xl"
                                        className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-500/20 transition-all font-bold"
                                        onClick={() => navigate('/contact')}
                                    >
                                        Discuss Solution
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative flex justify-center items-center"
                            >
                                <div className="relative aspect-square w-full max-w-[500px] flex items-center justify-center">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${isBlue ? 'from-blue-500/20 to-transparent' : 'from-purple-500/20 to-transparent'} rounded-full blur-3xl`} />
                                    <img
                                        src={service.heroImage}
                                        alt={service.title}
                                        className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Unique Bento Features Grid */}
                <section className="relative py-24 sm:py-32 px-4 sm:px-6 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 mb-6">Core Capabilities</h2>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Advanced engineering meets strategic vision to deliver results that define markets.</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
                                {service.bentoFeatures.map((feature: any, index: number) => (
                                    <GlassCard key={index} className="p-8 sm:p-10 bg-slate-50/50 border-slate-100 hover:border-blue-500/30 transition-all duration-500 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-slate-900">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                                    </GlassCard>
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-slate-900 rounded-[2.5rem] p-10 h-full text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/20 blur-[60px] rounded-full" />
                                    <h3 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                        <Sparkles className="text-blue-400 w-8 h-8" />
                                        The Impact
                                    </h3>
                                    <ul className="space-y-8">
                                        {service.highlights.map((highlight: string, index: number) => (
                                            <li key={index} className="flex items-start gap-4 group">
                                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/40 group-hover:bg-blue-500 transition-all">
                                                    <Check className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                                                </div>
                                                <span className="text-lg font-medium text-slate-300 group-hover:text-white transition-colors leading-snug">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-16 pt-10 border-t border-white/10">
                                        <p className="text-slate-400 mb-8 italic">"UNAI TECH redefined our operational intelligence, delivering a 40% increase in autonomous workflow efficiency."</p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center p-2">
                                                <img src="/unai-logo.png" alt="Unai Logo" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">Institutional Lead</p>
                                                <p className="text-sm text-slate-500">Intelligent Operations Strategy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing Visual Section */}
                <section className="py-24 sm:py-32 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src="/illustration-1.png"
                                    alt="Implementation Showcase"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="max-w-xl">
                                <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 mb-8 tracking-tight">Ready for Engineering?</h2>
                                <p className="text-lg text-slate-500 mb-10 leading-relaxed font-light">
                                    Whether you need a single intelligent component or a multi-year architecture roadmap, we provide the technical depth and strategic clarity required to execute.
                                </p>
                                <Button
                                    size="xl"
                                    variant="outline"
                                    className="h-14 px-10 rounded-2xl border-slate-200 text-slate-900 hover:bg-slate-50 font-bold transition-all"
                                    onClick={() => navigate('/contact')}
                                >
                                    Review Technical Specs
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-24 px-4 sm:px-6">
                    <PremiumCTA
                        title={<>Let's Architect Your <span className="text-blue-400">Future.</span></>}
                        description={`Connect with our engineering team to explore how ${service.title} can be integrated into your existing infrastructure.`}
                        primaryButton={{
                            label: "Request Strategic Consultation",
                            onClick: () => navigate('/contact')
                        }}
                    />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ServiceDetail;
