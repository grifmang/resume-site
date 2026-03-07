# Resume Site Design

## Overview

Single-page digital resume for Tim Griffith, Senior Cybersecurity Engineer. Targets both recruiters/hiring managers and professional peers. Positioned at the intersection of cybersecurity, AppSec, and AI.

**Stack:** Next.js + Tailwind CSS
**Deploy:** Netlify
**Aesthetic:** Hybrid — terminal-style hero with matrix rain, transitioning to clean dark layout below

## Sections

### 1. Hero (full viewport)

- Matrix rain canvas animation (green falling characters, semi-transparent)
- Centered terminal emulator window (red/yellow/green dots chrome, dark bg)
- Typing animation sequence:
  ```
  > whoami
  Tim Griffith
  > cat role.txt
  Cybersecurity Engineer | Security Engineering | PKI Automation
  > _
  ```
- Top nav bar: monospace, terminal-command style: `[ about ] [ experience ] [ projects ] [ skills ] [ contact ]`
- Scroll-down indicator (chevron or blinking cursor)

### 2. About — `> cat about.md`

- Matrix rain fades out on scroll, transitions to clean dark background (~#0a0a0f)
- Short 2-3 sentence bio, text only (no photo)
- Includes focus line: "Currently focused on the intersection of application security and AI systems."
- Subtle fade-in on scroll animation
- Faint glowing green accent line separator from hero

### 3. Experience — `> history --work`

- Vertical glowing green timeline line on the left, entries branching right
- Cards with: job title, company, date range, 2-3 bullet points
- Subtle glow on hover, cards slide in from left (staggered on scroll)
- Monospace for titles/dates, clean sans-serif for descriptions
- **Featured roles (Travelers only):**
  - Senior Cybersecurity Engineer (May 2023 – Present) — Encryption & PKI automation, Terraform, Python, QLIK, Snowflake, Databricks, AWS, HashiCorp Vault, Venafi, Wiz, Tenable
  - Senior Cloud Security Engineer (May 2022 – Aug 2023) — AWS, Wiz.io, automation, QLIKsense dashboards
  - Infrastructure Engineer – TLDP (Apr 2021 – Apr 2022) — EC2 compliance system, Log4J reporting, Venafi/Tenable automation, pen testing
- Earlier roles condensed or omitted

### 4. Projects — `> ls ~/projects`

- Two feature cards side by side (stack on mobile)
- Dark frosted-glass background with green glow border
- Hover: border brightens, slight scale-up, scanline effect
- Each card: brief description (2-3 sentences), tech tag pills, GitHub/live links

**Is This Normal?**
- AI-powered political fact-checking pipeline
- Tags: Next.js, Claude API, Python, RSS
- Link: GitHub repo

**MigrateGPT**
- Browser tool for migrating ChatGPT data to Claude's memory
- Tags: React, TypeScript, Vite
- Links: GitHub repo + migrategpt.org

### 5. Skills — `> cat skills.json`

- Grid of categorized pill badges:
  - **Security & AppSec:** PKI, Venafi, Pen Testing (AppScan, Burp), Wiz.io, Tenable, HashiCorp Vault
  - **AI & Automation:** Claude API, Anthropic SDK, Python automation, data pipelines
  - **Cloud & Infra:** AWS, Terraform, Snowflake, Databricks
  - **Development:** Python, TypeScript, React, Next.js, Node.js, PostgreSQL
  - **Tools & Platforms:** QLIK, Grafana, Git, Docker
- GCLD certification as distinct badge (lock/shield icon)
- Subtle green glow, pulse animation on scroll-in
- No skill bars or percentages

### 6. Contact — `> ping tim`

- Centered layout with icon-style links:
  - Email: grifmang@gmail.com
  - LinkedIn: linkedin.com/in/tim-griffith
  - GitHub: github.com/grifmang
  - Website: TimGriffith.us
- Icons glow green on hover
- Footer sign-off: `> exit` or `Connection closed.`

## Global Design Tokens

- **Background:** #0a0a0f (deep navy-black)
- **Accent:** #00ff41 (terminal green)
- **Fonts:** Monospace (JetBrains Mono or Fira Code) for headers/terminal elements; clean sans-serif (Inter or system) for body text
- **Animations:** Smooth scroll, Intersection Observer for scroll-triggered reveals, canvas-based matrix rain, CSS typing animations
- **Responsive:** Mobile-first, cards stack vertically, nav collapses to hamburger or minimal layout
