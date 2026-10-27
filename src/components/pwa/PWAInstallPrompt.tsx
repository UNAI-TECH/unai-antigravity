import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Sparkles, Share2, PlusSquare } from "lucide-react";
import { usePWA } from "@/hooks/usePWA";

interface PWAInstallPromptProps {
  onInstalled?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onInstalled }) => {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWA();
  const [isOpen, setIsOpen] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // If already installed, don't show
    if (isInstalled) {
      setIsOpen(false);
      return;
    }

    // Check if dismissed recently (cooldown 2 days)
    const dismissedAt = localStorage.getItem("unai_pwa_dismissed_at");
    if (dismissedAt) {
      const diffDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (diffDays < 2) return;
    }

    // Delay prompt slightly after initial landing for silky user experience
    const timer = setTimeout(() => {
      if (isInstallable) {
        setIsOpen(true);
      } else if (isIOS) {
        // Show for iOS users who aren't in standalone mode
        setIsOpen(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled, isIOS]);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    const installed = await promptInstall();
    if (installed) {
      setIsOpen(false);
      if (onInstalled) onInstalled();
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("unai_pwa_dismissed_at", Date.now().toString());
  };

  if (isInstalled || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[990] w-[calc(100vw-2rem)] max-w-md p-5 rounded-3xl bg-[#0A0B10]/95 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 text-white"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-white/10 p-2 shadow-inner flex items-center justify-center shrink-0">
                  <img
                    src="/pwa-192x192.png"
                    alt="UNAI TECH App"
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0A0B10]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base tracking-tight text-white">
                      UNAI TECH App
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      PWA
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Install on your device for instant offline access
                  </p>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* iOS Instructions Guide */}
            {showIOSGuide ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2"
              >
                <p className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  Install on iOS Safari:
                </p>
                <ol className="space-y-1.5 list-decimal list-inside pl-1 text-slate-300">
                  <li className="flex items-center gap-1.5">
                    1. Tap the <Share2 className="w-3.5 h-3.5 text-blue-400 inline" /> Share button in Safari
                  </li>
                  <li className="flex items-center gap-1.5">
                    2. Scroll down and tap <PlusSquare className="w-3.5 h-3.5 text-blue-400 inline" /> <strong>Add to Home Screen</strong>
                  </li>
                  <li>3. Tap <strong>Add</strong> in the top-right corner</li>
                </ol>
              </motion.div>
            ) : (
              /* Features list */
              <div className="mt-3.5 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Blazing-fast load speed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Offline accessibility</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98] transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                {isIOS ? "Show How to Install" : "Install UNAI App"}
              </button>
              <button
                onClick={handleDismiss}
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
