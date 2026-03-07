"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <SectionHeader command="cat about.md" />
        <div className="space-y-4 text-foreground/80 text-lg leading-relaxed border-l-2 border-terminal-green/30 pl-6">
          <p>
            Senior Cybersecurity Engineer with over 17 years of IT experience.
            Currently at Travelers, where I lead automation efforts across
            Cloud Security and PKI teams — building solutions with Python, Terraform,
            AWS, and HashiCorp Vault.
          </p>
          <p>
            I build tools that make security teams faster. From compliance
            automation to AI-powered fact-checking pipelines, I focus on
            practical solutions to real problems.
          </p>
          <p className="text-terminal-green/90 font-[family-name:var(--font-jetbrains-mono)] text-base">
            Currently focused on the intersection of application security and AI
            systems.
          </p>
        </div>
      </div>
    </section>
  );
}
