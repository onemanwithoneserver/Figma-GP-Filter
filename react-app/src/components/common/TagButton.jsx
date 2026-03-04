export default function TagButton({ label, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[7px] border px-3 py-1.5 text-xs font-medium transition-colors ${
        selected
          ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--white)]'
          : 'border-[var(--dark)]/25 bg-[var(--white)] text-[var(--dark)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
      }`}
    >
      {label}
    </button>
  )
}
