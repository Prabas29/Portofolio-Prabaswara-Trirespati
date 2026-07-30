import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import RichText from './RichText.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function About({ num }) {
  const { t } = useLang()
  const photo = t.about.photo || '/profile.png'
  const caption = t.about.photoCaption ?? 'Prabaswara Trirespati'
  const location = t.about.photoLocation ?? 'Jakarta, ID'

  return (
    <Section id="about">
      <SectionHeader
        num={num}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        note={t.about.note}
      />

      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="space-y-6 font-body text-base leading-relaxed text-paper-dim">
          {t.about.paragraphs.map((paragraph, i) => (
            <Reveal as="p" key={i} delay={i * 80}>
              <RichText text={paragraph} />
            </Reveal>
          ))}
        </div>

        {photo && (
          <Reveal delay={120} className="md:pt-1">
            <figure className="relative">
              <div className="overflow-hidden rounded-lg border border-line bg-ink-2/40">
                <img
                  src={photo}
                  alt={caption || 'Profile photo'}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              {(caption || location) && (
                <figcaption className="mt-3 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim">
                  <span>{caption}</span>
                  <span className="text-gold">{location}</span>
                </figcaption>
              )}
            </figure>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
