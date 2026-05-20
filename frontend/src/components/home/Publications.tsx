"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { Publication } from "src/types/portfolio";
import { Search, Copy, Check, ExternalLink, BookOpen, Clock, Tag } from "lucide-react";

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
    // Generates high-fidelity APA citation format
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
    <section id="publications" className="py-24 px-6 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-space text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
            Academic Registry
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-accent-primary to-accent-secondary mt-3 rounded-full" />
          <p className="text-text-secondary text-xs sm:text-sm font-semibold uppercase tracking-widest mt-3">
            Scientific Publications & Abstracts
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 w-full glass p-4 rounded-3xl border border-card-border/80 shadow-md">
          {/* Search Inputs */}
          <div className="relative w-full md:max-w-sm">
            <Search className="w-4 h-4 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, author, journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-background-secondary/10 border border-card-border/80 focus:border-accent-primary/60 outline-none text-xs font-semibold text-text-primary transition-all placeholder:text-text-secondary/60"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-md shadow-accent-primary/15"
                    : "glass border border-card-border text-text-secondary hover:bg-card-bg/20 hover:text-text-primary"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass p-6 rounded-3xl border border-card-border/80 shadow-md flex flex-col lg:flex-row gap-6 items-start text-left hover:border-accent-primary/30 transition-all duration-300"
                >
                  {/* Category Stamp icon */}
                  <div className="hidden lg:flex w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5 border border-accent-primary/15 items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-accent-primary animate-pulse-slow" />
                  </div>

                  {/* Main text metadata */}
                  <div className="flex-1 flex flex-col gap-3">
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

                    <h3 className="font-space font-extrabold text-lg text-text-primary leading-snug">
                      {pub.title}
                    </h3>
                    
                    <p className="text-[11px] font-bold text-accent-primary/95">
                      {pub.authors}
                    </p>

                    <p className="text-xs text-text-secondary leading-relaxed font-medium bg-background-secondary/5 p-4 rounded-2xl border border-card-border/50">
                      <strong>Abstract:</strong> {pub.abstract}
                    </p>

                    {/* Resources & Citation Copy controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-2 border-t border-card-border/40 pt-4">
                      {/* Copy Citation button */}
                      <button
                        onClick={() => handleCopyCitation(pub)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95 border ${
                          copiedId === pub.id
                            ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-400"
                            : "glass border-card-border text-text-secondary hover:bg-card-bg/25 hover:text-text-primary"
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

                      {/* Resource external links */}
                      <div className="flex items-center gap-3">
                        {pub.arxivUrl && (
                          <a
                            href={pub.arxivUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg glass border border-card-border text-text-secondary hover:text-text-primary hover:bg-card-bg/20 transition-all cursor-pointer active:scale-95"
                          >
                            arXiv
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {pub.adsUrl && (
                          <a
                            href={pub.adsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg glass border border-card-border text-text-secondary hover:text-text-primary hover:bg-card-bg/20 transition-all cursor-pointer active:scale-95"
                          >
                            ADS NASA
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-md transition-all cursor-pointer active:scale-95"
                          >
                            DOI
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 glass rounded-3xl border border-card-border"
              >
                <p className="text-sm font-semibold text-text-secondary">
                  No matching publications found in the cosmic archives.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
