import Image from "next/image";
import CardsRow from "@/Components/CardsRow";
import FAQ from "@/Components/FAQ";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import Footer from "@/Components/footer/footer";

export default function Home() {
  return (
    <main className="bg-[#040704]">
      <Navbar />
      <Hero />
      <WhoAreWe />
      {/* Timeline Section */}
      <section className="relative overflow-visible">
        <CardsRow />
      </section>

      {/* FAQ Section */}
      <section 
        className="relative overflow-hidden bg-[#040704] z-10" 
        style={{ marginTop: '-10px' }} // Small overlap to hide the seam
      >
      <FAQ />
      <Footer />
      </section>
    </main>
  );
}