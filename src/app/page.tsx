import About from "@/components/About";
import Hero from "@/components/Hero";
import MapTeaser from "@/components/MapTeaser";
import Shortcuts from "@/components/Shortcuts";

export default function Home() {
  return (
    <>
      <Hero />
      <Shortcuts />
      <MapTeaser />
      <About />
    </>
  );
}
