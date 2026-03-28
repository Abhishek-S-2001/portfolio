// app/resume/page.tsx
"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { resumeSkillGroups } from "@/data/skills";
import Sidebar, { SkillsState, SectionsState } from "./components/Sidebar";
import ResumeDocument from "./components/ResumeDocument";

function buildDefaultSkills(): SkillsState {
  return Object.fromEntries(resumeSkillGroups.map((g) => [g.label, g.value]));
}

export default function ResumeBuilder() {
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(
    new Set(projects.slice(0, 3).map((p) => p.title))
  );
  const [skills, setSkills] = useState<SkillsState>(buildDefaultSkills);
  const [sections, setSections] = useState<SectionsState>({
    experience: true,
    projects: true,
    research: true,
    coding: true,
    education: true,
  });

  const toggleProject = (title: string) => {
    setSelectedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const toggleSection = (key: keyof SectionsState) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleProjects = projects.filter((p) => selectedProjects.has(p.title));

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      <div className="flex print:block pt-24 print:pt-0">

        <Sidebar
          sections={sections}
          onToggleSection={toggleSection}
          skills={skills}
          onSkillChange={(label, value) => setSkills((s) => ({ ...s, [label]: value }))}
          onResetSkills={() => setSkills(buildDefaultSkills())}
          selectedProjects={selectedProjects}
          onToggleProject={toggleProject}
        />

        <ResumeDocument
          skills={skills}
          sections={sections}
          visibleProjects={visibleProjects}
        />

      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}