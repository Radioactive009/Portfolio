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
  const base = "relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-display font-bold text-xs uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden group";

  const variants = {
    primary: "bg-white text-black hover:bg-neon-blue hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]",
    ghost: "glass border border-white/10 text-white hover:border-neon-blue/40 hover:text-neon-blue",
    outline: "bg-transparent border-2 border-neon-blue/30 text-white hover:border-neon-blue hover:shadow-neon-blue",
  };

  const content = (
    <>
      {/* Animated Shimmer Overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      {/* Background glow on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-neon-blue to-purple-600 blur-xl transition-opacity duration-500" />

      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
      
      {/* Small trailing arrow animation for primary buttons */}
      {variant === "primary" && (
        <motion.span 
          className="relative z-10 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          →
        </motion.span>
      )}
    </>
  );

  const wrapperProps = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.98 },
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
