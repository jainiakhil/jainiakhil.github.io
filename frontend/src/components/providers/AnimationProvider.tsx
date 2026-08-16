"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AnimationContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  animationsEnabled: true,
  toggleAnimations: () => {},
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("animations_enabled");
    if (saved !== null) {
      setAnimationsEnabled(saved === "true");
    }
  }, []);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("animations_enabled", String(newValue));
      return newValue;
    });
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  return useContext(AnimationContext);
}
