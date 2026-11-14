import { siteLinks } from "@/data/site";

// Red "Subskrybuj" pill, like YouTube's own button. The embedded player has
// no subscribe button, so we put this one next to it. Opens the channel in a
// new tab with YouTube's "Subscribe?" confirmation already showing.
export default function SubscribeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={siteLinks.subscribe}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-[#ff0033] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 ${className}`}
    >
      {/* Mini YouTube logo turned inside out: white box, red triangle */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#ffffff" />
        <path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="#ff0033" />
      </svg>
      Subskrybuj
    </a>
  );
}
