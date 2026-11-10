// Dashed placeholder for a part of the course that isn't ready yet,
// in the same style as the "wkrótce" cards on the landing page
export default function ComingSoon({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-surface/60 px-5 py-6 text-muted">
      <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs">
        wkrótce
      </span>
      <span>{text}</span>
    </div>
  );
}
