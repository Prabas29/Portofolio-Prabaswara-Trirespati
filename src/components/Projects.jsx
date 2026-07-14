import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'

const PROJECTS = [
  {
    index: '01 / SOFTWARE ENGINEERING',
    title: 'Restaurant Management System',
    body: 'A restaurant management system built to improve operational efficiency, developed with Laravel and a Filament admin panel.',
    stack: ['Laravel', 'MySQL', 'Tailwind CSS', 'Filament'],
    href: 'https://drive.google.com/file/d/1FrYjWAkcc_6oECLrzEO9qM1S3GJatpBQ/view',
  },
  {
    index: '02 / DATA ANALYTICS',
    title: 'Heart Attack Prediction in Indonesia',
    body: 'Applied machine learning models (Random Forest, Logistic Regression, ANN) using Python for predictive analysis and data visualization.',
    stack: ['Python', 'Random Forest', 'ANN', 'Data Viz'],
    href: 'https://drive.google.com/file/d/1MppgMrViNUGRwUjlvrqDDjUovA20sqKR/view',
  },
  {
    index: '03 / COMPUTATIONAL BIOLOGY',
    title: 'BLAST vs MUSCLE v5 Analysis',
    body: 'A comparative analysis of BLAST and MUSCLE v5 for sequence alignment across human, animal, and disease studies — with performance-based recommendations.',
    stack: ['BLAST', 'MUSCLE v5', 'Bioinformatics'],
    href: 'https://drive.google.com/file/d/1Vyw1geTqI78IBBXTD_w1y7AZzfupJdO2/view',
  },
  {
    index: '04 / DATA APP',
    title: 'Nusantara Weather Insight',
    body: 'An interactive Streamlit dashboard showing real-time and forecast weather across all 38 provinces of Indonesia, with data pulled from the free Open-Meteo API.',
    stack: ['Python', 'Streamlit', 'Open-Meteo API'],
    href: 'https://nusantara-weather-insight-5fivlrftmfdhdhlqhvrrwa.streamlit.app/',
  },
]

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        num="05"
        eyebrow="Portfolio"
        title="Selected Work"
        note="Click to open the project details on Google Drive."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 2) * 90}
            className="group flex flex-col rounded-lg border border-line bg-ink-2/40 p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-gold-dim"
          >
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper-dim">
              {p.index}
            </span>
            <h3 className="mt-4 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-paper">
              {p.title}
            </h3>
            <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-paper-dim">
              {p.body}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-teal-dim/70 px-3 py-1 font-mono text-[0.65rem] tracking-[0.06em] text-teal"
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-gold transition-colors hover:text-paper"
            >
              View project
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
