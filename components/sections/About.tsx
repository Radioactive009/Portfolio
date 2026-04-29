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
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Thinking in"
              titleHighlight="Systems"
              subtitle=""
              className="mb-8"
            />

            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5 text-white/55 leading-relaxed mb-10"
            >
              <p>
                I&apos;m <span className="text-white font-semibold">Kislay Kumar</span>, an AI Engineer with
                a deep obsession for turning raw, unstructured data into systems
                that actually think — not just respond.
              </p>
              <p>
                My work lives at the intersection of{" "}
                <span className="text-neon-blue">language models</span>,{" "}
                <span className="text-purple-400">vector databases</span>, and{" "}
                <span className="text-neon-cyan">multi-agent orchestration</span>. I don&apos;t just call APIs — I
                architect pipelines that understand context, retrieve knowledge,
                reason under uncertainty, and deliver reliable intelligence.
              </p>
              <p>
                Whether it&apos;s a fine-tuned RAG model, a debating agent system, or
                a geopolitical NLP engine — I build for production, not
                prototypes.
              </p>

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
