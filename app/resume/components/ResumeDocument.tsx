// app/resume/components/ResumeDocument.tsx
"use client";

import { experiences } from "@/data/experience";
import { researchItems } from "@/data/research";
import { educationList } from "@/data/education";
import { resumeSkillGroups } from "@/data/skills";
import { codingProfiles } from "@/data/codingProfiles";
import { Project } from "@/data/projects";
import { SkillsState, SectionsState } from "./Sidebar";

// ─── Shared section heading ────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[8.5pt] font-extrabold uppercase tracking-[0.12em] border-b border-slate-300 mb-2.5 pb-0.5 text-slate-800">
      {children}
    </h2>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function ResumeHeader() {
  return (
    <header className="border-b-2 border-slate-900 pb-3 mb-4">
      <h1 className="text-[26pt] font-extrabold tracking-tight leading-none mb-2 uppercase">
        Abhishek Shekhawat
      </h1>
      <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-[8pt] font-medium text-slate-600">

        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          abhishek.shekhawat.1920@gmail.com
        </span>

        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          +91 8826869135
        </span>

        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Noida, India
        </span>

        <a href="https://github.com/Abhishek-S-2001" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <svg className="w-3 h-3 shrink-0 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          github.com/Abhishek-S-2001
        </a>

        <a href="https://linkedin.com/in/abhishek-shekhawat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <svg className="w-3 h-3 shrink-0 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
          linkedin.com/in/abhishek-shekhawat
        </a>

        <a href="https://abhishek-shekhawat-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <svg className="w-3 h-3 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          abhishek-shekhawat-portfolio.vercel.app
        </a>

      </div>
    </header>
  );
}

// ─── TECHNICAL SKILLS ─────────────────────────────────────────────────────────
function SkillsSection({ skills }: { skills: SkillsState }) {
  return (
    <section className="mb-4">
      <SectionHeading>Technical Skills</SectionHeading>
      <div className="text-[8.5pt] space-y-1 leading-relaxed">
        {resumeSkillGroups.map((group) => (
          <p key={group.label}>
            <span className="font-bold">{group.label}:</span>{" "}
            <span className="text-slate-700">{skills[group.label]}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section className="mb-4">
      <SectionHeading>Professional Experience</SectionHeading>
      <div className="space-y-3.5">
        {experiences.map((exp, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[9pt] font-bold">
                {exp.role} <span className="font-semibold text-slate-600">| {exp.company}</span>
              </h3>
              <span className="text-[7.5pt] font-bold uppercase tracking-wide text-slate-600 shrink-0 ml-2">{exp.date}</span>
            </div>
            <p className="text-[7.5pt] text-slate-500 font-semibold italic mb-1">
              {exp.location} · {exp.type}
            </p>
            <ul className="list-disc list-outside ml-4 space-y-0.5">
              {exp.description.map((desc, di) => (
                <li key={di} className="text-[8.5pt] leading-snug pl-0.5 text-slate-700">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectsSection({ visibleProjects }: { visibleProjects: Project[] }) {
  return (
    <section className="mb-4">
      <SectionHeading>Key Engineering Projects</SectionHeading>
      <div className="space-y-3.5">
        {visibleProjects.map((project) => (
          <div key={project.title}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[9pt] font-bold">{project.title}</h3>
              <span className="text-[7.5pt] font-bold text-blue-700 shrink-0 ml-2">
                {project.link
                  ? project.link.replace("https://", "")
                  : project.github
                    ? project.github.replace("https://github.com/", "github.com/")
                    : "GitHub Repository"}
              </span>
            </div>
            <p className="text-[7.5pt] font-semibold text-slate-500 italic mb-1">
              Stack: {project.tech.join(", ")}
            </p>
            <ul className="list-disc list-outside ml-4 space-y-0.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="text-[8.5pt] leading-snug pl-0.5 text-slate-700">{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── RESEARCH ─────────────────────────────────────────────────────────────────
function ResearchSection() {
  return (
    <section className="mb-4">
      <SectionHeading>Research &amp; Publications</SectionHeading>
      <div className="space-y-2.5">
        {researchItems.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[9pt] font-bold leading-snug pr-2">{item.title}</h3>
              <span className="text-[7.5pt] font-bold uppercase tracking-wide text-slate-600 shrink-0">
                {item.status.includes("Published") ? "IEEE Xplore, 2025" : "Active Research"}
              </span>
            </div>
            <p className="text-[8.5pt] text-slate-700 leading-snug mt-0.5 mb-0.5">{item.description}</p>
            <p className="text-[7.5pt] font-semibold text-slate-500 italic">
              Keywords: {item.topics.join(", ")}
            </p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[7.5pt] font-semibold text-blue-600 underline underline-offset-1 hover:text-blue-800 transition-colors"
              >
                {item.link.replace("https://", "")}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CODING PROFILES ──────────────────────────────────────────────────────────
function CodingProfilesSection() {
  return (
    <section className="mb-4">
      <SectionHeading>Competitive Programming &amp; Coding Profiles</SectionHeading>
      <div className="flex gap-10">
        {codingProfiles.map((cp) => (
          <div key={cp.platform} className="flex items-center gap-3">
            <img src={cp.icon} alt={cp.platform} className="w-5 h-5" />
            <div>
              <p className="text-[9pt] font-bold text-slate-900">
                {cp.platform} <span className="font-semibold text-slate-600">— {cp.stat} {cp.label}</span>
              </p>
              <p className="text-[7.5pt] text-slate-500">{cp.url.replace("https://", "")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function EducationSection() {
  return (
    <section className="mb-4">
      <SectionHeading>Education</SectionHeading>
      <div className="space-y-3">
        {educationList.map((edu, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-[9pt] font-bold">{edu.degree}</h3>
              <span className="text-[7.5pt] font-bold uppercase tracking-wide text-slate-600 shrink-0 ml-2">{edu.date}</span>
            </div>
            <p className="text-[8.5pt] font-semibold text-slate-700">
              {edu.institution} <span className="font-normal text-slate-500">— {edu.location}</span>
            </p>
            <p className="text-[7.5pt] text-slate-500 italic">{edu.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── MAIN DOCUMENT ────────────────────────────────────────────────────────────
interface ResumeDocumentProps {
  skills: SkillsState;
  sections: SectionsState;
  visibleProjects: Project[];
}

export default function ResumeDocument({ skills, sections, visibleProjects }: ResumeDocumentProps) {
  return (
    <main className="flex-1 py-8 px-4 print:py-0 print:px-0 flex justify-center items-start">
      <div
        id="resume-document"
        className="w-[210mm] bg-white shadow-xl print:shadow-none text-slate-900"
        style={{ padding: "12mm 15mm" }}
      >
        <ResumeHeader />
        <SkillsSection skills={skills} />
        {sections.experience && <ExperienceSection />}
        {sections.projects && visibleProjects.length > 0 && <ProjectsSection visibleProjects={visibleProjects} />}
        {sections.research && <ResearchSection />}
        {sections.coding && <CodingProfilesSection />}
        {sections.education && <EducationSection />}
      </div>
    </main>
  );
}
