"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { Award, OutreachActivity } from "src/types/portfolio";
import { Award as AwardIcon, Users, Compass, ShieldCheck } from "lucide-react";

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
    <section id="others" className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Galactic Citations & Outreach
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            Honors, Observatories, & Public Science
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Awards Shelf */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h3 className="font-space text-2xl font-extrabold text-text-primary text-left flex items-center gap-2 mb-2">
              <AwardIcon className="w-6 h-6 text-accent-primary animate-pulse-slow" />
              Stellar Honors & Awards
            </h3>

            <div className="flex flex-col gap-6">
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-5 rounded-3xl border border-card-border/80 shadow-md flex gap-4 items-start text-left hover:border-accent-primary/25 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-accent-primary" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">
                        {award.issuer}
                      </span>
                      <span className="text-[10px] font-bold text-text-secondary">
                        {award.year}
                      </span>
                    </div>
                    <h4 className="font-space font-extrabold text-base text-text-primary leading-snug">
                      {award.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {award.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Outreach & Observatory Travel Dossier */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Sub-section: Public Outreach */}
            <div className="flex flex-col gap-4">
              <h3 className="font-space text-2xl font-extrabold text-text-primary text-left flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-accent-secondary animate-pulse-slow" />
                Community Outreach
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {outreach.map((out, index) => (
                  <motion.div
                    key={out.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass rounded-3xl border border-card-border/80 shadow-md overflow-hidden flex flex-col hover:border-accent-secondary/25 transition-all duration-300"
                  >
                    <div className="h-32 overflow-hidden border-b border-card-border/80 relative">
                      <img src={out.imageUrl} alt={out.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    </div>

                    <div className="p-4 flex flex-col gap-1 text-left flex-1 justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[8px] font-bold text-text-secondary uppercase mb-1">
                          <span>{out.organisation}</span>
                          <span>{out.date}</span>
                        </div>
                        <h4 className="font-space font-extrabold text-sm text-text-primary leading-tight">
                          {out.title}
                        </h4>
                        <p className="text-[11px] text-text-secondary leading-relaxed mt-2 font-medium">
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
              <h3 className="font-space text-lg font-bold text-text-primary text-left flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent-primary animate-pulse" />
                Observatory Travel Log
              </h3>

              <div className="glass p-5 rounded-3xl border border-card-border/80 shadow-md flex flex-col gap-3.5 text-left">
                {observatories.map((obs, idx) => (
                  <div key={obs.name} className="flex items-center justify-between border-b last:border-0 border-card-border/30 pb-2.5 last:pb-0">
                    <div className="flex items-center gap-3">
                      {/* Node bullet */}
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-text-primary leading-tight">
                          {obs.name}
                        </span>
                        <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                          {obs.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-accent-secondary">
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
