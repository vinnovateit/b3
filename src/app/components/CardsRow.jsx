"use client";

import { useState, useRef, useEffect } from "react";
import Card from "./Card";

export default function CardsRow() {
	const cards = [
		{
			index: 1,
			title: "Event Check in",
			date: "8 Feb",
			time: "8:00 AM",
			description: "Teams arrive, Verify registration, Assign team IDs",
			image: "/images/image1.png",
		},
		{
			index: 2,
			title: "Introduction",
			date: "8 Feb",
			time: "9:00 AM",
			description:
				"Yantra Introduction,Why Web2 → Web3 matters,Submission format explained.",
			image: "/images/image2.png",
		},
		{
			index: 3,
			title: "Teams Start Their Work",
			date: "8 Feb",
			time: "9:30 AM",
			description: "",
			image: "/images/image3.png",
		},
		{
			index: 4,
			title: "Lunch",
			date: "8 Feb",
			time: "1:00 PM",
			description: "",
			image: "/images/image4.png",
		},
		{
			index: 5,
			title: "Core Development Phase",
			date: "8 Feb",
			time: "1:00 PM",
			description: "",
			image: "/images/image5.png",
		},
		{
			index: 6,
			title: "Review 1",
			date: "8 Feb",
			time: "5:00 PM",
			description: "Ideation Check",
			image: "/images/image6.png",
		},
		{
			index: 7,
			title: "Dinner Break",
			date: "8 Feb",
			time: "7:00 PM",
			description: "",
			image: "/images/image7.png",
		},
		{
			index: 8,
			title: "Night Build Sprint",
			date: "8 Feb",
			time: "9:00 PM",
			description: "",
			image: "/images/image8.png",
		},
		{
			index: 9,
			title: "Games",
			date: "8 Feb",
			time: "12:00 AM",
			description: "Jamming, Coffee Pong/Mini Games",
			image: "/images/image9.png",
		},
		{
			index: 10,
			title: "Review 2",
			date: "9 Feb",
			time: "3:00 AM",
			description: "Design Check + Tech Implementation",
			image: "/images/image10.png",
		},
		{ index: null, text: "End of Day 1...", isEnd: true },
		{
			index: 11,
			title: "Students get back to venue",
			date: "9 Feb",
			time: "8:00 AM",
			description: "",
			image: "/images/image11.png",
		},
		{
			index: 12,
			title: "Alumni Speaker",
			date: "9 Feb",
			time: "11:00 AM",
			description: "",
			image: "/images/image12.png",
		},
		{
			index: 13,
			title: "Lunch Break",
			date: "9 Feb",
			time: "1:00 PM",
			description: "",
			image: "/images/image13.png",
		},
		{
			index: 14,
			title: "Final Review",
			date: "9 Feb",
			time: "2:30 PM",
			description: "",
			image: "/images/image14.png",
		},
		{
			index: 15,
			title: "Winners Announced",
			date: "9 Feb",
			time: "5:30 PM",
			description: "",
			image: "/images/image15.png",
		},
		{
			index: 16,
			title: "Pack-up",
			date: "9 Feb",
			time: "6:30 PM",
			description: "",
			image: "/images/image16.png",
		},
		{ index: null, text: "End of Day 2...", isEnd: true },
	];

	const [activeIndex, setActiveIndex] = useState(0);
	const [spotlightX, setSpotlightX] = useState(0);
	const scrollContainerRef = useRef(null);
	const cardRefs = useRef([]);
	const isAutoScrolling = useRef(false);

	useEffect(() => {
		const handleScroll = () => {
			if (!scrollContainerRef.current) return;

			const container = scrollContainerRef.current;
			const rect = container.getBoundingClientRect();
			const viewportCenter = rect.left + rect.width / 2;

			let closestIndex = 0;
			let minDistance = Infinity;

			cardRefs.current.forEach((card, index) => {
				if (card) {
					const rect = card.getBoundingClientRect();
					const cardCenter = rect.left + rect.width / 2;
					const distance = Math.abs(cardCenter - viewportCenter);

					if (distance < minDistance) {
						minDistance = distance;
						closestIndex = index;
					}
				}
			});
			if (!isAutoScrolling.current) {
				setActiveIndex(closestIndex);
			}

			const activeCard = cardRefs.current[closestIndex];
			if (activeCard) {
				const rect = activeCard.getBoundingClientRect();
				setSpotlightX(rect.left + rect.width / 2);
			}
		};

		const container = scrollContainerRef.current;
		if (!container) return;
		container.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleScroll);
		handleScroll();

		return () => {
			container.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	const scrollToIndex = (index) => {
		if (index < 0 || index >= cards.length) return;

		const targetCard = cardRefs.current[index];
		const container = scrollContainerRef.current;
		if (!targetCard || !container) return;

		isAutoScrolling.current = true;

		container.style.scrollSnapType = "none";

		targetCard.scrollIntoView({
			behavior: "smooth",
			inline: "center",
			block: "nearest",
		});

		setTimeout(() => {
			container.style.scrollSnapType = "";
			isAutoScrolling.current = false;
			setActiveIndex(index);
		}, 350);
	};

	return (
		<div className="w-full min-h-screen bg-[#040704] relative overflow-hidden flex flex-col">
			{/* Inverted gradient matching WhoAreWe bottom */}
			<div
				className="absolute -top-62.5 left-1/2 -translate-x-1/2 w-350 h-175 pointer-events-none z-0"
				style={{
					background:
						"radial-gradient(ellipse at center top, rgba(5, 124, 53, 0.45) 0%, rgba(34, 82, 44, 0.3) 30%, rgba(34, 82, 44, 0.15) 50%, transparent 70%)",
					filter: "blur(60px)",
				}}
			/>

			{/* PERSISTENT TOP GLOW */}
			<div
				className="absolute top-0 left-0 w-full h-75 pointer-events-none z-0"
				style={{
					background:
						"radial-gradient(circle at 50% 0%, rgba(14, 179, 79, 0.25) 0%, rgba(14, 179, 79, 0.05) 40%, transparent 70%)",
					filter: "blur(50px)",
					opacity: 1,
				}}
			/>

			<div className="w-full absolute top-6 md:top-9 left-0 text-[40px] md:text-[70px] leading-[100%] text-center bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent font-sans font-bold z-10 select-none">
				Timeline
			</div>

			<div className="flex flex-col items-start justify-center grow pt-30 md:pt-50 relative z-10 overflow-visible">
				{/* Original Left Alignment maintained */}
				<div className="px-6 md:pl-20 text-[24px] md:text-[48px] font-sans text-white mb-4 md:mb-8 transition-all duration-500">
					{activeIndex <= 10
						? "Day 1 - Build & Break In"
						: "Day 2 - Stabilise & Ship"}
				</div>

				<div
					ref={scrollContainerRef}
					className="relative overflow-x-auto overflow-y-visible w-full snap-mandatory snap-x no-scrollbar px-[10vw] md:px-[40vw]"
					style={{ scrollbarWidth: "none" }}
				>
					<div className="flex w-max gap-6 md:gap-16 pb-32 pt-10 overflow-visible">
						{cards.map((card, i) => {
							const isActive = activeIndex === i;
							return (
								<div
									key={i}
									ref={(el) => (cardRefs.current[i] = el)}
									className="shrink-0 snap-center overflow-visible"
								>
									<div
										className={`relative z-10 transition-all duration-700 ease-out will-change-transform
                    ${isActive ? "opacity-100 z-20" : "opacity-40 blur-[0.5px] md:blur-[1px] z-0"}`}
									>
										<Card
											isActive={isActive}
											index={card.index || (isActive ? "" : "End")}
											data={card}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Centered solid neon green bar aligned with move buttons */}
			{/* Solid neon bar centered and slightly raised with subtle shadow glow */}
			<div
				className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
				style={{ bottom: "44px", zIndex: 13 }}
			>
				<div
					style={{
						width: "420px",
						height: "6px",
						margin: "0 auto",
						borderRadius: "6px",
						background: "linear-gradient(90deg,#9effa6,#00ff66)",
						boxShadow:
							"0 6px 20px rgba(0,255,102,0.9), 0 0 36px rgba(0,255,102,0.25)",
					}}
				/>
			</div>

			<div className="absolute bottom-6 right-6 md:bottom-8 md:right-12 z-50">
				<div
					className="w-30 md:w-42.5 h-12.5 md:h-17.5 rounded-[18px] md:rounded-3xl flex items-center justify-between relative group hover:brightness-125 transition-all duration-300 shadow-2xl overflow-hidden p-0.5"
					style={{
						background:
							"linear-gradient(116.6deg, #8CFF84 0%, #0EB337 26.9%, #42D774 78.62%, #85FFB0 99.92%)",
					}}
				>
					<div
						className="w-full h-full rounded-2xl md:rounded-[22px] flex items-center justify-between relative"
						style={{
							background:
								"radial-gradient(60.5% 60.5% at 50% 50%, #19954B 59.15%, #0CAC4F 86.65%)",
						}}
					>
						<button
							className="w-1/2 h-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
							onClick={() => scrollToIndex(activeIndex - 1)}
						>
							<svg
								className="w-5 h-5 md:w-6 md:h-6"
								viewBox="0 0 24 24"
								fill="#FFFFFF"
							>
								<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
							</svg>
						</button>
						<div className="w-px h-6.25 md:h-10 bg-white opacity-20" />
						<button
							className="w-1/2 h-full flex items-center justify-center hover:bg-white/20 transition-all z-10"
							onClick={() => scrollToIndex(activeIndex + 1)}
						>
							<svg
								className="w-5 h-5 md:w-6 md:h-6"
								viewBox="0 0 24 24"
								fill="#FFFFFF"
							>
								<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			<style jsx global>{`
				.no-scrollbar::-webkit-scrollbar {
					display: none;
				}
				.no-scrollbar {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</div>
	);
}
