# Resume Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page digital resume for Tim Griffith with a terminal-themed hero (matrix rain + typing animation) transitioning to a clean dark layout.

**Architecture:** Next.js App Router with a single `page.tsx` composed of section components. Canvas-based matrix rain in the hero, CSS typing animations, Intersection Observer for scroll reveals. All content is static — no API calls or dynamic data.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, TypeScript, Google Fonts (JetBrains Mono, Inter)

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

**Step 1: Initialize Next.js with Tailwind**

Run:
```bash
cd "C:/Users/grifm/OneDrive/Desktop/Web Projects/resume-site"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted. This creates the full scaffold.

**Step 2: Install Google Fonts dependency (built into Next.js)**

No extra install needed — Next.js has `next/font/google` built in.

**Step 3: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000, default Next.js page loads.

**Step 4: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind CSS"
```

---

### Task 2: Global Styles & Layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Replace globals.css with dark theme base**

```css
@import "tailwindcss";

@theme {
  --color-background: #0a0a0f;
  --color-foreground: #e0e0e0;
  --color-terminal-green: #00ff41;
  --color-terminal-green-dim: #00cc33;
  --color-terminal-green-glow: rgba(0, 255, 65, 0.15);
  --color-card-bg: rgba(15, 15, 25, 0.8);
  --color-card-border: rgba(0, 255, 65, 0.2);
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}

::selection {
  background-color: var(--color-terminal-green);
  color: var(--color-background);
}
```

**Step 2: Update layout.tsx with fonts and metadata**

```tsx
import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tim Griffith | Senior Cybersecurity Engineer",
  description:
    "Senior Cybersecurity Engineer specializing in PKI automation, cloud security, and AI. 17+ years of IT experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

**Step 3: Replace page.tsx with placeholder**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <p className="text-terminal-green font-mono p-8">Site loading...</p>
    </main>
  );
}
```

**Step 4: Verify styles render**

Run: `npm run dev`
Expected: Dark background, green monospace text saying "Site loading..."

**Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add dark theme global styles and font setup"
```

---

### Task 3: Matrix Rain Canvas Component

**Files:**
- Create: `src/components/MatrixRain.tsx`

**Step 1: Create the matrix rain component**

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = 0.3 + Math.random() * 0.3;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.globalAlpha = 1;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
```

**Step 2: Verify canvas renders**

Temporarily import in `page.tsx` and confirm green characters rain down on dark background.

**Step 3: Commit**

```bash
git add src/components/MatrixRain.tsx
git commit -m "feat: add matrix rain canvas animation component"
```

---

### Task 4: Navigation Bar

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: Create the navbar component**

```tsx
"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-[family-name:var(--font-jetbrains-mono)] ${
        scrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-card-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-terminal-green text-sm hover:text-terminal-green-dim transition-colors"
        >
          ~/tim-griffith
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-foreground/60 hover:text-terminal-green text-sm px-3 py-1 transition-colors"
            >
              [ {item.label} ]
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-terminal-green text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-card-border px-6 pb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-foreground/60 hover:text-terminal-green text-sm py-2 transition-colors"
            >
              [ {item.label} ]
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
```

**Step 2: Verify nav renders and scrolls**

Add to page.tsx, confirm desktop/mobile layouts work, links scroll smoothly.

**Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add terminal-style navigation bar with mobile menu"
```

---

### Task 5: Hero Section with Typing Animation

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/hooks/useTypingAnimation.ts`

**Step 1: Create the typing animation hook**

```ts
"use client";

import { useState, useEffect } from "react";

interface TypingLine {
  command: string;
  output: string;
  commandDelay?: number;
}

export function useTypingAnimation(lines: TypingLine[], charDelay = 50) {
  const [displayedLines, setDisplayedLines] = useState<
    { command: string; output: string; done: boolean }[]
  >([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showingOutput, setShowingOutput] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setComplete(true);
      return;
    }

    const line = lines[currentLine];

    if (!showingOutput) {
      // Typing the command
      if (currentChar < line.command.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            if (!updated[currentLine]) {
              updated[currentLine] = { command: "", output: "", done: false };
            }
            updated[currentLine] = {
              ...updated[currentLine],
              command: line.command.slice(0, currentChar + 1),
            };
            return updated;
          });
          setCurrentChar((c) => c + 1);
        }, charDelay);
        return () => clearTimeout(timeout);
      } else {
        // Command fully typed, show output after brief pause
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            updated[currentLine] = {
              ...updated[currentLine],
              output: line.output,
              done: true,
            };
            return updated;
          });
          setShowingOutput(true);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Move to next line after pause
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setShowingOutput(false);
      }, line.commandDelay || 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, showingOutput, lines, charDelay]);

  return { displayedLines, complete };
}
```

