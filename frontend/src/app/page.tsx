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
import { Orbit } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative w-full bg-background transition-colors duration-1000">
      {/* 1. Environment Layer (Celestial Backgrounds) */}
      <Starfield />
      <Atmosphere />
      <ScrollMoon />

      {/* 2. Layout Navigation */}
      <Navbar />

      {/* 3. Main Content Sections */}
      <main className="flex-1 w-full relative z-10">
        <Hero />
        <About />
        <Timeline />
        <Research />
        <Publications />
        <Repos />
        <Others />
        <Contact />
      </main>

      {/* 4. Elegant Footer */}
      <footer className="w-full relative z-10 border-t border-card-border/60 py-10 px-6 glass text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          
          {/* Logo & description */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                <Orbit className="w-4 h-4 text-accent-primary animate-spin-slow" />
              </div>
              <span className="font-space font-extrabold text-sm tracking-widest bg-gradient-to-r from-text-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
                COSMOS.VOYAGER
              </span>
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-text-secondary leading-relaxed max-w-sm">
              An immersive digital portal showcasing astrophysical telemetry, CUDA parallel programming, and web mechanics. Designed with care.
            </p>
          </div>

          {/* System status / telemetry values */}
          <div className="flex flex-col md:items-end gap-1.5 text-left md:text-right">
            <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </div>
            <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest">
              © {new Date().getFullYear()} Cosmos Voyager. Built under MIT License.
            </p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
