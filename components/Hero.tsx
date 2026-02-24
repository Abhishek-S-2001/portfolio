"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen pt-24 flex flex-col justify-center items-center px-6 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-60 -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ y: -8, scale: 1.01 }}
        // Changed to max-w-4xl and md:flex-row to create the Landscape layout!
        className="relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-100 transition-all rounded-3xl p-8 md:p-12 max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 group"
      >
        {/* Profile Image - Anchored to the left on desktop */}
        <div className="shrink-0 relative w-32 h-32 md:w-48 md:h-58 mx-auto md:mx-0">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <Image
            src="/profile.png" // Make sure this image is in your public folder
            alt="Abhishek Shekhawat"
            fill
            className="rounded-3xl object-cover object-[center_10%] border-4 border-white shadow-sm relative z-10"
            priority
          />
        </div>

        {/* Intro Text - Anchored to the right on desktop */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-blue-600 font-mono text-sm tracking-wide font-medium mb-2">
              SYSTEM.INITIALIZE()
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
              I'm Abhishek Shekhawat
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-slate-600 mb-5">
              Backend & Cloud Engineer <span className="hidden md:inline text-slate-300 mx-2">|</span> <br className="md:hidden" />Web Application Security
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg mb-8">
              I specialize in designing scalable APIs, serverless data pipelines, and research-driven approach.
            </p>
          </motion.div>

          {/* Social Links & CTA - Left aligned on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-5 w-full"
          >
            {/* Social Icons Container */}
            <div className="flex items-center gap-4">
              {/* GitHub */}
              <a href="https://github.com/Abhishek-S-2001" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
              
              {/* LinkedIn */}
              <a href="https://linkedin.com/in/abhishek-shekhawat" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-slate-200 shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
              </a>

              {/* LeetCode */}
              <a href="https://leetcode.com/u/AbhishekShekhawat/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-50 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors border border-slate-200 shadow-sm" title="500+ LeetCode Solved">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.665 2.665 0 0 1 .588-1.218l3.854-4.126 4.965-5.326c.545-.545.545-1.427 0-1.972A1.374 1.374 0 0 0 13.483 0zm-2.856 15.328a1.38 1.38 0 0 0-1.38 1.38c0 .763.617 1.38 1.38 1.38h7.981c.763 0 1.38-.617 1.38-1.38 0-.763-.617-1.38-1.38-1.38h-7.981z"/></svg>
              </a>
            </div>

            {/* Contact Button */}
            <Link 
              href="#contact" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 md:ml-2"
            >
              Let's Connect
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}