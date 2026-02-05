"use client";
import Button from "../components/Button";

export default function LoginPage() {
	return (
		<div className="flex flex-col md:flex-row min-h-screen w-full">
			{/* Left: Gradient + Grid + Dots */}
			<div
				className="relative min-h-screen w-full md:w-[60vw] overflow-hidden hidden md:block"
				style={{
					background: "linear-gradient(0deg, #0CAC4F 0%, #040704 100%)",
				}}
			>
				{/* Grid lines - more lines, 7x7 glows */}
				<svg
					width="100%"
					height="100%"
					className="absolute inset-0"
					style={{ zIndex: 1 }}
				>
					{/* Draw more grid lines (17x17) */}
					{Array.from({ length: 17 }).map((_, i) => (
						<line
							key={`v-${i}`}
							x1={`${(i / 16) * 100}%`}
							y1="0%"
							x2={`${(i / 16) * 100}%`}
							y2="100%"
							stroke="#ffffff22"
							strokeWidth="1"
						/>
					))}
					{Array.from({ length: 17 }).map((_, i) => (
						<line
							key={`h-${i}`}
							y1={`${(i / 16) * 100}%`}
							x1="0%"
							y2={`${(i / 16) * 100}%`}
							x2="100%"
							stroke="#ffffff22"
							strokeWidth="1"
						/>
					))}
				</svg>
				{/* White radial glows at 5x5 grid intersections, reduced spread, higher intensity at top */}
				<div
					className="absolute inset-0 w-full h-full pointer-events-none"
					style={{ zIndex: 2 }}
				>
					{Array.from({ length: 5 }).map((_, i) =>
						Array.from({ length: 5 }).map((_, j) => {
							// Spread decreases as we go up (i from 0 at top to 4 at bottom)
							const maxSpread = 28; // px, at bottom
							const minSpread = 10; // px, at top
							const spread = minSpread + (maxSpread - minSpread) * (i / 4);
							// Intensity increases as we go up (i=0 top, i=4 bottom)
							const maxAlpha = 0.32; // at top
							const minAlpha = 0.1; // at bottom
							const alpha = maxAlpha - (maxAlpha - minAlpha) * (i / 4);
							return (
								<div
									key={`glow-${i}-${j}`}
									style={{
										position: "absolute",
										left: `calc(${(j / 4) * 100}% - ${spread / 2}px)`,
										top: `calc(${(i / 4) * 100}% - ${spread / 2}px)`,
										width: `${spread}px`,
										height: `${spread}px`,
										pointerEvents: "none",
										background: `radial-gradient(circle, rgba(255,255,255,${alpha}) 0%, rgba(255,255,255,${alpha * 0.5}) 60%, rgba(255,255,255,0.0) 100%)`,
										filter: `blur(${spread * 0.18}px)`,
									}}
								/>
							);
						}),
					)}
				</div>
			</div>

			{/* Right: Hero + Login UI */}
			<div className="w-full md:w-[40vw] h-screen bg-black flex flex-col">
				{/* Top 50vh: Hero text, top-left with padding */}
				<div className="flex flex-col items-start pt-16 pl-16 h-[50vh]">
					<h1
						className="text-[5rem] md:text-[4.5rem] font-bold bg-clip-text text-transparent text-left"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						B³
					</h1>
					<p
						className="text-2xl md:text-2xl font-semibold text-gray-200 mb-4 text-left"
						style={{
							background:
								"linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Block. Build. Break.
					</p>
				</div>
				{/* Bottom 50vh: Login UI */}
				<div className="flex flex-col justify-center h-[50vh] pl-16 gap-6">
					{/* 1. Registration notice */}
					<div
						className="flex items-center text-white px-6 py-2 w-fit text-sm"
						style={{
							background: "rgba(61, 122, 83, 0.37)",
							borderRadius: "37.2px",
						}}
					>
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 8v4m0 4h.01"
							/>
						</svg>
						Registration on VTOP is mandatory
					</div>
					{/* 2. Login info */}
					<div className="text-white text-xl font-medium text-left w-2/3 min-w-[180px]">
						Login with your VIT Email to access the dashboard
					</div>
					{/* 3. Google login button */}
					<Button
						className="bg-green-500 hover:bg-green-600 rounded-full flex items-center gap-2 px-4 py-2 text-base font-semibold shadow-lg min-w-[180px] max-w-[220px]"
						onClick={() => {
							/* Google login logic here */
						}}
					>
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="white">
							<path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.133-2.789-6.133-6.25s2.758-6.25 6.133-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.594-3.922-2.57-6.656-2.57-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.711 0-.656-.07-1.156-.156-1.531z" />
						</svg>
						<span className="whitespace-nowrap">Login with Google</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
