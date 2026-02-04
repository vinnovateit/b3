'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden text-white loader-root">
      
      <div className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0 crosshair" />

      <div className="progress-bar progress-left" />
      <div className="progress-bar progress-right" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="orbit-container">

          <div
            className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full border-2 border-[#00ff41]/30"
            style={{
              marginLeft: '-175px',
              marginTop: '-175px',
              animation: 'outerRing 12s linear infinite',
            }}
          />

          <div className="ellipse-system">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            <div className="orbit orbit-4" />
            <div className="orbit orbit-5" />
          </div>

          <div className="cube-scene">
            <div className="cube-outer">

              {/* OUTER CUBE */}
              <div className="cube-face-outer front" />
              <div className="cube-face-outer back" />
              <div className="cube-face-outer right" />
              <div className="cube-face-outer left" />
              <div className="cube-face-outer top" />
              <div className="cube-face-outer bottom" />

              {/* INNER CUBE (LOCKED + GLOWED) */}
              <div className="cube-inner">
                <div className="cube-face-inner front" />
                <div className="cube-face-inner back" />
                <div className="cube-face-inner right" />
                <div className="cube-face-inner left" />
                <div className="cube-face-inner top" />
                <div className="cube-face-inner bottom" />
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* FULL ISOLATION */
        .loader-root {
          background: #000;
          isolation: isolate;
          transform: translateZ(0);
        }

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

        .progress-bar {
          position: fixed;
          top: 0;
          bottom: 0;
          width: 6px;
          background: rgba(0,255,65,0.15);
          overflow: hidden;
          z-index: 40;
        }
        .progress-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #00ff41;
          box-shadow: 0 0 25px rgba(0,255,65,1);
          animation: verticalFill 2.5s ease-in-out infinite;
        }
        .progress-left { left: 0; }
        .progress-right { right: 0; }

        @keyframes verticalFill {
          0% { transform: scaleY(0); transform-origin: bottom; }
          50% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: top; }
        }

        .orbit-container {
          width: 400px;
          height: 400px;
          position: relative;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

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

        .orbit {
          position: absolute;
          inset: 0;
          border: 2px solid rgba(0,255,65,0.4);
          border-radius: 50%;
        }

        .orbit-1 { transform: rotateX(0deg); }
        .orbit-2 { transform: rotateX(36deg); }
        .orbit-3 { transform: rotateX(72deg); }
        .orbit-4 { transform: rotateX(108deg); }
        .orbit-5 { transform: rotateX(144deg); }

        @keyframes revolveSystem {
          from { transform: rotateX(20deg) rotateY(0deg); }
          to { transform: rotateX(20deg) rotateY(360deg); }
        }

        .cube-scene {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          perspective: 1200px;
        }

        .cube-outer {
          width: 120px;
          height: 120px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCubeOuter 12s linear infinite;
        }

        .cube-face-outer {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 2px solid #00ff41;
          background: rgba(0,255,65,0.05);
          box-shadow: 0 0 18px rgba(0,255,65,0.35);
        }

        .cube-face-outer.front  { transform: rotateY(0deg) translateZ(60px); }
        .cube-face-outer.back   { transform: rotateY(180deg) translateZ(60px); }
        .cube-face-outer.right  { transform: rotateY(90deg) translateZ(60px); }
        .cube-face-outer.left   { transform: rotateY(-90deg) translateZ(60px); }
        .cube-face-outer.top    { transform: rotateX(90deg) translateZ(60px); }
        .cube-face-outer.bottom { transform: rotateX(-90deg) translateZ(60px); }

        @keyframes rotateCubeOuter {
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .cube-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) translateZ(0);
          animation: rotateCubeInner 8s linear infinite reverse;
        }

        .cube-face-inner {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid #00ff41;
          background: rgba(0,255,65,0.45);
          box-shadow: 0 0 40px rgba(0,255,65,1);
        }

        .cube-face-inner.front  { transform: rotateY(0deg) translateZ(30px); }
        .cube-face-inner.back   { transform: rotateY(180deg) translateZ(30px); }
        .cube-face-inner.right  { transform: rotateY(90deg) translateZ(30px); }
        .cube-face-inner.left   { transform: rotateY(-90deg) translateZ(30px); }
        .cube-face-inner.top    { transform: rotateX(90deg) translateZ(30px); }
        .cube-face-inner.bottom { transform: rotateX(-90deg) translateZ(30px); }

        @keyframes rotateCubeInner {
          to {
            transform: translate(-50%, -50%) rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }

        @keyframes outerRing {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

