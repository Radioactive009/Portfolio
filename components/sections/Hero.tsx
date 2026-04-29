"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import GlowButton from "@/components/ui/GlowButton";

const ParticleField = lazy(() => import("@/components/three/ParticleField"));

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2C5.67 21.39 4.97 19.06 4.97 19.06c-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.29 3.46.99.1-.77.41-1.29.75-1.59-2.64-.3-5.42-1.32-5.42-5.87 0-1.3.46-2.36 1.22-3.19-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.64.24 2.85.12 3.15.76.83 1.22 1.9 1.22 3.19 0 4.56-2.78 5.57-5.43 5.86.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);

const scrollTo = (href: string) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const { mouseX, mouseY } = useMouseParallax();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-bold tracking-[0.4em] uppercase text-neon-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            AI ENGINEER & ARCHITECT
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter mb-12"
        >
          <span className="text-gradient">ENGINEERING</span>
          <br />
          <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent italic">
            INTELLIGENCE
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed mb-16 font-light"
        >
          I architect production-grade AI systems that bridge the gap between 
          <span className="text-white"> raw data </span> and 
          <span className="text-white"> actionable intelligence.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-5"
        >
          <GlowButton onClick={() => scrollTo("#projects")} variant="primary">
            View Projects
          </GlowButton>
          <GlowButton 
            href="https://github.com/Radioactive009" 
            variant="ghost"
            icon={<GithubIcon />}
          >
            GitHub
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
