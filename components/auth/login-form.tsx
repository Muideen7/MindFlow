"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Toast } from "@/components/ui/toast";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToast(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setToast({ message: result?.error || "Invalid email or password", type: "error" });
        setIsLoading(false);
        return;
      }

      setToast({ message: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setToast({ message: "An error occurred. Please try again.", type: "error" });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 dark:bg-dark-bg-primary dark:border-gray-800 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
          placeholder="name@company.com"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 dark:bg-dark-bg-primary dark:border-gray-800 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none pr-10"
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-orange-600 py-3 text-white font-bold hover:bg-orange-700 shadow-lg shadow-orange-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in to Dashboard"
        )}
      </button>
    </form>
  );
}
