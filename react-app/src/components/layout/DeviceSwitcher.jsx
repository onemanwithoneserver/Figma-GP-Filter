import { Monitor, Tablet, Smartphone } from 'lucide-react'

const options = [
  { key: 'desktop', label: 'Desktop', icon: Monitor },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'mobile', label: 'Mobile', icon: Smartphone },
]

export default function DeviceSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-[5px] border border-[var(--dark)]/35 bg-[var(--white)]">
      {options.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`inline-flex items-center gap-1.5 border-l px-2.5 py-2 text-xs font-medium first:border-l-0 ${
            value === key
              ? 'border-[var(--dark)]/35 bg-[var(--primary)] text-[var(--white)]'
              : 'border-[var(--dark)]/20 text-[var(--dark)]'
          }`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  )
}
