"use client";

import { useRef, useEffect, useState } from "react";
import "../HeroSection.css";
export default function HeroSection() {

  const glassRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (glassRef.current) {
      observer.observe(glassRef.current);
    }

    return () => {
      if (glassRef.current) observer.unobserve(glassRef.current);
    };
  }, []);



  return (
    
    <section className="relative min-h-[260vh] bg-transparent overflow-hidden">

      {/* ================= BACKGROUND GRADIENTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute left-52/100 -translate-x-1/2 top-[262px] opacity-68 blur-[68px]" 
          style={{ width: "1059px", height: "735px" }}
        >
          {/* Main Center Glow */}
          <div 
            className="absolute"
            style={{
              left: "41.3%", 
              top: "42.7%",
              width: "12.5%",
              height: "18%",
              background: `radial-gradient(60% 60% at 50% 50%,rgba(38, 190, 102, 0.95) 0%,rgba(38, 190, 102, 0.7) 35%,rgba(38, 190, 102, 0.4) 60%,rgba(38, 190, 102, 0.2) 80%,transparent 100%)`,
              clipPath: "polygon(100% 0%, 0% 0%, 36% 100%, 78% 100%)",
              mixBlendMode: "plus-lighter"
            }}
          />

          {/* Top Wing Gradient */}
          <div 
            className="absolute"
            style={{
              left: "16%", 
              top: "17%",
              width: "63%",
              height: "27.8%",
              background: `radial-gradient(120% 100% at 50% 0%,rgba(205, 255, 226, 0.8) 0%,rgba(12, 172, 79, 0.55) 45%,rgba(12, 172, 79, 0.3) 70%,transparent 100%)`,
              clipPath: "path('M667.238 0H0C0 0 49.034 198.711 304.664 198.711C560.294 198.711 667.238 0 667.238 0Z')",
              mixBlendMode: "plus-lighter"
            }}
          />

          {/* Inner Wing Accent */}
          <div 
            className="absolute"
            style={{
              left: "18%", 
              top: "17%",
              width: "58%",
              height: "25.7%",
              backgroundColor: "#CDFFE2",
              clipPath: "path('M565.935 0H0C0 0 41.59 184.099 258.42 184.099C475.25 184.099 565.935 0 565.935 0Z')",
              opacity: 0.8
            }}
          />

          {/* Vertical Pillar Effect */}
          <div 
            className="absolute"
            style={{
              left: "46.3%", 
              top: "33.4%",
              width: "4.3%",
              height: "51.4%",
              backgroundColor: "#CDFFE2",
              clipPath: "polygon(100% 0%, 0% 0%, 57% 100%)",
              background: `linear-gradient(180deg,rgba(205, 255, 226, 0.9) 0%,rgba(12, 172, 79, 0.6) 35%,rgba(12, 172, 79, 0.35) 60%,rgba(12, 172, 79, 0.15) 80%,transparent 100%)`,
              filter: "blur(50px)",
              opacity: 0.6
            }}
          />

          {/* Bottom Glow Base */}
          <div 
            className="absolute"
            style={{
              left: "41.3%", 
              top: "42.7%",
              width: "12.5%",
              height: "18%",
              background: `radial-gradient(50% 50% at 50% 50%,rgba(5, 124, 53, 0.9) 0%,rgba(5, 124, 53, 0.5) 40%,rgba(5, 124, 53, 0.25) 65%,rgba(5, 124, 53, 0.1) 80%,transparent 100%)`,
              opacity: 0.4
            }}
          />
        </div>
      </div>

      {/* ================= HERO CONTENT (TITLE & BUTTON) ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1
          className="text-[128px] leading-[1]"
          style={{
                backgroundImage: "linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
        >
          B³
        </h1>

        <div
          className="mt-4 text-[64px] leading-[1.15] tracking-[-0.01em]"
          style={{
                backgroundImage: "linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
        >
          Build. Block. Break.
        </div>

        <button
          className="
            mt-8
            flex items-center justify-center
            gap-[16.77px]
            px-[25px] py-[12px]
            rounded-[15px]
            border-2
            text-[16px]
            font-medium
            leading-none
            hover:scale-105
            transition-transform
          "
          style={{
            border: "2px solid transparent",
            background: `
              radial-gradient(60.5% 60.5% at 50% 50%, #19954B 59.15%, #0CAC4F 86.65%) padding-box,
              linear-gradient(116.6deg, #8CFF84 0%, #0EB337 26.9%, #42D774 78.62%, #85FFB0 99.92%) border-box
            `,
          }}
        >
          Explore Tracks
        </button>
      </div>

          

      {/* ================= GLASS CARD SYSTEM ================= */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          top-[75px]
          relative
          w-[1100px]
          h-[474px]
        "
      >
        {/* Top Left Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: -30,
            left: -60,
            width: "200px",
            height: "200px",
            background: `
              radial-gradient(
                50% 50% at 50% 50%,
                rgba(66, 215, 116, 0.7) 0%,
                rgba(66, 215, 116, 0.45) 40%,
                rgba(66, 215, 116, 0.2) 65%,
                rgba(66, 215, 116, 0) 100%
              )
            `,
            filter: "blur(60px)",
            zIndex: 0,
          }}
        />

        {/* Bottom Right Ambient Glow */}
        <div
          id="ellipse-bottom-right"
          className="
            absolute
            bottom-[-25%]
            right-[-20%]
            w-[380px]
            h-[380px]
            rounded-full
            pointer-events-none
            will-change-transform
            z-[-1]
          "
          style={{
            background: `
              radial-gradient(
                50% 50% at 50% 50%,
                rgba(217, 217, 217, 0.6) 17.31%,
                rgba(94, 163, 122, 0.7) 46.15%,
                rgba(5, 124, 53, 0.5) 71.15%,
                #000000 100%
              )
            `,
            filter: "blur(145px)",
          }}
        />

        {/* Center Bottom Focused Glow */}
        <div
          id="ellipse-2"
          className="
            absolute
            left-1/2
            -translate-x-1/2
            top-[124%]
            w-[380px]
            h-[380px]
            rounded-full
            pointer-events-none
            will-change-transform
            z-0
          "
          style={{
            background: `
              radial-gradient(
                50% 50% at 50% 50%,
                rgba(217, 217, 217, 0.6) 17.31%,
                rgba(94, 163, 122, 0.7) 46.15%,
                rgba(5, 124, 53, 0.5) 71.15%,
                #000000 100%
              )
            `,
            filter: "blur(31px)",
            opacity: 1,
          }}
        />

        {/* Glass Container & Content */}
        <div
          ref={glassRef}   // <-- needed if you’re using IntersectionObserver
          className={`
            absolute
            inset-0
            rounded-[30px]
            border
            border-white/10
            backdrop-blur-xl
            bg-white/5
            z-10
            glass-card
            ${isVisible ? "visible" : ""}
          `}
        >
          {/* Glass Card Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center p-12">
            
            {/* Heading with Text Gradient */}
            <h2 
              className="text-[64px] mb-6 font-normal tracking-tight"
              style={{ 
                fontFamily: "Satoshi, sans-serif",
                backgroundImage: "linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              What is B³?
            </h2>

            {/* Paragraph 1 with Text Gradient */}
            <p 
              className="text-[24px] leading-[1.4] mb-6 max-w-[850px]"
              style={{
                backgroundImage: "linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              B³ (Block. Build. Break.) is a 24-hour Web3 hackathon where teams transform existing Web2 projects into decentralized Web3 solutions.
            </p>

            {/* Paragraph 2 with Text Gradient */}
            <p 
              className="text-[24px] leading-[1.4] max-w-[850px]"
              style={{
                backgroundImage: "linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              Participants migrate architecture, integrate blockchain protocols, and rework security and scalability for Web3.
            </p>

          </div>
        </div>
      </div>

      {/* ================= SPACER FOR SCROLL ================= */}
      <div className="h-[500px]" />
    </section>
  );
}