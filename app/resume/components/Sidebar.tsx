// app/resume/components/Sidebar.tsx
"use client";

import { projects } from "@/data/projects";
import { resumeSkillGroups, ResumeSkillGroup } from "@/data/skills";

export type SkillsState = Record<string, string>;
export type SectionsState = {
  experience: boolean;
  projects: boolean;
  research: boolean;
  coding: boolean;
  education: boolean;
};

const SECTION_LABELS: Record<keyof SectionsState, string> = {
  experience: "Experience",
  projects: "Projects",
  research: "Research",
  coding: "Coding Profiles",
  education: "Education",
};

interface SidebarProps {
  sections: SectionsState;
  onToggleSection: (key: keyof SectionsState) => void;
  skills: SkillsState;
  onSkillChange: (label: string, value: string) => void;
  onResetSkills: () => void;
  selectedProjects: Set<string>;
  onToggleProject: (title: string) => void;
}

export default function Sidebar({
  sections,
  onToggleSection,
  skills,
  onSkillChange,
  onResetSkills,
  selectedProjects,
  onToggleProject,
}: SidebarProps) {
  return (
    <aside className="print:hidden w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)] flex flex-col bg-white border-r border-slate-200 shadow-sm">

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">

        {/* Heading */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Resume Controls</h2>
          <p className="text-[11px] text-slate-400">Changes reflect live in the preview →</p>
        </div>

        {/* ── Section Toggles ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Sections
          </h3>
          <div className="space-y-1">
            {(Object.keys(sections) as (keyof SectionsState)[]).map((key) => (
              <label key={key} className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-sm font-medium text-slate-700">{SECTION_LABELS[key]}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={sections[key]}
                  onClick={() => onToggleSection(key)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${sections[key] ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${sections[key] ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* ── Editable Skills ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Technical Skills
          </h3>
          <div className="space-y-3">
            {resumeSkillGroups.map((group: ResumeSkillGroup) => (
              <div key={group.label}>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                  {group.label}
                </label>
                <textarea
                  value={skills[group.label] ?? ""}
                  onChange={(e) => onSkillChange(group.label, e.target.value)}
                  rows={3}
                  className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-relaxed transition-colors"
                />
              </div>
            ))}
            <button
              onClick={onResetSkills}
              className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              ↺ Reset to defaults
            </button>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        {/* ── Project Selector ── */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Projects
          </h3>
          <p className="text-[10px] text-slate-400 mb-2">Select which to include</p>
          <div className="space-y-1.5">
            {projects.map((project) => {
              const checked = selectedProjects.has(project.title);
              return (
                <label
                  key={project.title}
                  className={`flex items-start gap-2.5 cursor-pointer p-2 rounded-lg border transition-all ${
                    checked ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleProject(project.title)}
                    className="mt-0.5 h-3.5 w-3.5 rounded accent-blue-600 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className={`text-[11px] font-semibold leading-snug ${checked ? "text-blue-800" : "text-slate-700"}`}>
                      {project.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {project.tech.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5 text-right">{selectedProjects.size} selected</p>
        </div>

      </div>

      {/* Sticky Save as PDF */}
      <div className="shrink-0 p-4 border-t border-slate-200 bg-white">
        <button
          onClick={() => window.print()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Save as PDF
        </button>
      </div>
    </aside>
  );
}
