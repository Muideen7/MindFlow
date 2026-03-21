"use client";

import { motion } from "framer-motion";
import { Command, Moon, RefreshCcw, Code2 } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-zcool text-4xl md:text-5xl text-white tracking-tight mb-4"
          >
            Smarter Tools.<br />Less Manual Work.
          </motion.h2>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Platform Engine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
           
           {/* Command Palette Bento */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="md:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.07] transition-colors"
           >
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-[#FF7A8E]/20 text-[#FF7A8E] rounded-2xl flex items-center justify-center mb-6">
                    <Command size={24} />
                 </div>
                 <h3 className="text-3xl font-zcool tracking-tightest mb-2">Command Everything</h3>
                 <p className="text-white/40 font-semibold max-w-sm text-sm">Navigate, assign, and organize without ever touching your mouse using our global command palette.</p>
              </div>
              
              {/* Decorative Mockup */}
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-32 bg-[#2C2C2C] rounded-tl-2xl border border-white/10 p-4 shadow-2xl flex items-start gap-4">
                 <div className="text-white/40 font-bold bg-white/5 px-2 py-1 rounded text-xs">&gt;_</div>
                 <div className="text-white/80 font-mono text-xs mt-1">Assign "Deploy API" to @alex today</div>
              </div>
           </motion.div>

           {/* Offline Mode Bento */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-white/[0.07] transition-colors text-center"
           >
              <div className="w-16 h-16 bg-[#C89CFE]/20 text-[#C89CFE] rounded-full flex items-center justify-center mb-6">
                 <RefreshCcw size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Offline First</h3>
              <p className="text-white/40 font-semibold text-sm">Local-first architecture ensures you can keep working even with no reception.</p>
           </motion.div>

           {/* Developer API Bento */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.07] transition-colors"
           >
              <div>
                 <div className="w-12 h-12 bg-[#8A9DFD]/20 text-[#8A9DFD] rounded-2xl flex items-center justify-center mb-6">
                    <Code2 size={24} />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">RESTful API</h3>
                 <p className="text-white/40 font-semibold text-sm">Build your own custom integrations directly into our robust JSON API engine.</p>
              </div>
           </motion.div>

           {/* Dark Mode Bento */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="md:col-span-2 bg-[#2C2C2C] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-black/0 via-black/40 to-black z-0 pointer-events-none" />
              <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8">
                 <div className="max-w-xs text-left">
                    <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                       <Moon size={24} />
                    </div>
                    <h3 className="text-3xl font-zcool tracking-tightest mb-2">Stunning Dark Mode</h3>
                    <p className="text-white/40 font-semibold text-sm">Every single component is expertly mapped to pure blacks and custom contrast variants to drastically reduce eye strain.</p>
                 </div>
                 
                 {/* Visual Mockup Arc */}
                 <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center relative shadow-[0_0_100px_rgba(255,255,255,0.05)] bg-[#1A1A1A]">
                    <div className="w-32 h-32 rounded-full border border-white/5 absolute" />
                    <div className="w-16 h-16 rounded-full bg-white/5 absolute shadow-inner" />
                 </div>
              </div>
           </motion.div>

        </div>
      </div>
    </section>
  );
}
