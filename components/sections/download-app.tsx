"use client";

import { motion } from "framer-motion";

export default function DownloadApp() {
  return (
    <section id="download" className="py-32 bg-[#F2F2F0] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        


        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <h2 className="font-zcool text-4xl md:text-5xl text-black tracking-tight mb-4 leading-[1.1]">
              Take Your Workflow<br />Anywhere You Go.
            </h2>
            <p className="text-black/40 text-xs font-bold uppercase tracking-widest mb-6">Native Mobile Applications</p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-black/50 text-lg md:text-xl font-bold leading-relaxed mb-10"
            >
              Stay synced across all your devices. Download the native MindFlow app to experience seamless offline support, push notifications, and widget tracking right from your home screen.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
               {/* Apple Store Button */}
               <button className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                  <svg viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8">
                     <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none gap-1">
                     <span className="text-[10px] opacity-70 font-semibold tracking-wider">Download on the</span>
                     <span className="text-xl font-bold tracking-tight">App Store</span>
                  </div>
               </button>
               
               {/* Google Play Button */}
               <button className="flex items-center gap-3 bg-white text-black border border-black/10 px-6 py-3.5 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                  <svg viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-black">
                     <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="flex flex-col items-start leading-none gap-1">
                     <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">Get it on</span>
                     <span className="text-xl font-bold tracking-tight">Google Play</span>
                  </div>
               </button>
            </motion.div>
          </div>

          {/* iPhone CSS Mockup Container */}
          <div className="flex-1 flex justify-center lg:justify-end relative w-full pt-10">
             
             {/* Abstract Background Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-pink-300/30 to-purple-400/30 blur-3xl rounded-full" />
             
             <motion.div 
               initial={{ y: 80, rotate: 5, opacity: 0 }}
               whileInView={{ y: 0, rotate: 5, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ type: "spring", stiffness: 50, damping: 20 }}
               className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-[12px] border-black shadow-2xl overflow-hidden"
             >
                {/* Dynamic Island Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-20" />
                
                {/* Volume Buttons (Right logic visual) */}
                <div className="absolute top-32 -left-[16px] w-[4px] h-12 bg-black rounded-l-md" />
                <div className="absolute top-48 -left-[16px] w-[4px] h-12 bg-black rounded-l-md" />
                
                {/* Power Button */}
                <div className="absolute top-40 -right-[16px] w-[4px] h-16 bg-black rounded-r-md" />

                {/* iPhone Screen UI rendering */}
                <div className="w-full h-full bg-[#F2F2F0] flex flex-col p-6 pt-16 relative overflow-hidden">
                   {/* Mockup Header */}
                   <div className="flex justify-between items-center mb-8">
                       <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MF</span>
                       </div>
                       <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center">
                          <div className="w-4 h-0.5 bg-black" />
                       </div>
                   </div>

                   {/* Mockup Typography */}
                   <h4 className="text-2xl font-black text-black leading-none mb-1 tracking-tightest">Today's Tasks</h4>
                   <p className="text-xs font-bold text-black/40 uppercase tracking-widest mb-8">4 Priorities Pending</p>

                   {/* Mockup Cards */}
                   <div className="space-y-4 relative z-10">
                      {[ 
                        { title: "Review Q3 Roadmaps", time: "10:30 AM", color: "bg-[#FFE5E5]" },
                        { title: "Client Sync Call", time: "01:00 PM", color: "bg-[#E5E9FF]" },
                        { title: "Deploy V2 Architecture", time: "04:45 PM", color: "bg-white" }
                      ].map((item, i) => (
                         <div key={i} className={`${item.color} p-5 rounded-2xl shadow-sm border border-black/5`}>
                             <div className="w-8 h-8 bg-black/5 rounded-full mb-4" />
                             <h5 className="font-bold text-black text-sm mb-1">{item.title}</h5>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-black/50">{item.time}</span>
                         </div>
                      ))}
                   </div>
                   
                   {/* Bottom Home Indicator */}
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full" />
                </div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
