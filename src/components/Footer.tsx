import { siteLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © 2026 Tomek Stolarczyk ·{" "}
          <span className="text-accent">100% za darmo</span>
        </p>

        <div className="flex gap-4">
          <a
            href={siteLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            YouTube
          </a>
          <a
            href={siteLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            Instagram
          </a>
          <a
            href={siteLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
