import Hero from "@/components/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Research from "@/sections/Research";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import Experience from "@/sections/Experience";
import Education from "@/sections/Education";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Research />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
