import { FileBadge } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PLOT_FINAL_PERMISSION_OPTIONS } from '../common/filterOptions'

export default function FinalLayoutPermissionFilter({ selected, onToggle }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
        <FileBadge size={14} />
        Final Layout Permission
      </div>
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
    </div>
  )
}
