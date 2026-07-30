import { createContext, useContext, useEffect, useState } from 'react'
import { defaultContent, mergeContent } from '../content/contentModel.js'
import { supabase } from '../lib/supabase.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'portfolio-lang'
export const CONTENT_ROW_ID = 'main'

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'id') return saved
  } catch {
    /* localStorage unavailable */
  }
  const browser = (navigator.language || '').toLowerCase()
  return browser.startsWith('id') ? 'id' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang)
  // Starts from the bundled defaults so the page renders instantly, then
  // swaps in whatever the admin has saved in Supabase (if anything).
  const [content, setContent] = useState(defaultContent)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!supabase) return
    let cancelled = false

    supabase
      .from('site_content')
      .select('data')
      .eq('id', CONTENT_ROW_ID)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled || error || !data?.data) return
        setContent(mergeContent(data.data))
      })
      // Table not created yet / offline — the bundled defaults stay in place.
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  const value = { lang, setLang, t: content[lang], layout: content.layout }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
