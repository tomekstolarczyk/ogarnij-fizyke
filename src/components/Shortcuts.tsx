import Link from "next/link";
import { channelStats, siteLinks } from "@/data/site";

type Shortcut = {
  title: string;
  text: string;
  cta: string; // call to action at the bottom of the card
  href?: string; // no href = not ready yet, shown as "wkrótce"
  iconPath: string; // SVG path drawn in a 24x24 box
  // Full class names, not built from pieces like `text-${color}`:
  // Tailwind finds classes by reading the source as text, so it only
  // generates the ones that appear here whole
  color: { text: string; iconBg: string };
};

const shortcuts: Shortcut[] = [
  {
    title: "Mapa fizyki",
    text: "Wszystkie działy na jednej mapie. Zobacz, od czego zacząć i co z czego wynika.",
    cta: "Otwórz mapę →",
    href: "/mapa",
    iconPath: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z M9 4v14 M15 6v14",
    color: { text: "text-accent", iconBg: "bg-accent/15" },
  },
  {
    title: "Notatki i wzory",
    text: "Odręczne notatki do przejrzenia online albo pobrania jako PDF. Do tego karta wzorów.",
    cta: "Już niedługo",
    iconPath: "M6 3h10l4 4v14H6z M16 3v4h4 M9 12h7 M9 16h5",
    color: { text: "text-marker-purple", iconBg: "bg-marker-purple/15" },
  },
  {
    title: "YouTube",
    text: `Teoria i zadania maturalne krok po kroku. Najnowszy film: ${channelStats.latestVideo}.`,
    cta: "Oglądaj na kanale →",
    href: siteLinks.youtube,
    iconPath:
      "M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z M10 9l5 3-5 3z",
    color: { text: "text-marker-coral", iconBg: "bg-marker-coral/15" },
  },
];

// "Where to start" cards below the hero: shortcuts to the main parts of the site
export default function Shortcuts() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-sm text-accent">{"// od czego zacząć"}</p>
      <h2 className="mt-2.5 mb-8 font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-tight font-bold tracking-[-0.02em]">
        Wszystko do matury w jednym miejscu
      </h2>

      {/* auto-fit: as many 16rem+ columns as fit, so 3 on desktop and 1 on a phone */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-5">
        {shortcuts.map((item) => {
          const content = (
            <>
              <span className="flex items-center justify-between">
                <span
                  className={`inline-flex size-13 items-center justify-center rounded-[14px] ${item.color.iconBg}`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`size-6.5 ${item.color.text}`}
                  >
                    <path d={item.iconPath} />
                  </svg>
                </span>
                {!item.href && (
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted">
                    wkrótce
                  </span>
                )}
              </span>
              <span className="font-display text-2xl font-bold">
                {item.title}
              </span>
              <span className="text-[15px] leading-relaxed text-muted">
                {item.text}
              </span>
              <span className={`mt-auto font-semibold ${item.color.text}`}>
                {item.cta}
              </span>
            </>
          );

          const cardClass =
            "flex flex-col gap-3.5 rounded-[20px] border bg-surface p-7";

          if (!item.href) {
            return (
              <div
                key={item.title}
                className={`${cardClass} border-dashed border-border`}
              >
                {content}
              </div>
            );
          }

          const isExternal = item.href.startsWith("http");
          return (
            <Link
              key={item.title}
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`${cardClass} border-border transition hover:-translate-y-1 hover:border-accent`}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
