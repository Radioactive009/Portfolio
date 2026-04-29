"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

interface ParticleFieldProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export default function ParticleField({ mouseX, mouseY }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const count = 1200;

  // Generate particle positions and random velocities
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions: pos, velocities: vel };
  }, []);

  // Geometry for connection lines
  const lineGeometry = useMemo(() => {
    const maxLines = 800;
    const linePos = new Float32Array(maxLines * 6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const mX = mouseX.get();
    const mY = mouseY.get();

    // 1. Move Particles
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3] + Math.sin(t * 0.3 + i) * 0.0005;
      posArray[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.2 + i) * 0.0005;

      // Wrap-around
      if (posArray[i * 3] > 10) posArray[i * 3] = -10;
      if (posArray[i * 3] < -10) posArray[i * 3] = 10;
      if (posArray[i * 3 + 1] > 6) posArray[i * 3 + 1] = -6;
      if (posArray[i * 3 + 1] < -6) posArray[i * 3 + 1] = 6;
    }
    posAttr.needsUpdate = true;

    // 2. Interaction
    pointsRef.current.rotation.y = mX * 0.08;
    pointsRef.current.rotation.x = -mY * 0.05;
    linesRef.current.rotation.copy(pointsRef.current.rotation);

    // 3. Update Connections
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineArray = linePosAttr.array as Float32Array;
    const maxDist = 2.5;
    let lineIdx = 0;
    const maxLineVerts = lineArray.length / 6;

    for (let i = 0; i < count && lineIdx < maxLineVerts; i++) {
      for (let j = i + 1; j < count && lineIdx < maxLineVerts; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          lineArray[lineIdx * 6] = posArray[i * 3];
          lineArray[lineIdx * 6 + 1] = posArray[i * 3 + 1];
          lineArray[lineIdx * 6 + 2] = posArray[i * 3 + 2];
          lineArray[lineIdx * 6 + 3] = posArray[j * 3];
          lineArray[lineIdx * 6 + 4] = posArray[j * 3 + 1];
          lineArray[lineIdx * 6 + 5] = posArray[j * 3 + 2];
          lineIdx++;
        }
      }
    }

    // Clear remaining
    for (let i = lineIdx; i < maxLineVerts; i++) {
      lineArray[i * 6] = 0; lineArray[i * 6 + 1] = 0; lineArray[i * 6 + 2] = 0;
      lineArray[i * 6 + 3] = 0; lineArray[i * 6 + 4] = 0; lineArray[i * 6 + 5] = 0;
    }
    linePosAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.05}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
