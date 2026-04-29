"use client";

import { Canvas } from "@react-three/fiber";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import ParticleField from "@/components/three/ParticleField";

export default function GlobalBackground() {
  const { mouseX, mouseY } = useMouseParallax();

  return (
    <div className="fixed inset-0 z-[0] pointer-events-none bg-[#0B0B0F]">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-30 z-[1]" />
      
      {/* 3D Neural Network - Moved to z-0 but container is behind content */}
      <div className="absolute inset-0 z-[0]">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
        >
          <ParticleField mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
      </div>
      
      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(11,11,15,0.6)_100%)] z-[2]" />
    </div>
  );
}
