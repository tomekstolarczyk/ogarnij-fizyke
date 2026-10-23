import { Fragment } from "react";
import Link from "next/link";
import TopicChip from "@/components/TopicChip";
import { groups, topics, type Topic } from "@/data/topics";

// Looks a topic up by slug. Throws on a typo, so the build fails loudly
// instead of a tile silently disappearing (like an assert in C)
function getTopic(slug: string): Topic {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) throw new Error(`Unknown topic slug: ${slug}`);
  return topic;
}

// Hand-picked preview: a real prerequisite chain on top, a few more topics below
const chain = ["kinematyka", "dynamika", "praca-moc-energia", "bryla-sztywna"].map(getTopic);
const more = ["grawitacja", "drgania", "termodynamika", "fizyka-atomowa"].map(getTopic);

// "Nie pogub się" section on the landing page: a small preview of the physics map
export default function MapTeaser() {
  return (
    // scroll-mt-14: when /#mapa scrolls here, stop below the sticky header
    <section
      id="mapa"
      className="mx-auto w-full max-w-6xl scroll-mt-14 px-4 py-18 sm:px-6"
    >
      <div className="text-center">
        {/* Outlined letters, a nod to the bubble letters on the sketch */}
        <h2 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-none font-extrabold tracking-[-0.03em] text-transparent [-webkit-text-stroke:2px_var(--color-accent)]">
          Nie pogub się
        </h2>
        <p className="mx-auto mt-5 max-w-150 text-lg leading-relaxed text-muted">
          Fizyka to nie lista działów, tylko sieć. Na mapie widzisz, co trzeba
          umieć wcześniej. Kolorowe działy już są na kanale, szare dopiero
          nagrywam.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-7 rounded-[28px] border border-border bg-surface px-6 py-10">
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          {chain.map((topic, index) => (
            // Fragment: groups the arrow and the tile without an extra div;
            // unlike <>...</> it can take a key
            <Fragment key={topic.slug}>
              {index > 0 && (
                <span aria-hidden="true" className="text-xl text-muted/70">
                  →
                </span>
              )}
              <TopicChip topic={topic} />
            </Fragment>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3.5">
          {more.map((topic) => (
            <TopicChip key={topic.slug} topic={topic} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-5 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <span
              className="size-3.5 rounded border-2 border-ink"
              style={{ backgroundColor: groups.fundamentals.color }}
            />
            jest film
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-3.5 rounded border-2 border-[#484f58] bg-[#21262d]" />
            wkrótce
          </span>
        </div>

        <Link
          href="/mapa"
          className="inline-flex min-h-12 items-center gap-2 rounded-full border border-accent bg-accent/10 px-5.5 font-semibold transition hover:-translate-y-0.5 hover:bg-accent/20"
        >
          Otwórz pełną mapę <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
