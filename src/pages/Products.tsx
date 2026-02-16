import { motion } from "framer-motion";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, Layout, Users, BarChart3, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";

import Grainient from "@/components/effects/Grainient";
import ColumnGridBackground from "@/components/effects/ColumnGridBackground";

const features = [
  {
    icon: Layout,
    title: "Unified Administration",
    description: "Centrally manage students, staff, and operations with our intuitive dashboard.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Seamless Communication",
    description: "Bridge the gap between parents, teachers, and students with real-time updates.",
    color: "purple"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make data-driven decisions with comprehensive performance and attendance reports.",
    color: "indigo"
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    description: "Enterprise-grade security to keep all educational and personal data protected.",
    color: "blue"
  },
  {
    icon: Zap,
    title: "Instants Reports",
    description: "Generate academic, financial, and attendance reports with a single click.",
    color: "purple"
  },
  {
    icon: Globe,
    title: "Anywhere Access",
    description: "Fully responsive platform accessible from mobile, tablet, or desktop devices.",
    color: "indigo"
  }
];

const Products = () => {
  const navigate = useNavigate();
  const handleExploreNow = () => {
    window.open("https://www.myvidyon.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <FloatingNavbar />

      <main>
        {/* Premium Framing Hero Section */}
        <section className="relative mx-4 my-4 rounded-[2.5rem] md:rounded-[4rem] min-h-[calc(100dvh-2rem)] flex items-center justify-center overflow-hidden pt-20 shadow-2xl bg-white">
          {/* New Framing Background Component */}
          <ColumnGridBackground />

          <div className="container relative z-10 mx-auto px-6 h-full flex flex-col items-center justify-center py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl relative -top-12 sm:-top-24 md:-top-48"
            >
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl font-bold text-[#0D2872] mb-8 leading-tight tracking-tight">
                My Vidyon
                <span className="text-blue-500"> - ERP Solution</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium tracking-wide">
                Organize <span className="mx-2 opacity-30">|</span> Educate <span className="mx-2 opacity-30">|</span> Elevate
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-6 sm:px-0">
                <Button
                  className="w-full sm:w-auto rounded-full bg-[#0D2872] text-white hover:bg-blue-900 px-12 h-16 text-lg font-bold shadow-2xl transition-all hover:scale-105"
                  onClick={() => navigate("/contact")}
                >
                  Schedule Demo
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-2 border-slate-200 bg-white/30 backdrop-blur-md text-[#0D2872] hover:bg-slate-50 px-12 h-16 text-lg font-bold transition-all hover:scale-105"
                  onClick={handleExploreNow}
                >
                  Explore <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Side-by-Side ERP Solution Section with Triple Mockup PEeking */}
        <section className="relative z-20 -mt-12 sm:-mt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-transparent to-white">
          <div className="container mx-auto relative">

            {/* Triple Mobile Mockup Peek Layout (Behind Card) */}
            <div className="absolute -top-20 sm:-top-48 md:-top-72 left-1/2 -translate-x-1/2 w-full max-w-[850px] md:max-w-[1100px] flex items-end justify-center pointer-events-none z-0 px-4 sm:px-10">
              {/* Left Phone */}
              <motion.div
                initial={{ opacity: 0, y: 100, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-1/2 sm:w-1/3 md:w-[336px] -mr-16 sm:-mr-24 md:-mr-36"
              >
                <img src="/6.png" alt="Mockup Left" className="w-full h-auto drop-shadow-2xl opacity-90" />
              </motion.div>

              {/* Center Phone (Higher) */}
              <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-3/5 sm:w-2/5 md:w-[441px] z-10 -mb-8 sm:-mb-10 md:-mb-16"
              >
                <img src="/5.png" alt="Mockup Center" className="w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)]" />
              </motion.div>

              {/* Right Phone */}
              <motion.div
                initial={{ opacity: 0, y: 100, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="w-1/2 sm:w-1/3 md:w-[336px] -ml-16 sm:-ml-24 md:-ml-36"
              >
                <img src="/7.png" alt="Mockup Right" className="w-full h-auto drop-shadow-2xl opacity-90" />
              </motion.div>
            </div>

            <div className="relative z-10 bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                {/* Left Column: Illustration with Glows */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 relative"
                >
                  <div className="relative p-2 md:p-4">
                    {/* The Illustration */}
                    <img
                      src="/illustration2.png"
                      alt="Vidyon ERP Illustration"
                      className="w-full h-auto rounded-3xl" />
                  </div>

                  {/* Background decorative elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10" />
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-100/30 rounded-full blur-3xl -z-10" />
                </motion.div>

                {/* Right Column: Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1"
                >
                  <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold mb-6 text-[#1F2937] leading-tight">
                    My Vidyon <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      ERP Solution
                    </span>
                  </h1>

                  <p className="text-lg text-gray-700/80 mb-8 leading-relaxed">
                    Transform your educational institution with our comprehensive ERP ecosystem.
                    Bridge communication, automate administration, and empower learning with
                    a system designed for excellence and scale.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">Unified Data</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">Real-time Sync</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={handleExploreNow}
                      size="xl"
                      className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 transition-all hover:scale-105"
                    >
                      Explore Now
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {/* PremiumCTA Merged Here */}
          <div className="mt-16 sm:mt-24">
            <PremiumCTA
              title={<>Empower Your Institution <br />With <span className="text-blue-300">My Vidyon</span></>}
              description="Join hundreds of schools already transforming their administrative workflows and academic excellence."
              primaryButton={{
                label: "Schedule Free Demo",
                onClick: () => navigate('/contact')
              }} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
