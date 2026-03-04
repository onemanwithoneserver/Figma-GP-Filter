const DEFAULT_BUDGET_OPTIONS = [
  { label: 'Min', value: '' },
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
]

export default function BudgetFilter({
  mode,
  min,
  max,
  onModeChange,
  onMinChange,
  onMaxChange,
  perLabel = 'Per SqFt',
  overallLabel = 'Overall Budget',
  unit = 'x100',
  options = DEFAULT_BUDGET_OPTIONS,
}) {
  return (
    <div>
      <div className="mb-3 inline-flex rounded-[5px] border border-[var(--dark)]/20 bg-[var(--white)] p-1">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-[5px] px-3 py-1.5 text-xs font-medium ${
            mode === 'per' ? 'bg-[var(--primary)] text-[var(--white)]' : 'text-[var(--dark)]'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-[5px] px-3 py-1.5 text-xs font-medium ${
            mode === 'overall' ? 'bg-[var(--primary)] text-[var(--white)]' : 'text-[var(--dark)]'
          }`}
        >
          {overallLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <select
          value={min}
          onChange={(event) => onMinChange(event.target.value)}
          className="rounded-[5px] border border-[var(--dark)]/25 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)]"
        >
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label ? `${option.label}${option.value ? ` (${unit})` : ''}` : 'Min'}
            </option>
          ))}
        </select>

        <select
          value={max}
          onChange={(event) => onMaxChange(event.target.value)}
          className="rounded-[5px] border border-[var(--dark)]/25 bg-[var(--white)] px-3 py-2 text-sm text-[var(--dark)]"
        >
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label ? `${option.label}${option.value ? ` (${unit})` : ''}` : 'Max'}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
