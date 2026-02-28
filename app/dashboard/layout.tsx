"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. State for Sidebar and UI
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. Hook for Auth
  const { data: session } = useSession();

  // 3. Hydration fix for Next.js (ensures server/client HTML match)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[hsl(var(--background))] overflow-hidden">
      {/* Sidebar Component */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {/* Theme Toggle - Reusable Component */}
            <ThemeToggle />

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-4 border-l border-light-border dark:border-dark-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none text-light-text dark:text-dark-text">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-tighter font-semibold">
                  Free Plan
                </p>
              </div>
              <Image
                src={
                  session?.user?.image ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name || "default"}`
                }
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-orange-500/10"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 text-light-text dark:text-dark-text">
            {/* This is where app/dashboard/page.tsx (Home) 
               or app/dashboard/tasks/page.tsx will render.
            */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
