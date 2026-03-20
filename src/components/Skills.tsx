"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";

const skillCategories = [
  {
    name: "Security",
    skills: [
      "PKI",
      "Venafi",
      "Wiz.io",
      "HashiCorp Vault",
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      "LLM APIs & SDKs",
      "AI Agents",
      "MCP",
      "Prompt Engineering",
      "Python Automation",
      "Data Pipelines",
    ],
  },
  {
    name: "Cloud & Infra",
    skills: ["AWS", "Terraform", "Snowflake", "Databricks"],
  },
  {
    name: "Development",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "SQL Databases",
    ],
  },
  {
    name: "Tools & Platforms",
    skills: ["QLIK", "Grafana", "Git", "Docker"],
  },
];

export default function Skills() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="cat skills.json" />

        <div
          ref={ref}
          className={`space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {skillCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-foreground/50 text-sm mb-3">
                {`// ${category.name}`}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-[family-name:var(--font-jetbrains-mono)] text-terminal-green border border-terminal-green/30 rounded-md px-3 py-1.5 bg-terminal-green-glow hover:bg-terminal-green/20 hover:border-terminal-green/60 hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Certification badge */}
          <div className="mt-8 pt-8 border-t border-card-border">
            <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-foreground/50 text-sm mb-3">
              {`// Certifications`}
            </h3>
            <div className="inline-flex items-center gap-2 border border-terminal-green/40 rounded-lg px-4 py-2 bg-terminal-green-glow">
              <span className="text-terminal-green text-lg">🛡</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-terminal-green text-sm">
                GIAC Cloud Security Essentials (GCLD)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
