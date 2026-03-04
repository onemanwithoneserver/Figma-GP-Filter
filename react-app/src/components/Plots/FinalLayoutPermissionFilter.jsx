import TagButton from '../common/TagButton'
import { PLOT_FINAL_PERMISSION_OPTIONS } from '../common/filterOptions'

export default function FinalLayoutPermissionFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLOT_FINAL_PERMISSION_OPTIONS.map((item) => (
        <TagButton
          key={item}
          label={item}
          selected={selected.includes(item)}
          onClick={() => onToggle(item)}
        />
      ))}
    </div>
  )
}
