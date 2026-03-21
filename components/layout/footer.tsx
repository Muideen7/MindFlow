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
    <footer className="bg-[#1A1A1A] text-white">
      <div className="section-container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-16 mb-16 lg:justify-items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-2 lg:col-span-2 text-center lg:text-left"
          >
            <h3 className="font-bold text-3xl text-white mb-4">
              MindFlow
            </h3>
            <p className="text-white/60 text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
              Building the future of team collaboration, one feature at a time.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={20} />
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
              className="text-center lg:text-left lg:min-w-[120px]"
            >
              <h4 className="font-bold mb-6 text-white text-xs uppercase tracking-widest opacity-40">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm font-medium"
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
        <div className="border-t border-white/10 pt-8 md:pt-10 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Built By */}
          <div className="flex flex-col items-center md:flex-row md:items-center gap-4 text-sm text-white/40 text-center md:text-left">
            <p>© {currentYear} MindFlow. All rights reserved.</p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            <Link
              href="#privacy"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
