"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface UserAvatarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function UserAvatar({ name, image, className = "", size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-16 h-16 text-lg",
    xl: "w-32 h-32 text-2xl",
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div 
      className={`relative flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center font-bold tracking-tighter transition-all ${sizeClasses[size]} ${className} ${
        !image ? "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400 border border-violet-500/20" : ""
      }`}
    >
      {image ? (
        <Image
          src={image}
          alt={name || "User"}
          fill
          className="object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
