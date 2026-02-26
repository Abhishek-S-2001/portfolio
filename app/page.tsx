import Hero from "@/components/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Research from "@/sections/Research";
import Skills from "@/sections/Skills";
import Education from "@/sections/Education";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <main className="bg-slate-50 text-slate-900 min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Hero />
      <About />
      <Experience /> {/* Moved up: Show your real-world impact immediately */}
      <Projects />   {/* Followed by what you've built */}
      <Research />   {/* Your niche/specialty */}
      {/* <Skills />     Stack summary to validate the work above */}
      <Education />  
      <Contact />
      <Footer />
    </main>
  );
}