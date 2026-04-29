"use client";

import { Suspense, lazy, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { aiSkills, engineeringSkills, toolsSkills } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const TechSphere = lazy(() => import("@/components/three/TechSphere"));

const SPECIALIZATION =
  "I specialize in building production-ready AI systems that convert unstructured data into actionable intelligence.";

const categories = [
  {
    label: "AI / Machine Learning",
    skills: aiSkills,
    color: "#00D4FF",
    gradient: "from-neon-blue/20 to-transparent",
  },
  {
    label: "Engineering & Development",
    skills: engineeringSkills,
    color: "#A855F7",
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    label: "Tools & Platforms",
    skills: toolsSkills,
    color: "#BD00FF",
    gradient: "from-neon-purple/20 to-transparent",
  },
];

interface SkillBadgeProps {
  skill: string;
  delay: number;
  color: string;
}

function SkillBadge({ skill, delay, color }: SkillBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative px-4 py-2 rounded-xl glass border border-white/5 transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? color + "40" : undefined,
        boxShadow: hovered ? `0 0 15px ${color}20` : undefined,
      }}
    >
      <span className="text-sm font-medium text-white/70" style={{ color: hovered ? color : undefined }}>
        {skill}
      </span>
    </motion.div>
  );
}

interface CategoryBlockProps {
  label: string;
  skills: string[];
  color: string;
  gradient: string;
  index: number;
}

function CategoryBlock({ label, skills, color, gradient, index }: CategoryBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass rounded-2xl p-6 border border-white/5"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-6 rounded-full" style={{ background: color }} />
        <h3 className="font-display font-semibold text-white text-base">
          {label}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <SkillBadge
            key={skill}
            skill={skill}
            delay={index * 0.1 + i * 0.04}
            color={color}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-6">
          <SectionHeading
            eyebrow="Tech Stack"
            title="Tools of"
            titleHighlight="the Trade"
          />
        </div>

        {/* Specialization line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neon-blue/90 text-base md:text-lg font-medium max-w-2xl mb-14 leading-relaxed border-l-2 border-neon-blue/40 pl-4"
        >
          {SPECIALIZATION}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Skill categories */}
          <div className="space-y-5">
            {categories.map((cat, i) => (
              <CategoryBlock
                key={cat.label}
                label={cat.label}
                skills={cat.skills}
                color={cat.color}
                gradient={cat.gradient}
                index={i}
              />
            ))}
          </div>

          {/* Right — 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[480px] h-[480px]">
              {/* Glow behind sphere */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-purple-600/20 blur-[60px]" />
              </div>

              {/* Canvas */}
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <TechSphere />
                </Suspense>
              </Canvas>

              {/* Ring decoration */}
              <div className="absolute inset-8 rounded-full border border-neon-blue/10 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-purple-600/10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
