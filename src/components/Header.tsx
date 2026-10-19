import Link from "next/link";
import { siteLinks } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        {/* Terminal-style logo: "> ogarnij_fizyke_" with a blinking cursor */}
        <Link href="/" className="font-mono text-sm sm:text-base">
          <span className="text-accent">&gt;</span> ogarnij_fizyke
          <span className="animate-pulse text-accent">_</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/mapa"
            className="text-muted transition-colors hover:text-foreground"
          >
            Mapa
          </Link>
          <a
            href={siteLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-accent/40 px-3 py-1 text-accent transition-colors hover:bg-accent/10"
          >
            YouTube
          </a>
        </nav>
      </div>
    </header>
  );
}
