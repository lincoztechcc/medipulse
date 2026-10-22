"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export interface AnimatedLoginMascotProps {
  character: "doctor" | "pharmacy" | "lab" | "reception" | "staff" | "patient" | "admin";
  module: "doctor" | "pharmacy" | "lab" | "reception" | "staff" | "patient" | "admin";
  animationSpeed?: number;
  position?: "center" | "left" | "right";
  isExiting?: boolean;
  children: React.ReactNode;
}

export const AnimatedLoginMascot: React.FC<AnimatedLoginMascotProps> = ({
  character = "doctor",
  module = "doctor",
  animationSpeed = 1,
  position = "center",
  isExiting = false,
  children,
}) => {
  const [posX, setPosX] = useState<number>(100); // 100% (offscreen right) to 0% (center)
  const [isWalking, setIsWalking] = useState<boolean>(true);
  const [walkPhase, setWalkPhase] = useState<number>(0);
  const [blink, setBlink] = useState<boolean>(false);
  const animRef = useRef<number | null>(null);

  // 1. Walking Animation Physics Loop (60 FPS Skeletal Kinematics)
  useEffect(() => {
    let startTimestamp: number | null = null;
    const walkDuration = 4500 / animationSpeed; // 4.5 seconds walk in

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / walkDuration, 1);

      // Natural Easing (Accelerate then Decelerate to Center)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentX = (1 - easedProgress) * 90; // From 90% right to 0% center

      setPosX(currentX);
      setWalkPhase(elapsed * 0.008 * animationSpeed);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsWalking(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [animationSpeed]);

  // 2. Eye Blink Loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // 3. Exit Animation Loop (Walk Out to Left)
  useEffect(() => {
    if (isExiting) {
      setIsWalking(true);
      let exitStart: number | null = null;
      const animateExit = (timestamp: number) => {
        if (!exitStart) exitStart = timestamp;
        const elapsed = timestamp - exitStart;
        const progress = Math.min(elapsed / 1500, 1);
        const currentX = -progress * 110; // From 0% center to -110% left

        setPosX(currentX);
        setWalkPhase(elapsed * 0.008 * animationSpeed);

        if (progress < 1) {
          requestAnimationFrame(animateExit);
        }
      };
      requestAnimationFrame(animateExit);
    }
  }, [isExiting, animationSpeed]);

  // Skeletal Kinematics Math Calculations
  const legSwing = isWalking ? Math.sin(walkPhase * 8) * 24 : 0; // Leg oscillation (+/- 24 deg)
  const kneeFlexLeft = isWalking ? Math.max(0, -Math.sin(walkPhase * 8) * 35) : 0; // Left knee flexes when stepping forward
  const kneeFlexRight = isWalking ? Math.max(0, Math.sin(walkPhase * 8) * 35) : 0; // Right knee flexes
  const footLiftLeft = isWalking ? Math.max(0, -Math.sin(walkPhase * 8) * 16) : 0; // Feet lift off ground
  const footLiftRight = isWalking ? Math.max(0, Math.sin(walkPhase * 8) * 16) : 0;
  const bodyBounce = isWalking ? Math.abs(Math.sin(walkPhase * 16)) * 8 : Math.sin(walkPhase * 2) * 3; // Step bounce / breathing
  const armSway = isWalking ? Math.cos(walkPhase * 8) * 6 : Math.sin(walkPhase * 2) * 2;

  const themeConfig = {
    doctor: { badge: "bg-emerald-600", title: "Doctor Portal EMR", border: "border-emerald-200 dark:border-emerald-800" },
    pharmacy: { badge: "bg-teal-600", title: "Pharmacy Portal POS", border: "border-teal-200 dark:border-teal-800" },
    lab: { badge: "bg-indigo-600", title: "Laboratory Portal LIS", border: "border-indigo-200 dark:border-indigo-800" },
    reception: { badge: "bg-amber-600", title: "Reception Portal Desk", border: "border-amber-200 dark:border-amber-800" },
    staff: { badge: "bg-purple-600", title: "HR & Staff Portal", border: "border-purple-200 dark:border-purple-800" },
    patient: { badge: "bg-rose-600", title: "Patient Health Portal", border: "border-rose-200 dark:border-rose-800" },
    admin: { badge: "bg-sky-600", title: "Hospital Admin Portal", border: "border-sky-200 dark:border-sky-800" },
  };

  const currentConfig = themeConfig[character] || themeConfig.doctor;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-6 font-sans transition-colors overflow-hidden relative">
      {/* Top Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className={`p-2 rounded-xl text-white ${currentConfig.badge}`}>
            <span className="font-extrabold text-sm">3D</span>
          </div>
          <span className="font-bold text-lg">{currentConfig.title}</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Articulated 3D Character & Card Composition Container */}
      <main className="w-full flex items-center justify-center my-auto z-10 py-6">
        <div
          className="relative flex items-center justify-center transition-transform duration-75"
          style={{ transform: `translateX(${posX}vw)` }}
        >
          {/* 1. THE LOGIN CARD (Held securely in the character's hands) */}
          <div
            className={`w-[420px] bg-white dark:bg-slate-900 border ${currentConfig.border} rounded-3xl p-8 shadow-2xl relative z-20 transition-transform`}
            style={{ transform: `translateY(${-bodyBounce}px)` }}
          >
            {children}
          </div>

          {/* 2. THE ARTICULATED 3D CHARACTER RIG (Positioned right beside/behind card with hands holding card edges) */}
          <div
            className="absolute -right-32 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none"
            style={{ transform: `translateY(${-bodyBounce * 1.2 - 20}px)` }}
          >
            {/* SVG Articulated Skeletal Rig */}
            <svg
              width="240"
              height="360"
              viewBox="0 0 240 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl overflow-visible"
            >
              {/* LEFT LEG RIG (Thigh, Knee Joint, Shin, Foot) */}
              <g
                style={{
                  transformOrigin: "90px 220px",
                  transform: `rotate(${legSwing}deg)`,
                }}
              >
                {/* Thigh */}
                <rect x="80" y="220" width="20" height="50" rx="10" fill="#0284c7" />
                {/* Knee Joint & Shin */}
                <g
                  style={{
                    transformOrigin: "90px 265px",
                    transform: `rotate(${kneeFlexLeft}deg) translateY(${-footLiftLeft}px)`,
                  }}
                >
                  <rect x="82" y="265" width="16" height="50" rx="8" fill="#0369a1" />
                  {/* Left Foot / Sneaker (Lifts visibly off floor when stepping) */}
                  <g transform="translate(68, 305)">
                    <path
                      d="M0 12 C0 5 35 5 35 12 L38 22 C38 28 0 28 0 22 Z"
                      fill="#FFFFFF"
                      stroke="#0F172A"
                      strokeWidth="2.5"
                    />
                    <rect x="6" y="18" width="24" height="4" fill="#0284c7" />
                  </g>
                </g>
              </g>

              {/* RIGHT LEG RIG (Thigh, Knee Joint, Shin, Foot) */}
              <g
                style={{
                  transformOrigin: "150px 220px",
                  transform: `rotate(${-legSwing}deg)`,
                }}
              >
                {/* Thigh */}
                <rect x="140" y="220" width="20" height="50" rx="10" fill="#0284c7" />
                {/* Knee Joint & Shin */}
                <g
                  style={{
                    transformOrigin: "150px 265px",
                    transform: `rotate(${kneeFlexRight}deg) translateY(${-footLiftRight}px)`,
                  }}
                >
                  <rect x="142" y="265" width="16" height="50" rx="8" fill="#0369a1" />
                  {/* Right Foot / Sneaker */}
                  <g transform="translate(128, 305)">
                    <path
                      d="M0 12 C0 5 35 5 35 12 L38 22 C38 28 0 28 0 22 Z"
                      fill="#FFFFFF"
                      stroke="#0F172A"
                      strokeWidth="2.5"
                    />
                    <rect x="6" y="18" width="24" height="4" fill="#0284c7" />
                  </g>
                </g>
              </g>

              {/* TORSO & DOCTOR LAB COAT */}
              <g transform="translate(0, 0)">
                <path
                  d="M60 120 C60 95 180 95 180 120 L190 225 C190 235 50 235 50 225 Z"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                />
                {/* Blue Inner Scrubs */}
                <path d="M95 105 L120 155 L145 105 Z" fill="#0EA5E9" />
                <rect x="115" y="155" width="10" height="65" fill="#0284c7" />
                {/* Stethoscope */}
                <path
                  d="M85 110 Q85 170 120 170 Q155 170 155 110"
                  stroke="#334155"
                  strokeWidth="6.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="175" r="11" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
              </g>

              {/* HEAD & FACIAL RIG */}
              <g transform="translate(0, 0)">
                <ellipse cx="120" cy="70" rx="46" ry="50" fill="#FCE7F3" />
                {/* Hair */}
                <path
                  d="M74 65 C74 32 166 32 166 65 C166 42 148 20 120 20 C92 20 74 42 74 65 Z"
                  fill="#1E293B"
                />
                {/* Headband Reflector Mirror */}
                <rect x="92" y="20" width="56" height="9" rx="4" fill="#0284c7" />
                <circle cx="120" cy="24" r="11" fill="#E0F2FE" stroke="#0284c7" strokeWidth="3" />

                {/* Animated Eyes (Blinking on Interval) */}
                <g style={{ transform: blink ? "scaleY(0.1)" : "scaleY(1)", transformOrigin: "120px 70px" }}>
                  <circle cx="102" cy="70" r="7" fill="#0F172A" />
                  <circle cx="138" cy="70" r="7" fill="#0F172A" />
                  <circle cx="104" cy="67" r="3" fill="#FFFFFF" />
                  <circle cx="140" cy="67" r="3" fill="#FFFFFF" />
                </g>
                {/* Cheeks */}
                <ellipse cx="90" cy="82" rx="7" ry="4" fill="#F472B6" opacity="0.6" />
                <ellipse cx="150" cy="82" rx="7" ry="4" fill="#F472B6" opacity="0.6" />
                {/* Friendly Smile */}
                <path
                  d="M108 85 Q120 98 132 85"
                  stroke="#0F172A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* LEFT ARM & HAND RIG (Attaching directly to the Left Side of the Login Card!) */}
              <g style={{ transform: `rotate(${armSway}deg)`, transformOrigin: "50px 120px" }}>
                <path
                  d="M60 125 C30 140 -50 160 -100 160"
                  stroke="#FFFFFF"
                  strokeWidth="18"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Hand Gripping Card Edge */}
                <circle cx="-100" cy="160" r="12" fill="#FCE7F3" stroke="#0284c7" strokeWidth="3" />
              </g>

              {/* RIGHT ARM & HAND RIG (Attaching directly to the Right Side of the Login Card!) */}
              <g style={{ transform: `rotate(${-armSway}deg)`, transformOrigin: "190px 120px" }}>
                <path
                  d="M180 125 C210 140 260 160 280 160"
                  stroke="#FFFFFF"
                  strokeWidth="18"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Hand Gripping Card Edge */}
                <circle cx="280" cy="160" r="12" fill="#FCE7F3" stroke="#0284c7" strokeWidth="3" />
              </g>
            </svg>

            {/* Mascot Character Name Tag */}
            <div className={`mt-2 ${currentConfig.badge} text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl flex items-center gap-1.5`}>
              ✨ Articulated 3D {character.toUpperCase()} Mascot
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 z-30">
        MediPulse 3D Articulated Kinematics Engine &bull; Walking Cycle: Leg Alternation &rarr; Knee Flexion &rarr; Foot Lift &rarr; Deceleration &rarr; Idle Breathing
      </footer>
    </div>
  );
};
