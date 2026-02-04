"use client";

export default function Guidelines() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-6 py-20 overflow-hidden">
      
      <div 
        className="
          absolute 
          bottom-10 
          left-10 
          w-[500px] 
          h-[500px] 
          pointer-events-none 
          -z-10
        "
        style={{
          background: `radial-gradient(circle at center, #8CFF84 0%, #0CAC4F 30%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: 0.5
        }}
      />

      {/* a container div to hold shit */}
      <div className="relative w-full max-w-5xl">

        <div className="rounded-2xl bg-[linear-gradient(90deg,#8CFF84,#0EB337,#42D774,#85FFB0)] overflow-hidden">
          <button
            className="
              absolute -top-1 right-0
              pl-16 pr-0 py-3
              text-white font-semibold
              bg-[linear-gradient(#19954B,#0CAC4F)]
              backdrop-blur-md
              border border-green-300/30
              shadow-[0_6px_30px_rgba(34,197,94,0.45)]
              hover:shadow-[0_0_40px_rgba(34,197,94,0.9)]
              transition-all
              rounded-2xl
              w-69
            "
            style={{
              clipPath: "polygon(0% 0, 100% 0, 100% 100%, 29.5% 100%, 0.8% 0%)",
            }}
          >
            Explore Tracks
          </button>
        </div>

        <div
          className="
            relative
            text-white
            p-10
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border border-white/10
            shadow-2xl
            w-full
          "
          style={{
            clipPath: "polygon(0 0, 72% 0, 80% 12%, 100% 12%, 100% 100%, 0 100%)",
          }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-white/90">
            What are the <br /> Guidelines for B³?
          </h2>

          <ol className="space-y-4 text-white/70 leading-relaxed list-decimal list-inside">
            <li>
              VinnovateIT believes strongly in inclusivity. Everyone who wants
              to join the event is welcome. All submissions will be evaluated
              without bias.
            </li>

            <li>
              If you witness any incident violating someone’s rights, reach out
              to the organizing team. Members can be identified via their Core
              or Board ID cards.
            </li>

            <li>
              Reports remain anonymous, and strict action will follow confirmed
              incidents.
            </li>

            <li>
              Online participants can contact organizers through Discord — they
              carry the “VinnovateIT” role.
            </li>

            <li>
              TL;DR: Be respectful to everyone involved. If conduct slips,
              contact the organizing team immediately.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}