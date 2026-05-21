"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  phase: number;
  driftSpeed: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Accessibility check: reduced motion
    const prefersReducedMotion = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

    const initStars = () => {
      stars = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Extreme density: Math.floor((width * height) / 300) on desktop and Math.floor((width * height) / 500) on mobile
      const density = w < 768
        ? Math.floor((w * h) / 500)
        : Math.floor((w * h) / 300);

      for (let i = 0; i < density; i++) {
        // Star sizes range from 0.3px to 1.0px MAX. 
        // 85% are 0.3-0.5px. 12% are 0.5-0.8px. 3% are 0.8-1.0px (bright stars).
        const sizeRand = Math.random();
        let size = 0.3;
        if (sizeRand < 0.85) {
          size = Math.random() * 0.2 + 0.3; // 0.3px - 0.5px
        } else if (sizeRand < 0.97) {
          size = Math.random() * 0.3 + 0.5; // 0.5px - 0.8px
        } else {
          size = Math.random() * 0.2 + 0.8; // 0.8px - 1.0px (bright stars)
        }

        // Color temperature variation: 15% pale yellow (#FFFDE7), 15% pale blue (#E3F2FD), 70% pure white (#FFFFFF)
        const colorRand = Math.random();
        let color = "#FFFFFF";
        if (colorRand < 0.15) {
          color = "#FFFDE7"; // warm pale yellow
        } else if (colorRand < 0.30) {
          color = "#E3F2FD"; // cool pale blue
        }

        // Organic twinkling speed: between 0.003 and 0.03
        const twinkleSpeed = Math.random() * 0.027 + 0.003;
        const phase = Math.random() * Math.PI * 2;
        
        // Warm golden pollen drift downward speed in light mode (very slow: 0.03px - 0.08px)
        const driftSpeed = Math.random() * 0.05 + 0.03;

        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          color,
          twinkleSpeed,
          phase,
          driftSpeed,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    // Listeners
    window.addEventListener("resize", handleResize);

    // Initialize
    initStars();

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = resolvedTheme === "dark";

      // 1. Draw Milky Way diagonal band (only in dark mode - very faint)
      if (isDark) {
        ctx.save();
        const gradient = ctx.createLinearGradient(0, height, width, 0);
        gradient.addColorStop(0, "rgba(56, 189, 248, 0.0)");
        gradient.addColorStop(0.35, "rgba(186, 104, 200, 0.015)"); // extremely faint violet
        gradient.addColorStop(0.5, "rgba(224, 242, 254, 0.035)");  // faint blue-white core
        gradient.addColorStop(0.65, "rgba(56, 189, 248, 0.012)");  // faint sky-blue edge
        gradient.addColorStop(1, "rgba(56, 189, 248, 0.0)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 2. Render and animate stars
      stars.forEach((star) => {
        // Twinkling logic
        if (!prefersReducedMotion) {
          star.phase += star.twinkleSpeed;
        } else {
          star.phase += 0.001; // barely moving shimmer for reduced motion
        }

        // Calculate current alpha based on phase
        const baseAlpha = 0.5 + Math.sin(star.phase) * 0.4; // ranges 0.1 to 0.9

        // Light mode: golden pollen particles drift slowly downward
        if (!isDark && !prefersReducedMotion) {
          star.y += star.driftSpeed;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        if (isDark) {
          // Dark Mode: Soft white, pale yellow, or pale blue stars
          ctx.fillStyle = star.color === "#FFFDE7" 
            ? `rgba(255, 253, 231, ${baseAlpha})` 
            : star.color === "#E3F2FD" 
            ? `rgba(227, 242, 253, ${baseAlpha})` 
            : `rgba(255, 255, 255, ${baseAlpha})`;
          
          // Faint glow for the brightest stars (size > 0.8px)
          if (star.size > 0.8) {
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgba(224, 242, 254, 0.4)";
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          // Light Mode: Warm golden/amber pollen particles
          // A mix of deep gold and amber
          const pollenAlpha = baseAlpha * 0.7; // slightly softer in light mode
          ctx.fillStyle = star.color === "#FFFDE7"
            ? `rgba(245, 158, 11, ${pollenAlpha})` // Golden amber
            : `rgba(217, 119, 6, ${pollenAlpha})`;  // Warm bronze-gold

          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-1000 select-none"
    />
  );
}
