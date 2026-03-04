export default function Section({ title, children, className = '' }) {
  return (
    <section className={`mb-6 ${className}`}>
      {title ? <h4 className="mb-3 text-sm font-semibold text-[var(--dark)]">{title}</h4> : null}
      {children}
    </section>
  )
}
