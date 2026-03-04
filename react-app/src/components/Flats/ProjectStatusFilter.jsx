import { CalendarClock, Home, TimerReset } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PROJECT_STATUS_OPTIONS, PROPERTY_AGE_OPTIONS } from '../common/filterOptions'

const HANDOVER_OPTIONS = PROJECT_STATUS_OPTIONS.filter((option) => option !== 'Ready to Move')

export default function ProjectStatusFilter({ selected, onToggle, propertyAges = [], onTogglePropertyAge }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Home size={14} className="text-[var(--dark)]/60" />
        <TagButton
          label="Ready to Move"
          selected={selected.includes('Ready to Move')}
          onClick={() => onToggle('Ready to Move')}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <TimerReset size={14} />
          Handover Timeline
        </div>
        <div className="flex flex-wrap gap-2">
          {HANDOVER_OPTIONS.map((status) => (
            <TagButton
              key={status}
              label={status}
              selected={selected.includes(status)}
              onClick={() => onToggle(status)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <CalendarClock size={14} />
          Property Age
        </div>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_AGE_OPTIONS.map((age) => (
            <TagButton
              key={age}
              label={age}
              selected={propertyAges.includes(age)}
              onClick={() => onTogglePropertyAge(age)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
