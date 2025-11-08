'use client'

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export default function ShopPage() {
  const [isIOS, setIsIOS] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Detect iOS or Safari
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      const iOS =
        /iphone|ipad|ipod/.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      if (iOS || safari) setIsIOS(true)
    }
  }, [])

  // Video autoplay (non-iOS)
  useEffect(() => {
    const video = document.querySelector('video')
    if (video && !isIOS) {
      video.play().catch(() => {
        setTimeout(() => video.play().catch(() => {}), 500)
      })
    }
  }, [isIOS])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    await fetch('https://formspree.io/f/mgvrwkbo', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    setSubmitted(true)
    form.reset()
  }

  return (
    <main
      id="shop-page"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '"Space Grotesk", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 1.2s ease-in-out',
      }}
    >
      {/* === BACKGROUND === */}
      {!isIOS ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/videos/shop_bg7.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shop_bg_fallback.jpg"
          alt="Shop background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            zIndex: 0,
          }}
        />
      )}

      <NavBar />

      {/* === LOGO === */}
      <img
        src="/icon.png"
        alt="NextMomentia Eye Logo"
        style={{
          width: '80px',
          height: 'auto',
          marginTop: '5rem',
          animation: 'pulseGlow 3.5s ease-in-out infinite',
          zIndex: 4,
        }}
      />

      {/* === TITLE === */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.6rem 1.6rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow:
            '0 0 25px rgba(168,217,255,0.25), inset 0 0 10px rgba(255,255,255,0.05)',
          zIndex: 3,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.2rem, 2vw + 0.6rem, 1.8rem)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            textShadow: '0 0 25px rgba(168,217,255,0.4)',
          }}
        >
          NextMomentia Shop
        </h1>
      </div>

      {/* === SHIRT === */}
      <div
        style={{
          width: 'min(70vw, 320px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1.6rem',
          zIndex: 5,
        }}
      >
        <picture>
          <source srcSet="/mockups/shirt_blue.webp" type="image/webp" />
          <img
            src="/mockups/shirt_blue.png"
            alt="Question Everything Shirt"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              filter: `
                drop-shadow(0 10px 25px rgba(0,0,0,0.8))
                drop-shadow(0 0 25px rgba(255,255,255,0.1))
                drop-shadow(0 0 55px rgba(173,216,255,0.1))
              `,
              animation: 'float 5s ease-in-out infinite',
            }}
          />
        </picture>
      </div>

      {/* === COMING SOON + SIGNUP === */}
      <div
        style={{
          marginTop: '1.3rem',
          textAlign: 'center',
          zIndex: 6,
          paddingBottom: '2.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.1rem',
            color: '#a8d9ff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            textShadow: '0 0 15px rgba(168,217,255,0.3)',
          }}
        >
          Coming Soon
        </h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email for early access"
              required
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(10,15,30,0.6)',
                color: '#fff',
                width: '220px',
                textAlign: 'center',
                fontSize: '0.9rem',
              }}
            />
            <button
              type="submit"
              className="glow-button"
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '8px',
                background:
                  'linear-gradient(135deg, rgba(0,180,255,0.4), rgba(255,255,255,0.15))',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#a8d9ff',
                cursor: 'pointer',
                transition: '0.3s ease',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              Notify Me
            </button>
          </form>
        ) : (
          <p style={{ color: '#9fffa8', fontSize: '0.9rem' }}>
            Thanks! You'll be first to know.
          </p>
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { filter: drop-shadow(0 0 10px rgba(173,216,255,0.2)); }
          50% { filter: drop-shadow(0 0 30px rgba(173,216,255,0.45)); }
          100% { filter: drop-shadow(0 0 10px rgba(173,216,255,0.2)); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
