import Reveal from './Reveal.jsx'

// Numbered eyebrow + big display title on the left, one-line note bottom-right.
export default function SectionHeader({ num, eyebrow, title, note }) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gold">
        {num} <span className="text-paper-dim">— {eyebrow}</span>
      </Reveal>
      <div className="mt-5 flex flex-col gap-3 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <Reveal
          as="h2"
          delay={80}
          className="font-display text-[clamp(1.9rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper"
        >
          {title}
        </Reveal>
        {note && (
          <Reveal
            delay={140}
            className="max-w-xs font-body text-sm leading-relaxed text-paper-dim md:text-right"
          >
            {note}
          </Reveal>
        )}
      </div>
    </header>
  )
}
