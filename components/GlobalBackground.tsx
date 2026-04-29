"use client";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { useMouseParallax } from "@/hooks/useMouseParallax";

const ParticleField = lazy(() => import("@/components/three/ParticleField"));

export default function GlobalBackground() {
  const { mouseX, mouseY } = useMouseParallax();

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0B0B0F]">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-20 z-[1]" />
      
      {/* 3D Neural Network */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleField mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
      
      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(11,11,15,0.4)_100%)] z-[2]" />
    </div>
  );
}
