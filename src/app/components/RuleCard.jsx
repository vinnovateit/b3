export default function RuleCard({ icon: Icon, title, desc }) {
  return (
    <div className="relative group">
      <svg
        viewBox="0 0 400 260"
        className="
          absolute 
          inset-0 
          w-full 
          h-full 
          transition-all
          duration-300
          group-hover:scale-[1.02]
          group-hover:drop-shadow-[0_0_20px_rgba(12,172,79,0.2)]
        "
        preserveAspectRatio="none"
      >
        <path
          d="
            M40 0
            H150
            C170 0 175 40 200 40
            H360
            C382 40 400 58 400 80
            V220
            C400 242 382 260 360 260
            H40
            C18 260 0 242 0 220
            V40
            C0 18 18 0 40 0
            Z
          "
          className="
            fill-[#18181b] 
            stroke-[#e5e7eb1a] 
            transition-all 
            duration-300 
            group-hover:fill-[#0a1a0f] 
            group-hover:stroke-[#0CAC4F]
          "
          strokeWidth="1.5"
        />
      </svg>

      {/* card ka content */}
      <div className="relative p-7 h-[260px] w-full text-left">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0CAC4F1A] mb-6">
          {Icon && (
            <img 
              src={Icon} 
              alt="" 
              className="w-6 h-6 object-contain"
              style={{ 
                filter: 'invert(48%) sepia(79%) saturate(541%) hue-rotate(92deg) brightness(95%) contrast(92%)' 
              }}
            />
          )}
        </div>

        <h3 className="text-xl font-semibold text-white transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 mt-3 leading-relaxed">
          {desc}
        </p>
      </div>

    </div>
  );
}