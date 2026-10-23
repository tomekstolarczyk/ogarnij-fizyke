import Image from "next/image";

// Tilted polaroid with Tomek's photo: tape on top, stickers around it
export default function HeroPhoto() {
  return (
    <div className="flex flex-[1_1_20rem] justify-center px-3 pt-10 pb-3">
      <figure className="relative w-full max-w-100 rotate-[2.5deg]">
        {/* Strip of tape holding the photo */}
        <span
          aria-hidden="true"
          className="absolute -top-3.5 left-1/2 z-10 h-7.5 w-30 -translate-x-1/2 -rotate-4 rounded-[3px] bg-marker-yellow/60"
        />

        <div className="rounded-lg bg-paper px-3.5 pt-3.5 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.8)]">
          <Image
            src="/images/tomek.jpg"
            alt="Tomek Stolarczyk na tle nocnego Los Angeles"
            width={800}
            height={925}
            sizes="(min-width: 640px) 400px, 90vw" // how wide it shows, so Next picks a small enough file
            preload // visible right away: load it first, not lazily
            className="aspect-4/5 w-full rounded object-cover"
          />
          <figcaption className="pt-2.5 pb-4 text-center font-hand text-[32px] font-bold text-ink">
            cześć, to ja — Tomek!
          </figcaption>
        </div>

        {/* Stickers */}
        <span className="absolute top-16 -left-4.5 z-10 -rotate-9 rounded-full bg-marker-blue px-3 py-1.5 font-mono text-[13px] font-semibold text-background shadow-[3px_3px_0_var(--color-background)]">
          student MiNI PW
        </span>
        <span className="absolute -right-4 bottom-30 z-10 rotate-6 rounded-full bg-marker-coral px-3 py-1.5 font-mono text-[13px] font-semibold text-background shadow-[3px_3px_0_var(--color-background)]">
          100% za darmo
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-11 right-1 z-10 rotate-10 font-hand text-[42px] font-bold text-marker-purple"
        >
          F = ma
        </span>
      </figure>
    </div>
  );
}
