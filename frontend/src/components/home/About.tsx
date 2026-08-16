"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Sparkles, Camera } from "lucide-react";

const myPhotos = [
  { src: "/MyPhotos/2026年07月13日(1)_0002 (1).jpeg", caption: "Shenzhen Skyline & Travels" },
  { src: "/MyPhotos/000126310025(1).jpg", caption: "FAST Telescope Visit" },
  { src: "/MyPhotos/IMG-20251012-WA0005(1).jpg", caption: "Ilo & Me" },
  { src: "/MyPhotos/20251031_183634(1).jpg", caption: "Melbourne Cricket Ground" },
  { src: "/MyPhotos/20250507_211137(1)(1).jpg", caption: "Melbourne CBD" },
  { src: "/MyPhotos/20250424_203906.jpg", caption: "Impromptu Guitar Session" },
  { src: "/MyPhotos/20241110_175200.jpg", caption: "FRB Conference & Expeditions" },
  { src: "/MyPhotos/20241109_122648.jpg", caption: "Khao Lak, Thailand" },
  { src: "/MyPhotos/20240811_145823.jpg", caption: "Melbourne Coastline" },
  { src: "/MyPhotos/20240713_155432.jpg", caption: "Moutn Bawbaw Snow Hike" },
  { src: "/MyPhotos/20240602_214118.jpg", caption: "Casual Nightout" },
  { src: "/MyPhotos/IMG-20260711-WA0157.jpg", caption: "Guiyang, China" },
  { src: "/MyPhotos/IMG20221225181353-01.jpeg", caption: "Sunset Coastal Walk in Udupi, India" },
  { src: "/MyPhotos/1213748526-IMG-20230201-WA0001.jpg", caption: "Journey Through the Stars" },
];

