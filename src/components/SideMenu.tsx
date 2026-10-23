"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/data/site";

// "> menu" button and the panel it slides in from the left: the main
// navigation of the whole site
export default function SideMenu() {
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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="side-menu"
        className="flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-3 py-1.5 font-mono text-sm transition-colors hover:bg-accent/20"
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

      {/* Dark backdrop over the page; clicking it closes the menu */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* The panel is always rendered and just slides off-screen when closed.
          inert: while closed, Tab and screen readers skip it. */}
      <nav
        id="side-menu"
        aria-label="Menu strony"
        inert={!open}
        className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col border-r border-border bg-background transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 px-4">
          <p className="font-mono text-sm">
            <span className="text-accent">&gt;</span> menu
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij menu"
            className="rounded-full px-2 py-1 text-muted transition-colors hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* overscroll-contain: scrolling the list doesn't scroll the page behind */}
        <ul className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-3">
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
                  className="flex gap-4 rounded-xl px-3 py-3 opacity-50"
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
                  className="group flex gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface"
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="border-t border-border/60 px-4 py-4 font-mono text-xs text-muted">
          <span className="text-accent">100% za darmo</span> · matura 2027
        </p>
      </nav>
    </>
  );
}
