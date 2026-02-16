import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Layers, Beaker } from "lucide-react";
import { MagicBento, ParticleCard } from "@/components/effects/MagicBento";

const differentiators = [
    {
        id: "01",
        icon: Layers,
        title: "Intelligence-First Methodology",
        description: "We don't add AI to legacy systems. We build from an AI-native foundation, where intelligence is the default state.",
    },
    {
        id: "02",
        icon: Beaker,
        title: "Research-Driven Engineering",
        description: "Development informed by cutting-edge AI research. We integrate emerging techniques while maintaining stability.",
    },
    {
        id: "03",
        icon: Zap,
        title: "Adaptive System Design",
        description: "Static solutions become obsolete. We engineer systems that evolve — learning from usage and adapting to context.",
    },
    {
        id: "04",
        icon: CheckCircle2,
        title: "Scalable Intelligence Architecture",
        description: "From prototype to enterprise deployment, our systems maintain consistency while scaling without compromise.",
    },
    {
        id: "05",
        icon: ShieldCheck,
        title: "Ethical AI Implementation",
        description: "Intelligence without responsibility is dangerous. We embed transparency and ethics into every deployment.",
    },
];

export const Differentiation = () => {
    return (
        <section className="relative py-14 lg:py-24 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 will-change-transform"
                >

                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
                        Why Organizations Choose <span className="text-gradient-metal">UNAI TECH</span>
                    </h2>
                </motion.div>

                <MagicBento className="flex flex-wrap justify-center gap-8">
                    {differentiators.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="will-change-transform w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] min-w-[300px]"
                        >
                            <ParticleCard
                                particleCount={6}
                                glowColor="168, 85, 247"
                                className="h-full glass-premium glass-shine rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-start gap-4"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-4xl font-bold text-purple-600/30 font-heading leading-none">
                                        {item.id}
                                    </span>
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                                <h3 className="font-heading text-xl font-bold text-foreground">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </ParticleCard>
                        </motion.div>
                    ))}
                </MagicBento>
            </div>
        </section>
    );
};
