'use client'

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export default function AboutPage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)
    }
  }, [])

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: '"Space Grotesk", sans-serif',
        overflow: 'hidden',
        position: 'relative',
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
            filter: 'brightness(0.6) saturate(1.2)',
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
            opacity: 0.2,
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
          width: '90px',
          height: 'auto',
          marginTop: '6rem',
          animation: 'pulseGlow 3.5s ease-in-out infinite',
          zIndex: 3,
        }}
      />

      {/* === TITLE === */}
      <h1
        style={{
          fontSize: 'clamp(1.3rem, 2vw + 1rem, 2.4rem)',
          marginTop: '1.5rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(168,217,255,0.4)',
          animation: 'glitch 3s infinite',
          zIndex: 3,
          position: 'relative',
          textAlign: 'center',
        }}
      >
        ABOUT NEXTMOMENTIA
      </h1>

      {/* === MISSION TEXT === */}
      <div
        style={{
          maxWidth: '700px',
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1.2rem 2rem',
          borderRadius: '18px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow:
            '0 0 25px rgba(168,217,255,0.25), inset 0 0 10px rgba(255,255,255,0.05)',
          color: '#d5eaff',
          fontSize: '1rem',
          lineHeight: 1.6,
          zIndex: 3,
          animation: 'fadeInText 2.5s ease-in-out',
        }}
      >
        <p style={{ marginBottom: '1rem' }}>
          <span className="type-anim">
            NextMomentia was created to challenge perspectives and ignite
            awareness through visual art, debates, and expression.
          </span>
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <span className="type-anim" style={{ animationDelay: '1.2s' }}>
            It’s not just a brand – it’s a movement that values truth over
            comfort and curiosity over conformity.
          </span>
        </p>
        <p>
          <span className="type-anim" style={{ animationDelay: '2.4s' }}>
            Every frame, every shirt, every clip aims to provoke thought and
            remind us to always question everything.
          </span>
        </p>
      </div>

      {/* === TAGLINE === */}
      <p
        style={{
          marginTop: '3rem',
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#a8d9ff',
          opacity: 0.9,
          animation: 'blink 5s infinite',
          zIndex: 3,
        }}
      >
        [ Truth – Awareness – Creativity ]
      </p>

      <style jsx global>{`
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

        @keyframes glitch {
          0% {
            text-shadow: 2px 0 #a8d9ff, -2px 0 #00aaff;
          }
          20% {
            text-shadow: -2px 0 #00aaff, 2px 0 #a8d9ff;
          }
          40% {
            text-shadow: 3px 0 #a8d9ff, -3px 0 #00ffff;
          }
          60% {
            text-shadow: -3px 0 #00ffff, 3px 0 #a8d9ff;
          }
          80% {
            text-shadow: 2px 0 #a8d9ff, -2px 0 #00aaff;
          }
          100% {
            text-shadow: 2px 0 #a8d9ff, -2px 0 #00aaff;
          }
        }

        @keyframes fadeInText {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .type-anim {
          display: inline-block;
          opacity: 0;
          animation: typeIn 1.8s ease forwards;
        }

        @keyframes typeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 0.9;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </main>
  )
}
