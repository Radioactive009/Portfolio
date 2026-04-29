"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: any;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative cursor-pointer group h-full"
    >
      {/* Main Card - Matching the Specialization style */}
      <div className="relative h-full w-full rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-3xl border border-white/5 group-hover:border-neon-blue/20 transition-all duration-500 p-8 flex flex-col shadow-2xl">
        
        {/* Category & Status */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/30">
            {project.category}
          </span>
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.accentColor }}
          />
        </div>

        {/* Content Area */}
        <div className="space-y-4" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase group-hover:text-neon-blue transition-colors">
            {project.title}
          </h3>
          
          {/* Key Metric - Subtle and Integrated */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5">
            <span className="text-[10px] font-bold text-neon-blue tracking-widest uppercase">
              {project.metric}
            </span>
          </div>

          <p className="text-[11px] text-white/40 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Tags - Minimalist row at the bottom */}
        <div className="mt-10 flex flex-wrap gap-2 pt-6 border-t border-white/5">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-[8px] font-bold text-white/20 uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
