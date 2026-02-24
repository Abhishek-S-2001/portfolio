"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900">
        Experience
      </h2>

      <div className="space-y-12 border-l border-slate-200 ml-3 md:ml-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-slate-50" />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-slate-900">
                {exp.role} <span className="text-blue-600">@ {exp.company}</span>
              </h3>
              <span className="text-sm text-blue-700 font-mono mt-1 md:mt-0 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit">
                {exp.date}
              </span>
            </div>

            <div className="text-sm text-slate-500 mb-4 font-medium flex gap-3">
              <span>{exp.type}</span>
              <span>•</span>
              <span>{exp.location}</span>
            </div>

            <ul className="list-disc list-outside ml-4 text-slate-600 space-y-2 mb-6 text-sm leading-relaxed">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}