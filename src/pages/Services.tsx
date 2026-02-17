import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { MagicBento, ParticleCard } from "@/components/effects/MagicBento";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Cpu, Globe, Rocket, Code, ArrowRight, Check, ChevronDown, Server, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";

const categories = ["All Services", "AI", "Automation", "Software", "Infrastructure", "Security"];

const services = [
  {
    id: "cognitive-ai",
    icon: Cpu,
    title: "Cognitive AI Systems",
    description: "Engineering Intelligence That Understands Context, Not Just Data. We architect systems that integrate NLU, contextual reasoning, and autonomous decision-making.",
    features: ["Advanced Natural Language Systems", "Predictive Intelligence Platforms", "AI Assistant Ecosystems", "Custom AI Model Development"],
    category: "AI",
  },
  {
    id: "intelligent-software",
    icon: Code,
    title: "Intelligent Software Architecture",
    description: "Building Applications That Learn, Adapt, and Evolve. Custom platforms where AI isn't a feature — it's the foundation of the entire system.",
    features: ["Enterprise Intelligence Platforms", "Institutional Software Systems", "API-First Intelligent Backends", "Adaptive Analytics & Visualization"],
    category: "Software",
  },
  {
    id: "autonomous-ops",
    icon: Zap,
    title: "Autonomous Operations Engineering",
    description: "Where Your Systems Manage Themselves. Self-optimizing operational ecosystems where AI handles routine complexity and orchestrates workflows.",
    features: ["Intelligent Workflow Automation", "AI-Powered RPA", "Operational Intelligence", "Autonomous Agent Frameworks"],
    category: "Automation",
  },
  {
    id: "next-gen-infra",
    icon: Globe,
    title: "Next-Generation IT Infrastructure",
    description: "Digital Foundations Built for the Age of Intelligence. Cloud-native, AI-ready environments architected for continuous integration of emerging tech.",
    features: ["AI-Ready Cloud Architecture", "Intelligent System Integration", "Secure & Compliant Infra", "Digital Transformation Strategy"],
    category: "Software",
  },
  {
    id: "cloud-infrastructure",
    icon: Server,
    title: "Cloud Infrastructure",
    description: "Scalable, Resilient, and Engineered for Continuous Innovation. We architect cloud ecosystems that are secure, elastic, and optimized for AI-driven workloads.",
    features: ["Public & Hybrid Cloud Architecture", "Infrastructure as Code (IaC)", "Kubernetes Orchestration", "CI/CD & Cloud Automation"],
    category: "Infrastructure",
  },
  {
    id: "cybersecurity",
    icon: Lock,
    title: "Cybersecurity Engineering",
    description: "Security by Architecture, Not Afterthought. We design multi-layered security ecosystems that integrate advanced threat detection and zero-trust models.",
    features: ["Zero-Trust Architecture", "AI-Powered Threat Detection", "Secure API & IAM Frameworks", "Compliance & Vulnerability Management"],
    category: "Security",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Services");

  const filteredServices = services.filter(service =>
    activeCategory === "All Services" || service.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">


      <main className="pt-24 sm:pt-36"> {/* Increased top padding for mobile to clear navbar */}
        {/* SaaS Hero Section */}
        <section className="relative pb-12 px-4 sm:px-6 lg:px-10">
          <div className="max-w-[1920px] mx-auto relative overflow-hidden lg:overflow-visible rounded-[2.5rem] bg-slate-900 shadow-2xl">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
              <img
                src="/service-bg1.jpg"
                alt="Services Background"
                className="w-full h-full object-cover opacity-60"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#3B5BDB]/40 to-[#748FFC]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/20" />

              {/* Abstract Background Shapes - More expansive and soft - Moved inside overflow-hidden div */}
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-white/10 blur-[120px] rounded-full pointer-events-none z-1" />
              <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[90%] bg-blue-300/20 blur-[140px] rounded-full pointer-events-none z-1" />
              <div className="absolute top-[10%] right-[-5%] w-[40%] h-[50%] bg-white/5 blur-[90px] rounded-full pointer-events-none z-1" />
            </div>

            <div className="relative z-10 pt-24 pb-44 px-6 text-center max-w-5xl mx-auto"> {/* Reduced pt from 32 to 24 and pb from 56 to 44 to remove empty space */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  Comprehensive AI & Intelligent Systems Engineering
                </h1>
                <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                  UNAI TECH provides end-to-end technology solutions across artificial intelligence, software architecture, intelligent automation, and next-generation IT infrastructure.
                </p>

                {/* Responsive Category Selector */}
                <div className="w-full flex justify-center mb-6 px-4">
                  {/* Mobile Pill Selector (visible on smaller screens) */}
                  <div className="lg:hidden flex flex-wrap justify-center gap-2 max-w-sm sm:max-w-md">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${activeCategory === cat
                          ? "bg-white text-blue-600 shadow-lg shadow-white/10 scale-105"
                          : "bg-white/10 backdrop-blur-md text-white/70 border border-white/10 hover:bg-white/20 hover:text-white"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Desktop Pill Selector (visible on lg and up) */}
                  <div className="hidden lg:flex p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg gap-1 border border-white/20">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeCategory === cat
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Overlapping Services Grid - Adjusted overlap to match the reduced padding area */}
        <section className="relative pb-16 lg:pb-32 px-6 -mt-32 z-20"> {/* Changed -mt-40 to -mt-32 to match reduced pb-44 */}
          <div className="container mx-auto max-w-[1400px]"> {/* Widened grid container to match hero better */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="h-full flex flex-col bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 group transform-gpu">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#3B5BDB]" />
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#1F2937]">
                      {service.title}
                    </h3>

                    <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 flex-grow leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 font-medium">
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-50 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#3B5BDB]" strokeWidth={3} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full h-12 rounded-xl bg-[#3B5BDB] hover:bg-[#2F49B0] text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1"
                      onClick={() => navigate(`/services/${service.id}`)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models Section */}
        <section className="relative py-14 lg:py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-[#1F2937]">Engagement Models</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">How We Work With You</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Innovation Partnerships", desc: "Long-term collaborative relationships where we function as your extended R&D team." },
                { title: "Project-Based Engineering", desc: "Defined scope and clear deliverables for organizations with well-understood requirements." },
                { title: "Strategic Consulting", desc: "Advisory services for AI strategy, architecture design, and implementation roadmaps." },
                { title: "Retainer Support", desc: "Ongoing development, maintenance, and evolution of existing systems." }
              ].map((model, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <h3 className="font-heading text-xl font-bold mb-4 text-[#1F2937]">{model.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{model.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative py-14 lg:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold mb-6 text-[#1F2937]">Our Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "Understanding context and objectives." },
                { step: "02", title: "Architecture", desc: "Blueprints before code." },
                { step: "03", title: "Development", desc: "Iterative agile engineering." },
                { step: "04", title: "Deployment", desc: "Rollout and performance tuning." },
                { step: "05", title: "Evolution", desc: "Continuous improvement." }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="text-5xl font-bold text-blue-500/10 mb-4 group-hover:text-blue-500/20 transition-colors font-heading">{item.step}</div>
                  <h3 className="text-lg font-bold mb-2 text-[#1F2937]">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 lg:py-24 px-4 sm:px-6">
          <PremiumCTA
            title={<>Ready to Engineer Your <span className="text-blue-400">Intelligent Future?</span></>}
            description="Whether you need a single AI component or a complete operational transformation, UNAI TECH brings the expertise, architecture, and vision to make it reality."
            primaryButton={{
              label: "Schedule Consultation",
              onClick: () => navigate('/contact')
            }}
            secondaryButton={{
              label: "View Case Studies",
              onClick: () => navigate('/gallery')
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
