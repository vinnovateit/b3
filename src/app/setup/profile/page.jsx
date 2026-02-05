"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import SetupLayout from "../../components/SetupLayout";
import Button from "../../components/CustomButton";

// --- 1. Custom GSAP Input ---
const CustomInput = ({ label, placeholder, value, onChange, disabled }) => {
    const lineRef = useRef(null);

    const handleFocus = () => {
        if (!disabled) {
            gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" });
        }
    };

    const handleBlur = () => {
        if (!disabled) {
            gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
        }
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
                disabled={disabled}
                className={`w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
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
    const router = useRouter();
    const { data: session, status } = useSession();
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    
    const [regNo, setRegNo] = useState("");
    const [phone, setPhone] = useState("");
    const [residence, setResidence] = useState("");
    const [hostelType, setHostelType] = useState("");
    const [block, setBlock] = useState("");
    const [roomNo, setRoomNo] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Check if user has already completed setup
    useEffect(() => {
        const checkSetup = async () => {
            if (status !== "authenticated") return;

            try {
                const response = await fetch("/api/users/profile");
                const data = await response.json();

                if (response.ok && data.data?.isRegistered && data.data?.vitStudent?.id) {
                    // User has completed profile setup, redirect based on team status
                    if (data.data?.vitStudent?.teamId) {
                        router.push("/dashboard");
                    } else {
                        router.push("/setup/team");
                    }
                }
            } catch (error) {
                console.error("Error checking setup status:", error);
            }
        };

        checkSetup();
    }, [status, router]);

    // Parse name and regNo from session
    const parseNameAndRegNo = (fullName) => {
        if (!fullName) return { name: "", regNo: "" };
        
        // Match registration number pattern (e.g., 23MID0026, 21BCE1234)
        const regNoPattern = /\b(\d{2}[A-Z]{3}\d{4})\b/;
        const match = fullName.match(regNoPattern);
        
        if (match) {
            const extractedRegNo = match[1];
            const extractedName = fullName.replace(extractedRegNo, "").trim();
            return { name: extractedName, regNo: extractedRegNo };
        }
        
        return { name: fullName, regNo: "" };
    };

    // Calculate year from registration number
    const calculateYear = (registrationNo) => {
        if (!registrationNo || registrationNo.length < 2) return 1;
        
        const yearPrefix = registrationNo.substring(0, 2);
        const yearMap = {
            "22": 4,
            "23": 3,
            "24": 2,
            "25": 1
        };
        
        return yearMap[yearPrefix] || 1;
    };

    const { name: parsedName, regNo: parsedRegNo } = parseNameAndRegNo(session?.user?.name || "");
    const name = parsedName;

    // Set regNo on mount if parsed from name
    useEffect(() => {
        if (parsedRegNo && !regNo) {
            setRegNo(parsedRegNo);
        }
    }, [parsedRegNo, regNo]);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        // Only run animation when session is loaded
        if (status !== "authenticated") return;

        const ctx = gsap.context(() => {
            gsap.from(".gsap-entry", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            if (stripRef.current) {
                // Profile page shows "1" - no animation needed, already at correct position
                gsap.to(stripRef.current, {
                    y: 0,
                    duration: 2.5,
                    ease: "power3.inOut",
                    delay: 0.5
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, [status]);

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

    // No need for handleNameChange since name is from session and disabled

    const handleNextStep = async () => {
        if (!name.trim()) {
            setError("Please enter your name");
            return;
        }
        if (!regNo.trim()) {
            setError("Please enter your registration number");
            return;
        }
        if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone)) {
            setError("Please enter a valid phone number");
            return;
        }
        if (!residence) {
            setError("Please select your residence type");
            return;
        }
        if (residence === "Hosteller" && (!hostelType || !block)) {
            setError("Please fill in all hostel details");
            return;
        }

        try {
            setIsSaving(true);
            setError(null);

            const calculatedYear = calculateYear(regNo);

            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    regNo: regNo.trim().toUpperCase(),
                    year: calculatedYear,
                    phone: phone.trim(),
                    accommodation: residence === "Hosteller" ? "hostel" : "dayscholar",
                    hostelType: residence === "Hosteller" ? (hostelType === "Mens" ? "mh" : "lh") : null,
                    block: residence === "Hosteller" ? block : null,
                    room: residence === "Hosteller" ? roomNo : null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save profile");
            }

            router.push("/setup/team");
        } catch (err) {
            setError(err.message);
            console.error("Profile save error:", err);
        } finally {
            setIsSaving(false);
        }
    };

    if (status === "loading") {
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
                <div className="h-[35vh] flex flex-col justify-end pb-10">
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

                {/* Form Section */}
                <div className="flex-1 flex flex-col gap-10 relative z-20">
                    
                    <div className="gsap-entry w-full md:w-1/3">
                        <CustomInput 
                            label="What do we call you ?" 
                            placeholder="Your name from Google" 
                            value={name}
                            disabled={true}
                        />
                    </div>

                    <div className="gsap-entry grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomInput 
                            label="Registration Number" 
                            placeholder="23MID0026" 
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                            disabled={true}
                        />
                        
                        <CustomInput 
                            label="Phone Number" 
                            placeholder="9876543210" 
                            value={phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || (/^\d+$/.test(value) && value.length <= 10)) {
                                    setPhone(value);
                                }
                            }}
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
                                            options={["MH", "LH"]} 
                                            value={hostelType}
                                            onChange={setHostelType}
                                        />
                                    </div>
                                    
                                    <div className="conditional-field relative bg-[#B7FFB2]/[0.34] hover:bg-[#B7FFB2]/[0.4] border border-white/10 rounded-xl px-5 py-2.5 backdrop-blur-md flex items-center transition-colors">
                                        <input 
                                            type="text" 
                                            placeholder="Block" 
                                            value={block}
                                            onChange={(e) => setBlock(e.target.value)}
                                            className="w-full bg-transparent border-none text-lg text-white placeholder:text-white/50 focus:outline-none" 
                                        />
                                    </div>
                                    
                                    <div className="conditional-field relative bg-[#B7FFB2]/[0.34] hover:bg-[#B7FFB2]/[0.4] border border-white/10 rounded-xl px-5 py-2.5 backdrop-blur-md flex items-center transition-colors">
                                        <input 
                                            type="text" 
                                            placeholder="Room No." 
                                            value={roomNo}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Only allow numbers
                                                if (value === '' || /^\d+$/.test(value)) {
                                                    setRoomNo(value);
                                                }
                                            }}
                                            className="w-full bg-transparent border-none text-lg text-white placeholder:text-white/50 focus:outline-none" 
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="gsap-entry p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="gsap-entry h-[20vh] flex items-start pt-6 relative z-10">
                    <Button 
                        size="lg" 
                        text={isSaving ? "Saving..." : "Next Step"}
                        onClick={handleNextStep}
                        disabled={isSaving}
                    />
                </div>

            </div>
        </SetupLayout>
    );
}
