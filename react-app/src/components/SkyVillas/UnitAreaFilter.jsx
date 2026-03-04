import { Ruler, Scale } from 'lucide-react'
import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({ selected, onToggle, areaMin, areaMax, onAreaMinChange, onAreaMaxChange }) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <Ruler size={14} />
          Configuration
        </div>
        <div className="flex flex-wrap gap-2">
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

      <span className="hidden text-sm text-[var(--dark)]/50 lg:block">-</span>

      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <Scale size={14} />
          Unit Area (Sft)
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={areaMin}
            onChange={(event) => onAreaMinChange(event.target.value)}
            placeholder="Min (×100)"
            className="rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
          />
          <input
            value={areaMax}
            onChange={(event) => onAreaMaxChange(event.target.value)}
            placeholder="Max (×100)"
            className="rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
          />
        </div>
      </div>
    </div>
  )
}
