export default function RangeInput({ minLabel = 'Min', maxLabel = 'Max' }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <select className="rounded-lg border border-[var(--dark)]/25 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)]">
        <option>{minLabel}</option>
      </select>
      <select className="rounded-lg border border-[var(--dark)]/25 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)]">
        <option>{maxLabel}</option>
      </select>
    </div>
  )
}
