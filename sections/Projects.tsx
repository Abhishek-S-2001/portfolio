// src/sections/Projects.tsx
"use client";

import { projects } from "@/data/projects";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="border border-slate-200 bg-white rounded-2xl p-6 hover:border-blue-400 transition-colors flex flex-col shadow-sm hover:shadow-md"
          >
            <h3 className="text-xl font-semibold mb-3 text-slate-900">
              {project.title}
            </h3>

            <p className="text-slate-600 mb-5 text-sm leading-relaxed">
              {project.description}
            </p>

            <ul className="list-disc list-inside text-sm text-slate-600 mb-6 space-y-1.5">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  // Here are the light blue highlights!
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
              >
                View GitHub ↗
              </a>
              
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}