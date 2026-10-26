"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import profilePic from "@/public/profile.png";

export default function ProfileTiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw normalized mouse coordinates: [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for magnetic, tactile motion
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };

  // Tilts: rotateX responds to Y movement, rotateY responds to X movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  // Subtle magnetic translation to follow the cursor
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  // Holographic glare highlight coordinates: percentage [0%, 100%]
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  // Dynamic glare gradient
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(99, 102, 241, 0.12) 30%, rgba(6, 182, 212, 0.08) 50%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized coordinates (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / width - 0.5;
    const normY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap back to flat rest state
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full max-w-sm flex items-center justify-center relative select-none"
    >
      {/* Background ambient glow pulse behind the card — Cyan on left, Violet on right */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#06b6d4]/35 via-[#6366f1]/25 to-[#a855f7]/35 blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main 3D Framer-Motion Tilt Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.025 : 1,
        }}
        transition={{
          scale: { duration: 0.25, ease: "easeOut" },
        }}
        className="profile-card w-full relative rounded-2xl cursor-grab active:cursor-grabbing will-change-transform"
      >
        {/* Holographic Glare Sheen Overlay */}
        <motion.div
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
            transform: "translateZ(1px)",
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-30 mix-blend-overlay"
        />

        {/* Floating 3D Badge 1: Top Right (Elevated translateZ 60px) */}
        <div
          style={{ transform: "translateZ(65px)" }}
          className="floating-chip -top-4 -right-4 md:-right-6 transition-transform"
        >
          <div className="w-7 h-7 rounded-lg bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center text-sm font-bold shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          </div>
          <span className="text-xs md:text-sm font-semibold tracking-wide">React &amp; Next.js</span>
        </div>

        {/* Floating 3D Badge 2: Bottom Left (Elevated translateZ 60px) */}
        <div
          style={{ transform: "translateZ(65px)", animationDelay: "2s" }}
          className="floating-chip -bottom-4 -left-4 md:-left-6 transition-transform"
        >
          <div className="w-7 h-7 rounded-lg bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center text-sm font-bold shadow-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          </div>
          <span className="text-xs md:text-sm font-semibold tracking-wide">Cloud &amp; Backend</span>
        </div>

        {/* 3D Profile Avatar Layer (translateZ 35px) */}
        <div
          style={{ transform: "translateZ(35px)" }}
          className="w-full h-72 sm:h-80 rounded-xl overflow-hidden mb-5 relative bg-[#131830] border border-white/10 group shadow-md"
        >
          <Image
            src={profilePic}
            alt="Abhishek Shekhawat"
            fill
            className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1d]/75 via-[#0c0f1d]/20 to-transparent pointer-events-none" />
        </div>

        {/* 3D Profile Info Header Layer (translateZ 45px) */}
        <div style={{ transform: "translateZ(45px)" }} className="mb-4">
          <h4 className="text-xl font-bold text-white mb-1 tracking-tight">
            Abhishek Shekhawat
          </h4>
          <p className="text-sm text-[#06b6d4] font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            Full-Stack &amp; Cloud Engineer
          </p>
        </div>

        {/* 3D Social Icons Layer (translateZ 50px) */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="flex items-center gap-2.5 pt-3 border-t border-white/5"
        >
          <a
            href="https://github.com/Abhishek-S-2001"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#a855f7] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all cursor-pointer"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/abhishek-shekhawat"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#06b6d4] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all cursor-pointer"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>

          <a
            href="https://leetcode.com/u/AbhishekShekhawat/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#f59e0b] hover:to-[#ef4444] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f59e0b]/30 transition-all cursor-pointer"
            aria-label="LeetCode"
          >
            <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" className="w-4 h-4" />
          </a>

          <a
            href="mailto:abhishek.shekhawat.1920@gmail.com"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#a855f7] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all cursor-pointer"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
