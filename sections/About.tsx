"use client";

import SectionWrapper from "@/components/SectionWrapper";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-24 max-w-6xl mx-auto flex flex-col justify-center relative z-10"
    >
      <SectionWrapper>
        {/* IMSEC Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-subtitle">&lt;Biography /&gt;</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
            About <span className="gradient-text">My Journey</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Passionate software engineer combining rigorous computer science foundations with high-impact system craft.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Card: Who I Am */}
          <div className="lg:col-span-6 profile-card flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" />
                Who I Am
              </h3>
              
              <div className="text-gray-400 text-base leading-relaxed space-y-4">
                <p>
                  I&apos;m Abhishek Shekhawat, a Computer Science engineer based in
                  <span className="text-white font-semibold"> Noida / Delhi NCR, India</span>.
                  My engineering journey is centered on architecting scalable backend APIs,
                  serverless data pipelines, and intelligent full-stack systems.
                </p>
                <p>
                  Over rigorous projects and research collaborations, I&apos;ve engineered systems
                  ranging from reactive browser interfaces to distributed microservices.
                  I believe code should be maintainable, self-documenting, and dependable in production.
                </p>
                <p>
                  Beyond routine development, I actively solve algorithmic challenges (450+ on LeetCode),
                  publish research on continuous authentication models, and explore cloud-native architectures.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-3">
              <Link href="/resume" className="btn-primary text-sm py-2.5 px-5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>View Resume</span>
              </Link>
              <a href="#contact" className="btn-secondary text-sm py-2.5 px-5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Let&apos;s Talk</span>
              </a>
            </div>
          </div>

          {/* Right Card: Core Engineering Values */}
          <div className="lg:col-span-6 profile-card flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]" />
              Core Engineering Values
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {/* Highlight 1 */}
              <div className="p-4 rounded-xl bg-[#1a202c]/60 border border-white/5 hover:border-[#6366f1]/40 hover:bg-[#1a202c]/90 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#6366f1]/15 text-[#6366f1] flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h5 className="text-base font-bold text-white mb-1">Performance First</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Optimized query plans, minimal bundle footprints, and sub-second API responses.
                  </p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="p-4 rounded-xl bg-[#1a202c]/60 border border-white/5 hover:border-[#06b6d4]/40 hover:bg-[#1a202c]/90 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#06b6d4]/15 text-[#06b6d4] flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h5 className="text-base font-bold text-white mb-1">Component Driven</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Modular, atomic architectures built for maximum scalability, testability, and reuse.
                  </p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="p-4 rounded-xl bg-[#1a202c]/60 border border-white/5 hover:border-[#10b981]/40 hover:bg-[#1a202c]/90 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#10b981]/15 text-[#10b981] flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h5 className="text-base font-bold text-white mb-1">Robust &amp; Reliable</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Strict type validation, resilient state management, and comprehensive error handling.
                  </p>
                </div>
              </div>

              {/* Highlight 4 */}
              <div className="p-4 rounded-xl bg-[#1a202c]/60 border border-white/5 hover:border-[#a855f7]/40 hover:bg-[#1a202c]/90 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#a855f7]/15 text-[#a855f7] flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h5 className="text-base font-bold text-white mb-1">Polished UX</h5>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Micro-animations, frosted glassmorphism, and seamless mobile ergonomics.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}