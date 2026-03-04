export default function ResultsSection({ results }) {
  return (
    <div className="h-full overflow-hidden rounded-[7px] border border-(--dark)/15 bg-(--bg)">
      <div className="relative flex h-full flex-col items-center justify-center px-4 py-5 text-center">
        <button
          type="button"
          className="absolute right-2 top-2 h-8 w-8 rounded-full border border-(--dark)/15 bg-(--white) text-sm text-(--dark)"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-xl font-semibold leading-tight text-(--dark)">🎉 Great! We Found</p>
        <p className="mt-1 text-5xl font-bold leading-none text-(--primary)">{results.length}</p>
        <p className="mt-1 text-lg font-semibold leading-tight text-(--dark)">Projects</p>
      </div>
    </div>
  )
}
