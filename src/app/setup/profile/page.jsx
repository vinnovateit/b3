"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ChevronDown, Plus, Link as LinkIcon } from "lucide-react";
import SetupLayout from "../../components/SetupLayout";
import Button from "../../components/Button";

// --- Liquid Glass Card ---
const TeamCard = ({ icon: Icon, title, description, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                boxShadow: isSelected 
                    ? "0px 4px 20px 2px rgba(14, 179, 55, 0.4), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 20px 0px rgba(255, 255, 255, 0.1)"
                    : "0px 4px 8px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.15), inset 0px 0px 20px 0px rgba(255, 255, 255, 0.05)",
            }}
            className={`
                team-card-entry opacity-0 translate-y-10 
                group w-full md:w-65 h-65 flex flex-col justify-center items-center text-center gap-4
                p-6 hover:scale-110
                border border-white/10 border-t-white/20 border-l-white/20
                rounded-3xl cursor-pointer
                transition-all duration-300
                ${isSelected 
                    ? "bg-[#617B5F] scale-105 border-white/40" 
                    : "bg-[#0EB337]/26 hover:bg-[#0EB337]/35 hover:scale-102 backdrop-blur-none"
                }
            `}
        >
            <div className="bg-white rounded-full p-3 shadow-lg">
                <Icon className="w-6 h-6 text-green-700" strokeWidth={2.5} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed px-1">{description}</p>
            </div>
        </div>
    );
};

