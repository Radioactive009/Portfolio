"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-purple/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-neon-blue/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass rounded-[3.5rem] p-12 md:p-24 border border-white/10 flex flex-col items-center text-center">
          <SectionHeading subtitle="GET IN TOUCH" title="Let's Build the Future" />
          
          <p className="max-w-2xl text-white/50 text-lg md:text-xl leading-relaxed mb-16 font-light mt-8">
            I'm currently open to new opportunities and ambitious projects. 
            If you're looking for an engineer to architect your next intelligence layer or scale your AI infrastructure, let's connect.
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <GlowButton href={`mailto:${siteConfig.contact.email}`} variant="primary">
              Send an Email
            </GlowButton>
            <GlowButton href={siteConfig.contact.linkedin} variant="ghost">
              Connect on LinkedIn
            </GlowButton>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple text-white flex items-center justify-center text-xs font-black shadow-lg shadow-neon-blue/20 group-hover:shadow-neon-blue/40 transition-all duration-500">
                K
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">© 2026 KISLAY KUMAR</div>
                <div className="text-[9px] font-bold tracking-[0.1em] text-white/20">AI ENGINEER • BIHAR, INDIA</div>
              </div>
            </div>
            
            <div className="flex gap-10">
              <a 
                href={siteConfig.contact.github} 
                target="_blank" 
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors duration-300"
              >
                GitHub
              </a>
              <a 
                href={siteConfig.contact.linkedin} 
                target="_blank" 
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email}`} 
                className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors duration-300"
              >
                Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
