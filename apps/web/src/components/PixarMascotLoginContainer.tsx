"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export interface PixarMascotLoginProps {
  mascotImgSrc: string;
  mascotName: string;
  moduleTitle: string;
  themeColor: "emerald" | "teal" | "indigo" | "amber" | "sky" | "purple" | "rose";
  isExiting?: boolean;
  children: React.ReactNode;
}

export const PixarMascotLoginContainer: React.FC<PixarMascotLoginProps> = ({
  mascotImgSrc,
  mascotName,
  moduleTitle,
  themeColor,
  isExiting = false,
  children,
}) => {
  const [animationState, setAnimationState] = useState<"WALKING_IN" | "IDLE_CENTER" | "WALKING_OUT">("WALKING_IN");

  useEffect(() => {
    // 1. Start (Right Side) -> 2. Walking (Moving Left) -> 3. Approaching Center -> 4. Center (Stop & Idle)
    const timer = setTimeout(() => {
      setAnimationState("IDLE_CENTER");
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      setAnimationState("WALKING_OUT");
    }
  }, [isExiting]);

  const themeConfig = {
    emerald: { border: "border-emerald-200 dark:border-emerald-800", badge: "bg-emerald-600" },
    teal: { border: "border-teal-200 dark:border-teal-800", badge: "bg-teal-600" },
    indigo: { border: "border-indigo-200 dark:border-indigo-800", badge: "bg-indigo-600" },
    amber: { border: "border-amber-200 dark:border-amber-800", badge: "bg-amber-600" },
    sky: { border: "border-sky-200 dark:border-sky-800", badge: "bg-sky-600" },
    purple: { border: "border-purple-200 dark:border-purple-800", badge: "bg-purple-600" },
    rose: { border: "border-rose-200 dark:border-rose-800", badge: "bg-rose-600" },
  };

  const currentTheme = themeConfig[themeColor];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-6 font-sans transition-colors overflow-hidden relative">
      {/* Header Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className={`p-2 rounded-xl text-white ${currentTheme.badge}`}>
            <span className="font-extrabold text-sm">3D</span>
          </div>
          <span className="font-bold text-lg">{moduleTitle}</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Storyboard Container: Card + 3D Mascot Character moving together */}
      <main className="w-full flex items-center justify-center my-auto z-10 py-6">
        <div
          className={`w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-0 transition-all ${
            animationState === "WALKING_IN"
              ? "animate-walk-in"
              : animationState === "WALKING_OUT"
              ? "animate-walk-out"
              : "animate-idle-float"
          }`}
        >
          {/* Modern Rounded White Login Card */}
          <div
            className={`w-full max-w-md bg-white dark:bg-slate-900 border ${currentTheme.border} rounded-3xl p-8 shadow-2xl relative z-10`}
          >
            {children}
          </div>

          {/* 3D Pixar Cartoon Mascot Character Standing Right Beside & Holding Card */}
          <div
            className={`shrink-0 -ml-14 z-20 flex flex-col items-center justify-center ${
              animationState === "WALKING_IN" || animationState === "WALKING_OUT"
                ? "animate-pedal-walk"
                : "animate-subtle-breathe"
            }`}
          >
            <div className="relative w-72 h-[420px] drop-shadow-2xl">
              <img
                src={mascotImgSrc}
                alt={mascotName}
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 z-20">
        MediPulse 3D Pixar Mascot Animation Engine &bull; Storyboard Flow: Start (Right) &rarr; Walking &rarr; Center (Stop & Idle)
      </footer>
    </div>
  );
};
