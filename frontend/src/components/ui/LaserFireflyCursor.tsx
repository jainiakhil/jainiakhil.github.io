"use client";

import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { useAnimations } from "src/components/providers/AnimationProvider";

interface FireflyPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radius: number;
  orbitSpeed: number;
  drag: number;
  attraction: number;
  maxSpeed: number;
  wanderFreqX: number;
  wanderFreqY: number;
  wanderAmp: number;
  rotation: number;
  flipX?: number;
}

export default function LaserFireflyCursor() {
  const { animationsEnabled } = useAnimations();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [mouseActive, setMouseActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorCoreRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const fireflyDOMRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const lastMoveTime = useRef(0);
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  // Initialize the three fireflies with distinct physical properties (optimized for a lazy, natural insect-like drift with larger and slower circular boundaries)
  const firefliesRef = useRef<FireflyPhysics[]>([
    {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      radius: 65,        // Significantly expanded base radius
      orbitSpeed: 0.008, // Slow and graceful clockwise orbit
      drag: 0.97,        // Smooth liquid damping
      attraction: 0.004, // Gentle, ultra-natural movement attraction
      maxSpeed: 1.3,     // Gentle maximum speed cap
      wanderFreqX: 0.003,
      wanderFreqY: 0.002,
      wanderAmp: 12,
      rotation: 0,
      flipX: 1,
    },
    {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: Math.PI * 0.66,
      radius: 105,       // Significantly expanded base radius
      orbitSpeed: -0.006, // Graceful counter-clockwise orbit
      drag: 0.97,
      attraction: 0.003,
      maxSpeed: 1.5,
      wanderFreqX: 0.005,
      wanderFreqY: 0.004,
      wanderAmp: 16,
      rotation: 0,
      flipX: 1,
    },
    {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: Math.PI * 1.33,
      radius: 145,       // Significantly expanded base radius
      orbitSpeed: 0.004,  // Graceful slow outer orbit
      drag: 0.97,
      attraction: 0.005,
      maxSpeed: 1.1,
      wanderFreqX: 0.002,
      wanderFreqY: 0.003,
      wanderAmp: 14,
      rotation: 0,
      flipX: 1,
    },
  ]);

  // 1. SSR check, desktop (mouse) detection, and modal state class observer
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Initial check for active modal
    setModalActive(document.body.classList.contains("modal-open"));

    // MutationObserver to track active modals on the body
    const observer = new MutationObserver(() => {
      setModalActive(document.body.classList.contains("modal-open"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      observer.disconnect();
    };
  }, []);

  // 2. Fetch the Lottie JSON dynamically to optimize Turbopack loading and compilation
  useEffect(() => {
    if (!mounted || !isDesktop) return;

    fetch("/Firefly.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load Firefly.json");
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
      })
      .catch((err) => {
        console.error("Error loading Firefly Lottie file:", err);
      });
  }, [mounted, isDesktop]);

  // 3. Track mouse movements and interactive hover states (100% React re-render free!)
  useEffect(() => {
    if (!mounted || !isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      lastMoveTime.current = Date.now();

      // Enable custom cursor and fireflies upon detecting any active mouse movement
      setMouseActive((active) => {
        if (!active) {
          // Initialize firefly positions instantly at the cursor's entrance coordinates
          // to prevent an awkward, fast fly-in animation from the center of the screen
          firefliesRef.current.forEach((f) => {
            f.x = e.clientX;
            f.y = e.clientY;
          });
          return true;
        }
        return active;
      });
    };

    const handleMouseLeave = () => {
      // Deactivate cursor/fireflies when the mouse leaves the browser window entirely
      setMouseActive(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !cursorCoreRef.current || !cursorGlowRef.current) return;

      // Check for interactive elements
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");

      // Direct DOM class manipulation to prevent cursor lag and layout thrashing (always preserve top-0 left-0 and negative margins)
      if (isInteractive) {
        cursorCoreRef.current.className =
          "absolute top-0 left-0 w-2.5 h-2.5 -mt-[5px] -ml-[5px] rounded-full bg-red-400 will-change-transform pointer-events-none transition-transform duration-200";
        cursorCoreRef.current.style.transform = "scale(1.4)";
        
        cursorGlowRef.current.className =
          "absolute top-0 left-0 w-8 h-8 -mt-4 -ml-4 rounded-full bg-red-500 blur-md will-change-[transform,opacity] pointer-events-none animate-laser-glow-hovered";
      } else {
        cursorCoreRef.current.className =
          "absolute top-0 left-0 w-2.5 h-2.5 -mt-[5px] -ml-[5px] rounded-full bg-red-500 will-change-transform pointer-events-none animate-laser-core";
        cursorCoreRef.current.style.transform = "";
        
        cursorGlowRef.current.className =
          "absolute top-0 left-0 w-8 h-8 -mt-4 -ml-4 rounded-full bg-red-500/80 blur-md will-change-[transform,opacity] pointer-events-none animate-laser-glow-normal";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted, isDesktop]);

  // 4. High performance GPU-accelerated direct DOM physics animation loop
  useEffect(() => {
    if (!mounted || !isDesktop || !mouseActive) return;

    const tick = () => {
      timeRef.current += 1;
      const time = timeRef.current;
      const now = Date.now();

      // Check if mouse has stopped moving
      const timeSinceStop = now - lastMoveTime.current;
      const chaseThreshold = 400; // ms
      const transitionDuration = 2500; // 2.5 seconds smooth transition

      // Smooth step easing for weight transition
      let orbitWeight = 0;
      if (timeSinceStop > chaseThreshold) {
        orbitWeight = Math.min(1, (timeSinceStop - chaseThreshold) / transitionDuration);
      }
      const easedOrbitWeight = orbitWeight * orbitWeight * (3 - 2 * orbitWeight);

      // Translate the cursor element exactly once per frame in the animation loop to eliminate redundant paint calculations
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0)`;
      }

      // Direct, instant cursor positioning for fireflies target and zero input lag
      targetX.current = mouseX.current;
      targetY.current = mouseY.current;

      // Update each firefly's physics and DOM transform
      firefliesRef.current.forEach((firefly, idx) => {
        // Increment orbit angle
        firefly.angle += firefly.orbitSpeed;

        // A. Chasing Target (cursor + slow organic wave drift)
        const wanderX = Math.sin(time * firefly.wanderFreqX) * firefly.wanderAmp;
        const wanderY = Math.cos(time * firefly.wanderFreqY) * firefly.wanderAmp;
        const chaseX = targetX.current + wanderX;
        const chaseY = targetY.current + wanderY;

        // B. Orbiting Target: Distorted ellipses with radial breathing & slow center drift to look natural and chaotic
        const scaleXFactors = [1.4, 0.7, 1.2];
        const scaleYFactors = [0.75, 1.3, 0.85];
        
        // Dynamic radial pulse/breathing (up to 25% of radius)
        const radiusBreathing = Math.sin(time * 0.012 + idx * 2.3) * (firefly.radius * 0.25);
        const dynamicRadius = firefly.radius + radiusBreathing;

        // Soft orbital swarm center drift
        const driftX = Math.sin(time * 0.008 + idx * 3.1) * 12;
        const driftY = Math.cos(time * 0.006 + idx * 1.9) * 12;

        const orbitX = targetX.current + dynamicRadius * scaleXFactors[idx] * Math.cos(firefly.angle) + driftX;
        const orbitY = targetY.current + dynamicRadius * scaleYFactors[idx] * Math.sin(firefly.angle) + driftY;

        // C. Interpolated target position: blends seamlessly from chasing to orbiting over 2.5 seconds
        const destX = (1 - easedOrbitWeight) * chaseX + easedOrbitWeight * orbitX;
        const destY = (1 - easedOrbitWeight) * chaseY + easedOrbitWeight * orbitY;

        // Steering force calculation
        const dx = destX - firefly.x;
        const dy = destY - firefly.y;

        const forceX = dx * firefly.attraction;
        const forceY = dy * firefly.attraction;

        // Apply forces to velocity and damp with drag
        firefly.vx = (firefly.vx + forceX) * firefly.drag;
        firefly.vy = (firefly.vy + forceY) * firefly.drag;

        // Apply speed limit
        const speed = Math.sqrt(firefly.vx * firefly.vx + firefly.vy * firefly.vy);
        if (speed > firefly.maxSpeed) {
          firefly.vx = (firefly.vx / speed) * firefly.maxSpeed;
          firefly.vy = (firefly.vy / speed) * firefly.maxSpeed;
        }

        // Update positions
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        // Apply visual transform directly to DOM ref
        const domRef = fireflyDOMRefs.current[idx];
        if (domRef) {
          // Determine horizontal flip based on movement direction (sticky states to avoid jitter)
          let targetFlip = firefly.flipX || 1;
          if (firefly.vx > 0.05) {
            targetFlip = -1; // Moving right -> face right (flipped horizontally)
          } else if (firefly.vx < -0.05) {
            targetFlip = 1;  // Moving left -> face left (original asset direction)
          }
          firefly.flipX = targetFlip;

          // Gentle tilt (pitch) in standard coordinates, restricted to keep it completely right-side up
          let tiltDeg = 0;
          const currentSpeed = Math.sqrt(firefly.vx * firefly.vx + firefly.vy * firefly.vy);

          if (currentSpeed > 0.1) {
            const movementAngle = Math.atan2(firefly.vy, firefly.vx);
            if (targetFlip === 1) {
              // Facing Left (West) - relative to 180 deg
              let tiltRad = movementAngle - Math.PI;
              while (tiltRad < -Math.PI) tiltRad += 2 * Math.PI;
              while (tiltRad > Math.PI) tiltRad -= 2 * Math.PI;
              tiltDeg = tiltRad * (180 / Math.PI);
            } else {
              // Facing Right (East) - relative to 0 deg
              let tiltRad = movementAngle;
              while (tiltRad < -Math.PI) tiltRad += 2 * Math.PI;
              while (tiltRad > Math.PI) tiltRad -= 2 * Math.PI;
              tiltDeg = tiltRad * (180 / Math.PI);
            }

            // Keep vertical tilt natural and right-side up
            const maxTilt = 25;
            tiltDeg = Math.max(-maxTilt, Math.min(maxTilt, tiltDeg));
          }

          // Smoothly interpolate rotation to prevent sudden pitch jumps
          let diff = tiltDeg - firefly.rotation;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          firefly.rotation = firefly.rotation + diff * 0.08;

          // Add out-of-phase bioluminescent scale and opacity pulsing (highly subtle scale zoom)
          const pulse = Math.sin(time * 0.08 + idx * 2.0);
          const currentScale = 0.90 + pulse * 0.05; // Extremely subtle variance (0.85 to 0.95)
          const currentOpacity = 0.65 + pulse * 0.20; // Soft opacity breathing (0.45 to 0.85)

          // Combine translation, smooth rotation, and horizontal flip scale
          domRef.style.transform = `translate3d(${firefly.x}px, ${firefly.y}px, 0) rotate(${firefly.rotation}deg) scale(${targetFlip * currentScale}, ${currentScale})`;
          domRef.style.opacity = `${currentOpacity}`;
        }
      });

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mounted, isDesktop, mouseActive]);

  if (!mounted || !isDesktop || !mouseActive || modalActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* 1. Glowing Laser Pointer Cursor Parent */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-0 h-0 pointer-events-none will-change-transform">
        {/* Glow Element: Fully GPU composited blur, scale, and opacity shifts */}
        <div
          ref={cursorGlowRef}
          className="absolute top-0 left-0 w-8 h-8 -mt-4 -ml-4 rounded-full bg-red-500/80 blur-md will-change-[transform,opacity] pointer-events-none animate-laser-glow-normal"
        />
        {/* Sharp core element in the center */}
        <div
          ref={cursorCoreRef}
          className="absolute top-0 left-0 w-2.5 h-2.5 -mt-[5px] -ml-[5px] rounded-full bg-red-500 will-change-transform pointer-events-none animate-laser-core"
        />
      </div>

      {/* 2. Three Chasing Fireflies (Only render once animation data is fetched and animations are enabled) */}
      {animationsEnabled && animationData &&
        firefliesRef.current.map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              fireflyDOMRefs.current[idx] = el;
            }}
            className="fixed top-0 left-0 w-0 h-0 pointer-events-none will-change-[transform,opacity]"
          >
            {/* Child renders in high-fidelity SVG mode, centered at 0,0 relative to parent */}
            <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
