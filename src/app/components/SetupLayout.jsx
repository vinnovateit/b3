import React from 'react';

export default function SetupLayout({ children }) {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black font-[family-name:var(--font-satoshi)] text-white selection:bg-green-500/30">
            
            {/* 1. The SVG Background */}
            <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 1280 832" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice" // Ensures it covers the screen like object-cover
                >
                    <g filter="url(#filter0_f_2154_6945)">
                        <path d="M1349 849H1006C1691.5 320.556 378.5 -3.9082 22 -79H1349V849Z" fill="#19954B"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_2154_6945" x="-220.9" y="-321.9" width="1812.8" height="1413.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="121.45" result="effect1_foregroundBlur_2154_6945"/>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* 2. Inner Shadow Overlay (#14753B, blur 50) */}
            <div 
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    boxShadow: "inset 0 0 50px #14753B"
                }}
            />
            
            {/* 3. Page Content */}
            <div className="relative z-10 w-full h-full px-8 md:px-16 lg:px-24">
                {children}
            </div>
        </div>
    );
}