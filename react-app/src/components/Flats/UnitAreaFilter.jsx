import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function UnitAreaFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {UNIT_SIZE_OPTIONS.map((unit) => (
        <TagButton
          key={unit}
          label={unit}
          selected={selected.includes(unit)}
          onClick={() => onToggle(unit)}
        />
      ))}
    </div>
  )
}
