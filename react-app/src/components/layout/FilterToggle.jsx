import { SlidersHorizontal } from 'lucide-react'

export default function FilterToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle filters"
      className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-[var(--dark)]/35 bg-[var(--white)] text-[var(--dark)]"
    >
      <SlidersHorizontal size={18} />
    </button>
  )
}
