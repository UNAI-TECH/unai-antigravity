import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export const FloatingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Events", href: "/events" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4"
    >
      <div
        className="mx-auto max-w-7xl transition-all duration-500 relative px-6 py-3"
      >

        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
              UNAI
            </span>
          </Link>

          {/* Desktop Navigation - Enhanced Glassmorphism */}
          <div className="hidden lg:flex items-center gap-1 relative bg-gradient-to-r from-[#0B1221]/50 via-[#0B1221]/60 to-[#0B1221]/50 backdrop-blur-xl rounded-full px-3 py-1.5 border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            {/* Lavender Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 blur-md" />
            <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-50" />

            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full group overflow-hidden ${isActive(item.href) ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Hover Background with Shine */}
                <div className={`absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full ${isActive(item.href) ? "translate-y-0 from-purple-500/20 via-blue-500/20 to-purple-500/20" : ""}`} />

                {/* Shimmer on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>

                {/* Active/Hover Indicator with Lavender Glow */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 transition-all duration-300 shadow-[0_0_8px_rgba(167,139,250,0.6)] ${isActive(item.href) ? "w-3/4" : "w-0 group-hover:w-3/4"}`} />

                {/* Glow Effect on Active */}
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-sm" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Enhanced */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className="relative px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transform hover:-translate-y-0.5 active:scale-95 overflow-hidden group block text-center"
            >
              <span className="relative z-10">Contact</span>
              {/* Animated Shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {/* Glow Border */}
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-24 left-4 right-4 bg-gradient-to-br from-[#0B1221]/95 via-[#0B1221]/98 to-[#0B1221]/95 backdrop-blur-2xl border border-purple-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] z-40"
        >
          {/* Lavender Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          <div className="p-6 flex flex-col gap-2 relative z-10">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`p-3 text-lg font-medium hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 rounded-xl transition-all border border-transparent hover:border-purple-500/20 ${isActive(item.href) ? "text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30" : "text-gray-300 hover:text-white"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-4" />
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-bold shadow-[0_0_30px_rgba(139,92,246,0.4)] active:scale-95 transition-transform relative overflow-hidden group block text-center"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-500" />
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default FloatingNavbar;
