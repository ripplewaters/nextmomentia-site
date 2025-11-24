'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'
import { usePathname } from 'next/navigation'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

export default function NavBar() {
  const pathname = usePathname()

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
  ]

  const activeIndex = routes.findIndex((r) => r.href === pathname)
  const safeIndex = activeIndex === -1 ? 0 : activeIndex
  const sideLinks = routes.filter((_, idx) => idx !== safeIndex)

  return (
    <div className={`nav-shell ${spaceGrotesk.className}`}>
      {/* OUTER SHELL */}
      <svg
        className="nav-shell-bg"
        viewBox="0 0 360 150"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="metalBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5d4196" />
            <stop offset="40%" stopColor="#352b5b" />
            <stop offset="70%" stopColor="#1a162c" />
            <stop offset="100%" stopColor="#080611" />
          </linearGradient>

          <filter id="outerShadow" x="-20%" y="-30%" width="140%" height="180%">
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="12"
              floodColor="rgba(0,0,0,0.95)"
            />
          </filter>
        </defs>

        <g filter="url(#outerShadow)">
          {/* huvudform med tjockare botten */}
          <path
            d="
              M16 60
              Q36 34 78 30
              L282 28
              Q318 32 344 50
              Q354 58 354 74
              Q354 90 342 102
              Q314 128 182 132
              Q52 128 26 102
              Q10 86 12 72
              Q14 64 16 60 Z
            "
            fill="url(#metalBody)"
          />

          {/* side ears */}
          <path
            d="
              M16 60
              Q6 66 6 76
              Q6 96 26 110
              Q52 128 90 122
              Q62 106 50 90
              Q32 72 24 60
              Z
            "
            fill="rgba(8,10,25,0.95)"
          />
          <path
            d="
              M344 60
              Q354 66 354 76
              Q354 96 334 110
              Q308 128 270 122
              Q298 106 310 90
              Q328 72 336 60
              Z
            "
            fill="rgba(8,10,25,0.95)"
          />

          {/* inner outline */}
          <ellipse
            cx="180"
            cy="70"
            rx="112"
            ry="38"
            fill="rgba(40,75,120,0.45)"
            stroke="#41d7ff"
            strokeWidth="2.2"
          />
        </g>
      </svg>

      {/* INNER CONTENT */}
      <header className="nav-inner">
        <div className="nav-glass-layer">
          {/* center glass */}
          <div className="glass-center">
            <div className="glass-center-highlight" />
            <div className="glass-center-noise" />
          </div>

          {/* side bubbles with dynamic labels */}
          <Link
            href={sideLinks[0].href}
            className="glass-side glass-left glass-link"
          >
            <span className="glass-label">{sideLinks[0].label}</span>
          </Link>

          <Link
            href={sideLinks[1].href}
            className="glass-side glass-right glass-link"
          >
            <span className="glass-label">{sideLinks[1].label}</span>
          </Link>
        </div>

        {/* logo medallion – dark 3D sphere */}
        <div className="nav-logo-wrapper">
          <div className="nav-logo-seat">
            <div className="nav-logo-seat-inner" />
            <Link href="/" aria-label="NextMomentia home" className="nav-logo-link">
              <Image
                src="/icon.png"
                alt="NextMomentia Eye Logo"
                width={36}
                height={36}
                className="nav-logo-img"
              />
            </Link>
          </div>
        </div>

        {/* LED orbs bar */}
        <div className="nav-orbs-wrapper">
          <div className="nav-orbs-bar">
            {/* red = videos */}
            <a
              href="https://www.youtube.com/@NextMomentia"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-orb-link"
              aria-label="Videos"
            >
              <span className="nav-orb orb-red" />
            </a>

            {/* yellow = shop */}
            <Link href="/shop" className="nav-orb-link" aria-label="Shop">
              <span className="nav-orb orb-yellow" />
            </Link>

            {/* blue = about */}
            <Link href="/about" className="nav-orb-link" aria-label="About">
              <span className="nav-orb orb-blue" />
            </Link>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .nav-shell {
          position: absolute;
          top: 3%;
          left: 50%;
          transform: translateX(-50%);
          width: min(560px, 94%);
          height: 130px;
          pointer-events: none;
        }

        .nav-shell-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .nav-shell::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 58%;
          height: 28%;
          border-radius: 50%;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(255, 255, 255, 0.22),
            transparent 70%
          );
          mix-blend-mode: screen;
        }

        .nav-shell::after {
          content: '';
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 66%;
          height: 30%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.95),
            transparent 75%
          );
          filter: blur(8px);
          opacity: 0.95;
        }

        .nav-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .nav-glass-layer {
          position: absolute;
          inset: 12px 26px;
        }

        .glass-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -52%);
          width: 72%;
          height: 58%;
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 0%, rgba(255, 255, 255, 0.32), transparent 60%),
            linear-gradient(
              180deg,
              rgba(70, 110, 190, 0.48),
              rgba(32, 45, 85, 0.82),
              rgba(8, 12, 25, 1)
            );
          border: 1.6px solid rgba(180, 215, 255, 0.45);
          box-shadow:
            inset 0 1px 6px rgba(255, 255, 255, 0.45),
            inset 0 -6px 14px rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
          overflow: hidden;
        }

        .glass-center-highlight {
          position: absolute;
          top: -10%;
          left: -5%;
          width: 110%;
          height: 48%;
          border-radius: 999px;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(255, 255, 255, 0.28),
            rgba(255, 255, 255, 0) 70%
          );
        }

        .glass-center-noise {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 0
          );
          background-size: 3px 3px;
          opacity: 0.35;
          mix-blend-mode: soft-light;
        }

        .glass-side {
          position: absolute;
          top: 50%;
          transform: translateY(-54%);
          width: 26%;
          height: 44%;
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 0%, rgba(255, 255, 255, 0.25), transparent 60%),
            linear-gradient(
              160deg,
              rgba(130, 175, 255, 0.4),
              rgba(60, 200, 200, 0.45),
              rgba(10, 20, 40, 0.88)
            );
          border: 1.8px solid rgba(170, 230, 255, 0.7);
          box-shadow:
            inset 0 2px 6px rgba(255, 255, 255, 0.4),
            inset 0 -4px 10px rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .glass-left {
          left: 2%;
        }

        .glass-right {
          right: 2%;
        }

        .glass-label {
          font-size: 0.75rem;
          color: #f0f6ff;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-shadow:
            0 0 6px rgba(0, 0, 0, 0.9),
            0 0 10px rgba(255, 255, 255, 0.35),
            0 1px 3px rgba(0, 0, 0, 1);
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.4));
        }

        .glass-side:hover .glass-label {
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.95),
            0 0 6px rgba(100, 255, 255, 0.9),
            0 1px 2px rgba(0, 0, 0, 1);
        }

        /* ==== LOGO MEDALLION – DARK 3D SPHERE ==== */
        .nav-logo-wrapper {
          position: relative;
          z-index: 3;
          transform: translateY(-4px);
        }

        .nav-logo-seat {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 30% 10%, #b9baff 0%, #5b4fc7 35%, #26214f 70%, #050513 100%);
          box-shadow:
            inset 0 2px 4px rgba(255, 255, 255, 0.22),
            inset 0 -5px 9px rgba(0, 0, 0, 0.96),
            0 7px 16px rgba(0, 0, 0, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-logo-seat::before {
          content: '';
          position: absolute;
          inset: 5px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 40% 18%, #ffffff 0%, #d4d6ff 18%, #4338a3 55%, #050614 100%);
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 0.3),
            inset 0 -3px 6px rgba(0, 0, 0, 0.95);
        }

        .nav-logo-seat-inner {
          position: absolute;
          inset: 12px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 20%,
            rgba(255, 255, 255, 0.55),
            rgba(120, 140, 255, 0.2),
            rgba(0, 0, 0, 0.8)
          );
          opacity: 0.6;
          mix-blend-mode: screen;
        }

        .nav-logo-img {
          width: 34px;
          height: 34px;
          filter:
            drop-shadow(0 1px 2px rgba(0, 0, 0, 1))
            drop-shadow(0 0 12px rgba(255, 255, 255, 0.98));
          opacity: 0.98;
          mix-blend-mode: screen;
        }

        /* LED bar */
        .nav-orbs-wrapper {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
        }

        .nav-orbs-bar {
          position: relative;
          padding: 4px 20px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 0%, #ffffff, #dde3f3 40%, #8d96b2 90%),
            linear-gradient(180deg, #d5ddf2 0%, #676f8d 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            inset 0 -2px 3px rgba(20, 22, 40, 0.95),
            0 3px 6px rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-orb-link {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
        }

        .nav-orb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 4px rgba(0, 0, 0, 1),
            0 0 6px rgba(0, 0, 0, 1);
        }

        .orb-red {
          background: radial-gradient(circle, #ffe3e3, #ff3d47 45%, #7f0b18 95%);
        }
        .orb-yellow {
          background: radial-gradient(circle, #fff8d4, #ffd94a 45%, #9d6b00 95%);
        }
        .orb-blue {
          background: radial-gradient(circle, #e3f3ff, #4fb0ff 45%, #0a3d7c 95%);
        }

        .nav-orb-link:hover .nav-orb {
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 4px rgba(0, 0, 0, 1),
            0 0 10px rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }

        @media (max-width: 640px) {
          .nav-shell {
            top: 2.5%;
            width: 94%;
            height: 120px;
          }
          .nav-glass-layer {
            inset: 10px 20px;
          }
          .glass-center {
            width: 78%;
            height: 56%;
          }
          .glass-side {
            width: 30%;
            height: 42%;
          }
          .glass-label {
            font-size: 0.7rem;
            letter-spacing: 0.18em;
          }
          .nav-orbs-wrapper {
            bottom: 8px;
          }
        }
      `}</style>
    </div>
  )
}
