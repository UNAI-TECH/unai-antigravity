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
    <section className="relative py-14 md:py-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent pointer-events-none" />
      <GlowOrb size="lg" color="blue" className="top-20 -right-32 opacity-40" />
      <GlowOrb size="md" color="blue" className="bottom-20 -left-32 opacity-40" />

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
        <MagicBento className="grid lg:grid-cols-2 gap-12 items-stretch mt-12 max-w-7xl mx-auto">
          {/* Left Column: Introduction Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.985 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-full cursor-pointer"
          >
            <ParticleCard
              clickEffect={true}
              enableTilt={true}
              particleCount={10}
              glowColor="96, 165, 250"
              className="relative rounded-3xl p-8 lg:p-10 glass-premium shadow-premium-deep h-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-sm text-blue-700 mb-6 border border-blue-100 font-medium">
                  Introduction
                </span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                  <span className="text-foreground">Beyond Automation.</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
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
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-bold text-gray-900">Cognitive Systems Engineering</span> — AI that learns your context
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-bold text-gray-900">Adaptive Architecture Design</span> — Infrastructure that evolves
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-bold text-gray-900">Intelligence-as-Infrastructure</span> — AI as a foundational utility
                    </p>
                  </div>
                </div>
              </div>
            </ParticleCard>
          </motion.div>

          {/* Right Column: Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.985 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cursor-pointer"
              >
                <ParticleCard
                  clickEffect={true}
                  enableTilt={true}
                  particleCount={8}
                  glowColor={service.color === "blue" ? "96, 165, 250" : "192, 132, 252"}
                  className={`h-full glass-premium shadow-premium-deep rounded-2xl p-6 glow-border transition-all duration-500 hover:shadow-glow-${service.color} justify-start gap-4 group overflow-hidden`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${service.color === "blue"
                    ? "bg-blue-50/80 group-hover:bg-blue-100/80"
                    : "bg-purple-50/80 group-hover:bg-purple-100/80"
                    }`}>
                    <service.icon className={`w-7 h-7 transition-colors duration-300 ${service.color === "blue"
                      ? "text-blue-500 group-hover:text-blue-600"
                      : "text-purple-500 group-hover:text-purple-600"
                      }`} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm group-hover:text-gray-600 transition-colors">
                    {service.description}
                  </p>
                </ParticleCard>
              </motion.div>
            ))}
          </div>
        </MagicBento>
      </div>
    </section>
  );
};

export default ServicesPreview;
