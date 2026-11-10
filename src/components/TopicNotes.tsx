import Image from "next/image";
import ComingSoon from "@/components/ComingSoon";
import SectionHeading from "@/components/SectionHeading";
import type { Topic } from "@/data/topics";

// "Notatki" section: handwritten note pages to look through, plus the PDF
export default function TopicNotes({ topic }: { topic: Topic }) {
  return (
    <section>
      <SectionHeading id="notatki" label="notatki" title="Odręczne notatki" />

      {topic.notes.length === 0 ? (
        <ComingSoon text="Notatki do tego działu skanuję. Będą do przejrzenia tutaj i do pobrania jako PDF." />
      ) : (
        <div className="flex flex-col gap-10">
          {topic.notes.map((note) => (
            <div key={note.title}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold">{note.title}</h3>
                {note.pdf && (
                  <a
                    href={note.pdf}
                    download
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-marker-purple bg-marker-purple/10 px-4 text-sm font-semibold transition hover:bg-marker-purple/20"
                  >
                    Pobierz PDF <span aria-hidden="true">↓</span>
                  </a>
                )}
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
                {note.images.map((src, index) => (
                  // Click a page to open it full size in a new tab
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overflow-hidden rounded-xl border border-border bg-paper transition hover:-translate-y-1 hover:border-marker-purple"
                  >
                    {/* width/height only tell the browser the shape (A4 scan)
                        to reserve space before loading; h-auto keeps the real one */}
                    <Image
                      src={src}
                      alt={`${note.title}, strona ${index + 1}`}
                      width={1240}
                      height={1754}
                      className="h-auto w-full"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
