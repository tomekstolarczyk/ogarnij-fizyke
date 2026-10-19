import type { Metadata } from "next";
import PhysicsMap from "@/components/PhysicsMap";

export const metadata: Metadata = {
  title: "Mapa fizyki · Ogarnij Fizykę",
  description:
    "Interaktywna mapa działów fizyki do matury: od czego zacząć i co z czego wynika.",
};

export default function MapPage() {
  return (
    // Full screen below the sticky header (h-14 = 3.5rem)
    <div className="h-[calc(100dvh-3.5rem)]">
      <PhysicsMap />
    </div>
  );
}
