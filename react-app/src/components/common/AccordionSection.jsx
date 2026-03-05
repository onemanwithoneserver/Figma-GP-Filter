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
 className={`group mb-0.5 rounded-[7px] border transition-all duration-200 ${
 highlight
 ? 'border-[#EE5500]/15 bg-[#EE5500]/2'
 : open
 ? 'border-[#2A221C]/8 bg-white'
 : 'border-[#2A221C]/8 bg-white/90 hover:border-[#2A221C]/8 hover:bg-white'
 } ${sectionClassName}`}
 >
 <button
 type="button"
 onClick={onToggle}
 className={`flex w-full items-center justify-between px-2.5 py-1.5 text-left outline-none transition-all ${headerClassName}`}
 >
 <div className="flex items-center gap-2">
 {Icon && (
 <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] transition-all duration-200 ${
 highlight
 ? 'bg-[#EE5500]'
 : open
 ? 'bg-[#2A221C]'
 : 'bg-[#2A221C] group-hover:bg-[#2A221C]'
 }`}>
 <Icon size={10} className="text-white stroke-[2.5px]" />
 </div>
 )}
 <span className="font-['Outfit'] text-[11.5px] font-semibold tracking-[-0.01em] text-[#2A221C]">
 {title}
 </span>
 </div>
 <ChevronDown
 size={12}
 className={`shrink-0 transition-transform duration-200 ${
 open ? 'rotate-180 text-[#2A221C]' : 'text-[#2A221C] group-hover:text-[#2A221C]'
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
 className={`mx-2.5 mb-2 border-t border-[#2A221C]/8 pt-2 text-[11px] leading-normal text-[#2A221C] ${contentClassName}`}
 >
 {children}
 </div>
 </div>
 </div>
 </section>
 )
}
