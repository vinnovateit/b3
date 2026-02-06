"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "FAQ", href: "#faq" },
];

const scrollToSection = (e, href) => {
  e.preventDefault();
  const id = href.replace("#", "");
  const element = document.getElementById(id);
  if (element) {
    const nav = document.querySelector("nav");
    const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = 8;
    const scrollTo = Math.max(0, elementTop - navHeight - offset);

    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const glassStyle = {
    boxShadow:
      "0px 4px 8px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.15), inset 0px 0px 20px 0px rgba(255, 255, 255, 0.05)",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .force-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}} />

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%]">
        <div
          style={glassStyle}
          className="force-gpu relative flex items-center justify-between px-4 py-3
          bg-white/5 backdrop-blur-[10px]
          border border-white/10 border-t-white/20 border-l-white/20
          rounded-3xl
          transition-all duration-300"
        >
          {/* Logo */}
          <div className="flex items-center group cursor-pointer z-[60]">
            <div className="transform transition-transform duration-300 ease-spring group-hover:scale-105 group-active:scale-95">
              <a href="https://vinnovateit.com/">
                <Image
                  src="/logo.svg"
                  alt="Vinnovate Logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 text-white text-base font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative group cursor-pointer">
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="block transition-transform duration-300 ease-spring group-hover:-translate-y-0.5 opacity-80 group-hover:opacity-100"
                >
                  {item.label}
                </a>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 ease-spring group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Desktop Login Button Wrapper (Explicitly hidden on mobile) */}
          <div className="hidden md:block">
            <a
              href="mailto:vinnovateit@vit.ac.in"
              className={`
                flex group relative items-center justify-between
                px-5
                btn-gradient-border shadow-[0_4px_15px_rgba(0,0,0,0.2)]
                bg-linear-to-b from-[#2dc966] to-[#049f46]
                border border-[#6ee7b7]/30 border-t-[#6ee7b7]/60 border-b-[#047835]/60
                text-base font-normal text-white
                rounded-2xl
                transition-all duration-300 ease-spring
                hover:scale-[1.03] hover:brightness-105
                active:scale-95 active:shadow-inner
              `}
            >
              <span className="relative z-10 font-medium tracking-wide">Let's Connect</span>
              <div className="h-12 w-1 bg-white/40 mx-4 shadow-[1px_0_2px_rgba(0,0,0,0.1)]"></div>
              <span className="relative z-10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 transition-transform duration-300 ease-spring group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-[60] text-white p-2 transition-transform duration-300 ease-spring hover:scale-110 active:scale-90 ml-auto"
          >
            <svg
              className={`w-7 h-7 transition-transform duration-300 ${
                open ? "rotate-90" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Full Screen Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 h-[100dvh] w-screen 
            bg-black/60 backdrop-blur-3xl
            flex flex-col items-center justify-center
            transition-all duration-500 ease-spring
            ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
          <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
            {/* Mobile Nav Links */}
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  scrollToSection(e, item.href);
                  setOpen(false);
                }}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-2xl font-medium text-white/90 hover:text-green-400 transition-all duration-300 transform
                  ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Login Button (Centered & Auto Width) */}
            <div
              className={`w-full flex justify-center pt-4 transition-all duration-500 delay-200
              ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <a
                href="mailto:vinnovateit@vit.ac.in"
                onClick={() => setOpen(false)}
                className={`
                  group relative flex items-center justify-between
                  w-auto min-w-[140px] px-6 py-1
                  btn-gradient-border shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                  bg-linear-to-b from-[#2dc966] to-[#049f46]
                  border border-[#6ee7b7]/30 border-t-[#6ee7b7]/60 border-b-[#047835]/60
                  text-lg font-normal text-white
                  rounded-2xl
                  transition-all duration-300 ease-spring
                  active:scale-95
                `}
              >
                <span className="relative z-10 font-medium tracking-wide">Let's Connect</span>
                <div className="h-12 w-1 bg-white/40 mx-4"></div>
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 transition-transform duration-300 ease-spring group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;