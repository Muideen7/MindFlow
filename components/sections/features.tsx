"use client";

import { motion } from "framer-motion";
import { Search, Activity, Bell, FileSearch, Layers, Target, Zap } from "lucide-react";

// Refined 12x12 High-Resolution Pixel Art System
const PixelArt = ({ pattern, colorClass }: { pattern: string[], colorClass: string }) => {
    return (
        <div className="grid grid-cols-12 gap-1 w-56 md:w-64 aspect-square group-hover:scale-105 transition-transform duration-700">
            {pattern.map((row, i) => row.split("").map((cell, j) => (
                <motion.div 
                    key={`${i}-${j}`} 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: cell === "1" ? 1 : 0, scale: cell === "1" ? 1 : 0 }}
                    transition={{ delay: (i + j) * 0.005, duration: 0.5 }}
                    className={`w-full h-full rounded-[1px] ${cell === "1" ? `${colorClass} shadow-[0_0_10px_rgba(255,255,255,0.05)]` : "bg-transparent"}`} 
                />
            )))}
        </div>
    );
};

const PinkCreature = () => {
    const pattern = [
        "000011110000",
        "001111111100",
        "011111111110",
        "111001100111",
        "111001100111",
        "111111111111",
        "111111111111",
        "011111111110",
        "001110011100",
        "011000000110",
        "110010010011",
        "100010010001"
    ];
    return <PixelArt pattern={pattern} colorClass="bg-pink-100" />;
};

const BlueCreature = () => {
    const pattern = [
        "001100001100",
        "000110011000",
        "001111111100",
        "011011110110",
        "011111111110",
        "110110011011",
        "110001100011",
        "111101101111",
        "011111111110",
        "001101101100",
        "011001100110",
        "110000000011"
    ];
    return <PixelArt pattern={pattern} colorClass="bg-blue-100" />;
};

const bubbles = [
  { icon: Search, label: "Auto-sorts" },
  { icon: Target, label: "Prioritizes" },
  { icon: Zap, label: "Suggests" },
  { icon: Bell, label: "Reminds" },
  { icon: Activity, label: "Learns" },
  { icon: Layers, label: "Simplifies" },
  { icon: FileSearch, label: "Tracks" },
];

const productivityNodes = [
  { id: 0, title: "AI sort", num: "01" },
  { id: 1, title: "Assign", num: "02" },
  { id: 2, title: "Remind", num: "03" },
  { id: 3, title: "Sort", num: "04" }
];

import { useState } from "react";

