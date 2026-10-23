import Hero from "@/components/Hero";

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
      <Hero />

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
