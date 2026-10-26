"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileTiltCard from "@/components/ProfileTiltCard";

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

          {/* Right Column: Hero Profile 3D Parallax Tilt Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <ProfileTiltCard />
          </div>

        </div>
      </div>
    </section>
  );
}
