import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lenisScrollTo } from "@/hooks/useSmoothScroll";
import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Zap, Shield, Cpu, Globe, Rocket, Code, ArrowRight } from "lucide-react";

// Detailed data for each service
const serviceDetails: Record<string, any> = {
    "ai-solutions": {
        title: "AI Solutions",
        icon: Cpu,
        color: "blue",
        subtitle: "Intelligence Engineered for Impact",
        description: "Our AI Solutions empower businesses to automate complex processes, gain predictive insights, and create personalized experiences. We leverage state-of-the-art machine learning models and neural networks to solve your most challenging problems.",
        benefits: [
            "Process Automation & Efficiency",
            "Data-Driven Decision Making",
            "Enhanced Customer Experiences",
            "Predictive Maintenance & Analytics"
        ],
        features: [
            { title: "Custom ML Models", desc: "Tailored algorithms designed to learn from your specific data patterns." },
            { title: "NLP Integration", desc: "Advanced language processing for chatbots, sentiment analysis, and document parsing." },
            { title: "Computer Vision", desc: "Visual recognition systems for quality control, security, and analysis." },
            { title: "Predictive Analytics", desc: "Forecast trends and behaviors with high accuracy." }
        ]
    },
    "automation": {
        title: "Automation",
        icon: Zap,
        color: "purple",
        subtitle: "Streamline Your Operations",
        description: "Eliminate manual bottlenecks and accelerate your workflow with our intelligent automation systems. We design end-to-end automation strategies that integrate seamlessly with your existing infrastructure.",
        benefits: [
            "Reduced Operational Costs",
            "Minimised Human Error",
            "24/7 Productivity",
            "Scalable Workflows"
        ],
        features: [
            { title: "Process Automation", desc: "Automate repetitive tasks and standardized processes." },
            { title: "Workflow Design", desc: "Optimized orchestration of people, systems, and data." },
            { title: "RPA Solutions", desc: "Robotic Process Automation for legacy system integration." },
            { title: "Integration APIs", desc: "Connect disparate systems for unified data flow." }
        ]
    },
    "custom-software": {
        title: "Custom Software",
        icon: Code,
        color: "purple",
        subtitle: "Built Specifically For You",
        description: "Off-the-shelf software often falls short. Our custom software development ensures that your technology stack aligns perfectly with your business goals, offering flexibility, scalability, and competitive advantage.",
        benefits: [
            "Tailored Functionality",
            "Ownership & Control",
            "Seamless Integration",
            "Enhanced Security"
        ],
        features: [
            { title: "Web Applications", desc: "Responsive, high-performance web apps for any device." },
            { title: "Mobile Apps", desc: "Native and cross-platform mobile solutions." },
            { title: "Enterprise Systems", desc: "Large-scale software for complex organizational needs." },
            { title: "API Development", desc: "Robust interfaces for data exchange and connectivity." }
        ]
    },
    "product-development": {
        title: "Product Development",
        icon: Rocket,
        color: "blue",
        subtitle: "From Concept to Launch",
        description: "We partner with visionaries to turn ideas into market-ready products. Our agile product development cycle ensures rapid iteration, user-centric design, and high-quality engineering from Day 1.",
        benefits: [
            "Accelerated Time-to-Market",
            "User-Centric Design",
            "Scalable Architecture",
            "Continuous Improvement"
        ],
        features: [
            { title: "MVP Development", desc: "Rapid prototyping to validate your core value proposition." },
            { title: "Product Strategy", desc: "Roadmapping and market analysis for successful launch." },
            { title: "UX/UI Design", desc: "Intuitive and engaging interfaces that users love." },
            { title: "Agile Delivery", desc: "Iterative development with frequent feedback loops." }
        ]
    },
    "cloud-infrastructure": {
        title: "Cloud Infrastructure",
        icon: Globe,
        color: "blue",
        subtitle: "Scalable, Secure, Resilient",
        description: "Modernize your infrastructure with our cloud solutions. Whether you need public, private, or hybrid cloud architectures, we design systems that are secure, cost-effective, and ready to scale with your growth.",
        benefits: [
            "High Availability & Reliability",
            "Global Scalability",
            "Cost Efficiency",
            "Disaster Recovery"
        ],
        features: [
            { title: "Cloud Migration", desc: "Seamless transition of assets to the cloud." },
            { title: "Multi-Cloud Setup", desc: "Strategies leveraging mostly AWS, Azure, and GCP." },
            { title: "Cost Optimization", desc: "Resource management to minimize cloud spend." },
            { title: "Auto-Scaling", desc: "Dynamic resource adjustment based on demand." }
        ]
    },
    "cybersecurity": {
        title: "Cybersecurity",
        icon: Shield,
        color: "purple",
        subtitle: "Protect Your Digital Assets",
        description: "In an era of evolving threats, security cannot be an afterthought. We implement defense-in-depth strategies to safeguard your data, infrastructure, and reputation against sophisticated cyber attacks.",
        benefits: [
            "Data Protection & Privacy",
            "Regulatory Compliance",
            "Risk Mitigation",
            "Business Continuity"
        ],
        features: [
            { title: "Threat Detection", desc: "Real-time monitoring and anomaly detection." },
            { title: "Security Audits", desc: "Comprehensive assessment of vulnerabilities." },
            { title: "Penetration Testing", desc: "Simulated attacks to identify and fix weaknesses." },
            { title: "24/7 Monitoring", desc: "Continuous oversight by security operations center." }
        ]
    }
};

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = id ? serviceDetails[id] : null;

    useEffect(() => {
        // Use Lenis for reliable scrolling
        lenisScrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
                    <Button onClick={() => navigate("/services")}>Back to Services</Button>
                </div>
            </div>
        );
    }

    const Icon = service.icon;
    const isBlue = service.color === "blue";

    return (
        <div className="min-h-screen bg-background">
            <FloatingNavbar />

            <main className="pt-0">
                {/* Detailed Hero */}
                <section className="relative pt-40 pb-20 overflow-hidden">
                    <GlowOrb size="xl" color={isBlue ? "blue" : "purple"} className="top-0 right-0" />
                    <GlowOrb size="lg" color={isBlue ? "purple" : "blue"} className="bottom-0 left-0" />

                    <div className="container mx-auto px-6 relative z-10">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/services")}
                            className="mb-8 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                        </Button>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <span className={`inline-block px-4 py-2 rounded-full glass-metal text-sm ${isBlue ? 'text-metal-blue-300' : 'text-metal-purple-300'} mb-6`}>
                                {service.subtitle}
                            </span>
                            <div className="flex items-center gap-6 mb-8">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isBlue ? 'bg-metal-blue-500/20' : 'bg-metal-purple-500/20'}`}>
                                    <Icon className={`w-10 h-10 ${isBlue ? 'text-metal-blue-400' : 'text-metal-purple-400'}`} />
                                </div>
                                <h1 className="font-heading text-5xl md:text-6xl font-bold">
                                    {service.title}
                                </h1>
                            </div>
                            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="energy-line" />

                {/* Features Grid */}
                <section className="relative py-24 overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-heading font-bold">Key Capabilities</h2>
                                <div className="grid gap-6">
                                    {service.features.map((feature: any, index: number) => (
                                        <GlassCard key={index} className="p-6">
                                            <h3 className={`text-xl font-bold mb-2 ${isBlue ? 'text-metal-blue-300' : 'text-metal-purple-300'}`}>
                                                {feature.title}
                                            </h3>
                                            <p className="text-muted-foreground">{feature.desc}</p>
                                        </GlassCard>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-3xl font-heading font-bold">Business Benefits</h2>
                                <div className="glass-metal rounded-2xl p-8 space-y-6">
                                    {service.benefits.map((benefit: string, index: number) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isBlue ? 'bg-metal-blue-500/20 text-metal-blue-400' : 'bg-metal-purple-500/20 text-metal-purple-400'}`}>
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-lg font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8">
                                    <GlassCard className="p-8 text-center bg-gradient-to-br from-white/5 to-transparent">
                                        <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                                        <p className="text-muted-foreground mb-6">Let's discuss how {service.title} can transform your business.</p>
                                        <Button size="lg" variant="hero" className="w-full">
                                            Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </GlassCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ServiceDetail;
