import Link from "next/link";
import SideMenu from "@/components/SideMenu";
import SocialIcon from "@/components/SocialIcon";
import { siteLinks } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60">
      {/* Blurred background as a separate layer: backdrop-blur on the header
          itself would trap the fixed side menu inside the header's 56px */}
      <div className="absolute inset-0 -z-10 bg-background/70 backdrop-blur-md" />

      {/* Three columns: the middle one is as wide as the logo and the side ones
          split the rest equally, so the logo stays exactly in the center.
          Full width (no max-w), so the menu and icons sit in the corners. */}
      <div className="grid h-14 w-full grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        <div className="justify-self-start">
          <SideMenu />
        </div>

        {/* Logo with a blinking terminal cursor, author's name below */}
        <Link href="/" className="flex flex-col items-center leading-tight">
          <span className="font-mono text-base font-semibold text-accent sm:text-lg">
            ogarnij_fizyke<span className="animate-pulse">_</span>
          </span>
          <span className="text-xs font-medium text-foreground">
            Tomek Stolarczyk
          </span>
        </Link>

        <nav className="flex items-center gap-3 justify-self-end">
          <a
            href={siteLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube" // icon-only link: screen readers read this
            className="transition-transform hover:scale-110"
          >
            <SocialIcon name="youtube" className="size-7" />
          </a>
          <a
            href={siteLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-transform hover:scale-110"
          >
            <SocialIcon name="instagram" className="size-7" />
          </a>
        </nav>
      </div>
    </header>
  );
}
