"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#integrations" },
        { label: "Changelog", href: "#changelog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Blog", href: "#blog" },
        { label: "Careers", href: "#careers" },
        { label: "Press", href: "#press" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#documentation" },
        { label: "Help Center", href: "#help" },
        { label: "Community", href: "#community" },
        { label: "API", href: "#api" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
        { label: "Security", href: "#security" },
        { label: "Cookies", href: "#cookies" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Muideen7",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/Muideen7",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/OlayeyeMuideen",
      label: "Twitter",
    },
  ];

  return (
    <footer className="bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
      <div className="section-container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1 text-center sm:text-left"
          >
            <h3 className="font-display text-2xl font-bold text-light-text dark:text-dark-text mb-3">
              Nexus
            </h3>
            <p className="text-light-text/70 dark:text-dark-text/70 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Building the future of team collaboration, one feature at a time.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6 justify-center sm:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-light-border dark:bg-dark-border hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-white flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((column, idx) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center sm:text-left"
            >
              <h4 className="font-semibold mb-4 text-light-text dark:text-dark-text text-xs uppercase tracking-widest">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-light-text/70 dark:text-dark-text/70 hover:text-light-accent dark:hover:text-dark-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-light-border dark:border-dark-border pt-8 md:pt-10 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Built By */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-4 text-sm text-light-text/70 dark:text-dark-text/70 text-center md:text-left">
            <p>© {currentYear} Nexus. All rights reserved.</p>
            <span className="hidden md:block">•</span>
            <p>
              Built with 💖 by{" "}
              <span className="font-semibold text-light-text dark:text-dark-text">
                FrontendGeek
              </span>
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            <Link
              href="#privacy"
              className="text-sm text-light-text/70 dark:text-dark-text/70 hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-sm text-light-text/70 dark:text-dark-text/70 hover:text-light-accent dark:hover:text-dark-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
