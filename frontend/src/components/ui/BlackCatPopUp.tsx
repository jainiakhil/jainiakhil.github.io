"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useAnimations } from "src/components/providers/AnimationProvider";

export default function BlackCatPopUp() {
  const { animationsEnabled } = useAnimations();
  const [mounted, setMounted] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const lottieRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure client-side mounting
  useEffect(() => {
    setMounted(true);

    // Fetch the cat animation JSON dynamically to prevent SSR hydration mismatches
    fetch("/black_cat_face.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load black_cat_face.json");
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
      })
      .catch((err) => {
        console.error("Error loading black cat popup Lottie:", err);
      });
  }, []);

  // Observe classList changes on document.body for the modal-open class
  useEffect(() => {
    if (!mounted) return;

    const checkModal = () => {
      const isActive = document.body.classList.contains("modal-open");
      setModalActive(isActive);
    };

    // Run once on initialization
    checkModal();

    const observer = new MutationObserver(() => {
      checkModal();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  // Manage the random timer and triggering lifecycle
  useEffect(() => {
    if (!animationsEnabled) {
      setIsTriggered(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (modalActive && animationData) {
      // Reset state and clear any previous timers
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsTriggered(false);

      // Generate a random time between 10 and 20 seconds (10000ms to 20000ms)
      const randomDelay = Math.floor(Math.random() * 10000) + 10000;
      
      timerRef.current = setTimeout(() => {
        setIsTriggered(true);
      }, randomDelay);
    } else {
      // If modal is closed, cancel active timers and dismiss the cat immediately
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsTriggered(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [modalActive, animationData]);

  // Dismiss cat when the Lottie animation finishes playing
  const handleComplete = () => {
    setIsTriggered(false);
  };

  if (!mounted || !animationData) return null;

  return createPortal(
    <AnimatePresence>
      {isTriggered && (
        <motion.div
          key="black-cat-popup"
          initial={{ opacity: 0, y: 180 }} // Start slid down off-screen
          animate={{ opacity: 1, y: 0 }}     // Slide up into view
          exit={{ opacity: 0, y: 180 }}      // Slide back down on complete
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="fixed bottom-0 right-[4%] sm:right-[8%] z-[100005] pointer-events-none select-none overflow-hidden"
          style={{
            width: "300px",
            height: "533px", // maintains 9:16 aspect ratio (1440x2560)
            maxWidth: "35vw",
            maxHeight: "62vw",
          }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoplay={true}
            onComplete={handleComplete}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
