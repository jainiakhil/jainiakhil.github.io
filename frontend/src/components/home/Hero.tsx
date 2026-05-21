"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingTitles = ["Astrophysicist", "Stargazer", "Builder", "Explorer", "Dreamer"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dreamy, slow entrance animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // Stagger elements slowly
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0] as const, // dreamy easeInOut
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left Column: Heading & Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
        >
          {/* Main Display Headline (using font-display for Fredoka warmth) */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary leading-[1.1]"
          >
            hello, I'm{" "}
            <span className="text-accent-primary relative inline-block transition-all duration-300 hover:text-accent-secondary">
              Akhil Jaini
            </span>
          </motion.h1>

          {/* Rotating Subtitle / Role Tagline */}
          <motion.div
            variants={itemVariants}
            className="h-10 sm:h-12 flex items-center overflow-hidden text-lg sm:text-2xl font-semibold text-accent-secondary"
          >
            <span className="mr-2.5 font-sans font-medium text-text-secondary">I am a</span>
            <div className="relative flex flex-col items-start font-display">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  {rotatingTitles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Cozy Personal Bio Summary */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-text-secondary max-w-xl leading-[1.8] font-medium"
          >
            I'm an astrophysicist who loves building things. I work on finding brief flashes of light from distant galaxies, and I write code to understand how stars move.
          </motion.p>

          {/* Warm, Sentence-case Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection("#research")}
              className="px-6 py-3 rounded-full bg-accent-primary/80 hover:bg-accent-primary text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-accent-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer outline-none"
            >
              see my work
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="px-6 py-3 rounded-full border border-card-border/80 bg-card-bg/20 text-text-primary hover:bg-card-bg/35 font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-sm outline-none"
            >
              say hello
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Whimsical Telescope Silhouette (Instead of Sci-Fi Astronaut) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="lg:col-span-5 flex items-center justify-center relative select-none"
        >
          {/* PLACEHOLDER: Replace with custom illustration of a person looking through a telescope */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
            className="w-72 h-72 sm:w-96 sm:h-96 relative z-10 flex items-center justify-center"
          >
            <svg
              className="w-full h-full text-text-primary/70 drop-shadow-[0_12px_40px_rgba(251,191,36,0.08)] filter"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft grassy hill base */}
              <path d="M 50,430 Q 250,405 450,430 L 450,480 L 50,480 Z" fill="currentColor" className="opacity-[0.08]" />
              
              {/* Tripod Stand */}
              <line x1="250" y1="280" x2="200" y2="425" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="opacity-30" />
              <line x1="250" y1="280" x2="300" y2="425" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" className="opacity-30" />
              <line x1="250" y1="280" x2="250" y2="425" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-20" />
              
              {/* Telescope mount node */}
              <circle cx="250" cy="280" r="7" fill="currentColor" className="opacity-50" />
              
              {/* Rotated Telescope Tube Assembly */}
              <g transform="rotate(-32 250 280)">
                {/* Telescope Main Optical Tube */}
                <rect x="150" y="270" width="190" height="20" rx="3.5" fill="currentColor" className="opacity-60" />
                {/* Focusing Eyepiece */}
                <rect x="138" y="273" width="12" height="14" rx="1.5" fill="currentColor" className="opacity-75" />
                <line x1="130" y1="280" x2="138" y2="280" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                {/* Mini Finderscope */}
                <rect x="230" y="259" width="38" height="6" rx="1" fill="currentColor" className="opacity-45" />
                <line x1="238" y1="265" x2="238" y2="270" stroke="currentColor" strokeWidth="2.5" />
                <line x1="258" y1="265" x2="258" y2="270" stroke="currentColor" strokeWidth="2.5" />
                {/* Large Lens Dew Shield */}
                <rect x="335" y="265" width="18" height="30" rx="2.5" fill="currentColor" className="opacity-75" />
              </g>

              {/* Magical sparkling light stars in the sky */}
              <circle cx="360" cy="130" r="3.5" fill="#FFFDE7" className="animate-pulse" />
              <circle cx="415" cy="180" r="2" fill="#E3F2FD" />
              <circle cx="310" cy="210" r="1.5" fill="#FFFFFF" />
              <circle cx="270" cy="110" r="2.5" fill="#FFFDE7" className="opacity-80" />
              
              {/* Soft atmospheric starlight beam from the aperture */}
              <path d="M 375,190 L 480,115 L 495,135 L 385,210 Z" fill="url(#starlightBeamGrad)" className="opacity-[0.08]" />
              
              <defs>
                <linearGradient id="starlightBeamGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFDF0" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
