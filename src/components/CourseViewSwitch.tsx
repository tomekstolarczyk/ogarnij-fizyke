import Link from "next/link";

type View = "list" | "map";

const views: { view: View; label: string; href: string; iconPath: string }[] = [
  {
    view: "list",
    label: "Spis treści",
    href: "/dzialy",
    iconPath: "M9 6h11 M9 12h11 M9 18h11 M4 6h.01 M4 12h.01 M4 18h.01",
  },
  {
    view: "map",
    label: "Mapa",
    href: "/mapa",
    iconPath: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z M9 4v14 M15 6v14",
  },
];

// Two-way switch between the two views of the whole course. It looks like a
// toggle, but each half is a plain link to its own page: both views get their
// own URL, and the heavy map code loads only on the map page.
export default function CourseViewSwitch({ active }: { active: View }) {
  return (
    <nav
      aria-label="Widok kursu"
      className="inline-flex rounded-full border border-border bg-surface p-1"
    >
      {views.map((item) => {
        const isActive = item.view === active;
        return (
          <Link
            key={item.view}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              isActive ? "bg-accent text-background" : "text-muted hover:text-foreground"
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d={item.iconPath} />
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
