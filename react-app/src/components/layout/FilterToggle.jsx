export default function FilterToggle({ onClick }) {
 return (
 <button
 type="button"
 onClick={onClick}
 aria-label="Toggle filters"
 className="inline-flex h-7 w-7 items-center justify-center rounded-[5px] bg-[#EE5500] text-white transition-all duration-150 hover:bg-[#D94F00] active:scale-95"
 >
 <span className="text-[13px] leading-none" role="img" aria-hidden="true">🎛️</span>
 </button>
 )
}
