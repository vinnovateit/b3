import RuleCard from "./RuleCard";
import TeamCompositionIcon from "@/public/svgs/people_alt.svg";
import FreshCodeIcon from "@/public/svgs/code.svg";
import SubmissionIcon from "@/public/svgs/backup.svg";


export default function RulesSection() {
  const rules = [
    {
      icon: TeamCompositionIcon.src,
      title: "Web3 for Good: Build What Matters",
      desc: "Use blockchain to solve real-world problems in sustainability, governance, healthcare, finance inclusion, and social impact. Turn decentralisation into real change.",
    },
    {
      icon: FreshCodeIcon.src,
      title: "Dev Tools & Infrastructure: Build for Builders",
      desc: "Create tools, frameworks, SDKs, analytics, or platforms that make Web3 faster, safer, and easier to build on. Because great ecosystems need great tooling.",
    },
    {
      icon: SubmissionIcon.src,
      title: "Web3 x AI: Where Intelligence Meets Decentralisation",
      desc: "Blend AI with blockchain to build smarter dApps, autonomous systems, fraud detection, data markets, and beyond. The future runs on both trust and intelligence.",
    },

  ];

  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden isolate bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute left-1/2 top-[-10px] -translate-x-1/2 w-[1100px] h-[750px]"
          style={{
            background: `linear-gradient(to bottom, 
              #8CFF84 10%, 
              #0CAC4F 25%, 
              #0E773999 30%
            )`,
            WebkitMaskImage: `
              radial-gradient(ellipse at 50% 50%, 
                transparent 50%, 
                black 68%, 
                black 60%, 
                transparent 55%
              ),
              linear-gradient(to bottom, 
                black 0%, 
                black 25%, 
                transparent 50%
              )
            `,
            maskImage: `
              radial-gradient(ellipse at 50% 50%, 
                transparent 45%, 
                black 46%, 
                black 54%, 
                transparent 55%
              ),
              linear-gradient(to bottom, 
                black 0%, 
                black 30%, 
                transparent 45%
              )
            `,
            WebkitMaskComposite: "destination-in",
            maskComposite: "intersect",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-semibold mt-6 text-white">
            Tracks
        </h1>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          You can choose any of these tracks to compete in.
        </p>

        <div className="group/grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-12 max-w-6xl mx-auto justify-items-center">
          {rules.map((rule, i) => (
            <div
              key={i}
              className="
                group/card
                relative w-full max-w-[420px] md:max-w-[480px]
                transition-all duration-300 ease-out
                group-hover/grid:[&:not(:hover)]:blur-[2px]
                group-hover/grid:[&:not(:hover)]:opacity-80
                hover:blur-0 hover:opacity-100 hover:scale-[1.1]
                before:pointer-events-none before:absolute before:inset-[-10px]
                before:rounded-[28px] before:opacity-0 before:transition-opacity before:duration-300
                group-hover/grid:[&:not(:hover)]:before:opacity-70 hover:before:opacity-0
                before:blur-[18px] before:bg-[radial-gradient(circle_at_50%_30%,rgba(12,172,79,0.35),transparent_70%)]
              "
            >
              <RuleCard
                {...rule}
                height="clamp(300px, 32vw, 380px)"
                viewBoxHeight={360}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}