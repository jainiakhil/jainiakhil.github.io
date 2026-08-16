"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rotatingTitles = ["Astrophysicist", "Stargazer", "Builder", "Explorer", "Dreamer"];

/* ==================================================================
   1. RADIO TELESCOPE SVG (ASKAP style dish rotating slowly)
   ================================================================== */
const RadioTelescope = () => (
  <motion.svg
    className="w-full h-full text-text-primary/70 filter drop-shadow-[0_12px_40px_rgba(124,58,237,0.08)]"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background stars */}
    <circle cx="100" cy="80" r="1.5" fill="currentColor" className="opacity-40" />
    <circle cx="280" cy="60" r="2" fill="#FFFDE7" className="animate-pulse" />
    <circle cx="340" cy="140" r="1" fill="currentColor" className="opacity-30" />
    <circle cx="70" cy="180" r="2.5" fill="#E3F2FD" className="opacity-60" />

    {/* Ground base */}
    <path d="M 40,350 Q 200,335 360,350 L 360,380 L 40,380 Z" fill="currentColor" className="opacity-[0.06]" />

    {/* Telescope Stand / Base Pedestal */}
    <rect x="185" y="270" width="30" height="75" rx="4" fill="currentColor" className="opacity-30" />
    <path d="M 170,345 L 230,345 L 220,270 L 180,270 Z" fill="currentColor" className="opacity-20" />
    <circle cx="200" cy="265" r="12" fill="currentColor" className="opacity-40" />

    {/* Rotating Head Assembly */}
    <motion.g
      style={{ originX: "200px", originY: "265px" }}
      animate={{ rotate: [-8, 15, -8] }}
      transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
    >
      {/* Central Support Strut */}
      <line x1="200" y1="265" x2="200" y2="135" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-40" />
      <line x1="175" y1="220" x2="200" y2="135" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="opacity-30" />
      <line x1="225" y1="220" x2="200" y2="135" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="opacity-30" />

      {/* Curved Radio Dish */}
      <path d="M 120,200 Q 200,250 280,200 L 290,215 Q 200,270 110,215 Z" fill="currentColor" className="opacity-60" />
      {/* Structural ribs behind the dish */}
      <path d="M 140,212 L 155,240 M 170,222 L 180,248 M 230,222 L 220,248 M 260,212 L 245,240" stroke="currentColor" strokeWidth="2" className="opacity-45" />

      {/* Receiver Feed Horn */}
      <rect x="192" y="125" width="16" height="12" rx="2" fill="currentColor" className="opacity-80" />
      <polygon points="190,125 210,125 200,105" fill="currentColor" className="opacity-90" />

      {/* Radio Transmission Waves (emanating from feed to the stars) */}
      <motion.path
        d="M 200,100 A 15,15 0 0,1 200,70"
        stroke="#7CB8E4"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.9, 1.2, 0.9] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M 200,90 A 25,25 0 0,1 200,50"
        stroke="#7CB8E4"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        animate={{ opacity: [0, 0.8, 0], scale: [0.85, 1.3, 0.85] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5, ease: "easeInOut" }}
      />
    </motion.g>
  </motion.svg>
);

/* ==================================================================
   2. OPTICAL TELESCOPE SVG (Keck style tracking with laser beam)
   ================================================================== */