export default function About() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (galleryOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [galleryOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!galleryOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev + 1) % myPhotos.length);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev - 1 + myPhotos.length) % myPhotos.length);
      } else if (e.key === "Escape") {
        setGalleryOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section id="about" className="pt-12 pb-32 px-6 relative overflow-hidden z-10">

      {/* Section Heading (Z-Sandwich: z-10) */}
      <div className="flex flex-col items-center text-center mb-20 z-10 relative select-none">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
          About Me
        </h2>
        <div className="w-12 h-1 bg-accent-primary/40 mt-4 rounded-full" />
        <p className="text-text-secondary text-sm sm:text-base mt-3 max-w-md">
          A little glimpse into my journey under the stars
        </p>
      </div>

      {/* Drifting Atmosphere Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute top-8 left-0 w-96 h-36 opacity-[0.28] sm:opacity-[0.38]"
        >
          <svg className="w-full h-full text-background-secondary/35 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ["120%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 110, ease: "linear" }}
          className="absolute bottom-12 right-0 w-[450px] h-40 opacity-[0.22] sm:opacity-[0.32]"
        >
          <svg className="w-full h-full text-background-secondary/25 fill-current filter blur-2xl" viewBox="0 0 400 150">
            <path d="M 50 120 C 50 90, 90 80, 110 80 C 130 50, 210 40, 250 70 C 290 50, 350 70, 350 110 C 370 110, 390 120, 390 135 C 390 150, 50 150, 50 120 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Main Interactive Content (Z-Sandwich: z-30) */}
      <div className="max-w-6xl mx-auto z-30 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Clickable Portrait Photo & Gallery Trigger */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center text-center">

            {/* Clickable Portrait Photo */}
            <div
              onClick={() => {
                setActivePhotoIndex(0);
                setGalleryOpen(true);
              }}
              className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden bg-card-bg/35 border-2 border-accent-primary/40 p-1.5 mb-6 shadow-xl transition-all duration-500 hover:scale-105 hover:border-accent-secondary/50 cursor-pointer"
              title="Click to view photo gallery"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-background-secondary/15 flex items-center justify-center relative">
                <img
                  src="/AJ_Shenzhen2.jpeg"
                  alt="Akhil Jaini"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />

                {/* Floating Gallery Indicator Pill */}
                {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-background/90 text-text-primary text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md border border-card-border/60">
                    <Camera className="w-3.5 h-3.5 text-accent-primary" />
                    <span>View Gallery ({myPhotos.length})</span>
                  </span>
                </div> */}
              </div>

              {/* Soft lunar edge glow overlay */}
              <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
            </div>

            {/* Profile Name & Soft Tagline */}
            <h3 className="font-display text-2xl font-bold text-text-primary">
              Akhil Jaini
            </h3>
            <p className="text-sm font-semibold text-accent-secondary mt-1 max-w-xs leading-relaxed flex items-center gap-1 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
              Based in Melbourne, Australia
            </p>
          </motion.div>

          {/* Right Column: Warm biography narrative */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6 text-left">
            <p className="text-sm sm:text-base text-text-secondary leading-[1.8] font-medium">
              I&apos;ve always been drawn to the night sky. What began as childhood curiosity looking up at the stars eventually turned into a PhD in computational astrophysics. These days, my work revolves around hunting for split-second flashes of light from galaxies billions of light-years away—a task that requires taming massive streams of data, building high-performance algorithms, and engineering systems capable of finding needles in cosmic haystacks.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-[1.8] font-medium">
              But at heart, I&apos;m a builder. For me, code isn&apos;t just logic; it&apos;s a creative tool. I get a real thrill out of taking complex, messy inputs—whether cosmic signals or real-world data—and turning them into elegant machine learning models, fast pipelines, or clear visual experiences.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-[1.8] font-medium">
              Astrophysics gave me my playground, but the real joy lies in the problem-solving itself. I love taking tools forged in deep-sky research—modelling, software engineering, and machine learning—and using them to solve tricky problems anywhere they pop up. Ultimately, I build to make sense of complex systems, and to turn raw data into something people can actually connect with.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Photo Gallery Modal Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {galleryOpen && (
            <motion.div
              key="photo-gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGalleryOpen(false)}
              className="fixed inset-0 z-[100000] bg-background/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.96, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 15 }}
                transition={{ type: "spring", damping: 30, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="dreamcard w-full max-w-4xl overflow-hidden flex flex-col relative max-h-[90vh] p-4 sm:p-6 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setGalleryOpen(false)}
                  className="absolute right-4 top-4 z-50 p-2 rounded-full dreamcard text-text-primary hover:bg-card-bg/40 cursor-pointer active:scale-95 transition-all shadow-md bg-background/80 backdrop-blur-md"
                  aria-label="Close photo gallery"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center justify-between px-2 pb-3 border-b border-card-border/40 mb-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-accent-primary" />
                    <span className="font-display font-semibold text-base text-text-primary">
                      Moments & Memories
                    </span>
                  </div>
                  <span className="text-xs font-bold text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-3 py-1 rounded-full mr-10">
                    {activePhotoIndex + 1} / {myPhotos.length}
                  </span>
                </div>

                {/* Main Carousel Area */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-[350px] max-h-[60vh] overflow-hidden rounded-2xl bg-black/10 border border-card-border/40 p-2">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhotoIndex}
                      src={myPhotos[activePhotoIndex].src}
                      alt={myPhotos[activePhotoIndex].caption}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="max-h-[58vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-lg select-none"
                    />
                  </AnimatePresence>

                  {/* Left Arrow Button */}
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev - 1 + myPhotos.length) % myPhotos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full dreamcard bg-background/85 backdrop-blur-md hover:bg-background border border-card-border/60 text-text-primary hover:text-accent-primary cursor-pointer active:scale-90 hover:scale-105 transition-all shadow-xl select-none"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Arrow Button */}
                  <button
                    onClick={() => setActivePhotoIndex((prev) => (prev + 1) % myPhotos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full dreamcard bg-background/85 backdrop-blur-md hover:bg-background border border-card-border/60 text-text-primary hover:text-accent-primary cursor-pointer active:scale-90 hover:scale-105 transition-all shadow-xl select-none"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Caption Bar */}
                  {myPhotos[activePhotoIndex].caption && (
                    <div className="absolute bottom-3 inset-x-4 flex justify-center pointer-events-none">
                      <span className="px-4 py-1.5 rounded-full bg-background/85 backdrop-blur-md text-xs font-semibold text-text-primary border border-card-border/60 shadow-md">
                        {myPhotos[activePhotoIndex].caption}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-2 overflow-x-auto py-3 px-1 mt-2 scrollbar-none">
                  {myPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activePhotoIndex === index
                        ? "border-accent-primary scale-105 shadow-md"
                        : "border-card-border/40 opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={photo.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
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
