import { useEffect, useState } from 'react'

// Returns the id of the section currently closest to the top of the viewport.
export function useScrollSpy(ids, offset = 0.35) {
  const [activeId, setActiveId] = useState(ids[0] ?? null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round(
          (1 - offset) * 100,
        )}% 0px`,
        threshold: 0,
      },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}
