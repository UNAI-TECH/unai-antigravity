import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Cpu, Globe, Rocket, Code, ArrowRight, Check } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "AI Solutions",
    description: "Cutting-edge artificial intelligence systems tailored to your business needs. From machine learning to natural language processing.",
    features: ["Custom ML Models", "NLP Integration", "Computer Vision", "Predictive Analytics"],
    color: "blue" as const,
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Enterprise-grade security protocols to protect your digital assets. Comprehensive threat detection and response systems.",
    features: ["Threat Detection", "Security Audits", "Penetration Testing", "24/7 Monitoring"],
    color: "purple" as const,
  },
  {
    icon: Globe,
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions that grow with your business demands. Optimize performance and reduce operational costs.",
    features: ["Cloud Migration", "Multi-Cloud Setup", "Cost Optimization", "Auto-Scaling"],
    color: "blue" as const,
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline operations with intelligent automation systems. Reduce manual work and increase efficiency across your organization.",
    features: ["Process Automation", "Workflow Design", "RPA Solutions", "Integration APIs"],
    color: "purple" as const,
  },
  {
    icon: Rocket,
    title: "Product Development",
    description: "End-to-end product development from concept to launch. We transform ideas into market-ready solutions.",
    features: ["MVP Development", "Product Strategy", "UX/UI Design", "Agile Delivery"],
    color: "blue" as const,
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Bespoke software solutions engineered for your specific requirements. Built with scalability and maintainability in mind.",
    features: ["Web Applications", "Mobile Apps", "Enterprise Systems", "API Development"],
    color: "purple" as const,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
            >
              <source src="/cards-video.webm" type="video/webm" />
            </video>
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/60" />
          </div>

          {/* Glow Orbs */}
          <GlowOrb size="xl" color="blue" className="top-0 right-0" />
          <GlowOrb size="lg" color="purple" className="bottom-0 left-0" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-purple-300 mb-6">
                Service Modules
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Solutions That</span>
                <br />
                <span className="text-gradient-metal">Defy Gravity</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Each service is forged with precision and engineered for excellence.
                Discover how we can elevate your business to new heights.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="energy-line" />

        {/* Services Grid */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <GlassCard glowColor={service.color} className="h-full flex flex-col">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${service.color === "blue"
                      ? "bg-metal-blue-500/20"
                      : "bg-metal-purple-500/20"
                      }`}>
                      <service.icon className={`w-8 h-8 ${service.color === "blue"
                        ? "text-metal-blue-400"
                        : "text-metal-purple-400"
                        }`} />
                    </div>

                    <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 flex-grow">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className={`w-4 h-4 ${service.color === "blue"
                            ? "text-metal-blue-400"
                            : "text-metal-purple-400"
                            }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="w-full group">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="energy-line" />

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <GlowOrb size="xl" color="plasma" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto"
              style={{ willChange: "transform, opacity" }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Ready to </span>
                <span className="text-gradient-metal">Elevate?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Let's discuss how our services can transform your business.
                Our team is ready to craft the perfect solution for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="hero" size="xl">
                  Start a Project
                  <ArrowRight className="ml-2" />
                </Button>
                <Button variant="hero-outline" size="xl">
                  Schedule a Call
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
