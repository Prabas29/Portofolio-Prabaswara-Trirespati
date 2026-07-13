import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const CERTS = [
  {
    name: 'Website Design with MySQL and PHP',
    issuer: 'BINUS University × Great Nusa',
    year: '2025',
  },
  {
    name: 'Introduction to Agile and Scrum Methodologies',
    issuer: 'BINUS University × Great Nusa',
    year: '2025',
  },
  {
    name: 'Professional Office (CEFR C)',
    issuer: 'BINUS University × Beelingua',
    year: '2024',
  },
  {
    name: 'Market Research & Business Communication (CEFR C)',
    issuer: 'BINUS University × Beelingua',
    year: '2024',
  },
  {
    name: 'Delivering an Effective Presentation — Marketing Associate',
    issuer: 'BINUS University',
    year: '2024',
  },
]

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader
        num="06"
        eyebrow="Credentials"
        title="Certifications & Training"
        note="Continuous professional development, 2024–2025."
      />

      <div>
        {CERTS.map((c) => (
          <Reveal
            key={c.name}
            className="flex items-start justify-between gap-6 border-t border-line py-6"
          >
            <div>
              <div className="font-body text-base font-medium text-paper">{c.name}</div>
              <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-paper-dim">
                {c.issuer}
              </div>
            </div>
            <span className="shrink-0 font-mono text-sm tabular-nums text-gold">{c.year}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
