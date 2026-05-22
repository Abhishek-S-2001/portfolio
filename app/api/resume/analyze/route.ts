// app/api/resume/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { jdText, resumeData, geminiKey } = await req.json();

    if (!jdText?.trim()) {
      return NextResponse.json(
        { error: "Job description text is required." },
        { status: 400 }
      );
    }
    if (!geminiKey?.trim()) {
      return NextResponse.json(
        { error: "Gemini API key is required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiKey.trim());
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are an expert ATS (Applicant Tracking System) optimization specialist and technical resume writer.

Your task: Analyze the Job Description (JD) against the candidate's resume data and produce a comprehensive optimization report.

═══════════════════════════════════════
STRICT TRUTH-PRESERVING RULES — NEVER VIOLATE:
1. NEVER add skills, technologies, companies, dates, or metrics that do not exist in the resume data.
2. Only rephrase existing bullet points using vocabulary and phrasing from the JD.
3. Preserve all factual claims — you may only change word choice and sentence structure, not substance.
4. If a required JD skill is genuinely absent from the resume, mark it "missing" — do NOT invent evidence.
5. Rewritten bullets must remain truthful descriptions of what the candidate actually did.
6. For skills: you may only REORDER technologies already present — do NOT add new ones.
═══════════════════════════════════════

JOB DESCRIPTION:
${jdText}

CANDIDATE'S RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

═══════════════════════════════════════
OUTPUT: Return a valid JSON object with EXACTLY this schema:

{
  "keywords": [
    {
      "term": "string (the keyword or skill from JD)",
      "priority": "high" | "medium" | "low",
      "status": "match" | "partial" | "missing"
    }
  ],
  "rewrittenBullets": {
    "<exact company name from resume>": [
      "Rewritten bullet 1 using JD vocabulary",
      "Rewritten bullet 2 using JD vocabulary"
    ]
  },
  "suggestedSkills": {
    "<exact skill group label from resume>": "reordered skill string front-loading the most JD-relevant technologies"
  },
  "suggestedProjects": ["exact project title 1", "exact project title 2"],
  "summary": "1-2 sentence ATS match assessment (e.g. percentage match, key strengths and gaps)",
  "matchScore": <integer 0-100>
}

Rules for keywords array:
- Extract exactly 12-15 of the most important technical keywords and required skills from the JD
- For each keyword: "match" = clearly present in resume, "partial" = related/similar skill present, "missing" = completely absent
- Order by priority: high priority first

Rules for rewrittenBullets:
- Rewrite 2-3 bullets per company using JD-aligned vocabulary
- Keep the exact company name as the key (must match the resume data exactly)
- Each bullet must be truthful and based on the original bullet point

Rules for suggestedSkills:
- Only include skill groups where reordering improves JD alignment
- Use the EXACT group label as the key (Backend, Cloud Computing, Frontend & Data, Tools)
- Reorder so the most JD-relevant technologies appear first
- Do NOT add any technology not already present in the original skill value string

Rules for suggestedProjects:
- Select 2-4 projects from the resume data that best match the JD
- Use ONLY exact project title strings from the resume data
- Order by relevance (most relevant first)`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // With responseMimeType: "application/json", the SDK returns clean JSON
    let parsed: unknown;
    try {
      parsed = JSON.parse(responseText);
    } catch {
      // Fallback: try to extract JSON from markdown fences
      const jsonMatch =
        responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) ||
        responseText.match(/(\{[\s\S]*\})/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: "AI returned an unparseable response. Please try again." },
          { status: 500 }
        );
      }
      parsed = JSON.parse(jsonMatch[1]);
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred.";
    // Surface Gemini API errors clearly (e.g. invalid key, quota exceeded)
    const status = message.includes("API key") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
