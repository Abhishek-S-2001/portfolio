export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  github: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Risk-Based Continuous Authentication",
    description:
      "A Zero Trust security system that uses behavioral biometrics (keystroke dynamics) to continuously authenticate users and detect session misuse in real-time.",
    tech: ["Python", "Machine Learning", "FastAPI", "MongoDB", "React"],
    highlights: [
      "Dynamic risk scoring engine for immediate anomaly detection.",
      "Analytical dashboard to visualize user behavior trends.",
      "Prevents unattended session misuse in SSO environments.",
    ],
    github: "https://github.com/yourusername/keystroke-dynamics",
    link: "https://your-live-demo-url.com", // <-- Update if applicable
  },
  {
    title: "Serverless LinkedIn Data Pipeline",
    description:
      "Scalable data extraction pipeline capable of scraping company metadata and post analytics, designed for high-volume automated processing.",
    tech: ["Python", "Selenium", "AWS Lambda", "Docker", "S3"],
    highlights: [
      "Containerized with Docker for consistent serverless execution.",
      "Automated storage of structured data into AWS S3.",
      "Handles anti-bot mechanisms like popups and incognito sessions.",
    ],
    github: "https://github.com/yourusername/linkedin-scraper",
  },
  {
    title: "Developer Portfolio Architecture",
    description:
      "A high-performance, modular portfolio designed with a 'Data-as-Content' architecture, cleanly separating UI components from business logic.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      "Built with Next.js App Router and statically typed with TypeScript for robust rendering.",
      "Designed a highly scalable folder structure separating data schemas, sections, and atomic components.",
      "Fully responsive, dark-themed UI deployed seamlessly via Vercel.",
    ],
    github: "https://github.com/yourusername/portfolio-repo", // <-- Add your GitHub repo
    link: "https://abhishek-shekhawat-portfolio.vercel.app/", 
  },
];