export default function Features() {
  const [activeNode, setActiveNode] = useState(0);
  const [rotation, setRotation] = useState(0);

  const handleHover = (index: number) => {
    if (activeNode === index) return;
    setActiveNode(index);
    
    // Always rotate clockwise (add positive degrees)
    const targetMod = (360 - index * 90) % 360;
    const currentMod = rotation % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;
    
    setRotation(prev => prev + delta);
  };

  return (
    <section id="features" className="py-40 bg-[#F2F2F0] overflow-hidden">
      <div className="section-container">
        
        {/* Global Section Header */}
        <div className="text-center mb-24 flex flex-col items-center">
           <h2 className="font-zcool text-4xl md:text-5xl text-black mb-4 tracking-tight">
             A New Standard For Task Management
           </h2>
           <p className="text-black/40 text-xs font-bold uppercase tracking-widest">Core Capabilities</p>
        </div>

        {/* Feature 1 - Normal */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-40">
           <div className="flex-1 max-w-xl text-left">
              <h2 className="font-zcool text-xl md:text-2xl lg:text-3xl leading-[1.2] text-black tracking-tight mb-8">
                Explore How Our AI-Powered<br />
                Task Manager Helps You<br />
                Stay On Top Of Work,<br />
                Every Step Of The Way.
              </h2>
              <p className="text-black/50 text-lg md:text-xl font-bold leading-relaxed max-w-md">
                 That&apos;s why we built an intelligent platform that goes beyond tracking tasks—it understands them.
              </p>
           </div>
           
           <div className="flex-1 w-full relative">
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/[0.03] bg-[#2C2C2C]"
              >
                 <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                       <PinkCreature />
                    </motion.div>
                 </div>
                 <div className="bg-[#FFE5E5] p-8 md:p-10 flex justify-between items-center relative z-10 border-t border-black/10">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-pink-500 block mb-2">SYNC — 01</span>
                        <h3 className="text-2xl font-bold text-black tracking-tightest">Fast Platform Sync</h3>
                    </div>
                    <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                        Details
                    </button>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Feature 2 - Reversed */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 mb-48">
           <div className="flex-1 w-full relative">
              <motion.div 
                whileHover={{ y: -10 }}
                className="flex flex-col h-[500px] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/[0.03] bg-[#2C2C2C]"
              >
                 <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                       <BlueCreature />
                    </motion.div>
                 </div>
                 <div className="bg-[#E5E9FF] p-8 md:p-10 flex justify-between items-center relative z-10 border-t border-black/10">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-500 block mb-2">LOGIC — 02</span>
                        <h3 className="text-2xl font-bold text-black tracking-tightest">Automated Reminders</h3>
                    </div>
                    <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                        Details
                    </button>
                 </div>
              </motion.div>
           </div>
           
           <div className="flex-1 max-w-xl text-left lg:pl-12">
              <h2 className="font-zcool text-xl md:text-2xl lg:text-3xl leading-[1.2] text-black tracking-tight mb-8">
                At Worm.AI, We Believe Task<br />
                Management Should Be More<br />
                Than <span className="text-gray-400">Just A To-Do List.</span>
              </h2>
              <p className="text-black/50 text-lg md:text-xl font-bold leading-relaxed max-w-md">
                 That&apos;s why we built an intelligent platform that goes beyond tracking tasks—it understands them.
              </p>
           </div>
        </div>

        {/* Productivity Arc Section */}
        <div id="productivity" className="flex flex-col items-center justify-center text-center pt-24 pb-0 relative scroll-mt-32">
           <div className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden flex justify-center">
              
              {/* Spinning Wheel */}
              <motion.div 
                 className="absolute top-24 w-[900px] h-[900px] rounded-full border border-black/15 flex items-center justify-center"
                 animate={{ rotate: rotation }}
                 transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
              >
                 {productivityNodes.map((node, i) => {
                    const angle = i * 90;
                    return (
                      <div 
                        key={node.id}
                        className="absolute w-48 h-48 flex items-center justify-center"
                        style={{
                           transform: `rotate(${angle}deg) translateY(-450px)` // Distance to the circle border
                        }}
                        onMouseEnter={() => handleHover(i)}
                      >
                         {/* Counter-rotation to keep the text upright */}
                         <motion.div 
                           className="w-full h-full rounded-full flex items-center justify-center cursor-pointer"
                           animate={{ rotate: -(rotation + angle) }}
                           transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                         >
                            {activeNode === i ? (
                               <div className="relative w-full h-full flex items-center justify-center bg-[#F2F2F0] rounded-full scale-110 shadow-2xl shadow-black/5 transition-all">
                                  {/* Dashed outer ring */}
                                  <div className="absolute inset-2 rounded-full border border-dashed border-black/30 animate-[spin_10s_linear_infinite]" />
                                  <div className="w-[75%] h-[75%] rounded-full bg-gradient-to-br from-[#FF7A8E] via-[#D4A1FF] to-[#8A9DFD] flex items-center justify-center">
                                     <div className="w-[75%] h-[75%] rounded-full bg-[#F2F2F0] flex flex-col items-center justify-center gap-1">
                                        <span className="text-2xl font-black text-black leading-none">{node.num}</span>
                                        <span className="text-[10px] font-bold text-black">{node.title}</span>
                                     </div>
                                  </div>
                               </div>
                            ) : (
                               <div className="w-full h-full bg-[#F2F2F0] rounded-full flex flex-col items-center justify-center opacity-40 hover:opacity-80 transition-opacity gap-1">
                                   <span className="text-2xl font-bold text-black">{node.num}</span>
                                   <span className="text-[10px] font-bold text-black">{node.title}</span>
                               </div>
                            )}
                         </motion.div>
                      </div>
                    )
                 })}
              </motion.div>

              {/* Centered Productivity Text */}
              <div className="absolute bottom-10 flex flex-col items-center justify-center z-10 pointer-events-auto">
                 <div className="bg-[#F2F2F0] px-12 py-6 rounded-[3rem] flex flex-col items-center shadow-[0_-40px_80px_#F2F2F0]">
                   <h3 className="font-zcool text-4xl md:text-5xl text-black mb-10 tracking-tightest">Your AI Productivity</h3>
                   <div className="flex flex-wrap items-center justify-center gap-3 max-w-[400px]">
                      {bubbles.map((box, i) => (
                         <div 
                            key={i} 
                            className="flex items-center gap-1.5 bg-white/50 border border-black/5 px-4 py-2 rounded-full text-black/60 shadow-sm"
                         >
                            <span className="text-[12px] font-bold block pb-0.5">+</span>
                            <span className="text-[10px] font-bold text-black tracking-widest uppercase">
                              {box.label}
                            </span>
                         </div>
                      ))}
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
