"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Lottie from "lottie-react";
import { useAnimations } from "src/components/providers/AnimationProvider";
import { ChevronLeft, ChevronRight, X, Heart, Sparkles } from "lucide-react";

interface CharacterInfo {
  type: "waving" | "jumping" | "gazing" | "telescope";
  side: "left" | "right";
  animationPath: string;
  loop: boolean;
}

// Cat easter egg photo list
const catPhotos = [
  { src: "/MyCat/20241015_113033.jpg", caption: "Sunbathing" },
  { src: "/MyCat/20241101_145815.jpg", caption: "Curious Stares" },
  { src: "/MyCat/20241209_214045.jpg", caption: "Stargazing Companion" },
  { src: "/MyCat/20241212_155227.jpg", caption: "Grimreaper" },
  { src: "/MyCat/20250313_182710.jpg", caption: "If I fits, I sits" },
  { src: "/MyCat/20250325_213653.jpg", caption: "Cuddle Buddy" },
  { src: "/MyCat/20250328_160253_remastered.jpg", caption: "The Boss of the House" },
  { src: "/MyCat/20250413_165059.jpg", caption: "Afternoon Relaxation" },
  { src: "/MyCat/20250609_165512.jpg", caption: "I know I'm a Cutie-pie" },
  { src: "/MyCat/20250610_091148(1).jpg", caption: "Locked-in" },
  { src: "/MyCat/20250804_115630.jpg", caption: "Warm Spot Master" },
  { src: "/MyCat/20260420_102239.jpg", caption: "Always Watching" },
  { src: "/MyCat/20260427_034325.jpg", caption: "3 AM Zoomies Recovery" },
  { src: "/MyCat/20260703_232621.jpg", caption: "Travel Companion" },
  { src: "/MyCat/SmartSelect_20241116_110329_Gallery.jpg", caption: "Purrfect Moment" },
];

// ==================================================================
// SILHOUETTE CAT MANUAL POSITION & SIZE CONFIGURATION
// ==================================================================
export const CAT_CONFIG = {
  size: {
    width: "90px",
    height: "90px",
    maxWidth: "25vw",
    maxHeight: "25vw",
  },

  leftSide: {
    gazing: {
      left: "left-[18%] sm:left-[18%]",
      bottom: "bottom-[25%] sm:bottom-[25%]",
    },
    standing: {
      left: "left-[13%] sm:left-[13%]",
      bottom: "bottom-[25%] sm:bottom-[25%]",
    },
    telescope: {
      left: "left-[13%] sm:left-[13%]",
      bottom: "bottom-[25%] sm:bottom-[25%]",
    }
  },

  rightSide: {
    gazing: {
      right: "right-[18%] sm:right-[18%]",
      bottom: "bottom-[25%] sm:bottom-[25%]",
    },
    standing: {
      right: "right-[13%] sm:right-[13%]",
      bottom: "bottom-[25%] sm:bottom-[25%]",
    },
    telescope: {
      right: "right-[13%] sm:right-[13%]",
      bottom: "bottom-[25%] sm:bottom-[25%]",
    }
  }
};

// ==================================================================
// MAIN GHIBLI CHARACTERS POSITION & SIZE CONFIGURATION
// ==================================================================
export const CHARACTER_CONFIG = {
  gazing: {
    size: {
      width: "240px",
      height: "240px",
      maxWidth: "35vw",
      maxHeight: "35vw",
    },
    leftSide: "left-[6%] sm:left-[10%] bottom-[-15%] sm:bottom-[-15%]",
    rightSide: "right-[6%] sm:right-[10%] bottom-[-6%] sm:bottom-[-6%] scale-x-[-1]"
  },

  standing: {
    size: {
      width: "300px",
      height: "300px",
      maxWidth: "50vw",
      maxHeight: "50vw",
    },
    leftSide: "left-[8%] sm:left-[5%] bottom-[14%] sm:bottom-[14%]",
    rightSide: "right-[8%] sm:right-[5%] bottom-[14%] sm:bottom-[14%] scale-x-[-1]"
  },

  telescope: {
    size: {
      width: "350px",
      height: "350px",
      maxWidth: "50vw",
      maxHeight: "50vw",
    },
    leftSide: "left-[8%] sm:left-[5%] bottom-[-12%] sm:bottom-[-12%]",
    rightSide: "right-[8%] sm:right-[5%] bottom-[-5%] sm:bottom-[-5%] scale-x-[-1]"
  }
};

