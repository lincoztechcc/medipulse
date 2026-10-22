"use client";

import React, { useEffect, useState } from "react";
import { LivingDoctorCharacter, LivingCapsuleCharacter, LivingFlaskCharacter } from "./LivingCartoonCharacters";

export interface WalkingMascotLoginProps {
  roleType?: "DOCTOR" | "PHARMACY" | "LAB" | "RECEPTION" | "SUPER_ADMIN" | "ADMIN" | "PATIENT";
  mascotSrc?: string;
  mascotTitle: string;
  roleTitle: string;
  themeColor: "emerald" | "teal" | "indigo" | "amber" | "sky" | "purple" | "rose";
  isExiting: boolean;
  children: React.ReactNode;
}

export const WalkingMascotLoginContainer: React.FC<WalkingMascotLoginProps> = ({
  roleType = "DOCTOR",
  mascotSrc,
  mascotTitle,
  roleTitle,
  themeColor,
  isExiting,
  children,
}) => {
  const [isWalkingIn, setIsWalkingIn] = useState(true);

  useEffect(() => {
    // Pedaling walking entrance duration: 1.4 seconds
    const timer = setTimeout(() => {
      setIsWalkingIn(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const themeClasses = {
    emerald: {
      bg: "from-emerald-600 to-sky-600",
      border: "border-emerald-200 dark:border-emerald-800",
      accent: "text-emerald-600 dark:text-emerald-400",
      shadow: "shadow-emerald-600/20",
    },
    teal: {
      bg: "from-teal-600 to-emerald-600",
      border: "border-teal-200 dark:border-teal-800",
      accent: "text-teal-600 dark:text-teal-400",
      shadow: "shadow-teal-600/20",
    },
    indigo: {
      bg: "from-indigo-600 to-sky-600",
      border: "border-indigo-200 dark:border-indigo-800",
      accent: "text-indigo-600 dark:text-indigo-400",
      shadow: "shadow-indigo-600/20",
    },
    amber: {
      bg: "from-amber-600 to-orange-600",
      border: "border-amber-200 dark:border-amber-800",
      accent: "text-amber-600 dark:text-amber-400",
      shadow: "shadow-amber-600/20",
    },
    sky: {
      bg: "from-sky-600 to-blue-600",
      border: "border-sky-200 dark:border-sky-800",
      accent: "text-sky-600 dark:text-sky-400",
      shadow: "shadow-sky-600/20",
    },
    purple: {
      bg: "from-purple-600 to-indigo-600",
      border: "border-purple-200 dark:border-purple-800",
      accent: "text-purple-600 dark:text-purple-400",
      shadow: "shadow-purple-600/20",
    },
    rose: {
      bg: "from-rose-600 to-pink-600",
      border: "border-rose-200 dark:border-rose-800",
      accent: "text-rose-600 dark:text-rose-400",
      shadow: "shadow-rose-600/20",
    },
  };

  const currentTheme = themeClasses[themeColor];

  const renderLivingCharacter = () => {
    const isWalking = isWalkingIn || isExiting;
    switch (roleType) {
      case "DOCTOR":
        return <LivingDoctorCharacter isWalking={isWalking} />;
      case "PHARMACY":
        return <LivingCapsuleCharacter isWalking={isWalking} />;
      case "LAB":
        return <LivingFlaskCharacter isWalking={isWalking} />;
      default:
        return <LivingDoctorCharacter isWalking={isWalking} />;
    }
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 p-4 z-10 transition-all ${
        isExiting ? "animate-walk-out" : "animate-walk-in"
      }`}
    >
      {/* Living Articulated Vector Cartoon Character (Pedaling Legs, Arms, Blinking Eyes) */}
      <div className="flex flex-col items-center justify-center shrink-0">
        {renderLivingCharacter()}
        <div
          className={`bg-gradient-to-r ${currentTheme.bg} text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-lg -mt-6 z-20 flex items-center gap-1.5`}
        >
          {mascotTitle}
        </div>
      </div>

      {/* Login Card (Carried & Pushed by Mascot into Center) */}
      <div
        className={`w-full max-w-md bg-white dark:bg-slate-900 border ${currentTheme.border} rounded-3xl p-8 shadow-2xl relative transition-all`}
      >
        {/* Handheld Grip Decorator connecting Cartoon Character Hands to Card */}
        <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-20 bg-slate-300 dark:bg-slate-700 rounded-l-lg border-l border-slate-400 opacity-80" />

        {children}
      </div>
    </div>
  );
}
