'use client';

import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden text-white">
      
      <style>{`
        /* Grid lines */
        .grid-lines {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        /* Crosshair lines */
        .crosshair::before,
        .crosshair::after {
          content: '';
          position: absolute;
          background: rgba(0, 255, 65, 0.2);
        }
        .crosshair::before {
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          transform: translateY(-50%);
        }
        .crosshair::after {
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
        }

        @keyframes outerRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .orbit-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* Ellipse revolution container - THIS MAKES THEM REVOLVE */
        .ellipse-system {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          margin-left: -150px;
          margin-top: -150px;
          transform-style: preserve-3d;
          animation: revolveSystem 15s linear infinite;
        }

        @keyframes revolveSystem {
          0% { transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(20deg) rotateY(360deg) rotateZ(0deg); }
        }

        .orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          margin-left: -150px;
          margin-top: -150px;
          border: 2px solid rgba(0, 255, 65, 0.4);
          border-radius: 50%;
          transform-style: preserve-3d;
        }

        /* 5 orbits tilted at different angles (72 degrees apart for even distribution) */
        .orbit-1 { transform: rotateX(0deg) rotateY(0deg); }
        .orbit-2 { transform: rotateX(36deg) rotateY(0deg); }
        .orbit-3 { transform: rotateX(72deg) rotateY(0deg); }
        .orbit-4 { transform: rotateX(108deg) rotateY(0deg); }
        .orbit-5 { transform: rotateX(144deg) rotateY(0deg); }

        /* 3D Outer Cube - Made bigger */
        .cube-scene {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          perspective: 1200px;
          z-index: 10;
        }

        .cube-outer {
          width: 120px;
          height: 120px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCubeOuter 12s linear infinite;
        }

        @keyframes rotateCubeOuter {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .cube-face-outer {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 2px solid #00ff41;
          background: rgba(0, 255, 65, 0.05);
          box-shadow: 
            0 0 15px rgba(0, 255, 65, 0.3),
            inset 0 0 15px rgba(0, 255, 65, 0.1);
        }

        .cube-face-outer.front  { transform: rotateY(0deg) translateZ(60px); }
        .cube-face-outer.back   { transform: rotateY(180deg) translateZ(60px); }
        .cube-face-outer.right  { transform: rotateY(90deg) translateZ(60px); }
        .cube-face-outer.left   { transform: rotateY(-90deg) translateZ(60px); }
        .cube-face-outer.top    { transform: rotateX(90deg) translateZ(60px); }
        .cube-face-outer.bottom { transform: rotateX(-90deg) translateZ(60px); }

        /* Inner Cube - Smaller and rotating opposite direction */
        .cube-inner {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -30px;
          margin-top: -30px;
          transform-style: preserve-3d;
          animation: rotateCubeInner 8s linear infinite reverse;
        }

        @keyframes rotateCubeInner {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .cube-face-inner {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid #00ff41;
          background: rgba(0, 255, 65, 0.2);
          box-shadow: 
            0 0 20px rgba(0, 255, 65, 0.5),
            inset 0 0 20px rgba(0, 255, 65, 0.3);
        }

        .cube-face-inner.front  { transform: rotateY(0deg) translateZ(30px); }
        .cube-face-inner.back   { transform: rotateY(180deg) translateZ(30px); }
        .cube-face-inner.right  { transform: rotateY(90deg) translateZ(30px); }
        .cube-face-inner.left   { transform: rotateY(-90deg) translateZ(30px); }
        .cube-face-inner.top    { transform: rotateX(90deg) translateZ(30px); }
        .cube-face-inner.bottom { transform: rotateX(-90deg) translateZ(30px); }

        /* Pulsing animation for outer cube faces */
        @keyframes facePulseOuter {
          0%, 100% { background: rgba(0, 255, 65, 0.05); }
          50% { background: rgba(0, 255, 65, 0.15); }
        }

        .cube-face-outer {
          animation: facePulseOuter 3s ease-in-out infinite;
        }

        .cube-face-outer.front { animation-delay: 0s; }
        .cube-face-outer.right { animation-delay: 0.5s; }
        .cube-face-outer.back { animation-delay: 1s; }
        .cube-face-outer.left { animation-delay: 1.5s; }
        .cube-face-outer.top { animation-delay: 2s; }
        .cube-face-outer.bottom { animation-delay: 2.5s; }

        /* Pulsing animation for inner cube faces */
        @keyframes facePulseInner {
          0%, 100% { background: rgba(0, 255, 65, 0.2); }
          50% { background: rgba(0, 255, 65, 0.4); }
        }

        .cube-face-inner {
          animation: facePulseInner 2s ease-in-out infinite;
        }

        .cube-face-inner.front { animation-delay: 0s; }
        .cube-face-inner.right { animation-delay: 0.33s; }
        .cube-face-inner.back { animation-delay: 0.66s; }
        .cube-face-inner.left { animation-delay: 1s; }
        .cube-face-inner.top { animation-delay: 1.33s; }
        .cube-face-inner.bottom { animation-delay: 1.66s; }
      `}</style>

      {/* Background grid */}
      <div className="absolute inset-0 grid-lines"></div>
      
      {/* Crosshair */}
      <div className="absolute inset-0 crosshair"></div>

      {/* Corner decorations */}
      {/* Top left */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00ff41]"></div>
      
      {/* Top right */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00ff41]"></div>
      
      {/* Bottom left */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#00ff41]"></div>
      
      {/* Bottom right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00ff41]"></div>

      {/* Center orbital system */}
      <div className="orbit-container">
        
        {/* Outer rotating ring - centered */}
        <div 
          className="absolute top-1/2 left-1/2 w-[350px] h-[350px] border-2 border-[#00ff41]/30 rounded-full" 
          style={{
            marginLeft: '-175px',
            marginTop: '-175px',
            animation: 'outerRing 12s linear infinite'
          }}
        ></div>
        
        {/* REVOLVING ELLIPSE SYSTEM - NOW WITH 5 ELLIPSES */}
        <div className="ellipse-system">
          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
          <div className="orbit orbit-4"></div>
          <div className="orbit orbit-5"></div>
        </div>

        {/* 3D Cubes in center */}
        <div className="cube-scene">
          {/* Outer Cube - Bigger */}
          <div className="cube-outer">
            <div className="cube-face-outer front"></div>
            <div className="cube-face-outer back"></div>
            <div className="cube-face-outer right"></div>
            <div className="cube-face-outer left"></div>
            <div className="cube-face-outer top"></div>
            <div className="cube-face-outer bottom"></div>
            
            {/* Inner Cube - Smaller, rotating opposite direction */}
            <div className="cube-inner">
              <div className="cube-face-inner front"></div>
              <div className="cube-face-inner back"></div>
              <div className="cube-face-inner right"></div>
              <div className="cube-face-inner left"></div>
              <div className="cube-face-inner top"></div>
              <div className="cube-face-inner bottom"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Left side text */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 text-white">
        <div className="w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-white border-b-8 border-b-transparent"></div>
        <div className="text-2xl font-bold tracking-[0.3em]">LOADING</div>
      </div>

      {/* Right side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-3 text-white">
        <div className="text-2xl font-bold tracking-[0.3em]">LOADING</div>
        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent"></div>
      </div>

    </div>
  );
};





export default Loader;

