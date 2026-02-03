import Image from "next/image";
import WhoAreWe from "./components/WhoAreWe"; // Use ./ instead of ../ 
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <>
      <Hero/>
      <WhoAreWe />
    </>
  );
}