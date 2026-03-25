"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

// True PixelArt Vector background to match the "Digital Trail" from screenshot
const PixelCloud = () => {
  const mapPattern = [
    "000000000000000000000000000000000001111000",
    "000000000000000000000000000000001101111100",
    "000000000000000000000000000000001101111110",
    "000000000000000000000000000000111111111110",
    "000000000000000000000000011000111111111110",
    "000000000000000000000000011011111111111100",
    "000000000000000000000111111111111111110000",
    "000000000000000000111111111111111110000000",
    "000000000000000000111111111111111110000000",
    "000000000000011111111111111111111100000000",
    "000000000000011111111111111111111100011000",
    "111100000000011111111111111111000000011000",
    "111111000000011111111111111111000000000000",
    "111111100111111111111111111100000000000000",
    "111111111111111111111111111100000000000000",
    "111111111111111111111110000000000000000000",
    "111111111111110110000000000000000000000000",
    "111000110000000000000000000000000000000000",
  ];

  const cols = mapPattern[0].length;
  const rows = mapPattern.length;

  return (
    <div className="absolute inset-x-0 top-64 h-[800px] pointer-events-none z-0 select-none overflow-hidden flex justify-center">
      <div className="w-full max-w-7xl relative mx-auto opacity-70 transform translate-x-4 md:translate-x-12">
        <svg viewBox={`0 0 ${cols} ${rows}`} className="w-[140%] md:w-[110%] lg:w-[90%] h-auto max-w-none transform -translate-y-6">
          <defs>
            <linearGradient id="heroGradient" x1="0" y1={rows} x2={cols} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A8E" />
              <stop offset="45%" stopColor="#C89CFE" />
              <stop offset="100%" stopColor="#8A9DFD" />
            </linearGradient>
          </defs>
          {mapPattern.map((row, y) => 
            row.split('').map((cell, x) => (
              cell === '1' ? (
                <motion.rect 
                  key={`${x}-${y}`} 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (x * 0.02) + (Math.random() * 0.1), duration: 0.4, ease: "easeOut" }}
                  x={x} 
                  y={y} 
                  width="1.05" 
                  height="1.05" 
                  rx="0.15" 
                  fill="url(#heroGradient)" 
                />
              ) : null
            ))
          )}
        </svg>
      </div>
    </div>
  )
};

const logos = [
  { 
    name: "Slack", 
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523A2.528 2.528 0 0 1 5.042 10.12a2.528 2.528 0 0 1 2.521 2.522v2.522H5.042zm2.522 0a2.528 2.528 0 0 1 2.523-2.523 2.528 2.528 0 0 1 2.523 2.523v6.305a2.528 2.528 0 0 1-2.523 2.522 2.528 2.528 0 0 1-2.523-2.522v-6.305zm0-7.567a2.528 2.528 0 0 1 2.523 2.522 2.528 2.528 0 0 1-2.523 2.522A2.528 2.528 0 0 1 5.042 10.12a2.528 2.528 0 0 1 2.522-2.522zm0-2.522a2.528 2.528 0 0 1-2.523-2.523A2.528 2.528 0 0 1 7.564 0a2.528 2.528 0 0 1 2.523 2.523v2.522H7.564zm7.567 0a2.528 2.528 0 0 1 2.522 2.523 2.528 2.528 0 0 1-2.522 2.522 2.528 2.528 0 0 1-2.523-2.522V2.523A2.528 2.528 0 0 1 15.131 0zm0 7.567a2.528 2.528 0 0 1 2.522-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.523h-2.522V7.567zm0 2.522a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.522 2.523v6.305a2.528 2.528 0 0 1-2.522 2.522A2.528 2.528 0 0 1 15.131 21.47v-6.305zm-7.567 0a2.528 2.528 0 0 1 2.523-2.523h6.305a2.528 2.528 0 0 1 2.522 2.523 2.528 2.528 0 0 1-2.522 2.522H10.087a2.528 2.528 0 0 1-2.523-2.522z"/></svg> 
  },
  { 
    name: "GitHub", 
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  },
  { 
    name: "Trello", 
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M2.5 0h19C22.88 0 24 1.12 24 2.5v19c0 1.38-1.12 2.5-2.5 2.5h-19C1.12 24 0 22.88 0 21.5v-19C0 1.12 1.12 0 2.5 0zm8.014 18.06V2.625H2.625v15.436c0 .546.444.99.99.99h5.899v-1zM21.375 11.25h-7.86a.99.99 0 0 1-.99-.99V2.625h7.86c.546 0 .99.444.99.99v6.645a.99.99 0 0 1-1 1z"/></svg> 
  },
  { 
    name: "Figma", 
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M8 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zm4-4c0 2.2-1.8 4-4 4v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8c0-2.2-1.8-4-4-4zm8 4c0 2.2-1.8 4-4 4v-8c2.2 0 4 1.8 4 4zm0 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z"/></svg> 
  },
  { 
    name: "Linear", 
    icon: <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.187 6c1.377 0 2.493 1.116 2.493 2.493 0 1.377-1.116 2.493-2.493 2.493H6.813c-1.377 0-2.493-1.116-2.493-2.493C4.32 7.116 5.436 6 6.813 6h10.374zm-2.316 4.907c1.377 0 2.493 1.116 2.493 2.493 0 1.377-1.116 2.493-2.493 2.493H6.813c-1.377 0-2.493-1.116-2.493-2.493 0-1.377 1.116-2.493 2.493-2.493h8.058zm-2.023 4.907c1.377 0 2.493 1.116 2.493 2.493 0 1.377-1.116 2.493-2.493 2.493H6.813c-1.377 0-2.493-1.116-2.493-2.493 0-1.377 1.116-2.493 2.493-2.493h6.035z"/></svg> 
  }
];

