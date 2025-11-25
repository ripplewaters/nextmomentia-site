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
      {/* Teal/glas skepp i bakgrunden */}
      <svg
        className="nav-shell-bg"
        viewBox="0 0 360 150"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Teal/glass kropp */}
          <radialGradient id="bgOrbGradient" cx="50%" cy="8%" r="85%">
            <stop offset="0%" stopColor="#e4fff9" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#a9ffe9" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#2c8fa7" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#041320" stopOpacity="1" />
          </radialGradient>

          {/* Soft highlight */}
          <radialGradient id="bgOrbHighlight" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="30%" stopColor="rgba(170,255,245,0.65)" />
            <stop offset="75%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Glow / shadow */}
          <filter id="bgOrbGlow" x="-30%" y="-40%" width="160%" height="200%">
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="14"
              floodColor="rgba(0,0,0,0.96)"
              floodOpacity="1"
            />
          </filter>
        </defs>

        <g filter="url(#bgOrbGlow)">
          {/* Huvudbågen */}
          <path
            d="
              M18 86
              Q180 40 342 86
              Q340 104 332 116
              Q258 134 180 136
              Q102 134 28 116
              Q20 104 18 86
              Z
            "
            fill="url(#bgOrbGradient)"
          />

          {/* Turkos rim (lite tunnare) */}
          <path
            d="
              M26 84
              Q180 44 334 84
              Q332 96 326 106
              Q258 122 180 124
              Q102 122 34 106
              Q28 96 26 84
              Z
            "
            fill="none"
            stroke="rgba(80,255,255,0.9)"
            strokeWidth="1.4"
          />

          {/* Glas-highlight */}
          <path
            d="
              M30 82
              Q180 48 330 82
              Q328 88 324 94
              Q258 110 180 112
              Q102 110 36 94
              Q32 88 30 82
              Z
            "
            fill="url(#bgOrbHighlight)"
            style={{ mixBlendMode: 'screen' as const }}
          />
        </g>
      </svg>

      <header className="nav-inner">
        {/* Shop / About direkt på skeppet */}
        <div className="nav-glass-layer">
          <Link
            href={sideLinks[0].href}
            className="glass-side glass-left glass-link glass-left-unique"
          >
            <span className="glass-label">{sideLinks[0].label}</span>
          </Link>

          <Link
            href={sideLinks[1].href}
            className="glass-side glass-right glass-link glass-right-unique"
          >
            <span className="glass-label">{sideLinks[1].label}</span>
          </Link>
        </div>

        {/* Logo-pod */}
        <div className="nav-logo-wrapper">
          <div className="nav-logo-seat">
            <div className="nav-logo-seat-inner" />
            <Link
              href="/"
              aria-label="NextMomentia home"
              className="nav-logo-link"
            >
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

        {/* CTA + orbs */}
        <div className="nav-orbs-wrapper">
          <div className="nav-cta-stack">
            <div className="nav-cta-glass" />

            <a
              href="https://www.youtube.com/@NextMomentia"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta-main"
            >
              Explore
            </a>

            <div className="nav-orbs-bar">
              <a
                href="https://www.youtube.com/@NextMomentia"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-orb-link"
                aria-label="Videos"
              >
                <span className="nav-orb orb-red" />
              </a>

              <Link href="/shop" className="nav-orb-link" aria-label="Shop">
                <span className="nav-orb orb-yellow" />
              </Link>

              <Link href="/about" className="nav-orb-link" aria-label="About">
                <span className="nav-orb orb-blue" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .nav-shell {
          position: fixed;
          z-index: 20;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          transform-origin: top center;
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
          inset: 8px 18px;
        }

        .glass-side {
          position: absolute;
          top: 50%;
          transform: translateY(-54%);
          width: 30%;
          height: 40%;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 30% 0%,
              rgba(255, 255, 255, 0.3),
              transparent 60%
            ),
            linear-gradient(
              150deg,
              rgba(125, 225, 230, 0.9),
              rgba(70, 145, 230, 0.9),
              rgba(20, 40, 80, 1)
            );
          border: 1.2px solid rgba(80, 255, 255, 0.9);
          box-shadow:
            0 0 0 0.6px rgba(3, 8, 18, 0.95), /* tunn mörk outline */
            inset 0 2px 7px rgba(255, 255, 255, 0.5),
            inset 0 -4px 12px rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition:
            transform 0.16s ease-out,
            box-shadow 0.16s ease-out,
            filter 0.16s ease-out;
        }

        .glass-left {
          left: 16%;
        }

        .glass-right {
          right: 16%;
        }

        .glass-label {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #f4f9ff;

          -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.22);
          text-shadow:
            0 -1px 1.5px rgba(255, 255, 255, 0.32),
            0 0 5px rgba(150, 230, 255, 0.6),
            0 0 11px rgba(100, 200, 255, 0.45),
            0 1.5px 2.5px rgba(0, 0, 0, 0.9),
            0 3px 4.5px rgba(0, 0, 0, 0.7);
        }

        .glass-link:hover {
          filter: brightness(1.08)
            drop-shadow(0 0 8px rgba(80, 255, 255, 0.6));
          box-shadow:
            0 0 0 0.6px rgba(3, 8, 18, 1),
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -3px 7px rgba(0, 0, 0, 1),
            0 10px 22px rgba(0, 0, 0, 1);
        }

        .nav-logo-wrapper {
          position: relative;
          z-index: 4;
          transform: translateY(-4px);
        }

        .nav-logo-seat {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 30% 10%,
              #c3d4ff 0%,
              #6b59ff 35%,
              #26214f 70%,
              #050513 100%
            );
          box-shadow:
            0 0 0 0.6px rgba(3, 8, 18, 0.95),
            inset 0 2px 4px rgba(255, 255, 255, 0.24),
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
            radial-gradient(
              circle at 40% 18%,
              #ffffff 0%,
              #dde4ff 18%,
              #4953cf 55%,
              #050614 100%
            );
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
            rgba(150, 210, 255, 0.3),
            rgba(0, 0, 0, 0.85)
          );
          opacity: 0.7;
          mix-blend-mode: screen;
        }

        .nav-logo-img {
          width: 34px;
          height: 34px;
          filter:
            drop-shadow(0 1px 2px rgba(0, 0, 0, 1))
            drop-shadow(0 0 14px rgba(255, 255, 255, 1));
          opacity: 0.98;
          mix-blend-mode: screen;
        }

        .nav-orbs-wrapper {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2; /* Explore under logg-kulan */
        }

        .nav-cta-stack {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .nav-cta-glass {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 110%;
          height: 114%;
          border-radius: 290px 290px 999px 999px;
          background:
            radial-gradient(
              circle at 20% 0%,
              rgba(255, 255, 255, 0.25),
              transparent 60%
            ),
            linear-gradient(
              180deg,
              rgba(90, 200, 235, 0.85),
              rgba(40, 90, 170, 0.95),
              rgba(10, 20, 45, 1)
            );
          border: 1.2px solid rgba(80, 255, 255, 0.9);
          box-shadow:
            0 0 0 0.6px rgba(3, 8, 18, 0.95),
            inset 0 2px 7px rgba(255, 255, 255, 0.5),
            inset 0 -5px 14px rgba(0, 0, 0, 0.95),
            0 10px 22px rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          z-index: 0;
        }

        .nav-cta-main {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 0.5rem 2.8rem;
          border-radius: 199px 199px 999px 999px;

          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          color: #f4faff;

          -webkit-text-stroke: 0.6px rgba(255, 255, 255, 0.28);
          text-shadow:
            0 -1px 2px rgba(255, 255, 255, 0.35),
            0 0 6px rgba(150, 230, 255, 0.65),
            0 0 12px rgba(100, 200, 255, 0.45),
            0 2px 3px rgba(0, 0, 0, 0.85),
            0 3px 5px rgba(0, 0, 0, 0.65);

          background:
            radial-gradient(
              circle at 30% 0%,
              rgba(255, 255, 255, 0.22),
              transparent 55%
            ),
            linear-gradient(
              150deg,
              rgba(130, 235, 240, 0.95),
              rgba(80, 155, 250, 0.95),
              rgba(18, 40, 90, 1)
            );
          border: 1.3px solid rgba(80, 255, 255, 0.9);
          box-shadow:
            0 0 0 0.6px rgba(3, 8, 18, 0.95),
            inset 0 2px 6px rgba(255, 255, 255, 0.4),
            inset 0 -4px 9px rgba(0, 0, 0, 1),
            0 10px 22px rgba(0, 0, 0, 0.9);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          transition:
            transform 0.2s ease-out,
            box-shadow 0.2s ease-out,
            filter 0.2s ease-out;
        }

        .nav-cta-main:hover {
          transform: translateY(-1px) scale(1.03);
          filter: brightness(1.07);
          text-shadow:
            0 -1px 2px rgba(255, 255, 255, 0.4),
            0 0 8px rgba(170, 255, 255, 0.75),
            0 0 14px rgba(120, 240, 255, 0.55),
            0 2px 4px rgba(0, 0, 0, 1),
            0 4px 6px rgba(0, 0, 0, 0.9);
        }

        .nav-cta-main:active {
          transform: translateY(0) scale(0.97);
          filter: brightness(0.95);
          text-shadow:
            0 -0.5px 1.5px rgba(255, 255, 255, 0.25),
            0 0 4px rgba(150, 255, 255, 0.4),
            0 2px 2px rgba(0, 0, 0, 1),
            0 3px 4px rgba(0, 0, 0, 1);
        }

        .nav-orbs-bar {
          position: relative;
          z-index: 1;
          margin-top: 3px;
          padding: 3px 16px 4px;
          border-radius: 99px 99px 999px 999px;
          background:
            radial-gradient(circle at 50% 0%, #ffffff, #dde3f3 40%, #8d96b2 90%),
            linear-gradient(180deg, #d5ddf2 0%, #676f8d 100%);
          box-shadow:
            0 0 0 0.5px rgba(3, 8, 18, 0.95),
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
          border: 0.8px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 4px rgba(0, 0, 0, 1),
            0 0 6px rgba(0, 0, 0, 1);
        }

        .orb-red {
          background: radial-gradient(circle, #ffe3e3, #ff3d47 45%, #7f0b18 95%);
        }
        .orb-yellow {
          background: radial-gradient(
            circle,
            #fff8d4,
            #ffd94a 45%,
            #9d6b00 95%
          );
        }
        .orb-blue {
          background: radial-gradient(
            circle,
            #e3f3ff,
            #4fb0ff 45%,
            #0a3d7c 95%
          );
        }

        .nav-orb-link:hover .nav-orb {
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 4px rgba(0, 0, 0, 1),
            0 0 10px rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }

        .glass-left-unique {
          border-radius: 299px 999px 299px 999px;
        }

        .glass-right-unique {
          border-radius: 999px 299px 999px 299px;
        }

        .glass-left-unique:hover,
        .glass-right-unique:hover {
          filter: brightness(1.05);
        }

        /* Mobil – skala ner hela skeppet istället för att komprimera */
        @media (max-width: 640px) {
          .nav-shell {
            top: 14px;
            transform: translateX(-50%) scale(0.9);
          }

          .glass-side {
            width: 28%;
            height: 38%;
          }

          .glass-label {
            font-size: 0.6rem;
            letter-spacing: 0.2em;
          }

          .nav-logo-seat {
            width: 56px;
            height: 56px;
          }

          .nav-orbs-wrapper {
            top: 86px; /* samma relativa position som desktop */
          }

          .nav-cta-main {
            padding: 0.44rem 2.4rem;
            font-size: 0.64rem;
            letter-spacing: 0.2em;
          }

          .nav-cta-glass {
            width: 118%;
            height: 112%;
          }

          .nav-orbs-bar {
            padding: 3px 14px 4px;
          }
        }
      `}</style>
    </div>
  )
}
