"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup");

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Productivity", href: "#productivity" },
    { label: "Pricing", href: "#pricing" },
    { label: "Download", href: "#download" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-black/5">
       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tightest group flex items-center gap-3 text-black">
             <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center p-2 group-hover:rotate-12 transition-transform">
                <div className="w-full h-full bg-white opacity-40 rounded-sm" />
             </div>
             MindFlow
          </Link>

          {/* Nav */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-12">
               {navItems.map(item => (
                 <Link 
                   key={item.label} 
                   href={item.href}
                   onClick={(e) => {
                     e.preventDefault();
                     document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                     setIsOpen(false);
                   }}
                   className="text-[13px] font-semibold text-black/60 hover:text-black transition-colors px-2"
                 >
                   {item.label}
                 </Link>
               ))}
            </div>
          )}

          {/* Right */}
          <div className="flex items-center gap-4">
             {!isAuthPage && (
               <Link 
                 href="/signup" 
                 className="hidden md:block bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full text-[11px] font-bold hover:bg-black transition-colors"
               >
                 Start Free Trial
               </Link>
             )}
             
             {!isAuthPage && (
               <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 text-black">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
             )}
          </div>
       </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[160] bg-[#F2F2F0] md:hidden flex flex-col justify-center items-center p-8 text-center h-[100dvh] overflow-hidden"
          >
             {/* Animated SVG Background Patterns */}
             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-end">
                <motion.svg 
                   viewBox="0 0 100 100" 
                   preserveAspectRatio="none"
                   className="w-full h-[60%] opacity-20 absolute bottom-0"
                   initial={{ y: 100 }}
                   animate={{ y: 0 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                >
                   <motion.path 
                      fill="#FF7A8E"
                      animate={{ d: [
                        "M0,100 C20,40 50,80 80,30 C100,0 100,20 100,20 L100,100 Z", 
                        "M0,100 C30,70 60,30 80,50 C100,70 100,40 100,40 L100,100 Z", 
                        "M0,100 C20,40 50,80 80,30 C100,0 100,20 100,20 L100,100 Z"
                      ]}}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                   />
                </motion.svg>
                <motion.svg 
                   viewBox="0 0 100 100" 
                   preserveAspectRatio="none"
                   className="w-full h-[80%] opacity-20 absolute bottom-0 mix-blend-multiply"
                   initial={{ y: 100 }}
                   animate={{ y: 0 }}
                   transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                >
                   <motion.path 
                      fill="#8A9DFD"
                      animate={{ d: [
                        "M0,100 C30,60 40,110 70,50 C90,-10 100,40 100,10 L100,100 Z", 
                        "M0,100 C20,80 50,20 70,60 C90,100 100,20 100,20 L100,100 Z", 
                        "M0,100 C30,60 40,110 70,50 C90,-10 100,40 100,10 L100,100 Z"
                      ]}}
                      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                   />
                </motion.svg>
             </div>

             {/* Close Button Inside Modal */}
             <button 
               onClick={() => setIsOpen(false)}
               className="absolute top-8 right-8 p-3 text-black bg-white rounded-full shadow-lg z-20 hover:scale-110 transition-transform"
             >
                <X size={24} />
             </button>

             <div className="flex flex-col gap-10 items-center justify-center w-full mt-10 z-10">
               {navItems.map((item, i) => (
                 <motion.div
                   key={item.label}
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 + (i * 0.1) }}
                 >
                    <Link 
                      href={item.href} 
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className="text-5xl font-zcool font-bold text-black tracking-tightest leading-none hover:text-black/60 transition-colors"
                    >
                       {item.label}
                    </Link>
                 </motion.div>
               ))}
               
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.6 }}
                 className="mt-12 flex flex-col gap-8 items-center"
               >
                  <Link 
                     href="/signup" 
                     onClick={() => setIsOpen(false)}
                     className="bg-black text-white px-10 py-5 rounded-[2rem] text-lg font-bold shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition-all uppercase tracking-widest"
                  >
                    Start Free Trial
                  </Link>
               </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
