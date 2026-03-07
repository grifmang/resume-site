export default function SectionHeader({ command }: { command: string }) {
  return (
    <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-lg md:text-xl mb-8">
      <span className="text-terminal-green">{">"}</span>{" "}
      <span className="text-foreground/80">{command}</span>
      <span className="animate-pulse text-terminal-green ml-1">▋</span>
    </h2>
  );
}
