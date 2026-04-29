"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: any;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative cursor-pointer group"
    >
      {/* Glow Border */}
      <div 
        className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br transition-opacity duration-500 opacity-0 group-hover:opacity-100 blur-[1px]"
        style={{ backgroundImage: `linear-gradient(to bottom right, ${project.accentColor}, transparent, ${project.accentColor})` }}
      />

      {/* Main Card */}
      <div className="relative h-full w-full rounded-[2rem] bg-void/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Animated Background Flow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
          <div 
            className="absolute -inset-[100%] animate-[spin_10s_linear_infinite] opacity-50"
            style={{ 
              background: `conic-gradient(from 0deg, transparent, ${project.accentColor}, transparent 50%)` 
            }}
          />
        </div>

        <div className="relative p-8 h-full flex flex-col" style={{ transform: "translateZ(50px)" }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <span 
              className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50"
            >
              {project.category}
            </span>
            <div 
              className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_2px]"
              style={{ backgroundColor: project.accentColor, boxShadow: `0 0 10px 2px ${project.accentColor}` }}
            />
          </div>

          {/* Title & Metric */}
          <div className="mb-4">
            <h3 className="text-3xl font-display font-bold text-white mb-2 leading-tight group-hover:text-neon-blue transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-neon-blue tracking-widest uppercase">
                {project.metric}
              </span>
            </div>
          </div>

          {/* Scannable Description */}
          <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/30 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Hint */}
        <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
