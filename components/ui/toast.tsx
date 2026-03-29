"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: {
      bg: "bg-emerald-50/90 dark:bg-emerald-500/10",
      border: "border-emerald-200/50 dark:border-emerald-500/20",
      text: "text-emerald-900 dark:text-emerald-300",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      glow: "shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]",
    },
    error: {
      bg: "bg-rose-50/90 dark:bg-rose-500/10",
      border: "border-rose-200/50 dark:border-rose-500/20",
      text: "text-rose-900 dark:text-rose-300",
      icon: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      glow: "shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]",
    },
    info: {
      bg: "bg-blue-50/90 dark:bg-blue-500/10",
      border: "border-blue-200/50 dark:border-blue-500/20",
      text: "text-blue-900 dark:text-blue-300",
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      glow: "shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]",
    },
  };

  const current = styles[type] || styles.info;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className={`fixed bottom-6 right-6 max-w-sm w-full backdrop-blur-xl rounded-2xl border ${current.bg} ${current.border} ${current.glow} p-4 z-[9999] flex items-center gap-4`}
      >
        <div className="flex-shrink-0">
          {current.icon}
        </div>
        
        <p className={`text-xs font-bold uppercase tracking-wider flex-1 ${current.text}`}>
          {message}
        </p>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5 text-black/20 hover:text-black dark:text-white/20 dark:hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Progress bar for auto-dismiss */}
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full origin-left bg-current opacity-20`}
        />
      </motion.div>
    </AnimatePresence>
  );
}
