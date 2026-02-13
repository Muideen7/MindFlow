"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const companies = ["Stripe", "Notion", "Linear", "Vercel", "Figma"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="section-container">
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="flex items-center gap-2 px-5 py-2 mb-8 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-sm font-semibold border border-light-accent/20 dark:border-dark-accent/20 w-fit mx-auto lg:mx-0 sm:text-center"
            >
              <Sparkles size={16} />
              Introducing the future of productivity
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold mb-6 leading-tight text-light-text dark:text-dark-text text-center lg:text-left"
            >
              Build something{" "}
              <span className="text-light-accent dark:text-dark-accent italic">
                extraordinary
              </span>
              <br />
              with your team
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
              className="text-base sm:text-lg md:text-lg lg:text-xl text-light-text/70 dark:text-dark-text/70 mb-10 leading-relaxed text-center lg:text-left"
            >
              Nexus brings your team together with powerful collaboration tools,
              seamless workflows, and beautiful design. Work smarter, not
              harder.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
            >
              <Link
                href="/login"
                className="btn-primary group w-full sm:w-auto flex items-center justify-center"
              >
                Start for Free
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="#contact"
                className="btn-secondary w-full sm:w-auto text-center"
              >
                Learn More
              </a>
            </motion.div>

            {/* Trust Banner */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={fadeUp}
              className="text-center lg:text-left"
            >
              <p className="text-sm text-light-text/60 dark:text-dark-text/60 mb-4">
                Trusted by 10,000+ teams worldwide
              </p>

              <div className="flex gap-4 sm:gap-8 flex-wrap opacity-75 justify-center lg:justify-start">
                {companies.map((company) => (
                  <div
                    key={company}
                    className="text-lg font-bold text-light-text/50 dark:text-dark-text/50"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-dashboard.jpg"
                alt="Nexus Dashboard - Modern Analytics Interface"
                width={800}
                height={600}
                priority
                className="w-full h-auto"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-light-accent/20 to-transparent dark:from-dark-accent/30" />
            </div>

            {/* Floating Card - Productivity Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-light-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-xl shadow-2xl border border-light-border dark:border-dark-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl">
                  📈
                </div>
                <div>
                  <div className="text-2xl font-bold text-light-text dark:text-dark-text">
                    40%
                  </div>
                  <div className="text-sm text-light-text/70 dark:text-dark-text/70">
                    Productivity Increase
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge - Team Size */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-light-bg-secondary dark:bg-dark-bg-secondary px-6 py-3 rounded-full shadow-lg border border-light-border dark:border-dark-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-light-accent border-2 border-light-bg-secondary dark:border-dark-bg-secondary" />
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-light-bg-secondary dark:border-dark-bg-secondary" />
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-light-bg-secondary dark:border-dark-bg-secondary" />
                </div>
                <span className="text-sm font-semibold text-light-text dark:text-dark-text">
                  +10K Teams
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
