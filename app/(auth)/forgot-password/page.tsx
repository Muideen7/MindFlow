"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to send reset email");
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 flex items-center justify-center px-4 py-12 relative">
      {/* Global Theme Toggle for Auth Pages */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                Forgot Password?
              </h1>
              <p className="text-light-text/60 dark:text-dark-text/60">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/40 dark:placeholder-dark-text/40 focus:outline-none focus:border-light-accent dark:focus:border-dark-accent transition-colors"
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-light-accent hover:bg-light-accentHover dark:bg-dark-accent dark:hover:bg-dark-accentHover text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-light-accent/20 dark:shadow-dark-accent/20"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
              <span className="text-light-text/40 dark:text-dark-text/40 text-sm">or</span>
              <div className="flex-1 h-px bg-light-border dark:bg-dark-border" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-light-text/60 dark:text-dark-text/60">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-light-accent dark:text-dark-accent hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 flex justify-center"
              >
                <CheckCircle size={64} className="text-green-500" />
              </motion.div>

              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                Check Your Email
              </h2>
              <p className="text-light-text/60 dark:text-dark-text/60 mb-6">
                We've sent a password reset link to <span className="font-medium">{email}</span>
              </p>

              <div className="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-6 mb-6 text-left">
                <p className="text-sm text-light-text dark:text-dark-text">
                  <strong>Didn't receive the email?</strong>
                </p>
                <ul className="text-sm text-light-text/60 dark:text-dark-text/60 mt-2 space-y-1">
                  <li>• Check your spam folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• Try again in a few minutes</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                  setError("");
                }}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-300 bg-light-accent hover:bg-light-accentHover dark:bg-dark-accent dark:hover:bg-dark-accentHover text-white mb-3"
              >
                Try Another Email
              </button>

              <Link
                href="/login"
                className="block py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
              >
                Back to Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
