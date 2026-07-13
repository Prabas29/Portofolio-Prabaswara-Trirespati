import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const GROUPS = [
  { label: 'Data Analysis', items: ['SQL', 'Python', 'Power BI', 'Excel'] },
  {
    label: 'Productivity & Collaboration',
    items: ['Google Workspace', 'Microsoft 365', 'Notion', 'Trello', 'Lark'],
  },
  { label: 'Methodology', items: ['Agile', 'Scrum', 'User-Centered Design'] },
  {
    label: 'Languages',
    items: ['Bahasa Indonesia — Native', 'English — Intermediate'],
  },
]

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        num="05"
        eyebrow="Toolkit"
        title="Skills & Languages"
        note="Tools I use day to day for analysis and project execution."
      />

      <div className="grid gap-10 sm:grid-cols-2">
        {GROUPS.map((g, i) => (
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
