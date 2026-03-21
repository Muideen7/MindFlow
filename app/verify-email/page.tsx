"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatus("error");
        setTimeout(() => router.push("/signup"), 2000);
        return;
      }

      try {
        const response = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, email }),
        });

        if (response.ok) {
          setStatus("success");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setStatus("error");
          setTimeout(() => router.push("/signup"), 2000);
        }
      } catch (error) {
        setStatus("error");
        setTimeout(() => router.push("/signup"), 2000);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
      <div className="text-center space-y-4">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto" />
            <p className="text-gray-600 dark:text-gray-400">
              Verifying your email...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-4xl">✓</div>
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Email verified! Redirecting to login...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-4xl">✕</div>
            <p className="text-red-600 dark:text-red-400 font-semibold">
              Verification failed. Redirecting...
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
