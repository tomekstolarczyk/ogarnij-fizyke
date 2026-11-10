// What the main panel of a topic page is showing
export type TopicMode = "films" | "book" | "notes" | "exercises";

// Text on each tile's corner badge ("13", "✓"); null = nothing there yet ("wkrótce")
export type TabBadges = Record<TopicMode, string | null>;

// Full class names (not built from pieces), so Tailwind can find them
const tabs: {
  mode: TopicMode;
  emoji: string;
  label: string;
  shortLabel: string; // for the narrow row on a phone
  color: string;
}[] = [
  { mode: "films", emoji: "🎬", label: "Filmy", shortLabel: "Filmy", color: "bg-marker-coral" },
  { mode: "book", emoji: "📖", label: "Książka", shortLabel: "Książka", color: "bg-marker-purple" },
  { mode: "notes", emoji: "✍️", label: "Notatki i wzory", shortLabel: "Notatki", color: "bg-marker-yellow" },
  { mode: "exercises", emoji: "🎯", label: "Zadania", shortLabel: "Zadania", color: "bg-marker-blue" },
];

type Props = {
  active: TopicMode;
  badges: TabBadges;
  onSelect: (mode: TopicMode) => void; // a function passed in by the parent
  // Layout from outside, including display (grid / hidden): a row on a phone,
  // a 2x2 grid on desktop. Not set here, so two display classes never clash.
  className: string;
};

// The four sticker-like tiles that switch the main panel of a topic page.
// The active one looks pressed in: its shadow is gone and it sits where the
// shadow was, like a physical button pushed down.
export default function TopicTabs({ active, badges, onSelect, className }: Props) {
  return (
    <div role="group" aria-label="Co chcesz otworzyć?" className={`gap-2.5 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.mode === active;
        const badge = badges[tab.mode];
        return (
          <button
            key={tab.mode}
            type="button"
            onClick={() => onSelect(tab.mode)}
            aria-pressed={isActive}
            className={`group relative flex flex-col items-center gap-1 rounded-xl border-2 border-ink px-1 py-2.5 text-ink transition duration-150 sm:py-3.5 ${tab.color} ${
              isActive
                ? "translate-x-[3px] translate-y-[3px] shadow-none"
                : "shadow-[3px_3px_0_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--color-ink)]"
            }`}
          >
            <span
              aria-hidden="true"
              className="text-2xl group-hover:motion-safe:animate-wiggle sm:text-3xl"
            >
              {tab.emoji}
            </span>
            <span className="text-xs leading-tight font-bold sm:text-sm">
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </span>

            {/* Badge in the corner, like a small sticker on the sticker */}
            <span
              className={`absolute -top-2 -right-1.5 rounded-full border px-1.5 font-mono text-[10px] leading-4 ${
                badge === null
                  ? "border-border bg-surface text-muted"
                  : "border-ink bg-paper text-ink"
              }`}
            >
              {badge ?? "wkrótce"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
