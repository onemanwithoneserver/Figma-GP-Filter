import { Ruler, Scale } from 'lucide-react'
import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({ selected, onToggle, areaMin, areaMax, onAreaMinChange, onAreaMaxChange, isMobile = false }) {
 return (
 <div className={isMobile ? 'grid gap-2 grid-cols-1' : 'grid gap-2 lg:grid-cols-[1fr_auto_1fr] lg:items-end'}>
 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]">
 <Ruler size={10} />
 Configuration
 </div>
 <div className="flex flex-wrap gap-1">
 {UNIT_SIZE_OPTIONS.map((unit) => (
 <TagButton
 key={unit}
 label={unit}
 selected={selected.includes(unit)}
 onClick={() => onToggle(unit)}
 />
 ))}
 </div>
 </div>

 <span className={isMobile ? 'hidden' : 'hidden text-[10px] text-[var(--dark)] lg:block'}>–</span>

 <div>
 <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]">
 <Scale size={10} />
 Unit Area (Sft)
 </div>
 <div className={isMobile ? 'grid grid-cols-1 gap-1' : 'grid grid-cols-1 gap-1 sm:grid-cols-2'}>
 <input
 value={areaMin}
 onChange={(event) => onAreaMinChange(event.target.value)}
 placeholder="Min Sft"
 className="rounded-[5px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] outline-none placeholder:text-[var(--dark)] transition-all focus:border-[#D94F00]/35"
 />
 <input
 value={areaMax}
 onChange={(event) => onAreaMaxChange(event.target.value)}
 placeholder="Max Sft"
 className="rounded-[5px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] outline-none placeholder:text-[var(--dark)] transition-all focus:border-[#D94F00]/35"
 />
 </div>
 </div>
 </div>
 )
}
