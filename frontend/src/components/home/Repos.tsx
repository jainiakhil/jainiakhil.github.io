"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { GitHubRepo } from "src/types/portfolio";
import { Star, Clock, ExternalLink } from "lucide-react";

export default function Repos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      const data = await dataService.getGitHubRepos();
      setRepos(data);
      setLoading(false);
    }
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <section id="code" className="py-24 px-6 relative overflow-hidden z-0">
      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["110%", "-10%"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute top-12 right-0 w-80 h-28 opacity-35 sm:opacity-45"
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
            Open Source & Code
          </h2>
          <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
            Simulators, data libraries, and tools I have built and shared with the universe
          </p>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1.0] as const }}
              className="group dreamcard p-6 flex flex-col justify-between min-h-[250px]"
            >
              {/* Header: Brand and title */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-slate-900/10 border border-card-border/40 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent-primary fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                  </div>
                  
                  {/* Star count */}
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-text-secondary">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{repo.stars} stars</span>
                  </div>
                </div>

                <h3 className="font-display font-medium text-lg text-text-primary group-hover:text-accent-primary transition-colors duration-300 leading-tight">
                  {repo.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                  {repo.description}
                </p>
              </div>

              {/* Languages & Footer */}
              <div className="flex flex-col gap-4 mt-6">
                
                {/* Cozy Language bullet list */}
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {repo.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-secondary tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span>{lang.name}</span>
                      <span className="text-text-secondary/50 font-normal">({lang.percentage}%)</span>
                    </div>
                  ))}
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between border-t border-card-border/30 pt-4 text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    Updated {repo.lastUpdated}
                  </span>
                  
                  <a
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full dreamcard text-text-primary hover:border-accent-primary/20 hover:text-accent-primary transition-all cursor-pointer border border-card-border"
                  >
                    View Source
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
