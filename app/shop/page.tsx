'use client'

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export default function ShopPage() {
  const [isIOS, setIsIOS] = useState(false)

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
      {/* === BACKGROUND (video on desktop, image on iOS) === */}
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
          <source src="/videos/shop_bg2.mp4" type="video/mp4" />
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

      {/* === NAVBAR === */}
      <NavBar />

      {/* === TITLE === */}
      <h1
        style={{
          marginTop: '5.5rem',
          fontSize: 'clamp(1.2rem, 2vw + 0.5rem, 1.8rem)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          zIndex: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        NextMomentia Shop
      </h1>

      {/* === SHIRT IMAGE (now visible on all iOS) === */}
      <div
        style={{
          width: 'min(90vw, 500px)',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 5,
          transform: 'translateZ(0)',
          willChange: 'transform',
          isolation: 'isolate',
        }}
      >
        <img
          src="/mockups/shirt_blue.png"
          alt="Question Everything Shirt"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 5,
            transform: 'translateZ(0)',
            filter: `
              drop-shadow(0 20px 45px rgba(0,0,0,0.8))
              drop-shadow(0 0 35px rgba(255,255,255,0.15))
              drop-shadow(0 0 80px rgba(173,216,255,0.1))
            `,
            animation: 'float 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* === PRICE TAG === */}
      <div
        style={{
          marginTop: '1.2rem',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '0.6rem 1.6rem',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          letterSpacing: '0.05em',
          color: '#a8d9ff',
          zIndex: 6,
          position: 'relative',
          boxShadow:
            '0 0 20px rgba(168,217,255,0.1), inset 0 0 10px rgba(255,255,255,0.05)',
        }}
      >
        $29 USD
      </div>

      {/* === FLOAT ANIMATION === */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </main>
  )
}
