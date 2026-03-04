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
    <div className="flex items-center gap-4">
      <div
        ref={sliderRef}
        className="relative flex-1"
        onMouseEnter={() => { setIsHovered(true); updateTooltipPos() }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={() => { if (isHovered || isActive) updateTooltipPos() }}
      >
        {/* Tooltip - uses fixed positioning to escape overflow:hidden clipping */}
        {(isHovered || isActive) && (
          <div
            className="pointer-events-none fixed z-[9999] -translate-x-1/2"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y - 32}px`,
            }}
          >
            <div className="relative rounded-[5px] bg-[#E65100] px-2.5 py-1 text-[11px] font-bold text-white shadow-xl">
              {value} km
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#E65100]" />
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
          className="relative z-10 h-2 w-full cursor-pointer appearance-none rounded-[5px] outline-none 
            [&::-webkit-slider-thumb]:h-[22px] [&::-webkit-slider-thumb]:w-[22px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[7px] [&::-webkit-slider-thumb]:bg-[#E65100] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.15)] [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-95
            [&::-moz-range-thumb]:h-[22px] [&::-moz-range-thumb]:w-[22px] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-[7px] [&::-moz-range-thumb]:bg-[#E65100] [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.15)]"
          style={{
            background: `linear-gradient(to right, #E65100 0%, #E65100 ${percentage}%, #E5E5E5 ${percentage}%, #E5E5E5 100%)`,
          }}
        />
      </div>

      {/* Distance Label */}
      <div className="min-w-[42px] text-right text-[14px] font-medium tabular-nums text-[#322822]">
        {value} <span className="text-[12px] text-[#322822]/60">km</span>
      </div>
    </div>
  )
}
