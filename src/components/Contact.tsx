"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";

const links = [
  {
    label: "grifmang@gmail.com",
    href: "mailto:grifmang@gmail.com",
    icon: "✉",
  },
  {
    label: "linkedin.com/in/tim-griffith",
    href: "https://www.linkedin.com/in/tim-griffith",
    icon: "in",
  },
  {
    label: "github.com/grifmang",
    href: "https://github.com/grifmang",
    icon: "⌥",
  },
  {
    label: "TimGriffith.us",
    href: "https://TimGriffith.us",
    icon: "◈",
  },
];

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="ping tim" />

        <div
          ref={ref}
          className={`flex flex-col items-center gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-foreground/60 hover:text-terminal-green transition-all duration-300"
            >
              <span className="text-lg w-8 text-center group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.6)] transition-all duration-300">
                {link.icon}
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center font-[family-name:var(--font-jetbrains-mono)] text-foreground/30 text-sm">
          <p>
            <span className="text-terminal-green/40">{">"}</span> exit
          </p>
          <p className="mt-1">Connection closed.</p>
        </div>
      </div>
    </section>
  );
}
