import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// fonts 1
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "greek"],
});

// fonts 2
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext", "greek"],
});

export const metadata: Metadata = {
  title: "Ogarnij Fizykę",
  description: "Darmowy kurs fizyki do matury: filmy, notatki i zadania.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      // smooth scroll for in-page links (/#mapa); Next turns it off for page changes
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} scheme-dark motion-safe:scroll-smooth`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground font-sans antialiased">
        <Header />
        {/* flex-1: main takes all free space, so the footer stays at the bottom */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
