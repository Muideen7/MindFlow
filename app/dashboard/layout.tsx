"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut, Moon, Sun, CheckSquare, LayoutDashboard, User, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const userName = session?.user?.name || "User";

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg transition-colors">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-light-bg-secondary dark:bg-dark-bg-card border-r-4 border-yellow-400 dark:border-yellow-500/50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-8">
          <Link href="/dashboard" className="text-2xl font-bold text-light-accent dark:text-dark-accent">
            Nexus
          </Link>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-light-text/80 dark:text-dark-text/80 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link
              href="/dashboard/tasks"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-light-text/80 dark:text-dark-text/80 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition"
            >
              <CheckSquare size={18} />
              Tasks
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-light-text/80 dark:text-dark-text/80 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition"
            >
              <User size={18} />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-light-text/80 dark:text-dark-text/80 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition"
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-light-text/80 dark:text-dark-text/80 hover:bg-red-500/20 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-light-bg-secondary dark:bg-dark-bg-card border-b border-light-border dark:border-dark-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-light-text dark:text-dark-text"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-light-text dark:text-dark-text">
                {greeting} {userName}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 text-light-text dark:text-dark-text transition"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-light-accent dark:border-dark-accent"
              />
            ) : (
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                alt={userName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-light-accent dark:border-dark-accent"
              />
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-light-bg dark:bg-dark-bg">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
