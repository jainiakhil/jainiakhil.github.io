"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { Award } from "src/types/portfolio";
import { Star } from "lucide-react";

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
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
    async function fetchAwards() {
      const data = await dataService.getAwards();
      setAwards(data);
      setLoading(false);
    }
    fetchAwards();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <section id="awards" ref={sectionRef} data-expanded={isExpanded ? "true" : "false"} className="pt-10 pb-36 sm:pb-44 px-6 relative overflow-hidden z-0">
      
      {/* Heading (Z-Sandwich: z-10) */}
      <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight">
          Funding & Awards
        </h2>
        <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
        <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
          A selection of competitive research fellowships, academic scholarships, and project funding supporting my astronomical investigations
        </p>
      </div>

      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute top-10 left-0 w-80 h-32 opacity-35 sm:opacity-45"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Main Content (Z-Sandwich: z-30) */}
      <div className="max-w-6xl mx-auto z-30 relative">
        <motion.div 
          layout="position"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {(isExpanded ? awards : awards.slice(0, 3)).map((award, index) => (
              <motion.div
                key={award.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 25, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index < 3 ? index * 0.15 : 0, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                className="dreamcard p-5 flex gap-4 items-start text-left"
              >
                <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 border border-accent-primary/25 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-accent-primary animate-pulse-slow" />
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
                  <h3 className="font-display font-medium text-base text-text-primary leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-1 font-medium">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {awards.length > 3 && (
          <div className="flex justify-center mt-12 relative z-30">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-2.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-xs font-semibold text-accent-primary hover:bg-accent-primary/20 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 select-none"
            >
              {isExpanded ? "show fewer awards ✦" : "view more awards ✦"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
