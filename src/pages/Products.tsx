import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ExternalLink } from "lucide-react";

const products = [
  {
    name: "NexusAI Platform",
    tagline: "Enterprise AI Infrastructure",
    description: "A comprehensive AI platform that powers intelligent automation, predictive analytics, and machine learning at scale.",
    features: ["Auto-ML Pipeline", "Real-time Inference", "Model Registry", "GPU Optimization"],
    status: "Available",
    color: "blue" as const,
  },
  {
    name: "ShieldCore",
    tagline: "Zero-Trust Security Suite",
    description: "Next-generation cybersecurity platform with AI-powered threat detection and automated response systems.",
    features: ["Threat Intelligence", "Zero-Trust Access", "SIEM Integration", "Incident Response"],
    status: "Available",
    color: "purple" as const,
  },
  {
    name: "CloudForge",
    tagline: "Multi-Cloud Orchestration",
    description: "Unified cloud management platform that simplifies multi-cloud deployments and optimizes costs automatically.",
    features: ["Multi-Cloud Deploy", "Cost Analytics", "Auto-Scaling", "IaC Templates"],
    status: "Available",
    color: "blue" as const,
  },
  {
    name: "FlowEngine",
    tagline: "Intelligent Automation",
    description: "Low-code automation platform that connects your entire tech stack and automates complex workflows.",
    features: ["Visual Builder", "500+ Integrations", "AI Triggers", "Analytics Dashboard"],
    status: "Beta",
    color: "purple" as const,
  },
  {
    name: "QuantumLeap",
    tagline: "Quantum Computing SDK",
    description: "Developer toolkit for building quantum-ready applications and algorithms for the next era of computing.",
    features: ["Quantum Circuits", "Hybrid Computing", "Simulator", "Cloud Access"],
    status: "Coming Soon",
    color: "blue" as const,
  },
  {
    name: "SynapseDB",
    tagline: "Vector Database",
    description: "High-performance vector database optimized for AI applications, semantic search, and embeddings.",
    features: ["Billion-Scale", "Real-time Index", "Multi-Modal", "Edge Deploy"],
    status: "Coming Soon",
    color: "purple" as const,
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <GlowOrb size="xl" color="plasma" className="top-0 left-1/2 -translate-x-1/2" />
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full glass-metal text-sm text-metal-purple-300 mb-6">
                Artifact Showcase
              </span>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
                <span className="text-foreground">Forged</span>
                <br />
                <span className="text-gradient-metal">Artifacts</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our suite of products, each engineered to perfection. 
                Tools that don't just solve problems—they transcend them.
              </p>
            </motion.div>
          </div>
        </section>
        
        <div className="energy-line" />
        
        {/* Products Grid */}
        <section className="relative py-24 overflow-hidden">
          <GlowOrb size="lg" color="blue" className="top-1/4 -right-32" />
          <GlowOrb size="md" color="purple" className="bottom-1/4 -left-32" />
          
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard glowColor={product.color} className="h-full flex flex-col relative overflow-hidden">
                    {/* Status Badge */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "Available" 
                        ? "bg-green-500/20 text-green-400" 
                        : product.status === "Beta"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-metal-blue-500/20 text-metal-blue-400"
                    }`}>
                      {product.status}
                    </div>
                    
                    {/* Product Icon */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                      product.color === "blue" 
                        ? "bg-metal-blue-500/20" 
                        : "bg-metal-purple-500/20"
                    }`}>
                      <Star className={`w-8 h-8 ${
                        product.color === "blue" 
                          ? "text-metal-blue-400" 
                          : "text-metal-purple-400"
                      }`} />
                    </div>
                    
                    <span className={`text-sm font-medium mb-2 ${
                      product.color === "blue" 
                        ? "text-metal-blue-400" 
                        : "text-metal-purple-400"
                    }`}>
                      {product.tagline}
                    </span>
                    
                    <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">
                      {product.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature) => (
                        <span 
                          key={feature} 
                          className="px-3 py-1 rounded-full glass-metal text-xs text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <Button 
                      variant={product.status === "Available" ? "default" : "outline"} 
                      className="w-full group"
                      disabled={product.status === "Coming Soon"}
                    >
                      {product.status === "Available" ? "Explore Product" : product.status === "Beta" ? "Join Beta" : "Coming Soon"}
                      {product.status !== "Coming Soon" && (
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Need a </span>
                <span className="text-gradient-metal">Custom Solution?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Our products are powerful, but sometimes you need something unique. 
                Let's build the perfect artifact for your specific needs.
              </p>
              <Button variant="hero" size="xl">
                Discuss Custom Build
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
