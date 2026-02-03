"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isHovering, setIsHovering] = useState(false);
  const prevActiveIndexRef = useRef(2);
  const carouselRef = useRef(null);
  const wheelQueueRef = useRef(0);
  const wheelProcessingRef = useRef(false);
  const wheelIdleTimeoutRef = useRef(null);
  const wheelResumeTimeoutRef = useRef(null);
  const transitionEndRef = useRef(0);
  const queueKickTimeoutRef = useRef(null);
  const TRANSITION_MS = 600;
  const wheelDeltaAccumRef = useRef(0);
  const WHEEL_THRESHOLD = 80;

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
        transitionEndRef.current = performance.now() + TRANSITION_MS;
        setActiveIndex((prev) => (prev + 1) % CARDS.length);
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
      } else if (hasEnteredView) {
        setIsAutoPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [hasEnteredView]);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;

    const processWheelQueue = () => {
      if (wheelQueueRef.current === 0) {
        wheelProcessingRef.current = false;
        return;
      }
      wheelProcessingRef.current = true;
      const direction = wheelQueueRef.current > 0 ? 1 : -1;
      wheelQueueRef.current -= direction;
      transitionEndRef.current = performance.now() + TRANSITION_MS;
      setActiveIndex((prev) => (prev + direction + CARDS.length) % CARDS.length);
      setTimeout(() => {
        processWheelQueue();
      }, TRANSITION_MS);
    };

    const onWheel = (e) => {
      if (!isHovering) return;
      e.preventDefault();
      e.stopPropagation();
      if (!hasEnteredView) return;
      wheelDeltaAccumRef.current += e.deltaY;
      if (Math.abs(wheelDeltaAccumRef.current) < WHEEL_THRESHOLD) return;
      const direction = wheelDeltaAccumRef.current > 0 ? 1 : -1;
      wheelDeltaAccumRef.current = 0;
      setIsAutoPlaying(false);
      wheelQueueRef.current += direction;
      if (wheelQueueRef.current > 2) wheelQueueRef.current = 2;
      if (wheelQueueRef.current < -2) wheelQueueRef.current = -2;
      if (!wheelProcessingRef.current) {
        const now = performance.now();
        const delay = Math.max(0, transitionEndRef.current - now);
        if (delay > 0) {
          if (queueKickTimeoutRef.current) clearTimeout(queueKickTimeoutRef.current);
          queueKickTimeoutRef.current = setTimeout(() => {
            processWheelQueue();
          }, delay);
        } else {
          processWheelQueue();
        }
      }
      if (wheelIdleTimeoutRef.current) clearTimeout(wheelIdleTimeoutRef.current);
      wheelIdleTimeoutRef.current = setTimeout(() => {
        wheelQueueRef.current = 0;
      }, 120);
      if (wheelResumeTimeoutRef.current) clearTimeout(wheelResumeTimeoutRef.current);
      wheelResumeTimeoutRef.current = setTimeout(() => {
        if (hasEnteredView) setIsAutoPlaying(true);
      }, 1000);
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      if (wheelIdleTimeoutRef.current) clearTimeout(wheelIdleTimeoutRef.current);
      if (wheelResumeTimeoutRef.current) clearTimeout(wheelResumeTimeoutRef.current);
      if (queueKickTimeoutRef.current) clearTimeout(queueKickTimeoutRef.current);
    };
  }, [hasEnteredView, isHovering]);

  useEffect(() => {
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getVariant = (offset, isWrapping) => {
    // --- CENTER ---
    if (offset === 0) {
      return {
        left: "50%",
        scale: 1,
        opacity: 1,
        zIndex: 50,
        z: 0,
        rotateY: 0,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeOut" }
      };
    }
    // --- MID LEFT ---
    if (offset === -1) {
      return {
        left: "34%", 
        scale: 1,
        opacity: 1,
        zIndex: 40,
        z: -80,
        rotateY: 38,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- FAR LEFT ---
    if (offset === -2) {
      return {
        left: "18%",
        scale: 0.9,
        opacity: isWrapping ? [0, 0.8] : 0.8,
        zIndex: 30,
        z: -160,
        rotateY: 60,
        x: "-50%", y: "-50%",
        transition: isWrapping
          ? {
              left: { duration: 0 },
              x: { duration: 0 },
              rotateY: { duration: 0 },
              scale: { duration: 0 },
              opacity: { duration: 0.3, delay: 0.05, ease: "easeOut" }
            }
          : { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- MID RIGHT ---
    if (offset === 1) {
      return {
        left: "66%",
        scale: 1,
        opacity: 1,
        zIndex: 40,
        z: -80,
        rotateY: -38,
        x: "-50%", y: "-50%",
        transition: { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- FAR RIGHT ---
    if (offset === 2) {
      return {
        left: "82%",
        scale: 0.9,
        opacity: isWrapping ? [0, 0.8] : 0.8,
        zIndex: 30,
        z: -160,
        rotateY: -60,
        x: "-50%", y: "-50%",
        transition: isWrapping
          ? {
              left: { duration: 0 },
              x: { duration: 0 },
              rotateY: { duration: 0 },
              scale: { duration: 0 },
              opacity: { duration: 0.3, delay: 0.05, ease: "easeOut" }
            }
          : { duration: 0.6, ease: "easeInOut" }
      };
    }
    // --- HIDDEN ---
    return {
      left: "50%",
      scale: 0,
      opacity: 0,
      zIndex: 0,
      z: -200,
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
        <p className="text-white max-w-[863px] text-lg md:text-[30px] leading-[1.3]\ mb-12 font-normal antialiased">
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
        ref={carouselRef}
        onViewportEnter={() => {
          setHasEnteredView(true);
          setIsAutoPlaying(true);
        }}
        onViewportLeave={() => {
          setHasEnteredView(false);
          setIsAutoPlaying(false);
        }}
        viewport={{ once: false, amount: 0.3 }} // <--- Triggers when 30% visible
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {CARDS.map((card, index) => {
          const length = CARDS.length;
          let offset = (index - activeIndex + length) % length;
          if (offset > length / 2) offset -= length;
          let prevOffset = (index - prevActiveIndexRef.current + length) % length;
          if (prevOffset > length / 2) prevOffset -= length;
          const isWrapping = (prevOffset === -2 && offset === 2) || (prevOffset === 2 && offset === -2);

          return (
            <motion.div
              key={card.id}
              className={`absolute top-1/2 
                ${offset === 0 
                  ? "w-[90vw] h-[500px] md:w-[477.83px] md:h-[534px] glass-frame-center" 
                  : "w-[200px] h-[300px] md:w-[404.28px] md:h-[451.54px] glass-frame-side"
                }
              `}
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              
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
                  ? getVariant(offset, isWrapping) // If visible: Go to Calculated Position
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
