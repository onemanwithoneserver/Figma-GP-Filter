import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown, LandPlot, Route } from 'lucide-react'
import { ORR_DISTANCE_OPTIONS } from '../common/filterOptions'

function OrrDistanceSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

  const selectedLabel = value || 'Select'

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    setPos({
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    })
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!open) return

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open, updatePosition])

  function handleSelect(nextValue) {
    onChange(nextValue)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`group flex w-full items-center justify-between rounded-[7px] border bg-[#FFFFFF] px-2 py-[5px] pr-7 text-[10.5px] font-medium outline-none transition-all duration-150 focus:ring-2 focus:ring-[#E65100]/8 ${
          open
            ? 'border-[#E65100]/35 shadow-[0_0_0_3px_rgba(230,81,0,0.04)]'
            : 'border-[var(--dark)]/8 shadow-[0_1px_2px_rgba(50,40,34,0.03)] hover:border-[var(--dark)]/15'
        }`}
      >
        <span className={value ? 'text-[var(--dark)]' : 'text-[var(--dark)]/40'}>{selectedLabel}</span>
        <ChevronDown
          size={12}
          className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-150 ${
            open ? 'rotate-180 text-[#E65100]/60' : 'text-[var(--dark)]/30'
          }`}
        />
      </button>

      {createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: pos.width,
          }}
          className={`z-[9999] origin-top overflow-hidden rounded-[7px] border border-[var(--dark)]/8 bg-[#FFFFFF] shadow-[0_6px_20px_-4px_rgba(50,40,34,0.12),0_2px_6px_rgba(50,40,34,0.06)] transition-all duration-150 ${
            open ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0'
          }`}
        >
          <ul className="max-h-44 overflow-y-auto py-0.5">
            <li>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`flex w-full items-center gap-2 px-2.5 py-[5px] text-left text-[10.5px] transition-colors duration-100 ${
                  !value
                    ? 'bg-[#E65100]/[0.04] font-semibold text-[#E65100]'
                    : 'text-[var(--dark)]/40 hover:bg-[#F5F1EC]/60'
                }`}
              >
                <Check size={11} className={`shrink-0 ${!value ? 'opacity-100' : 'opacity-0'}`} />
                Select
              </button>
            </li>

            {ORR_DISTANCE_OPTIONS.map((option) => {
              const isActive = option === value

              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center gap-2 px-2.5 py-[5px] text-left text-[10.5px] transition-colors duration-100 ${
                      isActive
                        ? 'bg-[#E65100]/[0.04] font-semibold text-[#E65100]'
                        : 'text-[var(--dark)]/80 hover:bg-[#F5F1EC]/60'
                    }`}
                  >
                    <Check size={11} className={`shrink-0 ${isActive ? 'opacity-100 text-[#E65100]' : 'opacity-0'}`} />
                    {option}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>,
        document.body,
      )}
    </div>
  )
}

export default function PlotSizeFilter({
  plotMin,
  plotMax,
  onPlotMinChange,
  onPlotMaxChange,
  orrDistance,
  onOrrDistanceChange,
}) {
  return (
    <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-end">
      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/60">
          <LandPlot size={10} />
          Plot Size (Sq.Yd)
        </div>
        <input
          value={plotMin}
          onChange={(event) => onPlotMinChange(event.target.value)}
          placeholder="Min"
          className="w-full rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(50,40,34,0.03)] outline-none placeholder:text-[var(--dark)]/30 focus:border-[#E65100]/35 focus:shadow-[0_0_0_3px_rgba(230,81,0,0.04)]"
        />
      </div>

      <span className="hidden text-[10px] text-[var(--dark)]/20 lg:block">–</span>

      <div>
        <div className="mb-1 text-[10px] font-semibold text-transparent">spacer</div>
        <input
          value={plotMax}
          onChange={(event) => onPlotMaxChange(event.target.value)}
          placeholder="Max"
          className="w-full rounded-[7px] border border-[var(--dark)]/8 bg-white px-2 py-[5px] text-[10.5px] text-[var(--dark)] shadow-[0_1px_2px_rgba(50,40,34,0.03)] outline-none placeholder:text-[var(--dark)]/30 focus:border-[#E65100]/35 focus:shadow-[0_0_0_3px_rgba(230,81,0,0.04)]"
        />
      </div>

      <span className="hidden text-[10px] text-[var(--dark)]/20 lg:block">–</span>

      <div>
        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold tracking-wide text-[var(--dark)]/60">
          <Route size={10} />
          Distance from ORR
        </div>
        <OrrDistanceSelect value={orrDistance} onChange={onOrrDistanceChange} />
      </div>
    </div>
  )
}
