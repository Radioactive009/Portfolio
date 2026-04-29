"use client";

import { motion } from "framer-motion";

export default function Atmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Left Glow */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]"
      />
      
      {/* Center Blue Glow */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px]"
      />

      {/* Bottom Purple Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-neon-purple/5 rounded-full blur-[180px]"
      />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20" />
    </div>
  );
}
