import Navbar from "src/components/layout/Navbar";
import Starfield from "src/components/environment/Starfield";
import Atmosphere from "src/components/environment/Atmosphere";
import ScrollMoon from "src/components/environment/ScrollMoon";
import Hero from "src/components/home/Hero";
import About from "src/components/home/About";
import Timeline from "src/components/home/Timeline";
import Research from "src/components/home/Research";
import Publications from "src/components/home/Publications";
import Repos from "src/components/home/Repos";
import Others from "src/components/home/Others";
import Contact from "src/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative w-full bg-background transition-colors duration-1000">
      {/* 1. Environment Layer (Celestial Backgrounds) */}
      <Starfield />
      <Atmosphere />
      <ScrollMoon />

      {/* 2. Layout Navigation */}
      <Navbar />

      {/* 3. Main Content Sections — generous spacing so each section breathes */}
      <main className="flex-1 w-full relative z-10 space-y-8">
        <Hero />
        <About />
        <Timeline />
        <Research />
        <Publications />
        <Repos />
        <Others />
        <Contact />
      </main>

      {/* 4. Soft, warm footer */}
      <footer className="w-full relative z-10 py-14 px-6 dreamcard text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
          <span className="font-display text-lg font-semibold text-text-primary">
            Akhil Jaini
          </span>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-md">
            A quiet corner of the web — sharing stardust, code, and curiosity.
          </p>
          <p className="text-[10px] text-text-secondary/60 mt-2">
            © {new Date().getFullYear()} Akhil Jaini
          </p>
        </div>
      </footer>
    </div>
  );
}
