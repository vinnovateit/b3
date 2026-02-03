import CardsRow from "./components/CardsRow";
import FAQ from "./components/FAQ";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import Footer from "./components/footer/footer";
import Loader from "./components/Loader";

// src/app/page.js
'use client';

import { useEffect, useState } from 'react';
import Loader from './components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <main>
      {/* your existing home page content */}
    </main>
  );
}


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