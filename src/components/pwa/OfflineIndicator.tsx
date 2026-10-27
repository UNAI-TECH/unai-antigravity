import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi } from "lucide-react";

export const OfflineIndicator: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowRestored(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[999] pointer-events-none">
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-2xl shadow-amber-500/10 pointer-events-auto"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <WifiOff className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold tracking-wide text-amber-200">
              Offline Mode · Serving cached content
            </span>
          </motion.div>
        )}

        {showRestored && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/90 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-2xl shadow-emerald-500/10 pointer-events-auto"
          >
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wide text-emerald-200">
              Connection Restored · Live
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
