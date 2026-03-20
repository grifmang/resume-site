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
            With over 17 years of IT experience, I am a passionate and proficient
            Cybersecurity Engineer at Travelers, one of the largest providers of
            property and casualty insurance in the US.
          </p>
          <p>
            My mission is to ensure the security and compliance of Travelers
            cloud infrastructure and applications, using my expertise in AWS,
            Python, Terraform, Wiz, Tenable, and other tools.
          </p>
          <p className="text-terminal-green/90 font-[family-name:var(--font-jetbrains-mono)] text-base">
            Currently focused on AI and AI development.
          </p>
        </div>
      </div>
    </section>
  );
}
