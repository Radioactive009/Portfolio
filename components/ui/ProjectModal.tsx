"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import GlowButton from "./GlowButton";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-void border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
          >
            {/* Visual Side */}
            <div 
              className="relative w-full md:w-2/5 min-h-[300px] md:min-h-full p-12 flex flex-col justify-end"
              style={{ background: `linear-gradient(to bottom right, ${project.accentColor}20, #000)` }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
                style={{ background: `radial-gradient(circle at top left, ${project.accentColor}40, transparent)` }}
              />
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Technical Specs</span>
                <div className="space-y-6">
                  {project.tags.map((tag: string) => (
                    <div key={tag} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-sm font-medium text-white/80">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neon-blue mb-4 block">
                Project Detail
              </span>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                {project.title}
              </h2>

              <div className="flex items-center gap-4 mb-8">
                <div className="px-4 py-2 rounded-xl bg-neon-blue/10 border border-neon-blue/20">
                  <span className="text-sm font-bold text-neon-blue tracking-widest uppercase italic">
                    {project.metric}
                  </span>
                </div>
                <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{project.category}</span>
              </div>

              <div className="space-y-6 text-white/60 leading-relaxed text-base">
                <p>{project.description}</p>
                <p>
                  This system was architected to handle high-fidelity data processing with a focus on reliability and speed. By leveraging modern AI paradigms, it provides a seamless interface between raw data and actionable intelligence.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-12">
                {project.liveUrl && (
                  <GlowButton href={project.liveUrl}>
                    Launch Live Site
                  </GlowButton>
                )}
                <GlowButton variant="ghost" href="https://github.com/Radioactive009">
                  View Repository
                </GlowButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
