// Vercel serverless function. Receives a lightweight beacon from the site on
// each new visitor session and relays it to a Telegram chat via the Bot API.
// The bot token stays server-side only (Vercel env vars) — never shipped to
// the browser.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    // Not configured yet — fail quietly so the site never breaks for visitors.
    res.status(200).json({ ok: false, reason: 'not configured' })
    return
  }

  const { lang, referrer, path } = req.body || {}
  const ua = req.headers['user-agent'] || 'unknown'
  const country = req.headers['x-vercel-ip-country'] || null
  const city = req.headers['x-vercel-ip-city'] || null
  const location = [city, country].filter(Boolean).join(', ')

  const lines = [
    '👀 *New visit on your portfolio*',
    location ? `📍 ${location}` : null,
    `🌐 Language: ${lang === 'id' ? 'Indonesian' : 'English'}`,
    referrer ? `🔗 From: ${referrer}` : '🔗 Direct visit',
    path ? `📄 Page: ${path}` : null,
    `🖥️ ${ua.slice(0, 120)}`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })

    if (!tgRes.ok) {
      const detail = await tgRes.text()
      res.status(200).json({ ok: false, reason: 'telegram error', detail })
      return
    }

    res.status(200).json({ ok: true })
  } catch {
    res.status(200).json({ ok: false, reason: 'network error' })
  }
}
