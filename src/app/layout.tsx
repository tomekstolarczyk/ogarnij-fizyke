import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
      className={`${inter.variable} ${jetbrainsMono.variable} scheme-dark`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
