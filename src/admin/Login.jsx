import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

// Sign-in only — there is deliberately no self-service sign-up, so the single
// admin account has to be created from the Supabase dashboard.
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!supabase) {
      setError('Supabase belum dikonfigurasi.')
      return
    }
    setBusy(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) setError(authError.message)
    setBusy(false)
  }

  const inputClass =
    'w-full rounded-md border border-line bg-ink px-3 py-2.5 font-body text-sm text-paper placeholder:text-paper-dim/60 focus:border-gold focus:outline-none'

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.02em] text-paper">
          Dashboard<span className="text-gold"> Admin</span>
        </h1>
        <p className="mt-2 font-body text-sm text-paper-dim">
          Masuk untuk mengelola isi website portofolio.
        </p>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim">
              Email
            </span>
            <input
              type="email"
              required
              autoComplete="username"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-red-400/40 bg-red-400/10 px-3 py-2 font-body text-xs text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-gold px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper disabled:opacity-60"
        >
          {busy ? 'Memproses…' : 'Masuk'}
        </button>

        <a
          href="/"
          className="mt-6 block text-center font-mono text-[0.66rem] uppercase tracking-[0.12em] text-paper-dim transition-colors hover:text-gold"
        >
          ← Kembali ke website
        </a>
      </form>
    </div>
  )
}
