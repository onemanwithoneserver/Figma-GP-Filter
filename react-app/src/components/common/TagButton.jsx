export default function TagButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[7px] border px-2 py-[3px] text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
        selected
          ? 'border-[#E65100] bg-[#E65100] text-white shadow-[0_1px_3px_rgba(230,81,0,0.2)]'
          : 'border-[#322822]/8 bg-[#FAFAF8] text-[#322822]/80 hover:border-[#E65100]/40 hover:bg-[#E65100]/[0.03] hover:text-[#E65100]'
      }`}
    >
      {label}
    </button>
  )
}

