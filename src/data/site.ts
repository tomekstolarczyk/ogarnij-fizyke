// External links used across the site (header, footer)
export const siteLinks = {
  youtube: "https://www.youtube.com/@tomekstolarczykk",
  instagram: "https://www.instagram.com/tomekstolarczykk",
  github: "https://github.com/tomekstolarczyk/ogarnij-fizyke",
};

// Channel numbers shown on the landing page; update by hand from YouTube Studio
export const channelStats = {
  subscribers: "3,19 tys.",
  videos: 41,
  latestVideo: "Grawitacja 1: Prawo Powszechnego Ciążenia",
};

export type MenuItem = {
  label: string;
  description: string;
  href?: string; // no href = page not ready yet, shown as "wkrótce"
};

// Side menu entries, in display order (numbers 01, 02... come from the order)
export const menuItems: MenuItem[] = [
  { label: "O mnie", description: "Kim jestem i skąd ten kanał" },
  {
    label: "Co muszę wiedzieć do matury 2027?",
    description: "Zasady, informatory CKE, karta wzorów",
  },
  {
    label: "Mapa fizyki",
    description: "Wszystkie działy i co z czego wynika",
    href: "/mapa",
  },
  { label: "Notatki i wzory", description: "Notatki do pobrania jako PDF" },
  {
    label: "YouTube",
    description: "Wszystkie filmy na kanale",
    href: siteLinks.youtube,
  },
  { label: "Kontakt", description: "Mail i Instagram" },
  { label: "Chcesz mnie wesprzeć?", description: "Kliknij tutaj ☕" },
];
