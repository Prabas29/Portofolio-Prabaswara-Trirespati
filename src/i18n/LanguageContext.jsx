import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'portfolio-lang'

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = { lang, setLang, t: translations[lang] }
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
