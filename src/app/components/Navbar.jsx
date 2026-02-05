"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

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
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Small threshold to prevent jitter at very top
      if (window.scrollY < 10) {
        setShow(true);
        lastScrollY.current = window.scrollY;
        return;
      }

      if (window.scrollY > lastScrollY.current) {
        setShow(false); // Hide on scroll down
      } else {
        setShow(true); // Show on scroll up
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const glassStyle = {
    boxShadow:
      "0px 4px 8px 1px rgba(0, 0, 0, 0.25), inset 0px 1px 1px 0px rgba(255, 255, 255, 0.15), inset 0px 0px 20px 0px rgba(255, 255, 255, 0.05)",
  };

  return (
    <>
      {/* Safely injected styles using standard React pattern */}
      <style dangerouslySetInnerHTML={{__html: `
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ease-smooth {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* Forces the browser to keep the filter active during opacity changes */
        .force-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}} />

      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%]
        transition-all duration-500 ease-smooth
        will-change-transform
        ${
          show
            ? "translate-y-0 opacity-100"
            : "-translate-y-[150%] opacity-0 pointer-events-none"
        }`}
      >
        <div
          style={glassStyle}
          className="force-gpu relative flex items-center justify-between px-4 py-3
          bg-white/5 backdrop-blur-md
          border border-white/10 border-t-white/20 border-l-white/20
          rounded-3xl
          transition-all duration-300
          will-change-[backdrop-filter,transform]"
        >
          {/* Logo - Scale Spring on Hover */}
          <div className="flex items-center group cursor-pointer">
            <div className="transform transition-transform duration-300 ease-spring group-hover:scale-105 group-active:scale-95">
				<a href="https://vinnvateit.com">
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

          {/* Nav Links - Lift & Underline Spring */}
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
                {/* Spring Underline */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 ease-spring group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Mobile menu button - Rotation Spring */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white transition-transform duration-300 ease-spring hover:scale-110 active:scale-90"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
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

          {/* Login Button - Complex Spring & Icon Slide */}
          <a
  href="/login"
  className={`
    group relative flex items-center justify-between
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
  {/* Text */}
  <span className="relative z-10 font-medium tracking-wide">Login</span>

  {/* Vertical Separator */}
  <div className="h-12 w-1 bg-white/40 mx-4 shadow-[1px_0_2px_rgba(0,0,0,0.1)]"></div>

  {/* Icon Wrapper */}
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

          {/* Mobile menu Dropdown - Spring Slide Down */}
          <div
            className={`absolute top-full left-0 mt-4 w-full origin-top
              overflow-hidden rounded-2xl
              transition-all duration-500 ease-spring
              ${
                open
                  ? "max-h-100 opacity-100 scale-100 translate-y-0"
                  : "max-h-0 opacity-0 scale-95 -translate-y-4"
              }`}
          >
            <div
              style={glassStyle}
              className="force-gpu flex flex-col gap-4 px-6 py-4
                bg-[#040704]/80 backdrop-blur-xl
                border border-white/10 border-t-white/20 border-l-white/20
                text-white text-base"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setOpen(false);
                  }}
                  className="hover:translate-x-2 transition-transform duration-300 ease-spring opacity-90 hover:opacity-100"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#login"
                onClick={() => setOpen(false)}
                className="font-medium text-green-400 hover:translate-x-2 transition-transform duration-300 ease-spring"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;