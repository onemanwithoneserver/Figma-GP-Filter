import TagButton from '../common/TagButton'
import { PROJECT_STATUS_OPTIONS } from '../common/filterOptions'

export default function ProjectStatusFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROJECT_STATUS_OPTIONS.map((status) => (
        <TagButton
          key={status}
          label={status}
          selected={selected.includes(status)}
          onClick={() => onToggle(status)}
        />
      ))}
    </div>
  )
}
