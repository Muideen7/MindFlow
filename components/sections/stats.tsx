"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    {
      value: "10K+",
      label: "Teams",
    },
    {
      value: "500K+",
      label: "Users",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
    {
      value: "4.9/5",
      label: "Rating",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 md:py-20 border-t border-light-border dark:border-dark-border">
      <div className="section-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={item} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-light-text dark:text-dark-text mb-2">
                {stat.value}
              </div>
              <p className="text-light-text/70 dark:text-dark-text/70 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
