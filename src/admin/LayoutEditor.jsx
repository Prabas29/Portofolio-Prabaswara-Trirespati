import { IconBtn } from './Fields.jsx'
import { SECTION_SCHEMAS } from './schema.js'
import { customKey, isCustomId } from '../content/contentModel.js'

// Controls section order, visibility, and creation/removal of custom sections.
export default function LayoutEditor({ layout, content, onChangeLayout, onAddCustom, onRemoveCustom }) {
  const move = (i, dir) => {
    const next = [...layout]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChangeLayout(next)
  }

  const toggle = (i) =>
    onChangeLayout(
      layout.map((entry, idx) => (idx === i ? { ...entry, visible: entry.visible === false } : entry)),
    )

  const nameFor = (id) => {
    if (isCustomId(id)) {
      const data = content.en?.custom?.[customKey(id)] || content.id?.custom?.[customKey(id)]
      return data?.title || data?.navLabel || 'Section baru'
    }
    return SECTION_SCHEMAS[id]?.label || id
  }

  let visibleCount = 0

  return (
    <div className="space-y-6">
      <p className="font-body text-sm text-paper-dim">
        Atur urutan tampil, sembunyikan yang belum siap, atau buat section baru sendiri. Nomor
        (01, 02, …) dihitung otomatis dari section yang terlihat.
      </p>

      <div className="space-y-2">
        {layout.map((entry, i) => {
          const visible = entry.visible !== false
          if (visible) visibleCount += 1
          const custom = isCustomId(entry.id)
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 rounded-md border border-line p-3 ${
                visible ? 'bg-ink/50' : 'bg-ink/20 opacity-60'
              }`}
            >
              <span className="w-7 shrink-0 font-mono text-[0.68rem] text-teal">
                {visible ? String(visibleCount).padStart(2, '0') : '--'}
              </span>
              <span className="min-w-0 flex-1 truncate font-body text-sm text-paper">
                {nameFor(entry.id)}
                {custom && (
                  <span className="ml-2 rounded border border-gold/40 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-gold">
                    custom
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={`shrink-0 rounded border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors ${
                  visible
                    ? 'border-teal/50 text-teal hover:border-teal'
                    : 'border-line text-paper-dim hover:text-paper'
                }`}
              >
                {visible ? 'Tampil' : 'Tersembunyi'}
              </button>
              <IconBtn onClick={() => move(i, -1)} title="Naikkan">↑</IconBtn>
              <IconBtn onClick={() => move(i, 1)} title="Turunkan">↓</IconBtn>
              {custom && (
                <IconBtn onClick={() => onRemoveCustom(entry.id)} title="Hapus section" danger>
                  ×
                </IconBtn>
              )}
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onAddCustom}
        className="rounded-md border border-gold/60 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        + Buat section baru
      </button>
    </div>
  )
}
