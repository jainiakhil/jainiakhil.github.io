"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Orbit, Radio } from "lucide-react";

const headlines = [
  "Astrophysicist",
  "Systems Engineer",
  "GPU Pipeline Architect",
  "Deep Space Researcher",
  "Computational Coder",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Heading & Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left"
        >
          {/* Scientific Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3 py-1 rounded-full glass border border-card-border/80 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent-primary shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-accent-primary animate-pulse" />
            <span>Telemetry Status: Connected</span>
          </motion.div>

          {/* Staggered Main Title */}
          <motion.h1
            variants={itemVariants}
            className="font-space text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-text-primary leading-[1.08]"
          >
            Voyaging through <br />
            <span className="bg-gradient-to-r from-accent-primary via-sky-300 to-accent-secondary bg-clip-text text-transparent drop-shadow-sm">
              Cosmic Data
            </span>
          </motion.h1>

          {/* Title Rotator */}
          <motion.div
            variants={itemVariants}
            className="h-12 sm:h-16 flex items-center relative overflow-hidden font-space text-2xl sm:text-4xl font-semibold text-text-secondary"
          >
            <span className="mr-2.5">I am a</span>
            <div className="relative h-full flex-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={headlines[index]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute left-0 text-accent-primary font-bold tracking-wide"
                >
                  {headlines[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Scientific Bio Summary */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-text-secondary max-w-xl leading-relaxed font-medium"
          >
            Welcome, voyager! I specialize in computational astrophysics and high-performance engineering. I build parallel GPU pipelines to detect sub-millisecond cosmic pulses and create beautiful digital simulators for celestial multi-body dynamics.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection("#research")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold text-xs sm:text-sm uppercase tracking-widest shadow-xl hover:shadow-accent-primary/25 hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer"
            >
              Explore Research
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="px-6 py-3.5 rounded-full glass hover:bg-card-bg/20 text-text-primary font-bold text-xs sm:text-sm uppercase tracking-widest border border-card-border shadow-md active:scale-97 hover:scale-103 transition-all duration-300 cursor-pointer"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Astronaut Graphic (Lottie Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center relative select-none"
        >
          {/* Orbital grid circles underneath the astronaut */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-accent-primary/10 animate-spin-slow" />
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-card-border/40" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] rounded-full border border-dashed border-accent-secondary/15 flex items-start justify-center"
            >
              <div className="w-3 h-3 bg-accent-secondary rounded-full -mt-1.5 shadow-[0_0_8px_#ec4899]" />
            </motion.div>
          </div>

          {/* Modular Floating Astronaut Graphic (Framer Motion Floating animation) */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6.5,
              ease: "easeInOut",
            }}
            className="w-64 h-64 sm:w-80 sm:h-80 relative z-10 flex items-center justify-center"
          >
            {/* Custom Astronaut Vector Graphic */}
            <svg
              className="w-full h-full drop-shadow-[0_10px_30px_rgba(125,211,252,0.15)] filter"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Helmet Visor Reflection */}
              <circle cx="250" cy="230" r="100" fill="url(#astronautGrad)" />
              <path
                d="M170 200 C170 140, 330 140, 330 200 C330 260, 170 260, 170 200 Z"
                fill="url(#visorGrad)"
                className="opacity-95"
              />
              {/* Reflection Highlight */}
              <path
                d="M190 180 Q 230 155 280 170"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                className="opacity-70"
              />
              
              {/* Suit Body Details */}
              <rect x="210" y="325" width="80" height="90" rx="40" fill="#E2E8F0" />
              {/* Control Panel Chest Block */}
              <rect x="220" y="335" width="60" height="40" rx="5" fill="#1E293B" />
              <circle cx="235" cy="355" r="5" fill="#3B82F6" className="animate-pulse" />
              <circle cx="250" cy="355" r="5" fill="#EF4444" />
              <rect x="260" y="352" width="12" height="6" fill="#10B981" />
              
              {/* Floating Backpack Oxygen tube */}
              <path
                d="M190 340 Q 150 370 210 400"
                stroke="#94A3B8"
                strokeWidth="10"
                strokeLinecap="round"
              />
              
              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="astronautGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </radialGradient>
                <linearGradient id="visorGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0F172A" />
                  <stop offset="70%" stopColor="#1E1E38" />
                  <stop offset="100%" stopColor="#312E81" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing sparkle bubbles around astronaut */}
            <motion.div
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute top-8 left-10 text-accent-primary/60 text-lg"
            >
              ✦
            </motion.div>
            <motion.div
              animate={{ opacity: [0.8, 0.1, 0.8], scale: [1.1, 0.7, 1.1] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              className="absolute bottom-12 right-6 text-accent-secondary/60 text-md"
            >
              ✦
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Soft Gradient Ring */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
