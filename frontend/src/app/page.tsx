import Navbar from "src/components/layout/Navbar";
import Starfield from "src/components/environment/Starfield";
import Atmosphere from "src/components/environment/Atmosphere";
import ScrollMoon from "src/components/environment/ScrollMoon";
import ForegroundGrass from "src/components/environment/ForegroundGrass";
import BlackCatPopUp from "src/components/ui/BlackCatPopUp";
import AnimationToggle from "src/components/ui/AnimationToggle";
import Hero from "src/components/home/Hero";
import About from "src/components/home/About";
import Timeline from "src/components/home/Timeline";
import Research from "src/components/home/Research";
import Projects from "src/components/home/Projects";
import Publications from "src/components/home/Publications";
import Repos from "src/components/home/Repos";
import Awards from "src/components/home/Awards";
import Outreach from "src/components/home/Outreach";
import TalksVisits from "src/components/home/TalksVisits";
import Contact from "src/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative w-full bg-background transition-colors duration-1000">
      {/* 1. Environment Layer (Celestial Backgrounds) */}
      <Starfield />
      <Atmosphere />
      <ScrollMoon />
      <ForegroundGrass />
      <BlackCatPopUp />
      <AnimationToggle />

      {/* 2. Layout Navigation */}
      <Navbar />

      {/* 3. Main Content Sections — generous spacing so each section breathes */}
      <main className="flex-1 w-full relative z-10 space-y-8">
        <Hero />
        <About />
        <Timeline />
        <Research />
        <Projects />
        <Publications />
        <Repos />
        <Awards />
        <Outreach />
        <TalksVisits />
        <Contact />
      </main>

      {/* 4. Soft, warm footer with extra bottom padding to clear the foreground grasslands */}
      <footer className="w-full relative z-10 pt-14 pb-36 px-6 dreamcard text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
          <span className="font-display text-lg font-semibold text-text-primary">
            Akhil Jaini
          </span>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-md">
            A quiet corner of the web — sharing stardust, code, and curiosity.
          </p>
          <div className="flex items-center gap-2 text-[10.5px] font-medium text-text-secondary/60 mt-4 select-none">
            <span>Website designed by</span>
            <a
              href="https://buckleupgenius.pages.dev/"
              target="_blank"
              rel="noreferrer"
              className="inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <img
                src="/logoFinalWhite.png"
                alt="BuckleUpGenius Logo"
                className="h-10 w-auto object-contain brightness-95 hover:brightness-100 dark:invert-0 invert transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
