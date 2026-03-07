export default function Footer() {
  return (
    <footer className="py-12 px-6">
      <div className="text-center font-[family-name:var(--font-jetbrains-mono)] text-foreground/30 text-sm">
        <p>
          <span className="text-terminal-green/40">{">"}</span> exit
        </p>
        <p className="mt-1">Connection closed.</p>
      </div>
    </footer>
  );
}
