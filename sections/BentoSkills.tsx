// sections/BentoSkills.tsx
"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

const bentoCards = [
  {
    title: "Frontend",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    accent: "cyan",
    span: "md:col-span-2",
  },
  {
    title: "Backend",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    skills: ["Python", "FastAPI", "Flask", "Node.js", "REST APIs", "System Design (HLD/LLD)"],
    accent: "violet",
    span: "md:col-span-2",
  },
  {
    title: "Cloud & DevOps",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    skills: ["AWS (Lambda, ECS, S3)", "Kubernetes", "EKS", "Docker", "GitHub Actions"],
    accent: "cyan",
    span: "md:col-span-2",
  },
  {
    title: "Security & Identity",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    skills: ["SSO", "OAuth 2.0", "OIDC", "SAML", "Passkeys", "Zero Trust"],
    accent: "violet",
    span: "md:col-span-2 lg:col-span-3",
  },
  {
    title: "AI & Data",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    skills: ["LangChain", "RAG", "AutoGen", "Behavioral Biometrics", "ML Basics"],
    accent: "cyan",
    span: "md:col-span-2 lg:col-span-3",
  },
  {
    title: "Databases",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    skills: ["PostgreSQL", "SQL", "MongoDB (NoSQL)"],
    accent: "violet",
    span: "md:col-span-2",
  },
];

const metrics = [
  {
    value: "450+",
    label: "LeetCode",
    icon: "https://cdn.simpleicons.org/leetcode/FFA116",
    link: "https://leetcode.com/u/AbhishekShekhawat/",
  },
  {
    value: "130+",
    label: "Codeforces",
    icon: "https://cdn.simpleicons.org/codeforces/1F8ACB",
    link: "https://codeforces.com/profile/AbhishekShekhawat",
  },
];

export default function BentoSkills() {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    grid.style.setProperty("--mouse-x", `${x}px`);
    grid.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white section-heading">
        Tech Stack
      </h2>
      <p className="text-gray-500 mb-12 max-w-2xl">
        The full-stack toolkit I use to architect, build, and deploy production systems.
      </p>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        className="bento-grid grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        {/* Skill Category Cards */}
        {bentoCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className={`bento-card p-6 ${card.span}`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2.5 rounded-xl ${
                    card.accent === "cyan"
                      ? "bg-cyan-accent/10 text-cyan-accent"
                      : "bg-violet-accent/10 text-violet-accent"
                  }`}
                >
                  {card.icon}
                </div>
                <h3 className="text-base font-bold text-white">{card.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {card.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white/[0.03] border border-white/5 text-gray-400 text-xs font-medium rounded-lg hover:bg-white/5 hover:text-gray-300 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Metric Cards */}
        {metrics.map((metric, index) => (
          <motion.a
            key={metric.label}
            href={metric.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (bentoCards.length + index) * 0.08, duration: 0.4 }}
            className="bento-card p-6 md:col-span-2 lg:col-span-2 flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative z-10 flex items-center gap-4 w-full">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform shrink-0">
                <img src={metric.icon} alt={metric.label} className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white leading-none mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  {metric.label}
                </div>
              </div>
            </div>
          </motion.a>
        ))}

        {/* CTA / Full-Stack Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (bentoCards.length + metrics.length) * 0.08, duration: 0.4 }}
          className="bento-card p-6 md:col-span-4 lg:col-span-2 flex flex-col justify-center"
        >
          <div className="relative z-10">
            <p className="text-gradient-fusion text-lg font-bold mb-2">
              Full-Stack Thinking
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              From pixel-perfect React UIs to distributed Python microservices —
              I own the entire stack.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
