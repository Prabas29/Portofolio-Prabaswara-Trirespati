import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'
import VisitorCount from './VisitorCount.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

// Language-neutral: the stats shown in the auto-scrolling tick strip.
const TICKS = [
  { value: 'Computer Science', label: { en: 'BINUS University, 2023 — present', id: 'BINUS University, 2023 — sekarang' } },
  { value: 'Data Analytics & BI', label: { en: 'Dibimbing bootcamp', id: 'bootcamp Dibimbing' } },
  { value: 'Python · SQL · Power BI', label: { en: 'data toolkit', id: 'perangkat data' } },
  { value: 'Data cleaning · EDA · Dashboards', label: { en: 'analytics practice', id: 'praktik analitik' } },
  { value: 'Agile & Scrum', label: { en: 'working methodology', id: 'metodologi kerja' } },
  { value: 'Business Analysis · Product · Project', label: { en: 'career focus', id: 'fokus karier' } },
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
  const { lang, t } = useLang()

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center pt-24 md:pt-16">
      <div className="px-6 sm:px-10 md:px-16">
        <div className="mx-auto w-full max-w-content">
          <Reveal className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper-dim">
            {t.hero.kicker}
          </Reveal>

          <Reveal
            as="h1"
            delay={90}
            className="mt-7 max-w-4xl font-display text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-paper"
          >
            {t.hero.headlineLead}
            <span className="italic font-[450] text-gold">{t.hero.headlineAccent}</span>
          </Reveal>

          <Reveal
            delay={170}
            className="mt-8 max-w-2xl font-body text-base leading-relaxed text-paper-dim sm:text-lg"
          >
            {t.hero.sub}
          </Reveal>

          <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper"
            >
              {t.hero.viewWork}
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-paper transition-colors hover:border-gold-dim hover:text-gold"
            >
              {t.hero.getInTouch}
            </a>
            <div className="w-full sm:ml-auto sm:w-auto">
              <VisitorCount />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Signature tick strip */}
      <div className="ticker-mask mt-16 overflow-hidden border-y border-line py-4 md:mt-24">
        <div className="ticker-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {TICKS.map((tick) => (
                <TickItem key={`${dup}-${tick.value}`} value={tick.value} label={tick.label[lang]} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
