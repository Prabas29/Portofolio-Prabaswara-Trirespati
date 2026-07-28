import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Skills() {
  const { t } = useLang()

  return (
    <Section id="skills">
      <SectionHeader
        num="06"
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        note={t.skills.note}
      />

      <div className="grid gap-10 sm:grid-cols-2">
        {t.skills.groups.map((g, i) => (
          <Reveal key={g.label} delay={(i % 2) * 90}>
            <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-teal">
              {g.label}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-4 py-2 font-mono text-[0.72rem] tracking-[0.04em] text-paper transition-colors hover:border-gold-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
