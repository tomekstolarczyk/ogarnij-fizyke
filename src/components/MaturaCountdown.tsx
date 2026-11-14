"use client";

import { useSyncExternalStore } from "react";
import { matura } from "@/data/matura";

const DAY_MS = 24 * 60 * 60 * 1000;

// Whole days left until the exam starts, rounded up: the day before it's 1
function daysUntilMatura(): number {
  return Math.ceil((Date.parse(matura.start) - Date.now()) / DAY_MS);
}

// useSyncExternalStore wants to know how to get told about changes. The
// number changes once a day, so we don't listen for anything: an empty
// subscription that returns an empty "unsubscribe".
const subscribe = () => () => {};

// "186 dni do matury z fizyki". A client component on purpose: the page is
// built once, at deploy time, so a number computed on the server would stay
// frozen on that day. Here every visitor's browser counts from their own today.
export default function MaturaCountdown() {
  // useSyncExternalStore: reads a value from outside React (here: the clock).
  // Two ways to read it: in the browser (the real count) and on the server
  // (null, since the server doesn't know the visitor's today). React shows
  // the server value first, then swaps in the browser one, without errors.
  const days = useSyncExternalStore(subscribe, daysUntilMatura, () => null);

  if (days !== null && days <= 0) {
    return (
      <p className="font-hand text-3xl font-bold text-marker-yellow">
        Matura z fizyki już trwa albo za tobą. Trzymam kciuki! 🤞
      </p>
    );
  }

  return (
    <p className="flex flex-wrap items-baseline gap-x-3">
      {/* tabular-nums: all digits the same width, so nothing jumps */}
      <span className="font-display text-6xl font-extrabold text-accent tabular-nums">
        {days ?? "—"}
      </span>
      <span className="text-lg text-muted">
        {days === 1 ? "dzień" : "dni"} do matury z fizyki
      </span>
    </p>
  );
}
