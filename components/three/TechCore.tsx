"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
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
      groupRef.current.rotation.x += 0.002;
    }
  });

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 3.5;
      return new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    });
  }, []);

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1} position={positions[i]}>
          <Text
            fontSize={0.3}
            color="#00D4FF"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
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
      {/* Inner Glowing Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial
          color="#7C3AED"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#7C3AED"
          emissiveIntensity={2}
          roughness={0}
        />
      </mesh>

      {/* Wireframe Outer Shell */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" wireframe opacity={0.1} transparent />
      </mesh>

      {/* Inner Points */}
      <points>
        <icosahedronGeometry args={[1.4, 4]} />
        <pointsMaterial color="#00D4FF" size={0.02} transparent opacity={0.5} />
      </points>
    </group>
  );
}

export default function TechCore() {
  return (
    <div className="h-[500px] w-full relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7C3AED" />
        
        <InnerCore />
        <FloatingLabels />

        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial color="#000" transparent opacity={0} />
        </mesh>
      </Canvas>
      
      {/* Center Shadow/Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-void/50 to-void pointer-events-none" />
    </div>
  );
}
