"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SetupLayout from "../../components/SetupLayout";
import Button from "../../components/CustomButton";

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
            <div ref={lineRef} className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 origin-left scale-x-0" />
        </div>
    );
};

export default function JoinTeamPage() {
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    const [teamCode, setTeamCode] = useState("");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gsap-entry", { y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 });
            if(stripRef.current) {
                gsap.to(stripRef.current, { yPercent: -66.66, duration: 2.5, ease: "power3.inOut", delay: 0.2 });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleJoin = () => {
        console.log("Joining team with code:", teamCode);
    };

    return (
        <SetupLayout step={3}>
            <div ref={containerRef} className="flex flex-col h-full">
                <div className="h-[30vh] flex flex-col justify-end pb-10">
                    <div className="gsap-entry flex items-end">
                        <h1 className="text-7.5xl font-bold text-white leading-none" style={{ fontSize: "5.5rem" }}>B</h1>
                        <div className="h-12 w-8 overflow-hidden relative mb-7.5 ml-1">
                            <div ref={stripRef} className="flex flex-col text-5xl font-bold text-white leading-12">
                                <span>1</span><span>2</span><span>3</span>
                            </div>
                        </div>
                    </div>
                    <div className="gsap-entry"><p className="text-4xl text-gray-300 mt-4 font-light">Let’s set things up</p></div>
                </div>

                <div className="flex-1 flex flex-col gap-8 pt-10 relative z-20">
                    <div className="gsap-entry w-full md:w-1/2">
                        <CustomInput label="Enter a team code" placeholder="uxD34a" value={teamCode} onChange={(e) => setTeamCode(e.target.value)} />
                    </div>
                </div>

                <div className="gsap-entry h-[20vh] flex items-start pt-6 relative z-10">
                    <CustomButton size="lg" text="Join Team" onClick={handleJoin} />
                </div>
            </div>
        </SetupLayout>
    );
}