// data/certificates.ts

export type CertificateCategory =
  | "internship"
  | "presentation"
  | "simulation"
  | "course"
  | "participation";

export type CertificateOrientation = "landscape" | "portrait";

export interface Certificate {
  title: string;
  issuer: string;
  category: CertificateCategory;
  image: string;
  orientation: CertificateOrientation;
}

export const categoryLabels: Record<CertificateCategory, string> = {
  internship: "Internship",
  presentation: "Presentation",
  simulation: "Professional Simulation",
  course: "Course Completion",
  participation: "Participation",
};

export const categoryColors: Record<CertificateCategory, { bg: string; text: string; border: string }> = {
  internship:    { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  presentation:  { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/20" },
  simulation:    { bg: "bg-blue-500/10",     text: "text-blue-400",    border: "border-blue-500/20" },
  course:        { bg: "bg-violet-500/10",   text: "text-violet-400",  border: "border-violet-500/20" },
  participation: { bg: "bg-pink-500/10",     text: "text-pink-400",    border: "border-pink-500/20" },
};

export const certificates: Certificate[] = [
  // ── Row 1: Internship & Simulation (2 Landscape = 4 cols) ──
  {
    title: "Backend Developer Internship",
    issuer: "OHSL",
    category: "internship",
    image: "/certificates/ohsl.webp",
    orientation: "landscape",       // 1684×1190
  },
  {
    title: "Developer Job Simulation",
    issuer: "Accenture Nordics",
    category: "simulation",
    image: "/certificates/accenture-nordics.webp",
    orientation: "landscape",       // 1684×1190
  },

  // ── Row 2: Simulation, Presentation & Course (1 Landscape + 2 Portrait = 4 cols) ──
  {
    title: "Software Engineering Job Simulation",
    issuer: "Goldman Sachs",
    category: "simulation",
    image: "/certificates/goldman-sachs.webp",
    orientation: "landscape",       // 1684×1190
  },
  {
    title: "IEEE AIC 2026 Presentation Certificate",
    issuer: "IEEE",
    category: "presentation",
    image: "/certificates/aic-2026.webp",
    orientation: "portrait",        // 1190×1684
  },
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    category: "course",
    image: "/certificates/aws-cloud-foundations.webp",
    orientation: "portrait",        // 1224×1584
  },

  // ── Row 3: AWS Cloud Courses (2 Landscape = 4 cols) ──
  {
    title: "AWS Fundamentals — Going Cloud Native",
    issuer: "Coursera",
    category: "course",
    image: "/certificates/aws-going-cloud-native.webp",
    orientation: "landscape",       // 1584×1224
  },
  {
    title: "AWS Fundamentals — Addressing Security Risk",
    issuer: "Coursera",
    category: "course",
    image: "/certificates/aws-security-risk.webp",
    orientation: "landscape",       // 1584×1224
  },

  // ── Row 4: Blockchain & WHO (2 Portrait + 1 Landscape = 4 cols) ──
  {
    title: "Blockchain — Use Cases",
    issuer: "Blockchain Council",
    category: "course",
    image: "/certificates/blockchain-use-cases.webp",
    orientation: "portrait",        // 1190×1684
  },
  {
    title: "Introduction to Crypto and Blockchain",
    issuer: "Blockchain Council",
    category: "course",
    image: "/certificates/blockchain-intro-crypto.webp",
    orientation: "portrait",        // 1190×1684
  },
  {
    title: "Go.Data — Confirmation of Participation",
    issuer: "WHO",
    category: "participation",
    image: "/certificates/who-godata.webp",
    orientation: "landscape",       // 1798×1304
  },

  // ── Row 5: Participation & Competitions (2 Landscape = 4 cols) ──
  {
    title: "Participation Certificate",
    issuer: "En Era",
    category: "participation",
    image: "/certificates/en-era.webp",
    orientation: "landscape",       // 1684×1191
  },
  {
    title: "Participation Certificate",
    issuer: "TCS",
    category: "participation",
    image: "/certificates/tcs.webp",
    orientation: "landscape",       // 1684×1191
  },
];
