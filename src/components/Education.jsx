import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const SCHOOLS = [
  {
    period: '2023 — PRESENT',
    school: 'BINUS University',
    degree: "Bachelor's Degree, Computer Science",
    logo: '/logo-binus.png',
    points: [
      'Field of Interest: Data Analytics, Distributed Cloud Computing, and Data Mining.',
      'Software Skills: Microsoft Office (Word, Excel, PowerPoint), Google Workspace (Docs, Sheets, Forms), SQL, Python, Power BI, and project management tools (Trello & Notion).',
      'Soft Skills: Leadership, Teamwork, Public Speaking, Time Management, Problem Solving, Presentation Skills, Communication, Critical Thinking, Good Integrity, and Visioneering.',
    ],
  },
  {
    period: 'APR 2026 — PRESENT',
    school: 'Dibimbing',
    degree: 'Data Analytics and Business Intelligence Bootcamp',
    logo: '/logo-dibimbing.png',
    points: [
      'Learning data analysis, business intelligence, and data visualization using SQL, Python, Excel, and visualization tools.',
      'Working on hands-on projects and case studies covering data cleaning, exploratory data analysis (EDA), dashboard creation, and data-driven decision making.',
      'Focus areas: SQL practice, Python data analysis, dashboard development, business intelligence case studies, and team collaboration.',
    ],
  },
]

export default function Education() {
  return (
    <Section id="education">
      <SectionHeader
        num="03"
        eyebrow="Education"
        title="Educational Background"
        note="Formal degree and ongoing data analytics training."
      />

      <div>
        {SCHOOLS.map((s) => (
          <Reveal
            key={s.school}
            className="grid gap-6 border-t border-line py-10 md:grid-cols-[180px_1fr] md:gap-10"
          >
            <div className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-teal">
              {s.period}
            </div>
            <div>
              <div className="flex items-center gap-4">
                {/* White tile keeps dark-inked logos legible on the dark background.
                    Fixed height with auto width lets wide and square logos both sit naturally. */}
                <span className="flex h-14 shrink-0 items-center justify-center rounded-md bg-white px-2.5 py-2">
                  <img
                    src={s.logo}
                    alt={`${s.school} logo`}
                    loading="lazy"
                    className="h-full w-auto object-contain"
                  />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-paper sm:text-2xl">
                    {s.school}
                  </h3>
                  <p className="mt-0.5 font-body text-sm text-paper-dim">{s.degree}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {s.points.map((p, i) => (
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
