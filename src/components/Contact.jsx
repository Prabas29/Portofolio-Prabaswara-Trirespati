import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import Arrow from './Arrow.jsx'

const CONTACTS = [
  {
    label: 'Email',
    value: 'prabaswaratrirespati12@gmail.com',
    href: 'mailto:prabaswaratrirespati12@gmail.com',
  },
  {
    label: 'Phone',
    value: '(+62) 878-8222-8360',
    href: 'tel:+6287882228360',
  },
  {
    label: 'LinkedIn',
    value: '/in/prabaswara-trirespati',
    href: 'https://linkedin.com/in/prabaswara-trirespati',
    external: true,
  },
]

export default function Contact() {
  return (
    <Section id="contact">
      <Reveal className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-gold">
        08 <span className="text-paper-dim">— Connect</span>
      </Reveal>

      <Reveal
        as="h2"
        delay={80}
        className="mt-6 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper"
      >
        Let's talk about the{' '}
        <span className="italic font-[450] text-gold">next opportunity.</span>
      </Reveal>

      <div className="mt-14">
        {CONTACTS.map((c) => (
          <Reveal key={c.label}>
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group flex items-center justify-between gap-6 border-b border-line py-6 transition-colors hover:border-gold-dim"
            >
              <span className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-paper-dim">
                  {c.label}
                </span>
                <span className="font-body text-lg text-paper transition-colors group-hover:text-gold sm:text-xl">
                  {c.value}
                </span>
              </span>
              <Arrow className="text-paper-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold" />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
