"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Copy } from "lucide-react";
import SetupLayout from "../../components/SetupLayout";
import Button from "../../components/Button";

// --- Custom Input ---
const CustomInput = ({ label, placeholder, value, onChange }) => {
    const lineRef = useRef(null);
    return (
        <div className="flex flex-col gap-3 w-full group relative">
            <label className="text-3xl font-bold text-white mb-2">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" })}
                onBlur={() => gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" })}
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-white/50 focus:outline-none transition-colors"
            />
            <div ref={lineRef} className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500 origin-left scale-x-0" />
        </div>
    );
};

// --- Glass Code Card Component ---
const CodeCard = ({ code }) => {
    return (
        <div 
            className="
                code-card-entry opacity-0 scale-95
                w-full md:w-[500px] h-[250px]
                flex flex-col justify-center items-center gap-6
                bg-[#617B5F]/30 backdrop-blur-md
                border border-white/20
                rounded-2xl
                text-center
            "
        >
            <p className="text-2xl text-white/90 font-light">Your Shareable Team Code</p>
            <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-white border-b-2 border-white pb-1">{code}</span>
                <button 
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="text-white/80 hover:text-white transition-colors"
                >
                    <Copy size={28} />
                </button>
            </div>
        </div>
    );
};

export default function CreateTeamPage() {
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    
    // State
    const [step, setStep] = useState(1); // 1 = Enter Name, 2 = Show Code
    const [teamName, setTeamName] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");

    // Initial Load Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gsap-entry", { y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 });
            if (stripRef.current) {
                gsap.to(stripRef.current, { yPercent: -66.66, duration: 2.5, ease: "power3.inOut", delay: 0.2 });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Step 2 Transition Handler
    useEffect(() => {
        if (step === 2) {
            const ctx = gsap.context(() => {
                gsap.fromTo(".code-card-entry", 
                    { opacity: 0, scale: 0.9, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [step]);

    const handleAction = () => {
        if (step === 1) {
            // Generate Code Logic
            if (!teamName) return; // Simple validation
            
            // Simulate API call / Code Generation
            const mockCode = "Uxhf8J"; // In real app, get this from backend
            setGeneratedCode(mockCode);

            // Animate Step 1 Out
            const ctx = gsap.context(() => {
                gsap.to(".step-1-content", {
                    opacity: 0,
                    x: -20,
                    duration: 0.4,
                    onComplete: () => setStep(2)
                });
            }, containerRef);

        } else {
            // End Setup Logic
            console.log("Setup Completed for team:", teamName, "Code:", generatedCode);
        }
    };

    return (
        <SetupLayout step={3}>
            <div ref={containerRef} className="flex flex-col h-full">
                
                {/* --- Header --- */}
                <div className="h-[30vh] flex flex-col justify-end pb-10">
                    <div className="gsap-entry flex items-end">
                        <h1 className="text-7.5xl font-bold text-white leading-none" style={{ fontSize: "5.5rem" }}>B</h1>
                        <div className="h-[48px] w-[32px] overflow-hidden relative mb-[30px] ml-1">
                            <div ref={stripRef} className="flex flex-col text-5xl font-bold text-white leading-[48px]">
                                <span>1</span><span>2</span><span>3</span>
                            </div>
                        </div>
                    </div>
                    <div className="gsap-entry">
                        <p className="text-4xl text-gray-300 mt-4 font-light">Let’s set things up</p>
                    </div>
                </div>

                {/* --- Content Area --- */}
                <div className="flex-1 flex flex-col pt-10 relative z-20">
                    
                    {/* Step 1: Input Name */}
                    {step === 1 && (
                        <div className="step-1-content w-full md:w-1/2">
                            <div className="gsap-entry">
                                <CustomInput 
                                    label="Enter a team name" 
                                    placeholder="Team Alpha" 
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Show Code Card */}
                    {step === 2 && (
                        <div className="w-full flex justify-start">
                            <CodeCard code={generatedCode} />
                        </div>
                    )}

                </div>

                {/* --- Footer --- */}
                <div className="gsap-entry h-[20vh] flex items-start pt-6 relative z-10">
                    <Button 
                        size="lg" 
                        text={step === 1 ? "Generate Code" : "End Setup"} 
                        onClick={handleAction} 
                    />
                </div>

            </div>
        </SetupLayout>
    );
}