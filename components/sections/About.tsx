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
    desc: "Deep expertise in Transformer variants, attention mechanisms, and custom model fine-tuning (LoRA/QLoRA) for domain-specific tasks.",
    icon: "🧠",
  },
  {
    title: "Agentic Orchestration",
    desc: "Architecting multi-agent systems that use structured reasoning, vector memory (FAISS), and complex tool-use to solve non-linear problems.",
    icon: "🤖",
  },
  {
    title: "Intelligence Pipelines",
    desc: "Building robust RAG systems with advanced retrieval techniques, semantic reranking, and self-correcting feedback loops.",
    icon: "🏗️",
  },
  {
    title: "Production Engineering",
    desc: "Optimizing AI models for deployment, ensuring low-latency inference, and building scalable backends for intelligent applications.",
    icon: "🚀",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="ABOUT ME" title="Thinking in Systems" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group order-2 lg:order-1"
          >
            <div className="relative w-full aspect-square max-w-[450px] mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 glass group-hover:border-neon-blue/30 transition-colors duration-500 shadow-2xl">
                <Image
                  src="/assets/kislay.jpg"
                  alt="Kislay Kumar"
                  fill
                  className="object-cover object-center scale-[1.02] group-hover:scale-100 transition-transform duration-700"
                  priority
                />
                
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <p className="text-white font-display font-bold tracking-[0.2em] text-xs uppercase mb-1">
                    Kislay Kumar
                  </p>
                  <p className="text-neon-blue text-[10px] font-bold tracking-[0.3em] uppercase">
                    BIHAR, INDIA
                  </p>
                </div>
              </div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass px-5 py-4 rounded-2xl border border-white/10 shadow-2xl z-10"
              >
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1.5 font-bold">BTech Journey</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">3rd Year CS</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-10 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                I am an AI Engineer building the next generation of <span className="text-neon-blue font-medium">autonomous intelligence</span> systems while pursuing my BTech.
              </p>
              <p className="text-white/40 leading-relaxed text-sm md:text-base">
                I focus on the bridge between research and production. Currently in my 3rd year, I spend my time architecting systems that don't just process data—they reason, adapt, and learn in real-time environments.
              </p>
              
              <div className="flex gap-16 py-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="group cursor-default">
                    <div className="text-3xl font-display font-bold text-white mb-1">
                      <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all">
                        {stat.value}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Powerful Specializations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specializations.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="p-6 h-full flex flex-col group hover:bg-white/[0.03] transition-all border-white/5 hover:border-neon-blue/20">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl group-hover:scale-125 transition-transform duration-500">{spec.icon}</span>
                      <h4 className="text-sm font-bold text-white group-hover:text-neon-blue transition-colors uppercase tracking-widest">
                        {spec.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed">
                      {spec.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
