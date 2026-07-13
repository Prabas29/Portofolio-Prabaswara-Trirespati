// Consistent horizontal padding + centered max-width column for every section.
export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 py-20 sm:px-10 md:px-16 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-content">{children}</div>
    </section>
  )
}
