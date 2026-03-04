import TagButton from '../common/TagButton'
import { UNIT_SIZE_OPTIONS } from '../common/filterOptions'

export default function ConfigurationFilter({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {UNIT_SIZE_OPTIONS.map((config) => (
        <TagButton
          key={config}
          label={config}
          selected={selected.includes(config)}
          onClick={() => onToggle(config)}
        />
      ))}
    </div>
  )
}
