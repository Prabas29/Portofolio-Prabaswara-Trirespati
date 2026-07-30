import { createClient } from '@supabase/supabase-js'

// Public browser client. The publishable key is safe to ship in front-end code
// (it is the client-side equivalent of the old anon key). Used for Realtime
// Presence on the public site, and for content + auth in the admin dashboard.
// Row Level Security is what protects writes — see supabase-setup.sql.
const SUPABASE_URL = 'https://btfiyjkybdwvnigbnynu.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_dBME3tzsU_WhbGLrY0cHRg_CIPs-6DC'

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        // Persisting the session keeps the admin logged in across reloads.
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null
