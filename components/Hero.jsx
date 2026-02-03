"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.2) {
          setIsVisible(true);
          observer.disconnect(); // only once
        }
      },
      { threshold: [0.2] }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <main className="relative w-screen min-h-[200vh] bg-[#05080a] text-white font-[var(--font-satoshi),system-ui,-apple-system,sans-serif] overflow-x-hidden">
      <style jsx>{`
        @keyframes traceEllipseLeft {
          0% {
            stroke-dashoffset: -1;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -0.5;
            opacity: 1;
          }
        }

        @keyframes traceEllipseRight {
          0% {
            stroke-dashoffset: 0.5;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0; 
            opacity: 1;
          }
        }

        .ellipse-animate-left {
          stroke-dashoffset: 0;
          stroke-dasharray: 0.5 1;
          animation: traceEllipseLeft 6s ease-in forwards;
        }

        .ellipse-animate-right {         
          stroke-dashoffset: 0;
          stroke-dasharray: 0.5 1;
          animation: traceEllipseRight 6s ease-in forwards;
        }

        /* Hide ellipses by default until animation starts */
        svg ellipse:not(.ellipse-animate-left):not(.ellipse-animate-right) {
          opacity: 0;
        }
      `}</style>

      {/* Scene root */}
      <div className="relative w-screen min-h-[200vh] overflow-x-hidden">

        {/* Triangle gradient wrapper */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div 
            className="absolute left-1/2 top-[24vh] -translate-x-1/2 w-[1059px] h-[735px] opacity-68"
            style={{ filter: 'blur(68px)' }}
          >
            {/* Main center glow */}
            <div 
              className="absolute left-[41.3%] top-[42.7%] w-[12.5%] h-[18%]"
              style={{
                background: 'radial-gradient(60% 60% at 50% 50%, rgba(38,190,102,0.95) 0%, rgba(38,190,102,0.7) 35%, rgba(38,190,102,0.4) 60%, rgba(38,190,102,0.2) 80%, transparent 100%)',
                clipPath: 'polygon(100% 0%, 0% 0%, 36% 100%, 78% 100%)',
                mixBlendMode: 'plus-lighter'
              }}
            ></div>

            {/* Top wing */}
            <div 
              className="absolute left-[16%] top-[17%] w-[63%] h-[27.8%]"
              style={{
                background: 'radial-gradient(120% 100% at 50% 0%, rgba(205,255,226,0.8) 0%, rgba(12,172,79,0.55) 45%, rgba(12,172,79,0.3) 70%, transparent 100%)',
                clipPath: 'path("M667.238 0H0C0 0 49.034 198.711 304.664 198.711C560.294 198.711 667.238 0 667.238 0Z")',
                mixBlendMode: 'plus-lighter'
              }}
            ></div>

            {/* Inner wing accent */}
            <div 
              className="absolute left-[18%] top-[17%] w-[58%] h-[25.7%] opacity-80"
              style={{
                backgroundColor: '#CDFFE2',
                clipPath: 'path("M565.935 0H0C0 0 41.59 184.099 258.42 184.099C475.25 184.099 565.935 0 565.935 0Z")'
              }}
            ></div>

            {/* Vertical pillar */}
            <div 
              className="absolute left-[46.3%] top-[33.4%] w-[4.3%] h-[51.4%] opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(205,255,226,0.9) 0%, rgba(12,172,79,0.6) 35%, rgba(12,172,79,0.35) 60%, rgba(12,172,79,0.15) 80%, transparent 100%)',
                clipPath: 'polygon(100% 0%, 0% 0%, 57% 100%)',
                filter: 'blur(50px)'
              }}
            ></div>

            {/* Bottom glow */}
            <div 
              className="absolute left-[41.3%] top-[42.7%] w-[12.5%] h-[18%] opacity-40"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, rgba(5,124,53,0.9) 0%, rgba(5,124,53,0.5) 40%, rgba(5,124,53,0.25) 65%, rgba(5,124,53,0.1) 80%, transparent 100%)'
              }}
            ></div>
          </div>
        </div>

        {/* Hero text stack */}
        <div className="relative z-[5] text-center pt-[15vh]">
          <h1 
            className="text-[7rem] bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            B³
          </h1>
          <p 
            className="mt-1 text-[4.5rem] bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Build. Block. Break.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="mt-8 px-8 py-3 text-base font-medium text-[#eafff3] rounded-xl border-2 border-transparent cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            style={{
              background: `
                radial-gradient(60.5% 60.5% at 50% 50%, #19954B 59.15%, #0CAC4F 86.65%) padding-box,
                linear-gradient(116.6deg, #8CFF84 0%, #0EB337 26.9%, #42D774 78.62%, #85FFB0 99.92%) border-box
              `
            }}
          >
            Explore Tracks
          </button>
        </div>

        {/* Glass morph block wrapper with ellipses */}
        <div className="relative z-[6] w-full max-w-[900px] min-h-[474px] h-auto mx-auto mt-[24vh] px-4 md:px-6 lg:max-w-[87.3%]">
          
          {/* SVG Ellipses - positioned behind glass card */}
          <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
            
            {/* Layer 1 - tangent at center (top-1/2) */}
            <svg 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              width="1277" 
              height="618" 
              style={{ filter: 'blur(2px)' }}
            >
              <defs>
                <linearGradient id="combinedGradientLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="4.81%" stopColor="#0CAC4F" />
                  <stop offset="18.27%" stopColor="#0CAC4F" />
                  <stop offset="40.87%" stopColor="#0CAC4F" />
                  <stop offset="46.63%" stopColor="#FFFFFF" />
                  <stop offset="50.96%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="combinedGradientRight" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="4.81%" stopColor="#0CAC4F" />
                  <stop offset="18.27%" stopColor="#0CAC4F" />
                  <stop offset="40.87%" stopColor="#0CAC4F" />
                  <stop offset="46.63%" stopColor="#FFFFFF" />
                  <stop offset="50.96%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              
              {/* LEFT ellipses - ACW from tangent (right side = 0°) */}
              <g transform="translate(638.5, 309)">
                <ellipse pathLength="1" cx="-104.245" cy="0" rx="104.25" ry="308.83" fill="none" stroke="url(#combinedGradientLeft)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-159.625" cy="0" rx="159.625" ry="308.83" fill="none" stroke="url(#combinedGradientLeft)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-216.09" cy="0" rx="216.09" ry="308.83" fill="none" stroke="url(#combinedGradientLeft)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-269.3" cy="0" rx="269.3" ry="308.83" fill="none" stroke="url(#combinedGradientLeft)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-319.25" cy="0" rx="319.25" ry="308.83" fill="none" stroke="url(#combinedGradientLeft)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
              </g>
              
              {/* RIGHT ellipses - CW from tangent (left side = 0°) */}
              <g transform="translate(638.5, 309)">
                <ellipse transform="rotate(180, 104.245, 0)" pathLength="1" cx="104.245" cy="0" rx="104.245" ry="308.83" fill="none" stroke="url(#combinedGradientRight)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 159.625, 0)"  pathLength="1" cx="159.625" cy="0" rx="159.625" ry="308.83" fill="none" stroke="url(#combinedGradientRight)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 216.09, 0)"  pathLength="1" cx="216.09" cy="0" rx="216.09" ry="308.83" fill="none" stroke="url(#combinedGradientRight)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 269.3, 0)"  pathLength="1" cx="269.3" cy="0" rx="269.3" ry="308.83" fill="none" stroke="url(#combinedGradientRight)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 319.25, 0)"  pathLength="1" cx="319.25" cy="0" rx="319.25" ry="308.83" fill="none" stroke="url(#combinedGradientRight)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
              </g>
            </svg>

            {/* Layer 2 - tangent lower (top-64%) */}
            <svg 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              width="1036" 
              height="518" 
              style={{ filter: 'blur(2px)' }}
            >
              {/* LEFT ellipses - ACW from tangent */}
              <g transform="translate(518, 331.2)">
                <ellipse pathLength="1" cx="-84.57" cy="0" rx="84.57" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-129.5" cy="0" rx="129.5" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-175.31" cy="0" rx="175.31" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-219.975" cy="0" rx="219.975" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-259" cy="0" rx="259" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
              </g>
              
              {/* RIGHT ellipses - CW from tangent */}
              <g transform="translate(518, 331.2)">
                <ellipse transform="rotate(180, 84.57, 0)" pathLength="1" cx="84.57" cy="0" rx="84.57" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 129.5, 0)" pathLength="1" cx="129.5" cy="0" rx="129.5" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 175.31, 0)" pathLength="1" cx="175.31" cy="0" rx="175.31" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 219.975, 0)" pathLength="1" cx="219.975" cy="0" rx="219.975" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 259, 0)" pathLength="1" cx="259" cy="0" rx="259" ry="259" fill="none" stroke="rgba(23, 102, 57, 1)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
              </g>
            </svg>

            {/* Layer 3 - tangent lowest (top-130%) */}
            <svg 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              width="720" 
              height="356" 
              style={{ filter: 'blur(2px)' }}
            >
              {/* LEFT ellipses - ACW from tangent */}
              <g transform="translate(360, 461.6)">
                <ellipse pathLength="1" cx="-58.775" cy="0" rx="58.775" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-90" cy="0" rx="90" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-121.835" cy="0" rx="121.835" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-151.835" cy="0" rx="151.835" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
                <ellipse pathLength="1" cx="-180" cy="0" rx="180" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-left" : ""} />
              </g>
              
              {/* RIGHT ellipses - CW from tangent */}
              <g transform="translate(360, 461.6)">
                <ellipse transform="rotate(180, 58.775, 0)" pathLength="1" cx="58.775" cy="0" rx="58.775" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 90, 0)" pathLength="1" cx="90" cy="0" rx="90" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 121.835, 0)" pathLength="1" cx="121.835" cy="0" rx="121.835" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 151.835, 0)" pathLength="1" cx="151.835" cy="0" rx="151.835" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
                <ellipse transform="rotate(180, 180, 0)" pathLength="1" cx="180" cy="0" rx="180" ry="177.66" fill="none" stroke="rgba(57, 221, 124, 0.57)" strokeWidth="1" className={isVisible ? "ellipse-animate-right" : ""} />
              </g>
            </svg>
          </div>

          {/* Glass morph card - sits on top */}
          <div 
            ref={cardRef}
            className={`relative z-[2] p-6 px-6 md:p-14 md:px-12 rounded-3xl border border-white/20 transform transition-transform transition-opacity duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: `
                0 8px 32px 0 rgba(0, 0, 0, 0.4),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Attached ambients */}
            <div 
              className="absolute -top-[120px] -left-[140px] w-[280px] h-[280px] pointer-events-none opacity-60"
              style={{
                background: 'radial-gradient(circle at center, rgba(120, 255, 200, 0.85) 0%, rgba(120, 255, 200, 0.45) 35%, rgba(120, 255, 200, 0.2) 55%, transparent 75%)',
                filter: 'blur(45px)'
              }}
            ></div>

            <div 
              className="absolute -bottom-[140px] -right-[160px] w-[320px] h-[320px] pointer-events-none opacity-60"
              style={{
                background: 'radial-gradient(circle at center, rgba(90, 220, 160, 0.9) 0%, rgba(90, 220, 160, 0.45) 38%, rgba(90, 220, 160, 0.2) 58%, transparent 78%)',
                filter: 'blur(45px)'
              }}
            ></div>

            <div 
              className="absolute left-1/2 -bottom-[560px] -translate-x-1/2 w-[380px] h-[380px] pointer-events-none opacity-100"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(217, 217, 217, 0.6) 17%, rgba(94, 163, 122, 0.7) 46%, rgba(5, 124, 53, 0.5) 71%, rgba(0, 0, 0, 1) 100%)',
                filter: 'blur(50.88px)'
              }}
            ></div>

            {/* Glass content */}
            <h2 
              className="text-[clamp(2rem,5vw,4rem)] mb-6 text-center bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              What is B³?
            </h2>

            <p 
              className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto mb-4 text-center bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              B³ (Block. Build. Break.) is a 24-hour Web3 hackathon where teams transform existing Web2 projects into decentralized Web3 solutions.
            </p>

            <p 
              className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto text-center bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Participants migrate architecture, integrate blockchain protocols, and rework security and scalability for Web3.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}