"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { searchGlobal } from "@/app/actions/tasks";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect } from "react";

interface TopbarProps {
  setSidebarOpen: (value: boolean) => void;
}

export function Topbar({ setSidebarOpen }: TopbarProps) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchGlobal(debouncedQuery);
        setSearchResults(results);
      } finally {
        setIsSearching(false);
      }
    };
    performSearch();
  }, [debouncedQuery]);

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
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isSearching ? "text-violet-500" : "text-neutral-400"} transition-colors`} size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick search (tasks, projects...)"
            className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-transparent rounded-2xl text-sm focus:ring-2 focus:ring-violet-500/20 transition-all outline-none text-neutral-900 dark:text-white group shadow-sm dark:shadow-none"
          />

          {/* Search Dropdown Results */}
          <AnimatePresence>
            {searchQuery.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-3 bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-3xl shadow-2xl p-4 z-40 backdrop-blur-2xl"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 animate-pulse p-2">
                    <div className="w-4 h-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                    Searching workspace...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-8">
                     <p className="text-sm font-bold text-neutral-400">No results found for "{searchQuery}"</p>
                     <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2">Try searching for tasks or milestones</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                     {searchResults.some(r => r.category === 'project') && (
                       <div>
                         <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 mb-2">Projects</p>
                         <div className="space-y-1">
                            {searchResults.filter(r => r.category === 'project').map(proj => (
                              <button key={proj.id} className="w-full flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors group">
                                <span className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-violet-500">{proj.title}</span>
                                <span className="text-[10px] bg-white dark:bg-neutral-950 px-2 py-1 rounded-lg text-neutral-400">Active</span>
                              </button>
                            ))}
                         </div>
                       </div>
                     )}
                     
                     {searchResults.some(r => r.category === 'task') && (
                       <div>
                         <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1 mb-2">Tasks</p>
                         <div className="space-y-1">
                            {searchResults.filter(r => r.category === 'task').map(task => (
                              <Link 
                                href={`/dashboard/tasks?taskId=${task.id}`}
                                key={task.id} 
                                onClick={() => { setSearchQuery(""); setSearchResults([]); }}
                                className="w-full flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors group cursor-pointer"
                              >
                                <div className="text-left">
                                  <span className="text-sm font-bold text-neutral-900 dark:text-white block group-hover:text-violet-500">{task.title}</span>
                                  <span className="text-[10px] text-neutral-400 capitalize">{task.status}</span>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-violet-500'}`} />
                              </Link>
                            ))}
                         </div>
                       </div>
                     )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border-2 border-white dark:border-neutral-950" />
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 dark:border-neutral-900 mx-2" />
        
        <div className="relative group">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 pl-2 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-900 pr-2 py-1.5 rounded-xl group"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold leading-none text-neutral-900 dark:text-white group-hover:text-violet-500 transition-colors">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-tighter font-bold">
                {session?.user?.email || "Workspace Member"}
              </p>
            </div>
            
            <div className="relative group-hover:scale-105 active:scale-95 transition-transform">
              <UserAvatar 
                name={session?.user?.name}
                image={session?.user?.image}
                size="md"
              />
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-950 shadow-sm" />
            </div>
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-black/5 dark:border-white/5 p-2 z-50 backdrop-blur-xl"
                >
                  <div className="px-3 py-3 border-b border-black/5 dark:border-white/5 mb-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">{session?.user?.email}</p>
                  </div>
                  
                  <Link 
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-all border border-transparent hover:border-violet-500/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:bg-white dark:group-hover:bg-violet-500 transition-colors">
                      <User size={16} />
                    </div>
                    Account Profile
                  </Link>

                  <Link 
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-all border border-transparent hover:border-violet-500/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:bg-white dark:group-hover:bg-violet-500 transition-colors">
                      <Settings size={16} />
                    </div>
                    Workspace Settings
                  </Link>

                  <div className="h-[1px] bg-black/5 dark:bg-white/5 my-1" />
                  
                  <button 
                    onClick={() => {
                        setIsMenuOpen(false);
                        signOut({ callbackUrl: "/login" });
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <div className="p-1.5 bg-red-500/10 rounded-lg">
                      <LogOut size={16} />
                    </div>
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
