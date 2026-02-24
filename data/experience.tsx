// src/data/experience.ts

export interface Experience {
  role: string;
  company: string;
  location: string;
  date: string;
  type: string;
  description: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    role: "Backend Developer",
    company: "Winniio AB",
    location: "Gothenburg, Sweden (Remote)",
    date: "May 2025 - June 2025",
    type: "Internship",
    description: [
      "Developing scalable data solutions using PostgreSQL and Flask, building APIs and backend services to support AI-driven workflows and analytics.",
      "Automating deployment workflows with GitHub Actions and implementing version control strategies to streamline CI/CD and ensure reliable releases."
    ],
    techStack: ["Flask", "PostgreSQL", "GitHub Actions", "CI/CD", "APIs"],
  },
  {
    role: "Fullstack Developer",
    company: "Nexus Analytics",
    location: "Noida (Remote)",
    date: "Oct 2024 - Dec 2024",
    type: "Contract",
    description: [
      "Developed and optimized data pipelines using Python, integrating AWS (Lambda, S3, ECS, IAM) and Google Cloud Functions for scalable and automated ETL workflows.",
      "Leveraged containerization and serverless architectures (Docker, Lambda) to build cost-effective, high-performance data solutions with event-driven processing."
    ],
    techStack: ["Python", "AWS Lambda", "AWS S3", "Docker", "GCP", "ETL"],
  },
  {
    role: "Backend Developer",
    company: "Amity Innovation Incubator",
    location: "Noida",
    date: "June 2022 - July 2022",
    type: "Internship",
    description: [
      "Built and optimized ETL pipelines using Python and SQL to process web-scraped data into Amazon RDS.",
      "Designed a scalable AWS data warehousing solution with API Gateway and EventBridge for automation.",
      "Enabled timely data access and reporting through scheduled processing, generating Excel-based visual reports."
    ],
    techStack: ["Python", "SQL", "Amazon RDS", "API Gateway", "AWS EventBridge"],
  }
];