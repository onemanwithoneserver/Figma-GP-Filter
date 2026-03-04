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
            ? 'border-[#D94F00]/35 shadow-[0_0_0_3px_rgba(217,79,0,0.06)]'
            : 'border-[#2A2118]/8 shadow-[0_1px_2px_rgba(42,33,24,0.04)] hover:border-[#2A2118]/15 hover:shadow-[0_1px_4px_rgba(42,33,24,0.07)]'
        }`}
      >
        <span className={selected ? 'text-[#2A2118]' : 'text-[#2A2118]/30'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={12}
          className={`ml-1 shrink-0 transition-transform duration-150 ${open ? 'rotate-180 text-[#D94F00]/60' : 'text-[#2A2118]/25'}`}
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
          className={`z-[9999] origin-top overflow-hidden rounded-[7px] border border-[#2A2118]/8 bg-[#FFFFFF] shadow-[0_8px_24px_-4px_rgba(42,33,24,0.14),0_4px_8px_rgba(42,33,24,0.06)] transition-all duration-150 ${
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
                    ? 'bg-[#D94F00]/[0.04] font-semibold text-[#D94F00]'
                    : 'text-[#2A2118]/30 hover:bg-[#F7F4F0]/70 hover:text-[#2A2118]/55'
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
                        ? 'bg-[#D94F00]/[0.05] text-[#D94F00]'
                        : 'text-[#2A2118]/75 hover:bg-[#F7F4F0]/70'
                    }`}
                  >
                    <Check
                      size={12}
                      className={`shrink-0 transition-opacity duration-150 ${isActive ? 'opacity-100 text-[#D94F00]' : 'opacity-0'}`}
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
      <div className="mb-2 inline-flex items-center gap-px rounded-[7px] border border-[#2A2118]/8 bg-[#F7F4F0]/70 p-[3px] backdrop-blur-sm">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={`rounded-[7px] px-2.5 py-[4px] text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
            mode === 'per'
              ? 'bg-white text-[#D94F00] shadow-[0_1px_4px_rgba(42,33,24,0.10),0_0.5px_1px_rgba(42,33,24,0.06)]'
              : 'text-[#2A2118]/40 hover:text-[#2A2118]/65 hover:bg-white/40'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={`rounded-[7px] px-2.5 py-[4px] text-[10.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
            mode === 'overall'
              ? 'bg-white text-[#D94F00] shadow-[0_1px_4px_rgba(42,33,24,0.10),0_0.5px_1px_rgba(42,33,24,0.06)]'
              : 'text-[#2A2118]/40 hover:text-[#2A2118]/65 hover:bg-white/40'
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
        <div className="h-px w-3 shrink-0 bg-[#2A2118]/8"></div>
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
