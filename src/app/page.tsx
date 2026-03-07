import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <MatrixRain />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="relative bg-background">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
