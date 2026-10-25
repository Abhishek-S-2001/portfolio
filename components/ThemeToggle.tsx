"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const syncTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    };

    // Initial sync from DOM
    syncTheme();

    // Listen to theme changes from other toggle instances or tabs
    window.addEventListener("portfolio-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("portfolio-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    // Determine target theme based on current DOM state
    const currentIsLight = document.documentElement.classList.contains("light");
    const nextTheme = currentIsLight ? "dark" : "light";

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }

    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent("portfolio-theme-change"));
  };

  // Before mount, render equal size placeholder to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 cursor-pointer ${
        isLight
          ? "bg-slate-200/80 hover:bg-slate-300 text-indigo-600 border border-slate-300 shadow-sm"
          : "bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 hover:border-amber-400/40 shadow-md shadow-black/20"
      } ${className}`}
      aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
      title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <span className="sr-only">{isLight ? "Dark Mode" : "Light Mode"}</span>

      {/* Sun / Moon Icons */}
      <div className="relative w-5 h-5 flex items-center justify-center pointer-events-none">
        {/* Sun Icon (Visible in Dark Mode -> prompts click to Light Mode) */}
        <svg
          className={`w-5 h-5 transition-all duration-500 transform ${
            isLight
              ? "opacity-0 rotate-90 scale-0 absolute"
              : "opacity-100 rotate-0 scale-100 text-amber-400 group-hover:rotate-45"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon (Visible in Light Mode -> prompts click to Dark Mode) */}
        <svg
          className={`w-5 h-5 transition-all duration-500 transform ${
            isLight
              ? "opacity-100 rotate-0 scale-100 text-indigo-600 group-hover:-rotate-12"
              : "opacity-0 -rotate-90 scale-0 absolute"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </button>
  );
}
