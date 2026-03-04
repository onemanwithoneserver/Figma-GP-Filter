import { CalendarClock, TimerReset } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PROJECT_STATUS_OPTIONS, PROPERTY_AGE_OPTIONS } from '../common/filterOptions'

export default function ProjectStatusFilter({ selected, onToggle, propertyAges = [], onTogglePropertyAge }) {
  return (
    <div className="flex flex-col gap-2.5 pt-0.5">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <TimerReset size={11} className="text-[#2A2118]/35" />
          <span className="text-[10px] font-semibold tracking-wide text-[#2A2118]/55">Handover Timeline</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {PROJECT_STATUS_OPTIONS.map((status) => (
            <TagButton key={status} label={status} selected={selected.includes(status)} onClick={() => onToggle(status)} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <CalendarClock size={11} className="text-[#2A2118]/35" />
          <span className="text-[10px] font-semibold tracking-wide text-[#2A2118]/55">Property Age</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {PROPERTY_AGE_OPTIONS.map((age) => (
            <TagButton key={age} label={age} selected={propertyAges.includes(age)} onClick={() => onTogglePropertyAge(age)} />
          ))}
        </div>
      </div>
    </div>
  )
}
