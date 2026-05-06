import Hero from "@/components/Hero";
import AmbientBackground from "@/components/AmbientBackground";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Research from "@/sections/Research";
import BentoSkills from "@/sections/BentoSkills";
import Education from "@/sections/Education";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <main className="bg-[#0a0a0a] text-gray-100 min-h-screen selection:bg-cyan-accent/30 selection:text-white relative">
      <AmbientBackground />
      <Hero />
      <About />
      <Experience />
      <Projects />  
      <Research /> 
      <BentoSkills />
      <Education />  
      <Contact />
      <Footer />
    </main>
  );
}