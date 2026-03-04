import { SPECIAL_OFFER_OPTIONS } from '../common/filterOptions'

export default function SpecialOffers({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SPECIAL_OFFER_OPTIONS.map((offer) => {
        const isSelected = selected.includes(offer)

        return (
          <button
            key={offer}
            type="button"
            onClick={() => onToggle(offer)}
            className={`rounded-[5px] border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              isSelected
                ? 'border-[#E65100] bg-[#E65100] text-[#FFFFFF] shadow-[0_2px_8px_rgba(230,81,0,0.25)]'
                : 'border-[#322822]/20 bg-[#EAE3D7]/55 text-[#322822] hover:border-[#E65100]/50 hover:bg-[#EAE3D7] hover:text-[#E65100]'
            }`}
          >
            {offer}
          </button>
        )
      })}
    </div>
  )
}
