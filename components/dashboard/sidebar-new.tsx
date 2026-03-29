"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Calendar, 
  FileText, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  X,
  Users
} from "lucide-react";
import Image from "next/image";
import ThemeToggle from "@/components/ui/theme-toggle";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export function SidebarNew({
  isCollapsed,
  setIsCollapsed,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Tasks", href: "/dashboard/tasks", icon: CheckSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
  ];

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-[#F2F2F0] dark:bg-[#1A1A1A]
          lg:bg-transparent lg:dark:bg-transparent
          lg:border-none
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
          ${isCollapsed ? "lg:w-[80px]" : "lg:w-72"}
        `}
      >
        <div className={`
          flex flex-col h-full w-full relative
          ${isCollapsed ? "lg:h-fit lg:mt-6 lg:ml-4 lg:bg-[#F2F2F0]/80 lg:dark:bg-[#1A1A1A]/80 lg:backdrop-blur-xl lg:rounded-3xl lg:border lg:border-black/5 lg:dark:border-white/5 lg:shadow-2xl overflow-visible" : "bg-[#F2F2F0] dark:bg-[#1A1A1A] border-r border-black/5 dark:border-white/5"}
          transition-all duration-500
        `}>
          {/* Header / Logo */}
          <div className="h-20 flex items-center justify-between px-6 shrink-0 pt-4">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-[#2C2C2C] dark:bg-white rounded-lg flex items-center justify-center p-1.5 transition-transform group-hover:rotate-6 active:scale-95">
                <div className="w-full h-full bg-white dark:bg-[#1A1A1A] opacity-40 rounded-[2px]" />
              </div>
              {!isCollapsed && (
                <span className="font-zcool font-bold text-xl tracking-tight text-[#2C2C2C] dark:text-white transition-opacity">
                  MindFlow
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-neutral-500 hover:text-black dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all group relative
                    ${isActive 
                      ? "bg-[#2C2C2C] text-white dark:bg-white dark:text-[#2C2C2C] shadow-lg shadow-black/5" 
                      : "text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"}
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                >
                  <div className={`transition-transform flex items-center justify-center shrink-0 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                    <item.icon size={isCollapsed ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  
                  {!isCollapsed && (
                    <span className="font-bold text-[11px] uppercase tracking-widest truncate">
                      {item.name}
                    </span>
                  )}

                  {isCollapsed && (
                    <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#2C2C2C] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 z-[100] shadow-xl whitespace-nowrap">
                       {item.name}
                    </div>
                  )}
                  
                  {isActive && !isCollapsed && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-white dark:bg-[#2C2C2C] rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Area */}
          <div className={`p-4 space-y-4 shrink-0 transition-opacity ${isCollapsed ? "" : "border-t border-black/5 dark:border-white/10"}`}>
            <button className={`
              flex items-center justify-center gap-2 bg-[#2C2C2C] dark:bg-white text-white dark:text-[#2C2C2C] rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg active:scale-95 group overflow-hidden relative
              ${isCollapsed ? "w-10 h-10 mx-auto" : "w-full py-2.5"}
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A8E] to-[#8A9DFD] opacity-0 group-hover:opacity-100 transition-opacity" />
              <Plus size={isCollapsed ? 20 : 16} className="relative z-10" />
              {!isCollapsed && <span className="relative z-10">New Project</span>}
            </button>

            <div className={`flex items-center ${isCollapsed ? "flex-col gap-4" : "justify-between"}`}>
              <ThemeToggle variant="simple" />
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={isCollapsed ? 22 : 20} />
              </button>
            </div>
          </div>
        </div>

        {/* Toggle Button - Fixed to Viewport Edge */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            hidden lg:flex fixed top-10 z-[60] items-center justify-center w-8 h-8 bg-[#F2F2F0] dark:bg-[#1A1A1A] border border-black/5 dark:border-white/10 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95
            ${isCollapsed ? "left-[84px]" : "left-[272px]"}
          `}
        >
          <div className={`transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`}>
             <ChevronLeft size={16} className="text-neutral-500 hover:text-black dark:hover:text-white" />
          </div>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
