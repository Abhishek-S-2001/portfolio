// sections/Research.tsx
"use client";

import { useState } from "react";
import { researchItems } from "@/data/research";
import CertificateModal from "@/components/CertificateModal";

export default function Research() {
  const [previewCert, setPreviewCert] = useState<{ src: string; title: string } | null>(null);

  return (
    <section
      id="research"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto flex flex-col justify-center relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white section-heading">
        Research &amp; Academic Work
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchItems.map((item) => (
          <div
            key={item.title}
            className="glass-card rounded-2xl p-6 hover:border-white/15 transition-all flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-3 text-white leading-snug">
              {item.title}
            </h3>

            <p className="text-gray-500 mb-5 text-sm leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {item.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1 bg-violet-accent/10 text-violet-accent rounded-full border border-violet-accent/20 font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-wrap items-center gap-3">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-accent hover:text-white transition-colors group"
                >
                  {item.status}
                  <svg className="w-4 h-4 text-cyan-accent/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="text-sm font-semibold text-gray-500">
                  {item.status}
                </span>
              )}
              {item.certificate && (
                <button
                  onClick={() => setPreviewCert({ src: item.certificate!, title: item.title })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 hover:bg-cyan-accent/20 transition-colors group cursor-pointer"
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