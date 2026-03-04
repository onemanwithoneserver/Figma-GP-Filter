import { ChevronDown } from 'lucide-react'

const DEFAULT_BUDGET_OPTIONS = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
]

function StyledSelect({ value, onChange, placeholder, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] px-3 py-2.5 pr-9 text-sm font-medium text-[var(--dark)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] outline-none transition focus:border-[var(--primary)]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={`${option.label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dark)]/60"
      />
    </div>
  )
}

export default function BudgetFilter({
  mode,
  min,
  max,
  onModeChange,
  onMinChange,
  onMaxChange,
  perLabel = 'Per SqFt',
  overallLabel = 'Overall Budget',
  options = DEFAULT_BUDGET_OPTIONS,
  perOptions,
  overallOptions,
}) {
  const activeOptions = mode === 'overall' ? overallOptions ?? options : perOptions ?? options

  return (
    <div>
      <div className="mb-3 inline-flex rounded-[7px] border border-[var(--dark)]/20 bg-[var(--white)] p-1 shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-[7px] px-3 py-1.5 text-xs font-semibold transition ${
            mode === 'per' ? 'bg-[var(--primary)] text-[var(--white)]' : 'text-[var(--dark)]'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-[7px] px-3 py-1.5 text-xs font-semibold transition ${
            mode === 'overall' ? 'bg-[var(--primary)] text-[var(--white)]' : 'text-[var(--dark)]'
          }`}
        >
          {overallLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <StyledSelect value={min} onChange={onMinChange} placeholder="Min" options={activeOptions} />
        <span className="hidden text-xs font-medium text-[var(--dark)]/60 sm:block">to</span>
        <StyledSelect value={max} onChange={onMaxChange} placeholder="Max" options={activeOptions} />
      </div>
    </div>
  )
}
