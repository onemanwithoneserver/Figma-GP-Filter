export default function TagButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[5px] border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
        selected
          ? 'border-[#E65100] bg-[#E65100] text-white shadow-[0_2px_8px_rgba(230,81,0,0.25)]'
          : 'border-[#322822]/20 bg-white text-[#322822] shadow-[0_1px_3px_rgba(50,40,34,0.04)] hover:border-[#E65100]/60 hover:text-[#E65100] hover:shadow-[0_2px_8px_rgba(230,81,0,0.1)]'
      }`}
    >
      {label}
    </button>
  )
}

