import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, X } from "lucide-react";

interface PWAUpdateNotificationProps {
  needRefresh: boolean;
  onUpdate: () => void;
  onDismiss: () => void;
}

export const PWAUpdateNotification: React.FC<PWAUpdateNotificationProps> = ({
  needRefresh,
  onUpdate,
  onDismiss,
}) => {
  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[999] max-w-sm w-[calc(100vw-3rem)] rounded-2xl bg-[#0F111A]/95 border border-indigo-500/30 p-4 shadow-2xl backdrop-blur-xl text-white"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white tracking-wide">
                New Update Available
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                A new version of UNAI TECH is ready. Update now for the latest features & improvements.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={onUpdate}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Update Now
                </button>
                <button
                  onClick={onDismiss}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                >
                  Later
                </button>
              </div>
            </div>

            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
