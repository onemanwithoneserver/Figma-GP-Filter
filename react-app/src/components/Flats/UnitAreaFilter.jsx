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

      <span className="hidden text-[10px] text-[#322822]/20 lg:block">–</span>

      <div className="grid grid-cols-2 gap-1">
        <input
          value={areaMin}
          onChange={(event) => onAreaMinChange(event.target.value)}
          placeholder="Min Sft"
          className="rounded-[7px] border border-[#322822]/8 bg-white px-2 py-[5px] text-[10.5px] text-[#322822] shadow-[0_1px_2px_rgba(50,40,34,0.03)] outline-none placeholder:text-[#322822]/30 focus:border-[#E65100]/35 focus:shadow-[0_0_0_3px_rgba(230,81,0,0.04)]"
        />
        <input
          value={areaMax}
          onChange={(event) => onAreaMaxChange(event.target.value)}
          placeholder="Max Sft"
          className="rounded-[7px] border border-[#322822]/8 bg-white px-2 py-[5px] text-[10.5px] text-[#322822] shadow-[0_1px_2px_rgba(50,40,34,0.03)] outline-none placeholder:text-[#322822]/30 focus:border-[#E65100]/35 focus:shadow-[0_0_0_3px_rgba(230,81,0,0.04)]"
        />
      </div>
    </div>
  )
}

