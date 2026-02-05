"use client";
import React, { useEffect, useRef } from "react";
import CustomButton from "./CustomButton";

export default function Footer() {
  // REMOVED <HTMLDivElement> to fix the JSX error
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Draw Line
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

            // 2. Bear Rise (300ms delay)
            setTimeout(() => {
              const bear = document.getElementById("anim-bear");
              if (bear) {
                if (window.matchMedia("(min-width: 768px)").matches) {
                  bear.classList.add("animate-bear-pop-desktop");
                } else {
                  bear.classList.add("animate-bear-pop-mobile");
                }
              }
            }, 300);

            // 3. Shockwave (600ms delay)
            setTimeout(() => {
              const glow = document.getElementById("anim-glow");
              if (glow) glow.classList.add("animate-shockwave");
            }, 600);

            // 4. Glitch Text (800ms delay)
            setTimeout(() => {
              const text = document.getElementById("anim-text");
              if (text) text.classList.add("animate-cyber-glitch");
            }, 800);

            // 5. Fade Up Footer (1000ms & 1200ms delay)
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
      { threshold: 0.2 }
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#040704] text-white overflow-hidden h-screen w-screen flex flex-col font-sans">
      {/* Styles injected safely to avoid Next.js compiler issues */}
      <style dangerouslySetInnerHTML={{__html: `
        /* --- Utilities --- */
        .prevent-select {
          -webkit-user-drag: none;
          user-select: none;
        }

        .tray-fade-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .hover-green-filter {
          transition: all 0.5s ease-out;
        }

        .hover-green-filter:hover {
          filter: invert(72%) sepia(13%) saturate(1633%) hue-rotate(95deg) brightness(96%) contrast(85%) drop-shadow(0 0 10px rgba(46,189,107, 0.6));
          opacity: 1;
          transform: translateY(-2px);
        }

        .bear-start {
          transform: translateX(-50%) translateY(100%) scale(0.2);
          opacity: 0;
        }

        /* --- Animations --- */
        @keyframes drawLine {
          0% { stroke-dasharray: 0, 2000; opacity: 0.5; }
          100% { stroke-dasharray: 2000, 0; opacity: 1; }
        }
        .animate-draw-line {
          animation: drawLine 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        @keyframes bearPopMobile {
          0% { transform: translateX(-50%) translateY(100%) scale(0.2); opacity: 0; }
          60% { transform: translateX(-50%) translateY(-10%) scale(0.55); }
          100% { transform: translateX(-50%) translateY(0) scale(0.5); opacity: 1; }
        }
        .animate-bear-pop-mobile {
          animation: bearPopMobile 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes bearPopDesktop {
          0% { transform: translateX(-50%) translateY(100%) scale(0.5); opacity: 0; }
          60% { transform: translateX(-50%) translateY(-5%) scale(1.5); }
          100% { transform: translateX(-50%) translateY(0) scale(1.42); opacity: 1; }
        }
        .animate-bear-pop-desktop {
          animation: bearPopDesktop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes shockwave {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-shockwave {
          animation: shockwave 1s ease-out forwards;
        }

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
        {/* UPPER STAGE (Animation Area) */}
        <div className="relative w-full flex-1 flex justify-center items-end pointer-events-none">
          <div className="absolute w-full h-full bottom-0 z-10 flex justify-center">
            {/* GLOW BACKGROUND */}
            <div className="absolute bottom-0 left-0 w-full h-[100%] overflow-hidden z-0">
              <div
                id="anim-glow"
                className="w-full h-full origin-bottom opacity-0"
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-300px] md:bottom-[-450px]
                                w-[600px] md:w-[1200px] h-[600px] md:h-[900px]
                                bg-[radial-gradient(circle,rgba(12,144,67,0.15)_0%,transparent_70%)]
                                blur-[60px] md:blur-[80px]"
                ></div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-200px] md:bottom-[-350px]
                                w-[400px] md:w-[700px] h-[400px] md:h-[700px]
                                bg-[radial-gradient(closest-side,rgba(46,189,107,0.4)_0%,rgba(12,144,67,0.05)_60%,transparent_100%)]
                                blur-[40px] md:blur-[50px]"
                ></div>
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] md:bottom-[-200px]
                                w-[250px] md:w-[400px] h-[250px] md:h-[400px]
                                bg-[radial-gradient(circle,rgba(46,189,107,0.2)_0%,transparent_70%)]
                                blur-[30px] md:blur-[40px]"
                ></div>
              </div>
            </div>

            {/* SVG LINES (MASKED) */}
            <div className="absolute inset-0 z-20 tray-fade-mask">
              <svg
                className="hidden md:block w-full h-full"
                viewBox="0 0 1440 600"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="line-desktop"
                  d="M0 450 H375 L425 600 H1015 L1065 450 H1440"
                  fill="none"
                  stroke="#0C9043"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="opacity-0"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                />
              </svg>
              <svg
                className="block md:hidden w-full h-full"
                viewBox="0 0 390 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="line-mobile"
                  d="M0 300 H20 L50 400 H340 L370 300 H390"
                  fill="none"
                  stroke="#0C9043"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  className="opacity-0"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
              </svg>
            </div>

            {/* BEAR CONTAINER */}
            <div
              id="anim-bear"
              className="bear-start absolute left-1/2 bottom-[-20vh] md:bottom-[-15vh] w-[170vw] md:w-[30vw] h-[120vh] md:h-[50vh] z-10 origin-bottom"
            >
              <img
                src="/svgs/bear-shape.svg"
                className="prevent-select absolute inset-0 w-full h-full opacity-20 z-0"
                alt="Bear Shape"
              />

              <div className="absolute inset-0 z-30 flex flex-col justify-center items-center pt-[5vh]">
                <div
                  id="anim-text"
                  className="opacity-0 flex flex-col items-center"
                >
                  <h1 className="text-[10vh] md:text-[14vh] font-sans font-light leading-none drop-shadow-2xl">
                    <span className="bg-linear-to-b from-white via-gray-100 to-gray-500 bg-clip-text text-transparent">
                      B³
                    </span>
                  </h1>
                  <p className="mt-[1vh] text-[#A1A1AA] text-[1.5em] md:text-[2vh] font-sans font-medium drop-shadow-md">
                    Block. Build. Break.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTUAL FOOTER CONTENT */}
        <footer className="relative z-30 bg-[#040704] pb-[4vh] pt-[7vh] px-[5vw] md:px-[8vw] pointer-events-auto flex-none">
          <div className="flex flex-col md:flex-row justify-between items-center gap-[3vh] md:gap-[4vw]">
            {/* Address */}
            <div
              id="footer-item-1"
              className="opacity-0 space-y-[4vh] w-full md:w-auto text-center md:text-left"
            >
              <img
                src="/svgs/vinnovate-logo.svg"
                className="w-[25vw] md:w-[12vw] mx-auto md:mx-0"
                alt="Vinnovate"
              />
              <div className="text-[#A1A1AA] text-[1.3vh] md:text-[1.6vh] leading-relaxed">
                <p>Vellore Institute of Technology,</p>
                <p>Vellore Campus</p>
                <p>Vellore, Tamil Nadu</p>
                <p>632014</p>
              </div>
            </div>

            {/* Socials & Button */}
            <div
              id="footer-item-2"
              className="opacity-0 flex flex-col items-center md:items-end gap-[4vh] md:gap-[5vh] w-full md:w-auto"
            >
              <div className="flex gap-[8vw] md:gap-[3vw] justify-center">
                <a
                  href="https://www.instagram.com/vinnovateit/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/svgs/instagram.svg"
                    className="w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 hover-green-filter"
                    alt="Instagram"
                  />
                </a>
                <a
                  href="https://x.com/v_innovate_it?lang=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/svgs/twitter.svg"
                    className="w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 hover-green-filter"
                    alt="Twitter"
                  />
                </a>
                <a
                  href="https://in.linkedin.com/company/v-innovate-it"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/svgs/linkedin.svg"
                    className="w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 hover-green-filter"
                    alt="LinkedIn"
                  />
                </a>
                <a
                  href="https://github.com/vinnovateit"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/svgs/github.svg"
                    className="w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 hover-green-filter"
                    alt="Github"
                  />
                </a>
                <a
                  href="https://www.facebook.com/VinnovateIT/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/svgs/facebook.svg"
                    className="w-[7vw] h-[7vw] md:w-[2.5vw] md:h-[2.5vw] filter brightness-0 invert opacity-80 hover-green-filter"
                    alt="Facebook"
                  />
                </a>
              </div>
              <CustomButton
              text="Let's Connect" link=""/>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}