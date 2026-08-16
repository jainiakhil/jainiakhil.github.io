"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { OutreachActivity } from "src/types/portfolio";
import { Users, ExternalLink, X, ChevronLeft, ChevronRight, Sparkles, Lightbulb, Compass } from "lucide-react";

export default function Outreach() {
  const [outreach, setOutreach] = useState<OutreachActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOut, setSelectedOut] = useState<OutreachActivity | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);


  // Collapse section if user scrolls away to automatically re-enable scroll-snapping
  useEffect(() => {
    if (!isExpanded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsExpanded(false);
        }
      },
      {
        threshold: 0.05,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isExpanded]);

  useEffect(() => {
    setMounted(true);
    async function fetchOutreach() {
      const data = await dataService.getOutreach();
      setOutreach(data);
      setLoading(false);
    }
    fetchOutreach();
  }, []);

  useEffect(() => {
    if (selectedOut) {
      document.body.classList.add("modal-open");
      setActiveImgIndex(0); // Reset carousel on open
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedOut]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  const handleNextImage = (e: React.MouseEvent, imagesLength: number) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % imagesLength);
  };

  const handlePrevImage = (e: React.MouseEvent, imagesLength: number) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + imagesLength) % imagesLength);
  };

  return (
    <section id="outreach" ref={sectionRef} data-expanded={isExpanded ? "true" : "false"} className="pt-10 pb-36 sm:pb-44 px-6 relative z-0">

      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["120%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          className="absolute bottom-10 right-0 w-[420px] h-36 opacity-25 sm:opacity-35"
        >
          <svg className="w-full h-full text-background-secondary/20 fill-current filter blur-2xl" viewBox="0 0 400 150">
            <path d="M 50 120 C 50 90, 90 80, 110 80 C 130 50, 210 40, 250 70 C 290 50, 350 70, 350 110 C 370 110, 390 120, 390 135 C 390 150, 50 150, 50 120 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto z-30 relative">

        {/* Heading (Z-Sandwich: z-10) */}
        <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight">
            Outreach & Leadership
          </h2>
          <div className="w-12 h-1 bg-accent-secondary/40 mt-4 rounded-full" />
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
            Positions of responsibility, scientific communication initiatives, and public outreach programmes
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          layout="position"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {(isExpanded ? outreach : outreach.slice(0, 3)).map((out, index) => (
              <motion.div
                key={out.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index < 3 ? index * 0.15 : 0, ease: [0.25, 0.1, 0.25, 1.0] }}
                onClick={() => setSelectedOut(out)}
                className="group dreamcard overflow-hidden cursor-pointer flex flex-col h-full"
              >
                {/* Thumbnail Image */}
                <div className="h-48 overflow-hidden relative border-b border-card-border/80">
                  <img
                    src={out.imageUrl}
                    alt={out.title}
                    className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-95" />
                </div>

                {/* Text Body */}
                <div className="p-6 flex flex-col flex-1 gap-4 justify-between">
                  <div className="flex flex-col gap-2 text-left">
                    <div className="flex items-center justify-between text-[10px] font-bold text-text-secondary uppercase mb-1">
                      <span>{out.organisation}</span>
                      <span>{out.date}</span>
                    </div>
                    <h3 className="font-display font-medium text-lg text-text-primary group-hover:text-accent-secondary transition-colors duration-300">
                      {out.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                      {out.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {out.tags && out.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {out.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-accent-secondary/10 border border-accent-secondary/20 text-[9px] font-bold text-accent-secondary uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                      {out.tags.length > 2 && (
                        <span className="px-2.5 py-0.5 rounded-md bg-card-bg/30 text-[9px] font-bold text-text-secondary uppercase">
                          +{out.tags.length - 2} More
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {outreach.length > 3 && (
          <div className="flex justify-center mt-12 relative z-30">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-2.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-xs font-semibold text-accent-secondary hover:bg-accent-secondary/20 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 select-none"
            >
              {isExpanded ? "show fewer initiatives ✦" : "view more initiatives ✦"}
            </button>
          </div>
        )}

        {/* Modal Window Portal */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedOut && (
              <motion.div
                key="outreach-detail-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOut(null)}
                className="fixed inset-0 z-[100000] bg-background/70 backdrop-blur-2xl flex items-center justify-center p-4"
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
                    onClick={() => setSelectedOut(null)}
                    className="absolute right-4 top-4 z-40 p-2 rounded-full dreamcard text-text-primary hover:bg-card-bg/20 cursor-pointer active:scale-95 transition-all shadow-md backdrop-blur-md"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Modal Header */}
                  <div className="flex flex-col gap-1 text-left px-6 pt-6 pr-14 flex-shrink-0">
                    <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">
                      {selectedOut.organisation}
                    </span>
                    <h3 className="font-display font-semibold text-lg sm:text-2xl text-text-primary leading-tight">
                      {selectedOut.title}
                    </h3>
                  </div>

                  {/* IMAGE CAROUSEL AREA (Full uncropped image display) */}
                  <div className="w-[calc(100%-3rem)] mx-auto max-h-[48vh] min-h-[220px] sm:min-h-[260px] relative flex-shrink-0 bg-black/20 overflow-hidden group/carousel mt-4 rounded-2xl shadow-sm border border-card-border/60 flex items-center justify-center p-2">
                    <img
                      src={selectedOut.images[activeImgIndex] || selectedOut.imageUrl}
                      alt={`${selectedOut.title} image ${activeImgIndex + 1}`}
                      className="max-h-[44vh] max-w-full w-auto h-auto object-contain rounded-xl select-none transition-all duration-300 shadow-md"
                    />

                    {/* Carousel Controls */}
                    {selectedOut.images && selectedOut.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(e, selectedOut.images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background border border-card-border/60 text-text-primary cursor-pointer active:scale-90 transition-all select-none hover:scale-105 z-30 shadow-lg backdrop-blur-md"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                          onClick={(e) => handleNextImage(e, selectedOut.images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background border border-card-border/60 text-text-primary cursor-pointer active:scale-90 transition-all select-none hover:scale-105 z-30 shadow-lg backdrop-blur-md"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Slide indicators */}
                        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-30">
                          {selectedOut.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveImgIndex(i);
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                activeImgIndex === i
                                  ? "bg-accent-secondary scale-110 w-4"
                                  : "bg-text-secondary/40 hover:bg-text-secondary/80"
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Scrollable Contents */}
                  <div className="p-6 overflow-y-auto flex flex-col gap-6 text-left scrollbar-thin">
                    {/* Long description / details */}
                    <div className="flex flex-col gap-2">
                      <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-accent-secondary" />
                        About this initiative
                      </h4>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {selectedOut.longDescription || selectedOut.description}
                      </p>
                    </div>

                    {/* Challenges faced */}
                    {selectedOut.challenges && (
                      <div className="flex flex-col gap-2">
                        <h4 className="font-display text-sm font-semibold text-text-primary flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-accent-secondary" />
                          Challenges and approach
                        </h4>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {selectedOut.challenges}
                        </p>
                      </div>
                    )}

                    {/* Outcomes / Outcomes details */}
                    {selectedOut.outcomes && (
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-accent-secondary/5 border border-accent-secondary/10">
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-accent-secondary flex items-center gap-1.5">
                          <Compass className="w-4 h-4" />
                          Impact & Outcomes
                        </h4>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {selectedOut.outcomes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer Controls & Links */}
                  <div className="p-6 border-t border-card-border/80 bg-card-bg/25 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedOut.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-accent-secondary/10 border border-accent-secondary/20 text-[9px] font-bold text-accent-secondary uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {selectedOut.externalUrl && (
                      <a
                        href={selectedOut.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent-secondary/85 text-white text-xs font-semibold hover:bg-accent-secondary hover:shadow-md transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit Programme
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
}
