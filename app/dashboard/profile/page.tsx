"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Camera, Save, User, Circle } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [status, setStatus] = useState("Online");

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl p-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar Edit */}
          <div className="relative group mx-auto md:mx-0">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-orange-500/10">
              <img src={session?.user?.image || ""} alt="avatar" />
            </div>
            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl text-white">
              <Camera size={24} />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-40 uppercase ml-1">
                  Display Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold opacity-40 uppercase ml-1">
                  Current Status
                </label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500"
                >
                  <option>Online</option>
                  <option>Away</option>
                  <option>Do Not Disturb</option>
                </select>
              </div>
            </div>

            <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 transition-all">
              <Save size={18} /> Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
