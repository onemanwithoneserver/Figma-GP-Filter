export default function RangeInput({ minLabel = 'Min', maxLabel = 'Max' }) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <select className="rounded-[7px] border border-[var(--dark)]/10 bg-[var(--white)] px-2 py-1 text-[11px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]">
        <option>{minLabel}</option>
      </select>
      <select className="rounded-[7px] border border-[var(--dark)]/10 bg-[var(--white)] px-2 py-1 text-[11px] text-[var(--dark)] shadow-[0_1px_2px_rgba(42,33,24,0.04)] transition-all focus:border-[#D94F00]/35 focus:shadow-[0_0_0_3px_rgba(217,79,0,0.06)]">
        <option>{maxLabel}</option>
      </select>
    </div>
  )
}
