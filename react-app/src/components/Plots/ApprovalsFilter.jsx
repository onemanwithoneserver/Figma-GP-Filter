import TagButton from '../common/TagButton'
import { PLOT_APPROVAL_OPTIONS } from '../common/filterOptions'

export default function ApprovalsFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLOT_APPROVAL_OPTIONS.map((approval) => (
        <TagButton
          key={approval}
          label={approval}
          selected={selected.includes(approval)}
          onClick={() => onToggle(approval)}
        />
      ))}
    </div>
  )
}
