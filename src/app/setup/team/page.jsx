"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { Plus, Link2 } from "lucide-react";
import SetupLayout from "@/app/components/SetupLayout";
import Button from "@/app/components/CustomButton";

const TeamOptionCard = ({ icon: Icon, title, description, selected, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={`
				cursor-pointer
				w-full md:w-72 h-72
				flex flex-col items-center justify-center gap-6
				bg-[#1a3a1a]/60 hover:bg-[#1a3a1a]/80
				backdrop-blur-md
				border-2 transition-all duration-300
				rounded-2xl p-8 text-center
				${selected ? 'border-green-400 bg-[#1a3a1a]/80' : 'border-white/20 hover:border-white/40'}
			`}
		>
			<div className={`
				w-16 h-16 rounded-full flex items-center justify-center
				${selected ? 'bg-green-400' : 'bg-white'}
				transition-colors duration-300
			`}>
				<Icon className={`w-8 h-8 ${selected ? 'text-black' : 'text-black'}`} />
			</div>
			
			<h3 className="text-2xl font-bold text-white">{title}</h3>
			
			<p className="text-gray-300 text-base leading-relaxed">
				{description}
			</p>
		</div>
	);
};

export default function TeamPage() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const containerRef = useRef(null);
	const stripRef = useRef(null);
	const [selectedOption, setSelectedOption] = useState(null); // 'create' or 'join'
	const [isCheckingTeam, setIsCheckingTeam] = useState(true);

	// Redirect if not authenticated
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	// Check if user already has a team
	useEffect(() => {
		const checkTeam = async () => {
			if (status !== "authenticated") return;

			try {
				const response = await fetch("/api/users/profile");
				const data = await response.json();

				if (response.ok && data.vitStudent?.teamId) {
					// User already has a team, redirect to dashboard
					router.push("/dashboard");
				} else {
					setIsCheckingTeam(false);
				}
			} catch (error) {
				console.error("Error checking team status:", error);
				setIsCheckingTeam(false);
			}
		};

		checkTeam();
	}, [status, router]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".gsap-entry", {
				y: 50,
				opacity: 0,
				duration: 1,
				stagger: 0.15,
				ease: "power3.out",
				delay: 0.2,
			});

			gsap.from(".team-card", {
				y: 30,
				opacity: 0,
				duration: 0.8,
				stagger: 0.2,
				ease: "power3.out",
				delay: 0.4,
			});

			if (stripRef.current) {
				gsap.to(stripRef.current, {
					yPercent: -66.66,
					duration: 2.5,
					ease: "power3.inOut",
					delay: 0.5,
				});
			}
		}, containerRef);
		return () => ctx.revert();
	}, []);

	const handleNextStep = () => {
		if (selectedOption === 'create') {
			router.push('/setup/create');
		} else if (selectedOption === 'join') {
			router.push('/setup/join');
		}
	};

	if (status === "loading" || isCheckingTeam) {
		return (
			<SetupLayout>
				<div className="flex items-center justify-center h-full">
					<div className="text-white text-xl">Loading...</div>
				</div>
			</SetupLayout>
		);
	}

	return (
		<SetupLayout>
			<div ref={containerRef} className="flex flex-col h-full">
				
				{/* Header */}
				<div className="h-[30vh] flex flex-col justify-end pb-10">
					<div className="gsap-entry flex items-end">
						<h1 className="text-7.5xl font-bold text-white leading-none" style={{ fontSize: "5.5rem" }}>
							B
						</h1>
						
						<div className="h-[48px] w-[32px] overflow-hidden relative mb-[30px] ml-1">
							<div ref={stripRef} className="flex flex-col text-5xl font-bold text-white leading-[48px]">
								<span>1</span>
								<span>2</span>
								<span>3</span>
							</div>
						</div>
					</div>
					<div className="gsap-entry">
						<p className="text-4xl text-gray-300 mt-4 font-light">Let's set things up</p>
					</div>
				</div>

				{/* Team Options */}
				<div className="flex-1 flex flex-col items-start pt-10 relative z-20">
					<div className="flex flex-col md:flex-row gap-6 mb-8">
						<div className="team-card">
							<TeamOptionCard
								icon={Plus}
								title="Create a team"
								description="Start a new team and invite your friends to join the hackathon adventure"
								selected={selectedOption === 'create'}
								onClick={() => setSelectedOption('create')}
							/>
						</div>
						
						<div className="team-card">
							<TeamOptionCard
								icon={Link2}
								title="Join a team"
								description="Already have a team code? Join your friends and star building together"
								selected={selectedOption === 'join'}
								onClick={() => setSelectedOption('join')}
							/>
						</div>
					</div>

					{/* Discord Invite Banner */}
					<div className="w-full max-w-2xl">
						<div
							className="flex items-center justify-between gap-6 rounded-xl p-5 border border-white/10"
							style={{
								background: 'linear-gradient(90deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
							}}
						>
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
									<svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
										<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
									</svg>
								</div>
								<div className="flex-1">
									<h4 className="text-white font-semibold text-base">Looking for teammates?</h4>
									<p className="text-gray-400 text-sm mt-0.5">Join our Discord community to connect with other participants</p>
								</div>
							</div>
							<a
								href="https://discord.gg/TaFq4KDR"
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
							>
								Join Discord
							</a>
						</div>
					</div>
				</div>

				{/* Footer Button */}
				<div className="gsap-entry h-[20vh] flex items-start pt-6 relative z-10">
					<Button 
						size="lg" 
						text="Next Step" 
						onClick={handleNextStep}
						disabled={!selectedOption}
					/>
				</div>

			</div>
		</SetupLayout>
	);
}
