import { Home, LandPlot, Scale } from 'lucide-react'
import TagButton from '../common/TagButton'

const VILLA_CONFIGURATION_OPTIONS = ['2BHK', '3BHK', '4BHK', '5BHK', '6BHK']

export default function ConfigurationFilter({
  selected,
  onToggle,
  plotMin,
  plotMax,
  onPlotMinChange,
  onPlotMaxChange,
  builtupMin,
  builtupMax,
  onBuiltupMinChange,
  onBuiltupMaxChange,
}) {
  return (
    <div className="grid gap-2 lg:grid-cols-3">
      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/55">
          <Home size={10} />
          Configuration
        </div>
        <div className="flex flex-wrap gap-1">
          {VILLA_CONFIGURATION_OPTIONS.map((config) => (
            <TagButton
              key={config}
              label={config}
              selected={selected.includes(config)}
              onClick={() => onToggle(config)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/55">
          <LandPlot size={10} />
          Plot Size (Sq.Yd)
        </div>
        <div className="grid grid-cols-2 gap-1">
          <input
            value={plotMin}
            onChange={(event) => onPlotMinChange(event.target.value)}
            placeholder="Min"
            className="rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[var(--dark)]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
          />
          <input
            value={plotMax}
            onChange={(event) => onPlotMaxChange(event.target.value)}
            placeholder="Max"
            className="rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[var(--dark)]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
          />
        </div>
      </div>

      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/55">
          <Scale size={10} />
          Builtup Area (Sft)
        </div>
        <div className="grid grid-cols-2 gap-1">
          <input
            value={builtupMin}
            onChange={(event) => onBuiltupMinChange(event.target.value)}
            placeholder="Min"
            className="rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[var(--dark)]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
          />
          <input
            value={builtupMax}
            onChange={(event) => onBuiltupMaxChange(event.target.value)}
            placeholder="Max"
            className="rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] outline-none placeholder:text-[var(--dark)]/28 transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]"
          />
        </div>
      </div>
    </div>
  )
}
