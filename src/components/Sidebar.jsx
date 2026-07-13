import { NAV_SECTIONS } from '../data/nav.js'

// Fixed left navigation rail on desktop; collapses to a minimal top bar
// under 800px (links + progress hidden).
export default function Sidebar({ activeId, progress }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/90 backdrop-blur md:inset-y-0 md:right-auto md:h-screen md:w-[240px] md:border-b-0 md:border-r md:bg-transparent md:backdrop-blur-none">
      <div className="flex h-14 items-center justify-between px-5 md:h-full md:flex-col md:items-stretch md:justify-start md:px-8 md:py-10">
        {/* Identity */}
        <a href="#top" className="group flex flex-col leading-none">
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

        {/* Contact links */}
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

        {/* Mobile quick links */}
        <nav className="flex items-center gap-4 md:hidden" aria-label="Quick navigation">
          <a
            href="#projects"
            className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-paper-dim transition-colors hover:text-gold"
          >
            Work
          </a>
          <a
            href="#contact"
            className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-gold"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
