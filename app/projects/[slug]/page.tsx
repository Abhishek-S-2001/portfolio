// src/app/projects/[slug]/page.tsx

import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  return projects
    .filter((project) => project.slug)
    .map((project) => ({
      slug: project.slug as string,
    }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24 selection:bg-blue-100 selection:text-blue-900">
      {/* Expanded to max-w-7xl to utilize screen width */}
      <div className="max-w-7xl mx-auto px-6">
        
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-10 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Portfolio
        </Link>

        {/* 12-Column CSS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: Meta & Highlights (STICKY)    */}
          {/* ========================================== */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-lg border border-blue-100 tracking-wide uppercase">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  Repository
                </a>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all border border-slate-200 shadow-sm hover:border-blue-300 flex items-center justify-center gap-2">
                    Live Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                )}
              </div>
            </div>

            {/* Key Achievements moved to the sidebar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-5">At a Glance</h2>
              <ul className="space-y-4">
                {project.highlights.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600 text-sm md:text-base">
                    <span className="text-blue-500 mt-0.5 shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: Detailed Content (SCROLLS)   */}
          {/* ========================================== */}
          <div className="lg:col-span-7 space-y-8">
            {project.contentSections?.map((section, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{section.title}</h3>
                
                {/* NEW: Render the flow diagram image if it exists */}
                {section.image && (
                  <div className="mb-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    {/* Using standard img tag so you don't have to fight Next.js sizing constraints for custom diagrams */}
                    <img src={section.image} alt={`${section.title} Diagram`} className="w-full h-auto object-cover" />
                  </div>
                )}

                {section.body && (
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {section.body}
                  </p>
                )}

                {section.list && (
                  <ul className="space-y-3 mb-6">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-lg leading-relaxed">
                        <span className="text-blue-500 mt-1.5 shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.codeSnippet && (
                  <div className="bg-slate-900 rounded-xl p-5 md:p-6 overflow-x-auto shadow-inner border border-slate-800">
                    <pre className="text-sm font-mono text-blue-300 whitespace-pre-wrap">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}