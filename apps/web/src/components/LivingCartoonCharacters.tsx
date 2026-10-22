"use client";

import React from "react";

// 1. Fully Articulated Living Doctor Cartoon Character (SVG/CSS Animated Vector)
export const LivingDoctorCharacter: React.FC<{ isWalking?: boolean }> = ({ isWalking = true }) => {
  return (
    <div className="relative w-64 h-80 flex flex-col items-center justify-center">
      <svg
        width="220"
        height="280"
        viewBox="0 0 220 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-2xl ${isWalking ? "animate-pedal-walk" : ""}`}
      >
        {/* Animated Leg 1 (Left Leg with Sneaker) */}
        <g className={isWalking ? "animate-leg-left" : ""}>
          <rect x="75" y="180" width="16" height="55" rx="8" fill="#0284c7" />
          {/* White Sneaker Shoe */}
          <path d="M65 230 C65 220 95 220 95 230 L100 242 C100 248 65 248 65 242 Z" fill="#FFFFFF" stroke="#0f172a" strokeWidth="2" />
          <rect x="70" y="238" width="28" height="4" fill="#0284c7" />
        </g>

        {/* Animated Leg 2 (Right Leg with Sneaker) */}
        <g className={isWalking ? "animate-leg-right" : ""}>
          <rect x="125" y="180" width="16" height="55" rx="8" fill="#0284c7" />
          {/* White Sneaker Shoe */}
          <path d="M115 230 C115 220 145 220 145 230 L150 242 C150 248 115 248 115 242 Z" fill="#FFFFFF" stroke="#0f172a" strokeWidth="2" />
          <rect x="120" y="238" width="28" height="4" fill="#0284c7" />
        </g>

        {/* Doctor Lab Coat Body & Torso */}
        <path d="M50 110 C50 90 170 90 170 110 L180 190 C180 200 40 200 40 190 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
        {/* Blue Inner Scrubs */}
        <path d="M85 95 L110 140 L135 95 Z" fill="#0EA5E9" />
        <rect x="105" y="140" width="10" height="50" fill="#0284c7" />

        {/* Stethoscope around Neck */}
        <path d="M75 100 Q75 155 110 155 Q145 155 145 100" stroke="#334155" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="110" cy="160" r="10" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />

        {/* Doctor Head */}
        <ellipse cx="110" cy="65" rx="42" ry="46" fill="#FCE7F3" />
        {/* Hair */}
        <path d="M68 60 C68 30 152 30 152 60 C152 40 135 20 110 20 C85 20 68 40 68 60 Z" fill="#1E293B" />
        {/* Headband Mirror */}
        <rect x="85" y="20" width="50" height="8" rx="4" fill="#0284c7" />
        <circle cx="110" cy="24" r="10" fill="#E0F2FE" stroke="#0284c7" strokeWidth="3" />

        {/* Animated Eyes (Blinking) */}
        <g className="animate-eye-blink">
          <circle cx="95" cy="65" r="6" fill="#0F172A" />
          <circle cx="125" cy="65" r="6" fill="#0F172A" />
          <circle cx="97" cy="63" r="2.5" fill="#FFFFFF" />
          <circle cx="127" cy="63" r="2.5" fill="#FFFFFF" />
        </g>
        {/* Cheeks */}
        <ellipse cx="85" cy="75" rx="6" ry="3" fill="#F472B6" opacity="0.6" />
        <ellipse cx="135" cy="75" rx="6" ry="3" fill="#F472B6" opacity="0.6" />
        {/* Smile */}
        <path d="M100 78 Q110 88 120 78" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Articulated Arms Holding Card */}
        <path d="M45 115 Q15 145 55 160" stroke="#FCE7F3" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="55" cy="160" r="8" fill="#FCE7F3" />
        <path d="M175 115 Q205 145 165 160" stroke="#FCE7F3" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="165" cy="160" r="8" fill="#FCE7F3" />
      </svg>
    </div>
  );
};

