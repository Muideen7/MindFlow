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
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-light-border dark:border-dark-border aspect-[3/2] w-full">
              <Image
                src="/hero-dashboard.png"
                alt="Nexus Dashboard - Modern Analytics Interface"
                width={1200}
                height={900}
                priority
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
