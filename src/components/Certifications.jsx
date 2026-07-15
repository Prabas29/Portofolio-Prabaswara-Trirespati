import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'

const CERTS = [
  {
    name: 'Website Design with MySQL and PHP',
    issuer: 'BINUS University × Great Nusa',
    year: '2025',
    image: '/cert-website-mysql.jpeg',
  },
  {
    name: 'Introduction to Agile and Scrum Methodologies',
    issuer: 'BINUS University × Great Nusa',
    year: '2025',
    image: '/cert-agile-scrum.jpeg',
  },
  {
    name: 'Professional Office (CEFR C)',
    issuer: 'BINUS University × Beelingua',
    year: '2024',
    image: '/cert-professional-office.jpeg',
  },
  {
    name: 'Market Research & Business Communication (CEFR C)',
    issuer: 'BINUS University × Beelingua',
    year: '2024',
    image: '/cert-market-research.jpeg',
  },
  {
    name: 'Delivering an Effective Presentation — Marketing Associate',
    issuer: 'BINUS University',
    year: '2024',
    image: '/cert-presentation.jpeg',
  },
]

export default function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeader
        num="07"
        eyebrow="Credentials"
        title="Certifications & Training"
        note="Continuous professional development, 2024–2025."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => (
          <Reveal
            key={c.name}
            delay={(i % 3) * 90}
            className="group flex flex-col overflow-hidden rounded-lg border border-line bg-ink-2/40 transition-all duration-300 hover:-translate-y-[3px] hover:border-gold-dim"
          >
            <a
              href={c.image}
              target="_blank"
              rel="noreferrer"
              className="block"
              aria-label={`Open ${c.name} certificate`}
            >
              {/* White backdrop keeps the light-colored certificates crisp on the dark card. */}
              <div className="overflow-hidden border-b border-line bg-white">
                <img
                  src={c.image}
                  alt={`${c.name} certificate`}
                  loading="lazy"
                  className="aspect-[1.4/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </a>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-body text-[0.95rem] font-medium leading-snug text-paper">
                  {c.name}
                </h3>
                <span className="shrink-0 font-mono text-sm tabular-nums text-gold">{c.year}</span>
              </div>
              <div className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-paper-dim">
                {c.issuer}
              </div>
              <a
                href={c.image}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-gold transition-colors hover:text-paper"
              >
                View certificate
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
