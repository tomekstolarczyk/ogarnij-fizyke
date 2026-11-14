import type { Metadata } from "next";
import Link from "next/link";
import BookChapter from "@/components/BookChapter";
import ComingSoon from "@/components/ComingSoon";
import MaturaCountdown from "@/components/MaturaCountdown";
import SectionHeading from "@/components/SectionHeading";
import { ckeLinks, matura } from "@/data/matura";
import { getPageContent } from "@/lib/content";

// Title and description worded like what people type into Google
export const metadata: Metadata = {
  title: `Matura z fizyki ${matura.year}: wszystko, co musisz wiedzieć · Ogarnij Fizykę`,
  description: `Kiedy jest matura z fizyki ${matura.year}, jak wygląda arkusz, za co są punkty, jaki kalkulator, karta wzorów, arkusze CKE i jak się przygotować.`,
};

// "środa, 19 maja 2027"
const fullDate = `${matura.weekday}, ${matura.day} ${matura.year}`;

// Key facts as tiles at the top; the text below explains each of them
const facts = [
  { value: matura.day, label: `${matura.weekday}, start o ${matura.time}` },
  { value: `${matura.durationMinutes} minut`, label: "jeden arkusz, tylko poziom rozszerzony" },
  { value: `${matura.maxPoints} punktów`, label: "ok. 80% za zadania otwarte" },
  { value: matura.results, label: "wyniki" },
];

// "Co musisz wiedzieć do matury": the matura guide, meant to be found on
// Google and to send people on to the course. The long text comes from
// Markdown (same renderer as the book); this file only adds the parts that
// need code: the countdown, the fact tiles and the link cards.
export default function MaturaPage() {
  const guide = getPageContent("matura-2027");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <p className="font-mono text-sm text-accent">{`// matura ${matura.year}`}</p>
      <h1 className="mt-2.5 font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
        Matura z fizyki {matura.year}: wszystko, co musisz wiedzieć
      </h1>
      <div className="mt-8 flex flex-col gap-1">
        <MaturaCountdown />
        <p className="font-hand text-3xl font-bold text-marker-yellow">
          {fullDate}, godz. {matura.time}
        </p>
      </div>

      {/* auto-fit: 4 tiles in a row on desktop, 2 or 1 on a phone */}
      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-4">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-display text-2xl font-bold text-accent">{fact.value}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{fact.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <SectionHeading label="przewodnik" title="Matura z fizyki krok po kroku" />
        <BookChapter markdown={guide} />
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

      {/* The point of the page: send people from Google on to the course */}
      <section className="mt-16 rounded-[28px] border border-accent/40 bg-accent/8 px-6 py-10 text-center">
        <p className="font-hand text-3xl font-bold text-marker-yellow">to co, zaczynamy?</p>
        <h2 className="mt-2 font-display text-[clamp(1.625rem,3.5vw,2.25rem)] leading-tight font-bold tracking-[-0.02em]">
          Cała fizyka do matury, za darmo
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
          Filmy, książka, notatki i zadania z arkuszy CKE, dział po dziale, w
          kolejności, w jakiej najlepiej się uczyć.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dzialy"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5.5 font-semibold text-background transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Zacznij kurs <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/mapa"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5.5 font-medium transition hover:-translate-y-0.5 hover:border-accent/60"
          >
            Zobacz mapę fizyki <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading label="plan" title="Planer nauki" />
        <ComingSoon text="Ile czasu na który dział, żeby spokojnie zdążyć przed majem." />
      </section>
    </div>
  );
}
