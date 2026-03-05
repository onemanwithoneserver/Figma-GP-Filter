export default function ResultsSection({ results, variant = 'inline' }) {
 if (variant === 'mobile') {
 return (
 <div className="flex flex-col gap-1.5">
 {/* Results banner */}
 <div className="rounded-[5px] border border-[#FF6A00]/10 bg-linear-to-b from-[#FF6A00]/[0.02] to-[#FF6A00]/[0.06] px-3 py-2 text-center">
 <div className="flex items-center justify-center gap-1.5">
 <span className="text-[12px] leading-none" role="img" aria-hidden="true">⭐</span>
 <span className="text-[10px] font-medium tracking-wide text-[#1E1E1E]">We Found</span>
 </div>
 <p className="text-[20px] font-bold leading-tight tracking-tight text-[#FF6A00]">
 {results.length} Projects
 </p>
 <p className="text-[9px] font-medium text-[#1E1E1E]">Based on your filters</p>
 </div>

 {/* Action buttons */}
 <div className="flex items-center gap-1">
 <button
 type="button"
 className="flex-1 rounded-[5px] border border-[#1E1E1E] bg-white px-2 py-1.5 text-[10.5px] font-semibold text-[#1E1E1E] transition-all hover:border-[#1E1E1E]/8 hover:text-[#1E1E1E]"
 >
 Clear All
 </button>
 <button
 type="button"
 className="flex-1 rounded-[5px] border border-[#1E1E1E] bg-white px-2 py-1.5 text-[10.5px] font-semibold text-[#1E1E1E] transition-all hover:border-[#1E1E1E]/8 hover:text-[#1E1E1E]"
 >
 Save Search
 </button>
 <button
 type="button"
 className="flex-[1.3] rounded-[5px] bg-[#FF6A00] px-2 py-1.5 text-[10.5px] font-bold text-white transition-all hover:bg-[#E85F00]"
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
 className="rounded-[5px] border border-[#1E1E1E]/8 bg-white px-3.5 py-1.5 text-[10.5px] font-semibold text-[#1E1E1E] transition-all hover:border-[#1E1E1E]/8 hover:text-[#1E1E1E]"
 >
 Clear All
 </button>
 <button
 type="button"
 className="rounded-[5px] border border-[#1E1E1E]/8 bg-white px-3.5 py-1.5 text-[10.5px] font-semibold text-[#1E1E1E] transition-all hover:border-[#1E1E1E]/8 hover:text-[#1E1E1E]"
 >
 Save Search
 </button>
 <button
 type="button"
 className="ml-auto rounded-[5px] bg-[#FF6A00] px-5 py-1.5 text-[10.5px] font-bold text-white transition-all hover:bg-[#E85F00]"
 >
 Show {results.length} Properties
 </button>
 </div>
 )
 }

 return (
 <div className="flex h-full min-w-16 flex-col items-center justify-center rounded-[6px] border border-[#1E1E1E] bg-[#1E1E1E] px-2 py-1">
 <span className="text-[30px] font-bold leading-none text-[#ffffff]">
 {results.length}
 </span>
 <span className="text-[11px] font-semibold leading-none text-[#ffffff]">
 Projects
 </span>
 </div>
 )
}
