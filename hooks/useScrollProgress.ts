"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useScrollProgress() {
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      rawProgress.set(total > 0 ? window.scrollY / total : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [rawProgress]);

  return progress;
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
