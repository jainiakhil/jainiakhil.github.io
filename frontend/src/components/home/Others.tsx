"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { Award, OutreachActivity } from "src/types/portfolio";
import { Award as AwardIcon, Users, Compass, Star } from "lucide-react";

export default function Others() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [outreach, setOutreach] = useState<OutreachActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOthers() {
      const [awardsData, outreachData] = await Promise.all([
        dataService.getAwards(),
        dataService.getOutreach(),
      ]);
      setAwards(awardsData);
      setOutreach(outreachData);
      setLoading(false);
    }
    fetchOthers();
  }, []);

  const observatories = [
    { name: "Palomar Observatory", location: "California, USA", year: "2022" },
    { name: "Parkes Murriyang Radio Telescope", location: "NSW, Australia", year: "2019" },
    { name: "Siding Spring Observatory", location: "Coonabarabran, Australia", year: "2017" },
    { name: "Mauna Kea Observatories", location: "Hawaii, USA", year: "2023" },
  ];

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <section id="others" className="py-24 px-6 relative overflow-hidden z-0">
      
      {/* Section Heading (Z-Sandwich: z-10) */}
      <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight">
          Adventures & Honors
        </h2>
        <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
        <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
          Some details of scientific outreach, observatory travels, and recognitions
        </p>
      </div>

      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute top-20 left-0 w-80 h-32 opacity-35 sm:opacity-45"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ x: ["120%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          className="absolute bottom-20 right-0 w-[420px] h-36 opacity-25 sm:opacity-35"
        >
          <svg className="w-full h-full text-background-secondary/20 fill-current filter blur-2xl" viewBox="0 0 400 150">
            <path d="M 50 120 C 50 90, 90 80, 110 80 C 130 50, 210 40, 250 70 C 290 50, 350 70, 350 110 C 370 110, 390 120, 390 135 C 390 150, 50 150, 50 120 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Main Interactive Content (Z-Sandwich: z-30) */}
      <div className="max-w-7xl mx-auto z-30 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Awards Shelf */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="font-display text-2xl font-semibold text-text-primary text-left flex items-center gap-2 mb-2">
              <AwardIcon className="w-6 h-6 text-accent-primary" />
              Honors & Awards
            </h3>

            <div className="flex flex-col gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                  className="dreamcard p-5 flex gap-4 items-start text-left"
                >
                  <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-accent-primary" />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">
                        {award.issuer}
                      </span>
                      <span className="text-[10px] font-semibold text-text-secondary">
                        {award.year}
                      </span>
                    </div>
                    <h4 className="font-display font-medium text-base text-text-primary leading-snug">
                      {award.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                      {award.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Outreach & Observatory Travel Log */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Sub-section: Public Outreach */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-2xl font-semibold text-text-primary text-left flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-accent-secondary" />
                Community Outreach
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {outreach.map((out, index) => (
                  <motion.div
                    key={out.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                    className="dreamcard rounded-3xl overflow-hidden flex flex-col"
                  >
                    <div className="h-32 overflow-hidden border-b border-card-border/80 relative">
                      <img src={out.imageUrl} alt={out.title} className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    </div>

                    <div className="p-4 flex flex-col gap-1 text-left flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[8px] font-bold text-text-secondary uppercase mb-1">
                          <span>{out.organisation}</span>
                          <span>{out.date}</span>
                        </div>
                        <h4 className="font-display font-medium text-sm text-text-primary leading-tight">
                          {out.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed mt-2 font-medium">
                          {out.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sub-section: Observatories Visited Map-List */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-semibold text-text-primary text-left flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent-primary" />
                Observatory Travel Log
              </h3>

              <div className="dreamcard p-5 flex flex-col gap-3.5 text-left">
                {observatories.map((obs) => (
                  <div key={obs.name} className="flex items-center justify-between border-b last:border-0 border-card-border/30 pb-2.5 last:pb-0">
                    <div className="flex items-center gap-3">
                      {/* Static warm-colored dot instead of pulsating pulse node */}
                      <span className="w-2 h-2 rounded-full bg-accent-primary/60" />
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-semibold text-text-primary leading-tight">
                          {obs.name}
                        </span>
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                          {obs.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-text-secondary">
                      {obs.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
