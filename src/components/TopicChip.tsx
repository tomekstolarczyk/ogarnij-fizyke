import Link from "next/link";
import { groups, type Topic } from "@/data/topics";
import { isRecorded, topicHref } from "@/lib/course";

// Small topic tile in the map's style, linking to the topic page: group color
// when the topic has videos, grey with a padlock when it isn't recorded yet
export default function TopicChip({ topic }: { topic: Topic }) {
  const group = groups[topic.group];

  if (!isRecorded(topic)) {
    return (
      <Link
        href={topicHref(topic)}
        className="inline-flex items-center gap-2.5 rounded-[10px] border-2 border-[#484f58] bg-[#21262d] px-3.5 py-2.5 text-muted transition hover:-translate-y-0.5 hover:border-muted"
      >
        <span>
          <span className="block font-mono text-[10px] tracking-wider uppercase">
            {group.name}
          </span>
          <span className="text-[15px] font-bold">{topic.name}</span>
        </span>
        {/* Padlock */}
        <svg
          role="img"
          aria-label="wkrótce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-4.5 shrink-0 text-marker-yellow"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href={topicHref(topic)}
      className="rounded-[10px] border-2 border-ink px-3.5 py-2.5 text-ink shadow-[3px_3px_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--color-ink)]"
      style={{ backgroundColor: group.color }}
    >
      <span className="block font-mono text-[10px] tracking-wider uppercase opacity-65">
        {group.name}
      </span>
      <span className="text-[15px] font-bold">{topic.name}</span>
    </Link>
  );
}
