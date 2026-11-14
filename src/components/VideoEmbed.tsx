import type { Video } from "@/data/topics";

// Settings of the YouTube player, sent in its URL (?hl=pl&rel=0...)
// No autoplay on purpose: YouTube doesn't count autoplayed embeds as views
// ("Embedded videos that are autoplayed don't increment video views",
// support.google.com/youtube/answer/171780). The viewer clicks play inside
// YouTube's own player, so every watch counts as a view and can show ads.
const playerParams = new URLSearchParams({
  hl: "pl", // Polish player: Polish buttons and the original Polish title,
  //           not YouTube's auto-translation for English-language browsers
  rel: "0", // suggested videos at the end come only from this channel
  iv_load_policy: "3", // no info cards popping up over the video
  playsinline: "1", // iPhone: play inside the page, not forced full screen
}).toString();

// One YouTube video with its title below: the regular youtube.com embedded
// player (not youtube-nocookie.com: logged-in viewers get personalized ads,
// which pay the channel more). It shows its own thumbnail and play button.
export default function VideoEmbed({ video }: { video: Video }) {
  return (
    <figure className="flex flex-col gap-2.5">
      {/* bg-black: no light flash while the player loads */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?${playerParams}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
      <figcaption className="text-[15px] leading-snug font-medium">
        {video.title}
      </figcaption>
    </figure>
  );
}
