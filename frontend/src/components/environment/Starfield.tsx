"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
  phase: number;
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

    // Mouse coordinates for cosmic interaction
    const mouse = { x: -1000, y: -1000, active: false };

    // Accessibility check: reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false;

    const initStars = () => {
      stars = [];
      const density = window.innerWidth < 768 ? 40 : 120; // lower density on mobile to maintain 60 FPS

      for (let i = 0; i < density; i++) {
        const size = Math.random() * 2 + 0.4;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          alpha: Math.random() * 0.7 + 0.3,
          speed: (Math.random() * 0.04 + 0.01) * (size > 1.4 ? 1.4 : 0.7),
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    // Listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize
    initStars();

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = resolvedTheme === "dark";

      stars.forEach((star) => {
        // Twinkling effect via sine wave phase interpolation
        star.phase += prefersReducedMotion ? 0.003 : star.speed;
        const currentAlpha = star.alpha + Math.sin(star.phase) * 0.25;
        
        // Gentle drifting: drift upward in dark mode, drift downward/float in light mode
        if (!prefersReducedMotion) {
          star.y -= isDark ? star.speed * 6 : -star.speed * 4;
          if (isDark && star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          } else if (!isDark && star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }

        // Mouse gravity attraction / subtle particle glow
        let drawX = star.x;
        let drawY = star.y;
        let scale = 1;

        if (mouse.active && !prefersReducedMotion) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            // Draw star slightly closer to the mouse
            drawX += dx * force * 0.06;
            drawY += dy * force * 0.06;
            // Glow larger
            scale = 1 + force * 0.7;
          }
        }

        // Render individual star
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size * scale, 0, Math.PI * 2);
        
        // Setup colors based on active theme
        ctx.fillStyle = isDark
          ? `rgba(226, 232, 240, ${Math.max(0.1, Math.min(1, currentAlpha))})` // Slate-200 stars
          : `rgba(37, 99, 235, ${Math.max(0.05, Math.min(0.7, currentAlpha * 0.75))})`; // Blue-600 soft stars

        // Subtle glow filter for larger stars in dark mode
        if (star.size > 1.4 && isDark) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(125, 211, 252, 0.4)"; // Sky-300 glow
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
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
