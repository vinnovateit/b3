"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function B3Header() {
  const headerRef = useRef(null);
  const stripRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ------------------------------------------------
      // 1. INITIAL ENTRY ANIMATION
      // ------------------------------------------------
      
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      if (stripRef.current) {
        gsap.to(stripRef.current, {
          yPercent: -66.66, 
          duration: 2.5,
          ease: "power3.inOut",
          delay: 0.5,
        });
      }

    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    // CHANGE: 'fixed' -> 'absolute'
    // This attaches the header to the container flow so it scrolls with the page.
    <div className="absolute top-0 left-0 w-full z-50 pointer-events-none p-10 md:pl-24">
      
      <div ref={headerRef} className="origin-bottom-left">
        <div className="flex items-end">
          {/* Static 'B' */}
          <h1
            className="text-white font-bold leading-none drop-shadow-2xl"
            style={{ fontSize: "5.5rem" }}
          >
            B
          </h1>

          {/* Window */}
          <div className="h-12 w-8 overflow-hidden relative mb-10 ml-1">
            {/* Strip */}
            <div
              ref={stripRef}
              className="flex flex-col text-5xl font-bold text-white leading-12 drop-shadow-2xl"
            >
              <span className="h-12 flex items-center justify-center">1</span>
              <span className="h-12 flex items-center justify-center">2</span>
              <span className="h-12 flex items-center justify-center">3</span>
            </div>
          </div>
        </div>

        {/* Subtext */}
        <div ref={textRef}>
            <p className="text-4xl text-gray-300 mt-4 font-light drop-shadow-md">
            Let's set things up
            </p>
        </div>
      </div>
    </div>
  );
}