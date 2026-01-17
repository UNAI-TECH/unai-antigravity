import { FloatingNavbar } from "@/components/layout/FloatingNavbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactPreview } from "@/components/sections/ContactPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      <main>
        <HeroSection />
        <div className="energy-line" />
        <ServicesPreview />
        <div className="energy-line" />
        <AboutPreview />
        <div className="energy-line" />
        <ContactPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
