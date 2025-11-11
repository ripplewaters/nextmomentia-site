'use client'

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export default function AboutPage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)

    const shopBg = document.getElementById('shop-page')
    if (shopBg) shopBg.style.display = 'none'
    return () => {
      if (shopBg) shopBg.style.display = ''
    }
  }, [])

  return (
    <main
      id="about-page"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '"Space Grotesk", sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* === BACKGROUND VIDEO === */}
      {!isIOS ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            zIndex: 0,
          }}
        >
          <source src="/videos/shop_bg7.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shop_bg_fallback.jpg"
          alt="Background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            zIndex: 0,
          }}
        />
      )}

      <NavBar />

      {/* === STOR KURSIV BOKSTAV I BAKGRUNDEN === */}
      <div
        style={{
          position: 'absolute',
          fontFamily: '"Playfair Display", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(14rem, 22vw, 26rem)',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.04)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          letterSpacing: '-0.05em',
          zIndex: 1,
          userSelect: 'none',
        }}
      >
        N
      </div>

      {/* === GLASS PANEL === */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(14px) saturate(180%)',
          WebkitBackdropFilter: 'blur(14px) saturate(180%)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '24px',
          boxShadow: '0 0 50px rgba(173,216,255,0.25), inset 0 0 25px rgba(255,255,255,0.05)',
          width: 'min(90%, 720px)',
          padding: '4rem 2rem',
          textAlign: 'center',
          transform: 'translateY(-1%)',
          animation: 'fadeIn 1.4s ease forwards',
        }}
      >
        {/* === LOGO (CENTRERAD) === */}
        <img
          src="/icon.png"
          alt="NextMomentia Logo"
          style={{
            display: 'block',
            margin: '0 auto 2rem auto',
            width: '160px',
            height: 'auto',
            filter: 'drop-shadow(0 0 40px rgba(173,216,255,0.6))',
            animation: 'pulseGlow 4s ease-in-out infinite',
          }}
        />

        {/* === RUBRIK === */}
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 2vw + 1rem, 2.8rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 25px rgba(168,217,255,0.4)',
            marginBottom: '1.6rem',
            fontWeight: 700,
          }}
        >
          About NextMomentia
        </h1>

        {/* === TEXT === */}
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.02em',
            textShadow: '0 0 15px rgba(168,217,255,0.15)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          A creative hub where ideas, design, and technology merge into motion.  
          We believe that meaning emerges from tension, between simplicity and
          depth, control and chaos.  
          <br />
          <br />
          <span style={{ color: '#a8d9ff', fontWeight: 600 }}>
            NextMomentia
          </span>{' '}
          exists to capture that spark between logic and art.
        </p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap');

        @keyframes pulseGlow {
          0% {
            filter: drop-shadow(0 0 8px rgba(173,216,255,0.3));
          }
          50% {
            filter: drop-shadow(0 0 45px rgba(173,216,255,0.7));
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(173,216,255,0.3));
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
