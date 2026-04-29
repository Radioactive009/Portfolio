"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { aiSkills, engineeringSkills, toolsSkills } from "@/lib/data";
import SkillCard from "@/components/ui/SkillCard";

export default function TechStack() {
  return (
    <section id="skills" className="section-padding relative z-10">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-blue/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading subtitle="TOOLS OF THE TRADE" title="Technical Arsenal" />

        <div className="mt-16 space-y-24">
          {/* AI / ML Category */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neon-blue">01</span>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest">AI / Machine Learning</h3>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiSkills.map((skill, i) => (
                <SkillCard key={skill} name={skill} index={i} category="ai" />
              ))}
            </div>
          </div>

          {/* Engineering Category */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neon-purple">02</span>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest">Core Engineering</h3>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {engineeringSkills.map((skill, i) => (
                <SkillCard key={skill} name={skill} index={i} category="eng" />
              ))}
            </div>
          </div>

          {/* Tools Category */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neon-cyan">03</span>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest">Platforms & Tools</h3>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {toolsSkills.map((skill, i) => (
                <SkillCard key={skill} name={skill} index={i} category="tools" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
