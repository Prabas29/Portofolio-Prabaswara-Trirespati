import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { supabase } from '../lib/supabase.js'

// Real-time "viewing now" badge, pinned in the hero. Uses Supabase Realtime
// Presence: each open tab joins a shared channel and is counted; when a tab
// closes the visitor drops off automatically. No database/table involved. If
// the service is unreachable the badge stays hidden (never a fake number).
export default function VisitorCount() {
  const { t } = useLang()
  const [count, setCount] = useState(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!supabase) return

    const channel = supabase.channel('online-viewers', {
      config: { presence: { key: crypto.randomUUID() } },
    })

    channel
      .on('presence', { event: 'sync' }, () => {
        const online = Object.keys(channel.presenceState()).length
        setCount(online)
        setShown(true)
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          channel.track({ at: Date.now() })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  if (count === null) return null

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/70 px-4 py-2.5 backdrop-blur transition-all duration-500 ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
      role="status"
      aria-live="off"
    >
      <span className="relative flex h-4 w-4 items-center justify-center text-teal">
        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-teal/60" />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="relative"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
      <span className="font-mono text-[0.8rem] text-paper-dim">
        <strong className="font-semibold text-paper">{count.toLocaleString('en-US')}</strong>{' '}
        {t.visits.suffix}
      </span>
    </div>
  )
}
