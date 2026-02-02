'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center font-mono text-[#00ff41] selection:bg-[#00ff41] selection:text-black">
      
      {/* CSS Styles - Cube specific styles removed */}
      <style jsx global>{`
        /* --- Grid Background --- */
        .sci-fi-grid {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, rgba(0, 255, 65, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 65, 0.05) 1px, transparent 1px);
        }

        /* --- Keyframes (Cube animations removed) --- */

        @keyframes loader-fill {
          0% { width: 0%; }
          50% { width: 100%; }
          80% { width: 100%; }
          100% { width: 0%; }
        }

        /* --- Environmental Effects --- */
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line {
          animation: scan 4s linear infinite;
          box-shadow: 0 0 10px #00ff41;
        }

        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .pulse-ring-anim {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        
        @keyframes flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.95; }
          10% { opacity: 0.9; }
          15% { opacity: 0.95; }
          20% { opacity: 0.99; }
          50% { opacity: 0.95; }
          80% { opacity: 0.9; }
          100% { opacity: 0.98; }
        }
        .crt-flicker {
          animation: flicker 0.15s infinite;
          pointer-events: none;
        }

        .animate-loader {
          animation: loader-fill 8s ease-in-out infinite;
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 sci-fi-grid opacity-50"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] z-10 pointer-events-none"></div>
      
      {/* CRT Lines Texture */}
      <div className="absolute inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      {/* UI: Top Left */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-1 text-xs md:text-sm tracking-widest crt-flicker">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00ff41] animate-pulse"></div>
          <span className="font-bold">&gt; LINK_ESTABLISHED_894</span>
        </div>
        <div className="opacity-80 pl-4">DATA_RATE: 4.2TB/s</div>
        <div className="opacity-80 pl-4">SECURITY: LEVEL 5</div>
        <div className="mt-2 text-[10px] opacity-60">
          00 AF 41 99<br />
          FF 01 22 4A
        </div>
      </div>

      {/* UI: Top Right */}
      <div className="absolute top-8 right-8 z-20 text-right text-xs md:text-sm tracking-widest crt-flicker">
        <div className="mb-1">REC 00:04:22</div>
        <div className="opacity-70">SYS.MONITOR.EXE</div>
        {/* Loading Bar Animation */}
        <div className="w-24 h-1 bg-[#00ff41]/30 ml-auto mt-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#00ff41] animate-loader w-full origin-left"></div>
        </div>
      </div>

      {/* UI: Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20 text-right text-xs md:text-sm tracking-widest crt-flicker">
        <div className="border-r-2 border-[#00ff41] pr-2">
          <div className="font-bold">SECTOR: 7G / 99</div>
          <div className="text-[#00ff41] animate-pulse">STATUS: ACTIVE</div>
          <div className="mt-1 text-[10px] opacity-60 tracking-[0.2em]">10110100110</div>
        </div>
      </div>
      
      {/* UI: Bottom Left */}
      <div className="absolute bottom-8 left-8 z-20 w-32 h-8 border-b border-l border-[#00ff41]/50 flex items-end p-1">
        <div className="w-full h-[2px] bg-[#00ff41]/30"></div>
      </div>

      {/* Crosshair Center Lines */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20 pointer-events-none">
        <div className="w-full h-[1px] bg-[#00ff41]"></div>
        <div className="h-full w-[1px] bg-[#00ff41] absolute"></div>
      </div>

      {/* Main Central Visual (Rings only, Cube removed) */}
      <div className="relative flex items-center justify-center z-30">
        
        {/* Static Circle */}
        <div className="absolute w-[300px] h-[300px] border border-[#00ff41]/20 rounded-full flex items-center justify-center pointer-events-none"></div>
        
        {/* Spinning Dashed Ring */}
        <div className="absolute w-[260px] h-[260px] border-[1px] border-dashed border-[#00ff41]/40 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
        
        {/* Pulsing Thick Ring */}
        <div className="absolute w-[220px] h-[220px] border-[2px] border-[#00ff41] rounded-full pulse-ring-anim opacity-50 shadow-[0_0_10px_#00ff41] pointer-events-none"></div>
        
        {/* Brackets */}
        <div className="absolute w-[180px] h-[180px] flex items-center justify-between opacity-80 pointer-events-none">
          <div className="w-4 h-12 border-l-2 border-t-2 border-b-2 border-[#00ff41]"></div>
          <div className="w-4 h-12 border-r-2 border-t-2 border-b-2 border-[#00ff41]"></div>
        </div>

      </div>

      {/* Scanline Overlay */}
      <div className="absolute left-0 w-full h-[2px] bg-[#00ff41]/50 scan-line z-40 pointer-events-none"></div>

    </main>
  );
}