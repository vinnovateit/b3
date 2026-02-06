'use client';

import CardsRow from "./components/CardsRow";
import FAQ from "./components/FAQ";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import Footer from "./components/Footer";
import { useEffect, useState } from 'react';
import Loader from "./components/Loader";
import OurWeb3Allies from "./components/OurWeb3Allies";

export default function Home() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

	return (
		<main className="bg-[#040704]">
			<Navbar />

			{/* Home Section */}
			<section id="home">
				<Hero />
			</section>

			{/* About Section */}
			<section id="about">
				<WhoAreWe />
			</section>

			<section id="allies">
			<OurWeb3Allies/>
			</section>

			{/* Timeline Section */}
			<section id="timeline" className="relative overflow-visible">
				<CardsRow />
			</section>

			{/* FAQ Section */}
			<section
				id="faq"
				className="relative overflow-hidden bg-[#040704] z-10"
				style={{ marginTop: "-10px" }}
			>
				<FAQ />
				<Footer />
			</section>
		</main>
  );
}
