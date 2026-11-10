import type { Video } from "@/data/topics";
import { pluralize } from "@/lib/polish";

type Props = {
  lessons: Video[]; // theory and exercise videos, in course order
  full: Video[]; // "the whole topic in one video", shown separately on top
  currentId: string | null; // the video in the player right now (if films are open)
  onSelect: (video: Video) => void;
  className?: string;
};

// Small "teoria" / "zadania" tag next to a lesson
const kindTag = {
  theory: { label: "teoria", className: "text-marker-purple" },
  exercise: { label: "zadania", className: "text-marker-blue" },
  full: { label: "całość", className: "text-marker-yellow" },
};

// "Spis treści" of one topic: every lesson to click through, like a playlist
export default function LessonList({ lessons, full, currentId, onSelect, className = "" }: Props) {
  // One row of the list; the playing one gets a ▶ instead of its number
  const row = (video: Video, label: string) => {
    const isCurrent = video.youtubeId === currentId;
    const tag = kindTag[video.kind];
    return (
      <li key={video.youtubeId}>
        <button
          type="button"
          onClick={() => onSelect(video)}
          aria-current={isCurrent ? "true" : undefined}
          className={`flex w-full gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
            isCurrent
              ? "border-accent bg-accent/10"
              : "border-transparent hover:bg-background"
          }`}
        >
          <span className="w-6 shrink-0 pt-0.5 font-mono text-xs text-accent">
            {isCurrent ? "▶" : label}
          </span>
          <span className="min-w-0">
            <span className={`block font-mono text-[10px] tracking-wider uppercase ${tag.className}`}>
              {tag.label}
            </span>
            {/* line-clamp-2: long YouTube titles stop after two lines with "..." */}
            <span className={`line-clamp-2 text-sm leading-snug ${isCurrent ? "font-semibold" : ""}`}>
              {video.title}
            </span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <nav
      aria-label="Spis lekcji działu"
      className={`flex flex-col rounded-2xl border border-border bg-surface ${className}`}
    >
      <div className="flex items-baseline justify-between border-b border-border px-4 py-3">
        <h2 className="font-display font-bold">Spis treści</h2>
        <span className="font-mono text-xs text-muted">
          {pluralize(lessons.length, "lekcja", "lekcje", "lekcji")}
        </span>
      </div>

      {lessons.length === 0 && full.length === 0 ? (
        <p className="px-4 py-5 text-sm text-muted">Nagrywam. Lekcje pojawią się tutaj.</p>
      ) : (
        // min-h-0 + overflow: on desktop the list scrolls inside the sticky sidebar
        <div className="min-h-0 overflow-y-auto overscroll-contain p-2">
          {full.length > 0 && (
            <>
              <p className="px-3 pt-1 pb-1.5 font-hand text-lg font-bold text-marker-yellow">
                masz mało czasu?
              </p>
              <ul className="mb-2 border-b border-border pb-2">
                {full.map((video) => row(video, "★"))}
              </ul>
            </>
          )}
          <ol className="space-y-0.5">
            {lessons.map((video, index) => row(video, String(index + 1).padStart(2, "0")))}
          </ol>
        </div>
      )}
    </nav>
  );
}
