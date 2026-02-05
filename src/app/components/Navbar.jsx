"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
		// Account for fixed navbar height so target isn't hidden underneath it
		const nav = document.querySelector("nav");
		const navHeight = nav ? Math.ceil(nav.getBoundingClientRect().height) : 0;

		const elementTop = element.getBoundingClientRect().top + window.scrollY;
		const offset = 8; // small gap between nav and target
		const scrollTo = Math.max(0, elementTop - navHeight - offset);

		window.scrollTo({ top: scrollTo, behavior: "smooth" });
	}
};

const Navbar = () => {
	const [show, setShow] = useState(true);
	const [open, setOpen] = useState(false);
	const lastScrollY = useRef(0);
	const { data: session, status } = useSession();

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
			<div
				className="flex items-center justify-between px-6 py-3 
                      bg-white/10 backdrop-blur-lg 
                      border border-white/20 
                      rounded-2xl shadow-lg"
			>
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
					{NAV_ITEMS.map((item) => (
						<li
							key={item.label}
							className="relative cursor-pointer opacity-80 hover:opacity-100 transition
                 after:content-[''] after:absolute after:left-0 after:-bottom-1
                 after:h-[2px] after:w-0 after:bg-white
                 after:transition-all after:duration-300
                 hover:after:w-full"
						>
							<a
								href={item.href}
								onClick={(e) => scrollToSection(e, item.href)}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
				{/* Mobile menu button */}
				<button onClick={() => setOpen(!open)} className="md:hidden text-white">
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				{/* Login/Dashboard Button */}
				{status === "loading" ? (
					<div className="hidden md:flex items-center px-6 py-2 rounded-full bg-gray-500/50 text-white text-sm">
						Loading...
					</div>
				) : session ? (
					<Link
						href="/dashboard"
						className="hidden md:flex items-center overflow-hidden
             rounded-full bg-green-500
             text-white text-sm font-medium
             shadow-md hover:bg-green-600 transition"
					>
						{/* Left section */}
						<span className="px-6 py-2">Dashboard</span>

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
							</svg>
						</span>
					</Link>
				) : (
					<a
						href="/login"
						className="hidden md:flex items-center overflow-hidden
             rounded-full bg-green-500
             text-white text-sm font-medium
             shadow-md hover:bg-green-600 transition"
					>
						{/* Left section */}
						<span className="px-6 py-2">Login</span>

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
				)}
				{/* Mobile menu */}
				{open && (
					<div
						className="absolute top-full left-0 mt-4 w-full
                  bg-white/10 backdrop-blur-lg
                  border border-white/20
                  rounded-xl shadow-lg
                  flex flex-col gap-4 px-6 py-4 md:hidden text-white"
					>
						{NAV_ITEMS.map((item) => (
							<a
								key={item.label}
								href={item.href}
								onClick={(e) => {
									scrollToSection(e, item.href);
									setOpen(false);
								}}
								className="hover:opacity-80 transition"
							>
								{item.label}
							</a>
						))}
						{status === "loading" ? (
							<div className="text-gray-400">Loading...</div>
						) : session ? (
							<Link
								href="/dashboard"
								onClick={() => setOpen(false)}
								className="hover:opacity-80 transition"
							>
								Dashboard
							</Link>
						) : (
							<a
								href="/login"
								onClick={() => setOpen(false)}
								className="hover:opacity-80 transition"
							>
								Login
							</a>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
