// sections/Certifications.tsx
"use client";

import { useState } from "react";
import { certificates, categoryLabels, categoryColors } from "@/data/certificates";
import CertificateModal from "@/components/CertificateModal";

export default function Certifications() {
  const [previewCert, setPreviewCert] = useState<{ src: string; title: string } | null>(null);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  return (
    <section
      id="certifications"
      className="px-6 py-24 max-w-7xl mx-auto flex flex-col relative z-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white section-heading">
            Certifications &amp; Achievements
          </h2>
          <p className="text-gray-500 text-base max-w-2xl">
            Professional simulations, cloud certifications, and participation credentials that complement my hands-on experience.
          </p>
        </div>

        {/* 3 or 4 in a row toggle */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-white/[0.03] p-1 rounded-xl border border-white/[0.08]">
          <button
            onClick={() => setGridCols(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              gridCols === 3
                ? "bg-white/15 text-white border border-white/10 shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
            title="Show 3 certificates in a row"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="2" width="4" height="12" rx="1" />
              <rect x="6" y="2" width="4" height="12" rx="1" />
              <rect x="11" y="2" width="4" height="12" rx="1" />
            </svg>
            3 in a row
          </button>
          <button
            onClick={() => setGridCols(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              gridCols === 4
                ? "bg-white/15 text-white border border-white/10 shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
            title="Show 4 certificates in a row"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="2" width="3" height="12" rx="0.75" />
              <rect x="4.75" y="2" width="3" height="12" rx="0.75" />
              <rect x="8.5" y="2" width="3" height="12" rx="0.75" />
              <rect x="12.25" y="2" width="3" height="12" rx="0.75" />
            </svg>
            4 in a row
          </button>
        </div>
      </div>

      {/* Certificate Image Grid */}
      <div
        className={`grid gap-4 md:gap-5 ${
          gridCols === 4
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        }`}
      >
        {certificates.map((cert) => {
          const colors = categoryColors[cert.category];
          const isPortrait = cert.orientation === "portrait";

          return (
            <button
              key={`${cert.issuer}-${cert.title}`}
              onClick={() =>
                setPreviewCert({
                  src: cert.image,
                  title: `${cert.issuer} — ${cert.title}`,
                })
              }
              className="cert-grid-card group relative aspect-[4/3] w-full text-left cursor-pointer focus:outline-none"
            >
              {/* Certificate Image Display */}
              <div className="w-full h-full flex items-center justify-center p-2.5 overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${cert.issuer} — ${cert.title}`}
                  className={`transition-transform duration-300 group-hover:scale-105 ${
                    isPortrait
                      ? "h-full w-auto object-contain rounded shadow-md"
                      : "w-full h-full object-cover rounded-lg"
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Hover overlay with high-contrast glassmorphism */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#06060a]/92 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="flex flex-col items-center gap-1.5 text-center px-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
                  {/* Category badge */}
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                  >
                    {categoryLabels[cert.category]}
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-white leading-snug line-clamp-2 mt-0.5">
                    {cert.title}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono">{cert.issuer}</p>
                  {/* View icon */}
                  <div className="mt-1 w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-4 h-4 text-cyan-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
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
