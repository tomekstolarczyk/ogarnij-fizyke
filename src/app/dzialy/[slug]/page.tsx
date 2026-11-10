import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import CourseNav from "@/components/CourseNav";
import SectionHeading from "@/components/SectionHeading";
import TopicChip from "@/components/TopicChip";
import TopicExercises from "@/components/TopicExercises";
import TopicNotes from "@/components/TopicNotes";
import TopicVideos from "@/components/TopicVideos";
import { groups, topics } from "@/data/topics";
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

// Jump links under the title, in the order of the sections below
const sectionLinks = [
  { href: "#ksiazka", label: "Książka" },
  { href: "#filmy", label: "Filmy" },
  { href: "#notatki", label: "Notatki" },
  { href: "#zadania", label: "Zadania" },
];

// One module of the course: book chapter, videos, notes and exercises.
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

// Grey placeholder blocks roughly where the title and sections will be
function TopicSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-12 sm:px-6">
      <div className="h-4 w-28 rounded bg-surface" />
      <div className="mt-10 h-14 w-3/4 max-w-xl rounded-xl bg-surface" />
      <div className="mt-12 h-40 rounded-2xl bg-surface" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="aspect-video rounded-2xl bg-surface" />
        <div className="aspect-video rounded-2xl bg-surface" />
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

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      {/* Header */}
      <header className="mb-14">
        <Link
          href="/dzialy"
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← cała fizyka
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
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

        <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          {topic.name}
        </h1>

        {prerequisites.length > 0 && (
          <div className="mt-7">
            <p className="mb-3 font-hand text-2xl font-bold text-marker-yellow">
              najpierw ogarnij:
            </p>
            <div className="flex flex-wrap gap-3">
              {prerequisites.map((required) => (
                <TopicChip key={required.slug} topic={required} />
              ))}
            </div>
          </div>
        )}

        <nav aria-label="Sekcje działu" className="mt-9 flex flex-wrap gap-2.5">
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="flex flex-col gap-20">
        <section>
          <SectionHeading id="ksiazka" label="książka" title="Rozdział w książce" />
          {/* TODO: the book chapter goes here (decide on MDX + math rendering first) */}
          <ComingSoon text="Piszę ten rozdział: cała teoria działu opisana po ludzku, z intuicją i wzorami." />
        </section>

        <TopicVideos topic={topic} />
        <TopicNotes topic={topic} />
        <TopicExercises topic={topic} />

        <CourseNav topic={topic} />
      </div>
    </article>
  );
}
