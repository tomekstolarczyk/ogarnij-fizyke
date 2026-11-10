import ComingSoon from "@/components/ComingSoon";
import SectionHeading from "@/components/SectionHeading";
import VideoEmbed from "@/components/VideoEmbed";
import type { Topic, Video } from "@/data/topics";

// A titled grid of videos; id="film-<youtubeId>" lets exercises link to their solution
function VideoGrid({ title, videos }: { title: string; videos: Video[] }) {
  if (videos.length === 0) return null;
  return (
    <div>
      <h3 className="mb-4 font-display text-xl font-bold">{title}</h3>
      {/* 1 column on a phone, 2 from the sm breakpoint up */}
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
        {videos.map((video) => (
          <div
            key={video.youtubeId}
            id={`film-${video.youtubeId}`}
            className="scroll-mt-20"
          >
            <VideoEmbed video={video} />
          </div>
        ))}
      </div>
    </div>
  );
}

// "Filmy" section of a topic page: the one-long-video version first (if there
// is one), then theory and exercise videos in the order from topics.ts
export default function TopicVideos({ topic }: { topic: Topic }) {
  const full = topic.videos.filter((v) => v.kind === "full");
  const theory = topic.videos.filter((v) => v.kind === "theory");
  const exercises = topic.videos.filter((v) => v.kind === "exercise");

  return (
    <section>
      <SectionHeading id="filmy" label="filmy" title="Filmy z kanału" />

      {topic.videos.length === 0 ? (
        <ComingSoon text="Ten dział właśnie nagrywam. Filmy pojawią się tutaj i na kanale." />
      ) : (
        <div className="flex flex-col gap-12">
          {full.length > 0 && (
            <div className="rounded-3xl border border-accent bg-accent/8 p-5 sm:p-7">
              <p className="mb-1 font-hand text-2xl font-bold text-marker-yellow">
                masz mało czasu?
              </p>
              <h3 className="mb-5 font-display text-xl font-bold">
                Cały dział w jednym filmie
              </h3>
              <div className="flex flex-col gap-8">
                {full.map((video) => (
                  <VideoEmbed key={video.youtubeId} video={video} />
                ))}
              </div>
            </div>
          )}
          <VideoGrid title="Teoria" videos={theory} />
          <VideoGrid title="Zadania krok po kroku" videos={exercises} />
        </div>
      )}
    </section>
  );
}
