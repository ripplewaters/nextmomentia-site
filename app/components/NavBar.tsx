'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'absolute',
        top: '3%',
        width: 'min(640px, 90%)',
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
      {/* === LOGO + TEXT === */}
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          textDecoration: 'none',
        }}
      >
        <Image
          src="/icon.png"
          alt="NextMomentia Eye Logo"
          width={26}
          height={26}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.65))',
            transform: 'translateY(1px)',
          }}
        />
        <span
          style={{
            fontSize: '1.1rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #ffffff 0%, #b9e2ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          NextMomentia
        </span>
      </Link>

      {/* === DESKTOP NAV === */}
      <nav
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
        }}
      >
        <a
          href="https://www.youtube.com/@NextMomentia"
          target="_blank"
          rel="noopener noreferrer"
          style={navLinkStyle}
        >
          Videos
        </a>
        <Link href="/shop" style={navLinkStyle}>
          Shop
        </Link>
        <Link href="/about" style={navLinkStyle}>
          About
        </Link>
      </nav>

      {/* === MOBILE BURGER === */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '1.4rem',
          cursor: 'pointer',
        }}
        className="burger"
      >
        ☰
      </button>

      {/* === MOBILE MENU === */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            background:
              'linear-gradient(135deg, rgba(10,16,60,0.9), rgba(60,110,200,0.4))',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.8rem',
            border: '1px solid rgba(160,210,255,0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <a
            href="https://www.youtube.com/@NextMomentia"
            target="_blank"
            rel="noopener noreferrer"
            style={mobileLinkStyle}
            onClick={() => setOpen(false)}
          >
            Videos
          </a>
          <Link href="/shop" style={mobileLinkStyle} onClick={() => setOpen(false)}>
            Shop
          </Link>
          <Link href="/about" style={mobileLinkStyle} onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      )}

      <style jsx global>{`
        header,
        header * {
          font-family: 'Space Grotesk', sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
        }

        @media (max-width: 640px) {
          .desktop-nav {
            display: none !important;
          }
          .burger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}

const navLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.82)',
  textDecoration: 'none',
  fontWeight: 700,
  letterSpacing: '0.08em',
}

const mobileLinkStyle: React.CSSProperties = {
  color: '#b9e2ff',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 700,
}
