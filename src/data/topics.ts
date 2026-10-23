// All physics topics in one place: map, topic list and topic pages read from here.

// The big worlds of physics: each one is an island on the map
export type World = "classical" | "relativistic" | "quantum";

export const worlds: Record<World, { name: string; color: string }> = {
  classical: { name: "Fizyka klasyczna", color: "#e8a598" },
  relativistic: { name: "Fizyka relatywistyczna", color: "#9db7c7" },
  quantum: { name: "Fizyka kwantowa", color: "#c3a3d6" },
};

// Clusters of topics inside a world, as drawn on the map
export type Group =
  | "fundamentals"
  | "complexMotion"
  | "interactions"
  | "macroMicro"
  | "quantum"
  | "relativistic";

export const groups: Record<
  Group,
  { name: string; world: World; color: string }
> = {
  fundamentals: { name: "Fundamenty", world: "classical", color: "#f6cfc0" },
  complexMotion: {
    name: "Złożone ruchy",
    world: "classical",
    color: "#e78f7d",
  },
  interactions: {
    name: "Oddziaływania fundamentalne",
    world: "classical",
    color: "#ef9fa8",
  },
  macroMicro: { name: "Makro a mikro", world: "classical", color: "#f3b48a" },
  quantum: { name: "Fizyka kwantowa", world: "quantum", color: "#d2b6e3" },
  relativistic: {
    name: "Fizyka relatywistyczna",
    world: "relativistic",
    color: "#b6cddb",
  },
};

export type Video = {
  title: string;
  youtubeId: string; // the part after "v=" in a YouTube URL
};

export type Note = {
  title: string;
  images: string[]; // paths inside /public, e.g. "/notes/bryla-sztywna/1.jpg"
  pdf?: string; // optional: path to a downloadable PDF
};

export type Exercise = {
  title: string; // e.g. "Matura maj 2023, zad. 4"
  url: string; // link to the CKE exam sheet
};

export type Topic = {
  slug: string; // used in the URL: /dzialy/<slug>
  name: string; // shown to the user
  group: Group;
  position: { x: number; y: number }; // node center on the map, in px
  requires: string[]; // slugs of topics to learn first (incoming edges)
  videos: Video[];
  notes: Note[];
  exercises: Exercise[];
};

