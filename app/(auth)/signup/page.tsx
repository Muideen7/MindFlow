"use client";

import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg transition-colors duration-300 relative">
      {/* Global Theme Toggle for Auth Pages */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Main Container - Full Screen */}
      <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-dark-card overflow-hidden shadow-2xl shadow-orange-500/10 border-0 dark:border-0 transition-colors duration-300">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-orange-600 to-orange-500 p-12 flex-col justify-between relative overflow-hidden">
          {/* Abstract background shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />

          {/* Features / Benefits */}
          <div className="relative z-10 space-y-8 max-w-sm">
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Enterprise Security
                </h4>
                <p className="text-white/80 text-sm">
                  Military-grade encryption for all user data.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Lightning Fast</h4>
                <p className="text-white/80 text-sm">
                  Sub-100ms response times globally.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Global Scale</h4>
                <p className="text-white/80 text-sm">
                  Deploy to 20+ regions with a single click.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-4 mt-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-300 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-white text-sm leading-relaxed">
              "Nexus has completely transformed how our engineering team handles
              authentication. It's secure, fast, and remarkably easy to
              integrate."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-10 w-10 rounded-full bg-orange-200 border-2 border-white/50 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-orange-300 flex items-center justify-center text-orange-800 font-bold text-sm">
                  JD
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Jane Doe</p>
                <p className="text-orange-100 text-xs">CTO, Design.co</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="lg:col-span-7 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-20 overflow-y-auto bg-white dark:bg-dark-bg pt-32 lg:pt-20">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text transition mb-6 w-fit"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="w-full max-w-md mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-light-text dark:text-dark-text">
                Create Account
              </h1>
              <p className="text-light-text/60 dark:text-dark-text/60">
                Join thousands of teams using Nexus to collaborate better.
              </p>
            </div>

            {/* Signup Form */}
            <SignupForm />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-light-border dark:border-dark-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-dark-card px-2 text-light-text/60 dark:text-dark-text/60">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <OAuthButtons />

            {/* Login Link */}
            <p className="text-center text-sm text-light-text/60 dark:text-dark-text/60 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
