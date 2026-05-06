// sections/Projects.tsx
"use client";

import { useState, useCallback, useRef } from "react";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  const activeProject = projects[activeProjectIdx];
  const features = activeProject.showcaseFeatures;
  const activeFeature = features?.[activeFeatureIdx];

  const handleProjectChange = useCallback((idx: number) => {
    setActiveProjectIdx(idx);
    setActiveFeatureIdx(0);
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto relative z-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white section-heading">
        Projects
      </h2>
      <p className="text-gray-500 mb-10 max-w-2xl">
        Interactive showcase of my full-stack work — hover over features to see
        the frontend UI and backend architecture in action.
      </p>

      {/* Project Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {projects.map((project, idx) => (
          <button
            key={project.title}
            onClick={() => handleProjectChange(idx)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              idx === activeProjectIdx
                ? "bg-white/10 border-white/15 text-white"
                : "bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            {project.title}
          </button>
        ))}
      </div>

      {/* Split Pane: Feature List + Device Mockup */}
      {features && features.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT — Feature List */}
          <div className="lg:col-span-5 space-y-1">
            <div className="mb-4">
              <span className="text-xs font-mono text-cyan-accent uppercase tracking-widest">
                {activeProject.title}
              </span>
            </div>

            {features.map((feature, idx) => (
              <button
                key={feature.label}
                onClick={() => setActiveFeatureIdx(idx)}
                onMouseEnter={() => setActiveFeatureIdx(idx)}
                className={`feature-item w-full text-left flex items-start gap-3 ${
                  idx === activeFeatureIdx ? "feature-item--active" : ""
                } ${
                  feature.layer === "backend"
                    ? "feature-item--backend"
                    : ""
                }`}
              >
                <span
                  className={`mt-0.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    feature.layer === "frontend"
                      ? "bg-cyan-accent/10 text-cyan-accent"
                      : "bg-violet-accent/10 text-violet-accent"
                  }`}
                >
                  {feature.layer === "frontend" ? "FE" : "BE"}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-200 truncate">
                    {feature.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {feature.description}
                  </div>
                </div>
              </button>
            ))}

            {/* Action Links */}
            <div className="flex items-center gap-4 pt-6 mt-4 border-t border-white/5">
              {activeProject.slug && (
                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="text-cyan-accent hover:text-white font-semibold text-sm flex items-center gap-1.5 transition-colors"
                >
                  Deep Dive
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
                >
                  GitHub ↗
                </a>
              )}
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>

          {/* RIGHT — Device Mockup */}
          <div className="lg:col-span-7 lg:sticky lg:top-32">
            <div className="device-frame">
              <div className="device-titlebar">
                <div className="device-dot device-dot--red" />
                <div className="device-dot device-dot--yellow" />
                <div className="device-dot device-dot--green" />
                <div className="device-url-bar">
                  {activeProject.link || `localhost:3000`}
                </div>
              </div>
              <div className="device-screen">
                <AnimatePresence mode="wait">
                  {activeFeature?.image ? (
                    <motion.img
                      key={activeFeature.image}
                      src={activeFeature.image}
                      alt={activeFeature.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    <motion.div
                      key={activeFeature?.label || "fallback"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                        activeFeature?.layer === "backend"
                          ? "bg-violet-accent/10"
                          : "bg-cyan-accent/10"
                      }`}>
                        {activeFeature?.layer === "backend" ? (
                          <svg className="w-8 h-8 text-violet-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-cyan-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm font-semibold mb-2">
                        {activeFeature?.label}
                      </p>
                      <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
                        {activeFeature?.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {activeProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-3 py-1 bg-white/[0.03] text-gray-400 rounded-lg border border-white/5 font-medium font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Fallback: standard card layout for projects without showcase features */
        <ProjectCard project={activeProject} />
      )}

      {/* All Other Projects Grid (non-active) */}
      <div className="mt-20">
        <h3 className="text-xl font-bold text-white mb-6">All Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <ProjectCard project={project} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Reusable project card for grid display */
function ProjectCard({
  project,
  compact = false,
}: {
  project: (typeof projects)[number];
  compact?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 hover:border-white/15 transition-all flex flex-col ${
        compact ? "" : "md:p-8"
      }`}
    >
      <h3 className="text-lg font-semibold mb-3 text-white">
        {project.title}
      </h3>

      <p className="text-gray-500 mb-5 text-sm leading-relaxed">
        {project.description}
      </p>

      {!compact && (
        <ul className="list-none text-sm text-gray-400 mb-6 space-y-2">
          {project.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-cyan-accent mt-0.5 shrink-0">▸</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 mb-5 mt-auto">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2.5 py-1 bg-white/[0.03] text-gray-500 rounded-lg border border-white/5 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-white/5 pt-4">
        {project.slug && (
          <Link
            href={`/projects/${project.slug}`}
            className="text-cyan-accent hover:text-white font-semibold text-sm flex items-center gap-1.5 transition-colors"
          >
            Deep Dive
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
          >
            GitHub ↗
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}