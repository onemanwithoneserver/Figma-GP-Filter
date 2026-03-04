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
    <div className="grid gap-3 lg:grid-cols-3">
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <Home size={14} />
          Configuration
        </div>
        <div className="flex flex-wrap gap-2">
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
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <LandPlot size={14} />
          Plot Size (Sq.Yd)
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={plotMin}
            onChange={(event) => onPlotMinChange(event.target.value)}
            placeholder="Min (×50)"
            className="rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
          />
          <input
            value={plotMax}
            onChange={(event) => onPlotMaxChange(event.target.value)}
            placeholder="Max (×50)"
            className="rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <Scale size={14} />
          Builtup Area (Sft)
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={builtupMin}
            onChange={(event) => onBuiltupMinChange(event.target.value)}
            placeholder="Min (×100)"
            className="rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
          />
          <input
            value={builtupMax}
            onChange={(event) => onBuiltupMaxChange(event.target.value)}
            placeholder="Max (×100)"
            className="rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
          />
        </div>
      </div>
    </div>
  )
}
