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
        className={`flex w-full items-center justify-between rounded-[5px] border bg-[#FFFFFF] px-3.5 py-2.5 text-[13px] font-medium shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E65100]/10 ${
          open
            ? 'border-[#E65100]/50 shadow-md shadow-[#E65100]/5'
            : 'border-[#322822]/10 hover:border-[#322822]/20 hover:shadow-md hover:shadow-[#322822]/5'
        }`}
      >
        <span className={selected ? 'text-[#322822]' : 'text-[#322822]/40'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`ml-2 shrink-0 text-[#322822]/40 transition-transform duration-300 ${open ? 'rotate-180 text-[#E65100]/70' : ''}`}
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
          className={`z-[9999] origin-top overflow-hidden rounded-[7px] border border-[#322822]/10 bg-[#FFFFFF] shadow-lg shadow-[#322822]/8 transition-all duration-200 ${
            open
              ? 'scale-y-100 opacity-100'
              : 'pointer-events-none scale-y-95 opacity-0'
          }`}
        >
          <ul className="max-h-48 overflow-y-auto py-1 scrollbar-thin">
            {/* Reset / placeholder option */}
            <li>
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] transition-colors duration-150 ${
                  !value
                    ? 'bg-[#E65100]/5 font-semibold text-[#E65100]'
                    : 'text-[#322822]/40 hover:bg-[#EAE3D7]/40 hover:text-[#322822]/60'
                }`}
              >
                <span className="w-3.5" />
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
                    className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#E65100]/5 text-[#E65100]'
                        : 'text-[#322822] hover:bg-[#EAE3D7]/40'
                    }`}
                  >
                    <Check
                      size={14}
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
    <div className="pt-1">
      {/* Premium Segmented Control */}
      <div className="mb-4 inline-flex items-center gap-1 rounded-[7px] border border-[#322822]/10 bg-[#EAE3D7]/40 p-1 shadow-inner">
        <button
          type="button"
          onClick={() => onModeChange('per')}
          className={` rounded-[5px] px-4 py-1.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
            mode === 'per'
              ? 'bg-[#FFFFFF] text-[#E65100] shadow-sm ring-1 ring-[#E65100]/20'
              : 'text-[#322822]/60 hover:bg-[#322822]/5 hover:text-[#322822]'
          }`}
        >
          {perLabel}
        </button>
        <button
          type="button"
          onClick={() => onModeChange('overall')}
          className={` rounded-[5px] px-4 py-1.5 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
            mode === 'overall'
              ? 'bg-[#FFFFFF] text-[#E65100] shadow-sm ring-1 ring-[#E65100]/20'
              : 'text-[#322822]/60 hover:bg-[#322822]/5 hover:text-[#322822]'
          }`}
        >
          {overallLabel}
        </button>
      </div>

      {/* Min/Max Inputs with Premium Spacing */}
      <div className="flex items-center gap-3">
        <StyledSelect 
          value={min} 
          onChange={onMinChange} 
          placeholder="Min" 
          options={activeOptions} 
        />
        
        {/* Refined Separator */}
        <div className="h-0.5 w-3 shrink-0 rounded-full bg-[#322822]/20"></div>
        
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
