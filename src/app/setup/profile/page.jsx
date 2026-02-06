"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // BACKEND: Restored useSession
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import SetupLayout from "../../components/SetupLayout";
import Button from "../../components/CustomButton";

// --- 1. Custom GSAP Input (Frontend: Lavan8t Style) ---
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
                className={`
                    w-full bg-transparent border-b border-white/20 py-4 text-xl text-white 
                    placeholder:text-white/30 focus:outline-none transition-colors
                    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                `}
            />
            {/* Frontend: h-0.5 line style */}
            <div ref={lineRef} className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 origin-left scale-x-0" />
        </div>
    );
};

// --- 2. Custom GSAP Dropdown (Frontend: Lavan8t Style) ---
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
                    bg-[#B7FFB2]/34 hover:bg-[#B7FFB2]/40 
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
                    bg-[#B7FFB2]/34 backdrop-blur-md 
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

// --- 3. Main Page Logic (BACKEND LOGIC RESTORED) ---
export default function SetupProfilePage() {
    const router = useRouter();
    const { data: session, status } = useSession(); // BACKEND: Real Session
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
    const [isEditMode, setIsEditMode] = useState(false);

    // --- BACKEND: Redirect if not authenticated ---
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // --- BACKEND: Check for existing profile (Edit Mode) ---
    useEffect(() => {
        const checkSetup = async () => {
            if (status !== "authenticated") return;

            try {
                const response = await fetch("/api/users/profile");
                const data = await response.json();

                if (response.ok && data.data?.isRegistered && data.data?.vitStudent?.id) {
                    const vit = data.data.vitStudent;
                    setRegNo(vit.regNo || "");
                    setPhone(vit.phone || "");
                    setResidence(vit.accommodation === "hostel" ? "Hosteller" : "Day Scholar");
                    setHostelType(vit.hostelType === "mh" ? "Mens" : vit.hostelType === "lh" ? "Ladies" : "");
                    setBlock(vit.block || "");
                    setRoomNo(vit.room || "");
                    setIsEditMode(true);
                }
            } catch (error) {
                console.error("Error checking setup status:", error);
            }
        };
        checkSetup();
    }, [status]);

    // --- Logic: Name & RegNo Parsing ---
    const parseNameAndRegNo = (fullName) => {
        if (!fullName) return { name: "", regNo: "" };
        const regNoPattern = /\b(\d{2}[A-Z]{3}\d{4})\b/;
        const match = fullName.match(regNoPattern);
        if (match) {
            const extractedRegNo = match[1];
            const extractedName = fullName.replace(extractedRegNo, "").trim();
            return { name: extractedName, regNo: extractedRegNo };
        }
        return { name: fullName, regNo: "" };
    };

    const calculateYear = (registrationNo) => {
        if (!registrationNo || registrationNo.length < 2) return 1;
        const yearPrefix = registrationNo.substring(0, 2);
        const yearMap = { "22": 4, "23": 3, "24": 2, "25": 1 };
        return yearMap[yearPrefix] || 1;
    };

    const { name: parsedName, regNo: parsedRegNo } = parseNameAndRegNo(session?.user?.name || "");
    const name = parsedName;

    // Pre-fill RegNo if found in Google Name
    useEffect(() => {
        if (parsedRegNo && !regNo) setRegNo(parsedRegNo);
    }, [parsedRegNo, regNo]);

    // --- ANIMATIONS (Visuals from Frontend Branch) ---
    useEffect(() => {
        // Only run animation when session is loaded to avoid hydration mismatches
        if (status !== "authenticated") return;

        const ctx = gsap.context(() => {
            // 1. Entry Fade In
            gsap.from(".gsap-entry", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            // 2. LOGO ROLL (1 -> 2 -> 3)
            // Visual: Scrolls fully to '3' in 2.5s as requested
            if (stripRef.current) {
                gsap.to(stripRef.current, {
                    yPercent: -66.66, // -66.66% moves the strip up to show the 3rd number
                    duration: 2.5,
                    ease: "power3.inOut",
                    delay: 0.5 
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, [status]); // Dependency on status

    // Conditional Fields Animation
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


    // --- BACKEND: Real Submit Handler ---
    const handleNextStep = async () => {
        // Validation
        if (!name?.trim()) { setError("Please enter your name"); return; }
        if (!regNo?.trim()) { setError("Please enter your registration number"); return; }
        if (!phone?.trim() || !/^[6-9]\d{9}$/.test(phone)) { setError("Please enter a valid phone number"); return; }
        if (!residence) { setError("Please select your residence type"); return; }
        if (residence === "Hosteller" && (!hostelType || !block)) { setError("Please fill in all hostel details"); return; }

        try {
            setIsSaving(true);
            setError(null);
            const calculatedYear = calculateYear(regNo);

            // API Call
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            if (!response.ok) throw new Error(data.message || "Failed to save profile");

            // Success Handling (Backend Routes)
            router.push(isEditMode ? "/dashboard" : "/setup/team");

        } catch (err) {
            setError(err.message);
            setIsSaving(false);
            console.error("Profile save error:", err);
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

    // --- RENDER (Frontend Layout maintained) ---
    return (
        <SetupLayout>
            <div ref={containerRef} className="flex flex-col h-full">
                
                {/* Header (Lavan8t Height: 30vh) */}
                <div className="h-[30vh] flex flex-col justify-end pb-10">
                    <div className="gsap-entry flex items-end">
                        <h1 className="text-7.5xl font-bold text-white leading-none" style={{ fontSize: "5.5rem" }}>
                            B
                        </h1>
                        
                        {/* Window (Lavan8t: h-12 w-8) */}
                        <div className="h-12 w-8 overflow-hidden relative mb-7.5 ml-1">
                            {/* Strip: Contains 1, 2, 3 stacked vertically */}
                            <div ref={stripRef} className="flex flex-col text-5xl font-bold text-white leading-12">
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
                <div className="step-1-content flex-1 flex flex-col gap-10 relative z-20">
                    
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
                                const val = e.target.value;
                                if (val === '' || (/^\d+$/.test(val) && val.length <= 10)) setPhone(val);
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
                                            options={["Mens", "Ladies"]} 
                                            value={hostelType}
                                            onChange={(val) => setHostelType(val === "Mens" ? "Mens" : "Ladies")} 
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
                                    <div className="conditional-field relative bg-[#B7FFB2]/34 hover:bg-[#B7FFB2]/40 border border-white/10 rounded-xl px-5 py-2.5 backdrop-blur-md flex items-center transition-colors">
                                        <input 
                                            type="text" 
                                            placeholder="Room No." 
                                            value={roomNo}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === '' || /^\d+$/.test(val)) setRoomNo(val);
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
                        text={isSaving ? "Saving..." : (isEditMode ? "Save and Go to Dashboard" : "Next Step")}
                        onClick={handleNextStep}
                        disabled={isSaving}
                    />
                </div>
            </div>
        </SetupLayout>
    );
}