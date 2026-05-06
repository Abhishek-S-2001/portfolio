"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  // ─── Scroll tracking ───────────────────────────────────────────────────────
  // The outer section is 220vh tall so scroll progress covers the transition.
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring so the transition feels physical
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // ─── Cinematic splash → card transforms ────────────────────────────────────
  // Profile image: large centered → small left-aligned
  const imgSize = useTransform(progress, [0, 0.55], ["220px", "192px"]);
  const imgX = useTransform(progress, [0, 0.55], ["0%", "0%"]);  // handled by flex
  const imgOpacitySplash = useTransform(progress, [0, 0.1], [1, 0]);     // splash image fades out
  const imgOpacityCard = useTransform(progress, [0.25, 0.55], [0, 1]); // card image fades in

  // Name / tagline: spread out at splash → condense into card
  const nameY = useTransform(progress, [0, 0.55], ["0px", "0px"]);
  const nameOpacitySplash = useTransform(progress, [0, 0.2], [1, 0]);
  const nameOpacityCard = useTransform(progress, [0.3, 0.55], [0, 1]);

  // Floating details (role, bio): fade out early
  const detailsOpacity = useTransform(progress, [0, 0.18], [1, 0]);
  const detailsY = useTransform(progress, [0, 0.25], ["0px", "-20px"]);

  // The glass card: invisible → visible
  const cardOpacity = useTransform(progress, [0.35, 0.65], [0, 1]);
  const cardY = useTransform(progress, [0.35, 0.65], ["30px", "0px"]);
  const cardScale = useTransform(progress, [0.35, 0.65], [0.97, 1]);

  // Scroll hint: fades out immediately
  const scrollHintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  // Tools card fades in after card settles
  const toolsOpacity = useTransform(progress, [0.6, 0.85], [0, 1]);
  const toolsY = useTransform(progress, [0.6, 0.85], ["20px", "0px"]);

  // ─── 3D mouse tilt on the card ─────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.setProperty("--rot-x", `${((cy - y) / cy) * 6}deg`);
    card.style.setProperty("--rot-y", `${((x - cx) / cx) * 6}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);
  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rot-x", "0deg");
    card.style.setProperty("--rot-y", "0deg");
  }, []);

  return (
    <>
      {/* ─── SCROLL TRACK — 220vh gives plenty of scroll room ─────────────── */}
      <div ref={sectionRef} style={{ height: "220vh" }} className="relative">

        {/* ─── STICKY CANVAS ─────────────────────────────────────────────── */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

          {/* ═══════════════════════════════════════════════════════════
              PHASE 1: CINEMATIC SPLASH  (visible when scroll = 0)
              ═══════════════════════════════════════════════════════════ */}

          {/* Splash — large centered profile image */}
          <motion.div
            style={{ opacity: imgOpacitySplash }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            {/* Bottom fade mask */}
            <div className="absolute inset-0 z-20"
              style={{
                background: "linear-gradient(to top, #0a0a0a 0%, transparent 40%)",
              }}
            />

            {/* Glow halo behind image — pulsing */}
            <div
              className="absolute rounded-full blur-[80px] opacity-20 splash-float"
              style={{
                width: "380px",
                height: "380px",
                background: "radial-gradient(circle, var(--cyan) 0%, var(--violet) 60%, transparent 100%)",
                animationDelay: "0.2s",
              }}
            />

            {/* Profile photo — floats up from bottom on load, then levitates */}
            <div
              className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/60 splash-enter splash-float"
              style={{ width: "220px", height: "270px", animationDelay: "0s, 0.8s" }}
            >
              <Image
                src="/profile.png"
                alt="Abhishek Shekhawat"
                fill
                className="object-cover object-[center_10%]"
                priority
              />
              {/* Inner bottom fade */}
              <div className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 55%)",
                }}
              />
            </div>
          </motion.div>

          {/* Splash — scattered text details */}
          <motion.div
            style={{ opacity: detailsOpacity, y: detailsY }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-6"
          >
            {/* Tagline above image */}
            <p className="font-mono text-xs text-cyan-accent uppercase tracking-[0.25em] mb-56 opacity-80 splash-enter"
              style={{ animationDelay: "0.4s" }}>
              System.Initialize()
            </p>

            {/* Name below image */}
            <div className="mt-72 text-center splash-enter" style={{ animationDelay: "0.6s" }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-3">
                Abhishek Shekhawat
              </h1>
              <h2 className="text-lg md:text-xl font-medium text-gray-400">
                <span className="text-gradient-fusion font-semibold">Full-Stack Developer</span>
                {" · "}Cloud &amp; Security Engineer
              </h2>
            </div>

            {/* Floating side chips */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 hidden md:flex">
              {["FastAPI", "AWS Lambda", "PostgreSQL"].map((label, i) => (
                <span key={label}
                  className="px-3 py-1.5 bg-white/5 border border-white/[0.08] text-gray-500 text-xs font-mono rounded-lg splash-enter"
                  style={{ animationDelay: `${0.75 + i * 0.12}s` }}>
                  {label}
                </span>
              ))}
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 hidden md:flex">
              {["React.js", "Next.js 15", "TypeScript"].map((label, i) => (
                <span key={label}
                  className="px-3 py-1.5 bg-white/5 border border-white/[0.08] text-gray-500 text-xs font-mono rounded-lg splash-enter"
                  style={{ animationDelay: `${0.75 + i * 0.12}s` }}>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 pointer-events-none"
          >
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-pulse" />
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════
              PHASE 2: GLASS CARD  (visible when scrolled)
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
            className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-6 z-50 pointer-events-none"
          >
            <div className="max-w-6xl w-full flex flex-col gap-5 pointer-events-auto">

              {/* The main holographic card */}
              <div className="card-3d-container">
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="card-3d glass-card rounded-3xl p-7 md:p-10 w-full flex flex-col md:flex-row items-start md:items-center gap-7 md:gap-12 relative"
                >
                  <div className="card-glare rounded-3xl" />

                  {/* Profile image — compact */}
                  <div className="shrink-0 relative w-28 h-28 md:w-48 md:h-48 mx-auto md:mx-0 self-start md:self-center group">
                    <div className="profile-glow rounded-3xl" />
                    <Image
                      src="/profile.png"
                      alt="Abhishek Shekhawat"
                      fill
                      className="rounded-3xl object-cover object-[center_10%] border-2 border-white/10 relative z-10 group-hover:border-white/20 transition-colors"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 w-full text-center md:text-left relative z-10">
                    <p className="text-cyan-accent font-mono text-xs tracking-widest font-bold mb-3 uppercase terminal-cursor">
                      System.Initialize()
                    </p>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                      I&apos;m Abhishek Shekhawat
                    </h1>
                    <h2 className="text-base md:text-lg font-medium text-gray-400 mb-4">
                      <span className="text-gradient-fusion font-semibold">Full-Stack Developer</span>
                      <span className="hidden md:inline text-gray-600 mx-2">|</span>
                      <br className="md:hidden" />
                      Cloud &amp; Security Engineer
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-6 mx-auto md:mx-0">
                      I architect scalable APIs, serverless data pipelines, and research-driven
                      continuous authentication models — from React frontends to Python ML backends.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <a href="https://github.com/Abhishek-S-2001" target="_blank" rel="noopener noreferrer"
                          className="p-2.5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/5" aria-label="GitHub">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="https://linkedin.com/in/abhishek-shekhawat" target="_blank" rel="noopener noreferrer"
                          className="p-2.5 bg-white/5 text-gray-400 hover:text-cyan-accent hover:bg-cyan-accent/10 rounded-xl transition-all border border-white/5" aria-label="LinkedIn">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                        </a>
                      </div>
                      <div className="hidden md:block w-px h-8 bg-white/10" />
                      <a href="#contact" className="px-5 py-2.5 bg-gradient-fusion hover:opacity-90 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-cyan-accent/20">
                        Let&apos;s Connect
                      </a>
                      <Link href="/resume" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium rounded-xl transition-all border border-white/10">
                        Resume
                      </Link>
                    </div>

                    {/* CP stats */}
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
              </div>

              {/* Tools card */}
              <motion.div
                style={{ opacity: toolsOpacity, y: toolsY }}
                className="glass-card rounded-2xl p-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-5"
              >
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
              </motion.div>

            </div>
          </motion.div>

        </div>
        {/* ─── End sticky canvas ─────────────────────────────────────────── */}

      </div>
      {/* ─── End scroll track ─────────────────────────────────────────────── */}
    </>
  );
}