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
            className={`rounded-[7px] border px-2 py-[3px] text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-150 ${
              isSelected
                ? 'border-[#D94F00] bg-gradient-to-b from-[#E85A10] to-[#D94F00] text-white shadow-[0_1px_4px_rgba(217,79,0,0.22),0_0.5px_1px_rgba(217,79,0,0.10)]'
                : 'border-[#2A2118]/8 bg-[#FAFAF9] text-[#2A2118]/75 hover:border-[#D94F00]/30 hover:text-[#D94F00]'
            }`}
          >
            {offer}
          </button>
        )
      })}
    </div>
  )
}
