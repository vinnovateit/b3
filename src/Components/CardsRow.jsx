'use client';

import { useState, useRef, useEffect } from "react";
import Card from "./Card";

export default function CardsRow() {
  const cards = [
    { index: 1, title: "Event Check in", date: "8 Feb", time: "8:00 AM", description: "Teams arrive, Verify registration, Assign team IDs", image: "/images/image1.png" },
    { index: 2, title: "Introduction", date: "8 Feb", time: "9:00 AM", description: "Yantra Introduction,Why Web2 → Web3 matters,Submission format explained.", image: "/images/image2.png" },
    { index: 3, title: "Teams Start Their Work", date: "8 Feb", time: "9:30 AM", description: "", image: "/images/image3.png" },
    { index: 4, title: "Lunch", date: "8 Feb", time: "1:00 PM", description: "", image: "/images/image4.png" },
    { index: 5, title: "Core Development Phase", date: "8 Feb", time: "1:00 PM", description: "", image: "/images/image5.png" },
    { index: 6, title: "Review 1", date: "8 Feb", time: "5:00 PM", description: "Ideation Check", image: "/images/image6.png" },
    { index: 7, title: "Dinner Break", date: "8 Feb", time: "7:00 PM", description: "", image: "/images/image7.png" },
    { index: 8, title: "Night Build Sprint", date: "8 Feb", time: "9:00 PM", description: "", image: "/images/image8.png" },
    { index: 9, title: "Games", date: "8 Feb", time: "12:00 AM", description: "Jamming, Coffee Pong/Mini Games", image: "/images/image9.png" },
    { index: 10, title: "Review 2", date: "9 Feb", time: "3:00 AM", description: "Design Check + Tech Implementation", image: "/images/image10.png" },
    { index: null, text: "End of Day 1...", isEnd: true },
    { index: 11, title: "Students get back to venue", date: "9 Feb", time: "8:00 AM", description: "", image: "/images/image11.png" },
    { index: 12, title: "Alumni Speaker", date: "9 Feb", time: "11:00 AM", description: "", image: "/images/image12.png" },
    { index: 13, title: "Lunch Break", date: "9 Feb", time: "1:00 PM", description: "", image: "/images/image13.png" },
    { index: 14, title: "Final Review", date: "9 Feb", time: "2:30 PM", description: "", image: "/images/image14.png" },
    { index: 15, title: "Winners Announced", date: "9 Feb", time: "5:30 PM", description: "", image: "/images/image15.png" },
    { index: 16, title: "Pack-up", date: "9 Feb", time: "6:30 PM", description: "", image: "/images/image16.png" },
    { index: null, text: "End of Day 2...", isEnd: true },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [spotlightX, setSpotlightX] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    let animationFrame;
    const update = () => {
      const relativeIndex = activeIndex - startIndex;
      const activeEl = cardRefs.current[relativeIndex];
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        setSpotlightX(prev => prev + (targetX - prev) * 0.2);
      }
      animationFrame = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(animationFrame);
  }, [activeIndex, startIndex]);

  const nextCard = () => {
    const next = activeIndex + 1;
    if (next >= cards.length) {
      setActiveIndex(0);
      setStartIndex(0);
      return;
    }
    setActiveIndex(next);
    if (next - startIndex >= 4) {
        setStartIndex(Math.min(cards.length - 8, startIndex + 1));
    }
  };

  const prevCard = () => {
    const prev = activeIndex - 1;
    if (prev < 0) return;
    setActiveIndex(prev);
    if (prev < startIndex) {
        setStartIndex(Math.max(0, startIndex - 1));
    }
  };

  const visibleCards = cards.slice(startIndex, startIndex + 8);

  return (
    <div className="w-screen h-screen bg-[#040704] relative overflow-hidden">
      
      {/* PERSISTENT TOP GLOW - Condition activeIndex === 0 removed */}
      <div 
        className="absolute top-0 left-0 w-full h-[300px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(14, 179, 79, 0.25) 0%, rgba(14, 179, 79, 0.05) 40%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: 1, 
        }}
      />

      <div className="w-full absolute top-[24px] md:top-[36px] left-0 text-[40px] md:text-[70px] leading-[100%] text-center bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent font-normal z-10 select-none">
        Timeline
      </div>

      <div className="flex flex-col items-start justify-start h-screen pt-[160px] md:pt-[220px] px-6 md:pl-20 relative z-10">
        <div className="text-[28px] md:text-[48px] font-normal text-white mb-8 transition-all duration-500">
          {activeIndex <= 10 ? "Day 1 - Build & Break In" : "Day 2 - Stabilise & Ship"}
        </div>

        <div className="relative overflow-visible w-full md:w-screen">
          <div className="flex w-full justify-start gap-4 md:gap-8 transition-all duration-500 ease-in-out items-start">
            {visibleCards.map((card, i) => {
              const realIndex = startIndex + i;
              const isActive = activeIndex === realIndex;
              return (
                <div key={realIndex} ref={el => cardRefs.current[i] = el} className="flex-shrink-0 relative">
                  <div className={`relative z-10 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                    <Card isActive={isActive} index={card.index || (isActive ? "" : "End")} data={card} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="absolute pointer-events-none z-20 transition-all duration-0"
          style={{
            left: spotlightX,
            bottom: -60,
            transform: "translateX(-50%)",
            width: "clamp(600px, 100vw, 1200px)",
            height: "420px",
            background: `radial-gradient(ellipse at 50% 100%, white 0%, rgba(140, 255, 132, 0.9) 15%, rgba(14, 179, 79, 0.5) 45%, transparent 80%)`,
            filter: 'blur(60px)',
            WebkitMaskImage: `conic-gradient(from 300deg at 50% 100%, transparent 0deg, black 30deg, black 90deg, transparent 120deg), linear-gradient(to top, black 0%, transparent 100%)`,
            WebkitMaskComposite: 'source-in',
            mixBlendMode: 'plus-lighter'
          }}
        />
      </div>

      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-12 z-50">
        <div className="w-[140px] md:w-[170px] h-[60px] md:h-[70px] rounded-[24px] flex items-center justify-between relative group hover:brightness-125 transition-all duration-300 shadow-2xl overflow-hidden p-[2px]" style={{ background: 'linear-gradient(116.6deg, #8CFF84 0%, #0EB337 26.9%, #42D774 78.62%, #85FFB0 99.92%)' }}>
          <div className="w-full h-full rounded-[22px] flex items-center justify-between relative" style={{ background: 'radial-gradient(60.5% 60.5% at 50% 50%, #19954B 59.15%, #0CAC4F 86.65%)' }}>
            <button className="w-1/2 h-full flex items-center justify-center hover:bg-white/20 transition-all z-10" onClick={prevCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
            </button>
            <div className="w-[1px] h-[30px] md:h-[40px] bg-white opacity-20" />
            <button className="w-1/2 h-full flex items-center justify-center hover:bg-white/20 transition-all z-10" onClick={nextCard}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}