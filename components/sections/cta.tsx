"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      });
      alert("Thank you for your message! We'll get back to you soon.");
    }, 1500);
  };

  const contactInfo = [
    {
      label: "Email",
      value: "hello@nexus.com",
      icon: Mail,
    },
    {
      label: "Office",
      value: "123 Innovation Drive\nSan Francisco, CA 94105",
      icon: MapPin,
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="contact" className="section py-32 md:py-40">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-xs font-semibold uppercase tracking-wider border border-light-accent/20 dark:border-dark-accent/20"
            >
              Get in touch
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              className="text-5xl md:text-6xl font-bold leading-tight font-display"
            >
              Let's start a{" "}
              <span className="text-light-accent dark:text-dark-accent italic">
                conversation
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              custom={0.2}
              variants={fadeUp}
              className="text-lg text-light-text/70 dark:text-dark-text/70 leading-relaxed max-w-md"
            >
              Have questions about Nexus? Want to see a demo? Our team is here
              to help you find the perfect solution for your needs.
            </motion.p>

            {/* Contact Details */}
            <motion.div
              custom={0.3}
              variants={fadeUp}
              className="space-y-6 pt-4"
            >
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon
                        size={24}
                        className="text-light-accent dark:text-dark-accent"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-light-text dark:text-dark-text mb-1">
                        {info.label}
                      </h3>
                      <p className="text-light-text/70 dark:text-dark-text/70 whitespace-pre-line">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl p-8 md:p-10 border border-light-border dark:border-dark-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