**Step 2: Create the Hero component**

```tsx
"use client";

import { useTypingAnimation } from "@/hooks/useTypingAnimation";

const terminalLines = [
  { command: "whoami", output: "Tim Griffith" },
  {
    command: "cat role.txt",
    output: "Cybersecurity Engineer | Security Engineering | PKI Automation",
  },
];

export default function Hero() {
  const { displayedLines, complete } = useTypingAnimation(terminalLines, 60);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center z-10"
    >
      <div className="w-full max-w-2xl mx-4">
        {/* Terminal window */}
        <div className="rounded-lg border border-card-border bg-background/80 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,65,0.1)] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-card-bg border-b border-card-border">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 text-xs text-foreground/40 font-[family-name:var(--font-jetbrains-mono)]">
              tim@security:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-[family-name:var(--font-jetbrains-mono)] text-sm md:text-base space-y-2">
            {displayedLines.map((line, i) => (
              <div key={i}>
                <div className="flex">
                  <span className="text-terminal-green mr-2">{">"}</span>
                  <span className="text-foreground">{line.command}</span>
                  {!line.done && (
                    <span className="animate-pulse text-terminal-green ml-0.5">
                      ▋
                    </span>
                  )}
                </div>
                {line.output && (
                  <div className="text-terminal-green font-bold mt-1 ml-4">
                    {line.output}
                  </div>
                )}
              </div>
            ))}

            {/* Final blinking cursor */}
            {complete && (
              <div className="flex">
                <span className="text-terminal-green mr-2">{">"}</span>
                <span className="animate-pulse text-terminal-green">▋</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="text-terminal-green/50 text-2xl font-[family-name:var(--font-jetbrains-mono)]">
          ↓
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Verify hero renders with typing animation**

Run: `npm run dev`
Expected: Terminal window appears centered, commands type out sequentially, cursor blinks.

**Step 4: Commit**

```bash
git add src/components/Hero.tsx src/hooks/useTypingAnimation.ts
git commit -m "feat: add hero section with terminal typing animation"
```

---

### Task 6: Scroll Reveal Hook

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

**Step 1: Create reusable Intersection Observer hook**

```ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

**Step 2: Commit**

```bash
git add src/hooks/useScrollReveal.ts
git commit -m "feat: add scroll reveal hook using Intersection Observer"
```

---

### Task 7: Section Header Component

**Files:**
- Create: `src/components/SectionHeader.tsx`

**Step 1: Create reusable section header**

```tsx
export default function SectionHeader({ command }: { command: string }) {
  return (
    <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-lg md:text-xl mb-8">
      <span className="text-terminal-green">{">"}</span>{" "}
      <span className="text-foreground/80">{command}</span>
      <span className="animate-pulse text-terminal-green ml-1">▋</span>
    </h2>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/SectionHeader.tsx
git commit -m "feat: add terminal-style section header component"
```

---

### Task 8: About Section

**Files:**
- Create: `src/components/About.tsx`

**Step 1: Create the About component**

```tsx
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
            Encryption and PKI teams — building solutions with Python, Terraform,
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
```

**Step 2: Verify section renders with fade-in**

Run: `npm run dev`, scroll past hero, confirm about section fades in.

**Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add about section with scroll reveal"
```

---

### Task 9: Experience Section with Timeline

**Files:**
- Create: `src/components/Experience.tsx`

**Step 1: Create the Experience component**

```tsx
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
```

**Step 2: Verify timeline renders with staggered slide-in**

Run: `npm run dev`, scroll to experience, confirm cards slide in from left with stagger.

**Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: add experience section with glowing timeline"
```

---

### Task 10: Projects Section

**Files:**
- Create: `src/components/Projects.tsx`

**Step 1: Create the Projects component**

```tsx
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
```

