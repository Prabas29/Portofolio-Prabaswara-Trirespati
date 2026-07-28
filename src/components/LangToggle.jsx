import { useLang } from '../i18n/LanguageContext.jsx'

const LANGS = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
]

// Segmented ID / EN switch. `className` lets callers position it per layout.
export default function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] transition-colors ${
              active ? 'bg-gold text-ink' : 'text-paper-dim hover:text-paper'
            }`}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
