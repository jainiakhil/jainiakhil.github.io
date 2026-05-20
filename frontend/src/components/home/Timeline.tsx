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
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <section id="timeline" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Orbital Trajectory
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            Career Milestones & Education
          </p>
        </div>

        {/* Desktop View: Horizontal Scroll Tracker */}
        <div className="hidden lg:block relative py-12">
          {/* Horizontal Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-primary/20 via-accent-secondary/30 to-accent-primary/20 -translate-y-1/2 border-dashed border-t border-card-border pointer-events-none" />

          {/* Cards Flex Container */}
          <div className="flex justify-between items-center gap-6 relative">
            {timeline.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                className="flex-1 flex flex-col items-center text-center max-w-[280px]"
              >
                {/* Upper Cards */}
                {index % 2 === 0 && (
                  <div className="glass p-5 rounded-2xl border border-card-border shadow-md mb-8 hover:border-accent-primary/40 hover:-translate-y-1 transition-all duration-300 relative group min-h-[140px]">
                    <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest mb-1 block">
                      {entry.dates}
                    </span>
                    <h4 className="font-space font-bold text-sm text-text-primary mb-1">
                      {entry.role}
                    </h4>
                    <p className="text-[11px] font-semibold text-text-secondary mb-2 uppercase">
                      {entry.institution}
                    </p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                )}

                {/* Trajectory Node (Orbital Bullet) */}
                <div className="w-10 h-10 rounded-full glass border border-card-border flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform bg-background">
                  <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/25">
                    {getIcon(entry.type)}
                  </div>
                  {/* Outer breathing ring */}
                  <div className="absolute inset-0 rounded-full border border-accent-primary/20 animate-pulse scale-125" />
                </div>

                {/* Lower Cards */}
                {index % 2 !== 0 && (
                  <div className="glass p-5 rounded-2xl border border-card-border shadow-md mt-8 hover:border-accent-secondary/40 hover:translate-y-1 transition-all duration-300 relative group min-h-[140px]">
                    <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest mb-1 block">
                      {entry.dates}
                    </span>
                    <h4 className="font-space font-bold text-sm text-text-primary mb-1">
                      {entry.role}
                    </h4>
                    <p className="text-[11px] font-semibold text-text-secondary mb-2 uppercase">
                      {entry.institution}
                    </p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View: Vertical Stacked Timeline */}
        <div className="lg:hidden relative pl-8 border-l-2 border-dashed border-card-border/80 flex flex-col gap-10">
          {timeline.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[53px] top-1.5 w-10 h-10 rounded-full glass border border-card-border bg-background flex items-center justify-center shadow-md">
                <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/25">
                  {getIcon(entry.type)}
                </div>
              </div>

              {/* Content Box */}
              <div className="glass p-5 rounded-2xl border border-card-border shadow-md active:scale-98 transition-transform">
                <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest mb-1 block">
                  {entry.dates}
                </span>
                <h4 className="font-space font-extrabold text-base text-text-primary mb-1">
                  {entry.role}
                </h4>
                <p className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wide">
                  {entry.institution}
                </p>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
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
