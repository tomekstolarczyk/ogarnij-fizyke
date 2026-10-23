"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/data/site";

// "menu" button and the speech-bubble panel that pops out below it:
// the main navigation of the whole site
export default function SiteMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape closes the menu; the listener exists only while it's open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    // relative: the panel below is positioned against this box
    <div className="relative">
      {/* Dimmed page behind the menu; clicking it closes the menu */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* z-50: stays above the dimmed page, so it can also close the menu */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="relative z-50 flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-accent/20"
      >
        {/* Hamburger icon: three lines, the universal "menu" sign */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
          className="size-5 text-accent"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        menu
      </button>

      {/* The bubble is always rendered and just shrinks and fades out when
          closed; origin-top-left makes it grow out of the button.
          inert: while closed, Tab and screen readers skip it. */}
      <nav
        id="site-menu"
        aria-label="Menu strony"
        inert={!open}
        className={`absolute left-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] origin-top-left rounded-2xl border border-border bg-surface shadow-2xl shadow-black transition duration-200 ease-out ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Bubble tail: a rotated square peeking out above the top edge */}
        <span className="absolute -top-1.5 left-6 size-3 rotate-45 border-l border-t border-border bg-surface" />

        {/* Scrolls on short screens; overscroll-contain: scrolling the list
            doesn't scroll the page behind */}
        <ul className="max-h-[calc(100dvh-6rem)] space-y-1 overflow-y-auto overscroll-contain p-2">
          {menuItems.map((item, index) => {
            const number = String(index + 1).padStart(2, "0"); // 1 -> "01"
            const content = (
              <>
                <span className="pt-0.5 font-mono text-xs text-accent">
                  {number}
                </span>
                <span>
                  <span className="block font-medium group-hover:text-accent">
                    {item.label}
                  </span>
                  <span className="block text-sm text-muted">
                    {item.description}
                  </span>
                </span>
              </>
            );

            if (!item.href) {
              return (
                <li
                  key={item.label}
                  className="flex gap-4 rounded-xl px-3 py-2.5 opacity-50"
                >
                  {content}
                  <span className="ml-auto self-start rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                    wkrótce
                  </span>
                </li>
              );
            }

            const isExternal = item.href.startsWith("http");
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={close}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-background"
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
