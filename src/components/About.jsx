import Section from './Section.jsx'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <Section id="about">
      <SectionHeader
        num="01"
        eyebrow="Profile"
        title="About Me"
        note="A snapshot of my background, career direction, and how I work."
      />

      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div className="space-y-6 font-body text-base leading-relaxed text-paper-dim">
          <Reveal as="p">
            I am a{' '}
            <strong className="font-semibold text-paper">Computer Science student at BINUS University</strong>{' '}
            (2023–present), with experience as an{' '}
            <strong className="font-semibold text-paper">Education Counselor</strong> and now as a{' '}
            <strong className="font-semibold text-paper">Product Specialist Intern</strong> at
            PT. Kognitif Skema Indonesia — working directly with banking clients such as BNI,
            Bank Mega, and Bank INA on vendor evaluation, product demos, and enterprise AI project
            documentation.
          </Reveal>
          <Reveal as="p" delay={80}>
            My core focus spans{' '}
            <strong className="font-semibold text-paper">
              project management, data analysis, and web-based system development
            </strong>
            , backed by an understanding of Agile &amp; Scrum methodologies and the ability to build
            data dashboards (Power BI, SQL, Python) that turn raw data into actionable insight.
          </Reveal>
          <Reveal as="p" delay={160}>
            I'm keen to grow a career in{' '}
            <strong className="font-semibold text-paper">
              Business Analysis, Product Management,
            </strong>{' '}
            and <strong className="font-semibold text-paper">Project Management</strong> — with data
            always at the foundation of every recommendation.
          </Reveal>
        </div>

        <Reveal delay={120} className="md:pt-1">
          <figure className="relative">
            <div className="overflow-hidden rounded-lg border border-line bg-ink-2/40">
              <img
                src="/profile.png"
                alt="Prabaswara Trirespati"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim">
              <span>Prabaswara Trirespati</span>
              <span className="text-gold">Jakarta, ID</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
