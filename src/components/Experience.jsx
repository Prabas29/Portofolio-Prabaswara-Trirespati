import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Experience({ num }) {
  const { t } = useLang()

  return (
    <Section id="experience">
      <SectionHeader
        num={num}
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
        note={t.experience.note}
      />

      <div>
        {t.experience.roles.map((r) => (
          <Reveal
            key={r.role}
            className="grid gap-6 border-t border-line py-10 md:grid-cols-[180px_1fr] md:gap-10"
          >
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
              {r.period}
            </div>
            <div>
              <div className="flex items-center gap-4">
                {/* White tile keeps dark-inked logos legible on the dark background. */}
                <span className="flex h-14 shrink-0 items-center justify-center rounded-md bg-white px-2.5 py-2">
                  <img
                    src={r.logo}
                    alt={`${r.org} logo`}
                    loading="lazy"
                    className="h-full w-auto object-contain"
                  />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-paper sm:text-2xl">
                    {r.role}
                  </h3>
                  <p className="mt-0.5 font-body text-sm text-paper-dim">{r.org}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {r.points.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-3 font-body text-sm leading-relaxed text-paper-dim"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-dim" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
