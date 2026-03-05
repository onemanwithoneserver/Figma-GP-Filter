export default function TagButton({ label, selected = false, onClick }) {
 return (
 <button
 type="button"
 onClick={onClick}
 className={`rounded-[5px] border px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 selected
 ? 'border-[#EE5500] bg-[#EE5500] text-white'
 : 'border-[#2A221C]/8 bg-[#FAFAF9] text-[#2A221C] hover:border-[#D94F00]/30 hover:bg-[#D94F00]/3 hover:text-[#D94F00]'
 }`}
 >
 {label}
 </button>
 )
}

