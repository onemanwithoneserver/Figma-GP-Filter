import { ChevronDown } from 'lucide-react'

export default function AccordionSection({
  title,
  open,
  onToggle,
  children,
  highlight = false,
  icon: Icon,
  sectionClassName = '',
  headerClassName = '',
  contentClassName = '',
}) {
  return (
    <section
      className={`group mb-2.5 rounded-[7px] border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        highlight
          ? 'border-[#322822]/20 bg-gradient-to-b from-white to-[#322822]/[0.01] shadow-[0_10px_30px_-10px_rgba(50,40,34,0.12)]'
          : 'border-[#322822]/5 bg-white shadow-[0_2px_12px_-4px_rgba(50,40,34,0.04)] hover:border-[#322822]/15 hover:shadow-[0_8px_24px_-8px_rgba(50,40,34,0.08)]'
      } ${sectionClassName}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left outline-none transition-all ${headerClassName}`}
      >
        <div className="flex items-center gap-3.5">
          {Icon && (
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] shadow-sm transition-transform duration-300 group-hover:scale-105 ${
              highlight 
                ? 'bg-[#322822] shadow-[0_4px_12px_rgba(50,40,34,0.35)]' 
                : 'bg-[#322822]/90 group-hover:bg-[#322822]'
            }`}>
              <Icon size={15} className="text-white stroke-[2.5px]" />
            </div>
          )}
          
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#322822]">
            {title}
          </span>
        </div>
        
        {/* Minimalist Chevron */}
        <div className={`flex h-7 w-7 items-center justify-center rounded-[5px] transition-all duration-500 ${
          open ? 'bg-[#322822]/5 rotate-180' : 'rotate-0'
        }`}>
          <ChevronDown
            size={14}
            className={`transition-colors duration-300 ${open ? 'text-[#322822]' : 'text-[#322822]/30'}`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`mx-3.5 mb-3.5 border-t border-[#322822]/5 pt-3.5 text-[13.5px] leading-[1.6] text-[#322822]/70 ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
