"use client";

import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-center items-center bg-[#F2F2F0] dark:bg-[#1A1A1A] overflow-y-auto md:py-12 md:px-4">
      <Link
        href="/"
        className="absolute top-10 left-10 flex items-center gap-2 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white font-bold uppercase tracking-widest text-xs transition-colors z-20"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ duration: 0.7 }}
         className="w-full max-w-lg bg-white dark:bg-[#1A1A1A] p-10 md:p-14 md:rounded-[2rem] md:shadow-2xl md:shadow-black/[0.03] md:border md:border-black/[0.03] relative z-10 min-h-[100dvh] md:min-h-fit flex flex-col justify-center"
      >
        <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-tightest text-black dark:text-white mb-4">
               Create Account
            </h1>
            <p className="text-black/40 dark:text-white/40 font-bold text-xs uppercase tracking-widest leading-relaxed">
               Join MindFlow and collaborate better.
            </p>
        </div>

        <SignupForm />

        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t border-black/5 dark:border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
               <span className="bg-white dark:bg-[#1A1A1A] px-4 text-black/40 dark:text-white/40">
                  Or continue with
               </span>
            </div>
        </div>

        <OAuthButtons />

        <p className="text-center font-bold text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mt-10">
            Already have an account?{" "}
            <Link
               href="/login"
               className="text-black dark:text-white hover:text-black/60 dark:hover:text-white/60 transition-colors"
            >
               Sign In
            </Link>
        </p>
      </motion.div>
    </div>
  );
}
