"use client";

import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

export function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const animate = () => {
      const current = { x: mouseX.get(), y: mouseY.get() };
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      mouseX.set(lerp(current.x, targetRef.current.x, 0.05));
      mouseY.set(lerp(current.y, targetRef.current.y, 0.05));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
}
