'use client'

import Link from 'next/link'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

export default function NavBar() {
  return (
    <header
      style={{
        position: 'absolute',
        top: '3%',
        width: 'min(640px, 86%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.55rem 1.2rem',
        borderRadius: '999px',
        background:
          'linear-gradient(135deg, rgba(10,16,60,0.6) 0%, rgba(60,110,200,0.25) 100%)',
        boxShadow: '0 16px 42px rgba(30,70,180,0.25)',
        backdropFilter: 'blur(14px)',
        border: '1px solid rgba(160,210,255,0.25)',
        zIndex: 15,
      }}
      className={spaceGrotesk.className}
    >
      {/* Klickbar logotyp till startsidan */}
      <Link
        href="/"
        style={{
          fontSize: '1.1rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #ffffff 0%, #b9e2ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        NextMomentia
      </Link>

      {/* Navigation links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
        }}
      >
        <Link
          href="/#videos"
          style={{
            color: 'rgba(255,255,255,0.82)',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Videos
        </Link>
        <Link
          href="/shop"
          style={{
            color: 'rgba(255,255,255,0.82)',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Shop
        </Link>
        <Link
          href="/#about"
          style={{
            color: 'rgba(255,255,255,0.82)',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          About
        </Link>
      </nav>

      {/* Global font override */}
      <style jsx global>{`
        header,
        header * {
          font-family: 'Space Grotesk', sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
        }
      `}</style>
    </header>
  )
}
