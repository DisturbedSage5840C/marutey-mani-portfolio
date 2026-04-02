import About from "@/components/About";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Leadership from "@/components/Leadership";
import Projects from "@/components/Projects";
import Research from "@/components/Research";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Experience />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <Research />
      <div className="section-divider" />
      <Leadership />
      <div className="section-divider" />
      <Awards />
      <div className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
