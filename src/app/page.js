import Image from "next/image";
import CardsRow from "@/Components/CardsRow";
import FAQ from "@/Components/FAQ";

export default function Home() {
  return (
    <main className="bg-[#040704]"> 
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
      </section>
    </main>
  );
}