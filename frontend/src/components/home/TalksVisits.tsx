"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dataService } from "src/lib/dataService";
import { TalkEntry, ObservatoryVisit } from "src/types/portfolio";
import { ChevronDown, Calendar, MapPin, Presentation, Globe, Compass, ExternalLink, User, FileText, FolderArchive } from "lucide-react";

export default function TalksVisits() {
  const [talks, setTalks] = useState<TalkEntry[]>([]);
  const [visits, setVisits] = useState<ObservatoryVisit[]>([]);
  const [loading, setLoading] = useState(true);

  // Accordion collapsed by default as requested
  const [seminarsOpen, setSeminarsOpen] = useState(false);
  const [conferencesOpen, setConferencesOpen] = useState(false);
  const [visitsOpen, setVisitsOpen] = useState(false);

  useEffect(() => {
    async function fetchTalksAndVisits() {
      const [talksData, visitsData] = await Promise.all([
        dataService.getTalks(),
        dataService.getObservatoryVisits(),
      ]);
      setTalks(talksData);
      setVisits(visitsData);
      setLoading(false);
    }
    fetchTalksAndVisits();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-dashed border-accent-primary rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  // Filter talks by category
  const seminarTalks = talks.filter((t) => t.type === "seminar");
  const conferenceTalks = talks.filter((t) => t.type === "conference");

  return (
    <section id="talks-visits" className="pt-10 pb-24 px-6 relative z-0">
      
      {/* Drifting Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 85, ease: "linear" }}
          className="absolute top-12 right-12 w-80 h-32 opacity-35 sm:opacity-45"
        >
          <svg className="w-full h-full text-background-secondary/30 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto z-30 relative">
        
        {/* Heading (Z-Sandwich: z-10) */}
        <div className="flex flex-col items-center text-center mb-16 z-10 relative select-none">
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight">
            Talks & Visits
          </h2>
          <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
          <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
            Scientific seminars, international conference presentations, and operational visits to major ground-based telescopes
          </p>
        </div>

        {/* Collapsible Accordion Container */}
        <div className="flex flex-col gap-6 text-left">
          
          {/* CATEGORY 1: Invited Seminars & Colloquia */}
          <div className="dreamcard overflow-hidden rounded-3xl border border-card-border/50">
            <button
              onClick={() => setSeminarsOpen(!seminarsOpen)}
              className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-card-bg/15 transition-all select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
                  <Presentation className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-text-primary">
                    Invited Seminars & Colloquia
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Scientific talks and research seminars delivered at universities and research centres ({seminarTalks.length})
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: seminarsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-text-secondary"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {seminarsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-card-border/20 flex flex-col gap-5">
                    {seminarTalks.map((talk) => (
                      <div
                        key={talk.id}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-card-border/30 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-2 h-2 rounded-full bg-accent-primary/60 mt-2 flex-shrink-0" />
                          <div className="flex flex-col gap-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              {talk.talkType && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-primary bg-accent-primary/10 border border-accent-primary/25 px-2 py-0.5 rounded-md">
                                  {talk.talkType}
                                </span>
                              )}
                              <span className="text-sm font-semibold text-text-primary leading-snug">
                                {talk.title}
                              </span>
                            </div>
                            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-accent-primary flex-shrink-0" />
                              {talk.venue}
                            </span>

                            {/* Action Buttons: Event link, Slides, Poster, Supplementary */}
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {talk.externalUrl && (
                                <a
                                  href={talk.externalUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary hover:underline transition-colors"
                                >
                                  Event / Details
                                  <ExternalLink className="w-3 h-3 opacity-70" />
                                </a>
                              )}
                              {talk.slidesUrl && (
                                <a
                                  href={talk.slidesUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <FileText className="w-3 h-3" />
                                  Slides
                                </a>
                              )}
                              {talk.posterUrl && (
                                <a
                                  href={talk.posterUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <FileText className="w-3 h-3" />
                                  Poster
                                </a>
                              )}
                              {talk.supplementaryUrl && (
                                <a
                                  href={talk.supplementaryUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-secondary bg-accent-secondary/10 hover:bg-accent-secondary/20 border border-accent-secondary/25 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <FolderArchive className="w-3 h-3" />
                                  Supplementary
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-text-secondary uppercase bg-card-bg/35 px-2.5 py-1 rounded-md flex items-center gap-1 self-start sm:self-start flex-shrink-0 border border-card-border/40">
                          <Calendar className="w-3 h-3 text-text-secondary" />
                          {talk.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CATEGORY 2: Conference Talks & Presentations */}
          <div className="dreamcard overflow-hidden rounded-3xl border border-card-border/50">
            <button
              onClick={() => setConferencesOpen(!conferencesOpen)}
              className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-card-bg/15 transition-all select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-accent-secondary/10 border border-accent-secondary/20 flex items-center justify-center text-accent-secondary">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-text-primary">
                    Conference Talks & Presentations
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Contributed research presentations, sparklers, and posters at local and international meetings ({conferenceTalks.length})
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: conferencesOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-text-secondary"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {conferencesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-card-border/20 flex flex-col gap-5">
                    {conferenceTalks.map((talk) => (
                      <div
                        key={talk.id}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-card-border/30 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-2 h-2 rounded-full bg-accent-secondary/60 mt-2 flex-shrink-0" />
                          <div className="flex flex-col gap-1.5">
                            {/* Title & Type Badge */}
                            <div className="flex flex-wrap items-center gap-2">
                              {talk.talkType && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/25 px-2 py-0.5 rounded-md">
                                  {talk.talkType}
                                </span>
                              )}
                              <span className="text-sm font-semibold text-text-primary leading-snug">
                                {talk.title}
                              </span>
                            </div>

                            {/* Authors */}
                            {talk.authors && (
                              <span className="text-[11px] font-medium text-accent-primary/95 flex items-center gap-1">
                                <User className="w-3 h-3 opacity-60 flex-shrink-0" />
                                {talk.authors}
                              </span>
                            )}

                            {/* Venue */}
                            <div className="flex items-center gap-1 text-xs text-text-secondary mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-accent-secondary flex-shrink-0" />
                              {talk.venue}
                            </div>

                            {/* Action Buttons: Event / Programme, Slides, Poster, Supplementary */}
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {talk.externalUrl && (
                                <a
                                  href={talk.externalUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary hover:underline transition-colors"
                                >
                                  Event / Programme
                                  <ExternalLink className="w-3 h-3 opacity-70" />
                                </a>
                              )}
                              {talk.slidesUrl && (
                                <a
                                  href={talk.slidesUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <FileText className="w-3 h-3" />
                                  Slides
                                </a>
                              )}
                              {talk.posterUrl && (
                                <a
                                  href={talk.posterUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <FileText className="w-3 h-3" />
                                  Poster
                                </a>
                              )}
                              {talk.supplementaryUrl && (
                                <a
                                  href={talk.supplementaryUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-secondary bg-accent-secondary/10 hover:bg-accent-secondary/20 border border-accent-secondary/25 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <FolderArchive className="w-3 h-3" />
                                  Supplementary
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-text-secondary uppercase bg-card-bg/35 px-2.5 py-1 rounded-md flex items-center gap-1 self-start sm:self-start flex-shrink-0 border border-card-border/40">
                          <Calendar className="w-3 h-3 text-text-secondary" />
                          {talk.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CATEGORY 3: Observatory Visits */}
          <div className="dreamcard overflow-hidden rounded-3xl border border-card-border/50">
            <button
              onClick={() => setVisitsOpen(!visitsOpen)}
              className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-card-bg/15 transition-all select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-accent-primary">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-text-primary">
                    Observatory Visits
                  </h3>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Field visits and observation shifts at major radio and optical telescope complexes ({visits.length})
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: visitsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-text-secondary"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {visitsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-card-border/20 flex flex-col gap-5">
                    {visits.map((visit) => (
                      <div
                        key={visit.id}
                        className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-card-border/30 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-2 h-2 rounded-full bg-accent-primary/60 mt-2 flex-shrink-0" />
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-text-primary leading-tight">
                              {visit.name}
                            </span>
                            <span className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-accent-primary flex-shrink-0" />
                              {visit.location}
                            </span>
                            {visit.purpose && (
                              <p className="text-xs text-text-secondary/85 mt-1 leading-relaxed">
                                {visit.purpose}
                              </p>
                            )}

                            {/* Action Buttons for Visits: Report, Slides, Poster, Supplementary */}
                            {(visit.reportUrl || visit.slidesUrl || visit.posterUrl || visit.supplementaryUrl) && (
                              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                {visit.reportUrl && (
                                  <a
                                    href={visit.reportUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Visit Report
                                  </a>
                                )}
                                {visit.slidesUrl && (
                                  <a
                                    href={visit.slidesUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Slides
                                  </a>
                                )}
                                {visit.posterUrl && (
                                  <a
                                    href={visit.posterUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/25 px-2 py-0.5 rounded-md transition-colors"
                                  >
                                    <FileText className="w-3 h-3" />
                                    Poster
                                  </a>
                                )}
                                {visit.supplementaryUrl && (
                                  <a
                                    href={visit.supplementaryUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-secondary bg-accent-secondary/10 hover:bg-accent-secondary/20 border border-accent-secondary/25 px-2 py-0.5 rounded-md transition-colors"
                                  >
                                    <FolderArchive className="w-3 h-3" />
                                    Supplementary
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold text-text-secondary uppercase bg-card-bg/35 px-2.5 py-1 rounded-md flex items-center gap-1 self-start sm:self-start flex-shrink-0 border border-card-border/40">
                          <Calendar className="w-3 h-3 text-text-secondary" />
                          {visit.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
