"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Code, Palette, Smartphone, Rocket } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance with real-time data sync and instant updates across all team members.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption with SOC 2 compliance and advanced permission controls.",
    },
    {
      icon: Code,
      title: "Powerful API",
      description:
        "Comprehensive REST API for custom integrations and deep workflow automation.",
    },
    {
      icon: Palette,
      title: "Fully Customizable",
      description:
        "White-label options with custom branding, themes, and workflows tailored to your needs.",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description:
        "Native mobile apps for iOS and Android with full feature parity.",
    },
    {
      icon: Rocket,
      title: "Scales with You",
      description:
        "Handle millions of operations seamlessly as your team and data grow exponentially.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section
      id="features"
      className="section bg-light-card/30 dark:bg-dark-card/30 py-24 md:py-32"
    >
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
            WHY NEXUS
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-display mb-6">
            Everything you need to{" "}
            <span className="text-light-accent dark:text-dark-accent italic">
              succeed
            </span>
          </h2>
          <p className="text-lg md:text-xl text-light-text/70 dark:text-dark-text/70 max-w-3xl mx-auto">
            Built for modern teams that need powerful collaboration tools,
            seamless integrations, and enterprise-grade reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={item}
                className="card group hover:shadow-xl"
              >
                <div className="mb-4 w-12 h-12 rounded-lg bg-light-accent/10 dark:bg-dark-accent/10 flex items-center justify-center group-hover:bg-light-accent dark:group-hover:bg-dark-accent transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-light-accent dark:text-dark-accent group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="subheading text-lg mb-2">{feature.title}</h3>
                <p className="text-light-text/70 dark:text-dark-text/70">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