**Step 2: Verify cards render side by side, hover effects work**

Run: `npm run dev`, scroll to projects, confirm cards show, hover triggers glow + scanline + scale.

**Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add projects section with frosted-glass cards"
```

---

### Task 11: Skills Section

**Files:**
- Create: `src/components/Skills.tsx`

**Step 1: Create the Skills component**

```tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeader from "./SectionHeader";

const skillCategories = [
  {
    name: "Security & AppSec",
    skills: [
      "PKI",
      "Venafi",
      "Pen Testing",
      "Burp Suite",
      "AppScan",
      "Wiz.io",
      "Tenable",
      "HashiCorp Vault",
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      "Claude API",
      "Anthropic SDK",
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
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
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
```

**Step 2: Verify skill pills render in groups, hover effects work**

Run: `npm run dev`, scroll to skills, confirm categorized pills with glow on hover.

**Step 3: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "feat: add skills section with categorized pill badges"
```

---

### Task 12: Contact Section & Footer

**Files:**
- Create: `src/components/Contact.tsx`

**Step 1: Create the Contact component**

```tsx
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
```

**Step 2: Verify contact links render, hover glow works**

Run: `npm run dev`, scroll to contact, confirm links and footer render.

**Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add contact section and terminal-style footer"
```

---

### Task 13: Assemble Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Compose all sections in page.tsx**

```tsx
import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <MatrixRain />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="relative bg-background">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
```

**Step 2: Verify full page scrolls through all sections**

Run: `npm run dev`
Expected: Matrix rain hero → smooth transition to dark sections → all sections render with animations.

**Step 3: Make MatrixRain fade out below hero**

The matrix rain canvas is `fixed` and `z-0`. The content sections have `bg-background` which naturally covers it as you scroll. The About section's gradient overlay handles the transition.

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections into single-page layout"
```

---

### Task 14: Responsive Polish & Final Tweaks

**Files:**
- Modify: various components as needed

**Step 1: Test on mobile viewport (Chrome DevTools 375px)**

Check each section:
- Nav collapses to hamburger ✓ (already built)
- Hero terminal window fits mobile ✓ (max-w-2xl + mx-4)
- Timeline cards full width ✓
- Project cards stack ✓ (md:grid-cols-2)
- Skill pills wrap ✓ (flex-wrap)
- Contact links center ✓

**Step 2: Fix any mobile issues found**

Adjust padding, font sizes, or layout as needed.

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive polish for mobile viewports"
```

---

### Task 15: SEO & Netlify Deployment

**Files:**
- Modify: `src/app/layout.tsx` (add Open Graph metadata)
- Create: `public/netlify.toml` (build config) — actually at project root
- Create: `netlify.toml`

**Step 1: Add Open Graph metadata to layout.tsx**

Add to the existing metadata export:
```ts
export const metadata: Metadata = {
  title: "Tim Griffith | Senior Cybersecurity Engineer",
  description:
    "Senior Cybersecurity Engineer specializing in PKI automation, cloud security, and AI. 17+ years of IT experience.",
  openGraph: {
    title: "Tim Griffith | Senior Cybersecurity Engineer",
    description:
      "Senior Cybersecurity Engineer specializing in PKI automation, cloud security, and AI.",
    type: "website",
  },
};
```

**Step 2: Create netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Step 3: Install Netlify Next.js plugin**

Run: `npm install -D @netlify/plugin-nextjs`

**Step 4: Verify production build succeeds**

Run: `npm run build`
Expected: Build completes without errors.

**Step 5: Commit**

```bash
git add src/app/layout.tsx netlify.toml package.json package-lock.json
git commit -m "feat: add SEO metadata and Netlify deployment config"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Scaffold Next.js project |
| 2 | Global styles & layout (dark theme, fonts) |
| 3 | Matrix Rain canvas component |
| 4 | Navigation bar (desktop + mobile) |
| 5 | Hero section with typing animation |
| 6 | Scroll reveal hook |
| 7 | Section header component |
| 8 | About section |
| 9 | Experience timeline |
| 10 | Projects cards |
| 11 | Skills pill grid |
| 12 | Contact + footer |
| 13 | Assemble page |
| 14 | Responsive polish |
| 15 | SEO & Netlify config |

15 tasks, each independently committable. Estimated ~15 commits.
