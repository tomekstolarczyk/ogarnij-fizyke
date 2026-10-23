import { siteLinks } from "@/data/site";

const slogans = ["za darmo", "wiedzy", "na mnie"];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/90">
      {/* Phones: three centered rows; from sm: left, middle, right */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-9 text-center text-sm text-muted sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p>© 2026 Tomek Stolarczyk</p>

        <p className="flex flex-col items-center gap-0.5 font-mono text-[13px]">
          {slogans.map((slogan) => (
            <span key={slogan}>
              <span className="text-accent">100%</span> {slogan}
            </span>
          ))}
        </p>

        <div className="flex gap-5">
          <a
            href={siteLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            IG @tomekstolarczykk
          </a>
          <a
            href={siteLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            YouTube
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
