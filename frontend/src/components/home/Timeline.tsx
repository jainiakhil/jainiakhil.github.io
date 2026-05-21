"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { TimelineEntry } from "src/types/portfolio";
import { GraduationCap, Briefcase, Award, Rocket } from "lucide-react";

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimeline() {
      const data = await dataService.getTimeline();
      setTimeline(data);
      setLoading(false);
    }
    fetchTimeline();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return <GraduationCap className="w-4 h-4 text-accent-primary" />;
      case "career":
        return <Briefcase className="w-4 h-4 text-accent-primary" />;
      case "research":
        return <Rocket className="w-4 h-4 text-accent-secondary" />;
      default:
        return <Award className="w-4 h-4 text-accent-secondary" />;
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-dashed border-accent-primary rounded-full animate-spin mx-auto opacity-60" />
      </div>
    );
  }

  return (
    <section id="timeline" className="py-32 px-6 overflow-hidden z-0 relative">
      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-30%", "120%"] }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          className="absolute top-16 left-0 w-96 h-32 opacity-[0.25] sm:opacity-[0.35]"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto z-30 relative">
        
        {/* Heading (Z-Sandwich: z-10) */}
        <div className="flex flex-col items-center text-center mb-24 z-10 relative select-none">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
            My Path
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm font-medium mt-3 opacity-85">
            where I've been along the way
          </p>
        </div>

        {/* Desktop View: Horizontal Scroll Tracker */}
        <div className="hidden lg:block relative py-12">
          {/* Horizontal Dotted Line Path - soft and low-opacity */}
          <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dotted border-card-border/30 -translate-y-1/2 pointer-events-none" />

          {/* Cards Flex Container */}
          <div className="flex justify-between items-center gap-6 relative">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.0, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="flex-1 flex flex-col items-center text-center max-w-[280px]"
              >
                {/* Upper Cards */}
                {index % 2 === 0 && (
                  <div className="dreamcard p-5 shadow-sm mb-8 relative min-h-[140px] text-center">
                    <span className="text-[10px] font-semibold text-accent-primary uppercase tracking-wider mb-1 block">
                      {entry.dates}
                    </span>
                    <h4 className="font-display font-bold text-sm text-text-primary mb-1">
                      {entry.role}
                    </h4>
                    <p className="text-[10px] font-medium text-text-secondary mb-2 uppercase tracking-wide">
                      {entry.institution}
                    </p>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                      {entry.description}
                    </p>
                  </div>
                )}

                {/* Trajectory Node (Celestial Icon) - No breathing rings or scaling on hover */}
                <div className="w-10 h-10 rounded-full dreamcard flex items-center justify-center relative z-10 shadow-sm bg-background-secondary/10">
                  <div className="w-6 h-6 rounded-full bg-accent-primary/5 flex items-center justify-center border border-accent-primary/10">
                    {getIcon(entry.type)}
                  </div>
                </div>

                {/* Lower Cards */}
                {index % 2 !== 0 && (
                  <div className="dreamcard p-5 shadow-sm mt-8 relative min-h-[140px] text-center">
                    <span className="text-[10px] font-semibold text-accent-secondary uppercase tracking-wider mb-1 block">
                      {entry.dates}
                    </span>
                    <h4 className="font-display font-bold text-sm text-text-primary mb-1">
                      {entry.role}
                    </h4>
                    <p className="text-[10px] font-medium text-text-secondary mb-2 uppercase tracking-wide">
                      {entry.institution}
                    </p>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                      {entry.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View: Vertical Stacked Timeline */}
        <div className="lg:hidden relative pl-8 border-l-2 border-dotted border-card-border/20 flex flex-col gap-10">
          {timeline.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="relative"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[53px] top-1.5 w-10 h-10 rounded-full dreamcard bg-background flex items-center justify-center shadow-sm">
                <div className="w-6 h-6 rounded-full bg-accent-primary/5 flex items-center justify-center border border-accent-primary/10">
                  {getIcon(entry.type)}
                </div>
              </div>

              {/* Content Box */}
              <div className="dreamcard p-5 shadow-sm">
                <span className="text-[10px] font-semibold text-accent-primary uppercase tracking-wider mb-1 block">
                  {entry.dates}
                </span>
                <h4 className="font-display font-bold text-base text-text-primary mb-1">
                  {entry.role}
                </h4>
                <p className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wide">
                  {entry.institution}
                </p>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
