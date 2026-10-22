"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowDown } from "lucide-react";

export interface InteractiveLampLoginProps {
  roleTitle: string;
  roleSubtitle: string;
  roleIcon: React.ReactNode;
  themeColor: "emerald" | "teal" | "indigo" | "amber" | "sky" | "purple" | "rose";
  children: React.ReactNode;
}

export const InteractiveLampLoginShell: React.FC<InteractiveLampLoginProps> = ({
  roleTitle,
  roleSubtitle,
  roleIcon,
  themeColor,
  children,
}) => {
  // Default OFF (Hidden) until real downward drag pull occurs
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pull, setPull] = useState<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startYRef = useRef<number>(0);

  const MAX_PULL = 110;
  const THRESHOLD = 65; // Must pull down at least 65px to toggle ON/OFF

  // Global Window Drag Listeners for Smooth Real Pulling
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientY - startYRef.current;
      const currentPull = Math.max(0, Math.min(MAX_PULL, delta));
      setPull(currentPull);
    };

    const handleGlobalPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      
      // ONLY toggle ON/OFF if user actually pulled down past the 65px threshold!
      setPull((finalPull) => {
        if (finalPull >= THRESHOLD) {
          setIsOpen((prev) => !prev);
        }
        return 0; // Elastic spring snap back to 0
      });
    };

    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, []);

  const handleHandlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    e.preventDefault();
  };

  const themeClasses = {
    emerald: { badge: "bg-emerald-600", accent: "#35A495", border: "border-emerald-200 dark:border-emerald-800" },
    teal: { badge: "bg-teal-600", accent: "#0D9488", border: "border-teal-200 dark:border-teal-800" },
    indigo: { badge: "bg-indigo-600", accent: "#6366F1", border: "border-indigo-200 dark:border-indigo-800" },
    amber: { badge: "bg-amber-600", accent: "#D97706", border: "border-amber-200 dark:border-amber-800" },
    sky: { badge: "bg-sky-600", accent: "#0284C7", border: "border-sky-200 dark:border-sky-800" },
    purple: { badge: "bg-purple-600", accent: "#9333EA", border: "border-purple-200 dark:border-purple-800" },
    rose: { badge: "bg-rose-600", accent: "#E11D48", border: "border-rose-200 dark:border-rose-800" },
  };

  const currentTheme = themeClasses[themeColor] || themeClasses.emerald;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-6 font-sans transition-colors duration-300 overflow-hidden relative select-none">
      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className={`p-2 rounded-xl text-white ${currentTheme.badge} shadow-md`}>
            {roleIcon}
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">{roleTitle}</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Prominent Guidance Banner */}
      <div className="text-center my-2 z-20">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-100/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300 rounded-full font-extrabold text-sm shadow-md animate-bounce">
          <ArrowDown className="w-4 h-4" /> Pull down the rope to turn on the lamp & unlock login form!
        </div>
      </div>

      {/* Main Login Shell (Lamp Mascot + Pull Rope + Login Card) */}
      <main className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 my-auto z-10 py-2">
        
        {/* Left Side: Interactive Cute Lamp Mascot & Pull Rope */}
        <div className="relative h-[480px] flex items-center justify-center">
          
          {/* Ambient Lamp Light Glow */}
          <div
            className={`absolute w-[390px] h-[390px] rounded-full transition-all duration-500 pointer-events-none ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{
              background: "radial-gradient(circle, rgba(255,244,168,0.5), rgba(53,164,149,0.15) 35%, transparent 68%)",
            }}
          />

          {/* Lamp Mascot Structure */}
          <div className="relative w-[270px] h-[420px] z-10 flex flex-col items-center justify-center filter drop-shadow-xl">
            
            {/* Lamp Head */}
            <div
              className={`relative w-[220px] h-[170px] bg-gradient-to-b from-[#b9d0c0] to-[#92ad9f] rounded-3xl z-10 transition-all duration-450 ${
                isOpen ? "brightness-125 shadow-[0_0_40px_rgba(255,248,190,0.95)]" : "brightness-90 opacity-90"
              }`}
              style={{ clipPath: "polygon(10% 4%, 90% 4%, 100% 88%, 0 88%)" }}
            >
              {/* Lamp Face */}
              <div className="absolute inset-0 z-20">
                <div className="absolute top-[72px] left-[66px] w-[17px] h-[9px] border-b-[3px] border-[#1d302b] rounded-full" />
                <div className="absolute top-[72px] right-[66px] w-[17px] h-[9px] border-b-[3px] border-[#1d302b] rounded-full" />
                <div className="absolute top-[93px] left-[98px] w-[27px] h-[15px] bg-[#dc7067] rounded-b-full" />
              </div>
              {/* Lamp Diffuser Bottom */}
              <div className="absolute left-3 right-3 bottom-2.5 h-[54px] bg-gradient-to-b from-[#fffef0] to-[#e9f0dd] rounded-full opacity-80 shadow-inner" />
            </div>

            {/* Lamp Pole */}
            <div className="w-[26px] h-[145px] bg-gradient-to-r from-[#69797c] via-[#b4c0c0] to-[#6b797c] rounded-md -mt-2 z-0" />

            {/* Lamp Base */}
            <div className="w-[114px] h-[36px] bg-gradient-to-b from-[#edf2f0] to-[#bfcac9] border-2 border-[#aebbbb] rounded-full -mt-2 z-10 shadow-md" />
          </div>

          {/* Interactive Downward Drag Pull Rope Mechanism */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1">
            {/* Rope */}
            <div
              className="w-1 bg-[#7b969e] rounded-full transition-all origin-top"
              style={{ height: `${76 + pull}px` }}
            />
            {/* Handle */}
            <div
              onPointerDown={handleHandlePointerDown}
              className="w-[28px] h-[46px] rounded-[14px] bg-gradient-to-b from-[#35a495] to-[#006d80] shadow-[0_6px_16px_rgba(0,109,128,0.35)] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center text-white text-[10px] font-bold transition-transform"
              style={{ transform: `translateY(${pull}px)` }}
            >
              ||
            </div>
            {/* Hint */}
            <div className="mt-2 px-3.5 py-1 rounded-full bg-[#e7f6f2] text-[#006d80] text-xs font-bold shadow-sm flex items-center gap-1">
              ↓ Drag rope down: {isOpen ? "OFF" : "ON"}
            </div>
          </div>
        </div>

        {/* Right Side: The Login Card */}
        <div
          className={`w-full max-w-md bg-white dark:bg-slate-900 border ${currentTheme.border} rounded-3xl p-8 shadow-2xl transition-all duration-700 ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-y-12 scale-90 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl text-white ${currentTheme.badge} shadow-md`}>
              {roleIcon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{roleTitle}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{roleSubtitle}</p>
            </div>
          </div>

          {children}

          {/* Google Sign In Divider & Button */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="relative flex items-center justify-center mb-4">
              <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Or Continue With
              </span>
            </div>

            <button
              type="button"
              onClick={() => alert("Google OAuth Authentication initiated.")}
              className="w-full py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-3 hover:scale-[1.01]"
            >
              {/* Google 4-Color SVG Logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 dark:text-slate-400 z-30">
        MediPulse Interactive Lamp Engine &bull; Light & Dark Theme Support
      </footer>
    </div>
  );
};
