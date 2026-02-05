"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CustomButton from "../components/CustomButton";

export default function LoginPage() {
    const containerRef = useRef(null);
    const stripRef = useRef(null);
    const visualGroupRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Animation for Visuals
            gsap.from(visualGroupRef.current, {
                opacity: 0,
                scale: 1.1,
                duration: 2,
                ease: "power2.out"
            });

            // 2. Mouse Parallax (Desktop Only)
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * -30; // Shift range: -15px to 15px
                const yPos = (clientY / window.innerHeight - 0.5) * -30;

                gsap.to(visualGroupRef.current, {
                    x: xPos,
                    y: yPos,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            if (window.innerWidth > 768) {
                window.addEventListener("mousemove", handleMouseMove);
            }

            // 3. B³ Rolling Number Animation
            gsap.to(stripRef.current, {
                yPercent: -66.66,
                duration: 2.5,
                ease: "power4.inOut",
                delay: 0.2
            });

            // 4. UI Entrance
            gsap.from(".ui-entry", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.5,
            });

            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col md:flex-row min-h-screen w-full bg-black overflow-hidden">
            
            {/* --- Left Section: Parallax Visuals --- */}
            <div
                className="relative w-full h-[40vh] md:w-[60vw] md:h-screen overflow-hidden shrink-0"
                style={{ background: "linear-gradient(0deg, #0CAC4F 0%, #040704 100%)" }}
            >
                {/* The Master Group (Grid + Dots) that reacts to mouse */}
                <div ref={visualGroupRef} className="absolute inset-[-50px] w-[calc(100%+100px)] h-[calc(100%+100px)]">
                    
                    {/* Grid */}
                    <svg width="100%" height="100%" className="absolute inset-0 opacity-25">
                        <defs>
                            <pattern id="sync-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#sync-grid)" />
                    </svg>

                    {/* Dots */}
                    <div className="absolute inset-0">
                        {/* Loops cover the area */}
                        {Array.from({ length: 20 }).map((_, i) =>
                            Array.from({ length: 30 }).map((_, j) => {
                                
                                // GRID LOGIC: Check BOTH row and column for every 3rd index
                                // This ensures dots only appear at the vertices of 3x3 squares
                                if (i % 3 !== 0 || j % 3 !== 0) return null;

                                const spread = 12 + (i * 2);
                                const alpha = Math.max(0, 0.25 - (i * 0.02)); 
                                
                                return (
                                    <div
                                        key={`glow-${i}-${j}`}
                                        className="absolute"
                                        style={{
                                            left: `${j * 60}px`,
                                            top: `${i * 60}px`,
                                            width: `${spread}px`,
                                            height: `${spread}px`,
                                            background: `radial-gradient(circle, rgba(255,255,255,${alpha}) 0%, rgba(255,255,255,0) 70%)`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* --- Right Section: UI --- */}
            <div className="w-full md:w-[40vw] h-auto md:h-screen bg-black flex flex-col relative z-10">
                
                {/* Hero Section */}
                <div className="flex flex-col items-start pt-16 px-8 md:pt-24 md:pl-16 h-auto md:h-[50vh]">
                    
                    <div className="ui-entry flex items-start overflow-visible">
                        {/* Huge 'B' */}
                        <h1
                            className="text-8xl md:text-[9rem] font-bold leading-none"
                            style={{
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%)",
                                backgroundClip: "text",          // Standard property
                                WebkitBackgroundClip: "text",    // Vendor prefix
                                WebkitTextFillColor: "transparent",
                                color: "transparent"
                            }}
                        >
                            B
                        </h1>

                        {/* Superscript Rolling Numbers */}
                        <div className="h-12 w-8 md:h-16 md:w-10 overflow-hidden relative -mt-3 md:-mt-5 ml-1">
                            <div 
                                ref={stripRef} 
                                className="flex flex-col text-4xl md:text-6xl font-bold text-white leading-[3rem] md:leading-[4rem]"
                            >
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                            </div>
                        </div>
                    </div>

                    <p
                        className="ui-entry text-2xl md:text-3xl font-semibold mt-6 text-left"
                        style={{
                            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0.3) 100%)",
                            backgroundClip: "text",          // Standard property
                            WebkitBackgroundClip: "text",    // Vendor prefix
                            WebkitTextFillColor: "transparent",
                            color: "transparent"
                        }}
                    >
                        Block. Build. Break.
                    </p>
                </div>

                {/* Login UI Section */}
                <div className="flex flex-col justify-center px-8 pb-12 md:pl-16 md:pb-0 h-auto md:h-[50vh] gap-6">
                    
                    <div
                        className="ui-entry flex items-center text-white px-6 py-2 w-fit text-sm"
                        style={{
                            background: "rgba(61, 122, 83, 0.37)",
                            borderRadius: "37.2px",
                        }}
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                        </svg>
                        Registration on VTOP is mandatory
                    </div>

                    <div className="ui-entry text-white text-xl font-medium text-left w-full md:w-2/3 min-w-[180px]">
                        Login with your VIT Email to access the dashboard
                    </div>

                    <div className="ui-entry">
                        <CustomButton
                            className="bg-green-500 hover:bg-green-600 rounded-full flex items-center gap-2 px-4 py-2 text-base font-semibold shadow-lg min-w-[180px] max-w-[220px]"
                            onClick={() => {}}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="white">
                                <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.133-2.789-6.133-6.25s2.758-6.25 6.133-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.711-1.594-3.922-2.57-6.656-2.57-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.711 0-.656-.07-1.156-.156-1.531z" />
                            </svg>
                            <span className="whitespace-nowrap">Login with Google</span>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}