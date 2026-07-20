import { useEffect, useState } from 'react'
import { NAV_SECTIONS } from '../data/nav.js'

// Fixed left navigation rail on desktop; collapses to a top bar with a
// full dropdown menu under 800px so every section stays reachable on mobile.
export default function Sidebar({ activeId, progress }) {
  const [open, setOpen] = useState(false)

  // Close the mobile menu once the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/95 backdrop-blur md:inset-y-0 md:right-auto md:h-screen md:w-[240px] md:border-b-0 md:border-r md:bg-transparent md:backdrop-blur-none">
      <div className="flex h-14 items-center justify-between px-5 md:h-full md:flex-col md:items-stretch md:justify-start md:px-8 md:py-10">
        {/* Identity */}
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="group flex flex-col leading-none"
        >
          <span className="font-display text-lg font-semibold tracking-[-0.02em] text-paper md:text-xl">
            Prabaswara<span className="text-gold"> T.</span>
          </span>
          <span className="mt-1 hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-dim md:block">
            Data · Product · Analysis
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="mt-14 hidden flex-1 md:block" aria-label="Main navigation">
          <ul className="space-y-1">
            {NAV_SECTIONS.map((s) => {
              const active = activeId === s.id
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`group flex items-center gap-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors ${
                      active ? 'text-gold' : 'text-paper-dim hover:text-paper'
                    }`}
                  >
                    <span
                      className={`h-px bg-current transition-all duration-300 ${
                        active ? 'w-8' : 'w-4 group-hover:w-6'
                      }`}
                    />
                    <span className="tabular-nums">{s.num}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Scroll progress rail (desktop only) */}
        <div className="mb-8 hidden items-center gap-3 md:flex" aria-hidden="true">
          <div className="relative h-24 w-0.5 overflow-hidden rounded bg-line">
            <div
              className="absolute inset-x-0 top-0 rounded"
              style={{
                height: `${Math.round(progress * 100)}%`,
                background: 'linear-gradient(to bottom, var(--gold), var(--teal))',
              }}
            />
          </div>
          <span className="font-mono text-[0.65rem] tabular-nums tracking-[0.1em] text-paper-dim">
            {String(Math.round(progress * 100)).padStart(2, '0')}%
          </span>
        </div>

        {/* Contact links (desktop) */}
        <div className="hidden flex-col gap-2 md:flex">
          <a
            href="https://linkedin.com/in/prabaswara-trirespati"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-paper-dim transition-colors hover:text-gold"
          >
            LinkedIn
          </a>
          <a
            href="mailto:prabaswaratrirespati12@gmail.com"
            className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-paper-dim transition-colors hover:text-gold"
          >
            Email
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-paper transition-colors hover:border-gold-dim md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-current transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile scroll-progress line at the bottom edge of the bar */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 md:hidden"
        style={{
          width: `${Math.round(progress * 100)}%`,
          background: 'linear-gradient(to right, var(--gold), var(--teal))',
        }}
        aria-hidden="true"
      />

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden border-t border-line bg-ink/98 backdrop-blur transition-[max-height] duration-300 ease-out md:hidden ${
          open ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <nav className="px-5 py-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_SECTIONS.map((s) => {
              const active = activeId === s.id
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-2 py-2.5 font-mono text-[0.8rem] uppercase tracking-[0.1em] transition-colors ${
                      active ? 'bg-ink-2/60 text-gold' : 'text-paper-dim hover:text-paper'
                    }`}
                  >
                    <span className="tabular-nums text-[0.7rem] text-teal">{s.num}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 flex gap-4 border-t border-line px-2 pt-4">
            <a
              href="https://linkedin.com/in/prabaswara-trirespati"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-paper-dim transition-colors hover:text-gold"
            >
              LinkedIn
            </a>
            <a
              href="mailto:prabaswaratrirespati12@gmail.com"
              onClick={() => setOpen(false)}
              className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-paper-dim transition-colors hover:text-gold"
            >
              Email
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
