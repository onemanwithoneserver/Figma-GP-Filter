import { Landmark, ReceiptText } from 'lucide-react'
import TagButton from '../common/TagButton'
import { PLOT_SALE_TYPE_OPTIONS, PLOT_TYPE_OPTIONS } from '../common/filterOptions'

export default function PlotTypeSaleFilter({ selectedType, selectedSaleType, onToggleType, onToggleSaleType }) {
  return (
    <>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <Landmark size={14} />
          Plot Type
        </div>
        <div className="flex flex-wrap gap-2">
          {PLOT_TYPE_OPTIONS.map((type) => (
            <TagButton
              key={type}
              label={type}
              selected={selectedType.includes(type)}
              onClick={() => onToggleType(type)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--dark)]/70">
          <ReceiptText size={14} />
          Sale Type
        </div>
        <div className="flex flex-wrap gap-2">
          {PLOT_SALE_TYPE_OPTIONS.map((type) => (
            <TagButton
              key={type}
              label={type}
              selected={selectedSaleType.includes(type)}
              onClick={() => onToggleSaleType(type)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
