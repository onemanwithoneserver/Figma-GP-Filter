export default function RangeInput({ minLabel = 'Min', maxLabel = 'Max' }) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <select className="rounded-[7px] border border-[var(--dark)]/12 bg-[var(--white)] px-2 py-1 text-[11px] text-[var(--dark)]">
        <option>{minLabel}</option>
      </select>
      <select className="rounded-[7px] border border-[var(--dark)]/12 bg-[var(--white)] px-2 py-1 text-[11px] text-[var(--dark)]">
        <option>{maxLabel}</option>
      </select>
    </div>
  )
}
