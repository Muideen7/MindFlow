"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, Play } from "lucide-react";

// Refined PixelCloud to match the large gradient graphic in the screenshot
const PixelCloud = () => {
  const mapPattern = [
    "000000000000000000010011111000",
    "000000000000000001111111111100",
    "000000000000000111111111111110",
    "000000000000011111111111111110",
    "000000000011111111111111111100",
    "000111111111111111111111111100",
    "011111111111111111111111111000",
    "111111111111111111111110000000",
    "111111111111111111111110000000",
    "111111111111111110000000000000",
    "111111111111100000000000000110",
    "111111111100000000000000001110",
    "111111100000000000000000011110",
    "011111000000000000000000111110",
    "001111000000000000000111111110",
    "000110000000000000000111111110",
  ];

  const cols = mapPattern[0].length;
  const rows = mapPattern.length;

  return (
    <div className="absolute right-0 top-0 w-full lg:w-3/4 h-full pointer-events-none z-0 select-none overflow-hidden flex justify-end">
      <div className="w-full relative opacity-60 translate-x-12 translate-y-12 lg:translate-y-0">
        <svg viewBox={`0 0 ${cols} ${rows}`} className="w-full h-auto">
          <defs>
            <linearGradient id="heroCloudGrad" x1="0" y1="0" x2={cols} y2={rows} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A8E" />
              <stop offset="50%" stopColor="#C89CFE" />
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
                  transition={{ delay: (x * 0.015) + (y * 0.01), duration: 0.5 }}
                  x={x} 
                  y={y} 
                  width="0.95" 
                  height="0.95" 
                  rx="0.1" 
                  fill="url(#heroCloudGrad)" 
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
  { name: "GONG", color: "text-white/40" },
  { name: "Webflow", color: "text-white/40" },
  { name: "Spotify", color: "text-white/40" },
  { name: "BRAINLY", color: "text-white/40" },
  { name: "AXIS", color: "text-white/40" },
  { name: "qualtrics", color: "text-white/40" },
  { name: "WordPress.com", color: "text-white/40" },
  { name: "inmobi", color: "text-white/40" },
];

const statsData = [
  { value: "50,000+", label: "Tasks completed every day" },
  { value: "10,000+", label: "Active users and growing" },
  { value: "92%", label: "Of users feel more productive" },
  { value: "25+", label: "Countries using our platform" },
  { value: "4.8/5", label: "Average 34k+ user rating" },
];

export default function Hero() {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden bg-[#F2F2F0]">
      <PixelCloud />
      
      <div className="section-container relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Row 1: Left-aligned Heading */}
        <div className="max-w-3xl text-left pt-10 pb-6 lg:pb-10 relative z-20">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-zcool text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] text-[#2C2C2C] leading-[0.95] tracking-tight mb-8"
          >
            Bring Your Team&apos;s<br />
            Chaos To Clarity.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm text-black/60 text-[18px] font-medium leading-relaxed mb-6"
          >
            An intelligent task manager that prioritizes, organizes, and automates your workflow.
          </motion.p>

        </div>

        {/* Centered CTA row - Pulled up closer to heading area */}
        <div className="flex justify-center w-full mb-12 lg:mb-16 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="h-14 px-10 w-full bg-[#2C2C2C] text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2">
                Get Started
                <Zap size={14} className="fill-white/20 text-white" />
              </button>
            </Link>
            
            <Link href="#view-demo" className="w-full sm:w-auto">
              <button className="h-14 px-10 w-full bg-white border border-black/10 text-black rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:bg-black/5 transition-all hover:scale-105 active:scale-95">
                View Demo
                <Play size={14} className="fill-black/20 text-black translate-x-0.5" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Row 2: Dark Stats Card */}
        <div id="stats" className="w-full bg-[#2C2C2C] p-4 rounded-[2rem] md:rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden relative group">
           {/* Tier 1: Logo Row */}
           <div className="py-12 px-6 border-b border-white/[0.05] relative overflow-hidden">
              <div className="flex flex-wrap justify-between items-center gap-10 lg:gap-0">
                {logos.map((logo, i) => (
                  <div key={i} className={`text-[11px] md:text-[13px] font-black tracking-[0.2em] ${logo.color} hover:text-white transition-colors cursor-default`}>
                    {logo.name}
                  </div>
                ))}
              </div>
           </div>

           {/* Tier 2: 5 White Stats Boxes */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 lg:p-6">
              {statsData.map((stat, i) => (
                <div key={i} className="bg-white p-8 lg:p-10 h-64 flex flex-col justify-end relative rounded-[1.5rem] border border-black/5 hover:bg-[#F9FAFB] transition-all duration-300">
                   <div className="absolute top-8 right-8 w-2 h-2 bg-black rounded-full" />
                   <h4 className="font-zcool text-[2.5rem] lg:text-[2.8rem] text-[#2C2C2C] tracking-tighter mb-4 leading-none">{stat.value}</h4>
                   <p className="text-black/50 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] leading-snug">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
