"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { Publication } from "src/types/portfolio";
import { Search, Copy, Check, ExternalLink, Clock, Tag } from "lucide-react";

export default function Publications() {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPublications() {
      const data = await dataService.getPublications();
      setPubs(data);
      setLoading(false);
    }
    fetchPublications();
  }, []);

  const handleCopyCitation = (pub: Publication) => {
    const citation = `${pub.authors} (${pub.year}). "${pub.title}." ${pub.journal}.${
      pub.doi ? ` DOI: https://doi.org/${pub.doi}` : ""
    }`;
    
    navigator.clipboard.writeText(citation).then(() => {
      setCopiedId(pub.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const categories = ["All", "FRB", "Astrometry", "Machine Learning"];

  const filteredPubs = pubs.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory =
      selectedCategory === "All" || pub.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <section id="publications" className="py-24 px-6 relative overflow-hidden z-0">
      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 85, ease: "linear" }}
          className="absolute top-16 left-0 w-80 h-28 opacity-35 sm:opacity-45"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto z-30 relative">
        
        {/* Heading (Z-Sandwich: z-10) */}
        <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight">
            Papers & Publications
          </h2>
          <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
            Scientific papers and articles detailing observations of the cosmos
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10 w-full dreamcard p-4">
          {/* Search Inputs */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-full bg-background-secondary/15 border border-card-border/80 focus:border-accent-primary/60 outline-none text-xs font-semibold text-text-primary transition-all placeholder:text-text-secondary/55"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 border border-transparent ${
                  selectedCategory === cat
                    ? "bg-accent-primary/15 border-accent-primary/30 text-accent-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-card-bg/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stacked Publications list */}
        <div className="flex flex-col gap-6 w-full">
          <AnimatePresence mode="popLayout">
            {filteredPubs.length > 0 ? (
              filteredPubs.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 1.2, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                  className="dreamcard p-6 sm:p-8 flex flex-col gap-4 items-start text-left"
                >
                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-accent-primary bg-accent-primary/10 border border-accent-primary/25 px-2.5 py-0.5 rounded-md">
                      <Tag className="w-3 h-3" />
                      {pub.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-text-secondary">
                      <Clock className="w-3 h-3" />
                      {pub.year}
                    </span>
                    <span className="text-[10px] font-semibold text-text-secondary/70 tracking-wide">
                      {pub.journal}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-lg sm:text-xl text-text-primary leading-snug">
                    {pub.title}
                  </h3>
                  
                  <p className="text-[11px] font-bold text-accent-primary/95">
                    {pub.authors}
                  </p>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal italic bg-background-secondary/15 p-5 rounded-2xl border border-card-border/50 w-full">
                    {pub.abstract}
                  </p>

                  {/* Resources & Citation Copy controls */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-2 border-t border-card-border/40 pt-4 w-full">
                    {/* Copy Citation button */}
                    <button
                      onClick={() => handleCopyCitation(pub)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 border ${
                        copiedId === pub.id
                          ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-500"
                          : "dreamcard text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Citation Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Citation
                        </>
                      )}
                    </button>

                    {/* Resource external links (Simple links with underlines) */}
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      {pub.arxivUrl && (
                        <a
                          href={pub.arxivUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-text-secondary hover:text-accent-primary transition-colors underline decoration-dotted underline-offset-4"
                        >
                          arXiv
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                      {pub.adsUrl && (
                        <a
                          href={pub.adsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-text-secondary hover:text-accent-primary transition-colors underline decoration-dotted underline-offset-4"
                        >
                          NASA ADS
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-text-primary hover:text-accent-primary transition-colors underline decoration-dotted underline-offset-4"
                        >
                          DOI
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 dreamcard"
              >
                <p className="text-sm font-semibold text-text-secondary">
                  No matching publications found.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}
