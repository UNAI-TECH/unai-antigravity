import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { MagicBento, ParticleCard } from "@/components/effects/MagicBento";
import { Cpu, Zap, Code, Globe } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Cognitive AI Systems",
    description: "Beyond Machine Learning — we architect AI that understands intent and context, becoming digital collaborators rather than passive tools.",
    color: "blue" as const,
  },
  {
    icon: Code,
    title: "Intelligent Software Architecture",
    description: "Code That Learns. Platforms that incorporate AI at the architectural level to improve through use and predict user needs.",
    color: "purple" as const,
  },
  {
    icon: Zap,
    title: "Autonomous Operations Engineering",
    description: "Manual processes are legacy. We design self-optimizing frameworks where AI orchestrates workflows without human intervention.",
    color: "blue" as const,
  },
  {
    icon: Globe,
    title: "Next-Gen IT Infrastructure",
    description: "Digital Foundations Built for Intelligence. Cloud-native, AI-ready environments architected for continuous evolution.",
    color: "purple" as const,
  },
];

export const ServicesPreview = () => {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* Background Effects */}
      <GlowOrb size="lg" color="purple" className="top-20 -right-32" />
      <GlowOrb size="md" color="blue" className="bottom-20 -left-32" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">What We</span>

            <span className="text-gradient-metal"> Engineer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Every system we build is designed to think, adapt, and scale autonomously.
            Transforming complexity into clarity through intelligence-first design.
          </p>
        </motion.div>

        {/* Combined Layout Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch mt-12 max-w-7xl mx-auto">
          {/* Left Column: Introduction Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-8 lg:p-10 bg-white border border-gray-200 shadow-sm h-full"
          >
            <div className="relative z-10">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-sm text-purple-700 mb-6 border border-purple-200">
                Introduction
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                <span className="text-foreground">Beyond Automation.</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500">
                  Beyond Integration.
                </span>
                <br />
                <span className="text-foreground">Beyond Traditional IT.</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 font-light leading-relaxed">
                UNAI TECH exists at the convergence of artificial intelligence, systems architecture, and computational innovation. We don't simply implement technology — we engineer intelligent ecosystems where AI becomes the foundational layer of operational DNA.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">Cognitive Systems Engineering</span> — AI that learns your context
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">Adaptive Architecture Design</span> — Infrastructure that evolves
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  </div>
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">Intelligence-as-Infrastructure</span> — AI as a foundational utility
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Services Grid */}
          <MagicBento className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ParticleCard
                  particleCount={8}
                  glowColor={service.color === "blue" ? "96, 165, 250" : "192, 132, 252"}
                  className={`h-full glass-metal rounded-2xl p-6 glow-border transition-all duration-500 hover:shadow-glow-${service.color} justify-start gap-4`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color === "blue"
                    ? "bg-metal-blue-500/20"
                    : "bg-metal-purple-500/20"
                    }`}>
                    <service.icon className={`w-7 h-7 ${service.color === "blue"
                      ? "text-metal-blue-400"
                      : "text-metal-purple-400"
                      }`} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </ParticleCard>
              </motion.div>
            ))}
          </MagicBento>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
