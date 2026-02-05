"use client";
import React from 'react';

export default function SetupLayout({ children, step = 1 }) {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black font-sans text-white selection:bg-green-500/30">
            
            {/* --- BG 1: Profile Setup (step=1) --- */}
            <div className={`absolute inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
                <svg width="100%" height="100%" viewBox="0 0 1280 832" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_step1)">
                        <path d="M1349 849H1006C1691.5 320.556 378.5 -3.9082 22 -79H1349V849Z" fill="#19954B"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_step1" x="-220.9" y="-321.9" width="1812.8" height="1413.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="121.45" result="effect1_foregroundBlur_step1"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* --- BG 2: Team Selection (step=2) --- */}
            <div className={`absolute inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <svg width="100%" height="100%" viewBox="0 0 1280 832" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_step2)">
                        <path d="M1349 849H1006C943.632 482.416 -198.33 120.942 21.9999 -79H1349V849Z" fill="#19954B"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_step2" x="-249.083" y="-321.9" width="1840.98" height="1413.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="121.45" result="effect1_foregroundBlur_step2"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* --- BG 3: Join/Create Team (step=3) --- */}
            <div className={`absolute inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-in-out ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
                <svg width="100%" height="100%" viewBox="0 0 1280 832" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_2154_7054)">
                        <path d="M1349 849H1006C569.003 786.295 -459.661 336.245 22.0003 -79H1349V849Z" fill="#19954B"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_2154_7054" x="-346.476" y="-321.9" width="1938.38" height="1413.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="121.45" result="effect1_foregroundBlur_2154_7054"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Inner Shadow Overlay */}
            <div 
                className="absolute inset-0 z-1 pointer-events-none"
                style={{ boxShadow: "inset 0 0 50px #14753B" }}
            />
            
            {/* Page Content */}
            <div className="relative z-10 w-full h-full px-8 md:px-16 lg:px-24">
                {children}
            </div>
        </div>
    );
}