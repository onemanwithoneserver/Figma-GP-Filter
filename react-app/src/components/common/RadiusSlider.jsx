export default function RadiusSlider({ value, onChange }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-semibold text-[var(--dark)]">Radius</label>
        <span className="text-xs font-medium text-[var(--dark)]">{value} km</span>
      </div>
      <input
        type="range"
        min="1"
        max="50"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[var(--primary)]"
      />
    </div>
  )
}
