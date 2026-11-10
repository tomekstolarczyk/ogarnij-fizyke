import fs from "node:fs";
import path from "node:path";

// The book lives in plain Markdown files, one chapter per topic:
//   src/content/book/<slug>.md
// Plain Markdown + LaTeX math ($...$) on purpose: the same files can later go
// through Pandoc to make a printable PDF, so the paper book needs no rewriting.
const BOOK_DIR = path.join(process.cwd(), "src", "content", "book");

// Returns the chapter's Markdown, or null if it isn't written yet.
// Runs only on the server, at build time: the reader's browser gets finished
// HTML, never this file. Sync read on purpose: Next treats it as a fixed
// value and bakes the result into the static page.
// Only call it with a slug that exists in topics.ts (never raw user input),
// so nobody can sneak "../" into the path.
export function getChapter(slug: string): string | null {
  const file = path.join(BOOK_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf-8");
}
