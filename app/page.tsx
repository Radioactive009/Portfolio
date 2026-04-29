"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

// Lazy load the heavy TechStack (contains 3D canvas)
const TechStack = dynamic(() => import("@/components/sections/TechStack"), {
  ssr: false,
  loading: () => (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/5 rounded w-48" />
          <div className="h-4 bg-white/5 rounded w-96" />
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <TechStack />
      <About />
      <Contact />
    </main>
  );
}
