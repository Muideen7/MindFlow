"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO at TechStartup",
      content:
        "Nexus has completely transformed how our team collaborates. We've seen a 40% increase in productivity since switching.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      content:
        "The best project management tool we've ever used. The interface is intuitive and the features are exactly what we needed.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Operations Lead",
      content:
        "Finally, a tool that understands how modern teams work. The integrations are seamless and the support is exceptional.",
      rating: 5,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="testimonials" className="section py-24 md:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-light-accent/20 dark:border-dark-accent/20"
          >
            TESTIMONIALS
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight font-display mb-6">
            Loved by teams{" "}
            <span className="text-light-accent dark:text-dark-accent italic">
              everywhere
            </span>
          </h2>
          <p className="text-lg md:text-xl text-light-text/70 dark:text-dark-text/70 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about their experience with Nexus.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div key={idx} variants={item} className="card">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-light-text/80 dark:text-dark-text/80 mb-4 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-light-text dark:text-dark-text">
                  {testimonial.name}
                </p>
                <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
