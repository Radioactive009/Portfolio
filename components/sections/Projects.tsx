"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiProjects, devProjects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

type Tab = "ai" | "dev";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("ai");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = activeTab === "ai" ? aiProjects : devProjects;

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="section-padding relative">
      {/* Background Decorative elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-blue/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <SectionHeading
            subtitle="SELECTED WORKS"
            title="Building Intelligence"
          />
        </div>

        {/* Premium Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl">
            {(["ai", "dev"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-[1.2rem] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-[1.2rem] shadow-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === "ai" ? "AI Systems" : "Digital Tools"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="wait">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => handleProjectClick(project)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Expanded View Modal */}
      <ProjectModal 
        isOpen={isModalOpen} 
        project={selectedProject} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
