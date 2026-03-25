"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  variant?: "dropdown" | "simple";
  className?: string;
}

export default function ThemeToggle({
  variant = "dropdown",
  className = "",
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-light-border/20 dark:bg-dark-border/20 animate-pulse ${className}`}
      />
    );
  }

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  if (variant === "simple") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 ${className}`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 shadow-sm"
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun size={20} className="text-violet-500" />}
        {theme === "dark" && <Moon size={20} className="text-blue-400" />}
        {theme === "system" && <Monitor size={20} className="text-slate-500" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-40 rounded-2xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-card shadow-xl overflow-hidden z-50 p-1"
          >
            {themes.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 flex items-center justify-between rounded-xl text-sm transition-colors ${
                  theme === value
                    ? "bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent font-bold"
                    : "text-light-text dark:text-dark-text hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  {label}
                </div>
                {theme === value && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
