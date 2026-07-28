import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Contact() {
  const { t } = useLang()

  return (
    <Section id="contact">
      <Reveal className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gold">
        08 <span className="text-paper-dim">— {t.contact.eyebrow}</span>
      </Reveal>

      <Reveal
        as="h2"
        delay={80}
        className="mt-6 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper"
      >
        {t.contact.headlineLead}
        <span className="italic font-[450] text-gold">{t.contact.headlineAccent}</span>
      </Reveal>

      <div className="mt-14">
        {t.contact.items.map((c) => (
          <Reveal key={c.label}>
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:border-gold-dim"
            >
              <span className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper-dim">
                  {c.label}
                </span>
                <span className="font-body text-lg text-paper transition-colors group-hover:text-gold sm:text-xl">
                  {c.value}
                </span>
              </span>
              <Arrow className="text-paper-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
