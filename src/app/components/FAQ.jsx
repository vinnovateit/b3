"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "../globals.css";

const FAQ_DATA = {
	"General FAQS": [
		{
			q: "What is a hackathon?",
			a: "A hackathon is a social coding event where programmers collaborate to build projects.",
		},
		{
			q: "What happens at a hackathon?",
			a: "Participants form teams and build a working prototype within a set time limit.",
		},
		{
			q: "Do I need to know how to code?",
			a: "Not necessarily! Teams also need designers and project managers.",
		},
		{
			q: "Do I need to have a team?",
			a: "No, you can join solo and find a team during our team-building sessions.",
		},
		{
			q: "Who organizes B³?",
			a: "B³ is organized by a dedicated team of student developers.",
		},
	],
	"B³ FAQS": [
		{
			q: "What is the theme of B³?",
			a: "The theme focuses on innovation in blockchain and sustainable technology.",
		},
		{
			q: "What is the format of the B³?",
			a: "It is a 36-hour intensive hybrid hackathon.",
		},
		{
			q: "Can I join physically?",
			a: "Yes, we have a physical venue for local participants.",
		},
		{
			q: "What is the schedule?",
			a: "The full schedule will be emailed to registered participants.",
		},
		{
			q: "Is there a prize pool?",
			a: "Yes, there are major prizes for top teams and specific track winners.",
		},
	],
	"Blockchain FAQS": [
		{
			q: "What should I bring?",
			a: "Bring your laptop, chargers, a valid ID, and your passion!",
		},
		{
			q: "I don't have a team!",
			a: "We'll have a team-matching session at the start of the event.",
		},
		{
			q: "I don't have any ideas!",
			a: "We provide mentorship and brainstorming workshops to help.",
		},
	],
	"Sign up FAQS": [
		{
			q: "Where can I register?",
			a: "You can register through the 'Register Now' button on our page.",
		},
		{
			q: "When is the deadline?",
			a: "Registration closes one week before the event starts.",
		},
		{
			q: "Do I need to be a student?",
			a: "Yes, but we also allow recent graduates and hobbyists.",
		},
	],
};

const sweepVariants = {
	enter: (direction) => ({
		x: direction > 0 ? "100%" : "-100%",
		opacity: 0,
	}),
	center: {
		x: 0,
		opacity: 1,
	},
	exit: (direction) => ({
		x: direction < 0 ? "100%" : "-100%",
		opacity: 0,
	}),
};

const FAQ = () => {
	const categories = Object.keys(FAQ_DATA);
	const [[page, direction], setPage] = useState([0, 0]);
	const [openIndex, setOpenIndex] = useState(null);

	const activeTab = categories[page];

	const paginate = (newPageIndex) => {
		const newDirection = newPageIndex > page ? 1 : -1;
		setOpenIndex(null);
		setPage([newPageIndex, newDirection]);
	};

	return (
		<div className="relative min-h-screen w-full bg-[#040704] text-white flex flex-col items-center justify-start md:justify-center font-sans p-4 md:p-8 overflow-hidden">
			{/* 1. TOP CENTER GLOW */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] pointer-events-none z-0"
				style={{
					background:
						"radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
					filter: "blur(80px)",
				}}
			/>

			<h1 className="relative z-10 text-4xl md:text-7xl font-sans tracking-[0.2em] mt-12 mb-8 md:mb-12 text-gray-100 uppercase">
				FAQs
			</h1>

			{/* Main Container */}
			<div className="relative z-10 w-full max-w-6xl bg-[#0d0d0d]/80 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden mb-12">
				{/* Navigation Tabs */}
				<div className="relative flex border-b border-white/5 bg-black/40 p-2 overflow-hidden">
					{categories.map((tab, index) => (
						<button
							key={tab}
							onClick={() => paginate(index)}
							className={`relative flex-1 py-4 md:py-6 text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-500 z-10 outline-none ${
								page === index
									? "text-white"
									: "text-gray-500 hover:text-gray-400"
							}`}
						>
							<span className="relative z-20">
								{tab === "BPT FAQS" ? <span>B³ FAQS</span> : tab}
							</span>

							{page === index && (
								<motion.div
									layoutId="activeTabSlider"
									className="absolute inset-x-1 inset-y-1 bg-white/[0.08] border border-white/10"
									style={{
										borderRadius: "12px",
										clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
									}}
									transition={{
										type: "spring",
										stiffness: 280,
										damping: 28,
										mass: 0.5,
									}}
								/>
							)}
						</button>
					))}
				</div>

				{/* FAQ Content Area */}
				<div className="relative p-4 md:p-12 min-h-[500px] overflow-hidden">
					{/* --- MASSIVE CONE SHAPED GREEN LIGHT BEAM --- */}
					{/* Primary Beam */}
					<div
						className="absolute -bottom-[20%] -right-[15%] w-[1000px] h-[1000px] pointer-events-none z-0 opacity-60"
						style={{
							background:
								"conic-gradient(from 190deg at 50% 50%, transparent 0deg, rgba(34, 197, 94, 0.4) 40deg, transparent 90deg)",
							filter: "blur(120px)",
							transform: "rotate(-10deg)",
						}}
					/>

					{/* Secondary Soft Glow to increase "Bigness" */}
					<div
						className="absolute -bottom-[10%] -right-[5%] w-[600px] h-[600px] pointer-events-none z-0 opacity-30"
						style={{
							background:
								"radial-gradient(circle at center, rgba(34, 197, 94, 0.5) 0%, transparent 70%)",
							filter: "blur(100px)",
						}}
					/>

					<AnimatePresence initial={false} custom={direction} mode="popLayout">
						<motion.div
							key={page}
							custom={direction}
							variants={sweepVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: "spring", stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
							}}
							className="relative z-10 w-full"
						>
							<div className="space-y-3 md:space-y-4">
								{FAQ_DATA[activeTab].map((item, index) => (
									<div key={index} className="w-full">
										<button
											onClick={() =>
												setOpenIndex(openIndex === index ? null : index)
											}
											className="w-full flex items-center justify-between p-4 md:p-7 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl md:rounded-2xl transition-all border border-white/5 group text-left"
										>
											<span className="text-base md:text-2xl font-light text-gray-300 group-hover:text-white transition-colors pr-4">
												{item.q}
											</span>
											<div
												className={`flex-shrink-0 p-1.5 md:p-2 rounded-lg md:rounded-xl transition-all duration-300 ${
													openIndex === index
														? "rotate-180 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
														: "bg-white/10"
												}`}
											>
												<ChevronDown
													size={18}
													className="md:w-6 md:h-6 text-white"
												/>
											</div>
										</button>

										<AnimatePresence>
											{openIndex === index && (
												<motion.div
													initial={{
														height: 0,
														opacity: 0,
														scale: 0.94,
														transformOrigin: "top",
													}}
													animate={{ height: "auto", opacity: 1, scale: 1 }}
													exit={{ height: 0, opacity: 0, scale: 0.94 }}
													transition={{
														height: {
															duration: 0.45,
															ease: [0.04, 0.62, 0.23, 0.98],
														},
														opacity: { duration: 0.25 },
														scale: { duration: 0.35, ease: "easeOut" },
													}}
													className="overflow-hidden"
												>
													<div className="px-4 md:px-8 py-4 text-xs md:text-lg text-gray-400 leading-relaxed border-l-2 border-green-500/40 ml-4 md:ml-6 mt-2">
														{item.a}
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default FAQ;
