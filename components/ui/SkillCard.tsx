"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  index: number;
  category: "ai" | "eng" | "tools";
}

export default function SkillCard({ name, index, category }: SkillCardProps) {
  const getAccentColor = () => {
    switch (category) {
      case "ai": return "from-neon-blue to-purple-600";
      case "eng": return "from-neon-purple to-pink-600";
      case "tools": return "from-neon-cyan to-blue-500";
      default: return "from-white/20 to-white/5";
    }
  };

  const getIcon = () => {
    // Simple mapping for common tech, others get a generic dot
    const lowerName = name.toLowerCase();
    if (lowerName.includes("python")) return "Py";
    if (lowerName.includes("react")) return "Re";
    if (lowerName.includes("next.js")) return "Nx";
    if (lowerName.includes("pytorch")) return "Pt";
    if (lowerName.includes("openai")) return "Ai";
    if (lowerName.includes("git")) return "Git";
    return name.charAt(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative z-10"
    >
      {/* Background Glow */}
      <div 
        className={`absolute -inset-[1px] bg-gradient-to-br ${getAccentColor()} rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500`}
      />

      {/* Main Card */}
      <div className="relative glass-dark border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-all duration-300">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getAccentColor()} flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">
            {name}
          </h4>
          <div className="flex gap-1 mt-1">
            <div className={`h-0.5 w-4 rounded-full bg-gradient-to-r ${getAccentColor()} opacity-30 group-hover:opacity-100 transition-opacity`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
