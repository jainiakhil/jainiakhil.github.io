"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ScrollMoon() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => setMounted(true), []);

  // Slower scroll rotation: only [0, 60] degrees for a barely perceptible movement
  const celestialRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      // Dreamier, slower spring entrance
      transition={{ type: "spring", stiffness: 35, damping: 18, delay: 0.2 }}
      // Positioned lower and clearly visible (below navbar, not tucked away in the corner)
      className="fixed right-4 top-20 sm:right-12 sm:top-24 z-40 pointer-events-none select-none"
    >
      {/* 
        Clickable Grand Celestial Body:
        Serves as the interactive theme switcher.
        No scaling hover/active states since it's a celestial body, not a button.
      */}
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="w-40 h-40 sm:w-52 sm:h-52 rounded-full flex items-center justify-center relative cursor-pointer pointer-events-auto outline-none focus:outline-none transition-opacity duration-300 hover:opacity-95"
        aria-label="Toggle Celestial Cycle (Day/Night)"
      >
        {/* TRIPLE-LAYER GLOW SYSTEM */}
        
        {/* Layer 1: Inner tight, bright glow (40px blur) */}
        <div 
          className={`absolute inset-6 rounded-full transition-all duration-[1200ms] ease-out blur-[30px] opacity-80 ${
            isDark 
              ? "bg-sky-300/30 shadow-[0_0_30px_rgba(224,242,254,0.4)]"
              : "bg-amber-300/40 shadow-[0_0_35px_rgba(254,240,138,0.5)]"
          }`} 
        />

        {/* Layer 2: Mid bloom (100px blur, medium opacity) */}
        <div 
          className={`absolute -inset-2 rounded-full transition-all duration-[1200ms] ease-out blur-[80px] opacity-55 ${
            isDark 
              ? "bg-sky-400/20"
              : "bg-orange-400/25"
          }`} 
        />

        {/* Layer 3: Outer atmospheric wash (200px blur, extremely subtle, extends far) */}
        <div 
          className={`absolute -inset-16 rounded-full transition-all duration-[1200ms] ease-out blur-[160px] opacity-30 ${
            isDark 
              ? "bg-indigo-500/12"
              : "bg-amber-500/15"
          }`} 
        />

        <motion.div
          style={{ rotate: celestialRotate }}
          className="w-full h-full relative flex items-center justify-center"
        >
          {isDark ? (
            /* 
              NIGHT: Illustrated Watercolor-Style Moon
            */
            <svg 
              className="w-28 h-28 sm:w-36 sm:h-36 filter drop-shadow-[0_0_12px_rgba(224,242,254,0.45)]"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Moon Spherical base - warm, soft watercolor glow */}
              <circle cx="50" cy="50" r="42" fill="url(#moonBodyGrad)" />
              
              {/* Illustrated soft craters - reduced contrast */}
              <circle cx="34" cy="36" r="6" fill="#64748B" className="opacity-[0.08]" />
              <circle cx="35" cy="37" r="4.5" fill="#334155" className="opacity-[0.10]" />
              
              <circle cx="62" cy="42" r="8" fill="#64748B" className="opacity-[0.08]" />
              <circle cx="60" cy="44" r="6" fill="#334155" className="opacity-[0.10]" />
              
              <circle cx="44" cy="65" r="4.5" fill="#64748B" className="opacity-[0.08]" />
              <circle cx="43" cy="66" r="3" fill="#334155" className="opacity-[0.10]" />
              
              <circle cx="56" cy="24" r="4" fill="#334155" className="opacity-[0.07]" />
              <circle cx="28" cy="56" r="5" fill="#334155" className="opacity-[0.07]" />

              {/* Magical Crescent Shadow Overlay - reduced opacity from 0.75 to 0.4 */}
              <path 
                d="M50 8 A42 42 0 1 0 92 50 A36 36 0 1 1 50 8" 
                fill="url(#moonShadowGrad)" 
                className="opacity-40"
              />

              {/* Gradient Definitions */}
              <defs>
                {/* Warm, soft cream-yellow base gradient */}
                <linearGradient id="moonBodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFD" />
                  <stop offset="45%" stopColor="#FFFDF0" />
                  <stop offset="100%" stopColor="#FAF7EB" />
                </linearGradient>
                {/* Soft, cool twilight shadow gradient */}
                <linearGradient id="moonShadowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.15" />
                  <stop offset="60%" stopColor="#0F172A" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0B0E1A" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            /* 
              DAY: Cozy Ghibli-esque Sun with super slow rays
            */
            <svg 
              className="w-28 h-28 sm:w-36 sm:h-36 filter drop-shadow-[0_0_15px_rgba(251,146,60,0.45)]"
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Extremely slow, gentle spin stylized rays */}
              <path 
                d="M50 0 L55 25 L80 15 L65 37 L95 32 L70 50 L95 68 L65 63 L80 85 L55 75 L50 100 L45 75 L20 85 L35 63 L5 68 L30 50 L5 32 L35 37 L20 15 L45 25 Z" 
                fill="url(#sunRaysGrad)" 
                className="opacity-[0.22] scale-105 origin-center animate-[spin_160s_linear_infinite]"
              />

              {/* Central glowing body */}
              <circle cx="50" cy="50" r="32" fill="url(#sunBodyGrad)" />
              
              {/* Soft interior warm layer */}
              <circle cx="50" cy="50" r="24" fill="#FFEFEF" className="opacity-40" />

              <defs>
                <linearGradient id="sunBodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFDF7" />
                  <stop offset="35%" stopColor="#FDE047" /> {/* Softer yellow */}
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
                <linearGradient id="sunRaysGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#F43F5E" /> {/* Rosy orange flare */}
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      </button>
    </motion.div>
  );
}
