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
      className={`group mb-[2px] rounded-[7px] border transition-all duration-200 ${
        highlight
          ? 'border-[#D94F00]/15 bg-gradient-to-b from-white to-[#D94F00]/[0.015] shadow-[0_1px_4px_rgba(217,79,0,0.06)]'
          : open
            ? 'border-[#2A2118]/10 bg-white shadow-[0_1px_4px_rgba(42,33,24,0.06),0_0.5px_1px_rgba(42,33,24,0.03)]'
            : 'border-[#2A2118]/6 bg-white/90 hover:border-[#2A2118]/10 hover:bg-white hover:shadow-[0_1px_3px_rgba(42,33,24,0.04)]'
      } ${sectionClassName}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-2.5 py-[6px] text-left outline-none transition-all ${headerClassName}`}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] transition-all duration-200 ${
              highlight
                ? 'bg-gradient-to-b from-[#E85A10] to-[#D94F00] shadow-[0_1px_3px_rgba(217,79,0,0.25)]'
                : open
                  ? 'bg-[#2A2118] shadow-[0_1px_2px_rgba(42,33,24,0.15)]'
                  : 'bg-[#2A2118]/75 group-hover:bg-[#2A2118]/90'
            }`}>
              <Icon size={10} className="text-white stroke-[2.5px]" />
            </div>
          )}
          <span className="font-['Outfit'] text-[11.5px] font-semibold tracking-[-0.01em] text-[#2A2118]">
            {title}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#2A2118]/45' : 'text-[#2A2118]/18 group-hover:text-[#2A2118]/30'
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-200 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`mx-2.5 mb-2 border-t border-[#2A2118]/[0.04] pt-2 text-[11px] leading-[1.5] text-[#2A2118]/70 ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
