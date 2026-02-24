"use client";

import { educationList } from "@/data/education";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900">
        Education
      </h2>

      <div className="space-y-12 border-l border-slate-200 ml-3 md:ml-6">
        {educationList.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot - ring matches the off-white page background */}
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-slate-50" />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-slate-900">
                {edu.degree}
              </h3>
              <span className="text-sm text-blue-700 font-mono mt-1 md:mt-0 bg-blue-50 px-3 py-1 rounded-full w-fit border border-blue-100">
                {edu.date}
              </span>
            </div>

            <div className="text-md text-blue-600 mb-2 font-medium">
              {edu.institution}
            </div>

            <div className="text-sm text-slate-500 mb-4 flex gap-3">
              <span>{edu.location}</span>
              <span>•</span>
              <span>{edu.details}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}