import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({ selected, onToggle, areaMin, areaMax, onAreaMinChange, onAreaMaxChange }) {
  return (
    <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
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

      <span className="hidden text-[10px] text-[#2A2118]/18 lg:block">–</span>

      <div className="grid grid-cols-2 gap-1">
        <input
          value={areaMin}
          onChange={(event) => onAreaMinChange(event.target.value)}
          placeholder="Min Sft"
          className="rounded-[7px] border border-[#2A2118]/8 bg-white px-2 py-[5px] text-[10.5px] text-[#2A2118] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[#2A2118]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
        />
        <input
          value={areaMax}
          onChange={(event) => onAreaMaxChange(event.target.value)}
          placeholder="Max Sft"
          className="rounded-[7px] border border-[#2A2118]/8 bg-white px-2 py-[5px] text-[10.5px] text-[#2A2118] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[#2A2118]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
        />
      </div>
    </div>
  )
}

