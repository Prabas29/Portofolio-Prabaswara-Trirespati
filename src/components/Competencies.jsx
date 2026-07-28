import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Competencies() {
  const { t } = useLang()

  return (
    <Section id="competencies">
      <SectionHeader
        num="02"
        eyebrow={t.competencies.eyebrow}
        title={t.competencies.title}
        note={t.competencies.note}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {t.competencies.cards.map((c, i) => (
          <Reveal
            key={c.title}
            delay={(i % 2) * 100}
            className="flex flex-col rounded-lg border border-line bg-ink-2/40 p-7 transition-colors hover:border-gold-dim/60"
          >
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-teal">
              {c.tag}
            </span>
            <h3 className="mt-5 font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-paper">
              {c.title}
            </h3>
            <p className="mt-4 font-body text-sm leading-relaxed text-paper-dim">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
