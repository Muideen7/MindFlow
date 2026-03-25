"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Camera, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { updateProfile } from "@/app/actions/profile";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  // Local state for form fields
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState("Online");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Sync local state when session loads
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setProfileImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    try {
      const result = await updateProfile({ name, status, image: profileImage });

      if (result.success) {
        // 1. Update the NextAuth session cache locally
        await update({
          ...session,
          user: {
            ...session?.user,
            name: name,
            image: profileImage,
          },
        });

        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsPending(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Your Profile
        </h1>
        <p className="opacity-60 text-sm">
          Manage your public identity and presence.
        </p>
      </div>

      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl p-8 shadow-sm">
        <form
          onSubmit={handleUpdateProfile}
          className="flex flex-col md:flex-row gap-10"
        >
          {/* Avatar Section */}
          <div className="relative group mx-auto md:mx-0">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-violet-500/10 bg-slate-100 dark:bg-slate-800 transition-all group-hover:border-violet-500/30">
              <img
                src={
                  profileImage ||
                  `https://i.pravatar.cc/150?u=${name || "user"}`
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => document.getElementById('avatar-upload')?.click()}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl text-white"
            >
              <Camera size={24} />
              <input 
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setProfileImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </button>
            <p className="text-[10px] text-center mt-3 font-bold opacity-40 uppercase tracking-tighter">
              Click to upload
            </p>
          </div>

          {/* Form Fields Section */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold opacity-40 uppercase ml-1 tracking-widest">
                  Display Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold opacity-40 uppercase ml-1 tracking-widest">
                  Current Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all font-medium appearance-none"
                >
                  <option value="Online">🟢 Online</option>
                  <option value="Away">🟡 Away</option>
                  <option value="Do Not Disturb">🔴 Do Not Disturb</option>
                  <option value="Offline">⚪ Invisible</option>
                </select>
              </div>
            </div>

            {/* Submit Button & Feedback */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Update Profile
              </button>

              {message && (
                <div
                  className={`flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-left-2 ${
                    message.type === "success"
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Account Info Card (Read Only) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-[hsl(var(--border))] rounded-3xl p-6">
        <h3 className="text-sm font-bold opacity-40 uppercase tracking-widest mb-4">
          Account Security
        </h3>
        <p className="text-sm opacity-70">
          Email Address:{" "}
          <span className="font-bold text-slate-900 dark:text-white ml-2">
            {session?.user?.email}
          </span>
        </p>
      </div>
    </div>
  );
}
