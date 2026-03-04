import { useState, useRef, useCallback } from 'react'

export default function RadiusSlider({ value, onChange }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const sliderRef = useRef(null)

  const min = 1
  const max = 50
  const percentage = ((value - min) / (max - min)) * 100

  const updateTooltipPos = useCallback(() => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const thumbX = rect.left + (percentage / 100) * rect.width
      const thumbY = rect.top
      setTooltipPos({ x: thumbX, y: thumbY })
    }
  }, [percentage])

  return (
    <div className="flex items-center gap-2.5">
      <div
        ref={sliderRef}
        className="relative flex-1"
        onMouseEnter={() => { setIsHovered(true); updateTooltipPos() }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={() => { if (isHovered || isActive) updateTooltipPos() }}
      >
        {/* Tooltip */}
        {(isHovered || isActive) && (
          <div
            className="pointer-events-none fixed z-[9999] -translate-x-1/2"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 26}px`,
            }}
          >
            <div className="relative rounded-[5px] bg-[#2A2118] px-2 py-[2px] text-[9.5px] font-bold tracking-wide text-white shadow-[0_4px_12px_rgba(42,33,24,0.20)]">
              {value} km
              <div className="absolute -bottom-[3px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rotate-45 bg-[#2A2118]" />
            </div>
          </div>
        )}

        {/* Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onMouseDown={() => { setIsActive(true); updateTooltipPos() }}
          onMouseUp={() => setIsActive(false)}
          onTouchStart={() => { setIsActive(true); updateTooltipPos() }}
          onTouchEnd={() => setIsActive(false)}
          onChange={(e) => { onChange(Number(e.target.value)); requestAnimationFrame(updateTooltipPos) }}
          className="relative z-10 h-[4px] w-full cursor-pointer appearance-none rounded-full outline-none
            [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#D94F00] [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(217,79,0,0.25)] [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-95
            [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#D94F00] [&::-moz-range-thumb]:border-[2.5px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_2px_8px_rgba(217,79,0,0.25)]"
          style={{
            background: `linear-gradient(to right, #D94F00 0%, #D94F00 ${percentage}%, #EAE6E1 ${percentage}%, #EAE6E1 100%)`,
          }}
        />
      </div>

      {/* Distance Label */}
      <div className="flex min-w-[40px] items-baseline justify-end gap-px text-right">
        <span className="font-['Outfit'] text-[12px] font-bold tabular-nums text-[#2A2118]">{value}</span>
        <span className="text-[9px] font-medium text-[#2A2118]/35">km</span>
      </div>
    </div>
  )
}
