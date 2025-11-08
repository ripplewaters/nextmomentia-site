'use client'

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export default function ShopPage() {
  const [isIOS, setIsIOS] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)
    }
  }, [])

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
    await fetch('https://formspree.io/f/mvgoqwzj', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    setSubmitted(true)
    form.reset()
  }

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: '"Space Grotesk", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/videos/shop_bg7.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shirt_blue.png"
          alt="Background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.15,
          }}
        />
      )}

      <NavBar />

      {/* === LOGO (EYE) === */}
      <img
        src="/icon.png"
        alt="NextMomentia Eye Logo"
        style={{
          width: '90px',
          height: 'auto',
          marginTop: '5rem',
          animation: 'pulseGlow 3.5s ease-in-out infinite',
          zIndex: 4,
        }}
      />

      {/* === FROSTED TITLE BOX === */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.8rem 2.2rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow:
            '0 0 25px rgba(168,217,255,0.25), inset 0 0 10px rgba(255,255,255,0.05)',
          zIndex: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.4rem, 2vw + 0.6rem, 2rem)',
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
          width: 'min(90vw, 500px)',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 5,
          marginTop: '2rem',
        }}
      >
        <img
          src="/mockups/shirt_blue.png"
          alt="Question Everything Shirt"
          style={{
            width: '100%',
            maxWidth: '400px',
            objectFit: 'contain',
            filter: `
              drop-shadow(0 20px 45px rgba(0,0,0,0.8))
              drop-shadow(0 0 35px rgba(255,255,255,0.15))
              drop-shadow(0 0 80px rgba(173,216,255,0.1))
            `,
            animation: 'float 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* === COMING SOON + SIGNUP === */}
      <div
        style={{
          marginTop: '1.8rem',
          textAlign: 'center',
          zIndex: 6,
        }}
      >
        <h2
          style={{
            fontSize: '1.4rem',
            color: '#a8d9ff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            textShadow: '0 0 20px rgba(168,217,255,0.4)',
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
              gap: '0.8rem',
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email for early access"
              required
              style={{
                padding: '0.7rem 1.2rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(10,15,30,0.6)',
                color: '#fff',
                width: '260px',
                textAlign: 'center',
                fontSize: '0.95rem',
                boxShadow: '0 0 20px rgba(168,217,255,0.15)',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 35px rgba(168,217,255,0.35)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 20px rgba(168,217,255,0.15)')
              }
            />
            <button
              type="submit"
              className="glow-button"
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '10px',
                background:
                  'linear-gradient(135deg, rgba(0,180,255,0.4), rgba(255,255,255,0.15))',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#a8d9ff',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: '0.3s ease',
                boxShadow:
                  '0 0 15px rgba(168,217,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)',
              }}
            >
              Notify Me
            </button>
          </form>
        ) : (
          <p
            style={{
              color: '#9fffa8',
              fontSize: '1rem',
              textShadow: '0 0 15px rgba(159,255,168,0.4)',
            }}
          >
            Thanks! You'll be first to know.
          </p>
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0% {
            filter: drop-shadow(0 0 12px rgba(173,216,255,0.2));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 35px rgba(173,216,255,0.45));
            transform: scale(1.03);
          }
          100% {
            filter: drop-shadow(0 0 12px rgba(173,216,255,0.2));
            transform: scale(1);
          }
        }

        .glow-button:hover {
          background: linear-gradient(135deg, rgba(50,200,255,0.7), rgba(255,255,255,0.2));
          box-shadow: 0 0 35px rgba(168,217,255,0.5), inset 0 0 15px rgba(255,255,255,0.2);
          transform: scale(1.05);
        }

        .glow-button:active {
          transform: scale(0.97);
          box-shadow: 0 0 15px rgba(168,217,255,0.3);
        }
      `}</style>
    </main>
  )
}
