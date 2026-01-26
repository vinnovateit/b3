"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CARDS = [
  { id: 1, src: "/Whoareweimg/first.png", alt: "Team" },
  { id: 2, src: "/Whoareweimg/second.png", alt: "Team" },
  { id: 3, src: "/Whoareweimg/third.png", alt: "Team" },
  { id: 4, src: "/Whoareweimg/fourth.jpg", alt: "Team" },
  { id: 5, src: "/Whoareweimg/fifth.png", alt: "Team" }
];

const WhoAreWe = () => {
  const [activeIndex, setActiveIndex] = useState(2); 
  const [hasEnteredView, setHasEnteredView] = useState(false); 
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // 1. START TIMERS ONLY WHEN VISIBLE
  useEffect(() => {
    if (hasEnteredView) {
      // Wait 2 seconds for the "Fan Out" to finish before cycling
      const startTimeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 2000);

      return () => clearTimeout(startTimeout);
    }
  }, [hasEnteredView]);

  // 2. AUTO-CYCLE LOGIC
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % CARDS.length);
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const getVariant = (offset) => {
    // --- CENTER ---
    if (offset === 0) {
      return {
        left: "50%",
        scale: 1,
        opacity: 1,
        zIndex: 50,
        rotateY: 0,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeOut" }
      };
    }
    // --- MID LEFT ---
    if (offset === -1) {
      return {
        left: "30%", 
        scale: 1,
        opacity: 1,
        zIndex: 40,
        rotateY: 12,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- FAR LEFT ---
    if (offset === -2) {
      return {
        left: "16%",
        scale: 0.9,
        opacity: 0.8,
        zIndex: 30,
        rotateY: 25,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- MID RIGHT ---
    if (offset === 1) {
      return {
        left: "70%",
        scale: 1,
        opacity: 1,
        zIndex: 40,
        rotateY: -12,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- FAR RIGHT ---
    if (offset === 2) {
      return {
        left: "84%",
        scale: 0.9,
        opacity: 0.8,
        zIndex: 30,
        rotateY: -25,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- HIDDEN ---
    return {
      left: "50%",
      scale: 0,
      opacity: 0,
      zIndex: 0,
      rotateY: 0,
      x: "-50%", y: "-50%",
      transition: { duration: 0.6 }
    };
  };

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden flex flex-col items-center font-sans">
      
      {/* ILLUMINATION */}
      <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-[#22522C] to-[#040704] blur-[80px] pointer-events-none opacity-90" />

      {/* TEXT CONTENT */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mb-16">
        <div className="mb-8 w-[194px] h-[51px] rounded-[38px] border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.08)] backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
             <span className="text-white text-lg font-normal tracking-wide">About us</span>
        </div>
        <h2 className="text-5xl md:text-[75px] font-normal mb-8 tracking-tight text-gradient-title pb-2 relative z-20 leading-[1.0]">
          Who Are We ?
        </h2>
        <p className="text-white max-w-[863px] text-lg md:text-[30px] leading-[1.0] mb-12 font-normal antialiased">
          VinnovateIT is the one-stop destination for all you curious cats to satisfy your hunger in the diverse world of computer science. In other words… think of it as the place where genius meets curiosity — and the result is pure magic. So come immerse yourself, in what we like to believe is the closest thing to Hogwarts.
        </p>
        <button className="px-[25px] py-[12px] btn-gradient-border text-base font-normal text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
          Read more
        </button>
      </div>

      {/* --- CAROUSEL CONTAINER --- */}
      {/* The onViewportEnter here triggers the entire sequence */}
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] mx-auto h-[600px] perspective-1000 mt-4"
        onViewportEnter={() => setHasEnteredView(true)}
        viewport={{ once: true, amount: 0.5 }} // <--- Triggers when 50% visible
      >
        
        {CARDS.map((card, index) => {
          const length = CARDS.length;
          let offset = (index - activeIndex + length) % length;
          if (offset > length / 2) offset -= length;

          return (
            <motion.div
              key={card.id}
              className={`absolute top-1/2 
                ${offset === 0 
                  ? "w-[90vw] h-[500px] md:w-[477.83px] md:h-[534px] glass-frame-center" 
                  : "w-[200px] h-[300px] md:w-[404.28px] md:h-[451.54px] glass-frame-side"
                }
              `}
              
              // INITIAL STATE: Hidden in center
              initial={{ 
                left: "50%", 
                x: "-50%", y: "-50%", 
                scale: 0.8, 
                opacity: 0 
              }}
              
              // ANIMATE PROP: Checks if we have scrolled into view
              animate={
                hasEnteredView 
                  ? getVariant(offset) // If visible: Go to Calculated Position
                  : { left: "50%", x: "-50%", y: "-50%", scale: 0.8, opacity: 0 } // If not: Stay Hidden
              }
            >
              <div className={`relative z-10 w-full h-full overflow-hidden bg-black 
                  ${offset === 0 ? "rounded-[64px]" : "rounded-[58px]"}`}
              >
                <Image src={card.src} alt={card.alt} fill className="object-cover opacity-90" priority={offset === 0} />
                
                {offset === 0 && (
                   <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                )}
              </div>
            </motion.div>
          );
        })}

      </motion.div>
    </section>
  );
};

export default WhoAreWe;