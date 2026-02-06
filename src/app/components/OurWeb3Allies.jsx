"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function OurWeb3Allies() {
	return (
		<div className="w-full min-h-screen bg-[#040704] relative overflow-hidden flex flex-col">
			<div
				className="absolute -top-62.5 left-1/2 -translate-x-1/2 w-350 h-175 pointer-events-none z-0"
				style={{
					background:
						"radial-gradient(ellipse at center top, rgba(5, 124, 53, 0.45) 0%, rgba(34, 82, 44, 0.3) 30%, rgba(34, 82, 44, 0.15) 50%, transparent 70%)",
					filter: "blur(60px)",
				}}
			/>

			{/* Background Gradient 2 */}
			<div
				className="absolute top-0 left-0 w-full h-75 pointer-events-none z-0"
				style={{
					background:
						"radial-gradient(circle at 50% 0%, rgba(14, 179, 79, 0.25) 0%, rgba(14, 179, 79, 0.05) 40%, transparent 70%)",
					filter: "blur(50px)",
					opacity: 1,
				}}
			/>

			{/* TITLE - Changed to RELATIVE to fix gap issue, and Normal Font */}
			<div className="w-full mt-6 md:mt-9 text-[40px] md:text-[70px] leading-[100%] text-center bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent font-sans font-normal z-10 select-none relative">
				Our Web 3 Allies
			</div>
			<div className="mt-12 md:mt-16 mb-12 md:mb-16"></div>
			<div className="flex flex-col items-center w-full px-4">
				<motion.div
					className="w-full max-w-2xl relative z-2 p-6 md:p-14 rounded-3xl border border-white/20 transform transition-transform duration-1000 ease-out"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					viewport={{ once: true, amount: 0.3 }}
					style={{
						background: "rgba(255, 255, 255, 0.03)",
						backdropFilter: "blur(24px)",
						WebkitBackdropFilter: "blur(24px)",
						boxShadow: `
                0 8px 32px 0 rgba(0, 0, 0, 0.4),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
					}}
				>
					{/* Attached ambients */}
					<div
						className="absolute -top-30 -left-35 w-70 h-70 pointer-events-none opacity-60"
						style={{
							background:
								"radial-gradient(circle at center, rgba(120, 255, 200, 0.85) 0%, rgba(120, 255, 200, 0.45) 35%, rgba(120, 255, 200, 0.2) 55%, transparent 75%)",
							filter: "blur(45px)",
						}}
					></div>

					{/* Glass content */}
					<h2
						className="text-[clamp(2rem,5vw,4rem)] mb-2 text-center bg-clip-text text-transparent"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Qamar Rizwani
					</h2>
					<p
						className="text-[clamp(0.875rem,2vw,1.125rem)] mb-6 text-center bg-clip-text text-transparent"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Engineer | Educator | Web3 Strategist
					</p>

					{/* Image section */}
					<motion.div
						className="mb-8 flex justify-center"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
						viewport={{ once: true, amount: 0.3 }}
					>
						<Image
							src="/backgrounds/qr.jpeg"
							alt="Qamar Rizwani"
							width={256}
							height={256}
							className="w-64 h-64 rounded-2xl  border border-white/20 flex items-center justify-center"
						/>
					</motion.div>

					<p
						className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto mb-4 text-center bg-clip-text text-transparent"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						A nationally recognised educator and Web3 leader, Qamar began his
						journey as a Quality Control Engineer in the UAE before pivoting
						into teaching and the blockchain space. Today, he has supported 50+
						Web3 projects and actively contributes as IR at Kommunitas and
						Ambassador at PancakeSwap & ApeX Protocol. Known for breaking down
						complex topics like Blockchain, DeFi, and Bitcoin into simple,
						actionable insights, Qamar is a sought-after speaker across India,
						inspiring builders to learn, build, and grow in Web3.
						<div className="my-6"></div>
						<p className="italic">
							"Focus on learning first, remain curious, and be patient. The
							opportunities will follow in time." - Qamar Rizwani
						</p>
					</p>
				</motion.div>
				<div className="mt-12 md:mt-16 mb-12 md:mb-16"></div>
				<motion.div
					className="w-full max-w-2xl relative z-2 p-6 md:p-14 rounded-3xl border border-white/20 transform transition-transform duration-1000 ease-out"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					viewport={{ once: true, amount: 0.3 }}
					style={{
						background: "rgba(255, 255, 255, 0.03)",
						backdropFilter: "blur(24px)",
						WebkitBackdropFilter: "blur(24px)",
						boxShadow: `
                0 8px 32px 0 rgba(0, 0, 0, 0.4),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
					}}
				>
					{/* Attached ambients */}
					<div
						className="absolute -top-30 -left-35 w-70 h-70 pointer-events-none opacity-60"
						style={{
							background:
								"radial-gradient(circle at center, rgba(120, 255, 200, 0.85) 0%, rgba(120, 255, 200, 0.45) 35%, rgba(120, 255, 200, 0.2) 55%, transparent 75%)",
							filter: "blur(45px)",
						}}
					></div>

					{/* Glass content */}
					<h2
						className="text-[clamp(2rem,5vw,4rem)] mb-2 text-center bg-clip-text text-transparent"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						gen.xyz
					</h2>
					<p
						className="text-[clamp(0.875rem,2vw,1.125rem)] mb-6 text-center bg-clip-text text-transparent"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						The Domain for the Next Generation of Builders
					</p>

					{/* Image section */}
					<motion.div
						className="mb-8 flex justify-center"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
						viewport={{ once: true, amount: 0.3 }}
					>
						<Image
							src="/svgs/xyz-white-logo.svg"
							alt="gen.xyz logo"
							width={256}
							height={256}
							className="w-64 h-64 rounded-2xl  border border-white/20 flex items-center justify-center"
						/>
					</motion.div>

					<p
						className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto mb-4 text-center bg-clip-text text-transparent"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						gen.xyz is a next-generation domain platform powering innovators
						across Web3, AI, startups, and the creator economy. Trusted by
						millions worldwide, .xyz domains have become the go-to choice for
						launching bold ideas and future-first projects on the internet. As
						the Sponsor of B, gen.xyz fuels innovation at the intersection of
						Web2 × Web3, empowering students and developers to build, brand, and
						ship without limits.
					</p>
				</motion.div>
				{/* Add space below gen.xyz sponsor */}
				<div className="mb-16 md:mb-24"></div>
				{/* Inverted green glow to match Timeline top - ellipse (large) */}
				<div
					className="absolute -bottom-62.5 left-1/2 -translate-x-1/2 w-350 h-175 pointer-events-none z-0"
					style={{
						background:
							"radial-gradient(ellipse at center bottom, rgba(5, 124, 53, 0.45) 0%, rgba(34, 82, 44, 0.3) 30%, rgba(34, 82, 44, 0.15) 50%, transparent 70%)",
						filter: "blur(60px)",
					}}
				/>
				{/* Inverted green glow to match Timeline top - soft circle */}
				<div
					className="absolute bottom-0 left-0 w-full h-75 pointer-events-none z-0"
					style={{
						background:
							"radial-gradient(circle at 50% 100%, rgba(14, 179, 79, 0.25) 0%, rgba(14, 179, 79, 0.05) 40%, transparent 70%)",
						filter: "blur(50px)",
						opacity: 1,
					}}
				/>
			</div>
		</div>
	);
}
