import DeviceSwitcher from './DeviceSwitcher'
import FilterToggle from './FilterToggle'

export default function TopControls({ previewMode, onPreviewModeChange, onFilterToggle }) {
 return (
 <div className="flex items-center justify-center bg-linear-to-b from-[#F7F4F0]/50 to-[#F7F4F0]/20 px-3 py-1.5">
 <div className="flex items-center gap-2">
 <FilterToggle onClick={onFilterToggle} />
 <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
 </div>
 </div>
 )
}
