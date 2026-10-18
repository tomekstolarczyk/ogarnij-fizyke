import { siteLinks } from "@/data/site";

const features = [
  {
    label: "01",
    title: "Filmy",
    text: "Każdy dział wytłumaczony krok po kroku na YouTube.",
  },
  {
    label: "02",
    title: "Notatki",
    text: "Odręczne notatki do przejrzenia online albo pobrania jako PDF.",
  },
  {
    label: "03",
    title: "Zadania CKE",
    text: "Zadania z prawdziwych arkuszy maturalnych, pogrupowane działami.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero; isolate keeps the -z-10 background layers inside this section */}
      <section className="relative isolate overflow-hidden">
        {/* Background grid that fades out towards the edges */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
        {/* Green glow behind the heading */}
        <div className="absolute left-1/2 top-0 -z-10 h-72 w-xl -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

        <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center sm:py-32">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
            Matura 2027 · 100% za darmo
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Ogarnij <span className="text-accent">fizykę</span>
            <br />
            do matury.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
            Filmy, odręczne notatki i zadania z arkuszy CKE w jednym miejscu.
            Bez płatnych kursów, bez chaosu.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-accent px-6 py-3 font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
            >
              Oglądaj na YouTube
            </a>
            <span className="w-full rounded-full border border-border px-6 py-3 font-mono text-sm text-muted sm:w-auto">
              Mapa fizyki · wkrótce
            </span>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-24 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <p className="font-mono text-sm text-accent">{feature.label}</p>
            <h2 className="mt-3 text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted">{feature.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
