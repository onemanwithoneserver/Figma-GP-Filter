import TagButton from '../common/TagButton'
import { SPECIAL_OFFER_OPTIONS } from '../common/filterOptions'

export default function SpecialOffers({ selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SPECIAL_OFFER_OPTIONS.map((offer) => (
        <TagButton
          key={offer}
          label={offer}
          selected={selected.includes(offer)}
          onClick={() => onToggle(offer)}
        />
      ))}
    </div>
  )
}
