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
          ? 'border-[#E65100]/15 bg-white shadow-[0_1px_3px_rgba(230,81,0,0.04)]'
          : open
            ? 'border-[#322822]/10 bg-white shadow-[0_1px_3px_rgba(50,40,34,0.05)]'
            : 'border-[#322822]/6 bg-white hover:border-[#322822]/10'
      } ${sectionClassName}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-2.5 py-[6px] text-left outline-none transition-all ${headerClassName}`}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[7px] transition-colors duration-200 ${
              highlight
                ? 'bg-[#E65100]'
                : open
                  ? 'bg-[#322822]'
                  : 'bg-[#322822]/80 group-hover:bg-[#322822]'
            }`}>
              <Icon size={10} className="text-white stroke-[2.5px]" />
            </div>
          )}
          <span className="text-[11.5px] font-semibold tracking-[-0.01em] text-[#322822]">
            {title}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={`shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#322822]/50' : 'text-[#322822]/20'
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
            className={`mx-2.5 mb-2 border-t border-[#322822]/5 pt-2 text-[11px] leading-[1.5] text-[#322822]/70 ${contentClassName}`}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
