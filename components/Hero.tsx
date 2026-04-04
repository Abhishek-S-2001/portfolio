"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Skill data mapped directly from your provided image
const skillCategories = [
  {
    title: "Backend Development",
    skills: ["Python", "System Design (HLD/LLD)", "FastAPI", "Flask", "REST APIs", "Microservices"],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  },
  {
    title: "Security & Identity",
    skills: ["SSO", "OAuth 2.0", "OIDC", "SAML", "Passkeys", "Zero Trust"],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (Lambda, ECS, S3)", "Kubernetes", "EKS", "Docker", "GitHub Actions"],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "SQL", "MongoDB (NoSQL)"],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  },
  {
    title: "Frontend Development",
    skills: ["React.js", "Next.js", "Tailwind CSS"],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  },
  {
    title: "AI & Data",
    skills: ["LangChain", "RAG", "AutoGen", "Behavioral Biometrics", "ML Basics"],
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  }
];

// Visual tools array using SimpleIcons
const tools = [
  { name: "AWS", icon: "icloud/3693F3" },
  { name: "GCP", icon: "googlecloud/4285F4" },
  { name: "Vercel", icon: "vercel/000000" },
  { name: "Supabase", icon: "supabase/3ECF8E" },
  { name: "MongoDB", icon: "mongodb/47A248" },
  { name: "Node.js", icon: "nodedotjs/339933" },
  { name: "React", icon: "react/61DAFB" },
  { name: "Notion", icon: "notion/000000" },
];

export default function Hero() {
  return (
    <section className="min-h-screen pt-28 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 relative overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-blue-50/80 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="max-w-6xl w-full flex flex-col gap-6">

        {/* ========================================= */}
        {/* LARGE CARD: Profile & Actions             */}
        {/* ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/40 rounded-3xl p-8 md:p-10 w-full flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
        >
          {/* Profile Image */}
          <div className="shrink-0 relative w-32 h-32 md:w-56 md:h-56 mx-auto md:mx-0 self-start md:self-center group">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <Image
              src="/profile.png" // Verify this is your exact image name!
              alt="Abhishek Shekhawat"
              fill
              className="rounded-3xl object-cover object-[center_10%] border-4 border-white shadow-sm relative z-10"
              priority
            />
          </div>

          {/* Core Content */}
          <div className="flex flex-col flex-1 w-full text-center md:text-left">
            <p className="text-blue-600 font-mono text-xs tracking-widest font-bold mb-3 uppercase">
              System.Initialize()
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              I'm Abhishek Shekhawat
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-slate-600 mb-4">
              Backend & Cloud Engineer <span className="hidden md:inline text-slate-300 mx-2">|</span> <br className="md:hidden" />Web Application Security
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mb-8 mx-auto md:mx-0">
              I specialize in designing scalable APIs, serverless data pipelines, and research-driven continuous authentication models.
            </p>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
              <div className="flex items-center gap-3">
                <a href="https://github.com/Abhishek-S-2001" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://linkedin.com/in/abhishek-shekhawat" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-slate-200 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                </a>
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 mx-1"></div>

              <a href="#contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md flex items-center gap-2">
                Let's Connect
              </a>
              <Link href="/resume" className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all duration-200 border border-slate-200 shadow-sm flex items-center gap-2">
                Resume
              </Link>
            </div>

            {/* CP Stats Bottom Row */}
            <div className="pt-5 border-t border-slate-100 w-full">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
                <a href="https://leetcode.com/u/AbhishekShekhawat/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group text-left">
                  <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:scale-110 transition-transform">
                    <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900 leading-none">450+</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">LeetCode</div>
                  </div>
                </a>

                <a href="https://codeforces.com/profile/AbhishekShekhawat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group text-left">
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                    <img src="https://cdn.simpleicons.org/codeforces/1F8ACB" alt="Codeforces" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900 leading-none">130+</div>
                    <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Codeforces</div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </motion.div>


        {/* ========================================= */}
        {/* WIDE CARD: Tools & Platforms Showcase     */}
        {/* ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2 lg:col-span-3 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 sm:px-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md hover:border-blue-300 transition-all"
        >
          <div className="flex items-center gap-3 shrink-0">
            <span className="p-2 bg-slate-100 text-slate-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <h3 className="text-base font-bold text-slate-900">Tools & Platforms</h3>
          </div>

          {/* The Visual Tools Grid */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-3 w-full">
            {tools.map((tech) => (
              <div key={tech.name} className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all cursor-default group/tool">
                <img src={`https://cdn.simpleicons.org/${tech.icon}`} alt={tech.name} className="w-4 h-4 group-hover/tool:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-slate-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========================================= */}
        {/* SMALL CARDS: Categorized Skills Grid      */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {category.icon}
                  </svg>
                </span>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}