"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function ScrollSection({ children, className, id }: ScrollSectionProps) {
  const ref = useRef(null);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        type: "spring",
        damping: 25,
        stiffness: 40,
        duration: 1.2
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
