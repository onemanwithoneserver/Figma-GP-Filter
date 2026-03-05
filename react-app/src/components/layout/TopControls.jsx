import DeviceSwitcher from './DeviceSwitcher'

export default function TopControls({ previewMode, onPreviewModeChange }) {
 return (
 <div className="flex items-center justify-center px-3 py-1">
 <div className="rounded-[6px] border border-[#2A221C]/8 bg-[#F7F4F0]/85 p-1 shadow-[0_1px_2px_rgba(42,34,28,0.06)]">
 <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
 </div>
 </div>
 )
}
