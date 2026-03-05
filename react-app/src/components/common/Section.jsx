export default function Section({ title, children, className = '' }) {
 return (
 <section className={`mb-2 ${className}`}>
 {title ? <h4 className="mb-1 text-[10px] font-semibold tracking-wide uppercase text-[var(--dark)]">{title}</h4> : null}
 {children}
 </section>
 )
}
