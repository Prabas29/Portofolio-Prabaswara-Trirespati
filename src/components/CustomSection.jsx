import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import RichText from './RichText.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { customKey } from '../content/contentModel.js'

// Renders a section the owner created in the admin dashboard. Three layouts
// are supported: free text, a bulleted list, or a card grid.
export default function CustomSection({ id, num }) {
  const { t } = useLang()
  const data = t.custom?.[customKey(id)]
  if (!data) return null

  const kind = data.kind || 'text'
  const items = Array.isArray(data.items) ? data.items : []

  return (
    <Section id={id}>
      <SectionHeader num={num} eyebrow={data.eyebrow} title={data.title} note={data.note} />

      {kind === 'text' && data.body && (
        <Reveal as="div" className="max-w-3xl space-y-5 font-body text-base leading-relaxed text-paper-dim">
          {String(data.body)
            .split(/\n{2,}/)
            .filter(Boolean)
            .map((para, i) => (
              <p key={i}>
                <RichText text={para} />
              </p>
            ))}
        </Reveal>
      )}

      {kind === 'list' && items.length > 0 && (
        <ul className="max-w-3xl space-y-3">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={i}
              delay={i * 60}
              className="flex gap-3 font-body text-sm leading-relaxed text-paper-dim"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-dim" />
              <span>
                <RichText text={typeof item === 'string' ? item : item.title} />
              </span>
            </Reveal>
          ))}
        </ul>
      )}

      {kind === 'cards' && items.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal
              key={i}
              delay={(i % 2) * 90}
              className="flex flex-col rounded-lg border border-line bg-ink-2/40 p-7 transition-colors hover:border-gold-dim/60"
            >
              {item.tag && (
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-teal">
                  {item.tag}
                </span>
              )}
              {item.title && (
                <h3 className="mt-4 font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.02em] text-paper">
                  {item.title}
                </h3>
              )}
              {item.body && (
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-paper-dim">
                  <RichText text={item.body} />
                </p>
              )}
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
