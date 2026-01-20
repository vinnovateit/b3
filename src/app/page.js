export default function Home() {
  return (
  <main className="scene">

    {/* <!-- Scene root --> */}
    <div className="scene">

        {/* <!-- Triangle gradient wrapper --> */}
        <div className="triangle-wrapper">
            <div className="triangle-canvas">
                <div className="triangle-center-glow"></div>
                <div className="triangle-top-wing"></div>
                <div className="triangle-inner-wing"></div>
                <div className="triangle-pillar"></div>
                <div className="triangle-bottom-glow"></div>
            </div>
        </div>


        {/* <!-- Ellipse system --> */}
        <div className="ellipse-system">
            <div className="ellipse-layer layer-1">
                {/* <!-- LEFT ellipses --> */}
                <div className="ellipse-group left">
                    <span className="ellipse e1"></span>
                    <span className="ellipse e2"></span>
                    <span className="ellipse e3"></span>
                    <span className="ellipse e4"></span>
                    <span className="ellipse e5"></span>
                </div>
                {/* <!-- RIGHT ellipses --> */}
                <div className="ellipse-group right">
                    <span className="ellipse e1"></span>
                    <span className="ellipse e2"></span>
                    <span className="ellipse e3"></span>
                    <span className="ellipse e4"></span>
                    <span className="ellipse e5"></span>
                </div>
            </div>

            <div className="ellipse-layer layer-2">
                {/* <!-- LEFT ellipses --> */}
                <div className="ellipse-group left">
                    <span className="ellipse e21"></span>
                    <span className="ellipse e22"></span>
                    <span className="ellipse e23"></span>
                    <span className="ellipse e24"></span>
                    <span className="ellipse e25"></span>
                </div>
                {/* <!-- RIGHT ellipses --> */}
                <div className="ellipse-group right">
                    <span className="ellipse e21"></span>
                    <span className="ellipse e22"></span>
                    <span className="ellipse e23"></span>
                    <span className="ellipse e24"></span>
                    <span className="ellipse e25"></span>
                </div>
            </div>

            <div className="ellipse-layer layer-3">
                {/* <!-- LEFT ellipses --> */}
                <div className="ellipse-group left">
                    <span className="ellipse e31"></span>
                    <span className="ellipse e32"></span>
                    <span className="ellipse e33"></span>
                    <span className="ellipse e34"></span>
                    <span className="ellipse e35"></span>
                </div>
                {/* <!-- RIGHT ellipses --> */}
                <div className="ellipse-group right">
                    <span className="ellipse e31"></span>
                    <span className="ellipse e32"></span>
                    <span className="ellipse e33"></span>
                    <span className="ellipse e34"></span>
                    <span className="ellipse e35"></span>
                </div>
            </div>
        </div>

        {/* <!-- Hero text stack --> */}
        <div className="hero-text">
        <h1>B<sup>3</sup></h1>
        <p>Build. Block. Break.</p>
        </div>
        <div className="btn-wrap">
            <button className="hero-btn">Explore Tracks</button>
        </div>

    {/* <!-- Glass morph block --> */}
        <div className="glass">
        {/* <!-- Attached ambients --> */}
            <div className="glass-ambient top-left"></div>
            <div className="glass-ambient bottom-right"></div>
            <div className="glass-ambient below"></div>
            {/* <!-- Glass content --> */}
            <h2 className="text-[clamp(2rem,5vw,4rem)] mb-6 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            What is B³?
          </h2>

          <p className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto mb-4 text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            B³ (Block. Build. Break.) is a 24-hour Web3 hackathon where teams transform existing Web2 projects into decentralized Web3 solutions.
          </p>

          <p className="text-[clamp(1rem,3vw,1.5rem)] max-w-4xl mx-auto text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Participants migrate architecture, integrate blockchain protocols, and rework security and scalability for Web3.
          </p>
        </div>
  </div>
</main>
  );
}
