"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { ResearchProject } from "src/types/portfolio";
import { Telescope, ExternalLink, X, Compass, Lightbulb } from "lucide-react";

export default function Research() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProj, setSelectedProj] = useState<ResearchProject | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const data = await dataService.getProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <section id="research" className="py-24 px-6 relative z-0">
      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-10%", "110%"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute top-12 left-0 w-80 h-28 opacity-35 sm:opacity-45"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto z-30 relative">
        
        {/* Heading (Z-Sandwich: z-10) */}
        <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight">
            Research & Projects
          </h2>
          <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
            A small collection of stories, code, and cosmic phenomena I have been lucky to study
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, index) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: index * 0.25, ease: [0.25, 0.1, 0.25, 1.0] as const }}
              onClick={() => setSelectedProj(proj)}
              className="group dreamcard overflow-hidden cursor-pointer flex flex-col h-full"
            >
              {/* Image & Hover Glow (no scaling/zoom) */}
              <div className="h-48 overflow-hidden relative border-b border-card-border/80">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-95" />
              </div>

              {/* Text Body */}
              <div className="p-6 flex flex-col flex-1 gap-4 justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-medium text-lg text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-bold text-accent-primary uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="px-2.5 py-0.5 rounded-md bg-card-bg/30 text-[9px] font-bold text-text-secondary uppercase">
                      +{proj.tags.length - 3} More
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Window Detail View */}
        <AnimatePresence>
          {selectedProj && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProj(null)}
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.96, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 15 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="dreamcard w-full max-w-3xl overflow-hidden flex flex-col relative max-h-[85vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProj(null)}
                  className="absolute right-4 top-4 z-10 p-2 rounded-full dreamcard text-text-primary hover:bg-card-bg/20 cursor-pointer active:scale-95 transition-all"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image & Header */}
                <div className="h-44 sm:h-52 relative border-b border-card-border/80 flex-shrink-0">
                  <img
                    src={selectedProj.imageUrl}
                    alt={selectedProj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
                  
                  {/* Floating Title */}
                  <div className="absolute bottom-5 left-6 right-6 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">
                      Project Details
                    </span>
                    <h3 className="font-display font-semibold text-lg sm:text-xl text-text-primary leading-tight">
                      {selectedProj.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Contents (Scrollable body) */}
                <div className="p-6 overflow-y-auto flex flex-col gap-6 text-left scrollbar-thin">
                  {/* General Summary */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-1.5">
                      <Telescope className="w-4 h-4 text-accent-primary" />
                      About this project
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {selectedProj.longDescription}
                    </p>
                  </div>

                  {/* Methodology */}
                  {selectedProj.methodology && (
                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-accent-secondary" />
                        How I built it
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {selectedProj.methodology}
                      </p>
                    </div>
                  )}

                  {/* Challenges & Resolution */}
                  {selectedProj.challenges && (
                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-accent-secondary" />
                        Challenges along the way
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {selectedProj.challenges}
                      </p>
                    </div>
                  )}

                  {/* Scientific Outcomes */}
                  {selectedProj.outcomes && (
                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-1.5">
                        <Telescope className="w-4 h-4 text-accent-primary" />
                        What I discovered
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {selectedProj.outcomes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Controls & Links */}
                <div className="p-6 border-t border-card-border/80 bg-card-bg/25 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-bold text-accent-primary uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Resource Buttons */}
                  <div className="flex items-center gap-3">
                    {selectedProj.githubUrl && (
                      <a
                        href={selectedProj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full dreamcard text-xs font-semibold text-text-primary hover:bg-card-bg/20 transition-all cursor-pointer active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                        </svg>
                        Code
                      </a>
                    )}
                    {selectedProj.externalUrl && (
                      <a
                        href={selectedProj.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-primary/80 text-white text-xs font-semibold hover:bg-accent-primary hover:shadow-md transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Paper
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

