import TagButton from '../common/TagButton'
import { PLOT_SIZE_OPTIONS } from '../common/filterOptions'

export default function PlotSizeFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLOT_SIZE_OPTIONS.map((size) => (
        <TagButton
          key={size}
          label={size}
          selected={selected.includes(size)}
          onClick={() => onToggle(size)}
        />
      ))}
    </div>
  )
}
