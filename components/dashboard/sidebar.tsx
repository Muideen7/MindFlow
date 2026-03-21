"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-white dark:bg-[hsl(var(--card))] 
          border-r border-[hsl(var(--border))]
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[hsl(var(--border))]">
          {!isCollapsed && (
            <Link
              href="/dashboard"
              className="font-bold text-black text-xl tracking-tight animate-in fade-in duration-300"
            >
              MindFlow
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all group
                hover:bg-orange-500/10 dark:hover:bg-orange-500/10
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.name : ""}
            >
              <item.icon
                size={22}
                className="text-slate-500 group-hover:text-orange-500 transition-colors shrink-0"
              />
              {!isCollapsed && (
                <span className="font-medium text-sm tracking-wide truncate animate-in slide-in-from-left-2">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-[hsl(var(--border))]">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={`
              flex items-center gap-3 w-full p-3 rounded-xl text-red-500 
              hover:bg-red-50 dark:hover:bg-red-950/20 transition-all
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-semibold">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
