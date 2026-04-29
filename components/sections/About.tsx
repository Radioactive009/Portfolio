"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";

const stats = [
  { label: "AI Projects", value: "8+" },
  { label: "Domains", value: "3+" },
  { label: "Curiosity", value: "∞" },
];

const timeline = [
  {
    year: "2024",
    title: "AI Engineer",
    desc: "Building production-grade AI systems — RAG pipelines, multi-agent orchestration, and NLP intelligence engines.",
  },
  {
    year: "2023",
    title: "Full-Stack + ML Crossover",
    desc: "Merged software engineering expertise with machine learning, bridging the gap between model development and deployment.",
  },
  {
    year: "2022",
    title: "Deep Learning Foundations",
    desc: "Dove deep into transformer architectures, NLP fundamentals, and building intuition for language model behavior.",
  },
  {
    year: "2025 → NOW",
    title: "Building in Public",
    desc: "Actively building AI systems, fine-tuning models, and seeking opportunities to ship at scale.",
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
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 glass group-hover:border-neon-blue/30 transition-colors duration-500 shadow-2xl">
                <Image
                  src="/assets/kislay.jpg"
                  alt="Kislay Kumar"
                  fill
                  className="object-cover object-center scale-[1.02] group-hover:scale-100 transition-transform duration-700"
                  priority
                />
                
                {/* Information Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <p className="text-white font-display font-bold tracking-[0.2em] text-xs uppercase mb-1">
                    Kislay Kumar
                  </p>
                  <p className="text-neon-blue text-[10px] font-bold tracking-[0.3em] uppercase">
                    BIHAR, INDIA
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass px-5 py-4 rounded-2xl border border-white/10 shadow-2xl z-10"
              >
                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1.5 font-bold">Current Focus</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">Shipping AI</span>
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
                I am an AI Engineer with a deep obsession for turning raw, unstructured data into systems that <span className="text-neon-blue font-medium">actually think</span>.
              </p>
              <p className="text-white/40 leading-relaxed text-sm md:text-base">
                My work lives at the intersection of language models, vector databases, and multi-agent orchestration. I don't just call APIs — I architect pipelines that understand context, retrieve knowledge, reason under uncertainty, and deliver reliable intelligence.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="p-6 h-full flex flex-col justify-between group hover:bg-white/[0.03] transition-all border-white/5 hover:border-neon-blue/20">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-neon-blue tracking-widest">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/30 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
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
