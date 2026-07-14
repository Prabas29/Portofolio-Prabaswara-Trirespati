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
            <strong className="font-semibold text-paper">
              Computer Science student at BINUS University
            </strong>{' '}
            (2023–present) who enjoys working where data meets decision making. I began as an{' '}
            <strong className="font-semibold text-paper">Education Counselor</strong>, presenting to
            students and coordinating school partnerships, and I am now a{' '}
            <strong className="font-semibold text-paper">Product Specialist Intern</strong> at
            PT. Kognitif Skema Indonesia — supporting digital workplace tools, building simple
            internal tools and websites, and producing documentation and data reports for the team.
          </Reveal>
          <Reveal as="p" delay={80}>
            Alongside my degree, I am sharpening my analytics craft through the{' '}
            <strong className="font-semibold text-paper">
              Dibimbing Data Analytics &amp; Business Intelligence bootcamp
            </strong>{' '}
            — practicing <strong className="font-semibold text-paper">SQL, Python, Excel,</strong>{' '}
            and <strong className="font-semibold text-paper">Power BI</strong> on case studies that
            cover data cleaning, exploratory data analysis, and dashboard development. My academic
            interests sit in data analytics, data mining, and distributed cloud computing, and I work
            in Agile &amp; Scrum.
          </Reveal>
          <Reveal as="p" delay={160}>
            I am keen to grow into{' '}
            <strong className="font-semibold text-paper">
              Data Analysis, Business Analysis,
            </strong>{' '}
            and <strong className="font-semibold text-paper">Product Management</strong> — turning
            raw data into insight, and insight into recommendations a team can actually act on.
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