// TODO: fill in videos, notes and exercises
export const topics: Topic[] = [
  // Fundamentals
  {
    slug: "kinematyka",
    name: "Kinematyka",
    group: "fundamentals",
    position: { x: 140, y: 260 },
    requires: [],
    videos: [
      {
        title: "Kinematyka Teoria #1: Wprowadzenie - droga, układ odniesienia, punkt materialny",
        youtubeId: "BgpKPEIgl1w",
      },
      {
        title: "Kinematyka Teoria #2: Ruch Prostoliniowy Jednostajny i Jednostajnie Zmienny",
        youtubeId: "s4meApymmtQ",
      },
      {
        title: "Kinematyka Zadania #1 - Matura Fizyka 2020 Czerwiec CKE Zad 1. Hokeista [Ruch Prostoliniowy]",
        youtubeId: "nmx9e6CnHWk",
      },
      {
        title: "Kinematyka Zadania #2 - Matura Fizyka 2020 Lipiec CKE Zad 1. Samolot [Ruch Prostoliniowy]",
        youtubeId: "RC1OYYi0ZlE",
      },
      {
        title: "Kinematyka Zadania #3 - Matura Fizyka 2023 Maj CKE Zad 1. Pościg [Ruch Prostoliniowy]",
        youtubeId: "RPp1po3lH2M",
      },
      {
        title: "Kinematyka Teoria #3: Spadek Swobodny i Rzut Pionowy",
        youtubeId: "kpsnak2w2CE",
      },
      {
        title: "Kinematyka Zadania #4: 2025 -2026 Informator Maturalny CKE Zad. 2. Spadająca Kulka [Spadek Swobodny]",
        youtubeId: "rC9cmGRD3D8",
      },
      {
        title: "Kinematyka Teoria #4: Rzut Poziomy",
        youtubeId: "_1CR7Oc8jpM",
      },
      {
        title: "Kinematyka Zadania #5: Matura Fizyka 2021 Maj CKE Zad. 1. Dwie Kulki [Rzut Poziomy]",
        youtubeId: "GUNk_yFQnpY",
      },
      {
        title: "Kinematyka Zadania #6: Matura Fizyka 2021 Czerwiec CKE Zad. 1. Wieża Obserwacyjna [Rzut Poziomy]",
        youtubeId: "kUNOSIuS_O8",
      },
      {
        title: "Kinematyka Teoria #5: Ruch po Okręgu - Przyspieszenie Dośrodkowe i Prędkość Kątowa",
        youtubeId: "kEPX0HERKqs",
      },
      {
        title: "Kinematyka Zadania #7: Matura Próbna Fizyka 2022 Grudzień CKE Zad. 1. [Ruch Po Okręgu]",
        youtubeId: "1jgJNuaSyac",
      },
      {
        title: "CAŁA KINEMATYKA do MATURY 2026 w Mniej Niż 3 Godziny (teoria + zadania)",
        youtubeId: "k3cL6KhzuwY",
      },
    ],
    notes: [],
    exercises: [],
  },
  {
    slug: "dynamika",
    name: "Dynamika",
    group: "fundamentals",
    position: { x: 340, y: 170 },
    requires: ["kinematyka"],
    videos: [
      {
        title: "Dynamika Teoria #1: Siła i Zasady Dynamiki Newtona",
        youtubeId: "ND5Vxk9FrPM",
      },
      {
        title: "Dynamika Zadania #1: Matura Fizyka 2022 Maj CKE Zad. 2. [Siła i Zasady Dynamiki Newtona]",
        youtubeId: "uRzwc-8qe28",
      },
      {
        title: "Dynamika Teoria #2: Tarcie, Siła Oporu i Prędkość Graniczna, Siła Dośrodkowa",
        youtubeId: "9JleTN8nrbU",
      },
      {
        title: "Dynamika Zadania #2: Matura Próbna Fizyka 2021 Marzec CKE Zad. 2. [Siła i Zasady Dynamiki Newtona]",
        youtubeId: "Jm1XXt3Nc9g",
      },
      {
        title: "Dynamika Zadania #3: Matura Fizyka 2023 Maj CKE Zad. 3. [Siła i Zasady Dynamiki Newtona]",
        youtubeId: "1C7oP2eAJfA",
      },
      {
        title: "Dynamika Zadania #4: Matura Fizyka 2022 Czerwiec CKE Zad. 4. [Siła i Zasady Dynamiki Newtona]",
        youtubeId: "wGpHZm9qLR8",
      },
      {
        title: "Dynamika Zadania #5: Matura Fizyka 2024 Maj CKE Zad. 1. [Siła Oporu i Prędkość Graniczna]",
        youtubeId: "VL0ktZrZCaM",
      },
      {
        title: "Dynamika Teoria #3: Pęd i Zasada Zachowania Pędu",
        youtubeId: "s9lmFhuYmtE",
      },
      {
        title: "Dynamika Zadania #6: 2025-2026 Informator Maturalny CKE Zad. 1. [Pęd i Zasada Zachowania Pędu]",
        youtubeId: "ffps5y-09qY",
      },
      {
        title: "CAŁA DYNAMIKA do MATURY 2026 w Mniej Niż 4 Godziny (teoria + zadania)",
        youtubeId: "3PPtAHlnIWI",
      },
    ],
    notes: [],
    exercises: [],
  },
  {
    slug: "praca-moc-energia",
    name: "Praca, moc, energia",
    group: "fundamentals",
    position: { x: 540, y: 80 },
    requires: ["dynamika"],
    videos: [
      {
        title: "Praca Moc Energia Teoria #1.1: Zasada Zachowania Energii",
        youtubeId: "EDf4JyjbC4I",
      },
      {
        title: "Praca Moc Energia Teoria #1.2: Oddziaływania Fundamentalne",
        youtubeId: "Q66lxOP066s",
      },
      {
        title: "Praca Moc Energia Teoria #1.3: Siły Zachowawcze i Niezachowawcze",
        youtubeId: "bGTPPcW4LyM",
      },
      {
        title: "Praca Moc Energia Zadania #1 Matura Fizyka 2023 Maj CKE Zad. 3. [Zasada Zachowania Energii]",
        youtubeId: "02SWAOP_8Lc",
      },
      {
        title: "Praca Moc Energia Teoria #2: Zderzenia",
        youtubeId: "3ijSipEYeCw",
      },
      {
        title: "Praca Moc Energia Zadania #2: Matura 2023 Czerwiec CKE Zad. 2. [ZDERZENIA]",
        youtubeId: "qmllRemBauk",
      },
      {
        title: "CAŁA PRACA MOC ENERGIA do MATURY 2026 w Mniej Niż 4 Godziny (teoria + zadania)",
        youtubeId: "SH3W51qnIFY",
      },
    ],
    notes: [],
    exercises: [],
  },

  // Complex motion
  {
    slug: "bryla-sztywna",
    name: "Bryła sztywna",
    group: "complexMotion",
    position: { x: 980, y: 60 },
    requires: ["praca-moc-energia"],
    videos: [
      {
        title: "BRYŁA SZTYWNA Teoria #1: Wstęp",
        youtubeId: "BvBA_7G2T1s",
      },
      {
        title: "Bryła Sztywna Teoria #2: Środek Masy i Ruch Postępowy.",
        youtubeId: "BnpMOiugLsY",
      },
      {
        title: "Bryła Sztywna Teoria #3.1: Ruch Obrotowy",
        youtubeId: "vDOPXN2jWik",
      },
      {
        title: "Bryła Sztywna Teoria #3.2: Moment Siły i Moment Bezwładności",
        youtubeId: "GXY3eATOozk",
      },
      {
        title: "Bryła Sztywna Teoria #4: Toczenie i Równowaga Bryły Sztywnej",
        youtubeId: "c6eaWBiyx9M",
      },
      {
        title: "Bryła Sztywna Zadania #1",
        youtubeId: "sbiPdYHTkFE",
      },
      {
        title: "Bryła Sztywna Zadania #2",
        youtubeId: "4cTyG7IOJsE",
      },
    ],
    notes: [],
    exercises: [],
  },
  {
    slug: "drgania",
    name: "Drgania",
    group: "complexMotion",
    position: { x: 980, y: 220 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },

  // Fundamental interactions
  {
    slug: "grawitacja",
    name: "Grawitacja",
    group: "interactions",
    position: { x: 100, y: 450 },
    requires: ["praca-moc-energia"],
    videos: [
      {
        title: "Grawitacja 1: Prawo Powszechnego Ciążenia",
        youtubeId: "IyDWXR1slHY",
      },
    ],
    notes: [],
    exercises: [],
  },
  {
    slug: "elektrostatyka",
    name: "Elektrostatyka",
    group: "interactions",
    position: { x: 120, y: 620 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "magnetyzm",
    name: "Magnetyzm",
    group: "interactions",
    position: { x: 330, y: 600 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "indukcja-i-prad-zmienny",
    name: "Indukcja elektromagnetyczna i prąd zmienny",
    group: "interactions",
    position: { x: 240, y: 770 },
    requires: ["elektrostatyka", "magnetyzm"],
    videos: [],
    notes: [],
    exercises: [],
  },

  // Macro world built from the micro world
  {
    slug: "termodynamika",
    name: "Termodynamika",
    group: "macroMicro",
    position: { x: 820, y: 520 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "hydrostatyka",
    name: "Hydrostatyka",
    group: "macroMicro",
    position: { x: 440, y: 470 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "prad-staly",
    name: "Prąd stały",
    group: "macroMicro",
    position: { x: 640, y: 620 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "fale-mechaniczne",
    name: "Fale mechaniczne",
    group: "macroMicro",
    position: { x: 980, y: 420 },
    requires: ["praca-moc-energia", "drgania"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "fale-em-i-optyka",
    name: "Fale elektromagnetyczne i optyka",
    group: "macroMicro",
    position: { x: 480, y: 770 },
    requires: ["indukcja-i-prad-zmienny"],
    videos: [],
    notes: [],
    exercises: [],
  },

  // Quantum physics
  {
    slug: "fizyka-atomowa",
    name: "Fizyka atomowa",
    group: "quantum",
    position: { x: 1450, y: 770 },
    requires: ["fale-em-i-optyka"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "fizyka-jadrowa",
    name: "Fizyka jądrowa",
    group: "quantum",
    position: { x: 1650, y: 640 },
    requires: ["fizyka-atomowa"],
    videos: [],
    notes: [],
    exercises: [],
  },

  // Relativistic physics
  {
    slug: "fizyka-relatywistyczna",
    name: "Elementy fizyki relatywistycznej",
    group: "relativistic",
    position: { x: 1450, y: -200 },
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
];

// Branch points on the classical island: arrows from the fundamentals to a
// group fan out from one dot instead of each starting at "from"
export type Branch = {
  id: string;
  group: Group; // arrows go to topics of this group...
  from: string; // ...that require this topic
  position: { x: number; y: number };
};

export const branches: Branch[] = [
  {
    id: "branch-complex-motion",
    group: "complexMotion",
    from: "praca-moc-energia",
    position: { x: 760, y: 110 },
  },
  {
    id: "branch-macro-micro",
    group: "macroMicro",
    from: "praca-moc-energia",
    position: { x: 600, y: 280 },
  },
  {
    id: "branch-interactions",
    group: "interactions",
    from: "praca-moc-energia",
    position: { x: 300, y: 340 },
  },
];
