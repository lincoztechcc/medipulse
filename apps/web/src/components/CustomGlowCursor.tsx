"use client";

import React, { useEffect, useState } from "react";

export const CustomGlowCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    const followCursor = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animFrame = requestAnimationFrame(followCursor);
    };

    animFrame = requestAnimationFrame(followCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, [position.x, position.y]);

  return (
    <>
      {/* Primary Cyan Glow Cursor Dot */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-sky-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-screen shadow-[0_0_15px_#38bdf8]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.8 : 1})`,
        }}
      />
      {/* Outer Radial Ambient Light Orb */}
      <div
        className="fixed top-0 left-0 w-48 h-48 bg-sky-500/15 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 blur-2xl transition-all duration-300"
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${isHovered ? 1.4 : 1})`,
        }}
      />
    </>
  );
};
