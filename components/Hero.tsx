"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const tools = [
  { name: "AWS", icon: "amazonaws/FF9900" },
  { name: "Docker", icon: "docker/2496ED" },
  { name: "React", icon: "react/61DAFB" },
  { name: "Next.js", icon: "nextdotjs/FFFFFF" },
  { name: "Python", icon: "python/3776AB" },
  { name: "Node.js", icon: "nodedotjs/339933" },
  { name: "PostgreSQL", icon: "postgresql/4169E1" },
  { name: "Supabase", icon: "supabase/3ECF8E" },
];

export default function Hero() {
  // isScrolled: true once user scrolls past 80px → switch splash → card
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.setProperty("--rot-x", `${((cy - (e.clientY - rect.top)) / cy) * 6}deg`);
    card.style.setProperty("--rot-y", `${(((e.clientX - rect.left) - cx) / cx) * 6}deg`);
  }, []);
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rot-x", "0deg");
    card.style.setProperty("--rot-y", "0deg");
  }, []);

  return (
    /*
     * 150vh scroll track — gives ~50vh of scrollable "pause" while showing
     * the card layout before the user naturally scrolls into About.
     * The sticky canvas stays pinned to the viewport for the full 150vh.
     */
    <div style={{ height: "150vh" }} className="relative" id="hero">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ════════════════════════════════════════════
            PHASE 1 — Cinematic splash (scrollY ≤ 80)
            ════════════════════════════════════════════ */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
            >
              {/* Bottom-to-top page fade */}
              <div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: "linear-gradient(to top, #0a0a0a 0%, transparent 40%)" }}
              />

              {/* Glow halo */}
              <div
                className="absolute rounded-full blur-[90px] opacity-20 splash-float"
                style={{
                  width: "400px", height: "400px",
                  background: "radial-gradient(circle, var(--cyan) 0%, var(--violet) 60%, transparent 100%)",
                }}
              />

              {/* Profile photo — no boxy border, radial-mask fade */}
              <div
                className="relative splash-enter splash-float z-30"
                style={{
                  width: "260px", height: "320px",
                  animationDelay: "0s, 0.8s",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 42%, black 45%, transparent 72%)",
                  maskImage: "radial-gradient(ellipse 90% 85% at 50% 42%, black 45%, transparent 72%)",
                }}
              >
                <Image
                  src="/profile.png"
                  alt="Abhishek Shekhawat"
                  fill
                  className="object-cover object-[center_10%]"
                  priority
                />
              </div>

              {/* Tagline above photo */}
              <p
                className="absolute font-mono text-xs text-cyan-accent uppercase tracking-[0.25em] opacity-80 splash-enter z-30"
                style={{ top: "calc(50% - 200px)", animationDelay: "0.35s" }}
              >
                System.Initialize()
              </p>

              {/* Name + role below photo */}
              <div
                className="absolute text-center splash-enter z-30"
                style={{ top: "calc(50% + 175px)", animationDelay: "0.55s" }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-2">
                  Abhishek Shekhawat
                </h1>
                <h2 className="text-lg md:text-xl font-medium text-gray-400">
                  <span className="text-gradient-fusion font-semibold">Full-Stack Developer</span>
                  {" · "}Cloud &amp; AI Engineer
                </h2>
              </div>

              {/* Side chips — backend */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3 hidden md:flex z-30">
                {["FastAPI", "AWS Lambda", "PostgreSQL"].map((label, i) => (
                  <span key={label}
                    className="px-3 py-1.5 bg-white/5 border border-white/[0.08] text-gray-500 text-xs font-mono rounded-lg splash-enter"
                    style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Side chips — frontend */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3 hidden md:flex z-30">
                {["React.js", "Next.js 15", "TypeScript"].map((label, i) => (
                  <span key={label}
                    className="px-3 py-1.5 bg-white/5 border border-white/[0.08] text-gray-500 text-xs font-mono rounded-lg splash-enter"
                    style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Scroll hint */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════════════════════════════════════════
            PHASE 2 — Card layout (scrollY > 80)
            Stays visible while user scrolls the rest
            of the 150vh track before reaching About.
            ════════════════════════════════════════════ */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-6 z-50"
            >
              <div className="max-w-6xl w-full flex flex-col gap-5">

                {/* Profile image + text row */}
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-14"
                >
                  {/* Profile — faded edges, no box */}
                  <div
                    className="shrink-0 relative w-44 h-52 md:w-56 md:h-64 mx-auto md:mx-0"
                    style={{
                      WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 42%, black 50%, transparent 80%)",
                      maskImage: "radial-gradient(ellipse 90% 85% at 50% 42%, black 50%, transparent 80%)",
                    }}
                  >
                    <Image
                      src="/profile.png"
                      alt="Abhishek Shekhawat"
                      fill
                      className="object-cover object-[center_10%]"
                      priority
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col flex-1 w-full text-center md:text-left">
                    <p className="text-cyan-accent font-mono text-xs tracking-widest font-bold mb-3 uppercase terminal-cursor">
                      System.Initialize()
                    </p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                      I&apos;m Abhishek Shekhawat
                    </h1>
                    <h2 className="text-base md:text-lg font-medium text-gray-400 mb-4">
                      <span className="text-gradient-fusion font-semibold">Full-Stack Developer</span>
                      <span className="hidden md:inline text-gray-600 mx-2">|</span>
                      <br className="md:hidden" />
                      Cloud &amp; AI Engineer
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-6 mx-auto md:mx-0">
                      I architect scalable APIs, serverless data pipelines, and research-driven
                      continuous authentication models — from React frontends to Python ML backends.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                      <a href="https://github.com/Abhishek-S-2001" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/5" aria-label="GitHub">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="https://linkedin.com/in/abhishek-shekhawat" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 bg-white/5 text-gray-400 hover:text-cyan-accent hover:bg-cyan-accent/10 rounded-xl transition-all border border-white/5" aria-label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                      </a>
                      <div className="hidden md:block w-px h-8 bg-white/10" />
                      <a href="#contact" className="px-5 py-2.5 bg-gradient-fusion hover:opacity-90 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-cyan-accent/20">
                        Let&apos;s Connect
                      </a>
                      <Link href="/resume" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium rounded-xl transition-all border border-white/10">
                        Resume
                      </Link>
                    </div>

                    {/* CP Stats */}
                    <div className="pt-4 border-t border-white/5 w-full">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-5">
                        <a href="https://leetcode.com/u/AbhishekShekhawat/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                            <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white leading-none">450+</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-mono">LeetCode</div>
                          </div>
                        </a>
                        <a href="https://codeforces.com/profile/AbhishekShekhawat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                            <img src="https://cdn.simpleicons.org/codeforces/1F8ACB" alt="Codeforces" className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white leading-none">130+</div>
                            <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-mono">Codeforces</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tools strip */}
                <div className="glass-card rounded-2xl p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="p-2 bg-white/5 text-gray-400 rounded-lg border border-white/5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="text-sm font-bold text-white">Tools &amp; Platforms</span>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full">
                    {tools.map((tech) => (
                      <div key={tech.name}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-default group/tool">
                        <img src={`https://cdn.simpleicons.org/${tech.icon}`} alt={tech.name} className="w-3.5 h-3.5 group-hover/tool:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-gray-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
