"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { TimelineEntry } from "src/types/portfolio";
import { GraduationCap, Briefcase, Award, Rocket, ChevronLeft, ChevronRight, X, MapPin, Sparkles, Calendar } from "lucide-react";

export default function Timeline() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkScrollLimits = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftScroll(scrollLeft > 10);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollLimits();
      window.addEventListener("resize", checkScrollLimits);
      return () => {
        window.removeEventListener("resize", checkScrollLimits);
      };
    }
  }, [timeline]);

  useEffect(() => {
    if (selectedEntry) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedEntry]);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 330; // Card width (290px) + Gap (32px) + offset
      const targetScroll = container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

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
    <section id="timeline" className="pt-12 pb-32 px-4 sm:px-6 overflow-hidden z-0 relative">
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
        <div className="flex flex-col items-center text-center mb-20 z-10 relative select-none">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
            My Path
          </h2>
          <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
            Career milestones and research highlights along the way
          </p>
        </div>

        {/* Desktop View: Horizontal Scroll Tracker */}
        <div className="hidden lg:block relative py-8 select-none">
          {/* Left Scroll Button - positioned outside and elevated */}
          <button
            onClick={() => handleScroll("left")}
            className={`absolute -left-5 xl:-left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full dreamcard bg-background/85 backdrop-blur-md flex items-center justify-center shadow-xl border border-card-border/80 transition-all duration-300 hover:scale-110 active:scale-95 text-text-primary hover:text-accent-primary hover:border-accent-primary/50 cursor-pointer ${showLeftScroll ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Scroll Button - positioned outside and elevated */}
          <button
            onClick={() => handleScroll("right")}
            className={`absolute -right-5 xl:-right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full dreamcard bg-background/85 backdrop-blur-md flex items-center justify-center shadow-xl border border-card-border/80 transition-all duration-300 hover:scale-110 active:scale-95 text-text-primary hover:text-accent-primary hover:border-accent-primary/50 cursor-pointer ${showRightScroll ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollContainerRef}
            onScroll={checkScrollLimits}
            className="overflow-x-auto scrollbar-none pb-8 px-12 xl:px-16 scroll-smooth"
          >
            <div className="relative w-max py-6">
              {/* Horizontal Dotted Line Path */}
              <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dotted border-card-border/40 -translate-y-1/2 pointer-events-none" />

              {/* Cards Flex Container */}
              <div className="flex gap-8 relative z-10 items-center">
                {timeline.map((entry, index) => {
                  const isTop = index % 2 === 0;
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1.0] }}
                      className="w-[290px] flex-shrink-0 flex flex-col items-center"
                    >
                      {/* Upper Card */}
                      {isTop && (
                        <div
                          onClick={() => setSelectedEntry(entry)}
                          className="group dreamcard p-5 mb-8 text-left cursor-pointer transition-all duration-300 hover:border-accent-primary/50 hover:shadow-lg flex flex-col justify-between min-h-[190px] w-full"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-accent-primary uppercase tracking-wider mb-1 block">
                              {entry.dates}
                            </span>
                            <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-primary transition-colors leading-snug mb-1">
                              {entry.role}
                            </h4>
                            <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-2 line-clamp-1">
                              {entry.institution}
                            </p>
                            {/* Card displays full description content (<25 words) without line-clamp truncation */}
                            <p className="text-xs text-text-secondary leading-relaxed font-medium mb-3">
                              {entry.description}
                            </p>
                          </div>

                          {/* Skill / Keyword Pills */}
                          {entry.skills && entry.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-2 border-t border-card-border/40">
                              {entry.skills.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-bold text-accent-primary uppercase"
                                >
                                  {skill}
                                </span>
                              ))}
                              {entry.skills.length > 3 && (
                                <span className="px-1.5 py-0.5 rounded-md bg-card-bg/40 text-[9px] font-bold text-text-secondary uppercase">
                                  +{entry.skills.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Trajectory Center Node */}
                      <div className="w-10 h-10 rounded-full dreamcard flex items-center justify-center relative z-10 shadow-sm bg-background-secondary/15">
                        <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                          {getIcon(entry.type)}
                        </div>
                      </div>

                      {/* Lower Card */}
                      {!isTop && (
                        <div
                          onClick={() => setSelectedEntry(entry)}
                          className="group dreamcard p-5 mt-8 text-left cursor-pointer transition-all duration-300 hover:border-accent-secondary/50 hover:shadow-lg flex flex-col justify-between min-h-[190px] w-full"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-wider mb-1 block">
                              {entry.dates}
                            </span>
                            <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-accent-secondary transition-colors leading-snug mb-1">
                              {entry.role}
                            </h4>
                            <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mb-2 line-clamp-1">
                              {entry.institution}
                            </p>
                            {/* Card displays full description content (<25 words) without line-clamp truncation */}
                            <p className="text-xs text-text-secondary leading-relaxed font-medium mb-3">
                              {entry.description}
                            </p>
                          </div>

                          {/* Skill / Keyword Pills */}
                          {entry.skills && entry.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-2 border-t border-card-border/40">
                              {entry.skills.slice(0, 3).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-md bg-accent-secondary/10 border border-accent-secondary/20 text-[9px] font-bold text-accent-secondary uppercase"
                                >
                                  {skill}
                                </span>
                              ))}
                              {entry.skills.length > 3 && (
                                <span className="px-1.5 py-0.5 rounded-md bg-card-bg/40 text-[9px] font-bold text-text-secondary uppercase">
                                  +{entry.skills.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Helper hint */}
          <div className="text-[10px] text-text-secondary/55 font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 mt-2 select-none">
            <span>Click any milestone to open full details ✦</span>
          </div>
        </div>

        {/* Mobile View: Vertical Stacked Timeline */}
        <div className="lg:hidden relative pl-8 border-l-2 border-dotted border-card-border/30 flex flex-col gap-8">
          {timeline.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="relative"
            >
              {/* Bullet Node */}
              <div className="absolute -left-[53px] top-2 w-10 h-10 rounded-full dreamcard bg-background flex items-center justify-center shadow-sm">
                <div className="w-6 h-6 rounded-full bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                  {getIcon(entry.type)}
                </div>
              </div>

              {/* Content Box */}
              <div
                onClick={() => setSelectedEntry(entry)}
                className="dreamcard p-5 shadow-sm text-left cursor-pointer transition-all duration-300 hover:border-accent-primary/40 active:scale-98"
              >
                <span className="text-[10px] font-bold text-accent-primary uppercase tracking-wider mb-1 block">
                  {entry.dates}
                </span>
                <h4 className="font-display font-bold text-base text-text-primary mb-1">
                  {entry.role}
                </h4>
                <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">
                  {entry.institution}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed font-medium mb-3">
                  {entry.description}
                </p>

                {/* Skill Pills */}
                {entry.skills && entry.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-card-border/40">
                    {entry.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[9px] font-bold text-accent-primary uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Pop-up Modal Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedEntry && (
            <motion.div
              key="journey-detail-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="fixed inset-0 z-[100000] bg-background/70 backdrop-blur-2xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.96, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 15 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="dreamcard w-full max-w-2xl overflow-hidden flex flex-col relative max-h-[85vh] p-6 sm:p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="absolute right-4 top-4 z-40 p-2 rounded-full dreamcard text-text-primary hover:bg-card-bg/30 cursor-pointer active:scale-95 transition-all shadow-md"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header */}
                <div className="flex flex-col gap-3 text-left border-b border-card-border/40 pb-6 pr-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-primary bg-accent-primary/15 border border-accent-primary/30 px-3 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {selectedEntry.dates}
                    </span>
                    {selectedEntry.location && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-text-secondary">
                        <MapPin className="w-3 h-3 opacity-60" />
                        {selectedEntry.location}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
                    {selectedEntry.role}
                  </h3>

                  <p className="text-sm font-semibold text-accent-primary/90">
                    {selectedEntry.institution}
                  </p>

                  {/* Skills / Tech Stack Pills */}
                  {selectedEntry.skills && selectedEntry.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedEntry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-md bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-bold text-accent-primary uppercase tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Scrollable Body */}
                <div className="overflow-y-auto space-y-6 text-left py-6 scrollbar-none pr-1">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
                      Overview & Focus
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium bg-background-secondary/20 p-5 rounded-2xl border border-card-border/50">
                      {selectedEntry.longDescription || selectedEntry.description}
                    </p>
                  </div>

                  {/* Key Highlights & Outcomes */}
                  {selectedEntry.highlights && selectedEntry.highlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
                        Key Milestones & Outcomes
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedEntry.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary font-medium">
                            <span className="text-accent-primary text-sm leading-tight select-none">✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-card-border/40 flex justify-end">
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="px-5 py-2 rounded-full dreamcard text-xs font-semibold text-text-primary hover:text-accent-primary transition-all duration-300 cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
