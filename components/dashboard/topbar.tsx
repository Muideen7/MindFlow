"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";

interface TopbarProps {
  setSidebarOpen: (value: boolean) => void;
}

export function Topbar({ setSidebarOpen }: TopbarProps) {
  const { data: session } = useSession();

  return (
    <header className="h-20 flex items-center justify-between px-6 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-900 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search projects, tasks, or team members..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-neutral-900 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-neutral-950" />
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 dark:border-neutral-900 mx-2" />
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold leading-none text-neutral-900 dark:text-white">
              {session?.user?.name || "User"}
            </p>
            <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-tighter font-bold">
              Project Manager
            </p>
          </div>
          <div className="relative">
            <Image
              src={`https://i.pravatar.cc/150?u=${session?.user?.name || "default"}`}
              alt="Profile"
              fill
              className="object-cover rounded-full ring-2 ring-orange-500/10 cursor-pointer hover:ring-orange-500/30 transition-all"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950" />
          </div>
        </div>
      </div>
    </header>
  );
}
