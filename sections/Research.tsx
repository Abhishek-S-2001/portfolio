// sections/Research.tsx

"use client";

import { researchItems } from "@/data/research";
export default function Research() {
  return (
    <section
      id="research"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Research & Academic Work
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchItems.map((item) => (
          <div
            key={item.title}
            className="border border-slate-200 bg-white rounded-2xl p-6 hover:border-blue-400 transition-colors shadow-sm hover:shadow-md flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-3 text-slate-900 leading-snug">
              {item.title}
            </h3>

            <p className="text-slate-600 mb-5 text-sm leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {item.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4">
              {/* If a link exists, make it a clickable anchor tag */}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
                >
                  {item.status}
                  <svg className="w-4 h-4 text-blue-500 group-hover:text-blue-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="text-sm font-semibold text-slate-500">
                  {item.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}