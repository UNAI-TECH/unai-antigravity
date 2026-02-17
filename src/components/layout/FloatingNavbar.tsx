import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export const FloatingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Track if we've scrolled past the hero threshold (approx 100px)
  const [scrolledPastHero, setScrolledPastHero] = useState(location.pathname !== "/");

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrolledPastHero(true);
      return;
    }

    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 120) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY, location.pathname]);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "PRODUCTS", href: "/products" },
    { name: "EVENTS", href: "/events" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CAREERS", href: "/careers" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Pill-shaped Navbar */}
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl rounded-full px-6 md:px-8 h-16 flex items-center justify-between transition-all duration-300 relative z-50">

          {/* Logo Container with fixed width to prevent layout shift */}
          <div className="w-32 flex items-center">
            <AnimatePresence>
              {scrolledPastHero && (
                <Link to="/" className="flex items-center group">
                  <motion.img
                    layoutId="unai-logo"
                    src="/unai-logo.png"
                    alt="UNAI TECH"
                    className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      opacity: { duration: 0.2 }
                    }}
                  />
                </Link>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.filter(item => !["GALLERY", "CAREERS"].includes(item.name)).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative group py-2"
              >
                <span
                  className={`text-[13px] font-bold tracking-wide transition-all duration-300 ${isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                  {item.name}
                </span>

                {/* Active/Hover Dot Indicator */}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full transition-all duration-300 ${isActive(item.href)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 p-2 rounded-full hover:bg-black/5 transition-colors relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-in Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-[300px] bg-white z-50 shadow-2xl lg:hidden flex flex-col overflow-y-auto"
              >
                <div className="p-6 pt-24 flex flex-col gap-2 h-full">
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={`block px-6 py-4 text-lg font-bold tracking-wide rounded-xl transition-all ${isActive(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="h-px bg-gray-100 my-4 mx-4" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-6 py-4 text-lg font-bold text-center text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
