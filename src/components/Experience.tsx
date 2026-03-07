"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";

const roles = [
  {
    title: "Senior Cybersecurity Engineer",
    company: "Travelers",
    date: "May 2023 – Present",
    bullets: [
      "Lead automation for Encryption and PKI teams using Terraform, Python, and AWS",
      "Build data pipelines and dashboards with QLIK, Snowflake, and Databricks",
      "Manage secrets and certificates via HashiCorp Vault, Venafi, Wiz, and Tenable",
    ],
  },
  {
    title: "Senior Cloud Security Engineer",
    company: "Travelers",
    date: "May 2022 – Aug 2023",
    bullets: [
      "Managed AWS cloud security posture using Wiz.io",
      "Built automation tooling and QLIKsense security dashboards",
    ],
  },
  {
    title: "Infrastructure Engineer — TLDP",
    company: "Travelers",
    date: "Apr 2021 – Apr 2022",
    bullets: [
      "Created EC2 compliance system with Grafana, Python, Tenable, and Wiz.io",
      "Built Log4J reporting system using AWS metrics, Tenable, and Python",
      "Automated Venafi certificate discovery and Tenable Security Center cleanup",
      "Penetration tested web applications using HCL AppScan and Burp Suite",
    ],
  },
];

function TimelineCard({
  role,
  index,
}: {
  role: (typeof roles)[0];
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-12 last:pb-0 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.5)]" />

      {/* Card */}
      <div className="group rounded-lg border border-card-border bg-card-bg p-6 hover:border-terminal-green/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all duration-300">
        <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-terminal-green text-base md:text-lg">
          {role.title}
        </h3>
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-foreground/50 text-sm mt-1">
          {role.company} · {role.date}
        </p>
        <ul className="mt-4 space-y-2">
          {role.bullets.map((bullet, i) => (
            <li key={i} className="text-foreground/70 text-sm flex gap-2">
              <span className="text-terminal-green/60 shrink-0">▹</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader command="history --work" />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5px] top-2 bottom-0 w-px bg-gradient-to-b from-terminal-green/50 to-transparent" />

          {roles.map((role, i) => (
            <TimelineCard key={i} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
