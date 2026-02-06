"use client";
import React, { useEffect, useRef } from "react";
import CustomButton from "./CustomButton";
import { Icon } from "@iconify/react";

export default function Footer() {
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger Lines
            const desktopLine = document.getElementById("line-desktop");
            const mobileLine = document.getElementById("line-mobile");

            if (desktopLine) {
              desktopLine.classList.remove("opacity-0");
              desktopLine.classList.add("animate-draw-line");
            }
            if (mobileLine) {
              mobileLine.classList.remove("opacity-0");
              mobileLine.classList.add("animate-draw-line");
            }

            // Trigger Bear
            setTimeout(() => {
              const bear = document.getElementById("anim-bear");
              if (bear) {
                bear.classList.add("animate-bear-pop");
              }
            }, 300);

            // Trigger Glow
            setTimeout(() => {
              const glow = document.getElementById("anim-glow");
              if (glow) glow.classList.add("animate-shockwave");
            }, 600);

            // Trigger Text Glitch
            setTimeout(() => {
              const text = document.getElementById("anim-text");
              if (text) text.classList.add("animate-cyber-glitch");
            }, 800);

            // Trigger Footer Content
            setTimeout(() => {
              const item1 = document.getElementById("footer-item-1");
              if (item1) item1.classList.add("animate-fade-up");
            }, 1000);

            setTimeout(() => {
              const item2 = document.getElementById("footer-item-2");
              if (item2) item2.classList.add("animate-fade-up");
            }, 1200);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#040704] text-white overflow-hidden h-screen w-screen flex flex-col font-sans select-none">
      <style dangerouslySetInnerHTML={{__html: `
        .prevent-select {
          -webkit-user-drag: none;
          user-select: none;
        }

        .tray-fade-mask {
          mask-image: linear-gradient(to right, black 0%, black 100%);
          -webkit-mask-image: linear-gradient(to right, black 0%, black 100%);
        }

        /* PHYSICS UTILS */
        .spring-physics {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease, color 0.4s ease;
        }
        .spring-physics:hover {
          transform: translateY(-5px) scale(1.15);
          filter: drop-shadow(0 0 12px rgba(74, 222, 128, 0.6));
        }

        .logo-spring {
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease;
        }
        .logo-spring:hover {
          transform: scale(1.05);
          filter: brightness(1.2) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
        }

        .text-spring {
            transition: color 0.3s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .text-spring:hover {
            color: #ffffff;
            transform: translateX(5px);
        }

        /* ANIMATIONS */
        @keyframes drawLine {
          0% { stroke-dasharray: 0, 2000; opacity: 0.5; }
          100% { stroke-dasharray: 2000, 0; opacity: 1; }
        }
        .animate-draw-line {
          animation: drawLine 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        /* Bear Pop */
        .bear-start {
          transform: translateX(-50%) translateY(100%) scale(0.8);
          opacity: 0;
        }
        @keyframes bearPop {
          0% { transform: translateX(-50%) translateY(100%) scale(0.8); opacity: 0; }
          60% { transform: translateX(-50%) translateY(-5%) scale(1.05); opacity: 1; }
          100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
        }
        .animate-bear-pop {
          animation: bearPop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        /* Shockwave */
        @keyframes shockwave {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-shockwave {
          animation: shockwave 1s ease-out forwards;
        }

        /* Glitch */
        @keyframes cyberGlitch {
          0% { opacity: 0; transform: scale(1.5) skew(10deg); filter: blur(5px); }
          20% { opacity: 1; transform: scale(1.2) skew(-10deg); }
          40% { transform: scale(0.9) skew(5deg); text-shadow: 2px 0 #ff0000, -2px 0 #00ff00; }
          60% { transform: scale(1.05) skew(0deg); text-shadow: none; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; filter: none; }
        }
        .animate-cyber-glitch {
          animation: cyberGlitch 0.6s steps(2, end) forwards;
        }

        /* Fade Up */
        @keyframes fadeUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}} />

      <div
        id="footer-trigger"
        ref={triggerRef}
        className="relative flex-1 flex flex-col min-h-0"
      >
        {/* === MAIN VISUAL AREA === */}
        <div className="relative w-full flex-1 flex justify-center items-end pointer-events-none overflow-hidden">
          
          {/* Background Glows */}
          <div className="absolute inset-0 z-0">
            <div id="anim-glow" className="w-full h-full origin-bottom opacity-0 transition-opacity duration-700">
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10%] w-[120vw] h-[60vh] bg-[radial-gradient(circle,rgba(12,144,67,0.12)_0%,transparent_60%)] blur-[80px]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10%] w-[60vw] h-[30vh] bg-[radial-gradient(circle,rgba(46,189,107,0.25)_0%,transparent_70%)] blur-[50px]"></div>
            </div>
          </div>

          {/* SVG Lines */}
          <div className="absolute inset-0 z-20 flex items-end">
            <svg 
                className="hidden md:block w-full h-[600px]" 
                viewBox="0 0 1440 600" 
                preserveAspectRatio="none" 
            >
              <path 
                id="line-desktop" 
                d="M0 450 H375 L425 600 H1015 L1065 450 H1440" 
                fill="none" 
                stroke="#0C9043" 
                strokeWidth="1" 
                vectorEffect="non-scaling-stroke"
                className="opacity-0" 
              />
            </svg>
            <svg 
                className="block md:hidden w-full h-[400px]" 
                viewBox="0 0 390 400" 
                preserveAspectRatio="none"
            >
              <path 
                id="line-mobile" 
                d="M0 300 H20 L50 400 H340 L370 300 H390" 
                fill="none" 
                stroke="#0C9043" 
                strokeWidth="1.5" 
                vectorEffect="non-scaling-stroke"
                className="opacity-0" 
              />
            </svg>
          </div>

          {/* === THE BEAR CONTAINER === */}
          <div
            id="anim-bear"
            className="bear-start absolute left-1/2 z-10 origin-bottom
                       w-[80vw] bottom-[-2vh]
                       md:w-[35vw] md:bottom-[-5vh]"
          >
            <div className="relative w-full pt-[100%] flex justify-center items-center">
                {/* Bear Image */}
                <img
                    src="/svgs/bear-shape.svg"
                    className="prevent-select absolute inset-0 w-full h-full opacity-20 object-contain object-bottom"
                    alt="Bear Shape"
                />
                
                {/* Text Overlay */}
                <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full px-4 flex flex-col items-center justify-center text-center">
                    <div id="anim-text" className="opacity-0 flex flex-col items-center">
                        
                        {/* UPDATED:
                            1. text size -> text-[18vw] md:text-[8vw]
                            2. tracking -> tracking-wide
                        */}
                        <h1 className="text-[18vw] md:text-[8vw] font-sans font-light leading-normal drop-shadow-2xl tracking-wide pt-6 pb-0">
                            <span className="bg-gradient-to-b from-white via-gray-100 to-gray-500 bg-clip-text text-transparent px-2 inline-block">
                            B³
                            </span>
                        </h1>
                        
                        {/* UPDATED:
                            1. text size -> text-[4.5vw] md:text-[1.3vw]
                            2. negative margin -> mt-[-1.5vh]
                        */}
                        <p className="mt-[-1.5vh] text-[#A1A1AA] text-[4.5vw] md:text-[1.3vw] font-sans font-medium drop-shadow-md ">
                            Block. Build. Break.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* === FOOTER CONTENT === */}
        <footer className="relative z-30 bg-[#040704] pb-8 pt-4 px-6 md:px-16 pointer-events-auto flex-none border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
            
            {/* Left: Address */}
            <div id="footer-item-1" className="opacity-0 w-full md:w-auto text-center md:text-left space-y-4">
              <img
                src="/svgs/vinnovate-logo.svg"
                className="logo-spring w-32 md:w-40 mx-auto md:mx-0 cursor-pointer"
                alt="Vinnovate"
              />
              <div className="text-[#A1A1AA] text-xs md:text-sm leading-relaxed space-y-0.5">
                <p className="text-spring">Vellore Institute of Technology,</p>
                <p className="text-spring">Vellore Campus</p>
                <p className="text-spring">Vellore, Tamil Nadu</p>
                <p className="text-spring">632014</p>
              </div>
            </div>

            {/* Right: Socials & CTA */}
            <div id="footer-item-2" className="opacity-0 flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
              
              <div className="flex gap-8 md:gap-8 justify-center items-center">
                {[
                  { href: "https://www.instagram.com/vinnovateit/", icon: "mdi:instagram" },
                  { href: "https://x.com/v_innovate_it", icon: "prime:twitter" },
                  { href: "https://in.linkedin.com/company/v-innovate-it", icon: "basil:linkedin-outline" },
                  { href: "https://github.com/vinnovateit", icon: "proicons:github" },
                  { href: "https://www.facebook.com/VinnovateIT/", icon: "bi:facebook" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <Icon
                      icon={social.icon}
                      className="w-8 h-8 md:w-8 md:h-8 text-white spring-physics hover:text-green-400"
                    />
                  </a>
                ))}
              </div>

              <div className="transform transition-transform duration-500 hover:scale-105 active:scale-95">
                 <CustomButton text="Let's Connect" link="mailto:vinnovateit@gmail.com" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}