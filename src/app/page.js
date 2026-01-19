import Image from "next/image";
import CardsRow from "@/Components/CardsRow";
import FAQ from "@/Components/FAQ";
import Card from "@/Components/Card";
export default function Home() {
  return (
    <>
  
 <main className="bg-[#040704]"> 
      {/* CardsRow Section */}
      <section className="relative overflow-hidden">
        <CardsRow />
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden border-t border-white/5">
        <FAQ />
      </section>
    </main>
    </>
  );
}
