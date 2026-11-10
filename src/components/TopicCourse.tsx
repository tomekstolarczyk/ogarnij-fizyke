"use client";

import { useRef, useState, type ReactNode } from "react";
import ComingSoon from "@/components/ComingSoon";
import LessonList from "@/components/LessonList";
import SectionHeading from "@/components/SectionHeading";
import TopicExercises from "@/components/TopicExercises";
import TopicNotes from "@/components/TopicNotes";
import TopicTabs, { type TabBadges, type TopicMode } from "@/components/TopicTabs";
import VideoEmbed from "@/components/VideoEmbed";
import type { Topic, Video } from "@/data/topics";

type Props = {
  topic: Topic;
  // The book chapter, already rendered on the server (null = not written yet).
  // A client component can't run the Markdown/KaTeX code without shipping it
  // to the browser, so the server renders it and passes the finished result in.
  book: ReactNode | null;
};

// Headings of the non-video panels
const panelTitles: Record<Exclude<TopicMode, "films">, { label: string; title: string }> = {
  book: { label: "książka", title: "Rozdział w książce" },
  notes: { label: "notatki i wzory", title: "Odręczne notatki i wzory" },
  exercises: { label: "zadania", title: "Lista zadań z arkuszy CKE" },
};

// The interactive part of a topic page: the main panel (a video, the book,
// notes or exercises), the sticker tabs that switch it, and the lesson list.
// "use client" because it remembers what's open (state) and reacts to clicks.
export default function TopicCourse({ topic, book }: Props) {
  const lessons = topic.videos.filter((v) => v.kind !== "full");
  const full = topic.videos.filter((v) => v.kind === "full");

  // useState: a variable that survives re-renders; changing it via the setter
  // makes React draw the component again with the new value
  const [mode, setMode] = useState<TopicMode>("films");
  const [video, setVideo] = useState<Video | undefined>(lessons[0] ?? full[0]);
  // false until the user picks a video: the first one shows its thumbnail,
  // every one picked later starts playing right away
  const [autoPlay, setAutoPlay] = useState(false);

  // useRef: a handle to a real DOM element, here the main panel
  const panelRef = useRef<HTMLDivElement>(null);

  // On a phone the lesson list is below the panel; after a click there, bring
  // the panel back into view. Skipped when its top is already on screen.
  const showPanel = () => {
    const panel = panelRef.current;
    if (!panel) return;
    const top = panel.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectMode = (next: TopicMode) => {
    setMode(next);
    showPanel();
  };

  const playVideo = (next: Video) => {
    setVideo(next);
    setMode("films");
    setAutoPlay(true);
    showPanel();
  };

  const playById = (youtubeId: string) => {
    const found = topic.videos.find((v) => v.youtubeId === youtubeId);
    if (found) playVideo(found);
  };

  // Previous / next lesson (the "full" video stands outside the lesson order)
  const lessonIndex = video ? lessons.indexOf(video) : -1;
  const previousLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex >= 0 ? lessons[lessonIndex + 1] : undefined;

  const badges: TabBadges = {
    films: topic.videos.length > 0 ? String(topic.videos.length) : null,
    book: book ? "✓" : null,
    notes: topic.notes.length > 0 ? String(topic.notes.length) : null,
    exercises: topic.exercises.length > 0 ? String(topic.exercises.length) : null,
  };

  return (
    // Phone: tabs, panel, lesson list stacked. Desktop (lg): panel on the left,
    // a sticky sidebar with the tabs and the lesson list on the right.
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8">
      <div className="min-w-0">
        <TopicTabs
          active={mode}
          badges={badges}
          onSelect={selectMode}
          className="mb-6 grid grid-cols-4 lg:hidden"
        />

        {/* scroll-mt-20: scrolling to the panel stops below the sticky header */}
        <div ref={panelRef} className="scroll-mt-20">
          {mode === "films" &&
            (video ? (
              <div className="flex flex-col gap-4">
                {/* key: a new video = a new player, starting from the thumbnail state */}
                <VideoEmbed key={video.youtubeId} video={video} autoPlay={autoPlay} />
                {lessonIndex >= 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-muted">
                      lekcja {lessonIndex + 1} z {lessons.length}
                    </span>
                    <span className="ml-auto flex gap-2">
                      {previousLesson && (
                        <button
                          type="button"
                          onClick={() => playVideo(previousLesson)}
                          className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                        >
                          ← poprzednia
                        </button>
                      )}
                      {nextLesson && (
                        <button
                          type="button"
                          onClick={() => playVideo(nextLesson)}
                          className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent/20"
                        >
                          następna lekcja →
                        </button>
                      )}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <ComingSoon text="Ten dział właśnie nagrywam. Filmy pojawią się tutaj i na kanale." />
            ))}

          {/* The other panels are always in the HTML and only hidden when not
              open: Google can read the book even if nobody clicked "Książka",
              and switching is instant. (The video panel above is different:
              it's removed when closed, so a playing video stops.) */}
          <div hidden={mode !== "book"}>
            <SectionHeading {...panelTitles.book} />
            {book ?? (
              <ComingSoon text="Piszę ten rozdział: cała teoria działu opisana po ludzku, z intuicją i wzorami." />
            )}
          </div>
          <div hidden={mode !== "notes"}>
            <SectionHeading {...panelTitles.notes} />
            <TopicNotes topic={topic} />
          </div>
          <div hidden={mode !== "exercises"}>
            <SectionHeading {...panelTitles.exercises} />
            <TopicExercises topic={topic} onShowSolution={playById} />
          </div>
        </div>
      </div>

      {/* Sticky sidebar on desktop; max-h + flex lets the lesson list scroll inside it */}
      <aside className="flex flex-col gap-5 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)]">
        <TopicTabs
          active={mode}
          badges={badges}
          onSelect={selectMode}
          className="hidden grid-cols-2 lg:grid"
        />
        <LessonList
          lessons={lessons}
          full={full}
          currentId={mode === "films" && video ? video.youtubeId : null}
          onSelect={playVideo}
          className="min-h-0"
        />
      </aside>
    </div>
  );
}
