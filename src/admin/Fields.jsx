import { useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'

const inputClass =
  'w-full rounded-md border border-line bg-ink px-3 py-2 font-body text-sm text-paper placeholder:text-paper-dim/60 focus:border-gold focus:outline-none'

export function Label({ children, hint }) {
  return (
    <div className="mb-1.5">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim">
        {children}
      </span>
      {hint && <p className="mt-0.5 font-body text-xs text-paper-dim/70">{hint}</p>}
    </div>
  )
}

export function TextField({ label, value, onChange, multiline, placeholder, hint }) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      {multiline ? (
        <textarea
          rows={4}
          className={`${inputClass} resize-y leading-relaxed`}
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={inputClass}
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

// Array-of-strings editor: one row per entry, add/remove/reorder.
export function ListField({ label, value, onChange, hint }) {
  const items = Array.isArray(value) ? value : []

  const update = (i, v) => onChange(items.map((item, idx) => (idx === i ? v : item)))
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const next = [...items]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChange(next)
  }

  return (
    <div>
      <Label hint={hint}>{label}</Label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <textarea
              rows={2}
              className={`${inputClass} resize-y`}
              value={typeof item === 'string' ? item : ''}
              onChange={(e) => update(i, e.target.value)}
            />
            <div className="flex shrink-0 flex-col gap-1">
              <IconBtn onClick={() => move(i, -1)} title="Naikkan">
                ↑
              </IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Turunkan">
                ↓
              </IconBtn>
              <IconBtn onClick={() => remove(i)} title="Hapus" danger>
                ×
              </IconBtn>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="mt-2 rounded-md border border-line px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:border-gold hover:text-gold"
      >
        + Tambah baris
      </button>
    </div>
  )
}

// Image field: paste a URL/path or upload straight to Supabase Storage.
export function ImageField({ label, value, onChange, hint }) {
  const fileRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const upload = async (file) => {
    if (!file || !supabase) return
    setBusy(true)
    setError('')
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('media')
        .upload(name, file, { cacheControl: '31536000', upsert: false })
      if (upErr) throw upErr
      const { data } = supabase.storage.from('media').getPublicUrl(name)
      onChange(data.publicUrl)
    } catch (e) {
      setError(e?.message || 'Gagal mengunggah. Pastikan bucket "media" sudah dibuat.')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div>
      <Label hint={hint}>{label}</Label>
      <div className="flex items-start gap-3">
        {value ? (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-white p-1">
            <img src={value} alt="" className="h-full w-full object-contain" />
          </span>
        ) : (
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-line font-mono text-[0.6rem] text-paper-dim">
            kosong
          </span>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            className={inputClass}
            value={value ?? ''}
            placeholder="/gambar.png atau https://…"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="rounded-md border border-line px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
            >
              {busy ? 'Mengunggah…' : 'Unggah gambar'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="rounded-md border border-line px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:border-red-400 hover:text-red-400"
              >
                Hapus
              </button>
            )}
          </div>
          {error && <p className="font-body text-xs text-red-400">{error}</p>}
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => upload(e.target.files?.[0])}
      />
    </div>
  )
}

export function IconBtn({ children, onClick, title, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded border border-line font-mono text-sm transition-colors ${
        danger
          ? 'text-paper-dim hover:border-red-400 hover:text-red-400'
          : 'text-paper-dim hover:border-gold hover:text-gold'
      }`}
    >
      {children}
    </button>
  )
}

// Dispatches to the right control based on a schema field definition.
export function SchemaField({ field, value, onChange }) {
  if (field.type === 'list') {
    return <ListField label={field.label} value={value} onChange={onChange} hint={field.hint} />
  }
  if (field.type === 'image') {
    return <ImageField label={field.label} value={value} onChange={onChange} hint={field.hint} />
  }
  return (
    <TextField
      label={field.label}
      value={value}
      onChange={onChange}
      multiline={field.type === 'textarea'}
      hint={field.hint}
    />
  )
}
