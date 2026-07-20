import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'

const TICKS = [
  { value: 'Computer Science', label: 'BINUS University, 2023 — present' },
  { value: 'Data Analytics & BI', label: 'Dibimbing bootcamp' },
  { value: 'Python · SQL · Power BI', label: 'data toolkit' },
  { value: 'Data cleaning · EDA · Dashboards', label: 'analytics practice' },
  { value: 'Agile & Scrum', label: 'working methodology' },
  { value: 'Business Analysis · Product · Project', label: 'career focus' },
]

function TickItem({ value, label }) {
  return (
    <span className="mx-8 inline-flex items-baseline gap-2.5 font-mono text-sm">
      <span className="font-medium text-teal">{value}</span>
      <span className="text-paper-dim">{label}</span>
      <span className="ml-6 text-line">/</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center pt-24 md:pt-16">
      <div className="px-6 sm:px-10 md:px-16">
        <div className="mx-auto w-full max-w-content">
          <Reveal className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-dim">
            Jakarta, Indonesia — Open to opportunities
          </Reveal>

          <Reveal
            as="h1"
            delay={90}
            className="mt-7 max-w-4xl font-display text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-paper"
          >
            Turning data into{' '}
            <span className="italic font-[450] text-gold">business decisions.</span>
          </Reveal>

          <Reveal
            delay={170}
            className="mt-8 max-w-2xl font-body text-base leading-relaxed text-paper-dim sm:text-lg"
          >
            Computer Science student at BINUS University and Product Specialist
            Intern at PT. Kognitif Skema Indonesia, working at the intersection of data
            analysis, product management, and web-based solutions.
          </Reveal>

          <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper"
            >
              View Work
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold-dim hover:text-gold"
            >
              Get in Touch
            </a>
          </Reveal>
        </div>
      </div>

      {/* Signature tick strip */}
      <div className="ticker-mask mt-16 overflow-hidden border-y border-line py-4 md:mt-24">
        <div className="ticker-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {TICKS.map((t) => (
                <TickItem key={`${dup}-${t.value}`} {...t} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
