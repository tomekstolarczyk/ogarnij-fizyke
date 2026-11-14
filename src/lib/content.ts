import fs from "node:fs";
import path from "node:path";

// Long texts of regular pages (not book chapters) live in Markdown files:
//   src/content/pages/<name>.md
// Same rules as the book: plain Markdown, "# Title" on top (hidden on the
// page), "##" sections. Read at build time, like getChapter in book.ts.
const PAGES_DIR = path.join(process.cwd(), "src", "content", "pages");

// Only call it with a fixed name from our own code, never with user input.
// Throws if the file is missing: a page without its text is a bug, not
// "coming soon", so the build should fail.
export function getPageContent(name: string): string {
  return fs.readFileSync(path.join(PAGES_DIR, `${name}.md`), "utf-8");
}
