export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
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
    // github: "https://github.com/yourusername/keystroke-dynamics",
    // link: "https://your-live-demo-url.com",
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
    github: "https://github.com/Abhishek-S-2001/selenium-linkedin-scrapper",
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
    github: "https://github.com/Abhishek-S-2001/portfolio",
    link: "https://abhishek-shekhawat-portfolio.vercel.app/", 
  },

  {
    title: "Automated CI/CD Release & Versioning System",
    description:
      "A complete GitHub Actions CI/CD pipeline that automates semantic versioning, release note generation, and email notifications based on Git commit history.",
    tech: ["Python", "GitHub Actions", "CI/CD", "bump2version", "SemVer", "Git Workflow"],
    highlights: [
      "Parses commit messages (feat, fix, breaking) to calculate and apply Semantic Versioning automatically.",
      "Generates structured release notes and creates Git tags seamlessly within the CI pipeline.",
      "Triggers automated email notifications summarizing version changes and release metadata.",
    ],
    github: "https://github.com/Abhishek-S-2001/Release-Note-Automation",
  },

  {
    title: "Full-Stack Movie Review Platform",
    description:
      "A complete full-stack web application for browsing movies and submitting reviews, featuring a decoupled frontend and backend architecture.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Engineered a decoupled architecture with a React/TypeScript frontend and a Node.js/Express REST API.",
      "Integrated MongoDB for persistent storage of structured movie data and user-generated reviews.",
      "Successfully deployed both the frontend client and backend API independently via Vercel for high availability.",
    ],
    github: "https://github.com/Abhishek-S-2001/Movie-Review-WebApp", // <-- Update if repo name differs
    // link: "https://movie-review-webapp.vercel.app/", 
  },
];