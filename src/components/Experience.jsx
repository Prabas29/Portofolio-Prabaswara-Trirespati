import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const ROLES = [
  {
    period: 'FEB 2026 — PRESENT',
    role: 'Product Specialist Intern',
    org: 'PT. Kognitif Skema Indonesia',
    logo: '/logoSkema.webp',
    points: [
      'Supporting the setup and configuration of digital workplace tools such as Microsoft 365, Google Workspace, and Lark.',
      'Managing user access, permissions, and group administration for efficient system usage.',
      'Developing simple software solutions — internal tools, applications, and websites for operational processes.',
      'Producing documentation, user guides, and data reports using Excel, Google Sheets, and Power BI.',
    ],
  },
  {
    period: 'JUN 2024 — AUG 2025',
    role: 'Education Counselor — Team Promotion',
    org: 'BINUS University',
    logo: '/logoBinus2.png',
    points: [
      'Delivered interactive presentations to 800+ students & parents across partner schools, introducing 15+ study programs.',
      'Organized 20+ outreach activities, seminars, and educational counseling sessions.',
      'Managed partnerships with 25 schools through regular coordination and documentation using Google Sheets.',
      'Contributed to promotional strategy and publication materials to strengthen the BINUS brand across Greater Jakarta.',
    ],
  },
]

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        num="04"
        eyebrow="Track Record"
        title="Work Experience"
        note="From education to enterprise product — most recent to earliest."
      />

      <div>
        {ROLES.map((r) => (
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
