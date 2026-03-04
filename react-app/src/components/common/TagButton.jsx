export default function TagButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[7px] border px-2 py-[3px] text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
        selected
          ? 'border-[#D94F00] bg-gradient-to-b from-[#E85A10] to-[#D94F00] text-white shadow-[0_1px_4px_rgba(217,79,0,0.22),0_0.5px_1px_rgba(217,79,0,0.10)]'
          : 'border-[#2A2118]/8 bg-[#FAFAF9] text-[#2A2118]/75 hover:border-[#D94F00]/30 hover:bg-[#D94F00]/[0.03] hover:text-[#D94F00]'
      }`}
    >
      {label}
    </button>
  )
}

