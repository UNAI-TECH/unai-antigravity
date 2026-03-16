import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { LenisSmoothScroll } from "@/components/effects/LenisSmoothScroll";
import { FloatingNavbar } from "@/components/layout/FloatingNavbar";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Products from "./pages/Products";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";

import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ResponsiveTest from "./pages/ResponsiveTest";
import UnaiPac from "./pages/UnaiPac";
import NotFound from "./pages/NotFound";
import { DataProvider } from "@/context/DataContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DataProvider>
          <LenisSmoothScroll>
            <BrowserRouter>
              <FloatingNavbar />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/products" element={<Products />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/responsive-test" element={<ResponsiveTest />} />
                <Route path="/unai-pac" element={<UnaiPac />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </LenisSmoothScroll>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
