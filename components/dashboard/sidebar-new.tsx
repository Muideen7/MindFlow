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
  Search,
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

  const teamMembers = [
    { name: "Alice", seed: "Alice" },
    { name: "Bob", seed: "Bob" },
    { name: "Charlie", seed: "Charlie" },
    { name: "David", seed: "David" },
  ];

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-white dark:bg-neutral-950
          border-r border-gray-200 dark:border-neutral-900
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
          ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Header / Logo */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0">
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
                MindFlow
              </span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xl">M</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-neutral-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 p-3 rounded-xl transition-all group relative
                  ${isActive 
                    ? "bg-blue-600/10 text-blue-700 dark:text-blue-600"
                    : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"}
                  ${isCollapsed ? "justify-center" : ""}
                `}
                title={isCollapsed ? item.name : ""}
              >
                <item.icon
                  size={20}
                  className={`shrink-0 ${isActive ? "text-blue-700 dark:text-blue-600" : "group-hover:text-neutral-900 dark:group-hover:text-white"}`}
                />
                {!isCollapsed && (
                  <span className="font-medium text-sm">
                    {item.name}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <div className="absolute right-0 w-1 h-5 bg-blue-600 rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Team Members */}
        {!isCollapsed && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-neutral-900">
            <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-3">
              Team Members
            </p>
            <div className="flex -space-x-2">
              {teamMembers.map((member) => (
                <div key={member.name} className="relative group">
                  <div className="relative shrink-0 w-8 h-8">
                    <Image
                      src={`https://i.pravatar.cc/150?u=${member.seed}`}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover ring-2 ring-white dark:ring-neutral-950 border border-gray-200 dark:border-neutral-800 group-hover:ring-blue-600/20 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900" />
                  </div>
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {member.name}
                  </div>
                </div>
              ))}
              <button className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-gray-200 dark:border-neutral-800 text-neutral-500 hover:text-blue-600 transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Footer Area */}
        <div className="p-4 space-y-2 border-t border-gray-100 dark:border-neutral-900 shrink-0">
          {!isCollapsed && (
            <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              <Plus size={18} />
              New Project
            </button>
          )}
          {isCollapsed && (
            <button className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl mx-auto shadow-lg shadow-blue-600/20 transition-all active:scale-95">
              <Plus size={20} />
            </button>
          )}

          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} pt-2`}>
            <ThemeToggle variant="simple" />
            {!isCollapsed && (
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-full py-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all underline decoration-transparent hover:decoration-current text-[10px] font-bold"
          >
            {isCollapsed ? "EXPAND" : "COLLAPSE"}
          </button>
        </div>
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
