import { Monitor, Tablet, Smartphone } from 'lucide-react'

const options = [
  { key: 'desktop', label: 'Desktop', icon: Monitor },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'mobile', label: 'Mobile', icon: Smartphone },
]

export default function DeviceSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-px rounded-[7px] border border-[#322822]/6 bg-[#F5F1EC]/60 p-[3px]">
      {options.map(({ key, label, icon: Icon }) => {
        const isActive = value === key;
        
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-[7px] px-2.5 py-[4px] text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
              isActive
                ? 'bg-white text-[#E65100] shadow-[0_1px_3px_rgba(50,40,34,0.08)]'
                : 'text-[#322822]/40 hover:text-[#322822]/70'
            }`}
          >
            <Icon size={12} className={isActive ? 'text-[#E65100]' : 'text-[#322822]/30'} />
            {label}
          </button>
        );
      })}
    </div>
  )
}
