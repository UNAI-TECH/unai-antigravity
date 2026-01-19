import { motion } from "framer-motion";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { GraduationCap, Briefcase, Code, FlaskConical } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Building Career in AI",
    description: "Empowering through innovative workshops, hands-on experiences, and high-quality courses powered by AI.",
    color: "blue" as const,
  },
  {
    icon: Briefcase,
    title: "Business and AI Consultancy",
    description: "Upgrading your business in the digital realm through AI-powered automations, platforms, and high-tech tools.",
    color: "purple" as const,
  },
  {
    icon: Code,
    title: "AI Integrated Developments",
    description: "Extending an arm in AI development for businesses and specific development of AI tools for tailored requirements to solve problems.",
    color: "blue" as const,
  },
  {
    icon: FlaskConical,
    title: "AI Research",
    description: "Exploring the realm of AI with advanced cutting-edge research strategies.",
    color: "purple" as const,
  },
];

export const ServicesPreview = () => {
  return (
    <section className="relative py-32 overflow-hidden">
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
          <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-purple-300 mb-6">
            Our Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Empowering Innovation Through</span>
            <br />
            <span className="text-gradient-metal">Tailored AI Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We craft technology solutions that elevate your business to new heights.
            Each service is forged with precision and engineered for excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard glowColor={service.color} className="h-full">
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
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
