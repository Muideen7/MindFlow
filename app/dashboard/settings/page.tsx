"use client";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun, Lock } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="space-y-4">
        <h2 className="text-xs font-bold opacity-40 uppercase tracking-widest">
          Preferences
        </h2>
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl divide-y divide-[hsl(var(--border))]">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-950/40 rounded-2xl text-orange-600">
                {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <p className="font-bold text-sm">Appearance</p>
                <p className="text-xs opacity-50">Currently in {theme} mode</p>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-12 h-6 rounded-full transition-all relative ${theme === "dark" ? "bg-orange-600" : "bg-slate-300"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === "dark" ? "left-7" : "left-1"}`}
              />
            </button>
          </div>

          {/* Dummy Toggle for Notifications */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">Push Notifications</p>
                <p className="text-xs opacity-50">Alerts for task deadlines</p>
              </div>
            </div>
            <div className="w-12 h-6 rounded-full bg-orange-600 relative">
              <div className="absolute top-1 left-7 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
