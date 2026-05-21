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
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
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
      
      // 1. Twinkling stars density: max 250 stars on desktop and 100 on mobile
      const density = w < 768 ? 100 : 250;

      // Generate base twinkling stars across the canvas
      for (let i = 0; i < density; i++) {
        const sizeRand = Math.random();
        let size = 0.3;
        if (sizeRand < 0.85) {
          size = Math.random() * 0.2 + 0.3; // 0.3px - 0.5px
        } else if (sizeRand < 0.97) {
          size = Math.random() * 0.3 + 0.5; // 0.5px - 0.8px
        } else {
          size = Math.random() * 0.2 + 0.8; // 0.8px - 1.0px (bright stars)
        }

        const colorRand = Math.random();
        let color = "#FFFFFF";
        if (colorRand < 0.15) {
          color = "#FFFDE7"; // warm pale yellow
        } else if (colorRand < 0.30) {
          color = "#E3F2FD"; // cool pale blue
        }

        const twinkleSpeed = Math.random() * 0.027 + 0.003;
        const phase = Math.random() * Math.PI * 2;
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

      // Enhance Milky Way band with active twinkling stars: Generate 30% more stars
      const mwAdditionalCount = Math.floor(density * 0.3);
      for (let i = 0; i < mwAdditionalCount; i++) {
        let x = 0;
        let y = 0;
        let isBand = false;
        let attempts = 0;

        while (!isBand && attempts < 50) {
          x = Math.random() * w;
          y = Math.random() * h;
          const d = Math.abs(h * x + w * y - w * h) / Math.sqrt(h * h + w * w);
          if (d < w * 0.15) {
            isBand = true;
          }
          attempts++;
        }

        const size = Math.random() * 0.4 + 0.8; 
        const color = Math.random() < 0.5 ? "#E3F2FD" : "#FFFDE7";
        const twinkleSpeed = Math.random() * 0.027 + 0.003;
        const phase = Math.random() * Math.PI * 2;
        const driftSpeed = Math.random() * 0.05 + 0.03;

        stars.push({
          x,
          y,
          size,
          color,
          twinkleSpeed,
          phase,
          driftSpeed,
        });
      }

      // 2. Pre-render the thousands of STATIC stars onto an offscreen canvas
      if (typeof document !== "undefined") {
        const offscreen = document.createElement("canvas");
        offscreen.width = w;
        offscreen.height = h;
        const oCtx = offscreen.getContext("2d");
        if (oCtx) {
          // Restore high density of static stars (no per-frame overhead!)
          const staticDensity = w < 768
            ? Math.floor((w * h) / 500)
            : Math.floor((w * h) / 300);

          for (let i = 0; i < staticDensity; i++) {
            const sizeRand = Math.random();
            let size = 0.3;
            if (sizeRand < 0.85) {
              size = Math.random() * 0.2 + 0.3;
            } else if (sizeRand < 0.97) {
              size = Math.random() * 0.3 + 0.5;
            } else {
              size = Math.random() * 0.2 + 0.8;
            }

            const colorRand = Math.random();
            let color = "#FFFFFF";
            if (colorRand < 0.15) {
              color = "#FFFDE7";
            } else if (colorRand < 0.30) {
              color = "#E3F2FD";
            }

            const starX = Math.random() * w;
            const starY = Math.random() * h;
            const fadeFactor = starY > h * 0.6 
              ? Math.max(0, 1 - (starY - h * 0.6) / (h * 0.4)) 
              : 1;

            // Faint static opacities so they sit elegantly in the background
            const alpha = (0.15 + Math.random() * 0.55) * fadeFactor;
            if (alpha <= 0.01) continue;

            oCtx.beginPath();
            oCtx.arc(starX, starY, size, 0, Math.PI * 2);
            oCtx.fillStyle = color === "#FFFDE7" 
              ? `rgba(255, 253, 231, ${alpha})` 
              : color === "#E3F2FD" 
              ? `rgba(227, 242, 253, ${alpha})` 
              : `rgba(255, 255, 255, ${alpha})`;
            oCtx.fill();

            // Concentric static glow for very bright stars
            if (size > 0.8) {
              oCtx.beginPath();
              oCtx.arc(starX, starY, size * 2.8, 0, Math.PI * 2);
              oCtx.fillStyle = color === "#FFFDE7"
                ? `rgba(255, 253, 231, ${alpha * 0.12})`
                : color === "#E3F2FD"
                ? `rgba(227, 242, 253, ${alpha * 0.12})`
                : `rgba(224, 242, 254, ${alpha * 0.12})`;
              oCtx.fill();
            }
          }

          // Generate static Milky Way band stars
          const mwStaticCount = Math.floor(staticDensity * 0.3);
          for (let i = 0; i < mwStaticCount; i++) {
            let x = 0;
            let y = 0;
            let isBand = false;
            let attempts = 0;

            while (!isBand && attempts < 50) {
              x = Math.random() * w;
              y = Math.random() * h;
              const d = Math.abs(h * x + w * y - w * h) / Math.sqrt(h * h + w * w);
              if (d < w * 0.15) {
                isBand = true;
              }
              attempts++;
            }

            const size = Math.random() * 0.4 + 0.8;
            const color = Math.random() < 0.5 ? "#E3F2FD" : "#FFFDE7";
            const fadeFactor = y > h * 0.6 
              ? Math.max(0, 1 - (y - h * 0.6) / (h * 0.4)) 
              : 1;

            const alpha = (0.2 + Math.random() * 0.55) * fadeFactor;
            if (alpha <= 0.01) continue;

            oCtx.beginPath();
            oCtx.arc(x, y, size, 0, Math.PI * 2);
            oCtx.fillStyle = color === "#E3F2FD" ? `rgba(227, 242, 253, ${alpha})` : `rgba(255, 253, 231, ${alpha})`;
            oCtx.fill();

            oCtx.beginPath();
            oCtx.arc(x, y, size * 2.8, 0, Math.PI * 2);
            oCtx.fillStyle = color === "#E3F2FD" 
              ? `rgba(227, 242, 253, ${alpha * 0.12})` 
              : `rgba(255, 253, 231, ${alpha * 0.12})`;
            oCtx.fill();
          }
        }
        offscreenCanvasRef.current = offscreen;
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

        // Draw pre-rendered static background stars in 1 single, GPU-composited draw call (0% CPU impact)
        if (offscreenCanvasRef.current) {
          ctx.drawImage(offscreenCanvasRef.current, 0, 0);
        }
      }

      // 2. Render and animate stars (only in dark mode)
      if (isDark) {
        stars.forEach((star) => {
          // Twinkling logic
          if (!prefersReducedMotion) {
            star.phase += star.twinkleSpeed;
          } else {
            star.phase += 0.001; // barely moving shimmer for reduced motion
          }

          // Calculate current alpha based on phase
          const baseAlpha = 0.5 + Math.sin(star.phase) * 0.4; // ranges 0.1 to 0.9

          // Horizon fade factor: smooth gradient to zero visibility in the bottom 40%
          const fadeFactor = star.y > height * 0.6 
            ? Math.max(0, 1 - (star.y - height * 0.6) / (height * 0.4)) 
            : 1;
          const currentAlpha = baseAlpha * fadeFactor;

          // Draw star core
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

          // Dark Mode: Soft white, pale yellow, or pale blue stars
          ctx.fillStyle = star.color === "#FFFDE7" 
            ? `rgba(255, 253, 231, ${currentAlpha})` 
            : star.color === "#E3F2FD" 
            ? `rgba(227, 242, 253, ${currentAlpha})` 
            : `rgba(255, 255, 255, ${currentAlpha})`;
          
          ctx.fill();

          // High-performance concentric aura for the brightest stars (size > 0.8px) instead of slow CPU shadowBlur
          if (star.size > 0.8) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = star.color === "#FFFDE7" 
              ? `rgba(255, 253, 231, ${currentAlpha * 0.18})` 
              : star.color === "#E3F2FD" 
              ? `rgba(227, 242, 253, ${currentAlpha * 0.18})` 
              : `rgba(224, 242, 254, ${currentAlpha * 0.18})`;
            ctx.fill();
          }
        });
      }

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
      className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000 select-none"
    />
  );
}
