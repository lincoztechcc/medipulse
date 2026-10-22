"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:scale-105 transition-all flex items-center gap-1.5 text-xs font-semibold"
      title="Toggle Light / Dark Theme"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-sky-600" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
