// sections/Experience.tsx
"use client";

import { useState } from "react";
import { experiences } from "@/data/experience";
import CertificateModal from "@/components/CertificateModal";

export default function Experience() {
  const [previewCert, setPreviewCert] = useState<{ src: string; title: string } | null>(null);

  return (
    <section
      id="experience"
      className="min-h-screen px-6 py-24 max-w-4xl mx-auto flex flex-col justify-center relative z-10"
    >
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-subtitle">&lt;Milestones /&gt;</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
          Work &amp; <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          My professional software engineering history, production internships, and technical leadership.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="space-y-12 border-l-2 border-white/[0.08] ml-3 md:ml-0 pl-6 md:pl-10 relative">
        {experiences.map((exp, index) => (
          <div key={index} className="relative group p-6 rounded-2xl transition-all hover:bg-[#12161f]/60 hover:border hover:border-white/10">

            {/* Timeline Dot with glow */}
            <span className="absolute -left-[35px] md:-left-[51px] top-7 w-5 h-5 rounded-full bg-[#0a0c10] border-4 border-white/20 group-hover:border-[#6366f1] group-hover:shadow-[0_0_16px_rgba(99,102,241,0.6)] transition-all duration-300" />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {exp.role} <span className="gradient-text">@ {exp.company}</span>
              </h3>
              <span className="text-xs md:text-sm font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-full w-fit whitespace-nowrap border border-white/10 font-mono">
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

            {/* Tech Stack Pills + Certificate Button */}
            <div className="flex flex-wrap gap-2 items-center">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-3 py-1 bg-white/[0.03] border border-white/5 text-gray-500 rounded-lg hover:border-white/10 hover:text-gray-400 transition-colors font-mono"
                >
                  {tech}
                </span>
              ))}
              {exp.certificate && (
                <button
                  onClick={() => setPreviewCert({ src: exp.certificate!, title: `${exp.company} — ${exp.type} Certificate` })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 hover:bg-cyan-accent/20 transition-colors cursor-pointer ml-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  View Certificate
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Certificate Lightbox */}
      {previewCert && (
        <CertificateModal
          src={previewCert.src}
          title={previewCert.title}
          onClose={() => setPreviewCert(null)}
        />
      )}
    </section>
  );
}