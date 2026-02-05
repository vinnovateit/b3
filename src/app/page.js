import CardsRow from "./components/CardsRow";
import FAQ from "./components/FAQ";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import Footer from "./components/Footer";
import SmoothScroller from "./components/SmoothScroller";

export default function Home() {
	return (
		<main className="bg-[#040704]">
			<SmoothScroller/>
			<Navbar />

			{/* Home Section */}
			<section id="home">
				<Hero />
			</section>

			{/* About Section */}
			<section id="about">
				<WhoAreWe />
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
