import { useState } from 'react'
import { SchemaField, TextField, IconBtn, Label } from './Fields.jsx'
import { HEADER_FIELDS, SECTION_SCHEMAS } from './schema.js'
import { paragraphToText } from '../content/contentModel.js'

// Collapsible list of repeated entries (work experience, projects, …).
function Repeater({ config, items, onChange }) {
  const [openIndex, setOpenIndex] = useState(0)
  const list = Array.isArray(items) ? items : []

  const updateItem = (i, key, value) =>
    onChange(list.map((item, idx) => (idx === i ? { ...item, [key]: value } : item)))

  const remove = (i) => {
    onChange(list.filter((_, idx) => idx !== i))
    setOpenIndex(-1)
  }

  const move = (i, dir) => {
    const next = [...list]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChange(next)
    setOpenIndex(target)
  }

  const add = () => {
    const blank = {}
    config.fields.forEach((f) => {
      blank[f.key] = f.type === 'list' ? [] : ''
    })
    onChange([...list, blank])
    setOpenIndex(list.length)
  }

  return (
    <div>
      <Label>{config.itemLabel} ({list.length})</Label>
      <div className="space-y-2">
        {list.map((item, i) => {
          const open = openIndex === i
          const heading = item[config.titleKey] || `${config.itemLabel} ${i + 1}`
          return (
            <div key={i} className="rounded-md border border-line bg-ink/50">
              <div className="flex items-center gap-2 p-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <span className="font-mono text-[0.62rem] text-teal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate font-body text-sm text-paper">{heading}</span>
                  <span className="ml-auto font-mono text-xs text-paper-dim">
                    {open ? '▾' : '▸'}
                  </span>
                </button>
                <IconBtn onClick={() => move(i, -1)} title="Naikkan">↑</IconBtn>
                <IconBtn onClick={() => move(i, 1)} title="Turunkan">↓</IconBtn>
                <IconBtn onClick={() => remove(i)} title="Hapus" danger>×</IconBtn>
              </div>
              {open && (
                <div className="space-y-4 border-t border-line p-4">
                  {config.fields.map((f) => (
                    <SchemaField
                      key={f.key}
                      field={f}
                      value={item[f.key]}
                      onChange={(v) => updateItem(i, f.key, v)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 rounded-md border border-gold/60 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        + Tambah {config.itemLabel}
      </button>
    </div>
  )
}

// Editor for one built-in section, driven entirely by SECTION_SCHEMAS.
export default function SectionEditor({ sectionKey, data, onChange }) {
  const schema = SECTION_SCHEMAS[sectionKey]
  if (!schema) return null

  const value = data || {}
  const set = (key, v) => onChange({ ...value, [key]: v })

  const headerFields = schema.header ? HEADER_FIELDS : []
  const flatFields = [...headerFields, ...(schema.fields || []), ...(schema.extraFields || [])]

  return (
    <div className="space-y-7">
      {schema.hint && <p className="font-body text-sm text-paper-dim">{schema.hint}</p>}

      {flatFields.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2">
          {flatFields.map((f) => (
            <div key={f.key} className={f.type === 'textarea' || f.type === 'list' ? 'sm:col-span-2' : ''}>
              <SchemaField field={f} value={value[f.key]} onChange={(v) => set(f.key, v)} />
            </div>
          ))}
        </div>
      )}

      {schema.paragraphs && (
        <ParagraphsEditor
          label={schema.paragraphs.label}
          value={value[schema.paragraphs.key]}
          onChange={(v) => set(schema.paragraphs.key, v)}
        />
      )}

      {schema.repeater && (
        <Repeater
          config={schema.repeater}
          items={value[schema.repeater.key]}
          onChange={(v) => set(schema.repeater.key, v)}
        />
      )}
    </div>
  )
}

// Paragraphs are stored as either segment arrays or **bold** strings; the
// editor always shows/writes the string form.
function ParagraphsEditor({ label, value, onChange }) {
  const list = (Array.isArray(value) ? value : []).map(paragraphToText)

  const update = (i, v) => onChange(list.map((p, idx) => (idx === i ? v : p)))
  const remove = (i) => onChange(list.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const next = [...list]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChange(next)
  }

  return (
    <div>
      <Label hint="Bungkus kata dengan **dua bintang** untuk membuatnya tebal.">{label}</Label>
      <div className="space-y-3">
        {list.map((p, i) => (
          <div key={i} className="flex items-start gap-2">
            <TextField label={`Paragraf ${i + 1}`} value={p} onChange={(v) => update(i, v)} multiline />
            <div className="mt-7 flex shrink-0 flex-col gap-1">
              <IconBtn onClick={() => move(i, -1)} title="Naikkan">↑</IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Turunkan">↓</IconBtn>
              <IconBtn onClick={() => remove(i)} title="Hapus" danger>×</IconBtn>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...list, ''])}
        className="mt-3 rounded-md border border-line px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:border-gold hover:text-gold"
      >
        + Tambah paragraf
      </button>
    </div>
  )
}