const stats = [
  { value: "50,000+", label: "Tasks completed every day" },
  { value: "10,000+", label: "Active users and growing" },
  { value: "92%", label: "Of users feel more productive" },
];

export default function Hero() {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden bg-[#F2F2F0]">
      <PixelCloud />
      <div className="section-container relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-3xl text-center mx-auto pb-10 mb-16 pt-10 relative z-20">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-zcool text-[3rem] md:text-[3.75rem] lg:text-[4.25rem] text-[#2C2C2C] leading-[1.05] tracking-tight mb-6"
          >
            Bring Your Team&apos;s<br />
            Chaos To Clarity.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm text-black/60 text-[15px] font-medium leading-relaxed mb-10 mx-auto"
          >
            An intelligent task manager that prioritizes, organizes, and automates your workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30 w-full"
          >
            <Link href="/signup" className="w-full sm:w-auto">
               <button className="h-14 px-10 w-full bg-[#2C2C2C] text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#1A1A1A] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/10 group overflow-hidden relative">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started — free
                    <Zap size={14} className="fill-white/20 text-white" />
                  </span>
                  <style jsx>{`
                    @keyframes shimmer {
                      from { transform: translateX(-100%); }
                      to { transform: translateX(100%); }
                    }
                    .animate-shimmer {
                      animation: shimmer 2s infinite;
                    }
                  `}</style>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer" />
               </button>
            </Link>
            
            <Link href="#stats" className="w-full sm:w-auto">
               <button className="h-14 px-10 w-full bg-white border border-black/5 text-[#2C2C2C] rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-black/5 transition-all hover:scale-105 active:scale-95">
                  View Demo
                  <ArrowRight size={16} className="text-black/40 group-hover:translate-x-1 transition-transform" />
               </button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Card Container */}
        <div id="stats" className="bg-[#2C2C2C] p-3 rounded-xl md:rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden">
           {/* Tier 1: Logo Carousel */}
           <div className="py-10 border-b border-white/[0.08] relative overflow-hidden group">
              <div className="flex gap-20 md:gap-32 animate-marquee whitespace-nowrap px-10">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <div key={i} className="flex items-center gap-3 backdrop-blur shadow-2xl bg-white/5 border border-white/10 rounded-xl px-5 py-3 hover:bg-white/10 transition-colors opacity-90 cursor-pointer">
                     {logo.icon}
                     <span className="text-white text-[10px] uppercase font-bold tracking-widest">{logo.name}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* Tier 2: Stats Grid */}
           <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 pt-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-10 h-64 flex flex-col justify-end relative rounded-xl border border-black/5 group hover:bg-[#F9FAFB] transition-all duration-300">
                   <div className="absolute top-8 right-8 w-2 h-2 bg-black rounded-full" />
                   <h4 className="font-zcool text-4xl md:text-[2.5rem] text-[#2C2C2C] tracking-tight mb-4 leading-none">{stat.value}</h4>
                   <p className="text-black/50 text-xs font-bold uppercase tracking-widest leading-snug">{stat.label}</p>
                </div>
              ))}
              
              <div className="md:col-span-2 bg-white p-10 h-64 rounded-xl border border-black/5 flex items-center group hover:bg-[#F9FAFB] transition-all duration-300 relative">
                  <div className="absolute top-8 right-8 w-2 h-2 bg-black rounded-full" />
                  <div className="grid grid-cols-2 gap-8 w-full h-full items-center">
                    <div className="flex flex-col justify-center border-r border-black/5 pr-4 h-full">
                       <h4 className="font-zcool text-4xl md:text-[2.5rem] text-[#2C2C2C] tracking-tight mb-4 leading-none">25+</h4>
                       <p className="text-black/50 text-xs font-bold uppercase tracking-widest leading-snug">Countries Using Us</p>
                    </div>
                    <div className="flex flex-col justify-center pl-4 h-full">
                       <h4 className="font-zcool text-4xl md:text-[2.5rem] text-[#2C2C2C] tracking-tight mb-4 leading-none">4.8/5</h4>
                       <p className="text-black/50 text-xs font-bold uppercase tracking-widest leading-snug">Avg 34k+ Rating</p>
                    </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
