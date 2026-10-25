"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import profilePic from "@/public/profile.png";

const roles = [
  "Full-Stack Developer",
  "Cloud & AI Engineer",
  "Backend Architect",
  "Software Problem Solver",
];

export default function Hero() {
  // Typing typewriter effect
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFull = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText !== currentFull) {
      timer = setTimeout(() => {
        setDisplayedText(currentFull.slice(0, displayedText.length + 1));
      }, 90);
    } else if (!isDeleting && displayedText === currentFull) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayedText !== "") {
      timer = setTimeout(() => {
        setDisplayedText(currentFull.slice(0, displayedText.length - 1));
      }, 45);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // 3D Card tilt
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((cy - (e.clientY - rect.top)) / cy) * 8;
    const rotY = (((e.clientX - rect.left) - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center pt-28 pb-16 relative z-10 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Hero Info */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div className="status-badge mb-5">
              <span className="pulse-dot"></span>
              <span>Available for Software Engineering Roles</span>
            </div>

            {/* Greeting */}
            <div className="font-mono text-sm md:text-base font-semibold text-[#6366f1] mb-2 tracking-wide">
              &lt;Hello, World! /&gt;
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
              I&apos;m <span className="gradient-text">Abhishek Shekhawat</span>.
            </h1>

            {/* Dynamic Typing Subtitle */}
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-5 h-10 flex items-center">
              <span>A passionate&nbsp;</span>
              <span className="gradient-text min-w-[20px]">{displayedText}</span>
              <span className="inline-block w-[3px] h-6 sm:h-7 bg-[#6366f1] ml-1 animate-pulse" />
            </div>

            {/* Bio Paragraph */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Full-Stack &amp; Cloud Engineer specializing in scalable APIs, distributed backend systems,
              and elegant high-performance user interfaces with modern React, Next.js, and Python.
            </p>

            {/* Hero CTA Group */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="#projects" className="btn-primary group">
                <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Explore Work</span>
              </a>

              <a href="#contact" className="btn-secondary group">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Get In Touch</span>
              </a>

              <Link href="/resume" className="btn-outline group">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resume</span>
              </Link>
            </div>

            {/* Hero Stats Row */}
            <div className="hero-stats-row w-full max-w-lg">
              <div className="stat-item">
                <h3 className="gradient-text">15+</h3>
                <p>Projects Built</p>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">12+</h3>
                <p>Tech Stacks</p>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">450+</h3>
                <p>LeetCode Solved</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Visual Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="profile-card w-full max-w-sm relative"
            >
              {/* Floating Badge: Top Right */}
              <div className="floating-chip -top-4 -right-4 md:-right-6">
                <div className="w-7 h-7 rounded-lg bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center text-sm font-bold">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-semibold">React &amp; Next.js</span>
              </div>

              {/* Floating Badge: Bottom Left */}
              <div className="floating-chip -bottom-4 -left-4 md:-left-6" style={{ animationDelay: "2s" }}>
                <div className="w-7 h-7 rounded-lg bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center text-sm font-bold">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-semibold">Cloud &amp; Backend</span>
              </div>

              {/* Profile Avatar Box */}
              <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden mb-5 relative bg-[#1a202c] border border-white/10 group">
                <Image
                  src={profilePic}
                  alt="Abhishek Shekhawat"
                  fill
                  className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Profile Header Info */}
              <div className="mb-4">
                <h4 className="text-xl font-bold text-white mb-1">
                  Abhishek Shekhawat
                </h4>
                <p className="text-sm text-[#06b6d4] font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4]"></span>
                  Full-Stack &amp; Cloud Engineer
                </p>
              </div>

              {/* Social Links Row */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-white/5">
                <a
                  href="https://github.com/Abhishek-S-2001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#a855f7] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/in/abhishek-shekhawat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#06b6d4] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all"
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
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#f59e0b] hover:to-[#ef4444] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f59e0b]/30 transition-all"
                  aria-label="LeetCode"
                >
                  <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" className="w-4 h-4" />
                </a>

                <a
                  href="mailto:abhishek.shekhawat.1920@gmail.com"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-[#6366f1] hover:to-[#a855f7] hover:border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6366f1]/30 transition-all"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
