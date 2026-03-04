export default function ResultsSection({ results }) {
  return (
    <div className="h-full overflow-hidden rounded-[7px] border border-[var(--dark)]/15 bg-[var(--bg)]">
      <div className="relative flex flex-col items-center px-4 pb-4 pt-3">
        <button
          type="button"
          className="absolute right-2 top-2 h-8 w-8 rounded-full border border-[var(--dark)]/15 bg-[var(--white)] text-sm text-[var(--dark)]"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-[22px] font-semibold text-[var(--dark)]">🎉 Great! We Found</p>
        <p className="mt-1 text-6xl font-bold leading-none text-[var(--dark)]">{results.length}</p>
        <p className="mt-1 text-2xl font-semibold text-[var(--dark)]">Projects</p>
      </div>

      <div className="p-3">
        <div className="rounded-[5px] border border-[var(--dark)]/10 bg-[var(--white)] p-4">
          <p className="mb-2 text-lg font-semibold text-[var(--dark)]">💡 Refine Your Search</p>
          <div className="grid grid-cols-1 gap-1 text-sm text-[var(--dark)] sm:grid-cols-2">
            <p>📍 Adjust location radius</p>
            <p>🏘️ Change property type</p>
            <p>💰 Modify budget range</p>
            <p>⭐ Check special offers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
