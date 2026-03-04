export default function ResultsSection({ results }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[7px] border border-[#322822]/10 bg-gradient-to-b from-[#EAE3D7] to-[#EAE3D7]/80 shadow-xl shadow-[#322822]/5 transition-all duration-300 hover:shadow-[#322822]/10">
      
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#322822]/10 blur-[40px] pointer-events-none" />

      {/* Close Button - Small 5px radius, frosted glass effect */}
      <button
        type="button"
        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-[5px] border border-[#322822]/5 bg-[#FFFFFF]/60 text-[#322822]/50 backdrop-blur-md transition-all duration-200 hover:bg-[#FFFFFF] hover:text-[#322822] hover:shadow-sm"
        aria-label="Close"
      >
        <svg 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-8 text-center">
        
        {/* Status Badge - 5px radius, normal text casing */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-[5px] border border-[#322822]/20 bg-[#322822]/5 px-3 py-1 shadow-inner">
          <span className="text-sm">🎉</span>
          <span className="text-sm font-medium text-[#322822]">
            Great! We found
          </span>
        </div>

        {/* Hero Number - Dark earthy color with subtle gradient drop-off */}
        <p className="bg-gradient-to-br from-[#322822] to-[#322822]/70 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent drop-shadow-sm">
          {results.length}
        </p>

        {/* Subtitle - Normal casing, beautifully weighted */}
        <p className="mt-2 text-lg font-medium text-[#322822]/60">
          Projects in total
        </p>
      </div>
    </div>
  );
}
