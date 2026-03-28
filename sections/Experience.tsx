// src/sections/Experience.tsx
"use client";

import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-screen px-6 py-24 max-w-4xl mx-auto flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Professional Experience
      </h2>

      {/* Timeline Container */}
      <div className="space-y-12 border-l-2 border-slate-200 ml-3 md:ml-0 pl-6 md:pl-10 relative">
        {experiences.map((exp, index) => (
          <div key={index} className="relative group">
            
            {/* Animated Timeline Dot */}
            <span className="absolute -left-[35px] md:-left-[51px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-500 transition-colors duration-300"></span>

            {/* Header: Role & Company */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                {exp.role} <span className="text-blue-600">@ {exp.company}</span>
              </h3>
              <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                {exp.date}
              </span>
            </div>

            {/* Meta: Location & Type */}
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-4 uppercase tracking-wider">
              <span>{exp.location}</span>
              <span>•</span>
              <span>{exp.type}</span>
            </div>

            {/* Description Points */}
            <ul className="space-y-3 mb-5">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-slate-600 leading-relaxed text-base flex items-start gap-3">
                  <span className="text-blue-400 mt-1.5 shrink-0">
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
                  className="text-xs font-semibold px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg shadow-sm hover:border-blue-300 transition-colors"
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