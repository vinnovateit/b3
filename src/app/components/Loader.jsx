'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black isolate">

      {/* GRID + CROSSHAIR */}
      <div className="absolute inset-0 grid-lines"></div>
      <div className="absolute inset-0 crosshair"></div>

      {/* SIDE BARS */}
      <div className="fixed left-0 top-0 bottom-0 w-[6px] bg-green-500/20 progress-bar"></div>
      <div className="fixed right-0 top-0 bottom-0 w-[6px] bg-green-500/20 progress-bar"></div>

      {/* CENTER SYSTEM */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="relative w-[400px] h-[400px]" style={{ perspective: '1200px' }}>

          {/* OUTER RING */}
          <div
            className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full border-2 border-[#00ff41]/30"
            style={{ margin: '-175px', animation: 'outerRing 12s linear infinite' }}
          />

          {/* ORBIT SYSTEM */}
          <div
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px]"
            style={{
              margin: '-150px',
              transformStyle: 'preserve-3d',
              animation: 'revolveSystem 15s linear infinite',
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40"></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(36deg)' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(72deg)' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(108deg)' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-[#00ff41]/40" style={{ transform: 'rotateX(144deg)' }}></div>
          </div>

          {/* CUBE SCENE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ perspective: '1200px' }}>

            {/* OUTER CUBE */}
            <div className="relative w-[120px] h-[120px]" style={{ transformStyle: 'preserve-3d', animation: 'rotateCubeOuter 12s linear infinite' }}>

              {/* 6 OUTER FACES */}
              {['0', '180', '90', '-90'].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]"
                  style={{ transform: `rotateY(${deg}deg) translateZ(60px)` }}
                />
              ))}
              {['90', '-90'].map((deg, i) => (
                <div
                  key={i+4}
                  className="absolute w-[120px] h-[120px] border-2 border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_18px_rgba(0,255,65,0.35)]"
                  style={{ transform: `rotateX(${deg}deg) translateZ(60px)` }}
                />
              ))}

              {/* INNER CUBE */}
              <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px]"
                   style={{ transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%)', animation: 'rotateCubeInner 8s linear infinite reverse' }}>

                {/* 6 INNER FACES */}
                {['0','180','90','-90'].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]"
                    style={{ transform: `rotateY(${deg}deg) translateZ(30px)` }}
                  />
                ))}
                {['90','-90'].map((deg,i) => (
                  <div
                    key={i+4}
                    className="absolute w-[60px] h-[60px] border-2 border-[#00ff41] bg-[#00ff41]/40 shadow-[0_0_40px_rgba(0,255,65,1)]"
                    style={{ transform: `rotateX(${deg}deg) translateZ(30px)` }}
                  />
                ))}

                {/* INNERMOST CUBE */}
                <div className="absolute top-1/2 left-1/2 w-[30px] h-[30px]"
                     style={{ transformStyle:'preserve-3d', transform:'translate(-50%, -50%)', animation:'rotateCubeInnerMost 6s linear infinite reverse' }}>

                  {['0','180','90','-90'].map((deg,i) => (
                    <div
                      key={i}
                      className="absolute w-[30px] h-[30px] border-2 border-[#00ff41] bg-[#00ff41]/80 shadow-[0_0_80px_rgba(0,255,65,1)]"
                      style={{ transform: `rotateY(${deg}deg) translateZ(15px)` }}
                    />
                  ))}
                  {['90','-90'].map((deg,i) => (
                    <div
                      key={i+4}
                      className="absolute w-[30px] h-[30px] border-2 border-[#00ff41] bg-[#00ff41]/80 shadow-[0_0_80px_rgba(0,255,65,1)]"
                      style={{ transform: `rotateX(${deg}deg) translateZ(15px)` }}
                    />
                  ))}

                </div> {/* INNERMOST */}

              </div> {/* INNER */}

            </div> {/* OUTER */}

          </div> {/* CUBE SCENE */}

        </div> {/* CENTER SYSTEM */}

      </div> {/* FIXED SCREEN */}

      {/* INLINE STYLES */}
      <style jsx>{`
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
        .crosshair::before { top: 50%; left: 0; right:0; height:1px; transform:translateY(-50%);}
        .crosshair::after { left:50%; top:0; bottom:0; width:1px; transform:translateX(-50%);}

        .progress-bar::before {
          content:'';
          position:absolute;
          inset:0;
          background:#00ff41;
          box-shadow:0 0 25px rgba(0,255,65,1);
          animation: verticalFill 2.5s ease-in-out infinite;
        }

        @keyframes verticalFill {
          0%{transform:scaleY(0); transform-origin:bottom;}
          50%{transform:scaleY(1); transform-origin:bottom;}
          100%{transform:scaleY(0); transform-origin:top;}
        }

        @keyframes rotateCubeOuter { to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); } }
        @keyframes rotateCubeInner { to { transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg) rotateZ(360deg); } }
        @keyframes rotateCubeInnerMost { to { transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg) rotateZ(360deg); } }
        @keyframes revolveSystem { from { transform: rotateX(20deg) rotateY(0deg); } to { transform: rotateX(20deg) rotateY(360deg); } }
        @keyframes outerRing { to { transform: rotate(360deg); } }
      `}</style>

    </div>
  );
}
