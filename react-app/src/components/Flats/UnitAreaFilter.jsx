import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({ selected, onToggle, areaMin, areaMax, onAreaMinChange, onAreaMaxChange }) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
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

      <span className="hidden text-sm text-[#322822]/40 lg:block">-</span>

      <div className="grid grid-cols-2 gap-2">
        <input
          value={areaMin}
          onChange={(event) => onAreaMinChange(event.target.value)}
          placeholder="Min (×100)"
          className="rounded-[7px] border border-[#322822]/20 bg-white px-3 py-2 text-sm text-[#322822] shadow-[0_1px_3px_rgba(50,40,34,0.04)] outline-none transition-all duration-200 placeholder:text-[#322822]/40 focus:border-[#322822] focus:shadow-[0_0_0_3px_rgba(50,40,34,0.08)]"
        />
        <input
          value={areaMax}
          onChange={(event) => onAreaMaxChange(event.target.value)}
          placeholder="Max (×100)"
          className="rounded-[7px] border border-[#322822]/20 bg-white px-3 py-2 text-sm text-[#322822] shadow-[0_1px_3px_rgba(50,40,34,0.04)] outline-none transition-all duration-200 placeholder:text-[#322822]/40 focus:border-[#322822] focus:shadow-[0_0_0_3px_rgba(50,40,34,0.08)]"
        />
      </div>
    </div>
  )
}

