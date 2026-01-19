import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* FloatingNavbar removed in favor of HeroSection's integrated premium navbar */}
      {/* <FloatingNavbar /> */}
      <main>
        <HeroSection />
        <div className="energy-line" />
        <ServicesPreview />
        <div className="energy-line" />
        <AboutPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