// 2. Fully Articulated Living Pharmacy Capsule Cartoon Character
export const LivingCapsuleCharacter: React.FC<{ isWalking?: boolean }> = ({ isWalking = true }) => {
  return (
    <div className="relative w-64 h-80 flex flex-col items-center justify-center">
      <svg
        width="220"
        height="280"
        viewBox="0 0 220 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-2xl ${isWalking ? "animate-pedal-walk" : ""}`}
      >
        {/* Leg 1 */}
        <g className={isWalking ? "animate-leg-left" : ""}>
          <rect x="80" y="170" width="14" height="60" rx="7" fill="#0D9488" />
          <path d="M68 225 C68 215 98 215 98 225 L102 238 C102 244 68 244 68 238 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <rect x="73" y="234" width="27" height="4" fill="#E11D48" />
        </g>

        {/* Leg 2 */}
        <g className={isWalking ? "animate-leg-right" : ""}>
          <rect x="126" y="170" width="14" height="60" rx="7" fill="#0D9488" />
          <path d="M114 225 C114 215 144 215 144 225 L148 238 C148 244 114 244 114 238 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <rect x="119" y="234" width="27" height="4" fill="#E11D48" />
        </g>

        {/* Top Red Capsule Half */}
        <path d="M50 100 C50 40 170 40 170 100 Z" fill="#E11D48" />
        {/* Bottom Teal Capsule Half */}
        <path d="M50 100 C50 160 170 160 170 100 Z" fill="#0D9488" stroke="#047857" strokeWidth="4" />

        {/* Animated Eyes */}
        <g className="animate-eye-blink">
          <circle cx="88" cy="85" r="8" fill="#0F172A" />
          <circle cx="132" cy="85" r="8" fill="#0F172A" />
          <circle cx="91" cy="82" r="3" fill="#FFFFFF" />
          <circle cx="135" cy="82" r="3" fill="#FFFFFF" />
        </g>

        {/* Cheeks & Smile */}
        <ellipse cx="76" cy="95" rx="7" ry="3.5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="144" cy="95" rx="7" ry="3.5" fill="#FDA4AF" opacity="0.8" />
        <path d="M96 100 Q110 112 124 100" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Medical Cross Emblem */}
        <rect x="103" y="120" width="14" height="26" rx="3" fill="#FFFFFF" />
        <rect x="97" y="126" width="26" height="14" rx="3" fill="#FFFFFF" />

        {/* Cartoon Arms Hugging Card */}
        <path d="M48 105 Q18 135 55 145" stroke="#E11D48" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M172 105 Q202 135 165 145" stroke="#E11D48" strokeWidth="12" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

// 3. Fully Articulated Living Lab Flask Cartoon Character
export const LivingFlaskCharacter: React.FC<{ isWalking?: boolean }> = ({ isWalking = true }) => {
  return (
    <div className="relative w-64 h-80 flex flex-col items-center justify-center">
      <svg
        width="220"
        height="280"
        viewBox="0 0 220 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-2xl ${isWalking ? "animate-pedal-walk" : ""}`}
      >
        {/* Leg 1 */}
        <g className={isWalking ? "animate-leg-left" : ""}>
          <rect x="80" y="180" width="14" height="50" rx="7" fill="#6366F1" />
          <path d="M68 225 C68 215 98 215 98 225 L102 238 C102 244 68 244 68 238 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <rect x="73" y="234" width="27" height="4" fill="#4338CA" />
        </g>

        {/* Leg 2 */}
        <g className={isWalking ? "animate-leg-right" : ""}>
          <rect x="126" y="180" width="14" height="50" rx="7" fill="#6366F1" />
          <path d="M114 225 C114 215 144 215 144 225 L148 238 C148 244 114 244 114 238 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <rect x="119" y="234" width="27" height="4" fill="#4338CA" />
        </g>

        {/* Flask Glass Body */}
        <path d="M90 35 L130 35 L130 85 L180 170 C190 190 170 205 110 205 C50 205 30 190 40 170 L90 85 Z" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="5" />
        <path d="M52 145 L168 145 L178 170 C185 188 165 200 110 200 C55 200 35 188 42 170 Z" fill="#6366F1" />

        {/* Goggles */}
        <rect x="65" y="95" width="40" height="26" rx="8" fill="#38BDF8" opacity="0.9" stroke="#0284c7" strokeWidth="3" />
        <rect x="115" y="95" width="40" height="26" rx="8" fill="#38BDF8" opacity="0.9" stroke="#0284c7" strokeWidth="3" />

        {/* Blinking Eyes */}
        <g className="animate-eye-blink">
          <circle cx="85" cy="108" r="5" fill="#0F172A" />
          <circle cx="135" cy="108" r="5" fill="#0F172A" />
        </g>

        {/* Smile */}
        <path d="M100 130 Q110 140 120 130" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Bubbles */}
        <circle cx="105" cy="50" r="6" fill="#818CF8" className="animate-ping" />
        <circle cx="115" cy="25" r="8" fill="#C7D2FE" />
        <circle cx="88" cy="15" r="5" fill="#818CF8" />

        {/* Cartoon Arms Holding Glowing Test Tube */}
        <path d="M40 130 Q10 155 50 165" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M180 130 Q210 155 170 165" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};
