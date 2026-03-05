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
 className={`rounded-[5px] border px-2 py-[3px] text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
 isSelected
 ? 'border-[#8C6239] bg-[#8C6239] text-white'
 : 'border-[#2A221C]/8 bg-[#FAFAF9] text-[#2A221C] hover:border-[#8C6239]/35 hover:bg-[#8C6239]/6 hover:text-[#8C6239]'
 }`}
 >
 {offer}
 </button>
 )
 })}
 </div>
 )
}
