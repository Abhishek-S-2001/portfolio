// src/data/skills.ts

export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Backend Development",
    items: ["Python", "Flask", "FastAPI", "REST APIs", "Microservices"],
  },
  {
    category: "Frontend Development",
    items: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, S3, IAM, RDS)", "Docker", "GitHub Actions"],
  },
  {
    category: "Security & Identity",
    items: ["SSO", "OAuth 2.0", "OIDC", "SAML", "Passkeys", "Zero Trust"],
  },
  {
    category: "AI & Data",
    items: ["LangChain", "AutoGen", "Behavioral Biometrics", "ML Basics"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "SQL", "MongoDB (NoSQL)"],
  },
];