import { useEffect } from 'react'

const SESSION_KEY = 'visit_notified'

// Fires a single, silent beacon to /api/notify-visit per browser session so
// the owner gets a Telegram alert on new visits. Never blocks or throws —
// if the endpoint is missing (local dev) or unconfigured, it's a no-op.
export function useVisitNotification(lang) {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return
    sessionStorage.setItem(SESSION_KEY, '1')

    fetch('/api/notify-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang,
        referrer: document.referrer || null,
        path: window.location.pathname,
      }),
    }).catch(() => {
      /* silent — a missed notification should never affect the visitor */
    })
    // Only re-fires if the language changes within the same session, which is fine.
  }, [lang])
}
