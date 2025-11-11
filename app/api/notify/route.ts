import { NextResponse } from 'next/server'

// Enkel in-memory limiter (för Vercel runtime)
let lastSubmit = 0

export async function POST(req: Request) {
  const now = Date.now()
  if (now - lastSubmit < 5000) {
    // 1 request per 5 sekunder totalt
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  lastSubmit = now

  try {
    const formData = await req.formData()

    // honeypot-fält
    if (formData.get('nickname')) {
      return NextResponse.json({ ok: true })
    }

    const email = String(formData.get('email') || '').trim()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // skapa ett rent payload till Formspree
    const data = new FormData()
    data.append('email', email)
    data.append('_ts', String(Date.now()))
    data.append('_origin', req.headers.get('origin') || '')
    data.append('_ua', req.headers.get('user-agent') || '')

    // skicka vidare till Formspree
    const res = await fetch('https://formspree.io/f/mgvrwkbo', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('Formspree error:', text)
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Notify API error:', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
