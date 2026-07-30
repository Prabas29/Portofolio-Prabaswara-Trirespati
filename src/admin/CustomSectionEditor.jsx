import { useState } from 'react'
import { SchemaField, TextField, ListField, IconBtn, Label } from './Fields.jsx'
import { CUSTOM_FIELDS, CUSTOM_KINDS } from './schema.js'

// Editor for a section the owner created. `kind` decides which body control
// is shown: free text, a bulleted list, or cards.
export default function CustomSectionEditor({ data, onChange }) {
  const value = data || {}
  const kind = value.kind || 'text'
  const set = (key, v) => onChange({ ...value, [key]: v })

  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        {CUSTOM_FIELDS.map((f) => (
          <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <SchemaField field={f} value={value[f.key]} onChange={(v) => set(f.key, v)} />
          </div>
        ))}
      </div>

      <div>
        <Label>Tipe tampilan</Label>
        <div className="flex flex-wrap gap-2">
          {CUSTOM_KINDS.map((k) => (
            <button
              key={k.value}
              type="button"
              onClick={() => set('kind', k.value)}
              className={`rounded-md border px-3 py-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-colors ${
                kind === k.value
                  ? 'border-gold bg-gold text-ink'
                  : 'border-line text-paper-dim hover:border-gold hover:text-gold'
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      {kind === 'text' && (
        <TextField
          label="Isi teks"
          value={value.body}
          onChange={(v) => set('body', v)}
          multiline
          hint="Pisahkan paragraf dengan satu baris kosong. **Tebal** pakai dua bintang."
        />
      )}

      {kind === 'list' && (
        <ListField
          label="Daftar poin"
          value={(value.items || []).map((i) => (typeof i === 'string' ? i : i.title || ''))}
          onChange={(v) => set('items', v)}
          hint="Satu baris per poin."
        />
      )}

      {kind === 'cards' && <CardsEditor items={value.items} onChange={(v) => set('items', v)} />}
    </div>
  )
}

function CardsEditor({ items, onChange }) {
  const [openIndex, setOpenIndex] = useState(0)
  const list = (Array.isArray(items) ? items : []).map((i) =>
    typeof i === 'string' ? { title: i } : i,
  )

  const update = (i, key, v) =>
    onChange(list.map((item, idx) => (idx === i ? { ...item, [key]: v } : item)))
  const remove = (i) => onChange(list.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const next = [...list]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChange(next)
    setOpenIndex(target)
  }

  return (
    <div>
      <Label>Kartu ({list.length})</Label>
      <div className="space-y-2">
        {list.map((item, i) => {
          const open = openIndex === i
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
                  <span className="truncate font-body text-sm text-paper">
                    {item.title || `Kartu ${i + 1}`}
                  </span>
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
                  <TextField label="Tag kecil" value={item.tag} onChange={(v) => update(i, 'tag', v)} />
                  <TextField label="Judul" value={item.title} onChange={(v) => update(i, 'title', v)} />
                  <TextField
                    label="Deskripsi"
                    value={item.body}
                    onChange={(v) => update(i, 'body', v)}
                    multiline
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          onChange([...list, { tag: '', title: '', body: '' }])
          setOpenIndex(list.length)
        }}
        className="mt-3 rounded-md border border-gold/60 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        + Tambah kartu
      </button>
    </div>
  )
}
