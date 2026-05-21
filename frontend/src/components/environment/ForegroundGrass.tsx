"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface CharacterInfo {
  type: "waving" | "jumping" | "gazing";
  side: "left" | "right";
  animationPath: string;
  loop: boolean;
}

export default function ForegroundGrass() {
  const [mounted, setMounted] = useState(false);
  const [character, setCharacter] = useState<CharacterInfo | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Randomly select one of the three animations
    const types: ("waving" | "jumping" | "gazing")[] = ["waving", "jumping", "gazing"];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const chosenSide = Math.random() > 0.5 ? "left" : "right";

    let path = "/waving_hello.json";
    let loop = true;
    if (chosenType === "jumping") {
      path = "/jumping_hello.json";
    } else if (chosenType === "gazing") {
      path = "/star_gazing.json";
      loop = true;
    }

    setCharacter({
      type: chosenType,
      side: chosenSide,
      animationPath: path,
      loop: loop,
    });

    // Fade-in after a delay of 3.5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Fetch the Lottie JSON dynamically to prevent compilation and SSR loading issues
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

  // Scroll parallax logic: as the user scrolls, foreground hills shift up
  // slightly faster than background hills, creating depth.
  // The SVG heights extend far down, meaning shifting up does not show empty space.
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[38] pointer-events-none select-none h-[50vh] overflow-x-hidden">
      <div className="absolute bottom-[-32px] left-0 right-0 w-full h-[calc(15vh+60px)]">
        
        {/* Layer 1: Back Hill (Slowest, receding gold/slate) */}
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

        {/* Layer 2: Mid Hill (Medium, gentle sage-olive/indigo-teal) */}
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

            {/* ==================================================================
                FUTURE ASSET SLOT: STARGAZER / TELESCOPE / LYING ON THE FIELD
                ==================================================================
                Perfect position on the peak of the Mid Hill (X: ~340px, Y: ~75px).
                To activate, insert your custom SVG or components within the group below.
            */}
            <g id="future-stargazer-slot" transform="translate(340, 75)" className="opacity-80">
              {/* PLACEHOLDER: Replace with your custom illustration of stargazing person */}
              {/* <circle cx="0" cy="0" r="5" fill="currentColor" className="text-accent-primary" /> */}
            </g>
          </svg>
        </motion.div>

        {/* Layer 3: Front Hill (Fastest, rich grass/pine-green with grass details) */}
        <motion.div
          style={{ y: yFront }}
          className="absolute inset-x-0 bottom-0 h-full w-full"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
          >
            {/* Main hill shape */}
            <path
              d="M0 150 C 320 100, 680 170, 1000 120 C 1200 85, 1360 140, 1440 135 L 1440 220 L 0 220 Z"
              className="fill-hill-front transition-[fill] duration-1000 ease-in-out"
            />

            {/* Hand-drawn whimsical Ghibli-esque grass tufts along the ridge */}
            <g className="fill-hill-front transition-[fill] duration-1000 ease-in-out">
              {/* Tuft 1 (Left edge slope) */}
              <path d="M 80 146 C 78 136, 75 131, 70 128 C 75 134, 78 141, 80 146 M 80 146 C 81 134, 83 128, 85 124 C 83 131, 81 139, 80 146 M 80 146 C 83 137, 88 133, 92 131 C 87 136, 83 141, 80 146" />
              
              {/* Tuft 2 (First Peak slope) */}
              <path d="M 310 103 C 308 93, 305 88, 300 85 C 305 91, 308 98, 310 103 M 310 103 C 311 91, 313 85, 315 81 C 313 88, 311 96, 310 103 M 310 103 C 313 94, 318 90, 322 88 C 317 93, 313 98, 310 103" />

              {/* Tuft 3 (Mid-valley) */}
              <path d="M 640 156 C 638 146, 635 141, 630 138 C 635 144, 638 151, 640 156 M 640 156 C 641 144, 643 138, 645 134 C 643 141, 641 149, 640 156 M 640 156 C 643 147, 648 143, 652 141 C 647 146, 643 151, 640 156" />

              {/* Tuft 4 (Second Peak) */}
              <path d="M 980 122 C 978 112, 975 107, 970 104 C 975 110, 978 117, 980 122 M 980 122 C 981 110, 983 104, 985 100 C 983 107, 981 115, 980 122 M 980 122 C 983 113, 988 109, 992 107 C 987 112, 983 117, 980 122" />

              {/* Tuft 5 (Right slope) */}
              <path d="M 1250 114 C 1248 104, 1245 99, 1240 96 C 1245 102, 1248 109, 1250 114 M 1250 114 C 1251 102, 1253 96, 1255 92 C 1253 99, 1251 107, 1250 114 M 1250 114 C 1253 105, 1258 101, 1262 99 C 1257 104, 1253 109, 1250 114" />
            </g>

            {/* ==================================================================
                FUTURE ASSET SLOT 1: COZY NAPPING CAT
                ==================================================================
                Perfect position nestled in a gentle dip of the Front Hill (X: ~590px, Y: ~150px).
                To activate, insert your custom SVG or components within the group below.
            */}
            <g id="future-cat-slot" transform="translate(590, 150)" className="opacity-95">
              {/* PLACEHOLDER: Replace with your custom illustration of a napping cat */}
            </g>

            {/* ==================================================================
                FUTURE ASSET SLOT 2: RUNNING / TROTTING DOG
                ==================================================================
                Perfect position cruising across the right slope of the Front Hill (X: ~1100px, Y: ~115px).
                To activate, insert your custom SVG or components within the group below.
            */}
            <g id="future-dog-slot" transform="translate(1100, 115)" className="opacity-90">
              {/* PLACEHOLDER: Replace with your custom illustration of a running dog */}
            </g>
          </svg>

          {/* Dynamic Lottie Grassland Character (Standing or Laying, beautifully parallax-bound to Front Hill) */}
          {character && animationData && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className={`absolute z-[39] pointer-events-none will-change-[transform,opacity] ${
                character.side === "left"
                  ? character.type === "gazing"
                    ? "left-[6%] sm:left-[10%] bottom-[8%] sm:bottom-[11%]"
                    : "left-[8%] sm:left-[12%] bottom-[22%] sm:bottom-[27%]"
                  : character.type === "gazing"
                    ? "right-[6%] sm:right-[10%] bottom-[13%] sm:bottom-[17%] scale-x-[-1]"
                    : "right-[8%] sm:right-[12%] bottom-[28%] sm:bottom-[34%] scale-x-[-1]"
              }`}
              style={{
                width: character.type === "gazing" ? "240px" : "180px",
                height: character.type === "gazing" ? "240px" : "180px",
                maxWidth: "35vw",
                maxHeight: "35vw",
              }}
            >
              <Lottie
                animationData={animationData}
                loop={character.loop}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
