"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  duration: number;
}

export default function Atmosphere() {
  const { resolvedTheme } = useTheme();
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const prefersReducedMotion = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    if (prefersReducedMotion || resolvedTheme !== "dark") return;

    // Shooting stars at rare, organic intervals (every 10-15 seconds)
    // Slower, dreamier, and with warmer tails
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const newStar: ShootingStar = {
          id: Date.now(),
          startX: Math.random() * (window.innerWidth - 400) + 100,
          startY: Math.random() * (window.innerHeight / 3),
          angle: Math.random() * 10 + 20, // gentle angle: 20 to 30 degrees
          length: Math.random() * 120 + 80, // longer elegant streaks
          duration: Math.random() * 1.0 + 2.0, // slower: 2 to 3 seconds
        };
        setShootingStars((prev) => [...prev.slice(-1), newStar]); // keep only 1-2 active
      }
    }, 13000);

    return () => clearInterval(interval);
  }, [resolvedTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  // Cloud styling classes
  const cloudColorClass = isDark
    ? "text-slate-300 fill-current"
    : "text-orange-100 fill-current";

  return (
    <>
      {/* Background Atmosphere Layers (z-index: -10) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        
        {/* 1. Moonlight / Sunlight radial halo (emanating from top-right) */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(ellipse at 82% 20%, rgba(224, 242, 254, 0.12) 0%, rgba(192, 132, 252, 0.04) 35%, transparent 70%)"
          }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            !isDark ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(ellipse at 82% 20%, rgba(254, 243, 199, 0.28) 0%, rgba(251, 146, 60, 0.08) 35%, transparent 70%)"
          }}
        />

        {/* 2. Global background nebula / ambient lights */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${
            isDark ? "opacity-35" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 20% 60%, rgba(147, 51, 234, 0.03) 0%, transparent 60%), radial-gradient(circle at 50% 10%, rgba(56, 189, 248, 0.03) 0%, transparent 55%)"
          }}
        />

        {/* 3. Deep ground haze simulating twilight field horizon */}
        <div
          className={`absolute inset-x-0 bottom-0 h-64 transition-opacity duration-[1500ms] ${
            isDark ? "opacity-85" : "opacity-60"
          }`}
          style={{
            background: isDark
              ? "linear-gradient(to top, rgba(11, 14, 26, 0.85) 0%, rgba(11, 14, 26, 0.4) 40%, transparent 100%)"
              : "linear-gradient(to top, rgba(253, 237, 219, 0.7) 0%, rgba(253, 237, 219, 0.3) 40%, transparent 100%)"
          }}
        />

        {/* 4. Background Cloud Layers (Layers 1, 2, 3) */}
        
        {/* Layer 1 (Far Background): Huge, blur-3xl, opacity-12, slow 200s, right-to-left */}
        <motion.div
          animate={{ x: ["50vw", "-100vw"] }}
          transition={{ repeat: Infinity, duration: 200, ease: "linear" }}
          className="absolute top-[5%] left-0 w-[600px] h-[200px] opacity-[0.12] blur-3xl"
        >
          <svg className={`w-full h-full ${cloudColorClass}`} viewBox="0 0 500 200">
            <path d="M 50,150 C 50,100 90,80 130,90 C 160,50 240,40 290,80 C 330,50 400,70 410,120 C 440,120 470,140 460,170 C 430,190 80,190 50,150 Z" />
          </svg>
        </motion.div>

        {/* Layer 2 (Mid-Background): Large, blur-2xl, opacity-18, medium-slow 120s, left-to-right */}
        <motion.div
          animate={{ x: ["-60vw", "100vw"] }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          className="absolute top-[25%] left-0 w-[450px] h-[160px] opacity-[0.18] blur-2xl"
        >
          <svg className={`w-full h-full ${cloudColorClass}`} viewBox="0 0 350 150">
            <path d="M 30,110 C 30,80 60,60 90,70 C 110,35 170,30 200,60 C 230,40 280,50 290,90 C 310,95 330,110 320,130 C 290,145 60,145 30,110 Z" />
          </svg>
        </motion.div>

        {/* Layer 3 (Mid-ground): Medium, blur-xl, opacity-25, medium 80s, right-to-left */}
        <motion.div
          animate={{ x: ["60vw", "-80vw"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute bottom-[30%] left-0 w-[350px] h-[130px] opacity-[0.25] blur-xl"
        >
          <svg className={`w-full h-full ${cloudColorClass}`} viewBox="0 0 250 120">
            <path d="M 20,80 C 20,60 40,45 65,50 C 80,25 125,20 145,45 C 165,30 205,40 210,70 C 225,75 235,85 230,100 C 210,110 40,110 20,80 Z" />
          </svg>
        </motion.div>

        {/* 5. Shooting Stars (Dark Mode only) */}
        {isDark && (
          <AnimatePresence>
            {shootingStars.map((star) => {
              const angleRad = (star.angle * Math.PI) / 180;
              const deltaX = Math.cos(angleRad) * star.length;
              const deltaY = Math.sin(angleRad) * star.length;

              return (
                <motion.div
                  key={star.id}
                  initial={{
                    x: star.startX,
                    y: star.startY,
                    opacity: 0,
                    scale: 0.1,
                  }}
                  animate={{
                    x: star.startX + deltaX * 2.5,
                    y: star.startY + deltaY * 2.5,
                    opacity: [0, 0.85, 0.85, 0],
                    scale: [0.6, 1.1, 0.5, 0.1],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: star.duration, ease: "easeInOut" }}
                  className="absolute w-[2px] h-[2px] bg-amber-100 rounded-full"
                  style={{
                    transformOrigin: "left center",
                    boxShadow: `0 0 6px 1.5px rgba(254, 240, 138, 0.45), 0 0 12px 3px rgba(255, 255, 255, 0.8)`,
                  }}
                >
                  {/* Slow elegant soft-amber trail streak */}
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-amber-100/70 to-transparent"
                    style={{
                      width: `${star.length}px`,
                      height: "1px",
                      transform: `rotate(${star.angle}deg)`,
                      transformOrigin: "right center",
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Foreground Cloud Layer (Layer 4) (z-index: 25 - floats in FRONT of headings) */}
      <div className="fixed inset-0 z-25 overflow-hidden pointer-events-none select-none">
        <motion.div
          animate={{ x: ["-50vw", "100vw"] }}
          transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          className="absolute bottom-[10%] left-0 w-[300px] h-[120px] opacity-[0.30] blur-lg"
        >
          <svg className={`w-full h-full ${cloudColorClass}`} viewBox="0 0 250 100">
            <path d="M 20,70 C 20,50 40,35 60,40 C 75,20 115,15 130,35 C 150,20 185,30 190,55 C 205,60 215,70 210,85 C 190,95 40,95 20,70 Z" />
          </svg>
        </motion.div>
      </div>
    </>
  );
}
