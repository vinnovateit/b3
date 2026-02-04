"use client";

import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
	const triggerRef = useRef(null);

	useEffect(() => {
		const trigger = triggerRef.current;
		if (!trigger) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// 1. Draw Line
						const desktopLine = document.getElementById("line-desktop");
						const mobileLine = document.getElementById("line-mobile");

						if (desktopLine) {
							desktopLine.classList.remove(styles.opacity0Start);
							desktopLine.classList.add(styles.animateDrawLine);
						}
						if (mobileLine) {
							mobileLine.classList.remove(styles.opacity0Start);
							mobileLine.classList.add(styles.animateDrawLine);
						}

						// 2. Bear Rise (300ms delay)
						setTimeout(() => {
							const bear = document.getElementById("anim-bear");
							if (bear) {
								if (window.matchMedia("(min-width: 768px)").matches) {
									bear.classList.add(styles.animateBearPopDesktop);
								} else {
									bear.classList.add(styles.animateBearPopMobile);
								}
							}
						}, 300);

						// 3. Shockwave (600ms delay)
						setTimeout(() => {
							const glow = document.getElementById("anim-glow");
							if (glow) glow.classList.add(styles.animateShockwave);
						}, 600);

						// 4. Glitch Text (800ms delay)
						setTimeout(() => {
							const text = document.getElementById("anim-text");
							if (text) text.classList.add(styles.animateCyberGlitch);
						}, 800);

						// 5. Fade Up Footer (1000ms & 1200ms delay)
						setTimeout(() => {
							const item1 = document.getElementById("footer-item-1");
							if (item1) item1.classList.add(styles.animateFadeUp);
						}, 1000);

						setTimeout(() => {
							const item2 = document.getElementById("footer-item-2");
							if (item2) item2.classList.add(styles.animateFadeUp);
						}, 1200);

						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 },
		);

		observer.observe(trigger);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className="bg-[#040704] text-white overflow-hidden">
			<div id="footer-trigger" ref={triggerRef} className="relative">
				{/* UPPER STAGE */}
				<div className="relative w-full h-[400px] md:h-[600px] mt-auto flex justify-center items-end pointer-events-none">
					<div className="absolute w-full h-[600px] bottom-[0px] md:bottom-[-180px] z-10 flex justify-center">
						{/* GLOW BACKGROUND */}
						<div className="absolute top-[-250px] md:top-[-500px] left-0 w-full h-[800px] overflow-hidden z-0">
							<div
								id="anim-glow"
								className={`w-full h-full origin-center ${styles.opacity0Start}`}
							>
								<div
									className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] md:bottom-[-100px]
                                w-[600px] md:w-[1200px] h-[600px] md:h-[900px]
                                bg-[radial-gradient(circle,rgba(12,144,67,0.15)_0%,transparent_70%)]
                                blur-[60px] md:blur-[80px]"
								></div>
								<div
									className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] md:bottom-[-150px]
                                w-[400px] md:w-[700px] h-[400px] md:h-[700px]
                                bg-[radial-gradient(closest-side,rgba(46,189,107,0.4)_0%,rgba(12,144,67,0.05)_60%,transparent_100%)]
                                blur-[40px] md:blur-[50px]"
								></div>
								<div
									className="absolute left-1/2 -translate-x-1/2 bottom-[20px] md:bottom-[-20px]
                                w-[250px] md:w-[400px] h-[250px] md:h-[400px]
                                bg-[radial-gradient(circle,rgba(46,189,107,0.2)_0%,transparent_70%)]
                                blur-[30px] md:blur-[40px]"
								></div>
							</div>
						</div>

						{/* SVG LINES (MASKED) */}
						<div className={`absolute inset-0 z-20 ${styles.trayFadeMask}`}>
							<svg
								className="hidden md:block w-full h-full"
								viewBox="0 0 1440 600"
								preserveAspectRatio="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									id="line-desktop"
									d="M0 150 H375 L425 300 H1015 L1065 150 H1440"
									fill="none"
									stroke="#0C9043"
									strokeWidth="1"
									vectorEffect="non-scaling-stroke"
									className={styles.opacity0Start}
									strokeDasharray="2000"
									strokeDashoffset="2000"
								/>
							</svg>
							<svg
								className="block md:hidden w-full h-full"
								viewBox="0 0 390 400"
								preserveAspectRatio="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									id="line-mobile"
									d="M0 150 H20 L50 300 H340 L370 150 H390"
									fill="none"
									stroke="#0C9043"
									strokeWidth="1.5"
									vectorEffect="non-scaling-stroke"
									className={styles.opacity0Start}
									strokeDasharray="1000"
									strokeDashoffset="1000"
								/>
							</svg>
						</div>

						{/* BEAR CONTAINER */}
						<div
							id="anim-bear"
							className={`${styles.bearStart} absolute left-1/2 bottom-[95px] md:bottom-[140px] w-[680px] h-[500px] z-10 origin-bottom`}
						>
							{/* Ensure you have the bear SVG in your public/svgs folder */}
							<img
								src="/svgs/bear-shape.svg"
								className={`${styles.preventSelect} absolute inset-0 w-full h-full opacity-20 z-0`}
								alt="Bear Shape"
							/>

							<div className="absolute inset-0 z-30 flex flex-col justify-center items-center pt-16">
								<div
									id="anim-text"
									className={`${styles.opacity0Start} flex flex-col items-center`}
								>
									<h1 className="text-[104px] font-light leading-none tracking-tighter drop-shadow-2xl">
										<span className="bg-gradient-to-b from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
											B
										</span>
										<sup className={`text-white ${styles.supAdjust}`}>3</sup>
									</h1>
									<p className="mt-4 text-[#A1A1AA] tracking-[0.2em] text-sm uppercase font-medium drop-shadow-md">
										Block. Build. Break.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ACTUAL FOOTER CONTENT */}
				<footer className="relative z-30 bg-[#040704] pb-12 pt-6 px-6 md:px-24 pointer-events-auto">
					<div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
						{/* Address */}
						<div
							id="footer-item-1"
							className={`${styles.opacity0Start} space-y-6 w-full md:w-auto text-center md:text-left`}
						>
							<img
								src="/svgs/vinnovate-logo.svg"
								className="w-32 md:w-44 mx-auto md:mx-0"
								alt="Vinnovate"
							/>
							<div className="text-[#A1A1AA] text-sm md:text-lg leading-relaxed">
								<p>Vellore Institute of Technology,</p>
								<p>Vellore Campus</p>
								<p>Vellore, Tamil Nadu</p>
								<p>632014</p>
							</div>
						</div>

						{/* Socials & Button */}
						<div
							id="footer-item-2"
							className={`${styles.opacity0Start} flex flex-col items-center md:items-end gap-8 md:gap-10 w-full md:w-auto`}
						>
							<div className="flex gap-8 justify-center">
								{/* Ensure you have these icons in public/svgs/ */}
								<a
									href="https://www.instagram.com/vinnovateit/?hl=en"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/svgs/instagram.svg"
										className={`w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
										alt="Instagram"
									/>
								</a>
								<a
									href="https://x.com/v_innovate_it?lang=en"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/svgs/twitter.svg"
										className={`w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
										alt="Twitter"
									/>
								</a>
								<a
									href="https://in.linkedin.com/company/v-innovate-it"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/svgs/linkedin.svg"
										className={`w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
										alt="LinkedIn"
									/>
								</a>
								<a
									href="https://github.com/vinnovateit"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/svgs/github.svg"
										className={`w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
										alt="Github"
									/>
								</a>
								<a
									href="https://www.facebook.com/VinnovateIT/"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/svgs/facebook.svg"
										className={`w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
										alt="Facebook"
									/>
								</a>
							</div>
							<button className="bg-[#0C9043] text-white px-10 py-3 md:px-14 md:py-4 rounded-full text-base md:text-lg font-light tracking-wide hover:shadow-[0_0_40px_rgba(12,144,67,0.65)] transition transform active:scale-95">
								Let’s Connect →
							</button>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
