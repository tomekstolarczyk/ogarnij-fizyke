type Props = {
  id?: string; // optional anchor for in-page links, e.g. #filmy
  label: string; // small code-comment line above the title
  title: string;
};

// Section title in the landing page style: "// label" in mono, big title below.
// scroll-mt-20: when an #anchor link jumps here, stop below the sticky header.
export default function SectionHeading({ id, label, title }: Props) {
  return (
    <div id={id} className="mb-6 scroll-mt-20">
      <p className="font-mono text-sm text-accent">{`// ${label}`}</p>
      <h2 className="mt-2 font-display text-[clamp(1.625rem,3.5vw,2.25rem)] leading-tight font-bold tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}
