import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

// Renders a paragraph made of { t, b? } segments, bolding where b is set.
function RichParagraph({ segments }) {
  return segments.map((s, i) =>
    s.b ? (
      <strong key={i} className="font-semibold text-paper">
        {s.t}
      </strong>
    ) : (
      <span key={i}>{s.t}</span>
    ),
  )
}

export default function About() {
  const { t } = useLang()

  return (
    <Section id="about">
      <SectionHeader
        num="01"
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        note={t.about.note}
      />

      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="space-y-6 font-body text-base leading-relaxed text-paper-dim">
          {t.about.paragraphs.map((segments, i) => (
            <Reveal as="p" key={i} delay={i * 80}>
              <RichParagraph segments={segments} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="md:pt-1">
          <figure className="relative">
            <div className="overflow-hidden rounded-lg border border-line bg-ink-2/40">
              <img
                src="/profile.png"
                alt="Prabaswara Trirespati"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim">
              <span>Prabaswara Trirespati</span>
              <span className="text-gold">Jakarta, ID</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
