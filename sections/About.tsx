"use client";

import SectionWrapper from "@/components/SectionWrapper";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen px-6 py-24 max-w-5xl mx-auto flex flex-col justify-center relative z-10"
    >
      <SectionWrapper>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white section-heading">
          About Me
        </h2>

        <div className="glass-card rounded-2xl p-8 md:p-10">
          <div className="text-gray-400 text-lg leading-relaxed space-y-6">
            <p>
              I&apos;m Abhishek Shekhawat, a Computer Science postgraduate based in
              <span className="text-white font-semibold"> Noida, Uttar Pradesh</span>.
              I have a strong foundation in programming, backend development,
              and system design, with a focus on building scalable and efficient applications.
            </p>

            <p>
              I enjoy solving complex problems through clean, maintainable code.
              My experience includes designing REST APIs, working with databases,
              building full-stack applications, and developing intelligent systems.
              I&apos;m comfortable working across the stack, but my core strength lies in
              backend logic and architecture.
            </p>

            <p>
              Beyond development, I have a strong interest in cloud computing,
              modern authentication systems, and performance-oriented design.
              I continuously refine my skills through hands-on projects,
              research work, and solving data structure and algorithm challenges.
            </p>

            <p>
              I am driven by curiosity and the desire to build systems that are
              reliable, secure, and production-ready — not just functional.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}