// app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu, Moon, Sun } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[hsl(var(--background))] overflow-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`
        flex-1 flex flex-col min-w-0 transition-all duration-300
        ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
      `}
      >
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[hsl(var(--border))] text-slate-500 hover:text-orange-500 transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[hsl(var(--border))]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter font-semibold">
                  Free Plan
                </p>
              </div>
              <Image
                src={
                  session?.user?.image ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name}`
                }
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-orange-500/10"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
