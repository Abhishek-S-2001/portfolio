// sections/Experience.tsx
"use client";

import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen px-6 py-24 max-w-4xl mx-auto flex flex-col justify-center relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white section-heading">
        Professional Experience
      </h2>

      {/* Timeline Container */}
      <div className="space-y-12 border-l-2 border-white/[0.06] ml-3 md:ml-0 pl-6 md:pl-10 relative">
        {experiences.map((exp, index) => (
          <div key={index} className="relative group">

            {/* Timeline Dot with glow */}
            <span className="absolute -left-[35px] md:-left-[51px] top-1.5 w-5 h-5 rounded-full bg-[#0a0a0a] border-4 border-white/10 group-hover:border-cyan-accent group-hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-300" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {exp.role} <span className="text-gradient-fusion">@ {exp.company}</span>
              </h3>
              <span className="text-sm font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-full w-fit whitespace-nowrap border border-white/5 font-mono">
                {exp.date}
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-4 uppercase tracking-wider">
              <span>{exp.location}</span>
              <span>•</span>
              <span>{exp.type}</span>
            </div>

            {/* Description Points */}
            <ul className="space-y-3 mb-5">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-gray-400 leading-relaxed text-base flex items-start gap-3">
                  <span className="text-cyan-accent mt-1.5 shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </span>
                  {desc}
                </li>
              ))}
            </ul>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-3 py-1 bg-white/[0.03] border border-white/5 text-gray-500 rounded-lg hover:border-white/10 hover:text-gray-400 transition-colors font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}