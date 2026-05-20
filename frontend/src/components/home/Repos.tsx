"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { GitHubRepo } from "src/types/portfolio";
import { Star, GitFork, Clock, ExternalLink } from "lucide-react";

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
    <section id="code" className="py-24 px-6 relative overflow-hidden bg-background-secondary/5">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Telemetry Repositories
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            Open-Source Libraries & Scientific Algorithms
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
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group glass rounded-3xl p-6 border border-card-border/80 shadow-md hover:border-accent-primary/45 hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[250px]"
            >
              {/* Header: Brand and title */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent-primary animate-pulse-slow fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                  </div>
                  
                  {/* Star count */}
                  <div className="flex items-center gap-1 glass px-2.5 py-1 rounded-full border border-card-border/60 text-[10px] font-bold text-text-secondary">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{repo.stars}</span>
                  </div>
                </div>

                <h3 className="font-space font-extrabold text-lg text-text-primary group-hover:text-accent-primary transition-colors leading-tight">
                  {repo.name}
                </h3>
                
                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  {repo.description}
                </p>
              </div>

              {/* Languages & Footer */}
              <div className="flex flex-col gap-4 mt-6">
                
                {/* Dynamic Stacked Language Distribution Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-text-secondary/70 tracking-wider">
                    <span>Codebase Composition</span>
                    <span className="text-[8px]">{repo.languages[0]?.name} Primary</span>
                  </div>
                  
                  {/* Horizontal Segmented Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800/40 overflow-hidden flex border border-card-border/40">
                    {repo.languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="h-full first:rounded-l-full last:rounded-r-full group/bar relative"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: lang.color,
                        }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>

                  {/* Segment Details Text List */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    {repo.languages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-1 text-[9px] font-extrabold uppercase text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span>{lang.name}</span>
                        <span className="text-text-secondary/50 font-normal">({lang.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer details: updated and link */}
                <div className="flex items-center justify-between border-t border-card-border/30 pt-4 text-[9px] font-bold text-text-secondary uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Updated {repo.lastUpdated}
                  </span>
                  
                  <a
                    href={repo.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass border border-card-border hover:bg-card-bg/25 text-text-primary hover:border-accent-primary/30 transition-all cursor-pointer active:scale-95"
                  >
                    View Source
                    <ExternalLink className="w-3 h-3" />
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
