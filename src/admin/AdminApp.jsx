import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'

// Gate for /admin: shows the sign-in form until a Supabase session exists.
export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setChecking(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
        <p className="font-body text-sm text-paper-dim">Supabase belum dikonfigurasi.</p>
      </div>
    )
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <p className="font-mono text-sm text-paper-dim">Memeriksa sesi…</p>
      </div>
    )
  }

  return session ? <Dashboard session={session} /> : <Login />
}
