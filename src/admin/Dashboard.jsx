import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import {
  defaultContent,
  mergeContent,
  parseBoldSegments,
  CUSTOM_PREFIX,
  customKey,
  isCustomId,
} from '../content/contentModel.js'
import { CONTENT_ROW_ID } from '../i18n/LanguageContext.jsx'
import { SECTION_SCHEMAS } from './schema.js'
import { alignLanguages, otherLang, syncCustomSection, syncSection } from './sync.js'
import SectionEditor from './SectionEditor.jsx'
import CustomSectionEditor from './CustomSectionEditor.jsx'
import LayoutEditor from './LayoutEditor.jsx'

const EDITABLE_KEYS = ['hero', 'about', 'competencies', 'education', 'experience', 'projects', 'skills', 'certifications', 'contact', 'sidebar']

export default function Dashboard({ session }) {
  const [content, setContent] = useState(null)
  const [lang, setLang] = useState('id')
  const [active, setActive] = useState('layout')
  const [status, setStatus] = useState({ state: 'loading', message: 'Memuat konten…' })
  const [dirty, setDirty] = useState(false)

  // Load the saved document, or start from the bundled defaults.
  useEffect(() => {
    if (!supabase) return
    supabase
      .from('site_content')
      .select('data')
      .eq('id', CONTENT_ROW_ID)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) {
          setContent(defaultContent)
          setStatus({
            state: 'error',
            message: 'Tabel site_content belum ada — jalankan supabase-setup.sql dulu.',
          })
          return
        }
        setContent(data?.data ? mergeContent(data.data) : defaultContent)
        setStatus({
          state: 'idle',
          message: data?.data ? 'Konten tersimpan dimuat.' : 'Belum ada data tersimpan — memakai konten bawaan.',
        })
      })
  }, [])

  // Warn before losing unsaved edits.
  useEffect(() => {
    const handler = (e) => {
      if (!dirty) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  const sectionTabs = useMemo(() => {
    if (!content) return []
    const customTabs = content.layout
      .filter((entry) => isCustomId(entry.id))
      .map((entry) => {
        const key = customKey(entry.id)
        const data = content[lang]?.custom?.[key] || content.en?.custom?.[key]
        return { id: entry.id, label: data?.title || data?.navLabel || 'Section baru', custom: true }
      })
    return [
      ...EDITABLE_KEYS.map((key) => ({ id: key, label: SECTION_SCHEMAS[key].label })),
      ...customTabs,
    ]
  }, [content, lang])

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <p className="font-mono text-sm text-paper-dim">{status.message}</p>
      </div>
    )
  }

  // Every edit also updates the other language: shared fields (images, links,
  // proper nouns) are mirrored outright, and structural changes are replayed
  // so nothing added here goes missing there. See sync.js.
  const updateSection = (key, value) => {
    setDirty(true)
    setContent((prev) => {
      const other = otherLang(lang)
      const synced = syncSection({
        content: prev,
        lang,
        sectionKey: key,
        prev: prev[lang][key],
        next: value,
        schema: SECTION_SCHEMAS[key],
      })
      return {
        ...prev,
        [lang]: { ...prev[lang], [key]: value },
        [other]: { ...prev[other], [key]: synced },
      }
    })
  }

  const updateCustom = (id, value) => {
    setDirty(true)
    const key = customKey(id)
    setContent((prev) => {
      const other = otherLang(lang)
      const synced = syncCustomSection({
        content: prev,
        lang,
        key,
        prev: prev[lang].custom?.[key],
        next: value,
      })
      return {
        ...prev,
        [lang]: { ...prev[lang], custom: { ...prev[lang].custom, [key]: value } },
        [other]: { ...prev[other], custom: { ...prev[other].custom, [key]: synced } },
      }
    })
  }

  // Copies the section currently on screen over the other language verbatim —
  // handy as a translation starting point.
  const copySectionToOtherLang = () => {
    const other = otherLang(lang)
    const name = isCustomId(active)
      ? content[lang].custom?.[customKey(active)]?.title || 'section ini'
      : SECTION_SCHEMAS[active].label
    if (
      !window.confirm(
        `Salin isi "${name}" dari ${lang.toUpperCase()} ke ${other.toUpperCase()}?\n\nTeks ${other.toUpperCase()} yang ada sekarang akan ditimpa.`,
      )
    )
      return
    setDirty(true)
    setContent((prev) => {
      if (isCustomId(active)) {
        const key = customKey(active)
        return {
          ...prev,
          [other]: {
            ...prev[other],
            custom: { ...prev[other].custom, [key]: structuredClone(prev[lang].custom[key]) },
          },
        }
      }
      return {
        ...prev,
        [other]: { ...prev[other], [active]: structuredClone(prev[lang][active]) },
      }
    })
    setStatus({ state: 'idle', message: `Disalin ke ${other.toUpperCase()}. Jangan lupa Simpan.` })
  }

  // Repairs documents that already drifted apart before syncing existed.
  const alignAll = () => {
    const other = otherLang(lang)
    if (
      !window.confirm(
        `Samakan struktur ${other.toUpperCase()} dengan ${lang.toUpperCase()}?\n\n` +
          `Jumlah entri disamakan dan gambar/link/tahun disalin. Teks terjemahan yang sudah ada TIDAK diubah.`,
      )
    )
      return
    setDirty(true)
    setContent((prev) => alignLanguages(prev, lang))
    setStatus({
      state: 'idle',
      message: `Struktur ${other.toUpperCase()} disamakan dengan ${lang.toUpperCase()}. Jangan lupa Simpan.`,
    })
  }

  const addCustomSection = () => {
    const key = `s${Date.now().toString(36)}`
    const id = `${CUSTOM_PREFIX}${key}`
    const blank = { navLabel: 'Section Baru', eyebrow: '', title: 'Section Baru', note: '', kind: 'text', body: '', items: [] }
    setDirty(true)
    setContent((prev) => ({
      ...prev,
      layout: [...prev.layout.filter((e) => e.id !== 'contact'), { id, visible: true }, ...prev.layout.filter((e) => e.id === 'contact')],
      en: { ...prev.en, custom: { ...prev.en.custom, [key]: { ...blank } } },
      id: { ...prev.id, custom: { ...prev.id.custom, [key]: { ...blank } } },
    }))
    setActive(id)
  }

  const removeCustomSection = (id) => {
    if (!window.confirm('Hapus section ini beserta isinya?')) return
    const key = customKey(id)
    setDirty(true)
    setContent((prev) => {
      const next = { ...prev, layout: prev.layout.filter((e) => e.id !== id) }
      for (const l of ['en', 'id']) {
        const custom = { ...next[l].custom }
        delete custom[key]
        next[l] = { ...next[l], custom }
      }
      return next
    })
    setActive('layout')
  }

  const save = async () => {
    setStatus({ state: 'saving', message: 'Menyimpan…' })

    // Normalize About paragraphs back into segment arrays so the public site
    // renders bold text the same way regardless of which format it reads.
    const payload = structuredClone(content)
    for (const l of ['en', 'id']) {
      const paragraphs = payload[l]?.about?.paragraphs
      if (Array.isArray(paragraphs)) {
        payload[l].about.paragraphs = paragraphs
          .filter((p) => (typeof p === 'string' ? p.trim() !== '' : true))
          .map(parseBoldSegments)
      }
    }

    const { error } = await supabase
      .from('site_content')
      .upsert({ id: CONTENT_ROW_ID, data: payload, updated_at: new Date().toISOString() })

    if (error) {
      setStatus({ state: 'error', message: `Gagal menyimpan: ${error.message}` })
      return
    }
    setDirty(false)
    setStatus({ state: 'saved', message: 'Tersimpan. Muat ulang website untuk melihat hasilnya.' })
  }

  const statusColor =
    status.state === 'error'
      ? 'text-red-300'
      : status.state === 'saved'
        ? 'text-teal'
        : 'text-paper-dim'

  return (
    <div className="min-h-screen bg-ink text-paper">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3">
          <span className="font-display text-lg font-semibold tracking-[-0.02em]">
            Dashboard<span className="text-gold"> Admin</span>
          </span>

          {/* Language switch — content is edited per language */}
          <div className="ml-2 inline-flex rounded-full border border-line p-0.5">
            {['id', 'en'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors ${
                  lang === l ? 'bg-gold text-ink' : 'text-paper-dim hover:text-paper'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            {dirty && (
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-gold">
                belum disimpan
              </span>
            )}
            <a
              href="/"
              className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:text-gold"
            >
              Lihat website
            </a>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:text-gold"
            >
              Keluar
            </button>
            <button
              type="button"
              onClick={save}
              disabled={status.state === 'saving'}
              className="rounded-full bg-gold px-5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper disabled:opacity-60"
            >
              {status.state === 'saving' ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </div>
        {status.message && (
          <div className="mx-auto max-w-6xl px-5 pb-2">
            <p className={`font-body text-xs ${statusColor}`}>{status.message}</p>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 lg:flex-row">
        {/* Section list */}
        <nav className="shrink-0 lg:w-56">
          <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-paper-dim">
            Bagian
          </p>
          <div className="flex flex-wrap gap-1.5 lg:flex-col">
            <TabButton active={active === 'layout'} onClick={() => setActive('layout')}>
              Urutan &amp; Section
            </TabButton>
            {sectionTabs.map((tab) => (
              <TabButton key={tab.id} active={active === tab.id} onClick={() => setActive(tab.id)}>
                {tab.label}
                {tab.custom && <span className="ml-1.5 text-gold">•</span>}
              </TabButton>
            ))}
          </div>
          <div className="mt-4 space-y-2 rounded-md border border-line bg-ink-2/30 p-3">
            <p className="font-body text-xs leading-relaxed text-paper-dim/80">
              Sedang mengedit bahasa{' '}
              <strong className="text-paper-dim">{lang.toUpperCase()}</strong>.
            </p>
            <p className="font-body text-xs leading-relaxed text-paper-dim/70">
              Menambah, menghapus, atau mengurutkan entri otomatis ikut ke{' '}
              {otherLang(lang).toUpperCase()}. Field bertanda{' '}
              <span className="font-mono text-[0.6rem] text-teal">↔ 2 bahasa</span> (gambar, link,
              tahun, nama) juga langsung sama. Hanya kalimat terjemahan yang perlu Anda isi
              terpisah.
            </p>
          </div>
        </nav>

        {/* Editor pane */}
        <main className="min-w-0 flex-1">
          <div className="rounded-lg border border-line bg-ink-2/40 p-6">
            {active === 'layout' ? (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">
                    Urutan &amp; Section
                  </h2>
                  <button
                    type="button"
                    onClick={alignAll}
                    className="rounded-md border border-line px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:border-teal hover:text-teal"
                  >
                    Samakan struktur {otherLang(lang).toUpperCase()} dengan {lang.toUpperCase()}
                  </button>
                </div>
                <LayoutEditor
                  layout={content.layout}
                  content={content}
                  onChangeLayout={(next) => {
                    setDirty(true)
                    setContent((prev) => ({ ...prev, layout: next }))
                  }}
                  onAddCustom={addCustomSection}
                  onRemoveCustom={removeCustomSection}
                />
              </>
            ) : isCustomId(active) ? (
              <>
                <EditorHeading
                  title={content[lang].custom?.[customKey(active)]?.title || 'Section Baru'}
                  lang={lang}
                  onCopy={copySectionToOtherLang}
                />
                <CustomSectionEditor
                  data={content[lang].custom?.[customKey(active)]}
                  onChange={(v) => updateCustom(active, v)}
                />
              </>
            ) : (
              <>
                <EditorHeading
                  title={SECTION_SCHEMAS[active].label}
                  lang={lang}
                  onCopy={copySectionToOtherLang}
                />
                <SectionEditor
                  sectionKey={active}
                  data={content[lang][active]}
                  onChange={(v) => updateSection(active, v)}
                />
              </>
            )}
          </div>

          <p className="mt-4 font-mono text-[0.62rem] text-paper-dim/60">
            Masuk sebagai {session?.user?.email}
          </p>
        </main>
      </div>
    </div>
  )
}

function EditorHeading({ title, lang, onCopy }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">{title}</h2>
      <button
        type="button"
        onClick={onCopy}
        className="rounded-md border border-line px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:border-gold hover:text-gold"
      >
        Salin {lang.toUpperCase()} → {otherLang(lang).toUpperCase()}
      </button>
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-left font-body text-sm transition-colors ${
        active ? 'bg-ink-2 text-gold' : 'text-paper-dim hover:bg-ink-2/60 hover:text-paper'
      }`}
    >
      {children}
    </button>
  )
}
