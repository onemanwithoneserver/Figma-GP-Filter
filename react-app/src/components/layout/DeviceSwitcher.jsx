import { Monitor, Tablet, Smartphone } from 'lucide-react'

const options = [
  { key: 'desktop', label: 'Desktop', icon: Monitor },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'mobile', label: 'Mobile', icon: Smartphone },
]

export default function DeviceSwitcher({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-[7px] border border-[#322822]/10 bg-[#EAE3D7]/40 p-1 shadow-inner">
      {options.map(({ key, label, icon: Icon }) => {
        const isActive = value === key;
        
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-2 rounded-[5px] px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-[#E65100]/10 text-[#E65100] shadow-sm ring-1 ring-[#E65100]/25'
                : 'text-[#322822]/60 hover:bg-[#322822]/5 hover:text-[#322822]'
            }`}
          >
            <Icon
              size={16}
              className="text-[#E65100] transition-colors duration-300"
            />
            {label}
          </button>
        );
      })}
    </div>
  )
}
