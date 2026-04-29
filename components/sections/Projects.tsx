"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiProjects, devProjects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";

type Tab = "ai" | "dev";

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2C5.67 21.39 4.97 19.06 4.97 19.06c-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.29 3.46.99.1-.77.41-1.29.75-1.59-2.64-.3-5.42-1.32-5.42-5.87 0-1.3.46-2.36 1.22-3.19-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.64.24 2.85.12 3.15.76.83 1.22 1.9 1.22 3.19 0 4.56-2.78 5.57-5.43 5.86.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("ai");

  const projects = activeTab === "ai" ? aiProjects : devProjects;

  return (
    <section id="projects" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <SectionHeading
            eyebrow="Featured Work"
            title="Projects That"
            titleHighlight="Think"
            subtitle="Production-grade AI systems and full-stack applications — built for impact."
          />
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mb-12">
          {(["ai", "dev"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-blue/20 to-purple-600/20 border border-neon-blue/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {tab === "ai" ? "🧠 AI Projects" : "⚡ Dev Projects"}
              </span>
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <GlassCard
                key={project.id}
                delay={i * 0.1}
                hoverGlow={project.accentColor + "30"}
                className={`p-0 ${
                  "highlight" in project && project.highlight && i === 0
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                {/* Card top accent gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.gradient.replace('/20', '')}`}
                />

                {/* Category badge */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-50 pointer-events-none`}
                />

                <div className="relative p-6">
                  {/* Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full border"
                      style={{
                        color: project.accentColor,
                        borderColor: project.accentColor + "40",
                        background: project.accentColor + "15",
                      }}
                    >
                      {project.category}
                    </span>
                    {(project as any).highlight && (
                      <span className="text-[10px] text-neon-blue font-bold tracking-[0.3em] uppercase flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-neon-blue animate-pulse" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-white mb-3 leading-tight group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <a
                      href="https://github.com/Radioactive009"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors duration-200 group/link"
                    >
                      <GithubIcon />
                      <span>GitHub</span>
                    </a>
                    <span className="w-px h-4 bg-white/10" />
                    {(project as any).liveUrl ? (
                      <a
                        href={(project as any).liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-neon-blue hover:text-white transition-colors duration-200 group/link"
                      >
                        <ExternalIcon />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-white/20 cursor-not-allowed">
                        <ExternalIcon />
                        <span>Details on request</span>
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <GlowButton href="https://github.com/Radioactive009" variant="ghost">
            View All on GitHub
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
