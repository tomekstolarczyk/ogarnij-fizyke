import Link from "next/link";
import type { Topic } from "@/data/topics";
import { courseNeighbours, moduleNumber, topicHref } from "@/lib/course";

// "Poprzedni / następny dział" cards at the bottom of a topic page
export default function CourseNav({ topic }: { topic: Topic }) {
  const { previous, next } = courseNeighbours(topic);

  const card =
    "flex flex-1 basis-60 flex-col gap-1 rounded-2xl border border-border bg-surface px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent";

  return (
    <nav aria-label="Nawigacja kursu" className="flex flex-wrap gap-4">
      {previous ? (
        <Link href={topicHref(previous)} className={card}>
          <span className="font-mono text-xs text-muted">
            ← poprzedni · {moduleNumber(previous)}
          </span>
          <span className="font-semibold">{previous.name}</span>
        </Link>
      ) : (
        // Empty spacer keeps "next" on the right for the first topic
        <span className="hidden flex-1 basis-60 sm:block" />
      )}
      {next && (
        <Link href={topicHref(next)} className={`${card} text-right`}>
          <span className="font-mono text-xs text-muted">
            następny · {moduleNumber(next)} →
          </span>
          <span className="font-semibold">{next.name}</span>
        </Link>
      )}
    </nav>
  );
}
