"use client";

import { useState } from "react";
import type { Video } from "@/data/topics";

// Settings of the YouTube player, sent in its URL (?autoplay=1&hl=pl...)
const playerParams = new URLSearchParams({
  autoplay: "1", // the user's click already was the "play"
  hl: "pl", // Polish player: Polish buttons and the original Polish title,
  //           not YouTube's auto-translation for English-language browsers
  rel: "0", // suggested videos at the end come only from this channel
  iv_load_policy: "3", // no info cards popping up over the video
  playsinline: "1", // iPhone: play inside the page, not forced full screen
}).toString();

// Thumbnails from YouTube's CDN. maxres = 1280x720 WebP (~60 KB), sharp even
// on a big screen. Not every video has it (only HD uploads); then YouTube
// sends a tiny 120x90 grey placeholder and we fall back to the 480x360 one.
const thumbnail = (id: string) => `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`;
const fallbackThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// One YouTube video with its title below, as a "facade": until you click,
// it's just the thumbnail with a play button. Only the click swaps in the real
// YouTube player, which weighs hundreds of KB of JavaScript.
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
  const [useFallback, setUseFallback] = useState(false);

  return (
    <figure className="flex flex-col gap-2.5">
      {/* bg-black: no light flash while the player loads */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-black">
        {playing ? (
          // Regular youtube.com player, not the youtube-nocookie.com privacy
          // mode: viewers stay logged in and get personalized ads, which pay
          // the channel more. Thanks to the facade, YouTube (and its cookies)
          // loads only after someone clicks play.
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?${playerParams}`}
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
                ready, compressed thumbnail, so there's nothing left to optimize.
                Not lazy: it's the first thing on the page, it should load first.
                object-cover crops the black bars off the 4:3 fallback. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={useFallback ? fallbackThumbnail(video.youtubeId) : thumbnail(video.youtubeId)}
              alt=""
              decoding="async"
              onLoad={(event) => {
                if (event.currentTarget.naturalWidth <= 120) setUseFallback(true);
              }}
              onError={() => setUseFallback(true)}
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
