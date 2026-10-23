import { channelStats } from "@/data/site";

// The road so far; full class names for the same reason as in Shortcuts.tsx
const steps = [
  {
    title: "Korepetycje",
    text: "tłumaczenie fizyki jeden na jeden",
    badge: "bg-marker-yellow",
    card: "border-border bg-surface",
  },
  {
    title: "YouTube",
    text: `${channelStats.videos} filmów i ${channelStats.subscribers} subskrybentów`,
    badge: "bg-marker-coral",
    card: "border-border bg-surface",
  },
  {
    title: "ogarnijfizyke.pl",
    text: "mapa, notatki i zadania w jednym miejscu",
    badge: "bg-accent",
    card: "border-accent bg-accent/8", // you are here
  },
];

// "Cześć, tu Tomek" section: a short intro and the road from tutoring to this site
export default function About() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-wrap items-start gap-x-16 gap-y-10 px-4 pt-14 pb-22 sm:px-6">
      <div className="min-w-0 flex-[1_1_26rem]">
        <p className="font-mono text-sm text-accent">{"// o mnie"}</p>
        <h2 className="mt-2.5 mb-5 font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-tight font-bold tracking-[-0.02em]">
          Cześć, tu Tomek
        </h2>
        <p className="text-[17px] leading-relaxed text-muted">
          Studiuję Inżynierię i Analizę Danych na MiNI PW. Fizyki uczyłem
          najpierw na korepetycjach, a potem przeniosłem to na YouTube, żeby
          każdy mógł przygotować się do matury bez płacenia za kurs.
        </p>
        {/* Quote from the channel description, handwritten */}
        <p className="mt-6 origin-left -rotate-2 font-hand text-[32px] font-bold text-marker-yellow">
          „i już nie musisz płacić za kursy maturalne ;)”
        </p>
      </div>

      <ol className="flex flex-[1_1_22rem] flex-col gap-3.5">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`flex items-center gap-4 rounded-2xl border px-5 py-4.5 ${step.card}`}
          >
            <span
              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full font-mono font-semibold text-background ${step.badge}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-[17px] font-semibold">
                {step.title}
              </span>
              <span className="text-sm text-muted">{step.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
