"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroller = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let scrollTimer;

    const handleScroll = () => {
      document.body.classList.add("is-scrolling");

      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return null;
};

export default SmoothScroller;