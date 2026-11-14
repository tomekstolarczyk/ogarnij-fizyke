// Facts about this year's physics matura, in one place. Update every year
// from CKE's schedule ("Komunikat o harmonogramie egzaminów"), published
// each August for the next May.
// Source for 2027: CKE announcement of 20 August 2026.

export const matura = {
  year: 2027,
  // Exam start with the Polish time zone (+02:00 = summer time), so the
  // countdown is right wherever the visitor's computer clock is set
  start: "2027-05-19T09:00:00+02:00",
  weekday: "środa",
  day: "19 maja",
  time: "9:00",
  durationMinutes: 180,
  results: "9 lipca", // results day, same year
};

export type CkeLink = {
  title: string;
  description: string;
  href: string;
};

// Official CKE pages and files, shown on /matura-2027
export const ckeLinks: CkeLink[] = [
  {
    title: "Harmonogram matury 2027",
    description: "Oficjalne terminy wszystkich egzaminów, wyników i poprawek.",
    href: "https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/harmonogram-komunikaty-i-informacje/rok-szkolny-2026-2027/",
  },
  {
    title: "Informator z fizyki",
    description: "Co dokładnie może być na egzaminie, z przykładowymi zadaniami.",
    href: "https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/informatory/",
  },
  {
    title: "Karta wzorów (PDF)",
    description: "„Wybrane wzory i stałe fizykochemiczne”: tę samą dostaniesz na egzaminie.",
    href: "https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2023/Informatory/wybrane_wzory_stale_fizykochemiczne_EM2023.pdf",
  },
  {
    title: "Arkusze z poprzednich lat",
    description: "Prawdziwe matury z fizyki od 2023 roku, do rozwiązania na próbę.",
    href: "https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/",
  },
];
