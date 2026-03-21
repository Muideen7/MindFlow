"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = [
    {
      name: "Free Plan",
      monthlyPrice: "0",
      annualPrice: "0",
      period: "/Forever",
      annualPeriod: "/Forever",
      desc: "Individuals Trying Out AI Task Management",
      features: [
        "Up To 50 Tasks Per Month",
        "Basic AI Prioritization",
        "Standard Reminders",
        "Single-Device Access",
        "Community Support",
      ],
      color: "bg-white",
      buttonStyle: "bg-black text-white",
      buttonText: "Start For Free"
    },
    {
      name: "Pro Plan",
      monthlyPrice: "12",
      annualPrice: "99",
      period: "/Month",
      annualPeriod: "/Year",
      desc: "Freelancers & Professionals Who Need More Power",
      features: [
        "Unlimited Tasks & Projects",
        "Advanced AI Suggestions",
        "Smart Recurring Tasks",
        "Cross-Platform Sync (Web & Mobile)",
        "Email & Chat Support",
      ],
      color: "bg-white",
      buttonStyle: "bg-black text-white",
      buttonText: "Upgrade To Pro"
    },
    {
      name: "Team Plan",
      monthlyPrice: "29",
      annualPrice: "249",
      period: "/Month",
      annualPeriod: "/Year",
      desc: "Teams And Businesses That Collaborate Daily",
      features: [
        "Everything In Pro",
        "Team Collaboration & Shared Workspaces",
        "Real-Time Project Tracking",
        "Admin Controls & Reporting",
        "More Integrations (Slack, Notion & Trello)",
      ],
      color: "bg-[#1A1A1A] text-white underline-none",
      buttonStyle: "bg-white text-black",
      buttonText: "Get Started With Team",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-40 bg-[#F2F2F0]">
      <div className="section-container">
        <div className="text-center mb-16 flex flex-col items-center border-none">
          <h2 className="font-zcool text-4xl md:text-5xl text-black mb-4 tracking-tight">
            Transparent Pricing For All Businesses
          </h2>
          <p className="text-black/40 text-xs font-bold uppercase tracking-widest mb-12">Flexible Plans</p>
          
          <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-none border border-gray-100 flex items-center shadow-lg relative">
             <button 
                onClick={() => setIsAnnual(false)}
                className={`px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all z-10 ${!isAnnual ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
             >
                Monthly Billing
             </button>
             <button 
                onClick={() => setIsAnnual(true)}
                className={`px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all z-10 ${isAnnual ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black'}`}
             >
                Annual Billing
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`p-8 lg:p-10 flex flex-col items-start text-left relative group transition-all duration-500 min-h-[600px] rounded-none shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-black/[0.03] ${plan.color}`}
            >
              {plan.name === "Team Plan" && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  {/* Pixelated cutouts for top right corner matched to #F2F2F0 background */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#F2F2F0]" />
                  <div className="absolute top-0 right-8 w-4 h-4 bg-[#F2F2F0]" />
                  <div className="absolute top-8 right-0 w-4 h-4 bg-[#F2F2F0]" />
                  <div className="absolute top-4 right-12 w-2 h-2 bg-[#F2F2F0]" />
                  <div className="absolute top-12 right-4 w-2 h-2 bg-[#F2F2F0]" />
                </div>
              )}

              <div className="mb-6 w-full">
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{plan.name}</h3>
                <p className={`text-xs font-bold leading-relaxed max-w-[200px] uppercase tracking-widest opacity-40`}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-6 w-full min-h-[60px]">
                 <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold tracking-tightest leading-none">
                       ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <div className="flex flex-col">
                       <span className="text-sm font-bold opacity-20 uppercase tracking-widest">
                          {isAnnual ? plan.annualPeriod : plan.period}
                       </span>
                       {isAnnual && plan.annualPrice !== "0" && (
                          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-0.5">
                             Billed Annually
                          </span>
                       )}
                    </div>
                 </div>
              </div>

              <button className={`w-full py-4 font-bold text-sm tracking-widest uppercase mb-8 transition-all hover:opacity-90 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

              <div className="w-full space-y-4 text-left flex-1">
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-6 border-b border-black/5 pb-3">What&apos;s Included:</p>
                 {plan.features.map(f => (
                   <div key={f} className="flex items-start gap-4 text-xs font-bold opacity-80 leading-snug">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-none ${plan.color.includes('white') ? 'bg-black' : 'bg-white'}`} />
                      {f}
                   </div>
                 ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-10 opacity-20 hover:opacity-100 transition-opacity grayscale order-2 md:order-1">
              {["Slack", "Notion", "Trello"].map(tool => (
                <span key={tool} className="text-2xl font-bold tracking-tightest">{tool}</span>
              ))}
           </div>
           
           <div className="flex items-center gap-8 order-1 md:order-2">
              <span className="text-3xl font-bold text-black tracking-tightest">Integrations</span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 max-w-[120px]">Works With Your Team Suite</p>
           </div>
        </div>
      </div>
    </section>
  );
}
