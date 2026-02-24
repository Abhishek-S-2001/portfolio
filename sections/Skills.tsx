"use client";

import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 py-24 max-w-7xl mx-auto flex flex-col justify-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">
        Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill) => (
          <div
            key={skill.category}
            className="border border-slate-200 bg-white rounded-2xl p-6 hover:border-blue-400 transition-colors shadow-sm hover:shadow-md"
          >
            <h3 className="text-xl font-semibold mb-5 text-slate-900">
              {skill.category}
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {/* Added a safety check to ensure item is an array before mapping */}
              {Array.isArray(skill.items) && skill.items.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}