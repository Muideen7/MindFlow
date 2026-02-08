"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-light-border dark:bg-dark-border" />
    );
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-light-border dark:bg-dark-border hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-white transition-all duration-300"
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun size={20} />}
        {theme === "dark" && <Moon size={20} />}
        {theme === "system" && <Monitor size={20} />}
      </button>

      <div className="absolute right-0 mt-2 w-40 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="py-2">
          {[
            { value: "light", icon: Sun, label: "Light" },
            { value: "dark", icon: Moon, label: "Dark" },
            { value: "system", icon: Monitor, label: "System" },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`w-full px-4 py-2 flex items-center gap-2 text-left hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors ${
                theme === value
                  ? "text-light-accent dark:text-dark-accent font-semibold"
                  : "text-light-text dark:text-dark-text"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
