import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PremiumCTA } from "@/components/ui/PremiumCTA";
import SEO from "@/components/SEO";

import ColumnGridBackground from "@/components/effects/ColumnGridBackground";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExploreNow = () => {
    window.open("https://www.myvidyon.com/", "_blank", "noopener,noreferrer");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.product-panel') as HTMLElement[];
      
      // Pin the container and animate each panel from the bottom up, snapping sequentially
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (panels.length * window.innerHeight),
        }
      });
      
      // Initially, panel 0 is in view. We animate subsequent panels sliding up to cover the previous.
      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.fromTo(panel, 
          { yPercent: 100 },
          { yPercent: 0, ease: "none" }
        );
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO
        title="Products"
        description="Experience the next generation of intelligent systems with UNAI TECH's specialized product ecosystems."
      />

      <main>
        {/* GSAP Parallax Pinned Container */}
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-50">
          
          {/* Panel 1: Vidyo AI */}
          <div className="product-panel absolute inset-0 z-10 w-full h-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)]">
             <ColumnGridBackground className="opacity-40 md:opacity-100" />
             <div className="container relative z-10 mx-auto px-4 sm:px-6 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 <div className="min-h-full flex items-center justify-center pt-24 pb-8">
                     <div className="relative z-10 bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 md:p-16 shadow-2xl w-full max-w-7xl">
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-16 relative z-10">
                          <div className="flex-1 relative w-full max-w-sm lg:max-w-none mx-auto">
                            <div className="relative p-2 md:p-4 flex justify-center">
                              <img src="/ai_platform_illustration.png" alt="Vidyo Ai platform" width="600" height="500" className="max-h-[25vh] lg:max-h-none w-auto lg:w-full h-auto rounded-3xl object-contain" />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100/50 rounded-full blur-3xl -z-10 hidden sm:block" />
                            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-100/30 rounded-full blur-3xl -z-10 hidden sm:block" />
                          </div>
                          <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 text-[#1F2937] leading-tight">
                              Vidyo <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ai platform</span>
                            </h1>
                            <p className="text-base sm:text-xl font-medium text-blue-600/80 mb-2">Reimagine the way you work with next-generation AI technology.</p>
                            <p className="text-sm sm:text-lg text-gray-700/80 mb-5 sm:mb-6 leading-relaxed">Automate operations, unlock insights, and accelerate growth with a solution designed for modern organizations.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8 text-left">
                              <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                  <CheckCircle2 size={18} />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Faster Execution</span>
                              </div>
                              <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
                                  <CheckCircle2 size={18} />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Seamless Integration</span>
                              </div>
                            </div>
                            <Button onClick={() => navigate("/vidyo-ai")} size="lg" className="h-12 sm:h-14 px-8 sm:px-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-200 transition-all hover:scale-105 w-full sm:w-auto">
                              Explore more <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                          </div>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
          
          {/* Panel 2: My Vidyon */}
          <div className="product-panel absolute inset-0 z-20 w-full h-full bg-slate-50 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
             <div className="container relative z-10 mx-auto px-4 sm:px-6 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 <div className="min-h-full flex items-center justify-center pt-24 pb-8">
                     <div className="relative z-10 bg-white/70 backdrop-blur-3xl border border-white/50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 md:p-16 shadow-2xl w-full max-w-7xl">
                        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 relative z-10">
                          <div className="flex-1 relative w-full max-w-sm lg:max-w-none mx-auto">
                            <div className="relative p-2 md:p-4 flex justify-center">
                              <img src="/illustration2.png" alt="Vidyon ERP Illustration" width="600" height="500" className="max-h-[25vh] lg:max-h-none w-auto lg:w-full h-auto rounded-3xl object-contain" />
                            </div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10 hidden sm:block" />
                            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-100/30 rounded-full blur-3xl -z-10 hidden sm:block" />
                          </div>
                          <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 text-[#1F2937] leading-tight">
                              My Vidyon <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ERP Solution</span>
                            </h1>
                            <p className="text-sm sm:text-lg text-gray-700/80 mb-5 sm:mb-6 leading-relaxed">Transform your educational institution with our comprehensive ERP ecosystem. Bridge communication, automate administration, and empower learning with a system designed for excellence and scale.</p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8 text-left">
                              <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                  <CheckCircle2 size={18} />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Unified Data</span>
                              </div>
                              <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                                  <CheckCircle2 size={18} />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-800">Real-time Sync</span>
                              </div>
                            </div>
                            <Button onClick={handleExploreNow} size="lg" className="h-12 sm:h-14 px-8 sm:px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 transition-all hover:scale-105 w-full sm:w-auto">
                              Explore Now <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                          </div>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
          
          {/* Panel 3: Swaxthika */}
          <div className="product-panel absolute inset-0 z-30 w-full h-full bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
             <div className="container relative z-10 mx-auto px-4 sm:px-6 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                 <div className="min-h-full flex items-center justify-center pt-24 pb-8">
                     <div className="relative z-10 bg-slate-50/70 backdrop-blur-3xl border border-white/50 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 md:p-16 shadow-2xl w-full max-w-7xl">
                        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 relative z-10">
                          <div className="flex-1 relative w-full max-w-sm lg:max-w-none mx-auto">
                            <div className="relative p-2 md:p-4 flex justify-center">
                              <img src="/illustration-1.png" alt="Swaxthika Platform Illustration" width="600" height="500" className="max-h-[25vh] lg:max-h-none w-auto lg:w-full h-auto rounded-3xl object-contain" />
                            </div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10 hidden sm:block" />
                            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-indigo-100/30 rounded-full blur-3xl -z-10 hidden sm:block" />
                          </div>
                          <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-3 sm:mb-4">
                              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                              <span className="text-[10px] sm:text-xs font-bold text-blue-700 tracking-widest uppercase">Coming Soon</span>
                            </div>
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-[#1F2937] leading-tight">
                              Swaxthika <br />
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-xl sm:text-2xl md:text-4xl">Tradition meets Technology</span>
                            </h1>
                            <p className="text-sm sm:text-lg text-gray-700/80 mb-5 sm:mb-6 leading-relaxed">A comprehensive digital platform designed to serve the cultural, spiritual, and celebratory needs of Indian families. Bringing together five deeply connected life experiences under one roof.</p>
                            <div className="grid grid-cols-2 gap-3 lg:gap-5 mb-6 sm:mb-8 text-left">
                              {["Sacred Store", "Astrology", "Matrimony", "Wedding & Catering"].map((pillar) => (
                                <div key={pillar} className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                                  <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                                    <CheckCircle2 size={14} className="sm:w-[20px] sm:h-[20px]" />
                                  </div>
                                  <span className="text-[10px] sm:text-sm font-semibold text-gray-800 leading-tight">{pillar}</span>
                                </div>
                              ))}
                            </div>
                            <Button disabled size="lg" className="h-12 sm:h-14 px-8 sm:px-10 rounded-2xl bg-white text-slate-400 cursor-not-allowed shadow-none border border-slate-200 w-full sm:w-auto">
                              Launching Soon
                            </Button>
                          </div>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
        </div>

        {/* PremiumCTA Merged Here */}
        <div className="py-16 sm:py-24 bg-[#F8FAFC] relative z-40">
          <PremiumCTA
            title={<>Empower Your Institution <br />With <span className="text-blue-500">My Vidyon</span></>}
            description="Join hundreds of schools already transforming their administrative workflows and academic excellence."
            primaryButton={{
              label: "Schedule Free Demo",
              onClick: () => navigate('/contact')
            }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;