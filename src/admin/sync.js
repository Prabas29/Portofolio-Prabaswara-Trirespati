import { HEADER_FIELDS, SECTION_SCHEMAS } from './schema.js'

// Keeps the two languages in step while only one of them is being edited.
//
// Two rules:
//  1. Fields marked `shared` in the schema (images, links, years, proper
//     nouns) are written to BOTH languages — they are never translated.
//  2. Structural changes to lists (adding, removing, reordering an entry) are
//     replayed on the other language, so a project added in Indonesian never
//     goes missing in English. Plain wording edits are left alone, because
//     that is exactly what differs between languages.

export const otherLang = (lang) => (lang === 'id' ? 'en' : 'id')

const clone = (value) =>
  typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value))

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export function flatFieldsOf(schema) {
  return [
    ...(schema.header ? HEADER_FIELDS : []),
    ...(schema.fields || []),
    ...(schema.extraFields || []),
  ]
}

// Classifies the change between two versions of an array. The dashboard only
// ever performs one operation per interaction, which makes this reliable.
export function diffArrays(prev, next) {
  const p = Array.isArray(prev) ? prev : []
  const n = Array.isArray(next) ? next : []

  if (n.length > p.length) {
    let i = 0
    while (i < p.length && same(p[i], n[i])) i += 1
    return { type: 'insert', index: i }
  }

  if (n.length < p.length) {
    let i = 0
    while (i < n.length && same(p[i], n[i])) i += 1
    return { type: 'remove', index: i }
  }

  const changed = []
  for (let i = 0; i < n.length; i += 1) if (!same(p[i], n[i])) changed.push(i)

  if (changed.length === 0) return { type: 'none' }
  if (changed.length === 2) {
    const [i, j] = changed
    if (same(p[i], n[j]) && same(p[j], n[i])) return { type: 'swap', from: i, to: j }
  }
  if (changed.length === 1) return { type: 'edit', index: changed[0] }
  return { type: 'unknown' }
}

// Applies a detected operation to the other language's array. `sharedKeys`
// lists the object keys that must mirror on plain edits; pass an empty array
// to mirror structure only.
export function mirrorArray(target, op, sourceNext, sharedKeys = []) {
  const out = Array.isArray(target) ? [...target] : []
  const source = Array.isArray(sourceNext) ? sourceNext : []

  switch (op.type) {
    case 'insert': {
      const index = Math.min(op.index, out.length)
      out.splice(index, 0, clone(source[op.index]))
      return out
    }
    case 'remove': {
      if (op.index < out.length) out.splice(op.index, 1)
      return out
    }
    case 'swap': {
      if (op.from < out.length && op.to < out.length) {
        ;[out[op.from], out[op.to]] = [out[op.to], out[op.from]]
      }
      return out
    }
    case 'edit': {
      const src = source[op.index]
      // Item missing on the other side (drifted data) — copy it wholesale.
      if (op.index >= out.length) {
        out[op.index] = clone(src)
        return out
      }
      // Strings are translatable text; never overwrite them.
      if (!src || typeof src !== 'object' || sharedKeys.length === 0) return out
      const merged = { ...out[op.index] }
      for (const key of sharedKeys) merged[key] = clone(src[key])
      out[op.index] = merged
      return out
    }
    default:
      return out
  }
}

// Produces the other language's version of a built-in section.
export function syncSection({ content, lang, sectionKey, prev, next, schema }) {
  const target = { ...(content[otherLang(lang)]?.[sectionKey] || {}) }
  const before = prev || {}
  const after = next || {}

  for (const field of flatFieldsOf(schema)) {
    if (field.shared) target[field.key] = clone(after[field.key])
  }

  if (schema.paragraphs) {
    const key = schema.paragraphs.key
    const op = diffArrays(before[key], after[key])
    // Wording edits stay per-language; only structure is replayed.
    if (op.type !== 'none' && op.type !== 'edit' && op.type !== 'unknown') {
      target[key] = mirrorArray(target[key], op, after[key], [])
    }
  }

  if (schema.repeater) {
    const key = schema.repeater.key
    const sharedKeys = schema.repeater.fields.filter((f) => f.shared).map((f) => f.key)
    const op = diffArrays(before[key], after[key])
    if (op.type !== 'none' && op.type !== 'unknown') {
      target[key] = mirrorArray(target[key], op, after[key], sharedKeys)
    }
  }

  return target
}

// Same idea for a user-created section. Its layout type must match across
// languages, and list/card entries are kept structurally in step.
export function syncCustomSection({ content, lang, key, prev, next }) {
  const target = { ...(content[otherLang(lang)]?.custom?.[key] || {}) }
  const before = prev || {}
  const after = next || {}

  target.kind = after.kind || 'text'

  const op = diffArrays(before.items, after.items)
  if (op.type !== 'none' && op.type !== 'edit' && op.type !== 'unknown') {
    target.items = mirrorArray(target.items, op, after.items, [])
  }

  return target
}

// One-shot repair for documents that already drifted apart: aligns list
// lengths and copies every shared field from `sourceLang`, without touching
// translated wording.
export function alignLanguages(content, sourceLang) {
  const next = clone(content)
  const target = otherLang(sourceLang)

  const alignList = (sourceList, targetList, sharedKeys) => {
    const src = Array.isArray(sourceList) ? sourceList : []
    const dst = Array.isArray(targetList) ? [...targetList] : []
    const out = []
    for (let i = 0; i < src.length; i += 1) {
      const existing = dst[i]
      if (existing === undefined) {
        out.push(clone(src[i]))
        continue
      }
      if (src[i] && typeof src[i] === 'object' && existing && typeof existing === 'object') {
        const merged = { ...existing }
        for (const key of sharedKeys) merged[key] = clone(src[i][key])
        out.push(merged)
      } else {
        out.push(existing)
      }
    }
    return out
  }

  for (const [sectionKey, schema] of Object.entries(SECTION_SCHEMAS)) {
    const source = next[sourceLang]?.[sectionKey]
    if (!source) continue
    const dest = { ...(next[target]?.[sectionKey] || {}) }

    for (const field of flatFieldsOf(schema)) {
      if (field.shared) dest[field.key] = clone(source[field.key])
    }

    if (schema.paragraphs) {
      const key = schema.paragraphs.key
      dest[key] = alignList(source[key], dest[key], [])
    }

    if (schema.repeater) {
      const key = schema.repeater.key
      const sharedKeys = schema.repeater.fields.filter((f) => f.shared).map((f) => f.key)
      dest[key] = alignList(source[key], dest[key], sharedKeys)
    }

    next[target][sectionKey] = dest
  }

  // Custom sections: make sure every one exists in both languages.
  const sourceCustom = next[sourceLang].custom || {}
  const targetCustom = { ...(next[target].custom || {}) }
  for (const [key, data] of Object.entries(sourceCustom)) {
    const existing = targetCustom[key]
    if (!existing) {
      targetCustom[key] = clone(data)
      continue
    }
    targetCustom[key] = {
      ...existing,
      kind: data.kind || 'text',
      items: alignList(data.items, existing.items, []),
    }
  }
  next[target].custom = targetCustom

  return next
}
