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
		<div className="bg-[#040704] text-white overflow-hidden h-screen w-screen flex flex-col">
			<div
				id="footer-trigger"
				ref={triggerRef}
				className="relative flex-1 flex flex-col min-h-0"
			>
				{/* UPPER STAGE (Animation Area) */}
				<div className="relative w-full flex-1 flex justify-center items-end pointer-events-none">
					<div className="absolute w-full h-full bottom-0 z-10 flex justify-center">
						{/* GLOW BACKGROUND */}
						<div className="absolute bottom-0 left-0 w-full h-[100%] overflow-hidden z-0">
							<div
								id="anim-glow"
								className={`w-full h-full origin-bottom ${styles.opacity0Start}`}
							>
								<div
									className="absolute left-1/2 -translate-x-1/2 bottom-[-300px] md:bottom-[-450px]
                                w-[600px] md:w-[1200px] h-[600px] md:h-[900px]
                                bg-[radial-gradient(circle,rgba(12,144,67,0.15)_0%,transparent_70%)]
                                blur-[60px] md:blur-[80px]"
								></div>
								<div
									className="absolute left-1/2 -translate-x-1/2 bottom-[-200px] md:bottom-[-350px]
                                w-[400px] md:w-[700px] h-[400px] md:h-[700px]
                                bg-[radial-gradient(closest-side,rgba(46,189,107,0.4)_0%,rgba(12,144,67,0.05)_60%,transparent_100%)]
                                blur-[40px] md:blur-[50px]"
								></div>
								<div
									className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] md:bottom-[-200px]
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
									d="M0 450 H375 L425 600 H1015 L1065 450 H1440"
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
									d="M0 300 H20 L50 400 H340 L370 300 H390"
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
							className={`${styles.bearStart} absolute left-1/2 bottom-[-20vh] md:bottom-[-15vh] w-[170vw] md:w-[30vw] h-[120vh] md:h-[50vh] z-10 origin-bottom`}
						>
							<img
								src="/svgs/bear-shape.svg"
								className={`${styles.preventSelect} absolute inset-0 w-full h-full opacity-20 z-0`}
								alt="Bear Shape"
							/>

							<div className="absolute inset-0 z-30 flex flex-col justify-center items-center pt-[5vh]">
								<div
									id="anim-text"
									className={`${styles.opacity0Start} flex flex-col items-center`}
								>
									<h1 className="text-[10vh] md:text-[14vh] font-light leading-none tracking-tighter drop-shadow-2xl">
										<span className="bg-gradient-to-b from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
											B
										</span>
										<sup className={`text-white ${styles.supAdjust}`}>3</sup>
									</h1>
									<p className="mt-[1vh] text-[#A1A1AA] tracking-[0.2em] text-[1.5em] md:text-[1.5vh] uppercase font-medium drop-shadow-md">
										Block. Build. Break.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ACTUAL FOOTER CONTENT */}
				<footer className="relative z-30 bg-[#040704] pb-[4vh] pt-[7vh] px-[5vw] md:px-[8vw] pointer-events-auto flex-none">
					<div className="flex flex-col md:flex-row justify-between items-center gap-[3vh] md:gap-[4vw]">
						{/* Address */}
						<div
							id="footer-item-1"
							className={`${styles.opacity0Start} space-y-[4vh] w-full md:w-auto text-center md:text-left`}
						>
							<img
								src="/svgs/vinnovate-logo.svg"
								className="w-[25vw] md:w-[12vw] mx-auto md:mx-0"
								alt="Vinnovate"
							/>
							<div className="text-[#A1A1AA] text-[1.3vh] md:text-[1.6vh] leading-relaxed">
								<p>Vellore Institute of Technology,</p>
								<p>Vellore Campus</p>
								<p>Vellore, Tamil Nadu</p>
								<p>632014</p>
							</div>
						</div>

						{/* Socials & Button */}
						<div
							id="footer-item-2"
							className={`${styles.opacity0Start} flex flex-col items-center md:items-end gap-[4vh] md:gap-[5vh] w-full md:w-auto`}
						>
							<div className="flex gap-[8vw] md:gap-[3vw] justify-center">
								{/* Ensure you have these icons in public/svgs/ */}
								<a
									href="https://www.instagram.com/vinnovateit/?hl=en"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/svgs/instagram.svg"
										className={`w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
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
										className={`w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
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
										className={`w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
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
										className={`w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
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
										className={`w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 ${styles.hoverGreenFilter}`}
										alt="Facebook"
									/>
								</a>
							</div>
							<button className="bg-[#0C9043] text-white px-[10vw] py-[2vh] md:px-[4vw] md:py-[2.5vh] rounded-full text-[1.8vh] md:text-[2.2vh] font-light tracking-wide hover:shadow-[0_0_4vh_rgba(12,144,67,0.65)] transition transform active:scale-95">
								Let’s Connect →
							</button>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
