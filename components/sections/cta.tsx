"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function CTA() {
  const [openId, setOpenId] = useState<number | null>(null);
  return (
    <section className="py-24 bg-[#F2F2F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1A1A1A] rounded-[3rem] p-16 md:p-24 text-center text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Ready to transform your<br />team's workflow?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Join 10,000+ teams who are already using MindFlow to bring clarity to their chaos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
          
          {/* Background Decorative Pixels */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF7A8E]/10 to-[#C89CFE]/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#8A9DFD]/10 to-[#C89CFE]/10 blur-3xl" />
        </div>

        {/* Professional Q&A Accordion */}
        <div className="mt-40 max-w-3xl mx-auto pb-32">
          <div className="text-center mb-16">
             <h3 className="font-zcool text-4xl md:text-5xl text-black tracking-tightest mb-4">Frequently Asked Questions</h3>
             <p className="text-black/40 text-xs font-bold uppercase tracking-widest">Everything you need to know about the product.</p>
          </div>
          
          <div className="flex flex-col gap-4">
             {[
                { q: "Is there a free trial available?", a: "Yes, you can try all premium features completely free for 14 days. No credit card required to start." },
                { q: "Can I manage multiple teams?", a: "Absolutely. Our Team and Enterprise plans allow you to create unlimited isolated workspaces under a single billing account." },
                { q: "Do you offer integrations?", a: "We natively sync with Slack, Notion, GitHub, Trello, and Linear out of the box. Zapier support is also available." },
                { q: "What happens to my data if I cancel?", a: "You have full ownership of your data. If you cancel, you will have a 30-day window to export everything securely as JSON or CSV before it is permanently wiped." },
             ].map((faq, i) => (
                <div 
                   key={i} 
                   className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                   onClick={() => setOpenId(openId === i ? null : i)}
                >
                   <div className="p-6 md:p-8 flex items-center justify-between">
                      <h4 className="text-lg md:text-xl font-bold text-black">{faq.q}</h4>
                      <motion.div 
                        initial={false}
                        animate={{ rotate: openId === i ? 180 : 0 }}
                        className="text-black/30"
                      >
                         {openId === i ? <Minus size={20} /> : <Plus size={20} />}
                      </motion.div>
                   </div>
                   <AnimatePresence>
                     {openId === i && (
                        <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                           <div className="px-6 md:px-8 pb-8 pt-0 text-black/60 font-medium leading-relaxed">
                              {faq.a}
                           </div>
                        </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
