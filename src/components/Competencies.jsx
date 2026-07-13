import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const CARDS = [
  {
    tag: '// ANALYSIS',
    title: 'Business Analyst',
    body: 'Identifying business needs, analyzing operational processes, and building data-driven recommendations to improve organizational efficiency using Excel, SQL, and Google Sheets.',
  },
  {
    tag: '// STRATEGY',
    title: 'Product Management',
    body: 'Designing product concepts based on market research and user needs, managing the product lifecycle, and collaborating cross-functionally to align with business goals.',
  },
  {
    tag: '// EXECUTION',
    title: 'Project Management',
    body: 'Planning, organizing, and monitoring project execution to stay on schedule, budget, and objectives — including team coordination and risk management.',
  },
]

export default function Competencies() {
  return (
    <Section id="competencies">
      <SectionHeader
        num="02"
        eyebrow="Capabilities"
        title="Core Competencies"
        note="The three pillars behind how I approach a problem."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal
            key={c.title}
            delay={i * 100}
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
