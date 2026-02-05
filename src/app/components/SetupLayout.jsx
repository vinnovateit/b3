import Image from "next/image";

export default function SetupLayout({ children }) {
	return (
		<div className="relative w-screen h-screen px-15 m-0 font-[var(--font-satoshi)] color-white">
			{/* Background image */}
			<Image
				src="/backgrounds/setup-bg.png"
				alt="Setup background"
				fill
				priority
				className="object-cover z-0"
			/>
			{/* Page content above background */}
			<div className="relative z-10 w-full h-full">{children}</div>
		</div>
	);
}
