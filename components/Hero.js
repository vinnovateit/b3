export default function Hero() {
  return (
    <main className="relative w-screen min-h-[200vh] bg-[#05080a] text-white font-[var(--font-satoshi),system-ui,-apple-system,sans-serif]">
      {/* Scene root */}
      <div className="relative w-screen min-h-[200vh]">

        {/* Triangle gradient wrapper */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div 
            className="absolute left-1/2 top-[24vh] -translate-x-1/2 w-[1059px] h-[735px] opacity-68"
            style={{ filter: 'blur(68px)' }}
          >
            {/* Main center glow */}
            <div 
              className="absolute left-[41.3%] top-[42.7%] w-[12.5%] h-[18%]"
              style={{
                background: 'radial-gradient(60% 60% at 50% 50%, rgba(38,190,102,0.95) 0%, rgba(38,190,102,0.7) 35%, rgba(38,190,102,0.4) 60%, rgba(38,190,102,0.2) 80%, transparent 100%)',
                clipPath: 'polygon(100% 0%, 0% 0%, 36% 100%, 78% 100%)',
                mixBlendMode: 'plus-lighter'
              }}
            ></div>

            {/* Top wing */}
            <div 
              className="absolute left-[16%] top-[17%] w-[63%] h-[27.8%]"
              style={{
                background: 'radial-gradient(120% 100% at 50% 0%, rgba(205,255,226,0.8) 0%, rgba(12,172,79,0.55) 45%, rgba(12,172,79,0.3) 70%, transparent 100%)',
                clipPath: 'path("M667.238 0H0C0 0 49.034 198.711 304.664 198.711C560.294 198.711 667.238 0 667.238 0Z")',
                mixBlendMode: 'plus-lighter'
              }}
            ></div>

            {/* Inner wing accent */}
            <div 
              className="absolute left-[18%] top-[17%] w-[58%] h-[25.7%] opacity-80"
              style={{
                backgroundColor: '#CDFFE2',
                clipPath: 'path("M565.935 0H0C0 0 41.59 184.099 258.42 184.099C475.25 184.099 565.935 0 565.935 0Z")'
              }}
            ></div>

            {/* Vertical pillar */}
            <div 
              className="absolute left-[46.3%] top-[33.4%] w-[4.3%] h-[51.4%] opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(205,255,226,0.9) 0%, rgba(12,172,79,0.6) 35%, rgba(12,172,79,0.35) 60%, rgba(12,172,79,0.15) 80%, transparent 100%)',
                clipPath: 'polygon(100% 0%, 0% 0%, 57% 100%)',
                filter: 'blur(50px)'
              }}
            ></div>

            {/* Bottom glow */}
            <div 
              className="absolute left-[41.3%] top-[42.7%] w-[12.5%] h-[18%] opacity-40"
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, rgba(5,124,53,0.9) 0%, rgba(5,124,53,0.5) 40%, rgba(5,124,53,0.25) 65%, rgba(5,124,53,0.1) 80%, transparent 100%)'
              }}
            ></div>
          </div>
        </div>

        {/* Hero text stack */}
        <div className="relative z-[5] text-center pt-[15vh]">
          <h1 
            className="text-[7rem] bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            B<sup>3</sup>
          </h1>
          <p 
            className="mt-1 text-[4.5rem] bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Build. Block. Break.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="mt-8 px-8 py-3 text-base font-medium text-[#eafff3] rounded-xl border-2 border-transparent cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            style={{
              background: `
                radial-gradient(60.5% 60.5% at 50% 50%, #19954B 59.15%, #0CAC4F 86.65%) padding-box,
                linear-gradient(116.6deg, #8CFF84 0%, #0EB337 26.9%, #42D774 78.62%, #85FFB0 99.92%) border-box
              `
            }}
          >
            Explore Tracks
          </button>
        </div>

        {/* Glass morph block wrapper with ellipses */}
        <div className="relative z-[6] w-full max-w-[950px] min-h-[474px] h-auto mx-auto mt-[24vh] md:max-w-[90%]">
          
          {/* Ellipses behind the glass card - attached to wrapper */}
          <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
            {/* Layer 1 */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: '1277px',
                height: '617.66px',
                filter: 'blur(2px)',
                top: '50%'
              }}
            >
              {/* LEFT ellipses */}
              <div className="absolute top-1/2 -translate-y-1/2 right-1/2">
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[208.49px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[319.25px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[432.18px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[538.60px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[638.50px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
              </div>
              {/* RIGHT ellipses */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2">
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[208.49px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[319.25px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[432.18px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[538.60px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[638.50px] h-[617.66px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
              </div>
            </div>

            {/* Layer 2 */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: '1036px',
                height: '518px',
                filter: 'blur(2px)',
                top: '50%'
              }}
            >
              {/* LEFT ellipses */}
              <div className="absolute top-[64%] -translate-y-1/2 right-1/2">
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[169.14px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[259.00px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[350.62px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[439.95px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[518.00px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
              </div>
              {/* RIGHT ellipses */}
              <div className="absolute top-[64%] -translate-y-1/2 left-1/2">
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[169.14px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[259.00px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[350.62px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[439.95px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[518.00px] h-[518px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
              </div>
            </div>

            {/* Layer 3 */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: '117.55px',
                height: '355.32px',
                filter: 'blur(2px)',
                top: '50%'
              }}
            >
              {/* LEFT ellipses */}
              <div className="absolute top-[150%] -translate-y-1/2 right-1/2">
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[117.55px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[180.00px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[243.67px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[303.67px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 right-0 w-[360.00px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
              </div>
              {/* RIGHT ellipses */}
              <div className="absolute top-3/2 -translate-y-1/2 left-1/2">
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[117.55px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[180.00px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[243.67px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[303.67px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
                <span className="absolute top-1/2 -translate-y-1/2 left-0 w-[360.00px] h-[355.32px] border border-[rgba(200,255,220,0.25)] bg-transparent" style={{ filter: 'blur(0.5px)', borderRadius: '50%' }}></span>
              </div>
            </div>
          </div>

          {/* Glass morph card - sits on top */}
          <div 
            className="relative z-[2] p-8 md:p-14 rounded-3xl border border-white/20"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: `
                0 8px 32px 0 rgba(0, 0, 0, 0.4),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Attached ambients */}
          <div 
            className="absolute -top-[120px] -left-[140px] w-[280px] h-[280px] pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle at center, rgba(120, 255, 200, 0.85) 0%, rgba(120, 255, 200, 0.45) 35%, rgba(120, 255, 200, 0.2) 55%, transparent 75%)',
              filter: 'blur(45px)'
            }}
          ></div>

          <div 
            className="absolute -bottom-[140px] -right-[160px] w-[320px] h-[320px] pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle at center, rgba(90, 220, 160, 0.9) 0%, rgba(90, 220, 160, 0.45) 38%, rgba(90, 220, 160, 0.2) 58%, transparent 78%)',
              filter: 'blur(45px)'
            }}
          ></div>

          <div 
            className="absolute left-1/2 -bottom-[560px] -translate-x-1/2 w-[380px] h-[380px] pointer-events-none opacity-100"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(217, 217, 217, 0.6) 17%, rgba(94, 163, 122, 0.7) 46%, rgba(5, 124, 53, 0.5) 71%, rgba(0, 0, 0, 1) 100%)',
              filter: 'blur(50.88px)'
            }}
          ></div>

          {/* Glass content */}
          <h2 
            className="text-[clamp(2rem,5vw,4rem)] mb-6 text-center bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            What is B³?
          </h2>

          <p 
            className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto mb-4 text-center bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            B³ (Block. Build. Break.) is a 24-hour Web3 hackathon where teams transform existing Web2 projects into decentralized Web3 solutions.
          </p>

          <p 
            className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto text-center bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 63.33%, rgba(213, 213, 213, 0.6) 78.61%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Participants migrate architecture, integrate blockchain protocols, and rework security and scalability for Web3.
          </p>
        </div>
      </div>
    </div>
    </main>
  );
}