"use client";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">Settings</h1>

      <div className="space-y-4">
        <h2 className="text-xs font-bold opacity-40 uppercase tracking-widest text-light-text dark:text-dark-text">
          Preferences
        </h2>
        <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl divide-y divide-light-border dark:divide-dark-border">
          {/* Theme Toggle - Using Reusable Component */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950/40 rounded-2xl text-blue-700">
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text">Appearance</p>
                <p className="text-xs opacity-50 text-light-text dark:text-dark-text">Currently in {theme} mode</p>
              </div>
            </div>
            {/* Using the simple variant toggle to maintain UI consistency while being DRY */}
            <ThemeToggle variant="simple" />
          </div>

          {/* Dummy Toggle for Notifications */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-light-text dark:text-dark-text">Push Notifications</p>
                <p className="text-xs opacity-50 text-light-text dark:text-dark-text">Alerts for task deadlines</p>
              </div>
            </div>
            <div className="w-12 h-6 rounded-full bg-blue-700 relative">
              <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
