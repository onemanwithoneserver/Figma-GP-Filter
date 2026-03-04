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
      className={`mb-3 rounded-[7px] border bg-[var(--white)] ${
        highlight ? 'border-[var(--primary)]/50' : 'border-[var(--dark)]/15'
      } ${sectionClassName}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-4 py-3 text-left ${headerClassName}`}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[var(--dark)]">
          {Icon ? <Icon size={16} className="text-[var(--primary)]" /> : null}
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--dark)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className={`border-t border-[var(--dark)]/10 px-4 py-3 ${contentClassName}`}>{children}</div>
      ) : null}
    </section>
  )
}
