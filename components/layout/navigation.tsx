"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <nav className="section-container py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-display text-2xl font-bold text-light-text dark:text-dark-text">
          Nexus
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Get Started Button */}
          <a href="#contact" className="hidden md:block btn-primary">
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-light-border dark:bg-dark-border hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-white transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg"
        >
          <div className="section-container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors py-2 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary inline-block mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
