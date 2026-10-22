import React from "react";
import Image from "next/image";

// 1. 3D Animated Doctor Mascot (Walking, stethoscope, clipboard, warm smile)
export const DoctorMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl">
      <img
        src="/doctor_mascot.png"
        alt="3D Doctor Cartoon Mascot"
        className="w-full h-full object-contain rounded-3xl"
      />
    </div>
    <div className="bg-gradient-to-r from-sky-600 to-emerald-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3 flex items-center gap-1.5 animate-pulse">
      ✨ 3D Doctor Mascot (Holding EMR Card)
    </div>
  </div>
);

// 2. 3D Animated Pharmacy Capsule Mascot (Hands, feet, sneakers, carrying medicine box)
export const CapsuleMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl">
      <img
        src="/capsule_mascot.png"
        alt="3D Capsule Pill Mascot"
        className="w-full h-full object-contain rounded-3xl"
      />
    </div>
    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3 flex items-center gap-1.5 animate-pulse">
      💊 3D Capsule POS Buddy (Walking & Holding Box)
    </div>
  </div>
);

// 3. 3D Animated Laboratory Flask Mascot (Safety goggles, glowing test tube, sneakers)
export const LabMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl">
      <img
        src="/flask_mascot.png"
        alt="3D Lab Flask Mascot"
        className="w-full h-full object-contain rounded-3xl"
      />
    </div>
    <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3 flex items-center gap-1.5 animate-pulse">
      🧪 3D LIS Lab Flask Mascot (Holding Glowing Test Tube)
    </div>
  </div>
);

// 4. Receptionist Mascot
export const ReceptionMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl flex items-center justify-center bg-amber-50 dark:bg-amber-950/40 rounded-3xl border border-amber-200 dark:border-amber-800 p-4">
      <svg width="180" height="200" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="90" cy="70" rx="42" ry="45" fill="#FEF3C7" />
        <path d="M50 65 C50 25 130 25 130 65 L135 110 L45 110 Z" fill="#78350F" />
        <rect x="42" y="60" width="16" height="30" rx="8" fill="#F59E0B" />
        <circle cx="76" cy="72" r="5" fill="#0F172A" />
        <circle cx="104" cy="72" r="5" fill="#0F172A" />
        <path d="M82 85 Q90 95 98 85" stroke="#0F172A" strokeWidth="3" fill="none" />
        <path d="M45 125 C45 105 135 105 135 125 L145 200 L35 200 Z" fill="#D97706" />
        <rect x="75" y="140" width="30" height="40" rx="4" fill="#FFFFFF" stroke="#92400E" strokeWidth="2" />
      </svg>
    </div>
    <div className="bg-amber-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3">
      📋 Reception Desk Mascot
    </div>
  </div>
);

// 5. Super Admin Mascot
export const SuperAdminMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl flex items-center justify-center bg-purple-50 dark:bg-purple-950/40 rounded-3xl border border-purple-200 dark:border-purple-800 p-4">
      <svg width="180" height="200" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 20 L150 50 V110 C150 160 90 190 90 190 C90 190 30 160 30 110 V50 Z" fill="#9333EA" stroke="#F59E0B" strokeWidth="5" />
        <path d="M60 40 L75 20 L90 35 L105 20 L120 40 Z" fill="#F59E0B" />
        <circle cx="72" cy="90" r="6" fill="#FFFFFF" />
        <circle cx="108" cy="90" r="6" fill="#FFFFFF" />
        <path d="M80 115 Q90 128 100 115" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
      </svg>
    </div>
    <div className="bg-purple-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3">
      👑 SaaS Shield Mascot
    </div>
  </div>
);

// 6. Hospital Admin Mascot
export const HospitalAdminMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl flex items-center justify-center bg-sky-50 dark:bg-sky-950/40 rounded-3xl border border-sky-200 dark:border-sky-800 p-4">
      <svg width="180" height="200" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="50" width="100" height="140" rx="12" fill="#0284c7" stroke="#0369a1" strokeWidth="4" />
        <rect x="65" y="20" width="50" height="30" rx="6" fill="#0ea5e9" />
        <rect x="82" y="70" width="16" height="30" rx="3" fill="#FFFFFF" />
        <rect x="75" y="77" width="30" height="16" rx="3" fill="#FFFFFF" />
        <circle cx="70" cy="130" r="5" fill="#FFFFFF" />
        <circle cx="110" cy="130" r="5" fill="#FFFFFF" />
        <path d="M80 148 Q90 158 100 148" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      </svg>
    </div>
    <div className="bg-sky-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3">
      🏥 Executive Hospital Mascot
    </div>
  </div>
);

// 7. Patient Mascot
export const PatientMascot: React.FC<{ isPushedAway?: boolean }> = ({ isPushedAway }) => (
  <div className={`flex flex-col items-center justify-center transition-all duration-700 ${isPushedAway ? "translate-x-[200%] opacity-0 scale-75" : "animate-mascot-bounce"}`}>
    <div className="relative w-64 h-72 drop-shadow-2xl flex items-center justify-center bg-rose-50 dark:bg-rose-950/40 rounded-3xl border border-rose-200 dark:border-rose-800 p-4">
      <svg width="180" height="200" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 180 C-10 100 40 20 90 70 C140 20 190 100 90 180 Z" fill="#E11D48" />
        <rect x="60" y="75" width="28" height="12" rx="4" fill="#FDE047" transform="rotate(-25 60 75)" />
        <circle cx="70" cy="95" r="5" fill="#FFFFFF" />
        <circle cx="110" cy="95" r="5" fill="#FFFFFF" />
        <path d="M80 115 Q90 125 100 115" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
      </svg>
    </div>
    <div className="bg-rose-600 text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-xl mt-3">
      ❤️ Patient Health Buddy
    </div>
  </div>
);
