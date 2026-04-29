"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  center = false,
  className,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(center ? "text-center" : "", className)}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-px bg-neon-blue/60" />
          <span className="text-xs font-semibold tracking-[0.2em] text-neon-blue uppercase">
            {eyebrow}
          </span>
          <span className="w-6 h-px bg-neon-blue/60" />
        </div>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-4">
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-white/50 text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
