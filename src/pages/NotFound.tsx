import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <GlowOrb size="xl" color="plasma" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowOrb size="lg" color="blue" className="top-20 -right-32" />
      <GlowOrb size="md" color="purple" className="bottom-20 -left-32" />
      
      <div className="text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h1 className="font-heading text-[150px] md:text-[200px] font-bold leading-none text-gradient-metal mb-4">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lost in the Void
          </h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto mb-10">
            The page you're looking for has drifted into another dimension. 
            Let us guide you back.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/">
                <Home className="mr-2 w-5 h-5" />
                Return Home
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
