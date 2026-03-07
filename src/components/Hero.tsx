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
