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
    
    // Accessibility check: reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;
      
    if (prefersReducedMotion || resolvedTheme !== "dark") return;

    // Trigger random shooting stars at organic intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.45) {
        const newStar: ShootingStar = {
          id: Date.now(),
          startX: Math.random() * (window.innerWidth - 300) + 100,
          startY: Math.random() * (window.innerHeight / 2.5),
          angle: Math.random() * 12 + 25, // 25 to 37 degrees fall
          length: Math.random() * 140 + 70,
          duration: Math.random() * 0.7 + 0.5,
        };
        // Cap the number of shooting stars to save resources
        setShootingStars((prev) => [...prev.slice(-2), newStar]);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [resolvedTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Dynamic Ambient Nebulas / Light-Mode Sunbeams */}
      {isDark ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(192,132,252,0.06)_0%,transparent_50%),radial-gradient(circle_at_80%_65%,rgba(125,211,252,0.05)_0%,transparent_50%)]" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
      )}

      {/* Slowly drifting clouds / cosmic stardust layers */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 160, ease: "linear" }}
          className="absolute top-[8%] left-0 w-[200%] h-[30%] flex items-center justify-around"
        >
          {/* Cloud SVG Elements using highly optimized, blurry SVGs */}
          <svg className="w-80 h-28 text-background-secondary/20 fill-current blur-md" viewBox="0 0 100 100">
            <path d="M10 80 Q 25 50 40 70 Q 55 45 70 65 Q 85 55 90 80 Z" />
          </svg>
          <svg className="w-96 h-20 text-background-secondary/15 fill-current blur-lg" viewBox="0 0 100 100">
            <path d="M10 80 Q 30 60 50 75 Q 70 55 90 80 Z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{ x: ["-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 220, ease: "linear" }}
          className="absolute bottom-[18%] left-0 w-[200%] h-[25%] flex items-center justify-around"
        >
          <svg className="w-96 h-24 text-background-secondary/15 fill-current blur-lg" viewBox="0 0 100 100">
            <path d="M10 80 Q 25 55 45 75 Q 65 50 90 80 Z" />
          </svg>
          <svg className="w-[480px] h-32 text-background-secondary/20 fill-current blur-xl" viewBox="0 0 100 100">
            <path d="M10 80 Q 25 45 45 65 Q 65 35 90 80 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Shooting Stars layer (Dark Mode only) */}
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
                  x: star.startX + deltaX * 2.2,
                  y: star.startY + deltaY * 2.2,
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 0.4, 0.1],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: star.duration, ease: "easeOut" }}
                className="absolute w-[2px] h-[2px] bg-white rounded-full"
                style={{
                  transformOrigin: "left center",
                  boxShadow: `0 0 8px 1px #7dd3fc, 0 0 16px 2px #fff`,
                }}
              >
                {/* Shooting Star streak vector tail */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white to-transparent opacity-65"
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
  );
}