const OpticalTelescope = () => (
  <motion.svg
    className="w-full h-full text-text-primary/70 filter drop-shadow-[0_12px_40px_rgba(245,158,11,0.08)]"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Celestial background */}
    <circle cx="300" cy="90" r="2.5" fill="#FFFDE7" className="animate-pulse" />
    <circle cx="80" cy="110" r="1.5" fill="currentColor" className="opacity-45" />
    <circle cx="210" cy="60" r="1" fill="currentColor" className="opacity-30" />

    {/* Ground hill base */}
    <path d="M 40,350 Q 200,335 360,350 L 360,380 L 40,380 Z" fill="currentColor" className="opacity-[0.06]" />

    {/* Telescope Mount */}
    <path d="M 160,345 L 240,345 L 225,260 L 175,260 Z" fill="currentColor" className="opacity-20" />
    <rect x="180" y="315" width="40" height="30" rx="3" fill="currentColor" className="opacity-30" />
    <circle cx="200" cy="250" r="14" fill="currentColor" className="opacity-40" />

    {/* Pivoting Optical Tube Assembly */}
    <motion.g
      style={{ originX: "200px", originY: "250px" }}
      animate={{ rotate: [-10, 8, -10] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
    >
      {/* Primary Mirror Cell (Bottom) */}
      <rect x="160" y="225" width="80" height="25" rx="5" fill="currentColor" className="opacity-80" />
      <path d="M 170,225 L 230,225 L 220,205 L 180,205 Z" fill="currentColor" className="opacity-90" />

      {/* Open Truss Structures */}
      <line x1="175" y1="205" x2="185" y2="120" stroke="currentColor" strokeWidth="2.5" className="opacity-50" />
      <line x1="225" y1="205" x2="215" y2="120" stroke="currentColor" strokeWidth="2.5" className="opacity-50" />
      <line x1="190" y1="205" x2="215" y2="120" stroke="currentColor" strokeWidth="1" className="opacity-30" />
      <line x1="210" y1="205" x2="185" y2="120" stroke="currentColor" strokeWidth="1" className="opacity-30" />

      {/* Top Ring / Secondary Mirror Cage */}
      <rect x="180" y="105" width="40" height="15" rx="2" fill="currentColor" className="opacity-75" />
      <circle cx="200" cy="112.5" r="4" fill="currentColor" className="opacity-90" />

      {/* Laser Guide Star (glowing cyan beam shooting out to the stars) */}
      <motion.line
        x1="200"
        y1="105"
        x2="200"
        y2="-50"
        stroke="#22D3EE"
        strokeWidth="2.5"
        className="opacity-75"
        strokeLinecap="round"
        animate={{ strokeWidth: [1.8, 3.2, 1.8], opacity: [0.6, 0.95, 0.6] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      {/* Inner bright laser core */}
      <line x1="200" y1="105" x2="200" y2="-50" stroke="#FFFFFF" strokeWidth="0.8" className="opacity-90" />
    </motion.g>
  </motion.svg>
);

/* ==================================================================
   3. SPACE TELESCOPE SVG (Hubble floating weightlessly)
   ================================================================== */
const SpaceTelescope = () => (
  <motion.svg
    className="w-full h-full text-text-primary/70 filter drop-shadow-[0_12px_40px_rgba(59,130,246,0.08)]"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Floating deep space background */}
    <circle cx="80" cy="80" r="1.5" fill="#FFFDE7" className="animate-pulse" />
    <circle cx="320" cy="280" r="1" fill="currentColor" className="opacity-45" />
    <circle cx="110" cy="260" r="2.5" fill="#E3F2FD" className="opacity-60" />
    <circle cx="280" cy="90" r="2" fill="currentColor" className="opacity-30" />

    {/* Faint distant planet */}
    <circle cx="70" cy="190" r="18" fill="currentColor" className="opacity-[0.04]" />
    <circle cx="70" cy="190" r="14" fill="currentColor" className="opacity-[0.08]" />

    {/* Hubble-like Cylinder Body (Floating weightlessly) */}
    <motion.g
      animate={{
        y: [-10, 10, -10],
        rotate: [-4, 4, -4],
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "easeInOut",
      }}
      style={{ originX: "200px", originY: "200px" }}
    >
      {/* Main telescope body (metallic cylinders) */}
      <rect x="140" y="150" width="120" height="60" rx="6" fill="currentColor" className="opacity-60" transform="rotate(-25 200 180)" />
      <rect x="110" y="155" width="40" height="50" rx="3" fill="currentColor" className="opacity-75" transform="rotate(-25 200 180)" />
      {/* Metallic shiny rim */}
      <rect x="100" y="160" width="10" height="40" rx="1.5" fill="currentColor" className="opacity-90" transform="rotate(-25 200 180)" />

      {/* Open Hatch Cover */}
      <rect x="88" y="130" width="6" height="35" rx="1" fill="currentColor" className="opacity-50" transform="rotate(35 100 160)" />

      {/* Golden Primary Mirror Reflection inside barrel */}
      <ellipse cx="120" cy="180" rx="4" ry="12" fill="#FBBF24" className="opacity-80 animate-pulse" transform="rotate(-25 200 180)" />

      {/* Extended Solar Panels (Blue grids) */}
      <g transform="rotate(-25 200 180)">
        {/* Upper solar panel */}
        <line x1="200" y1="150" x2="200" y2="70" stroke="currentColor" strokeWidth="3" />
        <rect x="175" y="70" width="50" height="65" rx="2" fill="#1E40AF" className="opacity-70 stroke-accent-primary" strokeWidth="0.8" />
        {/* Panel lines */}
        <line x1="175" y1="92" x2="225" y2="92" stroke="#60A5FA" strokeWidth="0.5" className="opacity-50" />
        <line x1="175" y1="114" x2="225" y2="114" stroke="#60A5FA" strokeWidth="0.5" className="opacity-50" />
        <line x1="200" y1="70" x2="200" y2="135" stroke="#60A5FA" strokeWidth="0.5" className="opacity-40" />

        {/* Lower solar panel */}
        <line x1="200" y1="210" x2="200" y2="290" stroke="currentColor" strokeWidth="3" />
        <rect x="175" y="225" width="50" height="65" rx="2" fill="#1E40AF" className="opacity-70 stroke-accent-primary" strokeWidth="0.8" />
        {/* Panel lines */}
        <line x1="175" y1="247" x2="225" y2="247" stroke="#60A5FA" strokeWidth="0.5" className="opacity-50" />
        <line x1="175" y1="269" x2="225" y2="269" stroke="#60A5FA" strokeWidth="0.5" className="opacity-50" />
        <line x1="200" y1="225" x2="200" y2="290" stroke="#60A5FA" strokeWidth="0.5" className="opacity-40" />

        {/* Communications Antenna */}
        <line x1="240" y1="180" x2="285" y2="210" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 280,202 Q 295,212 285,225" stroke="currentColor" strokeWidth="2" fill="none" />
      </g>
    </motion.g>
  </motion.svg>
);

/* ==================================================================
   4. LAPTOP WITH WRITING CODE (Typing code lines)
   ================================================================== */
const LaptopCode = () => (
  <motion.svg
    className="w-full h-full text-text-primary/70 filter drop-shadow-[0_12px_40px_rgba(16,185,129,0.08)]"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background stardust stars */}
    <circle cx="90" cy="90" r="1" fill="currentColor" className="opacity-30" />
    <circle cx="310" cy="110" r="2" fill="#E3F2FD" />
    <circle cx="280" cy="70" r="1.5" fill="#FFFDE7" className="animate-pulse" />

    {/* Floating magical code sparks floating up from the laptop */}
    <motion.circle cx="160" cy="150" r="2" fill="#D4A0C0" animate={{ y: [-50, -120], x: [0, -15], opacity: [0, 0.8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeOut" }} />
    <motion.circle cx="240" cy="130" r="1.5" fill="#7CB8E4" animate={{ y: [-30, -90], x: [0, 20], opacity: [0, 0.9, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 1, ease: "easeOut" }} />
    <motion.circle cx="200" cy="160" r="2.5" fill="#FBBF24" animate={{ y: [-40, -110], x: [0, 5], opacity: [0, 0.85, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 0.5, ease: "easeOut" }} />

    {/* Laptop Structure */}
    <g>
      {/* Open Laptop Screen Frame */}
      <rect x="100" y="140" width="200" height="130" rx="10" fill="currentColor" className="opacity-80" />
      {/* Glow behind screen */}
      <rect x="106" y="146" width="188" height="118" rx="6" className="fill-background/40 stroke-card-border/40" strokeWidth="0.5" />
      {/* Screen inner area (Linux terminal vibe) */}
      <rect x="108" y="148" width="184" height="114" rx="4" className="fill-background-secondary/80" />

      {/* Code lines on screen - animating their widths for typing effect */}
      {/* Line 1: import ... */}
      <motion.rect
        x="120" y="162" height="4" rx="1" fill="#7CB8E4"
        initial={{ width: 0 }}
        animate={{ width: 65 }}
        transition={{ repeat: Infinity, duration: 3, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Line 2: const stars = () => { */}
      <motion.rect
        x="120" y="174" height="4" rx="1" fill="#D4A0C0"
        initial={{ width: 0 }}
        animate={{ width: 110 }}
        transition={{ repeat: Infinity, duration: 3.2, delay: 0.2, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Line 3:   return universe.map(star => ( */}
      <motion.rect
        x="132" y="186" height="4" rx="1" fill="#7CB8E4"
        initial={{ width: 0 }}
        animate={{ width: 130 }}
        transition={{ repeat: Infinity, duration: 3.5, delay: 0.4, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Line 4:     <Star key={star.id} twinkle={true} /> */}
      <motion.rect
        x="144" y="198" height="4" rx="1" fill="#FBBF24"
        initial={{ width: 0 }}
        animate={{ width: 125 }}
        transition={{ repeat: Infinity, duration: 3.8, delay: 0.6, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Line 5:   )); */}
      <motion.rect
        x="132" y="210" height="4" rx="1" fill="#7CB8E4"
        initial={{ width: 0 }}
        animate={{ width: 35 }}
        transition={{ repeat: Infinity, duration: 3.2, delay: 0.8, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Line 6: }; */}
      <motion.rect
        x="120" y="222" height="4" rx="1" fill="#D4A0C0"
        initial={{ width: 0 }}
        animate={{ width: 15 }}
        transition={{ repeat: Infinity, duration: 3.0, delay: 1.0, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Blinking typing cursor next to Line 6 */}
      <motion.rect
        x="140" y="220" width="2.5" height="7" fill="#7CB8E4"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />

      {/* Laptop Bottom Body (Keyboard base) */}
      <path d="M 80,270 L 320,270 L 335,285 C 335,289 315,292 270,292 L 130,292 C 85,292 65,289 65,285 Z" fill="currentColor" className="opacity-95" />
      {/* Keyboard profile indentation */}
      <polygon points="105,274 295,274 290,283 110,283" fill="currentColor" className="opacity-[0.12]" />
      {/* Trackpad */}
      <rect x="175" y="284" width="50" height="7" rx="1.5" fill="currentColor" className="opacity-20" />
    </g>
  </motion.svg>
);

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Automate the cycle between the four SVGs in the visual container
  useEffect(() => {
    const interval = setInterval(() => {
      setVisualIndex((prev) => (prev + 1) % 4);
    }, 5500);
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
        staggerChildren: 0.25,
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
        ease: [0.25, 0.1, 0.25, 1.0] as const,
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
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-text-primary leading-[1.1]"
          >
            Hello, I'm{" "}
            <span className="text-accent-primary relative inline-block transition-all duration-300 hover:text-accent-secondary">
              Akhil Jaini
            </span>
          </motion.h1>

          {/* Rotating Subtitle / Role Tagline */}
          <motion.div
            variants={itemVariants}
            className="h-10 sm:h-12 flex items-center overflow-hidden text-lg sm:text-2xl font-semibold text-accent-secondary"
          >
            <span className="mr-2.5 font-sans font-medium text-text-secondary">Astrophysicist & Data Scientist</span>
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
            I'm a computational astrophysicist who loves building things with data—from discovering cosmic transients to developing software, models, and pipelines that solve complex real world problems.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection("#research")}
              className="px-6 py-3 rounded-full bg-accent-primary/80 hover:bg-accent-primary text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-accent-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer outline-none"
            >
              See My Work
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="px-6 py-3 rounded-full border border-card-border/80 bg-card-bg/20 text-text-primary hover:bg-card-bg/35 font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-sm outline-none"
            >
              Say Hello!
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Whimsical Rotating Science Visuals */}
        <div className="lg:col-span-5 flex items-center justify-center relative select-none">
          <div className="w-72 h-72 sm:w-96 sm:h-96 relative z-10 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={visualIndex}
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="w-full h-full flex items-center justify-center"
              >
                {visualIndex === 0 && <RadioTelescope />}
                {visualIndex === 1 && <OpticalTelescope />}
                {visualIndex === 2 && <SpaceTelescope />}
                {visualIndex === 3 && <LaptopCode />}
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="flex gap-2.5 mt-4 relative z-30 select-none pointer-events-auto">
              {[0, 1, 2, 3].map((idx) => {
                const label = ["Radio Dish", "Optical Scope", "Space Scope", "Coding Laptop"][idx];
                return (
                  <button
                    key={idx}
                    onClick={() => setVisualIndex(idx)}
                    title={`View ${label}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${visualIndex === idx
                      ? "bg-accent-primary scale-110 w-4 shadow-sm"
                      : "bg-text-secondary/25 hover:bg-text-secondary/50"
                      }`}
                    aria-label={`Show ${label}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
