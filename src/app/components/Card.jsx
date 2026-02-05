'use client'

export default function Card({ isActive = false, index = 1, data = {} }) {
  const borderRadius = isActive ? "40px" : "70px";

  return (
    <div className="shrink-0 font-sans">
      <div
        className="p-0.5 transition-all duration-700 ease-in-out"
        style={{
          borderRadius: borderRadius,
          background: isActive
            ? "#000000"
            : "linear-gradient(180deg, #444444 0%, #222222 100%)",
          boxShadow: isActive ? "0px 3px 20px 0px #32AD3480" : "0px 3px 9px 0px #32AD3440",
        }}
      >
        <div
          className="relative flex flex-col items-center transition-all duration-700 ease-in-out overflow-hidden"
          style={{
            // Forced consistent width for all active cards
            width: isActive ? "clamp(350px, 85vw, 500px)" : "clamp(60px, 10vw, 140px)",
            height: "clamp(350px, 60vh, 460px)",
            borderRadius: isActive ? "38px" : "68px",
            background: "#000000",
          }}
        >
          {/* IMAGE SECTION - Only for regular cards */}
          {isActive && data.image && !data.isEnd && (
            <div className="w-full h-[40%] relative mt-6 px-6 transition-all duration-500 delay-750 ease-out opacity-100 scale-100">
               <img 
                src={data.image} 
                alt={data.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* COLLAPSED INDEX */}
          <span 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 font-sans font-medium ${isActive ? 'opacity-0 scale-50' : 'opacity-20 scale-100'}`}
            style={{ color: "white", fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {index}
          </span>

          {/* TEXT CONTENT - Flexbox handles the centering for End cards */}
          <div 
            className={`flex flex-col w-full h-full px-6 md:px-10 transition-all duration-500 ${
              isActive ? 'opacity-100 delay-500 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            } ${data.isEnd ? 'justify-center items-center text-center' : 'justify-start items-start mt-4'}`}
          >
            <h2 className="text-white text-2xl md:text-4xl font-bold font-sans mb-2">
              {data.isEnd ? data.text : data.title}
            </h2>
            
            {!data.isEnd && (
              <>
                <div className="flex items-center gap-2 md:gap-4 text-white/70 text-sm md:text-lg mb-4">
                  <span>{data.date}</span>
                  <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                  <span>{data.time}</span>
                </div>
                {data.description && (
                  <p className="text-white/50 text-base md:text-xl leading-relaxed max-w-[95%]">
                    {data.description}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}