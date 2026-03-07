"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    title: "Is This Normal?",
    description:
      "AI-powered pipeline for surfacing political claims, gathering evidence from news, RSS, Congress, courts, and Reddit, then publishing structured fact-check pages.",
    tags: ["Next.js", "Claude API", "Python", "RSS", "Zod"],
    github: "https://github.com/grifmang/it-it-normal",
  },
  {
    title: "MigrateGPT",
    description:
      "Privacy-first browser tool that exports ChatGPT conversations and extracts personal facts for import into Claude's memory. All processing happens client-side — no data leaves your browser.",
    tags: ["React", "TypeScript", "Vite", "JSZip"],
    github: "https://github.com/grifmang/chatGPTtoClaude",
    live: "https://migrategpt.org",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="group h-full rounded-lg border border-card-border bg-card-bg p-6 hover:border-terminal-green/50 hover:shadow-[0_0_25px_rgba(0,255,65,0.1)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
        {/* Scanline effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,65,0.03)_2px,rgba(0,255,65,0.03)_4px)]" />

        <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-terminal-green text-lg mb-3">
          {project.title}
        </h3>
        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-terminal-green/80 border border-terminal-green/30 rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm font-[family-name:var(--font-jetbrains-mono)]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 hover:text-terminal-green transition-colors"
          >
            [github]
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 hover:text-terminal-green transition-colors"
            >
              [live]
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="ls ~/projects" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
