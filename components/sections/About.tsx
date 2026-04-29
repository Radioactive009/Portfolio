"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

const stats = [
  { label: "AI Projects", value: "8+" },
  { label: "Domains", value: "3+" },
  { label: "BTech Year", value: "3rd" },
];

const specializations = [
  {
    title: "Neural Architectures",
    desc: "Expertise in Transformer variants, attention mechanisms, and custom model fine-tuning (LoRA/QLoRA).",
  },
  {
    title: "Agentic Orchestration",
    desc: "Architecting multi-agent systems with structured reasoning and vector memory (FAISS).",
  },
  {
    title: "Intelligence Pipelines",
    desc: "Building robust RAG systems with semantic reranking and self-correcting feedback loops.",
  },
  {
    title: "Production Engineering",
    desc: "Optimizing models for deployment, low-latency inference, and building scalable backends.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-void/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="ABOUT ME" title="Thinking in Systems" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Portrait & Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/assets/kislay.jpg"
                alt="Kislay Kumar"
                fill
                className="object-cover object-[45%_15%] transition-all duration-700 scale-105 group-hover:scale-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              {/* Corner Tag */}
              <div className="absolute top-6 left-6 glass px-3 py-1.5 rounded-full border border-white/10">
                <p className="text-[9px] font-bold text-white tracking-[0.2em] uppercase">CS ENGINEER</p>
              </div>
            </div>

            {/* Stats Bar (Now vertically stacked under image for better organization) */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl glass border border-white/5">
                  <p className="text-xl font-display font-bold text-neon-blue mb-1">{stat.value}</p>
                  <p className="text-[8px] text-white/30 font-bold tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Detailed Bio & Specializations */}
          <div className="lg:col-span-8 space-y-12">
            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                Bridging the gap between <span className="text-neon-blue">AI Research</span> and <span className="text-neon-purple">Scalable Systems</span>.
              </h3>
              <p className="text-white/50 leading-relaxed text-base">
                Currently in my 3rd year of BTech, I focus on architecting autonomous intelligence systems. I spend my time building pipelines that don't just process data—they reason, adapt, and deliver high-fidelity results in production environments.
              </p>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase whitespace-nowrap">Core Specializations</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
            </motion.div>

            {/* Specializations Grid (Clean 2x2 Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specializations.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group">
                    <h4 className="text-xs font-bold text-white mb-3 tracking-widest uppercase group-hover:text-neon-blue transition-colors">
                      {spec.title}
                    </h4>
                    <p className="text-xs text-white/40 leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
