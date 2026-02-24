// src/app/projects/page.tsx

import Projects from "@/sections/Projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      {/* Optional: Add a specific header or intro just for this page */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          All Projects & Architecture
        </h1>
        <p className="text-slate-600 mt-4 text-lg max-w-2xl">
          Deep dives into my backend systems, serverless data pipelines, and security research. 
          Click on any project to see the GitHub repository or live deployment.
        </p>
      </div>

      {/* Reusing the component we already built! */}
      <Projects />
    </main>
  );
}