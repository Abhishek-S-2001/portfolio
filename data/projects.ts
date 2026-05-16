// src/data/projects.ts

export interface ProjectDetailSection {
  title: string;
  body?: string;
  list?: string[];
  codeSnippet?: string;
  image?: string;
}

export interface ShowcaseFeature {
  label: string;
  layer: "frontend" | "backend";
  image?: string;
  description: string;
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
  showcaseFeatures?: ShowcaseFeature[];
}

export const projects: Project[] = [
  // ── PROJECT 1: FamSilo (Social Platform) ───────────────────────────────────
  {
    title: "FamSilo",
    slug: "famsilo",
    description: "A private family social network — 'Your Digital Heirloom'. Families create invite-only Silos, share posts, photos and videos, chat in real time, and stay connected through a clean Next.js 15 frontend backed by a FastAPI + Supabase stack.",
    tech: ["Next.js 15", "FastAPI", "Supabase", "PostgreSQL", "WebSocket", "Python", "Tailwind v4", "React 19"],
    highlights: [
      "Invite-only Silo group system with dedicated post walls, photo/video sharing, and Supabase Row Level Security ensuring strict per-silo data isolation.",
      "Real-time group chat powered by a native FastAPI WebSocket server — an in-memory ConnectionManager broadcasts messages to all connected silo members instantly with no third-party pub/sub dependency.",
      "Dual auth flows (email/password + Google OAuth) via Supabase Auth with JWT Bearer token verification on every API route; profiles are auto-provisioned on first sign-in via a DB trigger.",
    ],
    link: "https://famsilo-webapp.vercel.app/",
    showcaseFeatures: [
      {
        label: "Next.js 15 Frontend",
        layer: "frontend",
        description: "App Router, React 19, Tailwind v4 — a polished, invite-only login experience with Google OAuth and username-based authentication. SWR drives all data fetching for instant, reactive UI updates.",
      },
      {
        label: "Invite-Only Silo System",
        layer: "frontend",
        description: "Families create named Silos and invite members via a unique link. Each Silo has its own post wall, photo gallery, and member roster — all access-gated by Supabase RLS policies at the database row level.",
      },
      {
        label: "FastAPI Backend",
        layer: "backend",
        description: "Python 3.12 + Uvicorn + Pydantic v2. Handles all REST endpoints, async background tasks for AI agents, orchestrates the content moderation pipeline, and manages WebSocket connections.",
      },
      {
        label: "Real-Time WebSocket Chat",
        layer: "backend",
        description: "A native FastAPI WebSocket server with an in-memory ConnectionManager. All members of a Silo connect on entry; messages are broadcast to every active connection instantly — no polling, no external broker.",
      },
    ],
    contentSections: [
      {
        title: "Platform Overview",
        body: "FamSilo is a private family social network designed as a 'Digital Heirloom' — a safe, AI-moderated space for families to preserve memories, share posts, and communicate in real time. Families create invite-only Silos with dedicated walls, real-time chat, and AI-assisted engagement tools. All data access is secured at the row level via Supabase RLS, ensuring members can only see content from their own silos.",
      },
      {
        title: "System Architecture",
        body: "The platform is built on a strictly decoupled architecture across three layers:",
        list: [
          "Frontend: Next.js 15 (App Router, React 19, Tailwind v4) — SWR for data fetching, Axios for REST communication.",
          "Backend: FastAPI (Python 3.12, Uvicorn, Pydantic v2) — REST endpoints, async BackgroundTasks, and WebSocket connection management.",
          "Data Layer: Supabase-hosted PostgreSQL with pgvector for AI embeddings, two storage buckets (media & media-quarantine), and Supabase Auth with JWT-based session management.",
        ],
      },
      {
        title: "Real-Time Communication",
        body: "Silo group chats are powered by a native WebSocket server on the FastAPI backend. An in-memory ConnectionManager tracks all active connections per silo, broadcasting messages and system notifications instantly to all connected members without any third-party pub/sub dependency.",
      },
      {
        title: "Authentication & Privacy",
        body: "Authentication is handled by Supabase Auth supporting both email/password and Google OAuth flows. Profiles are automatically provisioned on first sign-in via a database trigger. All API routes are protected by JWT Bearer token verification, and Supabase Row Level Security (RLS) policies enforce that users can only read and write data belonging to silos they are members of.",
      },
      {
        title: "AI Layer",
        body: "FamSilo integrates two production AI systems built specifically for the platform — a zero-trust multimodal content moderation pipeline and a three-agent Gemini 2.5 Flash suite. These are documented as separate portfolio projects: 'Zero-Trust AI Moderation Pipeline' and 'FamSilo AI Agent Suite'.",
      },
    ],
  },

  // ── PROJECT 2: Zero-Trust AI Moderation Pipeline ────────────────────────────
  {
    title: "Zero-Trust AI Moderation Pipeline",
    slug: "famsilo-moderation",
    description: "A production-grade, multimodal content moderation system built for FamSilo. Acts as a zero-trust gatekeeper — intercepting every text, image, and video upload at the FastAPI ingestion layer and routing it through Gemini 2.5 Flash before any write to the database or public storage.",
    tech: ["Gemini 2.5 Flash", "FastAPI", "Python", "Supabase Storage", "PostgreSQL", "BackgroundTasks"],
    highlights: [
      "Zero-trust architecture: no user-generated content is implicitly trusted — synchronous text inspection inline + asynchronous multimodal scanning of images (OCR & visual classification) and videos (frame sampling & audio transcription).",
      "Hard storage boundary: content that passes moves to the public Supabase media bucket; flagged content is automatically routed to a private media-quarantine bucket unreachable by any client.",
      "PII Redaction layer: detects and redacts phone numbers, email addresses, national ID patterns, and financial data from all text payloads before persistence — minimising legal liability for accidental data leaks.",
    ],
    link: "https://famsilo-webapp.vercel.app/docs",
    showcaseFeatures: [
      {
        label: "Zero-Trust Moderation Gate",
        layer: "backend",
        description: "Every payload — text, image, or video — is intercepted at the FastAPI routing layer before any database write. The gate calls Gemini's inspection endpoint and only proceeds on a clean verdict. No content bypasses this checkpoint.",
      },
      {
        label: "Multimodal Media Scanner",
        layer: "backend",
        description: "Images are passed to Gemini's vision API for OCR and visual classification. Videos are frame-sampled at defined intervals and their audio track is transcribed — both channels inspected in a single Gemini multimodal call, running as async FastAPI BackgroundTasks.",
      },
      {
        label: "Quarantine Storage Mechanism",
        layer: "backend",
        description: "Flagged content is moved to a private Supabase bucket (media-quarantine) with no public access policy. The associated post is marked 'quarantined' in PostgreSQL and never surfaced to silo members. An admin review record is created automatically.",
      },
      {
        label: "PII Redaction Layer",
        layer: "backend",
        description: "All text payloads pass through a PII detection step before persistence. Phone numbers, email addresses, national ID patterns, and financial identifiers are detected and redacted — protecting the family data store even if an account is compromised.",
      },
    ],
    contentSections: [
      {
        title: "Design Philosophy — Zero Trust",
        body: "The pipeline was designed on a zero-trust principle: no user-generated content is implicitly safe, regardless of silo membership. Every payload must pass a Gemini-powered inspection gate before any data is written to PostgreSQL or Supabase Storage. This prevents both malicious actors and accidental sensitive data from ever entering the platform's data store.",
      },
      {
        title: "Moderation Flow",
        body: "The pipeline splits into three parallel paths by media type:",
        list: [
          "Text: inspected synchronously inline — the POST endpoint waits for Gemini's verdict before writing the post record. No async gap means no race condition between flagging and visibility.",
          "Images: downloaded from a temporary upload URL, passed to Gemini's multimodal vision API for OCR and content classification, and evaluated in a FastAPI BackgroundTask so the HTTP response is not delayed.",
          "Videos: frames are extracted at configurable intervals; the audio track is separately transcribed; both channels are sent in a single Gemini multimodal request for a unified moderation decision.",
        ],
      },
      {
        title: "Storage Routing",
        body: "The verdict from Gemini gates a hard storage branch:",
        list: [
          "PASS: media is moved to the public Supabase media bucket. The post record is written to PostgreSQL with status 'published'.",
          "FAIL: media is moved to the private media-quarantine bucket (no public access policy). The post record is written with status 'quarantined' — never returned by any silo feed query.",
          "An admin review entry is created for every quarantined item, including the moderation verdict, detected categories, and a reference to the quarantined file.",
        ],
      },
      {
        title: "PII Redaction",
        body: "All text content passes through a PII detection step before being committed to the database. The system uses Gemini to identify and redact:",
        list: [
          "Phone numbers and email addresses.",
          "National ID numbers, passport numbers, and government identifiers.",
          "Financial data — credit card numbers, bank account references.",
          "Any other personally identifiable information flagged by the model.",
        ],
      },
    ],
  },

  // ── PROJECT 3: FamSilo AI Agent Suite ──────────────────────────────────────
  {
    title: "FamSilo AI Agent Suite",
    slug: "famsilo-agents",
    description: "Three autonomous AI agents built for FamSilo using Gemini 2.5 Flash and FastAPI BackgroundTasks: a Daily Briefing narrator, a Silo Facilitator that auto-posts on dormancy detection, and an AI Concierge — a RAG chatbot with pgvector retrieval and real-time SSE token streaming.",
    tech: ["Gemini 2.5 Flash", "FastAPI", "pgvector", "RAG", "SSE", "Python", "PostgreSQL", "Supabase"],
    highlights: [
      "AI Concierge: production RAG pipeline — family posts embedded into pgvector, cosine-similarity retrieval on each query, Gemini 2.5 Flash generation, and token-by-token SSE streaming to the client.",
      "Daily Briefing: autonomous FastAPI BackgroundTask that aggregates all silo activity and prompts Gemini to write a warm, personalized family-newspaper digest, delivered once daily per user.",
      "Silo Facilitator: dormancy-detection agent that computes engagement scores per silo and auto-generates a contextual re-engagement post via Gemini when a group goes silent.",
    ],
    link: "https://famsilo-webapp.vercel.app/docs",
    showcaseFeatures: [
      {
        label: "AI Concierge — RAG + SSE",
        layer: "backend",
        description: "A retrieval-augmented chatbot powered by Gemini 2.5 Flash. Family posts and memories are embedded into pgvector; each user query triggers a cosine-similarity search for top-k relevant chunks, which are injected into the Gemini prompt. Responses stream token-by-token via SSE.",
      },
      {
        label: "pgvector Embedding Store",
        layer: "backend",
        description: "All post content is embedded using a Gemini embedding model and stored in PostgreSQL via Supabase's pgvector extension. The vector store is scoped per silo — queries only retrieve memories from the user's own family group.",
      },
      {
        label: "Daily Briefing Agent",
        layer: "backend",
        description: "A scheduled FastAPI BackgroundTask that collects all posts, reactions, and messages from the past 24 hours and prompts Gemini to narrate them as a warm family-newspaper story — stored as a Briefing record and surfaced on the user's next login.",
      },
      {
        label: "Silo Facilitator Agent",
        layer: "backend",
        description: "Monitors per-silo engagement frequency. When dormancy exceeds a configurable threshold, the agent prompts Gemini with recent silo context to generate a personalized re-engagement post, automatically attributed to 'FamSilo AI' and injected into the silo feed.",
      },
    ],
    contentSections: [
      {
        title: "Agent Architecture",
        body: "All three agents run within the FastAPI backend as either scheduled BackgroundTasks or trigger-based endpoints. They share a common Google GenAI SDK client (Gemini 2.5 Flash) and a Supabase PostgreSQL connection with pgvector for the RAG agent's vector store. No external agent framework is used — the orchestration logic is purpose-built in Python.",
      },
      {
        title: "AI Concierge — RAG Pipeline",
        body: "The AI Concierge is the most architecturally complex agent. It implements a full production RAG loop with real-time token streaming:",
        list: [
          "Ingestion: all post and message content is chunked and embedded using a Gemini embedding model. Embeddings are stored in the pgvector table, scoped to the originating silo.",
          "Retrieval: on each user query, a cosine-similarity search against the silo's pgvector namespace returns the top-k most semantically relevant memory chunks.",
          "Generation: the retrieved chunks are prepended to the Gemini prompt as grounded context, followed by the user's question.",
          "Streaming: Gemini's streaming API is consumed token-by-token inside an async generator. Each token is formatted as an SSE data frame and flushed to the client immediately.",
        ],
        codeSnippet: `# AI Concierge — SSE streaming endpoint (FastAPI)
@router.get("/concierge/stream")
async def concierge_stream(query: str, silo_id: str, user=Depends(get_current_user)):
    chunks = await retrieve_relevant_chunks(query, silo_id)   # pgvector cosine search
    context = build_context_prompt(chunks)
    async def event_generator():
        async for token in gemini_stream(context, query):
            yield f"data: {token}\\n\\n"
    return StreamingResponse(event_generator(), media_type="text/event-stream")`,
      },
      {
        title: "Daily Briefing Agent",
        body: "A scheduled autonomous agent that synthesizes all silo activity over the past 24 hours into a warm, story-style narrative — delivered as an in-app card to each silo member.",
        list: [
          "Triggered nightly as a FastAPI BackgroundTask via a scheduled job.",
          "Aggregates all posts, reactions, and messages from every silo within the 24-hour window.",
          "Prompts Gemini 2.5 Flash to narrate the day's highlights in a personal, family-newspaper tone with member name references.",
          "Output is persisted as a Briefing record in PostgreSQL and rendered on the user's home feed on next login.",
        ],
      },
      {
        title: "Silo Facilitator Agent",
        body: "An engagement intelligence agent that prevents family groups from going dark. It continuously monitors activity levels and autonomously intervenes when a silo falls dormant.",
        list: [
          "Periodically queries per-silo post frequency and member interaction rates from PostgreSQL.",
          "Computes a dormancy score based on time-since-last-post, weighted by typical silo activity patterns.",
          "When dormancy exceeds the threshold, the agent constructs a context prompt from the silo's recent topics and member names and calls Gemini to generate a relevant conversation starter.",
          "The generated post is attributed to 'FamSilo AI' and injected directly into the silo feed, attributed clearly as AI-authored.",
        ],
      },
    ],
  },

  {
    title: "Anomaly Detector",
    slug: "anomaly-detector",
    description: "A zero-trust, continuous biometric authentication system that uses Kernel Density Estimation, multi-factor risk aggregation, and adaptive sliding-window retraining to verify user identity from behavioral signatures alone.",
    tech: ["Next.js 15", "FastAPI", "Scikit-Learn", "Supabase", "Python"],
    highlights: [
      "Captures DOM keydown/keyup events with precision timestamps to compute dwell, flight, and hold times.",
      "Reduces 6D timing vectors via PCA and scores log-likelihood against a Gaussian Kernel Density Estimator.",
      "Implements an adaptive sliding-window that retrains the model asynchronously on the last 100 genuine logs to prevent classifier drift.",
    ],
    github: "https://github.com/Abhishek-S-2001/Anomaly_Detector",
    link: "https://anomaly-detector-three.vercel.app/",
    showcaseFeatures: [
      {
        label: "Next.js Live Dashboard",
        layer: "frontend",
        image: "/anomaly-dashboard.png",
        description: "Real-time authentication dashboard built with Next.js 15 and React, displaying risk scores, session history, and biometric confidence levels.",
      },
      {
        label: "System Architecture",
        layer: "backend",
        image: "/anomaly-architecture.svg",
        description: "Decoupled architecture with a Next.js frontend, FastAPI backend, and Supabase for data persistence and serialized model storage.",
      },
      {
        label: "FastAPI KDE Engine",
        layer: "backend",
        description: "Gaussian Kernel Density Estimator that scores 6D biometric vectors against a learned density surface for anomaly detection.",
      },
      {
        label: "Adaptive Retraining Pipeline",
        layer: "backend",
        image: "/anomaly-retraining.png",
        description: "Sliding-window background task that rebuilds the KDE model from the last 100 genuine logs to prevent classifier drift over time.",
      },
    ],
    contentSections: [
      {
        title: "Live Dashboard & High-Level Architecture",
        image: "/anomaly-dashboard.png",
        body: "The system features a decoupled architecture with a Next.js 15 frontend and a FastAPI backend. It captures precision timings using performance.now() and forwards them to the Python backend for machine learning analysis. Data logging and serialized model storage (.pkl files) are handled via Supabase."
      },
      {
        title: "Feature Extraction & Biometric Vectors",
        image: "/anomaly-architecture.svg",
        body: "Raw keystrokes are processed into three distinct timing intervals:",
        list: [
          "Dwell Time: Duration for which a single key is held down.",
          "Flight Time: Time between releasing one key and pressing the next.",
          "Hold Time: A parallel stream to dwell time used to capture system-level timing delay differences."
        ]
      },
      {
        title: "Dimensionality Reduction & KDE Scoring",
        body: "The arrays are reduced to a 6D statistical summary (mean and standard deviation). To prevent high-magnitude features from dominating, zero-mean unit-variance normalization is applied via StandardScaler. The vector is then projected into a 2D space using Principal Component Analysis (PCA) before being scored for log-likelihood by the Gaussian Kernel Density Estimator."
      },
      {
        title: "Risk Aggregation Engine",
        body: "Authentication decisions are not binary; they are based on a dynamic composite risk score blending behavioral, contextual, and environmental data:",
        codeSnippet: `// R(t) Composite Risk Formula
R(t) = 0.50 * B(t) + 0.30 * C(t) + 0.20 * E(t)`
      },
      {
        title: "Adaptive Sliding-Window Retraining",
        image: "/anomaly-retraining.png",
        body: "Because human typing behavior drifts naturally over time, a static model will progressively reject its own genuine user. To solve this, successful genuine logins trigger a FastAPI BackgroundTask that fetches the last 100 genuine logs and completely rebuilds the KDE pipeline, ensuring recency bias without blocking the HTTP response."
      },
      {
        title: "Cold-Start Mitigation via Synthetic Augmentation",
        body: "KDE requires many samples for accurate density boundaries. The system solves the cold-start problem using Multi-Modal Gaussian Augmentation. For each of the 5 real registration samples, it generates 40 synthetic variants applying calculated Gaussian jitter, resulting in 200+ training points to create a realistic density cloud."
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
    link: "https://abhishek-shekhawat-portfolio.vercel.app",
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