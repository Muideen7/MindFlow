"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Toast } from "@/components/ui/toast";
import * as z from "zod";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = memo(function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setToast(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setToast({ message: result.message || "Signup failed", type: "error" });
        setIsLoading(false);
        return;
      }

      setToast({ message: "Account created! Redirecting...", type: "success" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setToast({ message: "An error occurred. Please try again.", type: "error" });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
          Full Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="John Doe"
          className="w-full px-5 py-4 border border-black/10 rounded-2xl bg-white text-black placeholder-black/30 focus:outline-none focus:border-black focus:ring-0 transition-all"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full px-5 py-4 border border-black/10 rounded-2xl bg-white text-black placeholder-black/30 focus:outline-none focus:border-black focus:ring-0 transition-all"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-5 py-4 border border-black/10 rounded-2xl bg-white text-black placeholder-black/30 focus:outline-none focus:border-black focus:ring-0 transition-all pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-black/60 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-5 py-4 border border-black/10 rounded-2xl bg-white text-black placeholder-black/30 focus:outline-none focus:border-black focus:ring-0 transition-all pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-4 bg-[#2C2C2C] hover:bg-black disabled:bg-black/50 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl active:scale-[0.98] transition-all mt-6"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
});
