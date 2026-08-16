"use client";

import { useAnimations } from "src/components/providers/AnimationProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimations();

  return (
    <div className="fixed bottom-6 right-6 z-[99999] select-none pointer-events-auto">
      <button
        onClick={toggleAnimations}
        className="w-8 h-8 rounded-full dreamcard flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 text-text-primary cursor-pointer bg-background/85 backdrop-blur-md border border-card-border/60"
        title={animationsEnabled ? "Pause all animations" : "Play all animations"}
        aria-label={animationsEnabled ? "Pause all animations" : "Play all animations"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={animationsEnabled ? "playing" : "paused"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {animationsEnabled ? (
              /* Cozy alert sitting cat holding a tiny pause emblem (Click to Pause) */
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-primary transition-colors duration-300">
                {/* Ears */}
                <path d="M 8.5 7.5 L 6.5 3.2 L 10 5.5 Z" />
                <path d="M 15.5 7.5 L 17.5 3.2 L 14 5.5 Z" />
                {/* Head */}
                <circle cx="12" cy="8.2" r="3.4" />
                {/* Body */}
                <path d="M 8.5 12 C 8.5 10, 15.5 10, 15.5 12 L 16.5 20 C 16.5 21, 7.5 21, 7.5 20 Z" />
                {/* Tail */}
                <path d="M 16 19 C 18 19, 19.5 17.5, 19.5 15.5 C 19.5 14, 18.8 14, 18.8 15.5 C 18.8 16.8, 17.8 17.8, 16 17.8" stroke="currentColor" strokeWidth="0.8" fill="none" />
                {/* Held Emblem (Play-Pause circle) */}
                <circle cx="12" cy="14.2" r="2.8" className="fill-background stroke-accent-primary" strokeWidth="0.6" />
                {/* Tiny Pause marks inside the circle */}
                <path d="M 11.2 13 L 11.2 15.4 M 12.8 13 L 12.8 15.4" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
              </svg>
            ) : (
              /* Cozy curled-up sleeping cat (Click to Play) */
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-text-secondary/85 transition-colors duration-300">
                {/* Curled Body */}
                <path d="M 12 17.5 C 7.8 17.5, 5.5 15, 5.5 12 C 5.5 9, 8 7.5, 12 7.5 C 16 7.5, 18.5 9, 18.5 12 C 18.5 15, 16.2 17.5, 12 17.5 Z" />
                {/* Head */}
                <circle cx="15.5" cy="11.2" r="2.8" />
                {/* Ears */}
                <path d="M 13.5 9.2 L 12.8 6.5 L 14.5 8.5 Z" />
                <path d="M 16.5 9.2 L 17.5 6.5 L 17.2 8.5 Z" />
                {/* Tail */}
                <path d="M 7.5 13 C 6.5 14, 6 16, 8 16.8 C 9.5 17.2, 11 16.8, 12 16.2" stroke="currentColor" strokeWidth="0.75" fill="none" />
                {/* Sleeping Eyes (subtle light-colored marks) */}
                <path d="M 14.2 11.2 C 14.5 11.7, 14.8 11.7, 15.1 11.2" stroke="var(--background)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
                <path d="M 15.9 11.2 C 16.2 11.7, 16.5 11.7, 16.8 11.2" stroke="var(--background)" strokeWidth="0.5" strokeLinecap="round" fill="none" />
                {/* Tiny Play symbol on the bottom right indicating clicking will start it */}
                <polygon points="20,13 20,18 24,15.5" className="fill-accent-primary" />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
