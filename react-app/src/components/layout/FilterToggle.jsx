import { SlidersHorizontal } from 'lucide-react'

export default function FilterToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle filters"
      className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-[#E65100] bg-[#E65100] text-[#FFFFFF]"
    >
      <SlidersHorizontal size={18} />
    </button>
  )
}
