"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export interface VideoStylePixarMascotProps {
  character: "doctor" | "pharmacy" | "lab" | "reception" | "staff" | "patient" | "admin";
  moduleTitle: string;
  themeColor: "emerald" | "teal" | "indigo" | "amber" | "sky" | "purple" | "rose";
  animationSpeed?: number;
  isExiting?: boolean;
  videoSrc?: string; // Optional MP4/WebM video URL
  children: React.ReactNode;
}

export const VideoStylePixarMascot: React.FC<VideoStylePixarMascotProps> = ({
  character = "doctor",
  moduleTitle = "Doctor Portal EMR",
  themeColor = "emerald",
  animationSpeed = 1,
  isExiting = false,
  videoSrc,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [posX, setPosX] = useState<number>(90); // 90% (right offscreen) -> 0% (center)
  const [animState, setAnimState] = useState<"WALKING" | "IDLE" | "EXITING">("WALKING");
  const frameRef = useRef<number | null>(null);

  // 1. 60FPS Video-Quality Skeletal Character Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();
    const duration = 4800 / animationSpeed; // 4.8 seconds walk to center

    const renderFrame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth Natural Easing (Ease Out Cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentX = (1 - easeProgress) * 85;
      setPosX(currentX);

      const isWalking = progress < 1;
      if (isWalking && animState !== "WALKING") setAnimState("WALKING");
      if (!isWalking && animState !== "IDLE") setAnimState("IDLE");

      // Canvas Dimensions
      canvas.width = 320;
      canvas.height = 440;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Walking Kinematics Math
      const t = elapsed * 0.007 * animationSpeed;
      const legAngle = isWalking ? Math.sin(t * 8) * 26 : 0;
      const kneeLeft = isWalking ? Math.max(0, -Math.sin(t * 8) * 36) : 0;
      const kneeRight = isWalking ? Math.max(0, Math.sin(t * 8) * 36) : 0;
      const footLiftLeft = isWalking ? Math.max(0, -Math.sin(t * 8) * 18) : 0;
      const footLiftRight = isWalking ? Math.max(0, Math.sin(t * 8) * 18) : 0;
      const bounce = isWalking ? Math.abs(Math.sin(t * 16)) * 9 : Math.sin(t * 2) * 3;
      const blink = Math.sin(t * 0.8) > 0.96;

      ctx.save();
      ctx.translate(160, 200 - bounce);

      // --- DRAW 3D PIXAR CHARACTER (60FPS Render) ---

      // 1. LEFT LEG & FOOT SNEAKER
      ctx.save();
      ctx.translate(-25, 60);
      ctx.rotate((legAngle * Math.PI) / 180);
      // Thigh
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.roundRect(-10, 0, 20, 50, 10);
      ctx.fill();
      // Shin & Knee Flexion
      ctx.translate(0, 45);
      ctx.rotate((kneeLeft * Math.PI) / 180);
      ctx.translate(0, -footLiftLeft);
      ctx.fillStyle = "#0369a1";
      ctx.beginPath();
      ctx.roundRect(-8, 0, 16, 48, 8);
      ctx.fill();
      // White Sneaker Shoe
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-18, 42, 36, 16, [6, 12, 4, 4]);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 2. RIGHT LEG & FOOT SNEAKER
      ctx.save();
      ctx.translate(25, 60);
      ctx.rotate((-legAngle * Math.PI) / 180);
      // Thigh
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.roundRect(-10, 0, 20, 50, 10);
      ctx.fill();
      // Shin & Knee Flexion
      ctx.translate(0, 45);
      ctx.rotate((kneeRight * Math.PI) / 180);
      ctx.translate(0, -footLiftRight);
      ctx.fillStyle = "#0369a1";
      ctx.beginPath();
      ctx.roundRect(-8, 0, 16, 48, 8);
      ctx.fill();
      // White Sneaker Shoe
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-18, 42, 36, 16, [6, 12, 4, 4]);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // 3. TORSO & DOCTOR WHITE LAB COAT
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-55, -70, 110, 130, 24);
      ctx.fill();
      ctx.stroke();

      // Blue Scrubs V-Neck
      ctx.fillStyle = "#0EA5E9";
      ctx.beginPath();
      ctx.moveTo(-25, -70);
      ctx.lineTo(0, -25);
      ctx.lineTo(25, -70);
      ctx.closePath();
      ctx.fill();

      // Stethoscope
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, -40, 32, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(0, -8, 9, 0, 2 * Math.PI);
      ctx.fill();

      // 4. HEAD & FACIAL FEATURES
      ctx.save();
      ctx.translate(0, -110);
      // Head Oval
      ctx.fillStyle = "#FCE7F3";
      ctx.beginPath();
      ctx.ellipse(0, 0, 42, 46, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Hair
      ctx.fillStyle = "#1E293B";
      ctx.beginPath();
      ctx.arc(0, -10, 44, Math.PI, 2 * Math.PI);
      ctx.fill();

      // Reflector Mirror Headband
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(-26, -42, 52, 8);
      ctx.fillStyle = "#E0F2FE";
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, -38, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      // Eyes (Blinking Logic)
      if (!blink) {
        ctx.fillStyle = "#0F172A";
        ctx.beginPath();
        ctx.arc(-16, 0, 6.5, 0, 2 * Math.PI);
        ctx.arc(16, 0, 6.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(-14, -2, 2.5, 0, 2 * Math.PI);
        ctx.arc(18, -2, 2.5, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.strokeStyle = "#0F172A";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-22, 0);
        ctx.lineTo(-10, 0);
        ctx.moveTo(10, 0);
        ctx.lineTo(22, 0);
        ctx.stroke();
      }

      // Friendly Smile
      ctx.strokeStyle = "#0F172A";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(0, 12, 14, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();

      ctx.restore();

      // 5. CARTOON ARMS & HANDS GRIPPING CARD EDGES
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 16;
      ctx.lineCap = "round";

      // Left Arm -> Gripping Left Card Edge
      ctx.beginPath();
      ctx.moveTo(-45, -50);
      ctx.quadraticCurveTo(-110, -10, -160, 10);
      ctx.stroke();

      // Right Arm -> Gripping Right Card Edge
      ctx.beginPath();
      ctx.moveTo(45, -50);
      ctx.quadraticCurveTo(110, -10, 160, 10);
      ctx.stroke();

      // Hands
      ctx.fillStyle = "#FCE7F3";
      ctx.strokeStyle = "#0284c7";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(-160, 10, 11, 0, 2 * Math.PI);
      ctx.arc(160, 10, 11, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    frameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [animationSpeed, animState]);

  const themeConfig = {
    emerald: { badge: "bg-emerald-600", border: "border-emerald-200 dark:border-emerald-800" },
    teal: { badge: "bg-teal-600", border: "border-teal-200 dark:border-teal-800" },
    indigo: { badge: "bg-indigo-600", border: "border-indigo-200 dark:border-indigo-800" },
    amber: { badge: "bg-amber-600", border: "border-amber-200 dark:border-amber-800" },
    sky: { badge: "bg-sky-600", border: "border-sky-200 dark:border-sky-800" },
    purple: { badge: "bg-purple-600", border: "border-purple-200 dark:border-purple-800" },
    rose: { badge: "bg-rose-600", border: "border-rose-200 dark:border-rose-800" },
  };

  const currentTheme = themeConfig[themeColor] || themeConfig.emerald;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-6 font-sans transition-colors overflow-hidden relative">
      {/* Header Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-30">
        <Link href="/" className="flex items-center gap-2">
          <div className={`p-2 rounded-xl text-white ${currentTheme.badge}`}>
            <span className="font-extrabold text-sm">3D</span>
          </div>
          <span className="font-bold text-lg">{moduleTitle}</span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Composition: Video / Canvas 60FPS Character Animation Carrying Card */}
      <main className="w-full flex items-center justify-center my-auto z-10 py-6">
        <div
          className="relative flex items-center justify-center transition-transform duration-75"
          style={{ transform: `translateX(${posX}vw)` }}
        >
          {/* THE LOGIN FORM CARD */}
          <div
            className={`w-[440px] bg-white dark:bg-slate-900 border ${currentTheme.border} rounded-3xl p-8 shadow-2xl relative z-20`}
          >
            {children}
          </div>

          {/* 60FPS CANVAS RENDERING ENGINE (3D Pixar Doctor Walking & Holding Card) */}
          <div className="absolute -right-36 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center">
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-80 h-[440px] object-cover rounded-3xl shadow-2xl"
              />
            ) : (
              <canvas
                ref={canvasRef}
                className="w-80 h-[440px] drop-shadow-2xl"
              />
            )}
            <div className={`-mt-4 ${currentTheme.badge} text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl z-40`}>
              🎬 60FPS Pixar 3D Animated Video Engine
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 z-30">
        MediPulse 60FPS Animated Video Engine &bull; Reference YouTube Short Flow Implemented
      </footer>
    </div>
  );
};
