import { CalendarClock, TimerReset } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PROJECT_STATUS_OPTIONS, PROPERTY_AGE_OPTIONS } from '../common/filterOptions'

export default function ProjectStatusFilter({ selected, onToggle, propertyAges = [], onTogglePropertyAge }) {
  return (
    <div className="flex flex-col gap-7 pt-1">
      {/* Handover Timeline Section */}
      <div className="flex flex-col gap-3.5">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <TimerReset size={16} className="text-[#322822]/50" />
          <span className="text-[13px] font-bold text-[#322822]/70">
            Handover timeline
          </span>
        </div>

        {/* Timeline Tags (Includes "Ready to Move" alongside other options) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {PROJECT_STATUS_OPTIONS.map((status) => (
            <TagButton
              key={status}
              label={status}
              selected={selected.includes(status)}
              onClick={() => onToggle(status)}
            />
          ))}
        </div>
      </div>

      {/* Property Age Section */}
      <div className="flex flex-col gap-3.5">
        {/* Section Header */}
        <div className="flex items-center gap-2">
          <CalendarClock size={16} className="text-[#322822]/50" />
          <span className="text-[13px] font-bold text-[#322822]/70">
            Property age
          </span>
        </div>

        {/* Property Age Tags */}
        <div className="flex flex-wrap items-center gap-2.5">
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
