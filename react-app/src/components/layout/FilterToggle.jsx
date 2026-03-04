import { SlidersHorizontal } from 'lucide-react'

export default function FilterToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle filters"
      className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#E65100] text-white shadow-[0_1px_4px_rgba(230,81,0,0.2)] transition-all duration-150 hover:bg-[#D84A00] active:scale-95"
    >
      <SlidersHorizontal size={13} />
    </button>
  )
}
