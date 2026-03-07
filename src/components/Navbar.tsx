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
