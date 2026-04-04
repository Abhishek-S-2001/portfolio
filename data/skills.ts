// src/data/skills.ts

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Backend Development",
    items: ["Python", "Flask", "FastAPI", "System Design (HLD/LLD)", "REST APIs", "Microservices"],
  },
  {
    category: "Frontend Development",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, S3, IAM, RDS)", "Kubernetes", "EKS", "Docker", "GitHub Actions"],
  },
  {
    category: "Security & Identity",
    items: ["SSO", "OAuth 2.0", "OIDC", "SAML", "Passkeys", "Zero Trust"],
  },
  {
    category: "AI & Data",
    items: ["LangChain", "RAG", "AutoGen", "Behavioral Biometrics", "ML Basics"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "SQL", "MongoDB (NoSQL)"],
  },
];

// ── Resume-specific grouped skill lines ──────────────────────────────────────
// These are the editable one-liner skill groups used in the resume PDF builder.
// They intentionally use a different grouping than the Hero skill cards above.

export interface ResumeSkillGroup {
  label: string;
  value: string;
}

export const resumeSkillGroups: ResumeSkillGroup[] = [
  {
    label: "Backend",
    value: "Python, Node.js, System Design (HLD/LLD), FastAPI, Flask, GitHub Actions, CI/CD",
  },
  {
    label: "Cloud Computing",
    value: "EC2, VPC, IAM, AWS Lambda, S3, AWS ECS, Kubernetes, EKS",
  },
  {
    label: "Frontend & Data",
    value: "React, Next.js, TypeScript, PostgreSQL, MongoDB, SQL, LangChain, RAG",
  },
  {
    label: "Tools",
    value: "Git, GitHub, Docker, Postman, VS Code, Vercel, Render, Docker",
  },
];