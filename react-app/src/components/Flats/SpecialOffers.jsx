import { SPECIAL_OFFER_OPTIONS } from '../common/filterOptions'

export default function SpecialOffers({ selected, onToggle }) {
 return (
 <div className="flex flex-wrap gap-1">
 {SPECIAL_OFFER_OPTIONS.map((offer) => {
 const isSelected = selected.includes(offer)

 return (
 <button
 key={offer}
 type="button"
 onClick={() => onToggle(offer)}
 className={`rounded-[5px] border px-2 py-0.75 text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 isSelected
 ? 'border-[#EE5500] bg-[#EE5500] text-white'
 : 'border-[#2A221C]/8 bg-[#FAFAF9] text-[#2A221C] hover:border-[#D94F00]/30 hover:text-[#D94F00]'
 }`}
 >
 {offer}
 </button>
 )
 })}
 </div>
 )
}
