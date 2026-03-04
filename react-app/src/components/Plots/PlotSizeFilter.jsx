import { LandPlot, Route } from 'lucide-react'
import { ORR_DISTANCE_OPTIONS } from '../common/filterOptions'

export default function PlotSizeFilter({
  plotMin,
  plotMax,
  onPlotMinChange,
  onPlotMaxChange,
  orrDistance,
  onOrrDistanceChange,
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-end">
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <LandPlot size={14} />
          Plot Size (Sq.Yd)
        </div>
        <input
          value={plotMin}
          onChange={(event) => onPlotMinChange(event.target.value)}
          placeholder="Min (×50)"
          className="w-full rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
        />
      </div>

      <span className="hidden text-sm text-[var(--dark)]/50 lg:block">-</span>

      <div>
        <div className="mb-2 text-xs font-semibold text-transparent">spacer</div>
        <input
          value={plotMax}
          onChange={(event) => onPlotMaxChange(event.target.value)}
          placeholder="Max (×50)"
          className="w-full rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
        />
      </div>

      <span className="hidden text-sm text-[var(--dark)]/50 lg:block">-</span>

      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <Route size={14} />
          Distance from ORR
        </div>
        <select
          value={orrDistance}
          onChange={(event) => onOrrDistanceChange(event.target.value)}
          className="w-full rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)] outline-none"
        >
          <option value="">Select</option>
          {ORR_DISTANCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
