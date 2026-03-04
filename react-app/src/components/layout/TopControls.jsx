import DeviceSwitcher from './DeviceSwitcher'
import FilterToggle from './FilterToggle'

export default function TopControls({ previewMode, onPreviewModeChange, onFilterToggle }) {
  return (
    <div className="flex items-center justify-center bg-[#F5F1EC]/40 px-3 py-1.5">
      <div className="flex items-center gap-2">
        <FilterToggle onClick={onFilterToggle} />
        <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
      </div>
    </div>
  )
}
