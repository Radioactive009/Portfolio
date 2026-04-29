"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { timeline, siteConfig } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const StatCard = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-neon-blue/20 transition-colors duration-300"
    >
      <div className="text-4xl font-display font-bold gradient-text mb-1">
        {value}
      </div>
      <div className="text-white/40 text-sm font-medium">{label}</div>
    </motion.div>
  );
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Content */}
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="ABOUT ME" title="Thinking in Systems" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative w-full aspect-square max-w-[450px] mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 glass group-hover:border-neon-blue/30 transition-colors duration-500">
                <Image
                  src="/assets/kislay.jpg"
                  alt="Kislay Kumar"
                  fill
                  className="object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                
                {/* Glass overlay on image bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-display font-bold tracking-widest text-xs uppercase">
                    Kislay Kumar
                  </p>
                  <p className="text-neon-blue text-[10px] font-medium tracking-widest uppercase mt-1">
                    Bihar, India
                  </p>
                </div>
              </div>

              {/* Float badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass px-4 py-3 rounded-2xl border border-white/10 shadow-xl"
              >
                <p className="text-[10px] text-white/40 uppercase tracking-tighter mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-widest">BUILDING</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Philosophy quote */}
              <blockquote className="border-l-2 border-neon-blue/60 pl-5 py-1 mt-6">
                <p className="text-white/70 italic font-light text-base">
                  &ldquo;The best AI systems aren&apos;t the most complex ones — they&apos;re
                  the ones that solve real problems with elegant, reliable
                  architecture.&rdquo;
                </p>
              </blockquote>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard value="8+" label="AI Projects" delay={0.3} />
              <StatCard value="3+" label="Domains" delay={0.4} />
              <StatCard value="∞" label="Curiosity" delay={0.5} />
            </div>
          </div>

          {/* Right — Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue/40 via-purple-600/40 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-12 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-neon-blue shadow-glow-sm" />
                    <div className="absolute w-6 h-6 rounded-full bg-neon-blue/20 animate-pulse" />
                  </div>

                  <div className="glass rounded-xl p-5 border border-white/5 hover:border-neon-blue/20 transition-colors duration-300">
                    <span className="text-xs font-bold text-neon-blue tracking-widest uppercase mb-1 block">
                      {item.year}
                    </span>
                    <h4 className="text-white font-display font-semibold text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Current */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative pl-16"
              >
                <div className="absolute left-0 top-1.5 w-12 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-neon-purple shadow-neon-purple" />
                  <div className="absolute w-6 h-6 rounded-full bg-neon-purple/20 animate-pulse" />
                </div>
                <div className="glass rounded-xl p-5 border border-neon-purple/20 bg-gradient-to-br from-purple-900/10 to-transparent">
                  <span className="text-xs font-bold text-neon-purple tracking-widest uppercase mb-1 block">
                    2025 → Now
                  </span>
                  <h4 className="text-white font-display font-semibold text-lg mb-2">
                    Building in Public
                  </h4>
                  <p className="text-white/45 text-sm leading-relaxed">
                    Actively building AI systems, fine-tuning models, and
                    seeking opportunities to ship at scale.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
