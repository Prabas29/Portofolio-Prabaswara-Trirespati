import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Projects() {
  const { t } = useLang()

  return (
    <Section id="projects">
      <SectionHeader
        num="05"
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        note={t.projects.note}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {t.projects.items.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 2) * 90}
            className="group flex flex-col rounded-lg border border-line bg-ink-2/40 p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-gold-dim"
          >
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper-dim">
              {p.index}
            </span>
            <h3 className="mt-4 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-paper">
              {p.title}
            </h3>
            <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-paper-dim">
              {p.body}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-teal-dim/70 px-3 py-1 font-mono text-[0.65rem] tracking-[0.06em] text-teal"
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-gold transition-colors hover:text-paper"
            >
              {t.projects.cta}
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
