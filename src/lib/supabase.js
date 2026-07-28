import { createClient } from '@supabase/supabase-js'

// Public browser client. The publishable key is safe to ship in front-end code
// (it is the client-side equivalent of the old anon key). Only Realtime
// Presence is used — no database tables or auth are involved.
const SUPABASE_URL = 'https://btfiyjkybdwvnigbnynu.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_dBME3tzsU_WhbGLrY0cHRg_CIPs-6DC'

export const supabase =
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: false },
      })
    : null