export default function ForegroundGrass() {
  const { animationsEnabled } = useAnimations();
  const [mounted, setMounted] = useState(false);
  const [character, setCharacter] = useState<CharacterInfo | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const lottieRef = useRef<any>(null);

  // Cat easter egg state
  const [catEasterEggOpen, setCatEasterEggOpen] = useState(false);
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const types: ("waving" | "jumping" | "gazing" | "telescope")[] = ["waving", "jumping", "gazing", "telescope"];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const chosenSide = Math.random() > 0.5 ? "left" : "right";

    let path = "/waving_hello.json";
    let loop = true;
    if (chosenType === "jumping") {
      path = "/jumping_hello.json";
    } else if (chosenType === "gazing") {
      path = "/star_gazing.json";
      loop = true;
    } else if (chosenType === "telescope") {
      path = "/telescope_looking.json";
      loop = true;
    }

    setCharacter({
      type: chosenType,
      side: chosenSide,
      animationPath: path,
      loop: loop,
    });

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Cat easter egg hover handlers (5 seconds hover trigger)
  const handleCatMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveCatIndex(0);
      setCatEasterEggOpen(true);
    }, 5000);
  };

  const handleCatMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Keyboard navigation for Cat easter egg gallery
  useEffect(() => {
    if (!catEasterEggOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveCatIndex((prev) => (prev + 1) % catPhotos.length);
      } else if (e.key === "ArrowLeft") {
        setActiveCatIndex((prev) => (prev - 1 + catPhotos.length) % catPhotos.length);
      } else if (e.key === "Escape") {
        setCatEasterEggOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [catEasterEggOpen]);

  // Modal scroll lock synchronization
  useEffect(() => {
    if (catEasterEggOpen) {
      document.body.classList.add("modal-open");
    } else if (!document.querySelector(".dreamcard-modal-open")) {
      document.body.classList.remove("modal-open");
    }
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, [catEasterEggOpen]);

  // MutationObserver to track active modals on the body and pause Lottie
  useEffect(() => {
    setModalActive(document.body.classList.contains("modal-open"));

    const observer = new MutationObserver(() => {
      const isModal = document.body.classList.contains("modal-open");
      setModalActive(isModal);
      if (lottieRef.current) {
        if (isModal) {
          lottieRef.current.pause();
        } else {
          lottieRef.current.play();
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lottieRef.current) {
      if (!animationsEnabled || modalActive) {
        lottieRef.current.pause();
      } else {
        lottieRef.current.play();
      }
    }
  }, [animationsEnabled, modalActive]);

  useEffect(() => {
    if (!character) return;

    fetch(character.animationPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${character.animationPath}`);
        return res.json();
      })
      .then((data) => {
        setAnimationData(data);
      })
      .catch((err) => {
        console.error("Error loading grassland Lottie file:", err);
      });
  }, [character]);

  const { scrollYProgress } = useScroll();

  const yBack = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 w-full z-[38] pointer-events-none select-none h-[50vh] overflow-x-hidden">
        <div className="absolute bottom-[-32px] left-0 right-0 w-full h-[calc(15vh+60px)]">

          {/* Layer 1: Back Hill */}
          <motion.div
            style={{ y: yBack }}
            className="absolute inset-x-0 bottom-0 h-full w-full"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 220"
              preserveAspectRatio="none"
            >
              <path
                d="M0 100 C 350 40, 750 140, 1100 60 C 1250 30, 1380 70, 1440 85 L 1440 220 L 0 220 Z"
                className="fill-hill-back transition-[fill] duration-1000 ease-in-out"
              />
            </svg>
          </motion.div>

          {/* Layer 2: Mid Hill */}
          <motion.div
            style={{ y: yMid }}
            className="absolute inset-x-0 bottom-0 h-full w-full"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 220"
              preserveAspectRatio="none"
            >
              <path
                d="M0 125 C 280 65, 600 145, 900 80 C 1150 35, 1320 110, 1440 100 L 1440 220 L 0 220 Z"
                className="fill-hill-mid transition-[fill] duration-1000 ease-in-out"
              />
            </svg>
          </motion.div>

          {/* Layer 3: Front Hill with grass details and characters */}
          <motion.div
            style={{ y: yFront }}
            className="absolute inset-x-0 bottom-0 h-full w-full"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 220"
              preserveAspectRatio="none"
            >
              <path
                d="M0 150 C 320 100, 680 170, 1000 120 C 1200 85, 1360 140, 1440 135 L 1440 220 L 0 220 Z"
                className="fill-hill-front transition-[fill] duration-1000 ease-in-out"
              />

              {/* Hand-drawn grass tufts */}
              <g className="fill-hill-front transition-[fill] duration-1000 ease-in-out">
                <path d="M 80 146 C 78 136, 75 131, 70 128 C 75 134, 78 141, 80 146 M 80 146 C 81 134, 83 128, 85 124 C 83 131, 81 139, 80 146 M 80 146 C 83 137, 88 133, 92 131 C 87 136, 83 141, 80 146" />
                <path d="M 310 103 C 308 93, 305 88, 300 85 C 305 91, 308 98, 310 103 M 310 103 C 311 91, 313 85, 315 81 C 313 88, 311 96, 310 103 M 310 103 C 313 94, 318 90, 322 88 C 317 93, 313 98, 310 103" />
                <path d="M 640 156 C 638 146, 635 141, 630 138 C 635 144, 638 151, 640 156 M 640 156 C 641 144, 643 138, 645 134 C 643 141, 641 149, 640 156 M 640 156 C 643 147, 648 143, 652 141 C 647 146, 643 151, 640 156" />
                <path d="M 980 122 C 978 112, 975 107, 970 104 C 975 110, 978 117, 980 122 M 980 122 C 981 110, 983 104, 985 100 C 983 107, 981 115, 980 122 M 980 122 C 983 113, 988 109, 992 107 C 987 112, 983 117, 980 122" />
                <path d="M 1250 114 C 1248 104, 1245 99, 1240 96 C 1245 102, 1248 109, 1250 114 M 1250 114 C 1251 102, 1253 96, 1255 92 C 1253 99, 1251 107, 1250 114 M 1250 114 C 1253 105, 1258 101, 1262 99 C 1257 104, 1253 109, 1250 114" />
              </g>
            </svg>

            {/* Dynamic Lottie Grassland Character */}
            {character && animationData && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`absolute z-[39] pointer-events-none will-change-[transform,opacity] ${character.side === "left"
                    ? character.type === "gazing"
                      ? CHARACTER_CONFIG.gazing.leftSide
                      : character.type === "telescope"
                        ? CHARACTER_CONFIG.telescope.leftSide
                        : CHARACTER_CONFIG.standing.leftSide
                    : character.type === "gazing"
                      ? CHARACTER_CONFIG.gazing.rightSide
                      : character.type === "telescope"
                        ? CHARACTER_CONFIG.telescope.rightSide
                        : CHARACTER_CONFIG.standing.rightSide
                    }`}
                  style={{
                    width:
                      character.type === "gazing"
                        ? CHARACTER_CONFIG.gazing.size.width
                        : character.type === "telescope"
                          ? CHARACTER_CONFIG.telescope.size.width
                          : CHARACTER_CONFIG.standing.size.width,
                    height:
                      character.type === "gazing"
                        ? CHARACTER_CONFIG.gazing.size.height
                        : character.type === "telescope"
                          ? CHARACTER_CONFIG.telescope.size.height
                          : CHARACTER_CONFIG.standing.size.height,
                    maxWidth:
                      character.type === "gazing"
                        ? CHARACTER_CONFIG.gazing.size.maxWidth
                        : character.type === "telescope"
                          ? CHARACTER_CONFIG.telescope.size.maxWidth
                          : CHARACTER_CONFIG.standing.size.maxWidth,
                    maxHeight:
                      character.type === "gazing"
                        ? CHARACTER_CONFIG.gazing.size.maxHeight
                        : character.type === "telescope"
                          ? CHARACTER_CONFIG.telescope.size.maxHeight
                          : CHARACTER_CONFIG.standing.size.maxHeight,
                  }}
                >
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    loop={character.loop}
                    autoplay={!modalActive}
                    style={{ width: "100%", height: "100%" }}
                  />
                </motion.div>

                {/* Silhouette Cat (Easter egg trigger: 5s hover) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  onMouseEnter={handleCatMouseEnter}
                  onMouseLeave={handleCatMouseLeave}
                  className={`absolute z-[40] pointer-events-auto cursor-pointer will-change-[transform,opacity] ${character.side === "left"
                    ? character.type === "gazing"
                      ? `${CAT_CONFIG.leftSide.gazing.left} ${CAT_CONFIG.leftSide.gazing.bottom}`
                      : character.type === "telescope"
                        ? `${CAT_CONFIG.leftSide.telescope.left} ${CAT_CONFIG.leftSide.telescope.bottom}`
                        : `${CAT_CONFIG.leftSide.standing.left} ${CAT_CONFIG.leftSide.standing.bottom}`
                    : character.type === "gazing"
                      ? `${CAT_CONFIG.rightSide.gazing.right} ${CAT_CONFIG.rightSide.gazing.bottom} scale-x-[-1]`
                      : character.type === "telescope"
                        ? `${CAT_CONFIG.rightSide.telescope.right} ${CAT_CONFIG.rightSide.telescope.bottom} scale-x-[-1]`
                        : `${CAT_CONFIG.rightSide.standing.right} ${CAT_CONFIG.rightSide.standing.bottom} scale-x-[-1]`
                    }`}
                  style={{
                    width: CAT_CONFIG.size.width,
                    height: CAT_CONFIG.size.height,
                    maxWidth: CAT_CONFIG.size.maxWidth,
                    maxHeight: CAT_CONFIG.size.maxHeight,
                  }}
                >
                  <SilhouetteCat modalActive={modalActive} animationsEnabled={animationsEnabled} />
                </motion.div>
              </>
            )}
          </motion.div>

        </div>
      </div>

      {/* Secret Cat Easter Egg Photo Gallery Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {catEasterEggOpen && (
            <motion.div
              key="cat-easter-egg-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCatEasterEggOpen(false)}
              className="fixed inset-0 z-[100000] bg-background/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.94, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.94, y: 20 }}
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="dreamcard w-full max-w-4xl overflow-hidden flex flex-col relative max-h-[90vh] p-4 sm:p-6 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setCatEasterEggOpen(false)}
                  className="absolute right-4 top-4 z-50 p-2 rounded-full dreamcard text-text-primary hover:bg-card-bg/40 cursor-pointer active:scale-95 transition-all shadow-md bg-background/80 backdrop-blur-md"
                  aria-label="Close cat gallery"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center justify-between px-2 pb-3 border-b border-card-border/40 mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent-secondary fill-accent-secondary" />
                    <span className="font-display font-semibold text-base sm:text-lg text-text-primary">
                      Yaay! You've found the Secret Cat Gallery! 🐾
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
                  </div>
                  <span className="text-xs font-bold text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20 px-3 py-1 rounded-full mr-10">
                    {activeCatIndex + 1} / {catPhotos.length}
                  </span>
                </div>

                {/* Main Carousel Area */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-[350px] max-h-[60vh] overflow-hidden rounded-2xl bg-black/10 border border-card-border/40 p-2">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeCatIndex}
                      src={catPhotos[activeCatIndex].src}
                      alt={catPhotos[activeCatIndex].caption}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="max-h-[58vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-lg select-none"
                    />
                  </AnimatePresence>

                  {/* Left Arrow Button */}
                  <button
                    onClick={() => setActiveCatIndex((prev) => (prev - 1 + catPhotos.length) % catPhotos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full dreamcard bg-background/85 backdrop-blur-md hover:bg-background border border-card-border/60 text-text-primary hover:text-accent-secondary cursor-pointer active:scale-90 hover:scale-105 transition-all shadow-xl select-none"
                    aria-label="Previous cat photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Arrow Button */}
                  <button
                    onClick={() => setActiveCatIndex((prev) => (prev + 1) % catPhotos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full dreamcard bg-background/85 backdrop-blur-md hover:bg-background border border-card-border/60 text-text-primary hover:text-accent-secondary cursor-pointer active:scale-90 hover:scale-105 transition-all shadow-xl select-none"
                    aria-label="Next cat photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Caption Bar */}
                  {catPhotos[activeCatIndex].caption && (
                    <div className="absolute bottom-3 inset-x-4 flex justify-center pointer-events-none">
                      <span className="px-4 py-1.5 rounded-full bg-background/85 backdrop-blur-md text-xs font-semibold text-text-primary border border-card-border/60 shadow-md">
                        {catPhotos[activeCatIndex].caption}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-2 overflow-x-auto py-3 px-1 mt-2 scrollbar-none">
                  {catPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCatIndex(index)}
                      className={`relative flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeCatIndex === index
                        ? "border-accent-secondary scale-105 shadow-md"
                        : "border-card-border/40 opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={photo.src}
                        alt={`Cat Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// ------------------------------------------------------------------
// COZY SILHOUETTE CAT WITH EMBEDDED STATE MACHINE (.lottie CANVAS LOADER)
// ------------------------------------------------------------------
interface SilhouetteCatProps {
  modalActive: boolean;
  animationsEnabled: boolean;
}

function SilhouetteCat({ modalActive, animationsEnabled }: SilhouetteCatProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let dotLottie: any = null;

    import("@lottiefiles/dotlottie-web").then(({ DotLottie }) => {
      if (!canvasRef.current) return;

      dotLottie = new DotLottie({
        autoplay: !modalActive && animationsEnabled,
        canvas: canvasRef.current,
        src: "/silhouette_cat.lottie",
      });

      dotLottie.addEventListener("load", () => {
        try {
          dotLottie.stateMachineLoad("StateMachine1");
          dotLottie.stateMachineStart();
        } catch (e) {
          console.error("Failed to load or start state machine on Silhouette Cat:", e);
        }
      });

      playerRef.current = dotLottie;
    });

    return () => {
      if (dotLottie) {
        dotLottie.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!playerRef.current) return;
    if (modalActive || !animationsEnabled) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  }, [modalActive, animationsEnabled]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
