"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { ResearchProject } from "src/types/portfolio";
import { Telescope, ExternalLink, X, BookOpen, Layers } from "lucide-react";

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
    <section id="research" className="py-24 px-6 bg-background-secondary/5 relative">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Scientific Exploration
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            Featured Research & Software Projects
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
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setSelectedProj(proj)}
              className="group glass rounded-3xl border border-card-border/80 shadow-lg overflow-hidden cursor-pointer hover:border-accent-primary/40 transition-all duration-300 flex flex-col h-full active:scale-[0.99]"
            >
              {/* Image & Hover Zoom */}
              <div className="h-48 overflow-hidden relative border-b border-card-border/80">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-90" />
                
                {/* Feature tag badge */}
                {proj.featured && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Text Body */}
              <div className="p-6 flex flex-col flex-1 gap-4 justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-accent-primary uppercase tracking-wider">
                    Project Entry #{index + 1}
                  </span>
                  <h3 className="font-space font-extrabold text-lg text-text-primary group-hover:text-accent-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-bold text-accent-primary uppercase animate-pulse-slow"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md bg-card-bg/30 text-[9px] font-bold text-text-secondary uppercase">
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
                initial={{ scale: 0.94, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 15 }}
                transition={{ type: "spring", damping: 28, stiffness: 380 }}
                onClick={(e) => e.stopPropagation()}
                className="glass w-full max-w-3xl rounded-3xl border border-card-border/80 shadow-2xl overflow-hidden flex flex-col relative max-h-[85vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProj(null)}
                  className="absolute right-4 top-4 z-10 p-2 rounded-full glass border border-card-border text-text-primary hover:bg-card-bg/20 cursor-pointer active:scale-95 transition-all"
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
                      Research Dossier
                    </span>
                    <h3 className="font-space font-extrabold text-lg sm:text-xl text-text-primary leading-tight">
                      {selectedProj.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Contents (Scrollable body) */}
                <div className="p-6 overflow-y-auto flex flex-col gap-5 text-left scrollbar-thin">
                  {/* General Summary */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-extrabold uppercase text-text-secondary tracking-widest flex items-center gap-1.5">
                      <Telescope className="w-3.5 h-3.5 text-accent-primary" />
                      1. Mission Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {selectedProj.longDescription}
                    </p>
                  </div>

                  {/* Methodology */}
                  {selectedProj.methodology && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[11px] font-extrabold uppercase text-text-secondary tracking-widest flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-accent-secondary" />
                        2. Analytical Methodology
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {selectedProj.methodology}
                      </p>
                    </div>
                  )}

                  {/* Challenges & Resolution */}
                  {selectedProj.challenges && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[11px] font-extrabold uppercase text-text-secondary tracking-widest flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-accent-secondary" />
                        3. Technical Obstacles & Solutions
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {selectedProj.challenges}
                      </p>
                    </div>
                  )}

                  {/* Scientific Outcomes */}
                  {selectedProj.outcomes && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[11px] font-extrabold uppercase text-text-secondary tracking-widest flex items-center gap-1.5">
                        <Telescope className="w-3.5 h-3.5 text-accent-primary" />
                        4. Astronomical Outcomes
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
                        className="px-2 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-bold text-accent-primary uppercase"
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
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full glass border border-card-border text-xs font-bold text-text-primary hover:bg-card-bg/20 transition-all cursor-pointer active:scale-95"
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
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-xs font-bold hover:shadow-lg active:scale-95 transition-all cursor-pointer"
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
