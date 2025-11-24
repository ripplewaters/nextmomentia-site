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

  return (
    <main
      id="shop-page"
      style={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#000',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
      }}
    >
      {/* BACKGROUND */}
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
            opacity: 0.85,
            zIndex: 0,
          }}
        >
          <source src="/videos/shop_bg_earth.mp4" type="video/mp4" />
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
            opacity: 0.55,
            zIndex: 0,
          }}
        />
      )}

      {/* NAVBAR */}
      <NavBar />

      {/* CENTERED CONTENT */}
      <div className="qe-wrap">
        <div className="qe-row">
          <img
            src="/textures/text1.png"
            alt="Knowledge Is Not Wisdom"
            className="qe-logo qe-logo-side"
          />
          <img
            src="/textures/text3.png"
            alt="Truth Over Comfort"
            className="qe-logo qe-logo-center"
          />
          <img
            src="/textures/text2.png"
            alt="Question Everything"
            className="qe-logo qe-logo-side"
          />
        </div>

        <p className="qe-coming">COMING SOON</p>
      </div>

      <style jsx global>{`
        /* wrapper som centrerar blocket mellan navbar och jordklotet */
        #shop-page .qe-wrap {
          position: relative;
          z-index: 10;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 160px 32px 110px; /* top = nav-luft, bottom = jord-luft */
          box-sizing: border-box;
        }

        #shop-page .qe-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          flex-wrap: nowrap;
        }

        .qe-logo {
          display: block;
          height: auto;
          filter: drop-shadow(0 0 26px rgba(185, 205, 255, 0.75));
          opacity: 0.98;
        }

        .qe-logo-side {
          max-width: 220px;
          width: 22vw;
        }

        .qe-logo-center {
          max-width: 260px;
          width: 26vw;
        }

        .qe-coming {
          margin-top: 30px;
          font-size: 0.95rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(240, 245, 255, 0.9);
          filter: drop-shadow(0 0 12px rgba(150, 180, 255, 0.5));
          text-align: center;
        }

        /* TABLET / LITE MINDRE SKÄRMAR */
        @media (max-width: 1024px) {
          #shop-page .qe-wrap {
            padding: 150px 24px 90px;
          }
          #shop-page .qe-row {
            gap: 28px;
          }
          .qe-logo-side {
            max-width: 190px;
            width: 24vw;
          }
          .qe-logo-center {
            max-width: 230px;
            width: 28vw;
          }
        }

        /* MOBIL */
        @media (max-width: 640px) {
          #shop-page .qe-wrap {
            padding: 140px 18px 80px;
          }
          #shop-page .qe-row {
            flex-wrap: wrap;
            gap: 18px;
          }
          .qe-logo-side {
            max-width: 150px;
            width: 38vw;
          }
          .qe-logo-center {
            max-width: 190px;
            width: 52vw;
          }
          .qe-coming {
            font-size: 0.8rem;
            letter-spacing: 0.22em;
            margin-top: 22px;
          }
        }
      `}</style>
    </main>
  )
}
