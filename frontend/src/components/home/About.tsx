"use client";

import { motion, Variants } from "framer-motion";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.25, // Stagger elements slowly and dreamily
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1.0], // dreamy easeInOut
      },
    },
  };

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden z-10">
      
      {/* Section Heading (Z-Sandwich: z-10) */}
      <div className="flex flex-col items-center text-center mb-20 z-10 relative select-none">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight">
          About Me
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm font-medium mt-3 opacity-80">
          a little glimpse into my journey under the stars
        </p>
      </div>

      {/* Drifting Atmosphere Clouds (Z-Sandwich: z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden select-none">
        <motion.div
          animate={{ x: ["-20%", "120%"] }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute top-8 left-0 w-96 h-36 opacity-[0.28] sm:opacity-[0.38]"
        >
          <svg className="w-full h-full text-background-secondary/35 fill-current filter blur-xl" viewBox="0 0 300 120">
            <path d="M 30 90 C 30 70, 60 60, 80 60 C 100 30, 160 20, 200 50 C 230 35, 270 50, 270 80 C 285 80, 295 90, 295 100 C 295 110, 30 110, 30 90 Z" />
          </svg>
        </motion.div>
        
        <motion.div
          animate={{ x: ["120%", "-20%"] }}
          transition={{ repeat: Infinity, duration: 110, ease: "linear" }}
          className="absolute bottom-12 right-0 w-[450px] h-40 opacity-[0.22] sm:opacity-[0.32]"
        >
          <svg className="w-full h-full text-background-secondary/25 fill-current filter blur-2xl" viewBox="0 0 400 150">
            <path d="M 50 120 C 50 90, 90 80, 110 80 C 130 50, 210 40, 250 70 C 290 50, 350 70, 350 110 C 370 110, 390 120, 390 135 C 390 150, 50 150, 50 120 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Main Interactive Content (Z-Sandwich: z-30) */}
      <div className="max-w-6xl mx-auto z-30 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Portrait Photo Placeholder & Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center text-center">
            
            {/* PORTRAIT PHOTO PLACEHOLDER */}
            {/* PLACEHOLDER: Replace the SVG inside this container with an <img> tag to display your custom photo */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-card-bg/25 border-2 border-accent-primary/20 p-1.5 mb-6 shadow-md transition-transform duration-500 hover:border-accent-secondary/30">
              <div className="w-full h-full rounded-full overflow-hidden bg-background-secondary/15 flex items-center justify-center">
                <svg className="w-1/2 h-1/2 text-text-secondary/30 fill-current" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              {/* Soft lunar edge glow overlay */}
              <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
            </div>

            {/* Profile Name & Soft Tagline */}
            <h3 className="font-display text-2xl font-bold text-text-primary">
              Akhil Jaini
            </h3>
            <p className="text-sm font-medium text-accent-secondary mt-1 max-w-xs leading-relaxed">
              astrophysicist, starry-eyed builder, and dream chaser
            </p>
          </motion.div>

          {/* Right Column: Warm, letter-like biography narrative */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6 text-left">
            <p className="text-sm sm:text-base text-text-secondary leading-[1.8] font-medium">
              I've always been drawn to the night sky. There's something magical about looking up from a quiet, grassy field and wondering what's out there. My journey began with that simple childhood curiosity, which eventually led me to study physics and astronomy. Today, as an astrophysicist, I get to spend my time searching for fleeting bursts of radio light from galaxies billions of light-years away, and writing code that simulates the graceful, sweeping dances of stars orbiting supermassive black holes.
            </p>
            
            <p className="text-sm sm:text-base text-text-secondary leading-[1.8] font-medium">
              But I've always believed that science shouldn't feel cold, rigid, or unreachable. To me, programming is a deeply creative medium — a way to weave complex cosmic datasets into warm, beautiful, and interactive experiences. Whether I'm optimization-tuning high-performance computing pipelines or crafting playful web interfaces, my goal is to build spaces that let others share in the child-like wonder of looking up at the stars.
            </p>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
