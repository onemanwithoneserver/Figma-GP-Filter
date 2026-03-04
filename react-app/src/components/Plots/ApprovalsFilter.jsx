import { CheckCircle2 } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PLOT_APPROVAL_OPTIONS } from '../common/filterOptions'

export default function ApprovalsFilter({ selected, onToggle }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
        <CheckCircle2 size={14} />
        Approvals
      </div>
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
    </div>
  )
}
