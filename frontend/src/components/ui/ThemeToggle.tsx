"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full glass flex items-center justify-center opacity-50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-12 h-12 rounded-full glass flex items-center justify-center overflow-hidden cursor-pointer shadow-lg group transition-all duration-300 active:scale-95 border border-card-border"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 20, rotate: -45, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex items-center justify-center text-accent-primary"
          >
            <Moon className="w-5 h-5 fill-accent-primary/20 stroke-accent-primary" />
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
              className="absolute -top-1.5 -right-1.5 text-[8px] text-accent-primary select-none pointer-events-none"
            >
              ✦
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -bottom-1 -left-1 text-[6px] text-accent-primary select-none pointer-events-none"
            >
              ✦
            </motion.span>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, rotate: 45, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex items-center justify-center text-accent-secondary"
          >
            <Sun className="w-5 h-5 fill-accent-secondary/20 stroke-accent-secondary" />
            <motion.span
              animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180, 270, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-accent-secondary/20 scale-135 pointer-events-none select-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
