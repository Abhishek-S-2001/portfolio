// app/resume/page.tsx
"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { resumeSkillGroups } from "@/data/skills";
import Sidebar, { SkillsState, SectionsState } from "./components/Sidebar";
import ResumeDocument from "./components/ResumeDocument";
import AiPanel from "./components/AiPanel";

// ─── AI Types ────────────────────────────────────────────────────────────────
export interface AiKeyword {
  term: string;
  priority: "high" | "medium" | "low";
  status: "match" | "partial" | "missing";
}

export interface AiResult {
  keywords: AiKeyword[];
  rewrittenBullets: Record<string, string[]>;
  suggestedSkills: Record<string, string>;
  suggestedProjects: string[];
  summary: string;
  matchScore: number;
}

export type AiState = "idle" | "loading" | "done" | "error";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildDefaultSkills(): SkillsState {
  return Object.fromEntries(resumeSkillGroups.map((g) => [g.label, g.value]));
}

/** Snapshot of master resume data sent to the AI for analysis */
function buildResumeData(skills: SkillsState) {
  return {
    skills: Object.entries(skills).map(([label, value]) => ({ label, value })),
    experience: experiences.map((exp) => ({
      role: exp.role,
      company: exp.company,
      bullets: exp.description,
      techStack: exp.techStack,
    })),
    // Send ALL projects so AI can pick the most relevant ones
    projects: projects.map((p) => ({
      title: p.title,
      highlights: p.highlights,
      tech: p.tech,
    })),
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function ResumeBuilder() {
  // ── Existing resume controls ──
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

  // ── AI Optimizer state ──
  const [aiState, setAiState] = useState<AiState>("idle");
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [aiError, setAiError] = useState<string>("");
  const [applyRewrites, setApplyRewrites] = useState<boolean>(false);
  const [aiSuggestionsApplied, setAiSuggestionsApplied] = useState<boolean>(false);

  // ── Handlers ──
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

  const applyAiSuggestions = (result: AiResult) => {
    // Apply AI-suggested skill reordering
    if (result.suggestedSkills && Object.keys(result.suggestedSkills).length > 0) {
      setSkills((s) => ({ ...s, ...result.suggestedSkills }));
    }
    // Apply AI-recommended project selection
    if (result.suggestedProjects && result.suggestedProjects.length > 0) {
      const validTitles = new Set(projects.map((p) => p.title));
      const suggested = result.suggestedProjects.filter((t) => validTitles.has(t));
      if (suggested.length > 0) {
        setSelectedProjects(new Set(suggested));
      }
    }
    setAiSuggestionsApplied(true);
  };

  const analyzeJD = async (jdText: string, geminiKey: string) => {
    setAiState("loading");
    setAiError("");
    setApplyRewrites(false);
    try {
      const resumeData = buildResumeData(skills);
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText, resumeData, geminiKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }
      setAiResult(data as AiResult);
      setAiState("done");
      setAiSuggestionsApplied(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setAiError(message);
      setAiState("error");
    }
  };

  const visibleProjects = projects.filter((p) => selectedProjects.has(p.title));

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      <div className="flex print:block pt-24 print:pt-0">

        <Sidebar
          sections={sections}
          onToggleSection={toggleSection}
          skills={skills}
          onSkillChange={(label, value) =>
            setSkills((s) => ({ ...s, [label]: value }))
          }
          onResetSkills={() => setSkills(buildDefaultSkills())}
          selectedProjects={selectedProjects}
          onToggleProject={toggleProject}
        />

        <ResumeDocument
          skills={skills}
          sections={sections}
          visibleProjects={visibleProjects}
          isAnalyzing={aiState === "loading"}
          rewrittenBullets={aiResult?.rewrittenBullets}
          applyRewrites={applyRewrites}
        />

        <AiPanel
          aiState={aiState}
          aiResult={aiResult}
          aiError={aiError}
          applyRewrites={applyRewrites}
          aiSuggestionsApplied={aiSuggestionsApplied}
          onAnalyze={analyzeJD}
          onToggleApplyRewrites={() => setApplyRewrites((v) => !v)}
          onApplyAiSuggestions={applyAiSuggestions}
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