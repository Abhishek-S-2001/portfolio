// src/data/projects.ts

export interface ProjectDetailSection {
  title: string;
  body?: string;
  list?: string[];
  codeSnippet?: string;
  image?: string;
}

export interface Project {
  title: string;
  slug?: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  link?: string;
  contentSections?: ProjectDetailSection[];
}

export const projects: Project[] = [
  {
    title: "Risk-Based Continuous Authentication",
    // slug: "risk-based-auth",
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
    title: "Keystroke Dynamics Biometric Authenticator",
    slug: "keystroke-dynamics-authenticator",
    description: "A real-time, behavioral biometric authentication system that verifies user identity based on typing rhythm using Kernel Density Estimation (KDE) and continuous machine learning.",
    tech: ["Next.js", "FastAPI", "Scikit-Learn", "Supabase", "Python"],
    highlights: [
      "Engineered a Zero-Trust Continuous Authentication engine using Keystroke Dynamics (Dwell, Flight, and Hold times).",
      "Implemented an Adaptive Sliding Window to continuously retrain the Scikit-Learn pipeline and adapt to human behavioral drift.",
      "Developed a Live Telemetry Dashboard rendering real-time Matplotlib charts via Base64 encoding.",
    ],
    github: "https://github.com/Abhishek-S-2001/Anomaly_Detector/tree/KDE_Authenticator_Demo",
    link: "https://kde-authenticator.vercel.app/",
    contentSections: [
      {
        title: "System Architecture & Live Dashboard",
        image: "/KDE_Dashboard.png",
        body: "This system leverages non-parametric machine learning to model unique typing rhythms and continuously adapts to human behavioral drift over time. It is built as a decoupled microservices architecture with a Next.js frontend hosted on Vercel's Edge Network, and a FastAPI backend hosted on Render. Data logging and model storage are handled via Supabase (PostgreSQL & Object Storage)."
      },
      {
        title: "Advanced Biometric Features",
        list: [
          "Zero-Trust Continuous Authentication: Analyzes keystroke timing down to the millisecond to enforce continuous identity verification rather than point-in-time checks.",
          "Cold-Start Mitigation: Uses multi-modal synthetic data generation to build a robust, secure baseline from just 5 initial registration samples by injecting realistic human micro-variations (jitter).",
          "Adaptive Sliding Window (Concept Drift): Employs asynchronous background tasks to continuously retrain the model on the user's 100 most recent genuine logins, preventing lockouts as typing habits naturally evolve."
        ]
      },
      {
        title: "Mathematical Foundation: Kernel Density Estimation",
        body: "The system utilizes Principal Component Analysis (PCA) for dimensionality reduction of highly correlated timing vectors. The reduced features are then fed into a Gaussian Kernel Density Estimator to construct a probability density function:\n\n$$\\hat{f}_h(x)=\\frac{1}{nh}\\sum_{i=1}^n K\\Big(\\frac{x-x_i}{h}\\Big)$$\n\nAuthentications are scored based on log-likelihood. Boundaries are strictly enforced at dynamic percentiles (e.g., 5th percentile) of the user's localized density clusters."
      },
      {
        title: "Local Installation & Setup",
        body: "The application is structured as a monorepo containing the decoupled frontend and backend. Here is how to initialize the environments locally:",
        codeSnippet: `# 1. Setup the Backend (FastAPI)
cd kde-backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Start the FastAPI server (Runs on port 8000)
uvicorn main:app --reload

# 2. Setup the Frontend (Next.js)
cd ../kde-authenticator
npm install

# Start the Next.js development server (Runs on port 3000)
npm run dev`
      }
    ]
  },


  {
    title: "Serverless LinkedIn Data Pipeline",
    slug: "linkedin-data-pipeline",
    description:
      "Scalable data extraction pipeline capable of scraping company metadata and post analytics, designed for high-volume automated processing.",
    tech: ["Python", "Selenium", "AWS Lambda", "Docker", "S3"],
    highlights: [
      "Containerized with Docker for consistent serverless execution.",
      "Automated storage of structured data into AWS S3.",
      "Handles anti-bot mechanisms like popups and incognito sessions.",
    ],
    github: "https://github.com/Abhishek-S-2001/selenium-linkedin-scrapper",
    contentSections: [
      {
        title: "Architecture & Features",
        body: "Designed to operate in a headless Chrome browser using incognito mode, this scraper securely extracts data without requiring login credentials. The entire workload is containerized and hosted on AWS Lambda, leveraging a serverless architecture for horizontal scalability.",
        list: [
          "Extracts granular company details: Industry, Company Size, Headquarters, Founded Year, and Specialties.",
          "Retrieves and analyzes LinkedIn post data, including text content, engagement metrics, and media types.",
          "Automated file partitioning in AWS S3 using timestamp-based naming conventions to prevent data overwrites."
        ]
      },
      {
        title: "Local Docker Build & Test",
        body: "The environment relies on Docker for portability. The image is built for the AWS Lambda linux/amd64 runtime and can be invoked locally via curl.",
        codeSnippet: `# 1. Build the Lambda runtime image
docker build --platform linux/amd64 --provenance=false -t selenium-lambda .

# 2. Run locally on port 9000
docker run --platform linux/amd64 -p 9000:8080 selenium-lambda:latest

# 3. Trigger the function invocation
curl "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'`
      },
      {
        title: "AWS Deployment Pipeline",
        body: "Deployment utilizes AWS Elastic Container Registry (ECR) to store the Docker image before attaching it to the Lambda function.",
        codeSnippet: `# 1. Authenticate Docker to AWS ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com

# 2. Tag and push the image
docker tag selenium-lambda:latest <account-id>.dkr.ecr.<region>.amazonaws.com/selenium-lambda:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/selenium-lambda:latest`
      },
      {
        title: "Live Extraction Example (HCLTech)",
        body: "The scraper successfully extracts and structures both static company metadata and dynamic post timelines. Here is a truncated example of a successful Lambda invocation output:",
        codeSnippet: `{
  "statusCode": 200,
  "body": [
    {
      "name": "HCLTech",
      "industry": "IT Services and IT Consulting",
      "location": "Noida, Uttar Pradesh",
      "followers": "8,784,875 followers",
      "total_employees": "256246",
      "company_type": "Public Company",
      "specialties": "Manufacturing, Aerospace & Defense, Financial Services, Telecom, Retail, Cloud, AI...",
      "posts": [
        {
          "Post Time": "1h",
          "Post Text": "🤖 Agentic AI is moving into production, and enterprises need more than experiments or implementation to realize value...",
          "Post Likes": "37",
          "Link": "https://www.linkedin.com/posts/hcltech..."
        },
        {
          "Post Time": "17h Edited",
          "Post Text": "🏥 What does it take to move healthcare transformation from ambition to measurable impact?...",
          "Post Likes": "103",
          "Post Comments": "2 Comments"
        }
      ]
    }
  ]
}`
      },
      {
        title: "Future Enhancements",
        list: [
          "Integrate additional data sources beyond LinkedIn for cross-platform enrichment.",
          "Implement natural language processing (NLP) for sentiment analysis on extracted post data.",
          "Automate scheduled scraping runs utilizing AWS EventBridge cron jobs."
        ]
      }
    ]
  },



  {
    title: "Developer Portfolio Architecture",
    slug: "portfolio-architecture",
    description: "A high-performance, modular portfolio designed with a 'Data-as-Content' architecture, cleanly separating UI components from business logic.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    highlights: [
      "Built with Next.js App Router and statically typed with TypeScript for robust rendering.",
      "Designed a highly scalable folder structure separating data schemas, sections, and atomic components.",
      "Fully responsive, light-themed UI deployed seamlessly via Vercel.",
    ],
    github: "https://github.com/Abhishek-S-2001/portfolio",
    link: "https://abhishek-shekhawat-portfolio.vercel.app/",
    contentSections: [
      {
        title: "System Architecture: 'Data-as-Content'",
        body: "This portfolio was engineered using a strict 'Data-as-Content' paradigm. Instead of hardcoding text into React components, all portfolio data (projects, skills, research, experience) is abstracted into static TypeScript data files. This separates business logic from presentation, allowing for instant content updates without touching the UI code."
      },
      {
        title: "Dynamic Routing & Static Site Generation (SSG)",
        body: "The project leverages the Next.js App Router to automatically generate deep-dive case study pages for individual projects. By utilizing `generateStaticParams`, Vercel pre-builds all dynamic routes into static HTML at build time, resulting in instantaneous page loads and optimal SEO.",
        codeSnippet: `// Pre-building dynamic routes at build time
export async function generateStaticParams() {
  return projects
    .filter((project) => project.slug)
    .map((project) => ({
      slug: project.slug as string,
    }));
}`
      },
      {
        title: "Advanced UI & Interactivity",
        body: "The frontend is styled entirely with utility classes using Tailwind CSS and features several complex interactive components:",
        list: [
          "Scroll Spy Navigation: A custom IntersectionObserver tracks viewport sections to dynamically update the URL hash and active navbar state.",
          "Framer Motion Animations: Smooth, hardware-accelerated entrance animations and continuous floating states for the Hero 'Digital ID Card'.",
          "Sticky Split-Pane Layout: CSS Grid is used to create a premium, desktop-optimized layout for case studies, keeping metadata sticky while content scrolls."
        ]
      },
      {
        title: "Local Development Setup",
        body: "To run this Next.js application locally:",
        codeSnippet: `# 1. Clone the repository
git clone https://github.com/Abhishek-S-2001/portfolio-repo.git
cd portfolio-repo

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev`
      }
    ]
  },


  {
    title: "Automated CI/CD Release & Versioning System",
    slug: "cicd-versioning",
    description: "A complete GitHub Actions CI/CD pipeline that automates semantic versioning, release note generation, and email notifications based on Git commit history.",
    tech: ["GitHub Actions", "CI/CD", "bump2version", "SemVer", "Git Workflow"],
    highlights: [
      "Parses commit messages (feat, fix, breaking) to calculate and apply Semantic Versioning automatically.",
      "Generates structured release notes and creates Git tags seamlessly within the CI pipeline.",
      "Triggers automated email notifications summarizing version changes and release metadata.",
    ],
    github: "https://github.com/Abhishek-S-2001/Release-Note-Automation",
    contentSections: [
      {
        title: "Architecture & Goals",
        body: "This project implements an automated Release Note Generation and Version Control System to eliminate manual version updates. It ensures consistent, structured, and traceable software releases by parsing commit messages to drive intelligent version bumps."
      },
      {
        title: "Semantic Versioning Rules",
        body: "The pipeline strictly adheres to SemVer principles (MAJOR.MINOR.PATCH). Version bumps are triggered automatically based on standard commit message conventions:",
        list: [
          "MAJOR (Breaking Changes): Triggered by 'BREAKING CHANGE:' commits (e.g., 1.0.0 → 2.0.0).",
          "MINOR (New Features): Triggered by 'feat:' commits (e.g., 1.0.0 → 1.1.0).",
          "PATCH (Bug Fixes): Triggered by 'fix:' commits (e.g., 1.0.0 → 1.0.1).",
          "IGNORED: Commits like 'chore:' or standard messages do not trigger a version bump."
        ]
      },
      {
        title: "Automated CI/CD Workflow",
        body: "Whenever changes are pushed to the main branch, the GitHub Actions pipeline orchestrates the following sequence:",
        list: [
          "Analyzes the latest commit message format.",
          "Determines the appropriate version bump via bump2version.",
          "Updates the version file and creates a new Git commit.",
          "Generates a new Git tag and structured release notes.",
          "Sends an automated email notification containing the new version, summary of changes, and release metadata."
        ]
      },
      {
        title: "Developer Synchronization",
        body: "Because the CI/CD pipeline automatically generates a new commit and tag on the remote repository, developers must synchronize their local environments after a release.",
        codeSnippet: `# Pull the automated version commit from remote
git pull origin main

# Verify the repository status
git status`
      }
    ]
  },



  {
    title: "Full-Stack Movie Review Platform",
    slug: "movie-review-platform",
    description: "A complete full-stack web application for browsing movies and submitting reviews, featuring a decoupled frontend and backend architecture.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    highlights: [
      "Engineered a decoupled architecture with a React/TypeScript frontend and a Node.js/Express REST API.",
      "Integrated MongoDB for persistent storage of structured movie data and user-generated reviews.",
      "Successfully deployed both the frontend client and backend API independently via Vercel for high availability.",
    ],
    github: "https://github.com/Abhishek-S-2001/Movie-Review-WebApp",
    contentSections: [
      {
        title: "System Overview",
        body: "A decoupled, full-stack web application designed for browsing movie catalogs and submitting user reviews. The system relies on a robust REST API backend to serve data to a dynamic, type-safe frontend interface."
      },
      {
        title: "Technology Stack",
        list: [
          "Frontend: Built with React and TypeScript for strong type safety and component modularity. Utilizes Axios for seamless HTTP requests and standard HTML/CSS for styling.",
          "Backend: Powered by Node.js and Express.js to handle API routing and middleware.",
          "Database: Integrated with MongoDB for NoSQL persistent storage of movie metadata and user-generated reviews."
        ]
      },
      {
        title: "Local Frontend Setup",
        body: "To run the React client locally, clone the repository and start the development server:",
        codeSnippet: `# 1. Clone the repository and navigate to the frontend directory
git clone https://github.com/Abhishek-S-2001/Movie-Review-WebApp.git
cd movie_review_webapp

# 2. Install dependencies
npm install

# 3. Start the development server
npm start`
      },
      {
        title: "Local Backend Setup",
        body: "To run the Express API locally, open a separate terminal and initialize the backend server:",
        codeSnippet: `# 1. Navigate to the backend directory
cd movie_review_api

# 2. Install dependencies
npm install

# 3. Start the API server
npm start`
      }
    ]
  },


];