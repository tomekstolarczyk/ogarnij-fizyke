"use client";

import { useState } from "react";
import type { Video } from "@/data/topics";

// One YouTube video with its title below, as a "facade": until you click,
// it's just the thumbnail (a ~25 KB image from YouTube's CDN) with a play
// button. Only the click swaps in the real YouTube player, which weighs
// hundreds of KB of JavaScript. A topic with 13 videos would otherwise load
// 13 players; now it loads 13 small images and at most the one you play.
// "use client": the component remembers whether it was clicked (state),
// so it has to run in the browser.
// autoPlay: skip the thumbnail and start right away; used when the user has
// just picked this video from a list, so that click already meant "play".
export default function VideoEmbed({
  video,
  autoPlay = false,
}: {
  video: Video;
  autoPlay?: boolean;
}) {
  const [playing, setPlaying] = useState(autoPlay);

  return (
    <figure className="flex flex-col gap-2.5">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
        {playing ? (
          // youtube-nocookie.com: YouTube's privacy mode, no tracking cookies
          // for people who just visit the page. autoplay=1: the user's click
          // already was the "play".
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Odtwórz: ${video.title}`}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            {/* Plain <img>, not next/image: YouTube's CDN already serves a
                small, ready thumbnail, so there's nothing left to optimize.
                hqdefault is 4:3 with black bars; object-cover crops them off. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            {/* Play button: YouTube-red rounded rectangle with a triangle */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/0">
              <span className="flex h-12 w-17 items-center justify-center rounded-2xl bg-[#ff0033] shadow-lg transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 size-6 fill-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="text-[15px] leading-snug font-medium">
        {video.title}
      </figcaption>
    </figure>
  );
}
