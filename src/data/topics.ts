// All physics topics in one place: map, topic list and topic pages read from here.

// Clusters of topics, as drawn on the map.
// Classical physics = the first four groups.
export type Group =
  | "fundamentals"
  | "complexMotion"
  | "interactions"
  | "macroMicro"
  | "quantum"
  | "relativistic";

// Names shown to the user
export const groupNames: Record<Group, string> = {
  fundamentals: "Fundamenty",
  complexMotion: "Złożone ruchy",
  interactions: "Oddziaływania fundamentalne",
  macroMicro: "Makro a mikro",
  quantum: "Fizyka kwantowa",
  relativistic: "Fizyka relatywistyczna",
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
    requires: [],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "dynamika",
    name: "Dynamika",
    group: "fundamentals",
    requires: ["kinematyka"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "praca-moc-energia",
    name: "Praca, moc, energia",
    group: "fundamentals",
    requires: ["dynamika"],
    videos: [],
    notes: [],
    exercises: [],
  },

  // Complex motion
  {
    slug: "bryla-sztywna",
    name: "Bryła sztywna",
    group: "complexMotion",
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "drgania",
    name: "Drgania",
    group: "complexMotion",
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
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "elektrostatyka",
    name: "Elektrostatyka",
    group: "interactions",
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "magnetyzm",
    name: "Magnetyzm",
    group: "interactions",
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "indukcja-i-prad-zmienny",
    name: "Indukcja elektromagnetyczna i prąd zmienny",
    group: "interactions",
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
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "hydrostatyka",
    name: "Hydrostatyka",
    group: "macroMicro",
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "prad-staly",
    name: "Prąd stały",
    group: "macroMicro",
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "fale-mechaniczne",
    name: "Fale mechaniczne",
    group: "macroMicro",
    requires: ["praca-moc-energia", "drgania"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "fale-em-i-optyka",
    name: "Fale elektromagnetyczne i optyka",
    group: "macroMicro",
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
    requires: ["fale-em-i-optyka"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "fizyka-jadrowa",
    name: "Fizyka jądrowa",
    group: "quantum",
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
    requires: ["praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
];
