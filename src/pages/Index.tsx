import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Differentiation } from "@/components/sections/Differentiation";
import { VisionBlock } from "@/components/sections/VisionBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* FloatingNavbar removed in favor of HeroSection's integrated premium navbar */}
      {/* <FloatingNavbar /> */}
      <main>
        <HeroSection />
        <ServicesPreview />
        <div className="energy-line" />
        <Differentiation />
        <VisionBlock />
        <div className="energy-line" />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
