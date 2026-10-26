"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Canvas without SSR to avoid hydration mismatch
const CompanionCanvas = dynamic(() => import("./CompanionCanvas"), {
  ssr: false,
});

const sectionMessages: Record<string, { title: string; text: string; badge: string }> = {
  home: {
    badge: "3D Virtual Guide",
    title: "Hi there! I'm Abhishek's 3D AI Guide",
    text: "Move your cursor to look around, or scroll down to explore projects, tech stacks, and research!",
  },
  about: {
    badge: "Core Engineering",
    title: "Production Architecture",
    text: "Abhishek builds microservices with distributed caching, Docker containerization, and 450+ solved LeetCode challenges.",
  },
  experience: {
    badge: "Industry Track Record",
    title: "Software Engineering Impact",
    text: "From Cognizant enterprise workflows to AIC Research, delivering resilient serverless APIs.",
  },
  projects: {
    badge: "Flagship Innovation",
    title: "Continuous Authentication",
    text: "94.2% anomaly accuracy on 100k+ events using PyTorch, FastAPI, Kafka & real-time auto-retraining.",
  },
  certifications: {
    badge: "Verified Competency",
    title: "Cloud & Dev Credentials",
    text: "Certified in AWS Cloud, Python architectures, and distributed microservices.",
  },
  research: {
    badge: "Published Research",
    title: "AI-Powered Security",
    text: "Published on zero-trust continuous authentication and multi-class behavioral biometric models.",
  },
  skills: {
    badge: "Tech Arsenal",
    title: "12+ Technologies Mastered",
    text: "Next.js, TypeScript, Python, FastAPI, Docker, PostgreSQL, PyTorch, and AWS.",
  },
  education: {
    badge: "Academic Foundation",
    title: "Computer Science Engineering",
    text: "Rigorous focus on Operating Systems, Distributed Systems, and Advanced Algorithms.",
  },
  contact: {
    badge: "Let's Collaborate",
    title: "Ready to build something great?",
    text: "Reach out via email or LinkedIn — always excited for high-impact software engineering roles!",
  },
};

export default function VirtualGuideCompanion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("home");
  const [triggerGesture, setTriggerGesture] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Track window mouse position in normalized NDC coordinates [-1, 1]
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track window scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "certifications",
        "research",
        "skills",
        "education",
        "contact",
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const message = sectionMessages[currentSection] || sectionMessages.home;

  const handleGestureClick = (gesture: string) => {
    setTriggerGesture(gesture);
  };

  return (
    <>
      {/* Full-Viewport 3D WebGL Canvas Layer: Character navigates freely across the page */}
      <div
        style={{ pointerEvents: "none" }}
        className={`fixed inset-0 z-20 webgl-canvas-container pointer-events-none transition-opacity duration-500 ${
          isMinimized ? "opacity-0" : "opacity-100"
        }`}
      >
        <CompanionCanvas
          currentSection={currentSection}
          scrollProgress={scrollProgress}
          triggerGesture={triggerGesture}
          onGestureComplete={() => setTriggerGesture(null)}
          mousePosRef={mousePosRef}
        />
      </div>

      {/* Floating Contextual Guide HUD Pill (Bottom-Right) */}
      <aside
        aria-label="3D Virtual Guide"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none"
      >
        <AnimatePresence mode="wait">
          {!isMinimized ? (
            <motion.div
              key="guide-container"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto w-80 sm:w-92 p-4 rounded-2xl bg-[#131830]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#6366f1]/20"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#06b6d4]">
                    {message.badge}
                  </span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  title="Minimize 3D guide"
                  aria-label="Minimize 3D guide"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Message Content */}
              <h4 className="text-sm font-bold text-white mb-1 tracking-tight">
                {message.title}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                {message.text}
              </p>

              {/* Interactive Gesture Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[11px] text-gray-400 font-mono">React 3D IK</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleGestureClick("Wave")}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 hover:bg-[#6366f1]/20 text-gray-300 hover:text-[#818cf8] border border-white/10 hover:border-[#6366f1]/30 transition-all cursor-pointer"
                  >
                    👋 Wave
                  </button>
                  <button
                    onClick={() => handleGestureClick("ThumbsUp")}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 hover:bg-[#06b6d4]/20 text-gray-300 hover:text-[#22d3ee] border border-white/10 hover:border-[#06b6d4]/30 transition-all cursor-pointer"
                  >
                    👍 Cheer
                  </button>
                  <button
                    onClick={() => handleGestureClick("Dance")}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 hover:bg-[#a855f7]/20 text-gray-300 hover:text-[#c084fc] border border-white/10 hover:border-[#a855f7]/30 transition-all cursor-pointer"
                  >
                    ⚡ Dance
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="guide-docked"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsMinimized(false)}
              className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#131830]/95 backdrop-blur-xl border border-white/10 hover:border-[#6366f1]/40 shadow-xl shadow-[#6366f1]/25 text-white text-xs font-semibold group cursor-pointer transition-all hover:scale-105"
            >
              <div className="w-6 h-6 rounded-full bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                🤖
              </div>
              <span>Open 3D Guide</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            </motion.button>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
}
