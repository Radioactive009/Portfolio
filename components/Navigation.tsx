"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import GlowButton from "@/components/ui/GlowButton";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5 py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold group-hover:bg-neon-blue group-hover:text-white transition-all">
              K
            </div>
            <span className="font-display font-bold text-white text-sm tracking-widest uppercase">
              Kislay
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <GlowButton 
            onClick={() => scrollTo("#contact")} 
            variant="primary" 
            className="px-6 py-2.5 text-[10px]"
          >
            Hire Me
          </GlowButton>
        </div>
      </motion.nav>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] z-[100] origin-left bg-neon-blue"
        style={{ scaleX: progress }}
      />
    </>
  );
}
