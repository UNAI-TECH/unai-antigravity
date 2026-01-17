import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

export const FloatingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div
            className={`glass-metal rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "shadow-ambient-lg" : ""
            }`}
          >
            {/* Logo */}
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="font-heading text-2xl font-bold text-gradient-metal"
              >
                UNAI TECH
              </motion.div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-metal group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} isActive={location.pathname === link.path} />
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 z-40 mx-6 lg:hidden"
          >
            <div className="glass-metal rounded-2xl p-6 shadow-ambient-lg">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === link.path
                        ? "bg-gradient-metal text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="hero" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ name, path, isActive }: { name: string; path: string; isActive: boolean }) => {
  return (
    <Link to={path} className="relative group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "text-metal-blue-300"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {name}
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-metal-blue-400 shadow-glow-blue"
          />
        )}
        
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-metal-blue-500/5" />
      </motion.div>
    </Link>
  );
};

export default FloatingNavbar;
