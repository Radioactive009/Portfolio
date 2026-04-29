"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  hoverGlow = "rgba(0,212,255,0.15)",
  delay = 0,
}: GlassCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative glass rounded-2xl overflow-hidden transition-all duration-500 group cursor-default",
        "hover:-translate-y-2 hover:shadow-card-glow",
        className
      )}
      style={
        {
          "--hover-glow": hoverGlow,
        } as React.CSSProperties
      }
    >
      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${hoverGlow}, inset 0 0 30px ${hoverGlow}20` }}
      />
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}
