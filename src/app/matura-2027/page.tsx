import type { Metadata } from "next";
import Link from "next/link";
import ComingSoon from "@/components/ComingSoon";
import SectionHeading from "@/components/SectionHeading";
import { ckeLinks, matura } from "@/data/matura";

export const metadata: Metadata = {
  title: `Co musisz wiedzieć do matury ${matura.year} · Ogarnij Fizykę`,
  description: `Matura ${matura.year} z fizyki: kiedy jest, jak wygląda egzamin, karta wzorów, arkusze CKE i jak zaplanować naukę.`,
};

// "środa, 19 maja 2027"
const fullDate = `${matura.weekday}, ${matura.day} ${matura.year}`;

// Key facts as tiles; the full sentence is in the section text above them
const facts = [
  { value: matura.day, label: `${matura.weekday}, start o ${matura.time}` },
  { value: `${matura.durationMinutes} minut`, label: "jeden arkusz, tylko poziom rozszerzony" },
  { value: "karta wzorów", label: "dostajesz ją na egzaminie, nie musisz wkuwać wszystkiego" },
  { value: matura.results, label: "wyniki" },
];

// "Co musisz wiedzieć do matury": the matura handbook. Skeleton for now:
// sections with real facts where we have them, "wkrótce" where content is
// still to be written.
export default function MaturaPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <p className="font-mono text-sm text-accent">{`// matura ${matura.year}`}</p>
      <h1 className="mt-2.5 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        Co musisz wiedzieć do matury {matura.year}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        Wszystko o maturze z fizyki w jednym miejscu: kiedy jest, jak wygląda,
        co możesz mieć ze sobą i jak się do niej przygotować, żeby w maju nic
        cię nie zaskoczyło.
      </p>
      <p className="mt-7 font-hand text-3xl font-bold text-marker-yellow">
        {fullDate}, godz. {matura.time}
      </p>

      <section className="mt-16">
        <SectionHeading label="egzamin" title="Jak wygląda matura z fizyki" />
        <p className="mb-6 max-w-2xl leading-relaxed text-muted">
          Fizykę zdajesz {matura.day} {matura.year} o {matura.time}. Jest tylko na
          poziomie rozszerzonym i trwa {matura.durationMinutes} minut.
        </p>
        {/* auto-fit: 4 tiles in a row on desktop, 2 or 1 on a phone */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-4">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-border bg-surface p-5">
              <p className="font-display text-2xl font-bold text-accent">{fact.value}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading label="zakres" title="Co jest na maturze" />
        <p className="mb-6 max-w-2xl leading-relaxed text-muted">
          Cały materiał ułożyłem w kurs, dział po dziale, w kolejności, w
          jakiej najlepiej się go uczyć. Na mapie zobaczysz, co z czego wynika.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dzialy"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5.5 font-semibold text-background transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Cała fizyka <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/mapa"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5.5 font-medium transition hover:-translate-y-0.5 hover:border-accent/60"
          >
            Mapa fizyki <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading label="cke" title="Oficjalne materiały CKE" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {ckeLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-marker-blue"
              >
                <span className="font-semibold group-hover:text-marker-blue">
                  {link.title} <span aria-hidden="true">↗</span>
                </span>
                <span className="text-sm leading-snug text-muted">{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <SectionHeading label="plan" title="Jak zaplanować naukę" />
        <ComingSoon text="Planer nauki: ile czasu na który dział, żeby zdążyć przed majem." />
      </section>

      <section className="mt-16">
        <SectionHeading label="faq" title="Najczęstsze pytania" />
        <ComingSoon text="Odpowiedzi na pytania, które najczęściej dostaję od was na YouTube i Instagramie." />
      </section>
    </div>
  );
}
