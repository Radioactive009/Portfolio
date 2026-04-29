"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2C5.67 21.39 4.97 19.06 4.97 19.06c-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.06 1.82 2.78 1.29 3.46.99.1-.77.41-1.29.75-1.59-2.64-.3-5.42-1.32-5.42-5.87 0-1.3.46-2.36 1.22-3.19-.12-.3-.53-1.51.12-3.15 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.64.24 2.85.12 3.15.76.83 1.22 1.9 1.22 3.19 0 4.56-2.78 5.57-5.43 5.86.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const socialLinks = [
  { icon: GithubIcon, label: "GitHub", href: siteConfig.contact.github, color: "#00D4FF" },
  { icon: LinkedInIcon, label: "LinkedIn", href: siteConfig.contact.linkedin, color: "#A855F7" },
  { icon: MailIcon, label: "Email", href: `mailto:${siteConfig.contact.email}`, color: "#BD00FF" },
  { icon: PhoneIcon, label: "Phone", href: `tel:${siteConfig.contact.phone}`, color: "#00FFE5" },
];

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Mailto fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    setTimeout(() => {
      window.open(
        `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`,
        "_blank"
      );
      setState("sent");
    }, 600);
  };

  const inputBase =
    "w-full bg-white/[0.03] rounded-xl px-4 py-3.5 text-white text-sm outline-none border transition-all duration-300 placeholder:text-white/25 focus:bg-white/[0.05]";

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's Build"
            titleHighlight="Together"
            subtitle="Have a project in mind or want to discuss AI systems? I'm open to freelance, full-time, and collaboration opportunities."
            center
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Social + Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info card */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-display font-semibold text-lg mb-6">
                Contact Info
              </h3>
              <div className="space-y-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: link.color + "15",
                        color: link.color,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      <link.icon />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 font-medium uppercase tracking-wider">
                        {link.label}
                      </div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-200">
                        {link.href.replace(/^(mailto:|tel:|https?:\/\/(www\.)?)/i, "").split("/")[0]}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass rounded-2xl p-5 border border-neon-blue/15 bg-neon-blue/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neon-blue animate-pulse" />
                <span className="text-neon-blue font-semibold text-sm">
                  Available for Work
                </span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Open to AI engineering roles, freelance projects, and research collaborations. Response time: &lt;24h.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8 border border-white/5">
              {state === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-white font-display font-bold text-2xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/50 text-sm">
                    Your default email client should open with a pre-filled message.
                    I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setState("idle"); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-6 text-neon-blue text-sm hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                        style={{
                          borderColor: focused === "name" ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)",
                          boxShadow: focused === "name" ? "0 0 15px rgba(0,212,255,0.1)" : "none",
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={inputBase}
                        style={{
                          borderColor: focused === "email" ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)",
                          boxShadow: focused === "email" ? "0 0 15px rgba(0,212,255,0.1)" : "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell me about your project, role, or idea..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${inputBase} resize-none`}
                      style={{
                        borderColor: focused === "message" ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)",
                        boxShadow: focused === "message" ? "0 0 15px rgba(0,212,255,0.1)" : "none",
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state === "sending"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-semibold text-sm text-white relative overflow-hidden group transition-all duration-300 disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #00D4FF, #7C3AED, #BD00FF)",
                      backgroundSize: "200% 100%",
                    }}
                  >
                    <span className="absolute inset-0 shimmer-btn opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">
                      {state === "sending" ? "Opening Email..." : "Send Message →"}
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span className="text-white/20 text-sm">
            © 2025 Kislay Kumar. Built with Next.js & ❤️
          </span>
          <div className="flex items-center gap-6">
            <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-neon-blue transition-colors duration-200 text-sm">
              GitHub
            </a>
            <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-purple-400 transition-colors duration-200 text-sm">
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="text-white/30 hover:text-neon-purple transition-colors duration-200 text-sm">
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
