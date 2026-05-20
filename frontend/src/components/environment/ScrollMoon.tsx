"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ScrollMoon() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => setMounted(true), []);

  // Map scroll progress (0 to 1) to moon phase index (0 to 7)
  const phaseIndex = useTransform(scrollYProgress, (progress) => {
    return Math.min(7, Math.floor(progress * 8));
  });

  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    return phaseIndex.onChange((v) => setCurrentPhase(v));
  }, [phaseIndex]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  // Scientific Moon Phase Labels
  const phaseLabels = [
    "New Moon",
    "Waxing Crescent",
    "First Quarter",
    "Waxing Gibbous",
    "Full Moon",
    "Waning Gibbous",
    "Third Quarter",
    "Waning Crescent",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="fixed right-6 top-24 z-40 hidden md:flex flex-col items-center gap-2 pointer-events-none select-none"
    >
      <div className="relative w-14 h-14 rounded-full glass border border-card-border flex items-center justify-center p-2 shadow-xl backdrop-blur-md">
        {isDark ? (
          /* Dark Mode: Scroll-Reactive Moon Phase Eclipse */
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-950 border border-slate-900">
            {/* Glowing Moon Base */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 via-yellow-50 to-white shadow-[0_0_12px_rgba(254,252,232,0.9)] rounded-full" />
            
            {/* Shifting Shadow Eclipse Circle */}
            <motion.div
              style={{
                x: useTransform(scrollYProgress, (progress) => {
                  // Standardizes eclipse X offset: 
                  // 0 (New Moon) -> centered shadow
                  // 0.5 (Full Moon) -> shadow completely shifted right
                  // 1.0 (New Moon) -> centered shadow again
                  const offset = progress <= 0.5
                    ? progress * 200 // moves from 0% to 100%
                    : (2 - progress * 2) * 100; // moves from 100% to 0%
                  return `${offset - 100}%`;
                }),
              }}
              className="absolute inset-0 bg-slate-950/85 rounded-full"
            />
          </div>
        ) : (
          /* Light Mode: Spinning Sun Astrolabe */
          <motion.div
            style={{
              rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
            }}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] flex items-center justify-center relative"
          >
            <div className="absolute inset-0 border border-dashed border-amber-200/50 rounded-full scale-125 animate-spin-slow" />
            <div className="w-5 h-5 rounded-full bg-amber-100" />
          </motion.div>
        )}
      </div>
      
      {/* Phase Label Display */}
      <div className="glass px-2 py-0.5 rounded-full border border-card-border/80 text-[8px] font-medium text-text-secondary tracking-widest uppercase backdrop-blur-md shadow-sm">
        {isDark ? phaseLabels[currentPhase] : "Sol Progress"}
      </div>
    </motion.div>
  );
}
