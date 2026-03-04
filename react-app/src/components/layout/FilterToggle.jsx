import { SlidersHorizontal } from 'lucide-react'

export default function FilterToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle filters"
      className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-b from-[#E85A10] to-[#D94F00] text-white shadow-[0_2px_8px_rgba(217,79,0,0.22),0_1px_3px_rgba(217,79,0,0.12)] transition-all duration-150 hover:from-[#D94F00] hover:to-[#C24500] hover:shadow-[0_3px_12px_rgba(217,79,0,0.28)] active:scale-95"
    >
      <SlidersHorizontal size={13} />
    </button>
  )
}
