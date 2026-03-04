import { Star } from 'lucide-react'

export default function ResultsSection({ results, variant = 'inline' }) {
  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-1.5">
        {/* Results banner */}
        <div className="rounded-[7px] border border-[#E65100]/10 bg-gradient-to-b from-[#E65100]/[0.03] to-[#E65100]/[0.06] px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Star size={12} className="fill-[#E65100] text-[#E65100]" />
            <span className="text-[10px] font-medium tracking-wide text-[#322822]/50">We Found</span>
          </div>
          <p className="text-[20px] font-extrabold leading-tight tracking-tight text-[#E65100]">
            {results.length} Projects
          </p>
          <p className="text-[9px] font-medium text-[#322822]/35">Based on your filters</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex-1 rounded-[7px] border border-[#322822]/8 bg-white px-2 py-[6px] text-[10.5px] font-semibold text-[#322822]/60 shadow-[0_1px_2px_rgba(50,40,34,0.03)] transition-all hover:border-[#322822]/12 hover:text-[#322822]/80"
          >
            Clear All
          </button>
          <button
            type="button"
            className="flex-1 rounded-[7px] border border-[#322822]/8 bg-white px-2 py-[6px] text-[10.5px] font-semibold text-[#322822]/60 shadow-[0_1px_2px_rgba(50,40,34,0.03)] transition-all hover:border-[#322822]/12 hover:text-[#322822]/80"
          >
            Save Search
          </button>
          <button
            type="button"
            className="flex-[1.3] rounded-[7px] bg-[#E65100] px-2 py-[6px] text-[10.5px] font-bold text-white shadow-[0_1px_4px_rgba(230,81,0,0.2)] transition-all hover:bg-[#D84A00]"
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
          className="rounded-[7px] border border-[#322822]/8 bg-white px-3.5 py-[6px] text-[10.5px] font-semibold text-[#322822]/60 shadow-[0_1px_2px_rgba(50,40,34,0.03)] transition-all hover:border-[#322822]/12 hover:text-[#322822]/80"
        >
          Clear All
        </button>
        <button
          type="button"
          className="rounded-[7px] border border-[#322822]/8 bg-white px-3.5 py-[6px] text-[10.5px] font-semibold text-[#322822]/60 shadow-[0_1px_2px_rgba(50,40,34,0.03)] transition-all hover:border-[#322822]/12 hover:text-[#322822]/80"
        >
          Save Search
        </button>
        <button
          type="button"
          className="ml-auto rounded-[7px] bg-[#E65100] px-5 py-[6px] text-[10.5px] font-bold text-white shadow-[0_1px_4px_rgba(230,81,0,0.2)] transition-all hover:bg-[#D84A00]"
        >
          Show {results.length} Properties
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-[20px] font-extrabold leading-tight text-[#2E7D32]">
        {results.length}
      </span>
      <span className="text-[10px] font-semibold leading-none text-[#322822]/50">
        Projects
      </span>
    </div>
  )
}
