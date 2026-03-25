"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
          <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
            >
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout
            className="group flex items-center bg-black text-white p-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[56px] h-14 overflow-hidden"
          >
            <div className="flex items-center gap-3">
               <ArrowUp size={24} className="shrink-0" />
               <AnimatePresence>
                 {isHovered && (
                   <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-xs font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden pr-2"
                   >
                      Scroll To Top
                   </motion.span>
                 )}
               </AnimatePresence>
            </div>
          </motion.button>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
