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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0F]"
    >
      <div className="absolute inset-0 grid-overlay opacity-20 z-[1] pointer-events-none" />

      {mounted && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
          >
            <Suspense fallback={null}>
              <ParticleField mouseX={mouseX} mouseY={mouseY} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="relative z-10 text-center px-6 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">
            AI Engineer & Architect
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-[110px] font-display font-black mb-8 leading-[0.85] tracking-tighter"
        >
          <span className="text-neon-blue block">Kislay</span>
          <span className="bg-gradient-to-r from-neon-blue via-white to-neon-purple bg-clip-text text-transparent">
            Kumar
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-14 max-w-2xl mx-auto"
        >
          <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium">
            Building production-ready systems at the intersection of AI & Engineering.
            <br />
            Transforming unstructured data into <span className="text-neon-blue">actionable intelligence</span>.
          </p>
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
