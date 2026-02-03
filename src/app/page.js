import Image from "next/image";
import WhoAreWe from "./components/WhoAreWe"; // Use ./ instead of ../ 
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <WhoAreWe />
    </>
  );
}