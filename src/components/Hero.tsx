import Link from "next/link";
import HeroPhoto from "@/components/HeroPhoto";
import { channelStats, siteLinks } from "@/data/site";

const stats = [
  { value: channelStats.subscribers, label: "subskrybentów na YT" },
  { value: String(channelStats.videos), label: "filmów: teoria i zadania" },
  { value: "0 zł", label: "i tak zostanie", highlight: true },
];

// Top of the landing page: headline with marker doodles, buttons, channel stats
export default function Hero() {
  return (
    // overflow-x-clip: tilted stickers near the edge can't cause sideways scrolling on phones
    <section className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-16 gap-y-12 overflow-x-clip px-4 py-16 sm:px-6 sm:py-20">
      {/* flex-[1_1_32rem]: grows and shrinks, prefers 32rem; the photo sits next to it
          and drops below it when there is no room (phones) */}
      <div className="min-w-0 flex-[1_1_32rem]">
        <p className="mb-14 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[13px] text-foreground/80">
          <span className="size-2 animate-pulse rounded-full bg-accent" />
          Matura 2027 · 100% za darmo
        </p>

        <h1 className="font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
          <span className="relative inline-block">
            OG
            {/* Hand-drawn marker circle around "OG". preserveAspectRatio="none"
                stretches it to the text; non-scaling-stroke keeps the line even */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 70"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -top-[10%] -left-[16%] h-[122%] w-[132%] overflow-visible text-accent"
            >
              <path
                d="M72 6 C34 1 4 16 6 37 C8 59 48 67 84 60 C113 54 121 33 104 17 C91 5 60 2 34 11"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Handwritten note above "OG" */}
            <span
              aria-hidden="true"
              className="absolute bottom-full left-[40%] mb-1.5 -rotate-7 font-hand text-3xl leading-none font-bold tracking-normal whitespace-nowrap text-marker-yellow"
            >
              OG, czaisz? ;)
            </span>
          </span>
          arnij{" "}
          <span className="relative inline-block text-accent">
            fizykę
            {/* Wavy marker underline */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              className="absolute -bottom-[0.1em] left-0 h-[0.22em] w-full overflow-visible"
            >
              <path
                d="M3 9 C35 3 62 13 96 7 S160 3 197 8"
                fill="none"
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
          <br />
          do matury.
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          Filmy, odręczne notatki i zadania z arkuszy CKE w jednym miejscu. Bez
          płatnych kursów, bez chaosu.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={siteLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-accent px-6 font-semibold text-background transition hover:-translate-y-0.5 hover:brightness-110"
          >
            {/* Play button: dark circle with a green triangle */}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
              <circle cx="12" cy="12" r="11" className="fill-background" />
              <path d="M10 8l6 4-6 4z" className="fill-accent" />
            </svg>
            Oglądaj na YouTube
          </a>
          <Link
            href="/#mapa"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 font-medium transition hover:-translate-y-0.5 hover:border-accent/60"
          >
            Zobacz mapę fizyki <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-dashed border-border pt-7">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                className={`font-display text-3xl font-bold ${stat.highlight ? "text-accent" : ""}`}
              >
                {stat.value}
              </p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <HeroPhoto />
    </section>
  );
}
