"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";



const Navbar = () => {
  const [show, setShow] = useState(true);
const lastScrollY = useRef(0);


useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      setShow(false);
    } else {
      setShow(true);
    }
    lastScrollY.current = window.scrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <nav
  className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%]
  transition-transform transition-opacity duration-300
  will-change-transform will-change-opacity
  ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
>

      <div className="flex items-center justify-between px-6 py-3 
                      bg-white/10 backdrop-blur-lg 
                      border border-white/20 
                      rounded-2xl shadow-lg">
        
{/* Logo */}
<div className="flex items-center">
  <Image
  src="/logo.svg"
  alt="Vinnovate Logo"
  width={120}
  height={32}
  className="h-8 w-auto"
/>
   
</div>
{/* Nav Links */}
<ul className="hidden md:flex items-center gap-8 text-white text-sm">

{/* Home */}
  <li className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full">
    <a href="#home">Home</a>
  </li>

{/* About */}
  <li className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full">
    <a href="#about">About</a>
  </li>

{/* Rules Dropdown */}
  <li className="relative group cursor-pointer opacity-80 hover:opacity-100 transition">
    <div className="flex items-center gap-1">
      <a href="#rules" className="flex items-center gap-1">
      Rules
      <svg
  className="w-3 h-3 mt-[1px]"
  viewBox="0 0 20 20"
  fill="currentColor"
>

  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
</svg>
      </a>
    </div>

    <ul className="absolute top-full left-0 mt-3 w-44
                   bg-white/10 backdrop-blur-lg
                   border border-white/20
                   rounded-xl shadow-lg
                   opacity-0 invisible
                   group-hover:opacity-100 group-hover:visible
                   transition-all duration-200">

      <li className="px-4 py-2 text-white hover:bg-white/10 rounded-t-xl">
         <a href="#rules">General Rules</a>
      </li>
      <li className="px-4 py-2 text-white hover:bg-white/10">
        <a href="#rules">Participation</a>
      </li>
      <li className="px-4 py-2 text-white hover:bg-white/10 rounded-b-xl">
        <a href="#rules">Submission</a>
      </li>

    </ul>
  </li>

  {/* FAQs */}
  <li className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full">
    <a href="#faq">FAQs</a>
  </li>

</ul>

        {/* Login Button */}
<a
  href="#login"
  className="flex items-center overflow-hidden
             rounded-full bg-green-500
             text-white text-sm font-medium
             shadow-md hover:bg-green-600 transition"
>
  {/* Left section */}
  <span className="px-6 py-2">
    Login
  </span>

  {/* Divider */}
  <span className="h-full w-px bg-white/40" />

  {/* Right icon section */}
  <span className="px-4 py-2 flex items-center justify-center">
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" />
    </svg>
  </span>
</a>



      </div>
    </nav>
  );
};

export default Navbar;
