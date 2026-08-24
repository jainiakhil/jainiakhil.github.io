"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";

export default function ScrollMoon() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const [animationData, setAnimationData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  // Dynamic Moon Phases Lottie asset fetch to optimize Turbopack loading
  useEffect(() => {
    fetch("/Moon Phases.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Moon Phases.json");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading Moon Lottie file:", err));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Synchronize Lottie moon frames to exact scroll progress
  useEffect(() => {
    if (!lottieRef.current || !animationData) return;

    const currentProgress = scrollYProgress.get();
    const totalFrames = lottieRef.current.getDuration(true) || 100;
    lottieRef.current.goToAndStop(currentProgress * totalFrames, true);

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const total = lottieRef.current?.getDuration(true) || 100;
      lottieRef.current?.goToAndStop(progress * total, true);
    });

    return () => unsubscribe();
  }, [scrollYProgress, animationData]);

  // Slower scroll rotation: only [0, 60] degrees for a barely perceptible movement
  const celestialRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Scroll-synchronized opacities for the triple-layer moon glow in dark mode
  // Goes from full brightness (scroll = 0%) to almost invisible (scroll = 50%) and back to full (scroll = 100%)
  const moonGlow1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.80, 0.04, 0.80]);
  const moonGlow2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.02, 0.55]);
  const moonGlow3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.30, 0.01, 0.30]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      // Dreamier, slower spring entrance
      transition={{ type: "spring", stiffness: 35, damping: 18, delay: 0.2 }}
      // Positioned higher, clearly visible, shifted 7% right and 12% upwards to prevent overlapping site elements
      className="fixed right-2 top-10 sm:right-8 sm:top-14 z-40 pointer-events-none select-none translate-x-[7%] -translate-y-[12%]"
    >
      <div className="w-[110px] h-[110px] sm:w-[270px] sm:h-[270px] rounded-full flex items-center justify-center relative pointer-events-none">
        {/* TRIPLE-LAYER GLOW SYSTEM (Purely ambient, non-blocking) */}
        
        {/* Layer 1: Inner tight, bright glow (45px blur) */}
        <motion.div 
          style={{ opacity: isDark ? moonGlow1 : 0.80 }}
          className={`absolute inset-3 sm:inset-8 rounded-full pointer-events-none transition-[background-color,box-shadow] duration-[1200ms] ease-out blur-[16px] sm:blur-[38px] ${
            isDark 
              ? "bg-sky-300/30 shadow-[0_0_18px_rgba(224,242,254,0.4)] sm:shadow-[0_0_38px_rgba(224,242,254,0.4)]"
              : "bg-amber-300/40 shadow-[0_0_20px_rgba(254,240,138,0.5)] sm:shadow-[0_0_42px_rgba(254,240,138,0.5)]"
          }`} 
        />

        {/* Layer 2: Mid bloom (120px blur, medium opacity) */}
        <motion.div 
          style={{ opacity: isDark ? moonGlow2 : 0.55 }}
          className={`absolute -inset-2 sm:-inset-3 rounded-full pointer-events-none transition-[background-color] duration-[1200ms] ease-out blur-[40px] sm:blur-[100px] ${
            isDark 
              ? "bg-sky-400/20"
              : "bg-orange-400/25"
          }`} 
        />

        {/* Layer 3: Outer atmospheric wash (240px blur, extremely subtle, extends far) */}
        <motion.div 
          style={{ opacity: isDark ? moonGlow3 : 0.30 }}
          className={`absolute -inset-6 sm:-inset-20 rounded-full pointer-events-none transition-[background-color] duration-[1200ms] ease-out blur-[80px] sm:blur-[200px] ${
            isDark 
              ? "bg-indigo-500/12"
              : "bg-amber-500/15"
          }`} 
        />

        {/* 
          Clickable Celestial Body:
          Reduced by 15% (w-[68px]/sm:w-[190px]) and strictly bounded to the Sun/Moon disk.
        */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="w-[68px] h-[68px] sm:w-[190px] sm:h-[190px] rounded-full flex items-center justify-center relative cursor-pointer pointer-events-auto outline-none focus:outline-none transition-opacity duration-300 hover:opacity-95 active:scale-98 z-10"
          aria-label="Toggle Celestial Cycle (Day/Night)"
          title="Toggle Day / Night Mode"
        >
          <motion.div
            style={{ rotate: celestialRotate }}
            className="w-full h-full relative flex items-center justify-center pointer-events-none"
          >
            {isDark ? (
              /* 
                NIGHT: Illustrated Lottie Moon Phases
              */
              animationData ? (
                <div className="w-full h-full filter drop-shadow-[0_0_12px_rgba(224,242,254,0.45)] relative overflow-hidden pointer-events-none select-none">
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    loop={false}
                    autoplay={false}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ) : (
                /* Fallback glowing circle during loading to prevent layout shifts */
                <div className="w-full h-full rounded-full bg-sky-100/10 animate-pulse filter drop-shadow-[0_0_12px_rgba(224,242,254,0.45)]" />
              )
            ) : (
              /* 
                DAY: Cozy Ghibli-esque Sun with super slow rays
              */
              <svg 
                className="w-full h-full filter drop-shadow-[0_0_15px_rgba(251,146,60,0.45)]"
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
      </div>
    </motion.div>
  );
}
