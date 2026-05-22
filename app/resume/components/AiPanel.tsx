// app/resume/components/AiPanel.tsx
"use client";

import { useState } from "react";
import type { AiState, AiResult } from "../page";

// ─── Keyword chip component ───────────────────────────────────────────────────
function KeywordChip({
  term,
  status,
  priority,
}: {
  term: string;
  status: "match" | "partial" | "missing";
  priority: "high" | "medium" | "low";
}) {
  const chipClass = {
    match: "bg-emerald-50 border-emerald-200 text-emerald-700",
    partial: "bg-amber-50 border-amber-200 text-amber-700",
    missing: "bg-red-50 border-red-200 text-red-600",
  }[status];

  const icon = {
    match: "✓",
    partial: "≈",
    missing: "✗",
  }[status];

  const priorityDot =
    priority === "high"
      ? "bg-slate-500"
      : priority === "medium"
      ? "bg-slate-300"
      : "bg-slate-200";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${chipClass}`}
      title={`${status} · ${priority} priority`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${priorityDot}`} />
      {icon} {term}
    </span>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface AiPanelProps {
  aiState: AiState;
  aiResult: AiResult | null;
  aiError: string;
  applyRewrites: boolean;
  aiSuggestionsApplied: boolean;
  onAnalyze: (jdText: string, apiKey: string) => void;
  onToggleApplyRewrites: () => void;
  onApplyAiSuggestions: (result: AiResult) => void;
}

