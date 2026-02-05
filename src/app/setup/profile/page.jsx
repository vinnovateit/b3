"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import SetupLayout from "../../components/SetupLayout";
import CustomButton from "../../components/CustomButton";

// --- 1. Custom GSAP Input ---
const CustomInput = ({ label, placeholder, value, onChange }) => {
    const lineRef = useRef(null);

    const handleFocus = () => {
        gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleBlur = () => {
        gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    };

    return (
        <div className="flex flex-col gap-3 w-full group relative">
            <label className="text-lg font-medium text-gray-200">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-white/30 focus:outline-none transition-colors"
            />
            <div ref={lineRef} className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500 origin-left scale-x-0" />
        </div>
    );
};

// --- 2. Custom GSAP Dropdown ---
const CustomDropdown = ({ placeholder, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.to(listRef.current, { 
                height: "auto", 
                opacity: 1, 
                duration: 0.6, 
                ease: "elastic.out(1, 0.75)", 
                display: "block" 
            });
            gsap.to(arrowRef.current, { rotation: 180, duration: 0.3 });
        } else {
            gsap.to(listRef.current, { 
                height: 0, 
                opacity: 0, 
                duration: 0.3, 
                ease: "power2.inOut", 
                display: "none" 
            });
            gsap.to(arrowRef.current, { rotation: 0, duration: 0.3 });
        }
    }, [isOpen]);

    return (
        <div 
            ref={dropdownRef} 
            className={`relative w-full group transition-all ${isOpen ? 'z-50' : 'z-20'}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center justify-between w-full px-5 py-2.5 
                    bg-[#B7FFB2]/[0.34] hover:bg-[#B7FFB2]/[0.4] 
                    border border-white/10 backdrop-blur-md transition-all text-left
                    ${isOpen ? 'rounded-t-xl rounded-b-none border-b-0' : 'rounded-xl'}
                `}
            >
                <span className={`text-lg ${value ? "text-white" : "text-white/50"}`}>
                    {value || placeholder}
                </span>
                <div ref={arrowRef}>
                    <ChevronDown className="w-5 h-5 text-white/60" />
                </div>
            </button>

            <div
                ref={listRef}
                className="
                    absolute left-0 right-0 top-full 
                    bg-[#B7FFB2]/[0.34] backdrop-blur-md 
                    border border-white/10 border-t-0 
                    rounded-b-xl rounded-t-none 
                    overflow-hidden hidden opacity-0 shadow-2xl
                "
            >
                {options.map((opt, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            onChange(opt);
                            setIsOpen(false);
                        }}
                        className="
                            px-5 py-2.5 
                            text-lg text-white/70 
                            hover:text-white hover:bg-white/10 
                            cursor-pointer transition-colors
                        "
                    >
                        {opt}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 3. Main Page ---
export default function SetupProfilePage() {
    const containerRef = useRef(null);
    const stripRef = useRef(null); // Reference to the vertical strip of numbers
    
    const [name, setName] = useState("");
    const [residence, setResidence] = useState("");
    const [hostelType, setHostelType] = useState("");
    const [block, setBlock] = useState("");

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // 1. General Entrance
            gsap.from(".gsap-entry", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            // 2. Odometer / Combination Lock Animation
            // The strip contains [1, 2, 3]. We want to show '3', which is the 3rd item.
            // Moving yPercent to -66.66% shifts the strip up so the 3rd item is in the view window.
            gsap.to(stripRef.current, {
                yPercent: -66.66, 
                duration: 2.5,
                ease: "power3.inOut", // Mechanical feel: start slow, fast middle, slow stop
                delay: 0.2
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (residence === "Hosteller") {
            gsap.from(".conditional-field", {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }, [residence]);

    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        const formattedName = inputValue.replace(/\b\w/g, (char) => char.toUpperCase());
        setName(formattedName);
    };

    return (
        <SetupLayout>
            <div ref={containerRef} className="flex flex-col h-full">
                
                {/* Header */}
                <div className="h-[35vh] flex flex-col justify-end pb-10">
                    <div className="gsap-entry flex items-end">
                        <h1 className="text-7.5xl font-bold text-white leading-none" style={{ fontSize: "5.5rem" }}>
                            B
                        </h1>
                        
                        {/* Odometer Mask: Fixed Height, Hidden Overflow */}
                        <div className="h-[48px] w-[32px] overflow-hidden relative mb-[30px] ml-1">
                            {/* Number Strip: Slides Up */}
                            <div ref={stripRef} className="flex flex-col text-5xl font-bold text-white leading-[48px]">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                            </div>
                        </div>

                    </div>
                    <div className="gsap-entry">
                        <p className="text-4xl text-gray-300 mt-4 font-light">Let’s set things up</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="flex-1 flex flex-col gap-10 relative z-20">
                    
                    {/* Name Input */}
                    <div className="gsap-entry w-full md:w-1/3">
                        <CustomInput 
                            label="What do we call you ?" 
                            placeholder="Ayush Kumar" 
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="gsap-entry">
                        <label className="block text-lg font-medium text-gray-200 mb-10">
                            Where do you live ?
                        </label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl relative">
                            
                            <CustomDropdown 
                                placeholder="Select" 
                                options={["Hosteller", "Day Scholar"]} 
                                value={residence}
                                onChange={setResidence}
                            />

                            {residence === "Hosteller" && (
                                <>
                                    <div className="conditional-field">
                                        <CustomDropdown 
                                            placeholder="Type" 
                                            options={["Mens", "Ladies", "International"]} 
                                            value={hostelType}
                                            onChange={setHostelType}
                                        />
                                    </div>
                                    
                                    <div className="conditional-field">
                                        <CustomDropdown 
                                            placeholder="Block" 
                                            options={["A Block", "B Block", "C Block"]} 
                                            value={block}
                                            onChange={setBlock}
                                        />
                                    </div>
                                    
                                    <div className="conditional-field relative bg-[#B7FFB2]/[0.34] hover:bg-[#B7FFB2]/[0.4] border border-white/10 rounded-xl px-5 py-2.5 backdrop-blur-md flex items-center transition-colors">
                                        <input 
                                            type="text" 
                                            placeholder="Room No." 
                                            className="w-full bg-transparent border-none text-lg text-white placeholder:text-white/50 focus:outline-none" 
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="gsap-entry h-[20vh] flex items-start pt-6 relative z-10">
                    <CustomButton 
                        size="lg" 
                        text="Next Step" 
                        onClick={() => console.log({ name, residence, hostelType, block })}
                    />
                </div>

            </div>
        </SetupLayout>
    );
}