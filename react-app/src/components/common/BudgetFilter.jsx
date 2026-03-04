import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Check } from 'lucide-react'

const DEFAULT_BUDGET_OPTIONS = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '75', value: '75' },
  { label: '100', value: '100' },
]

function StyledSelect({ value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

  const selected = options.find((o) => o.value === value)

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPos({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      })
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open) {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [open, updatePosition])

  function handleSelect(val) {
    onChange(val)
    setOpen(false)
  }

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-[7px] border bg-[#FFFFFF] px-2 py-[5px] text-[10.5px] font-medium transition-all duration-150 focus:outline-none ${
          open
            ? 'border-[#E65100]/35 shadow-[0_0_0_3px_rgba(230,81,0,0.04)]'
            : 'border-[#322822]/8 shadow-[0_1px_2px_rgba(50,40,34,0.03)] hover:border-[#322822]/15'
        }`}
      >
        <span className={selected ? 'text-[#322822]' : 'text-[#322822]/35'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={12}
          className={`ml-1 shrink-0 transition-transform duration-150 ${open ? 'rotate-180 text-[#E65100]/60' : 'text-[#322822]/30'}`}
        />
      </button>

      {/* Dropdown via Portal */}
      {createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            width: pos.width,
          }}
          className={`z-[9999] origin-top overflow-hidden rounded-[7px] border border-[#322822]/8 bg-[#FFFFFF] shadow-[0_6px_20px_-4px_rgba(50,40,34,0.12),0_2px_6px_rgba(50,40,34,0.06)] transition-all duration-150 ${
            open
              ? 'scale-y-100 opacity-100'
              : 'pointer-events-none scale-y-95 opacity-0'
          }`}
        >
          <ul className="max-h-44 overflow-y-auto py-0.5">
            {/* Reset / placeholder option */}
            <li>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`flex w-full items-center gap-2 px-2.5 py-[5px] text-[10.5px] transition-colors duration-100 ${
                  !value
                    ? 'bg-[#E65100]/[0.04] font-semibold text-[#E65100]'
                    : 'text-[#322822]/35 hover:bg-[#F5F1EC]/60 hover:text-[#322822]/60'
                }`}
              >
                <span className="w-3" />
                {placeholder}
              </button>
            </li>

            {options.map((option) => {
              const isActive = option.value === value
              return (
                <li key={`${option.label}-${option.value}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center gap-2 px-2.5 py-[5px] text-[10.5px] font-medium transition-colors duration-100 ${
                      isActive
                        ? 'bg-[#E65100]/[0.04] text-[#E65100]'
                        : 'text-[#322822]/80 hover:bg-[#F5F1EC]/60'
                    }`}
                  >
                    <Check
                      size={12}
                      className={`shrink-0 transition-opacity duration-150 ${isActive ? 'opacity-100 text-[#E65100]' : 'opacity-0'}`}
                    />
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>,
        document.body
      )}
    </div>
  )
}

export default function BudgetFilter({
  mode,
  min,
  max,
  onModeChange,
  onMinChange,
  onMaxChange,
  perLabel = 'Per SqFt',
  overallLabel = 'Overall Budget',
  options = DEFAULT_BUDGET_OPTIONS,
  perOptions,
  overallOptions,
}) {
  const activeOptions = mode === 'overall' ? overallOptions ?? options : perOptions ?? options

  return (
    <div className="pt-0.5">
      {/* Segmented Control */}
      <div className="mb-2 inline-flex items-center gap-px rounded-[7px] border border-[#322822]/6 bg-[#F5F1EC]/60 p-[3px]">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-[7px] px-2.5 py-[4px] text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
            mode === 'per'
              ? 'bg-white text-[#E65100] shadow-[0_1px_3px_rgba(50,40,34,0.08)]'
              : 'text-[#322822]/45 hover:text-[#322822]/70'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-[7px] px-2.5 py-[4px] text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
            mode === 'overall'
              ? 'bg-white text-[#E65100] shadow-[0_1px_3px_rgba(50,40,34,0.08)]'
              : 'text-[#322822]/45 hover:text-[#322822]/70'
          }`}
        >
          {overallLabel}
        </button>
      </div>

      {/* Min/Max Inputs */}
      <div className="flex items-center gap-1.5">
        <StyledSelect 
          value={min} 
          onChange={onMinChange} 
          placeholder="Min" 
          options={activeOptions} 
        />
        <div className="h-px w-3 shrink-0 bg-[#322822]/10"></div>
        <StyledSelect 
          value={max} 
          onChange={onMaxChange} 
          placeholder="Max" 
          options={activeOptions} 
        />
      </div>
    </div>
  )
}
