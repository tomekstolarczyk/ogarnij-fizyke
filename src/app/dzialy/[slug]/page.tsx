import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookChapter from "@/components/BookChapter";
import CourseNav from "@/components/CourseNav";
import TopicChip from "@/components/TopicChip";
import TopicCourse from "@/components/TopicCourse";
import { groups, topics } from "@/data/topics";
import { getChapter } from "@/lib/book";
import { findTopic, getTopic, isRecorded, moduleNumber } from "@/lib/course";

// [slug] in the folder name: this one file renders every topic page.
// /dzialy/kinematyka -> params = { slug: "kinematyka" }

// Runs at build time: the list of slugs to prerender as static HTML, so each
// topic page is a ready file on Vercel, not computed on every visit
export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

// Browser tab title and Google description, per topic
export async function generateMetadata({
  params,
}: PageProps<"/dzialy/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.name} · Ogarnij Fizykę`,
    description: `${topic.name} do matury z fizyki: filmy, odręczne notatki i zadania z arkuszy CKE.`,
  };
}

// One module of the course: videos to click through, plus the book chapter,
// notes and exercises, all switched inside TopicCourse.
// Why the <Suspense>: when you click a link, Next wants to show the new page
// instantly. It prefetches one shared "shell" for ALL topic pages, built
// without knowing the slug. Everything that needs the slug goes inside
// <Suspense>; the shell shows the skeleton in its place for the split second
// until the real topic arrives. On a direct visit the HTML is already complete
// (generateStaticParams), so you never see the skeleton there.
export default function TopicPage({ params }: PageProps<"/dzialy/[slug]">) {
  return (
    <Suspense fallback={<TopicSkeleton />}>
      <TopicContent params={params} />
    </Suspense>
  );
}

// Grey placeholder blocks roughly where the title, player and sidebar will be
function TopicSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6">
      <div className="h-4 w-48 rounded bg-surface" />
      <div className="mt-5 h-14 w-2/3 max-w-lg rounded-xl bg-surface" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="aspect-video rounded-2xl bg-surface" />
        <div className="hidden h-96 rounded-2xl bg-surface lg:block" />
      </div>
    </div>
  );
}

async function TopicContent({
  params,
}: {
  params: PageProps<"/dzialy/[slug]">["params"];
}) {
  // params is a Promise in this Next version, hence the await
  const { slug } = await params;
  const topic = findTopic(slug);
  if (!topic) notFound(); // a made-up URL shows the 404 page

  const group = groups[topic.group];
  const prerequisites = topic.requires.map(getTopic);
  const chapter = getChapter(topic.slug); // null until the chapter is written

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      {/* Header: compact, so the player is visible without scrolling */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <Link
            href="/dzialy"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ← cała fizyka
          </Link>
          <span className="text-accent">dział {moduleNumber(topic)}</span>
          <span
            className="rounded-full border-2 border-ink px-2.5 py-0.5 tracking-wider text-ink uppercase"
            style={{ backgroundColor: group.color }}
          >
            {group.name}
          </span>
          {!isRecorded(topic) && (
            <span className="rounded-full border border-marker-yellow px-2.5 py-0.5 text-marker-yellow">
              nagrywam
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
            {topic.name}
          </h1>

          {prerequisites.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-hand text-2xl font-bold text-marker-yellow">
                najpierw ogarnij:
              </span>
              {prerequisites.map((required) => (
                <TopicChip key={required.slug} topic={required} />
              ))}
            </div>
          )}
        </div>
      </header>

      {/* The book is rendered here, on the server, and handed to the client
          component as a finished piece of UI */}
      <TopicCourse
        topic={topic}
        book={chapter ? <BookChapter markdown={chapter} /> : null}
      />

      <div className="mt-16">
        <CourseNav topic={topic} />
      </div>
    </article>
  );
}
