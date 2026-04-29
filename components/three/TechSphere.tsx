"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const TECH_LABELS = [
  "Python", "PyTorch", "LangChain", "FAISS",
  "RAG", "BERT", "Llama", "NLP",
  "Next.js", "React", "Node.js", "OpenAI",
  "HuggingFace", "TensorFlow", "MongoDB", "NumPy",
];

interface LabelProps {
  label: string;
  index: number;
  total: number;
}

function OrbitLabel({ label, index, total }: LabelProps) {
  const ref = useRef<THREE.Group>(null);

  // Fibonacci sphere distribution for even label placement
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  const radius = 2.8;

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  useFrame(({ clock, camera }) => {
    if (!ref.current) return;
    // Labels always face camera
    ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref} position={[x, y, z]}>
      <Text
        fontSize={0.18}
        color="#00D4FF"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.85}
      >
        {label}
      </Text>
    </group>
  );
}

export default function TechSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#0B0B0F"
          emissive="#7C3AED"
          emissiveIntensity={0.3}
          wireframe={false}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.21, 1]} />
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Outer wireframe ring */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#A855F7"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Labels */}
      {TECH_LABELS.map((label, i) => (
        <OrbitLabel key={label} label={label} index={i} total={TECH_LABELS.length} />
      ))}

      {/* Ambient light for sphere */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#BD00FF" />
    </group>
  );
}