// --- Form Components ---
const CustomInput = ({ label, placeholder, value, onChange }) => {
    const lineRef = useRef(null);
    return (
        <div className="flex flex-col gap-3 w-full group relative">
            <label className="text-lg font-medium text-gray-200">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={() => gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" })}
                onBlur={() => gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" })}
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-white/30 focus:outline-none transition-colors"
            />
            <div ref={lineRef} className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 origin-left scale-x-0" />
        </div>
    );
};

const CustomDropdown = ({ placeholder, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.to(listRef.current, { height: "auto", opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.75)", display: "block" });
            gsap.to(arrowRef.current, { rotation: 180, duration: 0.3 });
        } else {
            gsap.to(listRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut", display: "none" });
            gsap.to(arrowRef.current, { rotation: 0, duration: 0.3 });
        }
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className={`relative w-full group transition-all ${isOpen ? 'z-50' : 'z-20'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-5 py-2.5 bg-[#B7FFB2]/34 hover:bg-[#B7FFB2]/40 border border-white/10 backdrop-blur-md transition-all text-left ${isOpen ? 'rounded-t-xl rounded-b-none border-b-0' : 'rounded-xl'}`}
            >
                <span className={`text-lg ${value ? "text-white" : "text-white/50"}`}>{value || placeholder}</span>
                <div ref={arrowRef}><ChevronDown className="w-5 h-5 text-white/60" /></div>
            </button>
            <div ref={listRef} className="absolute left-0 right-0 top-full bg-[#B7FFB2]/34 backdrop-blur-md border border-white/10 border-t-0 rounded-b-xl rounded-t-none overflow-hidden hidden opacity-0 shadow-2xl">
                {options.map((opt, i) => (
                    <div key={i} onClick={() => { onChange(opt); setIsOpen(false); }} className="px-5 py-2.5 text-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
                        {opt}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Main Page Logic ---
export default function SetupProfilePage() {
    const router = useRouter();
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    
    // State
    const [step, setStep] = useState(1);
    const [teamSelection, setTeamSelection] = useState(null);
    const [name, setName] = useState("");
    const [residence, setResidence] = useState("");
    const [hostelType, setHostelType] = useState("");
    const [block, setBlock] = useState("");

    // Initial Load Animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".gsap-entry", { y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 });
            gsap.to(stripRef.current, { yPercent: -66.66, duration: 2.5, ease: "power3.inOut", delay: 0.2 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Conditional Fields
    useEffect(() => {
        if (residence === "Hosteller") {
            gsap.from(".conditional-field", { x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
        }
    }, [residence]);

    // Step 2 Entrance
    useEffect(() => {
        if (step === 2) {
            const ctx = gsap.context(() => {
                gsap.fromTo(".team-card-entry", 
                    { y: 50, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)", delay: 0.2 }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [step]);

    // Navigation
    const handleNextStep = () => {
        if (step === 1) {
            const ctx = gsap.context(() => {
                gsap.to(".step-1-content", {
                    opacity: 0,
                    y: -30,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: () => setStep(2)
                });
            }, containerRef);
        } else {
            if (teamSelection === 'create') {
                router.push('/setup/create');
            } else if (teamSelection === 'join') {
                router.push('/setup/join');
            }
        }
    };

    const handleNameChange = (e) => setName(e.target.value.replace(/\b\w/g, (c) => c.toUpperCase()));

    return (
        <SetupLayout step={step}>
            <div ref={containerRef} className="flex flex-col h-full">
                {/* Header */}
                <div className="h-[30vh] flex flex-col justify-end pb-10">
                    <div className="gsap-entry flex items-end">
                        <h1 className="text-7.5xl font-bold text-white leading-none" style={{ fontSize: "5.5rem" }}>B</h1>
                        <div className="h-12 w-8 overflow-hidden relative mb-7.5 ml-1">
                            <div ref={stripRef} className="flex flex-col text-5xl font-bold text-white leading-12">
                                <span>1</span><span>2</span><span>3</span>
                            </div>
                        </div>
                    </div>
                    <div className="gsap-entry">
                        <p className="text-4xl text-gray-300 mt-4 font-light">Let’s set things up</p>
                    </div>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                    <div className="step-1-content flex-1 flex flex-col gap-10 relative z-20">
                        <div className="gsap-entry w-full md:w-1/3">
                            <CustomInput label="What do we call you ?" placeholder="Ayush Kumar" value={name} onChange={handleNameChange} />
                        </div>
                        <div className="gsap-entry">
                            <label className="block text-lg font-medium text-gray-200 mb-10">Where do you live ?</label>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl relative">
                                <CustomDropdown placeholder="Select" options={["Hosteller", "Day Scholar"]} value={residence} onChange={setResidence} />
                                {residence === "Hosteller" && (
                                    <>
                                        <div className="conditional-field"><CustomDropdown placeholder="Type" options={["Mens", "Ladies", "International"]} value={hostelType} onChange={setHostelType} /></div>
                                        <div className="conditional-field"><CustomDropdown placeholder="Block" options={["A Block", "B Block", "C Block"]} value={block} onChange={setBlock} /></div>
                                        <div className="conditional-field relative bg-[#B7FFB2]/34 hover:bg-[#B7FFB2]/40 border border-white/10 rounded-xl px-5 py-2.5 backdrop-blur-md flex items-center transition-colors">
                                            <input type="text" placeholder="Room No." className="w-full bg-transparent border-none text-lg text-white placeholder:text-white/50 focus:outline-none" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <div className="step-2-content flex-1 flex flex-col md:flex-row gap-6 items-start pt-10 relative z-20">
                        <TeamCard icon={Plus} title="Create a team" description="Start a new team and invite your friends to join the hackathon adventure" isSelected={teamSelection === 'create'} onClick={() => setTeamSelection('create')} />
                        <TeamCard icon={LinkIcon} title="Join a team" description="Already have a team code? Join your friends and start building together" isSelected={teamSelection === 'join'} onClick={() => setTeamSelection('join')} />
                    </div>
                )}

                {/* Footer */}
                <div className="gsap-entry h-[20vh] flex items-start pt-6 relative z-10">
                    <Button size="lg" text="Next Step" onClick={handleNextStep} />
                </div>
            </div>
        </SetupLayout>
    );
}