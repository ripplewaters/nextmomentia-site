'use client'

import { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'

const BOOK_SRC = '/mockups/NMAP-COVER_WEB2.png'

export default function ShopPage() {
  const [isIOS, setIsIOS] = useState(false)
  const bookRef = useRef<HTMLDivElement | null>(null)

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
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* BG – exakt samma approach som About */}
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
            opacity: 0.7,
            zIndex: 0,
          }}
        >
          <source src="/videos/shop_bg_earth.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shop_bg_fallback.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            zIndex: 0,
          }}
        />
      )}

      <NavBar />

      <section className="shop-wrap">
        <div className="shop-card">
          <h1 className="shop-title">AWARENESS GUIDE</h1>

          <p className="shop-subtitle">
            Understanding the Digital World - Built for parents.
            <br />
            <strong>10 Page PDF Guide - Full of Insight</strong>
          </p>

          <div className="book-stage">
            <div className="book-float" ref={bookRef}>
              <img src={BOOK_SRC} alt="Awareness Guide book" />
            </div>
            <div className="book-shadow" />
          </div>

          <p className="shop-coming">COMING SOON</p>
        </div>
      </section>

      <style jsx global>{`
        #shop-page .shop-wrap {
          position: relative;
          z-index: 5;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 150px 24px 110px;
          box-sizing: border-box;
        }

        #shop-page .shop-card {
          width: min(900px, 100%);
          border-radius: 28px;
          padding: 26px 34px 34px;
          box-sizing: border-box;
          margin-top: 3em;

          /* SAMMA GLASS-STIL SOM ABOUT */
          backdrop-filter: blur(18px) saturate(170%);
          -webkit-backdrop-filter: blur(18px) saturate(170%);
          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(160, 210, 255, 0.3),
              transparent 55%
            ),
            radial-gradient(
              circle at 100% 100%,
              rgba(110, 80, 220, 0.2),
              transparent 60%
            ),
            rgba(4, 6, 18, 0.88);

          border: 1px solid rgba(175, 215, 255, 0.45);
          box-shadow:
            0 26px 60px rgba(0, 0, 0, 0.9),
            inset 0 1px 16px rgba(255, 255, 255, 0.05);

          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        .shop-title {
          font-size: clamp(1.6rem, 2.1vw + 1rem, 2.4rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff, #a8d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 22px rgba(170, 220, 255, 0.45);
        }

        .shop-subtitle {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(236, 241, 255, 0.92);
          max-width: 640px;
          text-shadow: 0 0 14px rgba(0, 0, 0, 0.6);
        }

        .shop-subtitle strong {
          display: block;
          margin-top: 4px;
          font-weight: 700;
        }

        .book-stage {
          position: relative;
          display: grid;
          place-items: center;
          padding: 10px 0 14px;
        }

        .book-float {
          height: min(52vh, 520px);
          animation: floatBook 6s ease-in-out infinite;
          filter: drop-shadow(0 22px 44px rgba(0, 0, 0, 0.75));
        }

        .book-float img {
          height: 100%;
          width: auto;
          display: block;
          user-select: none;
        }

        .book-shadow {
          width: min(420px, 70vw);
          height: 32px;
          background: radial-gradient(
            closest-side,
            rgba(0, 0, 0, 0.6),
            transparent 72%
          );
          position: absolute;
          bottom: 0;
          filter: blur(2px);
        }

        .shop-coming {
          font-size: 0.85rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(240, 245, 255, 0.95);
        }

        @keyframes floatBook {
          0% {
            transform: translateY(-6px);
          }
          50% {
            transform: translateY(-18px);
          }
          100% {
            transform: translateY(-6px);
          }
        }

        @media (max-width: 640px) {
          #shop-page .shop-wrap {
            padding: 132px 14px 80px;
          }

          #shop-page .shop-card {
            padding: 18px 14px 22px;
            gap: 16px;
          }

          .book-float {
            height: min(44vh, 420px);
          }

          .shop-subtitle {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </main>
  )
}
