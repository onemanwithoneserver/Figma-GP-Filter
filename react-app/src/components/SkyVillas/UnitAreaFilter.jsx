import { Ruler, Scale } from 'lucide-react'
import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({ selected, onToggle, areaMin, areaMax, onAreaMinChange, onAreaMaxChange }) {
  return (
    <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/55">
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

      <span className="hidden text-[10px] text-[var(--dark)]/18 lg:block">–</span>

      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/55">
          <Scale size={10} />
          Unit Area (Sft)
        </div>
        <div className="grid grid-cols-2 gap-1">
          <input
            value={areaMin}
            onChange={(event) => onAreaMinChange(event.target.value)}
            placeholder="Min Sft"
            className="rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[var(--dark)]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
          />
          <input
            value={areaMax}
            onChange={(event) => onAreaMaxChange(event.target.value)}
            placeholder="Max Sft"
            className="rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[var(--dark)]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
          />
        </div>
      </div>
    </div>
  )
}
