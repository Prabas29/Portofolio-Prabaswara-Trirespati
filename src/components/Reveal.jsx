// Thin wrapper that opts an element into the reveal-on-scroll animation.
// `as` lets callers keep semantic tags; `delay` staggers grouped children.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
