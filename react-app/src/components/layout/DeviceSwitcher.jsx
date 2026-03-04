import { Monitor, Tablet, Smartphone } from 'lucide-react'

const options = [
  { key: 'desktop', label: 'Desktop', icon: Monitor },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'mobile', label: 'Mobile', icon: Smartphone },
]

export default function DeviceSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-px rounded-[7px] border border-[#2A2118]/8 bg-[#F7F4F0]/70 p-[3px] backdrop-blur-sm">
      {options.map(({ key, label, icon: Icon }) => {
        const isActive = value === key;
        
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-[7px] px-2.5 py-[4px] text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
              isActive
                ? 'bg-white text-[#D94F00] shadow-[0_1px_4px_rgba(42,33,24,0.10),0_0.5px_1px_rgba(42,33,24,0.06)]'
                : 'text-[#2A2118]/40 hover:text-[#2A2118]/65 hover:bg-white/40'
            }`}
          >
            <Icon size={12} className={isActive ? 'text-[#D94F00]' : 'text-[#2A2118]/30'} />
            {label}
          </button>
        );
      })}
    </div>
  )
}
