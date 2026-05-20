"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles, Milestone, Compass, Cpu, Telescope } from "lucide-react";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden bg-background-secondary/10">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Mission Briefing
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            About the Voyager
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left: Astronaut Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm glass rounded-3xl p-6 border border-card-border/80 shadow-2xl flex flex-col items-center text-center group">
              {/* Spinning decorative orbits */}
              <div className="absolute inset-0 rounded-3xl border border-dashed border-accent-primary/5 pointer-events-none group-hover:scale-102 transition-transform duration-500" />
              
              {/* Profile Image / Styled Placeholder */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-slate-900 border-2 border-accent-primary/30 p-1 mb-6">
                <svg className="w-full h-full text-slate-400 fill-current p-4" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                {/* Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/10 to-transparent pointer-events-none" />
              </div>

              {/* Title & Position */}
              <h3 className="font-space text-xl font-bold text-text-primary">
                A. Sharma, PhD
              </h3>
              <p className="text-xs font-semibold text-accent-primary uppercase tracking-wider mb-6">
                Astrophysical Systems Developer
              </p>

              {/* Scientific Mission Stats */}
              <div className="grid grid-cols-2 gap-4 w-full border-t border-card-border/80 pt-6">
                <div className="flex flex-col items-center">
                  <span className="font-space text-2xl font-extrabold text-accent-primary">14</span>
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">FRBs Found</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-space text-2xl font-extrabold text-accent-secondary">1.2M</span>
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Lines of Code</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-space text-2xl font-extrabold text-accent-secondary">12</span>
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Observatories</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-space text-2xl font-extrabold text-accent-primary">8</span>
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Papers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative Description */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6 text-left">
            <h3 className="font-space text-2xl font-bold text-text-primary flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent-primary animate-pulse" />
              Voyage Log: Entry #82
            </h3>
            
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              I am a computational astrophysicist, systems architect, and hardware engineer specializing in high-performance computing, signal processing, and stellar kinematics. My mission is to bridge the gap between complex science and software engineering. I develop GPU-accelerated pipelines that process massive radio telemetry streams to capture millisecond transient signals, and I construct orbital simulators that model stellar dynamics around supermassive black holes.
            </p>
            
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              By combining robust theoretical research with custom CUDA pipelines, TypeScript architectures, and game-like vector simulations, I build tools that expand our observational capabilities and translate vast scientific datasets into highly polished, meaningful, and interactive digital interfaces.
            </p>

            {/* Reusable Technology Icons shelf */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="glass p-3 rounded-2xl flex items-center gap-3 border border-card-border shadow-sm">
                <Cpu className="w-4 h-4 text-accent-primary" />
                <span className="text-xs font-bold text-text-primary tracking-wide">CUDA / GPU</span>
              </div>
              <div className="glass p-3 rounded-2xl flex items-center gap-3 border border-card-border shadow-sm">
                <Telescope className="w-4 h-4 text-accent-secondary" />
                <span className="text-xs font-bold text-text-primary tracking-wide">Signal Proc</span>
              </div>
              <div className="glass p-3 rounded-2xl flex items-center gap-3 border border-card-border shadow-sm">
                <Milestone className="w-4 h-4 text-accent-secondary" />
                <span className="text-xs font-bold text-text-primary tracking-wide">Relativity</span>
              </div>
              <div className="glass p-3 rounded-2xl flex items-center gap-3 border border-card-border shadow-sm">
                <Sparkles className="w-4 h-4 text-accent-primary" />
                <span className="text-xs font-bold text-text-primary tracking-wide">Web Design</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Twinkling star decorations */}
      <div className="absolute top-10 left-10 text-accent-primary/20 text-xl animate-pulse">✦</div>
      <div className="absolute bottom-10 right-10 text-accent-secondary/20 text-2xl animate-pulse">✦</div>
    </section>
  );
}
