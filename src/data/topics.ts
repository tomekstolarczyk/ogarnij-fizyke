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
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "dynamika",
    name: "Dynamika",
    group: "fundamentals",
    position: { x: 340, y: 170 },
    requires: ["kinematyka"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "praca-moc-energia",
    name: "Praca, moc, energia",
    group: "fundamentals",
    position: { x: 540, y: 80 },
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
    position: { x: 980, y: 60 },
    requires: ["praca-moc-energia"],
    videos: [],
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
    videos: [],
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
