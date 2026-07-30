import { translations } from '../i18n/translations.js'

// The editable content document. Shape:
//
//   { layout: [{ id, visible }], en: {...}, id: {...} }
//
// `en` / `id` reuse the exact shape the section components already read, so
// nothing downstream had to change. `layout` is language-neutral: it controls
// section order and visibility. Custom (user-created) sections live under
// each language's `custom` map, keyed by the same id used in `layout`.

export const BASE_SECTIONS = [
  'about',
  'competencies',
  'education',
  'experience',
  'projects',
  'skills',
  'certifications',
  'contact',
]

export const CUSTOM_PREFIX = 'custom:'

export const isCustomId = (id) => id.startsWith(CUSTOM_PREFIX)
export const customKey = (id) => id.slice(CUSTOM_PREFIX.length)

export const defaultContent = {
  layout: BASE_SECTIONS.map((id) => ({ id, visible: true })),
  en: { ...translations.en, custom: {} },
  id: { ...translations.id, custom: {} },
}

// Merges a stored document over the defaults so a document saved by an older
// version of the admin never leaves a section undefined.
export function mergeContent(remote) {
  if (!remote || typeof remote !== 'object') return defaultContent

  const merged = { layout: defaultContent.layout, en: {}, id: {} }

  // Keep stored layout, but drop unknown base ids and append any base section
  // that is missing (e.g. a section added in a later release).
  if (Array.isArray(remote.layout) && remote.layout.length > 0) {
    const known = remote.layout.filter(
      (entry) => entry && typeof entry.id === 'string' && (isCustomId(entry.id) || BASE_SECTIONS.includes(entry.id)),
    )
    const present = new Set(known.map((e) => e.id))
    const missing = BASE_SECTIONS.filter((id) => !present.has(id)).map((id) => ({ id, visible: true }))
    merged.layout = [...known, ...missing]
  }

  for (const lang of ['en', 'id']) {
    const base = defaultContent[lang]
    const incoming = remote[lang] && typeof remote[lang] === 'object' ? remote[lang] : {}
    merged[lang] = { ...base }
    for (const key of Object.keys(base)) {
      if (incoming[key] !== undefined) merged[lang][key] = incoming[key]
    }
    // Carry over keys that only exist in the stored doc (custom sections).
    for (const key of Object.keys(incoming)) {
      if (merged[lang][key] === undefined) merged[lang][key] = incoming[key]
    }
    if (!merged[lang].custom || typeof merged[lang].custom !== 'object') merged[lang].custom = {}
  }

  return merged
}

// Paragraphs are stored either as segment arrays (the original bundled format)
// or as plain strings using **bold** markers (what the admin editor writes).
// These helpers convert between the two so both render identically.
export function paragraphToText(paragraph) {
  if (typeof paragraph === 'string') return paragraph
  if (!Array.isArray(paragraph)) return ''
  return paragraph.map((seg) => (seg.b ? `**${seg.t}**` : seg.t)).join('')
}

export function parseBoldSegments(text) {
  if (Array.isArray(text)) return text
  if (typeof text !== 'string') return []
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((part) => part !== '')
    .map((part) =>
      part.startsWith('**') && part.endsWith('**')
        ? { t: part.slice(2, -2), b: true }
        : { t: part },
    )
}
