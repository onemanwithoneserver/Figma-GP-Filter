import { Star } from 'lucide-react'

export default function ResultsSection({ results, variant = 'inline' }) {
  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-1.5">
        {/* Results banner */}
        <div className="rounded-[7px] border border-[#D94F00]/10 bg-gradient-to-b from-[#D94F00]/[0.02] to-[#D94F00]/[0.06] px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Star size={12} className="fill-[#D94F00] text-[#D94F00]" />
            <span className="text-[10px] font-medium tracking-wide text-[#2A2118]/45">We Found</span>
          </div>
          <p className="font-['Outfit'] text-[20px] font-bold leading-tight tracking-tight text-[#D94F00]">
            {results.length} Projects
          </p>
          <p className="text-[9px] font-medium text-[#2A2118]/30">Based on your filters</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex-1 rounded-[7px] border border-[#2A2118]/8 bg-white px-2 py-[6px] text-[10.5px] font-semibold text-[#2A2118]/55 shadow-[0_1px_2px_rgba(42,33,24,0.04)] transition-all hover:border-[#2A2118]/14 hover:text-[#2A2118]/80 hover:shadow-[0_1px_4px_rgba(42,33,24,0.07)]"
          >
            Clear All
          </button>
          <button
            type="button"
            className="flex-1 rounded-[7px] border border-[#2A2118]/8 bg-white px-2 py-[6px] text-[10.5px] font-semibold text-[#2A2118]/55 shadow-[0_1px_2px_rgba(42,33,24,0.04)] transition-all hover:border-[#2A2118]/14 hover:text-[#2A2118]/80 hover:shadow-[0_1px_4px_rgba(42,33,24,0.07)]"
          >
            Save Search
          </button>
          <button
            type="button"
            className="flex-[1.3] rounded-[7px] bg-gradient-to-b from-[#E85A10] to-[#D94F00] px-2 py-[6px] text-[10.5px] font-bold text-white shadow-[0_2px_8px_rgba(217,79,0,0.22),0_1px_3px_rgba(217,79,0,0.10)] transition-all hover:from-[#D94F00] hover:to-[#C24500]"
          >
            Show {results.length} Properties
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'bottom') {
    return (
      <div className="flex items-center gap-1.5 pt-1">
        <button
          type="button"
          className="rounded-[7px] border border-[#2A2118]/8 bg-white px-3.5 py-[6px] text-[10.5px] font-semibold text-[#2A2118]/55 shadow-[0_1px_2px_rgba(42,33,24,0.04)] transition-all hover:border-[#2A2118]/14 hover:text-[#2A2118]/80 hover:shadow-[0_1px_4px_rgba(42,33,24,0.07)]"
        >
          Clear All
        </button>
        <button
          type="button"
          className="rounded-[7px] border border-[#2A2118]/8 bg-white px-3.5 py-[6px] text-[10.5px] font-semibold text-[#2A2118]/55 shadow-[0_1px_2px_rgba(42,33,24,0.04)] transition-all hover:border-[#2A2118]/14 hover:text-[#2A2118]/80 hover:shadow-[0_1px_4px_rgba(42,33,24,0.07)]"
        >
          Save Search
        </button>
        <button
          type="button"
          className="ml-auto rounded-[7px] bg-gradient-to-b from-[#E85A10] to-[#D94F00] px-5 py-[6px] text-[10.5px] font-bold text-white shadow-[0_2px_8px_rgba(217,79,0,0.22),0_1px_3px_rgba(217,79,0,0.10)] transition-all hover:from-[#D94F00] hover:to-[#C24500]"
        >
          Show {results.length} Properties
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <span className="font-['Outfit'] text-[20px] font-bold leading-tight text-[#1B8A3E]">
        {results.length}
      </span>
      <span className="text-[10px] font-semibold leading-none text-[#2A2118]/45">
        Projects
      </span>
    </div>
  )
}
