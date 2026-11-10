import type { Metadata } from "next";
import Link from "next/link";
import CourseViewSwitch from "@/components/CourseViewSwitch";
import { groups, topics } from "@/data/topics";
import { isRecorded, moduleNumber, topicHref } from "@/lib/course";
import { pluralize } from "@/lib/polish";

export const metadata: Metadata = {
  title: "Cała fizyka · Ogarnij Fizykę",
  description:
    "Cały kurs fizyki do matury, dział po dziale: książka, filmy, odręczne notatki i zadania z arkuszy CKE.",
};

// Table of contents of the course: all topics in course order
export default function CoursePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <p className="font-mono text-sm text-accent">{"// kurs"}</p>
      <h1 className="mt-2.5 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        Cała fizyka
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        Cały materiał do matury, dział po dziale. W każdym dziale: rozdział
        książki, filmy z teorią i zadaniami, odręczne notatki i lista zadań z
        arkuszy CKE. Idź po kolei, a niczego nie zgubisz.
      </p>
      <div className="mt-7">
        <CourseViewSwitch active="list" />
      </div>

      <ol className="mt-12 flex flex-col gap-3">
        {topics.map((topic) => {
          const group = groups[topic.group];
          const recorded = isRecorded(topic);

          // e.g. "13 filmów · 2 notatki · 8 zadań", skipping what's still empty
          const counts = [
            topic.videos.length > 0 &&
              pluralize(topic.videos.length, "film", "filmy", "filmów"),
            topic.notes.length > 0 &&
              pluralize(topic.notes.length, "notatka", "notatki", "notatek"),
            topic.exercises.length > 0 &&
              pluralize(topic.exercises.length, "zadanie", "zadania", "zadań"),
          ].filter(Boolean); // drops the `false` entries

          return (
            <li key={topic.slug}>
              <Link
                href={topicHref(topic)}
                className={`group flex items-center gap-4 rounded-2xl border bg-surface px-4 py-4 transition hover:-translate-y-0.5 sm:gap-5 sm:px-5 ${
                  recorded ? "border-border hover:border-accent" : "border-dashed border-border"
                }`}
              >
                {/* Number in a square colored like the topic's group (grey if not recorded) */}
                <span
                  className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl border-2 font-mono text-sm font-semibold ${
                    recorded ? "border-ink text-ink" : "border-[#484f58] bg-[#21262d] text-muted"
                  }`}
                  style={recorded ? { backgroundColor: group.color } : undefined}
                >
                  {moduleNumber(topic)}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] tracking-wider text-muted uppercase">
                    {group.name}
                  </span>
                  <span
                    className={`block text-lg leading-snug font-semibold group-hover:text-accent ${
                      recorded ? "" : "text-muted"
                    }`}
                  >
                    {topic.name}
                  </span>
                  <span className="block text-sm text-muted">
                    {recorded ? counts.join(" · ") : "nagrywam"}
                  </span>
                </span>

                <span aria-hidden="true" className="text-xl text-muted group-hover:text-accent">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
