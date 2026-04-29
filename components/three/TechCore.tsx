"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Icosahedron, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  "RAG", "Python", "PyTorch", "LangChain", 
  "BERT", "Node.js", "HuggingFace", "React", 
  "FAISS", "MongoDB", "TensorFlow", "OpenAI"
];

function FloatingLabels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 3.2;
      return new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    });
  }, []);

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={positions[i]}>
          <Text
            fontSize={0.25}
            color="#00D4FF"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        </Float>
      ))}
    </group>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group>
      <Icosahedron args={[1, 4]} ref={meshRef}>
        <MeshDistortMaterial
          color="#7C3AED"
          speed={2}
          distort={0.3}
          radius={1}
          emissive="#7C3AED"
          emissiveIntensity={1}
        />
      </Icosahedron>

      <mesh>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color="#00D4FF" wireframe opacity={0.05} transparent />
      </mesh>
    </group>
  );
}

export default function TechCore() {
  return (
    <div className="h-[400px] w-full relative">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00D4FF" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#7C3AED" />
        
        <Suspense fallback={null}>
          <InnerCore />
          <FloatingLabels />
        </Suspense>
      </Canvas>
      
      {/* Fade overlay to integrate with background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none opacity-50" />
    </div>
  );
}
