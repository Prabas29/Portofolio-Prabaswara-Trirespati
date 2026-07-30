import { useMemo } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { customKey, isCustomId } from '../content/contentModel.js'

// Resolves the layout document into the ordered, visible sections the page
// renders — numbering them 01, 02, … in display order and picking up the
// right nav label per language.
export function useSections() {
  const { t, layout } = useLang()

  return useMemo(() => {
    const entries = Array.isArray(layout) ? layout : []
    return entries
      .filter((entry) => entry && entry.visible !== false)
      .map((entry, i) => {
        const custom = isCustomId(entry.id)
        const data = custom ? t.custom?.[customKey(entry.id)] : null
        // Skip custom sections whose content was removed for this language.
        if (custom && !data) return null
        return {
          id: entry.id,
          isCustom: custom,
          num: String(i + 1).padStart(2, '0'),
          label: custom ? data.navLabel || data.title || 'Section' : t.nav?.[entry.id] || entry.id,
        }
      })
      .filter(Boolean)
      .map((section, i) => ({ ...section, num: String(i + 1).padStart(2, '0') }))
  }, [t, layout])
}
