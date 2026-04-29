"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  icon?: React.ReactNode;
}

export default function GlowButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  icon,
}: GlowButtonProps) {
  const base = "relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-display font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden group";

  const variants = {
    primary: "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_20px_rgba(0,212,255,0.2)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] border border-white/20",
    ghost: "glass border border-white/10 text-white/70 hover:border-neon-blue/40 hover:text-white hover:bg-white/5",
    outline: "bg-transparent border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]",
  };

  const content = (
    <>
      {/* Liquid Shimmer Sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
      
      {/* Internal Radial Glow */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] transition-opacity duration-500" />

      {icon && (
        <span className="relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
          {icon}
        </span>
      )}
      
      <span className="relative z-10 group-hover:tracking-[0.25em] transition-all duration-500">
        {children}
      </span>
      
      {/* Trail effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
    </>
  );

  const wrapperProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    className: cn(base, variants[variant], className),
  };

  if (href) {
    return (
      <motion.a {...wrapperProps} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...wrapperProps} onClick={onClick}>
      {content}
    </motion.button>
  );
}
