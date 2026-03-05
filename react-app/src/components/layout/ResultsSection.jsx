import { Star } from 'lucide-react'

export default function ResultsSection({ results, variant = 'inline' }) {
 if (variant === 'mobile') {
 return (
 <div className="flex flex-col gap-1.5">
 {/* Results banner */}
 <div className="rounded-[7px] border border-[#D94F00]/10 bg-linear-to-b from-[#D94F00]/[0.02] to-[#D94F00]/[0.06] px-3 py-2 text-center">
 <div className="flex items-center justify-center gap-1.5">
 <Star size={12} className="fill-[#D94F00] text-[#D94F00]" />
 <span className="text-[10px] font-medium tracking-wide text-[#2A221C]">We Found</span>
 </div>
 <p className="font-['Outfit'] text-[20px] font-bold leading-tight tracking-tight text-[#D94F00]">
 {results.length} Projects
 </p>
 <p className="text-[9px] font-medium text-[#2A221C]">Based on your filters</p>
 </div>

 {/* Action buttons */}
 <div className="flex items-center gap-1">
 <button
 type="button"
 className="flex-1 rounded-[7px] border border-[#2A221C]/80 bg-white px-2 py-[6px] text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/8 hover:text-[#2A221C]"
 >
 Clear All
 </button>
 <button
 type="button"
 className="flex-1 rounded-[7px] border border-[#2A221C]/80 bg-white px-2 py-[6px] text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/8 hover:text-[#2A221C]"
 >
 Save Search
 </button>
 <button
 type="button"
 className="flex-[1.3] rounded-[7px] bg-[#EE5500] px-2 py-[6px] text-[10.5px] font-bold text-white transition-all hover:bg-[#D94F00]"
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
 className="rounded-[7px] border border-[#2A221C]/8 bg-white px-3.5 py-[6px] text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/8 hover:text-[#2A221C]"
 >
 Clear All
 </button>
 <button
 type="button"
 className="rounded-[7px] border border-[#2A221C]/8 bg-white px-3.5 py-[6px] text-[10.5px] font-semibold text-[#2A221C] transition-all hover:border-[#2A221C]/8 hover:text-[#2A221C]"
 >
 Save Search
 </button>
 <button
 type="button"
 className="ml-auto rounded-[7px] bg-[#EE5500] px-5 py-[6px] text-[10.5px] font-bold text-white transition-all hover:bg-[#D94F00]"
 >
 Show {results.length} Properties
 </button>
 </div>
 )
 }

 return (
 <div className="flex flex-col items-center">
 <span className="font-['Outfit'] text-[20px] font-bold leading-tight text-[#EE5500]">
 {results.length}
 </span>
 <span className="text-[10px] font-semibold leading-none text-[#2A221C]">
 Projects
 </span>
 </div>
 )
}
