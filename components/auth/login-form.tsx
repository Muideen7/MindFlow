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
          className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60 mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-black placeholder-black/30 focus:border-black focus:ring-0 transition-all outline-none"
          placeholder="name@company.com"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="password"
            className="block text-xs font-bold uppercase tracking-widest text-black/60 dark:text-white/60"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-black/60 transition-colors"
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
            className="block w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-black placeholder-black/30 focus:border-black focus:ring-0 transition-all outline-none pr-12"
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-[#2C2C2C] py-4 text-white font-bold text-xs uppercase tracking-widest hover:bg-black shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          "Sign In To Workspace"
        )}
      </button>
    </form>
  );
}