// ─── AI Panel ─────────────────────────────────────────────────────────────────
export default function AiPanel({
  aiState,
  aiResult,
  aiError,
  applyRewrites,
  aiSuggestionsApplied,
  onAnalyze,
  onToggleApplyRewrites,
  onApplyAiSuggestions,
}: AiPanelProps) {
  const [jdText, setJdText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const canAnalyze =
    jdText.trim().length > 50 && apiKey.trim().length > 20 && aiState !== "loading";

  const matchColor =
    (aiResult?.matchScore ?? 0) >= 75
      ? "text-emerald-600"
      : (aiResult?.matchScore ?? 0) >= 50
      ? "text-amber-600"
      : "text-red-500";

  const matchBarColor =
    (aiResult?.matchScore ?? 0) >= 75
      ? "bg-emerald-500"
      : (aiResult?.matchScore ?? 0) >= 50
      ? "bg-amber-400"
      : "bg-red-400";

  return (
    <aside className="print:hidden w-80 shrink-0 sticky top-24 h-[calc(100vh-6rem)] flex flex-col bg-white border-l border-slate-200 shadow-sm">
      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white text-sm font-black shadow-md">
            ✦
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800">AI Optimizer</h2>
            <p className="text-[10px] text-slate-400">Powered by Gemini</p>
          </div>
          {aiState === "done" && aiResult && (
            <span className={`ml-auto text-base font-black ${matchColor}`}>
              {aiResult.matchScore}%
            </span>
          )}
        </div>

        {/* Match score bar (shown after analysis) */}
        {aiState === "done" && aiResult && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${matchBarColor}`}
                style={{ width: `${aiResult.matchScore}%` }}
              />
            </div>
            <p className="text-[9px] text-slate-400 mt-1 font-semibold">
              ATS Match Score
            </p>
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* JD Textarea */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Job Description
          </label>
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={7}
            placeholder="Paste the full job description here…"
            className="w-full text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none leading-relaxed transition-colors placeholder:text-slate-300"
          />
          <p className="text-[9px] text-slate-300 mt-1 text-right">
            {jdText.trim().length} chars
            {jdText.trim().length < 50 && jdText.trim().length > 0 && (
              <span className="text-amber-400"> · need 50+</span>
            )}
          </p>
        </div>

        {/* API Key */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Gemini API Key{" "}
            <span className="text-slate-300 font-normal normal-case tracking-normal">
              · session only, never stored
            </span>
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza…"
              className="w-full text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-colors placeholder:text-slate-300"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors text-[10px] font-semibold"
            >
              {showKey ? "hide" : "show"}
            </button>
          </div>
          <p className="text-[9px] text-slate-300 mt-1">
            Get a free key at{" "}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-600 underline underline-offset-1 transition-colors"
            >
              aistudio.google.com
            </a>
          </p>
        </div>

        {/* Analyze button */}
        <button
          onClick={() => onAnalyze(jdText, apiKey)}
          disabled={!canAnalyze}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
            canAnalyze
              ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-violet-700 hover:to-blue-700 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {aiState === "loading" ? (
            <>
              <span className="ai-spinner-sm" />
              Analyzing with Gemini…
            </>
          ) : (
            <>
              <span>✦</span>
              Optimize Resume →
            </>
          )}
        </button>

        {/* Error state */}
        {aiState === "error" && aiError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3">
            <p className="text-[10px] text-red-600 font-bold mb-1">
              Analysis failed
            </p>
            <p className="text-[10px] text-red-500 leading-relaxed">{aiError}</p>
          </div>
        )}

        {/* Results */}
        {aiState === "done" && aiResult && (
          <div className="space-y-4 pt-1">
            {/* Summary */}
            <div className="rounded-xl bg-gradient-to-br from-violet-50/80 to-blue-50/80 border border-violet-100 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600 mb-1.5">
                Summary
              </p>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                {aiResult.summary}
              </p>
            </div>

            {/* Keyword chips */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Keyword Analysis ({aiResult.keywords.length} terms)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {aiResult.keywords.map((kw) => (
                  <KeywordChip
                    key={kw.term}
                    term={kw.term}
                    status={kw.status}
                    priority={kw.priority}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-2.5">
                <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
                  <span className="text-[10px]">✓</span> Match
                </span>
                <span className="flex items-center gap-1 text-[9px] text-amber-600 font-semibold">
                  <span className="text-[10px]">≈</span> Partial
                </span>
                <span className="flex items-center gap-1 text-[9px] text-red-500 font-semibold">
                  <span className="text-[10px]">✗</span> Missing
                </span>
              </div>
            </div>

            {/* ─── Apply AI Suggestions (Skills + Projects) ─── */}
            {((aiResult.suggestedSkills && Object.keys(aiResult.suggestedSkills).length > 0) ||
              (aiResult.suggestedProjects && aiResult.suggestedProjects.length > 0)) && (
              <div className="rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50/60 to-blue-50/60 p-3 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-violet-700">
                  ✦ AI Suggestions
                </p>

                {/* Suggested Skills */}
                {aiResult.suggestedSkills && Object.keys(aiResult.suggestedSkills).length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1.5">Skill reordering</p>
                    <div className="space-y-1.5">
                      {Object.entries(aiResult.suggestedSkills).map(([label, value]) => (
                        <div key={label} className="rounded-lg bg-white border border-slate-100 p-2">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
                          <p className="text-[9px] text-slate-600 leading-relaxed line-clamp-2">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Projects */}
                {aiResult.suggestedProjects && aiResult.suggestedProjects.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-slate-600 mb-1.5">Best-fit projects</p>
                    <div className="space-y-1">
                      {aiResult.suggestedProjects.map((title, i) => (
                        <div key={title} className="flex items-center gap-2 rounded-lg bg-white border border-slate-100 px-2 py-1.5">
                          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-violet-100 text-violet-600 text-[8px] font-black shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-[9px] text-slate-700 font-medium leading-snug">{title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* One-click apply button */}
                <button
                  onClick={() => onApplyAiSuggestions(aiResult)}
                  disabled={aiSuggestionsApplied}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold transition-all duration-200 ${
                    aiSuggestionsApplied
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-600 cursor-default"
                      : "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-violet-700 hover:to-blue-700 active:scale-[0.98]"
                  }`}
                >
                  {aiSuggestionsApplied ? (
                    <><span>✓</span> Skills &amp; Projects Applied</>
                  ) : (
                    <><span>✦</span> Apply to Resume →</>
                  )}
                </button>
              </div>
            )}

            {/* Apply rewrites toggle */}
            {Object.keys(aiResult.rewrittenBullets).length > 0 && (
              <div className="rounded-xl bg-white border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">
                      Apply AI Rewrites
                    </p>
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      Swaps bullets with JD-aligned language
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={applyRewrites}
                    onClick={onToggleApplyRewrites}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
                      applyRewrites ? "bg-violet-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                        applyRewrites ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                {applyRewrites && (
                  <p className="text-[9px] text-violet-600 font-semibold mt-1.5 flex items-center gap-1">
                    <span>✦</span> AI-rewritten bullets active in preview
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
