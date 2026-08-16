"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
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
  const [modalActive, setModalActive] = useState(false);

  // Sunset transition states
  const prevThemeRef = useRef<string | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 1. MutationObserver to track active modals on the body and pause spawns
  useEffect(() => {
    setModalActive(document.body.classList.contains("modal-open"));

    const observer = new MutationObserver(() => {
      setModalActive(document.body.classList.contains("modal-open"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 2. Track theme changes and trigger 2-second sunset/twilight evening sky overlay
  useEffect(() => {
    if (!resolvedTheme) return;
    const prevTheme = prevThemeRef.current;
    if (prevTheme !== undefined && resolvedTheme !== prevTheme) {
      // Theme has toggled! Trigger transition
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 2000); // exactly 2.0 seconds
      prevThemeRef.current = resolvedTheme;
      return () => clearTimeout(timer);
    } else {
      prevThemeRef.current = resolvedTheme;
    }
  }, [resolvedTheme]);

  // 3. Spawning shooting stars organically during dark mode
  useEffect(() => {
    setMounted(true);

    const prefersReducedMotion = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    if (prefersReducedMotion || resolvedTheme !== "dark") return;

    // Shooting stars at rare, organic intervals (every 10-15 seconds)
    // Slower, dreamier, and with warmer tails
    const interval = setInterval(() => {
      // Don't spawn new shooting stars if modal is active
      if (document.body.classList.contains("modal-open")) return;

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

  return (
    <>
      {/* Shared SVG Linear Gradients Definition (Hidden) */}
      <svg className="absolute w-0 h-0 pointer-events-none select-none" aria-hidden="true">
        <defs>
          {/* Gradient for Cloud 1 (pointing from top-right light source to bottom-left shadow) */}
          <linearGradient id="cloudGrad-1" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cloud-glow-start)" stopOpacity="0.80" />
            <stop offset="60%" stopColor="var(--cloud-glow-mid)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--cloud-glow-end)" stopOpacity="0.30" />
          </linearGradient>
          {/* Gradient for Cloud 2 */}
          <linearGradient id="cloudGrad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cloud-glow-start)" stopOpacity="0.85" />
            <stop offset="55%" stopColor="var(--cloud-glow-mid)" stopOpacity="0.60" />
            <stop offset="100%" stopColor="var(--cloud-glow-end)" stopOpacity="0.35" />
          </linearGradient>
          {/* Gradient for Cloud 3 */}
          <linearGradient id="cloudGrad-3" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cloud-glow-start)" stopOpacity="0.90" />
            <stop offset="50%" stopColor="var(--cloud-glow-mid)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--cloud-glow-end)" stopOpacity="0.40" />
          </linearGradient>
          {/* Gradient for Cloud 4 */}
          <linearGradient id="cloudGrad-4" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--cloud-glow-start)" stopOpacity="0.95" />
            <stop offset="50%" stopColor="var(--cloud-glow-mid)" stopOpacity="0.70" />
            <stop offset="100%" stopColor="var(--cloud-glow-end)" stopOpacity="0.45" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Atmosphere Layers (z-index: z-[2] - sits above stars but below content) */}
      <div className="fixed inset-0 z-[2] overflow-hidden pointer-events-none select-none">
        
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

        {/* 4. Background Cloud Layers (Layers 1 & 2) */}
        
        {/* Layer 1 (Far Background): Huge, edge-blur (blur-[6px]), slow 220s, left-to-right */}
        <div className="absolute top-[6%] left-0 w-[450px] sm:w-[600px] h-[150px] sm:h-[200px] blur-[6px] animate-cloud-drift-far">
          <svg className="w-full h-full" viewBox="0 0 500 200">
            <path d="M 50,150 C 50,100 90,80 130,90 C 160,50 240,40 290,80 C 330,50 400,70 410,120 C 440,120 470,140 460,170 C 430,190 80,190 50,150 Z" fill="url(#cloudGrad-1)" />
          </svg>
        </div>

        {/* Layer 2 (Mid-Background): Large, edge-blur (blur-[5px]), medium-slow 140s, left-to-right */}
        <div className="absolute top-[18%] left-0 w-[350px] sm:w-[450px] h-[120px] sm:h-[160px] blur-[5px] animate-cloud-drift-mid">
          <svg className="w-full h-full" viewBox="0 0 350 150">
            <path d="M 30,110 C 30,80 60,60 90,70 C 110,35 170,30 200,60 C 230,40 280,50 290,90 C 310,95 330,110 320,130 C 290,145 60,145 30,110 Z" fill="url(#cloudGrad-2)" />
          </svg>
        </div>

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

      {/* Foreground Cloud Layer 3 (z-index: z-[25] - passes in FRONT of headings but BEHIND moon/sun) */}
      <div className="fixed inset-0 z-[25] overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[10%] left-0 w-[260px] sm:w-[350px] h-[100px] sm:h-[130px] blur-[4px] animate-cloud-drift-near">
          <svg className="w-full h-full" viewBox="0 0 250 120">
            <path d="M 20,80 C 20,60 40,45 65,50 C 80,25 125,20 145,45 C 165,30 205,40 210,70 C 225,75 235,85 230,100 C 210,110 40,110 20,80 Z" fill="url(#cloudGrad-3)" />
          </svg>
        </div>
      </div>

      {/* Super Foreground Cloud Layer 4 (z-index: z-[45] - passes in FRONT of the moon/sun z-40!) */}
      <div className="fixed inset-0 z-[45] overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[14%] left-0 w-[220px] sm:w-[300px] h-[90px] sm:h-[120px] blur-[3px] animate-cloud-drift-super">
          <svg className="w-full h-full" viewBox="0 0 250 100">
            <path d="M 20,70 C 20,50 40,35 60,40 C 75,20 115,15 130,35 C 150,20 185,30 190,55 C 205,60 215,70 210,85 C 190,95 40,95 20,70 Z" fill="url(#cloudGrad-4)" />
          </svg>
        </div>
      </div>

      {/* Day/Night Sunset Transition Overlay (z-index z-[1.5] - sits above stars, below clouds) */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[1] evening-sky-gradient evening-sky-transition pointer-events-none" />
      )}
    </>
  );
}
