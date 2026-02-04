'use client';

export default function Loader() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ===== BACKGROUND SYSTEMS ===== */
        .grid-lines {
          background-image:
            linear-gradient(to right, rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,255,65,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .crosshair::before,
        .crosshair::after {
          content: '';
          position: absolute;
          background: rgba(0,255,65,0.2);
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

        

        @keyframes fadeIn {
          0% { opacity: 0; transform: translate(-50%, -60%); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%); }
        }

        /* ===== HUD CORNERS ===== */
        .hud-corner {
          position: absolute;
          width: 80px;
          height: 80px;
          background-color: rgba(0, 255, 65, 0.5);
        }
        .top-left { top: 20px; left: 20px; }
        .top-right { top: 20px; right: 20px; }
        .bottom-left { bottom: 20px; left: 20px; }
        .bottom-right { bottom: 20px; right: 20px; }

        /* ===== ANIMATIONS ===== */
        @keyframes rotateCubeOuter {
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        @keyframes rotateCubeInner {
          to {
            transform: translate(-50%, -50%)
              rotateX(360deg)
              rotateY(360deg)
              rotateZ(360deg);
          }
        }

        @keyframes revolveSystem {
          from { transform: rotateX(20deg) rotateY(0deg); }
          to   { transform: rotateX(20deg) rotateY(360deg); }
        }

        @keyframes outerRing {
          to { transform: rotate(360deg); }
        }

     
       

        /* L-Shape Logic & Pulse Animation */
        .hud-corner {
          background-color: #00ff41 !important;
          clip-path: polygon(0% 0%, 100% 0%, 100% 6px, 6px 6px, 6px 100%, 0% 100%);
          animation: pulseGlow 2.5s ease-in-out infinite;
          filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.8));
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.5) drop-shadow(0 0 10px #00ff41); }
        }

        .top-right { transform: rotate(90deg); }
        .bottom-right { transform: rotate(180deg); }
        .bottom-left { transform: rotate(270deg); }

        /* Fast fade-in, slow fade-out from screen edges */
        @keyframes edgeSlideLeft {
          0% { transform: translateX(-15px); opacity: 0; }
          15% { opacity: 0.8; }
          40% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 0; }
        }

        @keyframes edgeSlideRight {
          0% { transform: translateX(15px); opacity: 0; }
          15% { opacity: 0.8; }
          40% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 0; }
        }
      `
      }} />

      <div className="fixed inset-0 bg-black isolate">
        <div className="absolute inset-0 grid-lines"></div>
        <div className="absolute inset-0 crosshair"></div>

        <div className="hud-corner top-left"></div>
        <div className="hud-corner top-right"></div>
        <div className="hud-corner bottom-left"></div>
        <div className="hud-corner bottom-right"></div>

        <div className="loading-text">Loading...</div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[400px] h-[400px]" style={{ perspective: '1200px' }}>
            
            <div
              className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full border-2 border-[#00ff41]/30"
              style={{ margin: '-175px', animation: 'outerRing 12s linear infinite' }}
            ></div>

            <div
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px]"
              style={{
                margin: '-150px',
                transformStyle: 'preserve-3d',
                animation: 'revolveSystem 15s linear infinite'
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40"></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(36deg)' }}></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(72deg)' }}></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(108deg)' }}></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(144deg)' }}></div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ perspective: '1200px' }}>
              <div className="relative w-[120px] h-[120px]" style={{ transformStyle: 'preserve-3d', animation: 'rotateCubeOuter 12s linear infinite' }}>
                <div className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]" style={{ transform: 'rotateY(0deg) translateZ(60px)' }}></div>
                <div className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]" style={{ transform: 'rotateY(180deg) translateZ(60px)' }}></div>
                <div className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]" style={{ transform: 'rotateY(90deg) translateZ(60px)' }}></div>
                <div className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]" style={{ transform: 'rotateY(-90deg) translateZ(60px)' }}></div>
                <div className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]" style={{ transform: 'rotateX(90deg) translateZ(60px)' }}></div>
                <div className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]" style={{ transform: 'rotateX(-90deg) translateZ(60px)' }}></div>

                <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px]" style={{ transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%)', animation: 'rotateCubeInner 8s linear infinite reverse' }}>
                  <div className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]" style={{ transform: 'rotateY(0deg) translateZ(30px)' }}></div>
                  <div className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]" style={{ transform: 'rotateY(180deg) translateZ(30px)' }}></div>
                  <div className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]" style={{ transform: 'rotateY(90deg) translateZ(30px)' }}></div>
                  <div className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]" style={{ transform: 'rotateY(-90deg) translateZ(30px)' }}></div>
                  <div className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]" style={{ transform: 'rotateX(90deg) translateZ(30px)' }}></div>
                  <div className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]" style={{ transform: 'rotateX(-90deg) translateZ(30px)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-10 top-1/2 -translate-y-1/2">
          <div className="text-[#ffff] font-bold text-xs tracking-[0.4em] opacity-0" style={{ animation: 'edgeSlideLeft 4s linear infinite' }}>LOADING</div>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <div className="text-[#ffff] font-bold text-xs tracking-[0.6em] opacity-0" style={{ animation: 'edgeSlideRight 4s linear infinite' }}>LOADING</div>
        </div>
      </div>
    </div>
  );
}