import DeviceSwitcher from './DeviceSwitcher'
import FilterToggle from './FilterToggle'

export default function TopControls({ previewMode, onPreviewModeChange, onFilterToggle }) {
  return (
    <div className="flex items-center justify-center border-b border-[var(--dark)]/15 bg-[var(--bg)] px-4 py-3">
      <div className="flex items-center gap-3">
        <FilterToggle onClick={onFilterToggle} />
        <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
      </div>
    </div>
  )
}
