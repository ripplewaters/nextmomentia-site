'use client'

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'

export default function AboutPage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)

    // Hide shop background if it persists
    const shopBg = document.getElementById('shop-page')
    if (shopBg) shopBg.style.display = 'none'
    return () => {
      if (shopBg) shopBg.style.display = ''
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
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.5,
          }}
        >
          <source src="/videos/about_bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shop_bg_fallback.jpg"
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
          }}
        />
      )}

      <NavBar />

      <div
        style={{
          maxWidth: '640px',
          textAlign: 'center',
          padding: '1rem',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.4rem, 2vw + 0.8rem, 2rem)',
            letterSpacing: '0.12em',
            background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
          }}
        >
          About NextMomentia
        </h1>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: 'rgba(255,255,255,0.85)',
            textShadow: '0 0 15px rgba(168,217,255,0.2)',
          }}
        >
          NextMomentia is a digital concept that blends design, philosophy,
          and technology. It is about questioning what is accepted as truth,
          and building things that challenge comfort zones. Every visual,
          every statement, every detail is part of that idea.
        </p>
      </div>
    </main>
  )
}
