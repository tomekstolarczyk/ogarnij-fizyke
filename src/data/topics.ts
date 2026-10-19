// All physics topics in one place: map, topic list and topic pages read from here.
// Topics + `requires` form a DAG (directed acyclic graph): an edge A -> B means
// "learn A before B".

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
  requires: string[]; // slugs of topics to learn first (incoming edges)
  videos: Video[];
  notes: Note[];
  exercises: Exercise[];
};

// TODO: fill in videos, notes and exercises
export const topics: Topic[] = [
  {
    slug: "kinematyka",
    name: "Kinematyka",
    requires: [],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "dynamika",
    name: "Dynamika",
    requires: ["kinematyka"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "praca-moc-energia",
    name: "Praca, moc, energia",
    requires: ["dynamika"],
    videos: [],
    notes: [],
    exercises: [],
  },
  {
    slug: "bryla-sztywna",
    name: "Bryła sztywna",
    requires: ["dynamika", "praca-moc-energia"],
    videos: [],
    notes: [],
    exercises: [],
  },
];
